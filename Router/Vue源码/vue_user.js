Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
        return
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
        plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
};

/**
 * 每個 plugin 都应该携带一个 install 方法，执行 Vue.use 时实际上是执行了 install 方法
 */