# defineProperty 

+ Object.defineProperty的一些问题

 - 递归遍历所有的对象的属性，这样如果我们数据层级比较深的话，是一件很耗费性能的事情

 - 只能应用在对象上，不能用于数组(重写了数组的方法，当调用数组方法时会触发更新，也会对数组中的每一项进行监控)

 - 只能够监听定义时的属性，不能监听新加的属性，这也就是为什么在vue中要使用Vue.set的原因，删除也是同理


+ Object.defineProperty的问题在于，只能够作用在对象上，那么vue中，对数组是怎么实现数据劫持的呢？ 只需要修改数组的原型方法，往这些方法里添加一些视图渲染的操作。

```
    const oldArrayProperty = Array.prototype;
    const newArrayProperty = Object.create(oldArrayProperty);
    ['pop', 'push', 'shift', 'unshift', 'splice'].forEach((method) => {
        newArrayProperty[method] = function() {
            renderView();
            oldArrayProperty[method].call(this, ...arguments);
        };
    });
    // 在observer函数中加入数组的判断，如果传入的是数组，则改变数组的原型对象为我们修改过后的原型

    if (Array.isArray(target)) {
        target.__proto__ = newArrayProperty;
    }
```


# proxy

+ proxy做数据劫持还是有一些痛点的，比如对于数组的push、unshift等方法需要做兼容，对于对象的深层属性仍然需要通过遍历来重新proxy

+ 当属性是深度嵌套的时候，只会触发 getter，并不会触发setter，所以需要对深度嵌套的属性进一步使用 proxy（由于没触发内存中的指向，不会触发更新方法）

```
function deepProxy(obj, cb) {

	if (typeof obj === 'object') {

		for (let key in obj) {
			if (typeof obj[key] === 'object') {
				obj[key] = deepProxy(obj[key], cb);
			}
		}

	}

	return new Proxy(obj, {

		/**
		 * @param {Object, Array} target 设置值的对象
		 * @param {String} key 属性
		 * @param {any} value 值
		 * @param {Object} receiver this
		 */
		set: function (target, key, value, receiver) {

			if (typeof value === 'object') {
				value = deepProxy(value, cb);
			}

			let cbType = target[key] == undefined ? 'create' : 'modify';

			//排除数组修改length回调
			if (!(Array.isArray(target) && key === 'length')) {
				cb(cbType, { target, key, value });
			}
			return Reflect.set(target, key, value, receiver);

		},
		deleteProperty(target, key) {
			cb('delete', { target, key });
			return Reflect.deleteProperty(target, key);
		}

	});

}
```
