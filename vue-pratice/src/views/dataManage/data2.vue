<template>
  <div>
    <div class="title">缓存</div>
    <div class="content">
      <h4>1. 缓存概念</h4>
      <pre>
        缓存理解：浏览器在本地磁盘上将用户之前请求的数据存储起来，当访问者再次需要改数据的时候无需再次发起请求，直接从浏览器本地获取数据
        缓存的好处
          减少请求的个数
          节省带宽，避免浪费不必要的网络资源
          减轻服务器压力
          提高浏览器网页的加载速度，提高用户体验
      </pre>
      <h4>2. 缓存分类</h4>
      <pre>
      强缓存
        不会向服务器发送请求，直接从本地缓存中获取数据
        请求资源的状态码为：200 ok(from memory cache)

      协商缓存
        向服务器发送请求，服务器会根据请求头的资源判断是否命中协商缓存，如果命中则返回304状态码通知浏览器从缓存中读取数据
        强缓存 和 协商缓存的区别

      共同点：都是从浏览器读取资源

      不同点：强缓存不发送请求给服务器，协商缓存发送请求给服务器，根据服务器返回的信息决定是否使用缓存
      </pre>

      <h4>3. 强缓存中的header值</h4>
      <pre>
      expires: 这是http1.0的规范，它的值是一个绝对时间的 GMT 格式的时间字符串，如果发送请求的时间在expires之前,那么本地缓存始终有效，否则会发送请求到服务器来获取资源

      cache-control：max-age = number
        这是http1.1提出的header信息，主要利用该字段的 max-age 来进行判断，它是一个相对值；资源第一次请求时间和cache-control设定的有效期，计算出一个资源过期时间，再拿这个过期时间跟当前的请求时间比较，如果请求时间在过期时间之前，就命中缓存，否则就不行
        cache-control常用的值
          no-cache: 不使用本地缓存，需要使用协商缓存
          no-store: 直接禁止浏览器缓存数据，每次都会向服务器发起请求
          public: 可以呗所有的用户缓存，包括终端用户和 CDN 等中间代理服务器
          private: 只能被终端用户的浏览器缓存，不允许 CDN 等中继缓存服务器对其缓存
      注意：当 cache-control 与 expires 共存的时候 cache-control 优先级高
      </pre>

      <h4>4. 协商缓存中的 header 参数</h4>
      <pre>
      协商缓存都是由服务器来确定缓存资源是否可用，所以客户端与服务器端需要通过某种标识来进行通信，从而让服务器判断请求资源是否可以通过缓存访问

      Last-Modified / If-Modified-Since
        浏览器第一次向服务器请求一个资源，服务器在返回这个资源的同时，在 response 的 header 加上 Last-Modified ，这个header表示本资源在服务器上的最后修改时间
        浏览器再次跟服务器请求这个资源时，在 request 的 header 上加上 If-Modified-Since，这个header的值就是上一次请求返回的 Last-Modified 的值
        服务器再次受到资源请求时，根据浏览器传过来的 If-Modified-Since 和资源在服务器上的最后修改时间 Last-modified 来判断资源是否有变化，如果没有变化则返回304 Not Modified，但是不会返回资源内容，而是从缓存中加载资源；如果有变化，就正常请求资源
        当服务器返回 304 Not Modified 的响应时，response header 中不会再添加 Last-Modified 的header，因为既然资源没有变化，那么 Last-Modified 也不会改变
        如果协商缓存没有命中，浏览器直接从服务器加载资源时，Last-Modified 在重载时会被更新。下次请求时，If-Modified-Since会启用上次返回的 Last-Modified

      Etag/If-None-Match
        这两个值是由服务器生成的每个资源的唯一标识符，只要资源有变化这个值就会改变，其判断过程和 Last-Modified/If-Modified-Since 类似
        http1.1 中 Etag的出现主要是为了解决几个 Last-Modified 比较难解决的问题
          例如：一些文件也许会周期性的更改，但是他的内容并不改变（仅仅改变修改时间），这个时候我们并不希望客户端认为这个文件被修改了而重新get
          例如：某些文件修改非常频繁，比如在秒以下的时间内进行修改（ 一秒修改N次 ），If-Modified-Since能检查到的粒度是 S 级的，这种修改无法判断
          例如：某些服务器不能精确的得到文件的最后修改时间
      </pre>

      <h4>5. 强缓存如何重新加载新的资源</h4>
      <pre>
      通过页面中引用的资源路径，让浏览器主要放弃加载缓存去加载新的资源
      示例：https://www.baidu.com/s?t=7awea5
      好处：每次文件改变时 query 的值就会发生改变，当query值不同的时候也就是页面引用的资源路径不同，此时浏览器就会加载新的资源
      </pre>

      <h4>6. nodejs中使用示例</h4>
      <pre>
      强缓存(10秒为例)
        res.setHeader('Expires',new Date(Date.now()+10*1000).toGMTString())
        res.setHeader('Cache-Control','max-age=10')
    
      协商缓存
          res.setHeader('Last-Modified',new Date(Date.now()+10*1000).toGMTString())//设置
          let ifModifiedSince = req.headers['if-modified-since']//获取
          if(ifModifiedSince===ctime){
              res.statusCode=304
              return res.end()//直接返回
          }

      etag设置
          let content = await fs.readFile(currentpath,'utf8')
          let hash = crypto.createHash('md5').update(content).digest('base64')
          res.setHeader('Etag',hash)
          let ifNoneMatch = req.headers['if-none-match']
          if(ifNoneMatch){
              res.statusCode=304
              return res.end()
          }
      </pre>
    </div>
  </div>
</template>

<style lang="less" scoped>
.title {
  font-size: 26px;
  font-weight: bold;
  padding: 24px 0 0 24px;
}
.content {
  padding: 0 0 0 24px;
}
</style>