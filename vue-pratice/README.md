# vuex 持久化

+ 部分持久化

  ```
    plugins: [persistedState({
      // 部分持久化
      paths: ['language', 'theme']
    })]
  ```

+ vuex-persistedstate默认使用localStorage来固化数据，一些特殊情况要如何应对呢？（如：safari的无痕浏览模式）
    ```
    需要使用sessionStorage的情况

    plugins: [
        persistedState({ storage: window.sessionStorage })
    ]
    ```

+ vuex 中的数据要传递给 computed,而不能直接赋值给 data

> 在实例化vue对象的时候会把data初始数据挂载化到vue上，所以data() { return { count: this.$store.state.count } } 只是把$store.state.count的初始值赋给了$vm.count，是能在视图中显示出初始值的。

> 但是当 $store.state.count发生改变，实际上$vm.count还是原来的初始值没有任何变化，所以视图就不能响应了！因此视图中需要使用计算属性computed根据状态计算出新的结果。

> 另外视图中直接用$store.state.count也是可以的

# 非对称加密

```
const { generateKeyPairSync, publicEncrypt, privateDecrypt } = require('crypto')
//生成公钥和私钥
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 1024,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});
//需要加密的数据
const data = "data to crypto"

const pub = publicKey.toString('ascii')
const pri = privateKey.toString('ascii')
// console.log(pub, pri)

// 公钥加密
const encryptData = publicEncrypt(pub, Buffer.from(data)).toString('base64');
console.log('encode:', encryptData);

// 私钥解密
const decryptData = privateDecrypt(pri, Buffer.from(encryptData.toString('base64'), 'base64'));
console.log('decode:', decryptData.toString());
```

# input组件化

```
  // *** 必须声明 input 方法
  <input :type="type" :placeholder="placeholder" @input="$emit('input',$event.target.value)"/>
```

# nexttick

> 异步渲染的数据，在 mounted 中通过 $refs 拿不到，此时需要在 watch 中 使用nexttick获取

```
watch: {
  users() {
    this.$nextTick(() => {
      console.log(this.$refs.col);
    });
  },
},
```


# babel-plugin-component 按需载入插件

# async vaildator 与  json schema 做表单校验
