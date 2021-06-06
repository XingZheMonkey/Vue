/**
 * @param flag : 当前层级，用来判断第几级菜单
 * @param level : 唯一标识，用来判断显示高亮   1 / 1-1 1-2
 * @param subLevel : 子级标识，用来拼接出 level
 */

export function setIndex(data, flag, level, subLevel) {
    flag = Number(flag);

    // 赋值层级
    data.index = flag;

    // 赋值唯一标识
    data.level = subLevel ? level + "-" + subLevel : level;

    if (data.children && data.children.length) {
        // 往下递归增加层级
        flag++;

        // 递归 children
        data.children.forEach((item, index) => {
            // 赋值唯一标识, 注意将父级的标识传递下去，完成拼接
            setIndex(item, flag, data.level, index + 1);
        });
    }
}



/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap 所有路由表
 * @param key 当前角色
 */

export function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles);
            }
            // 符合要求，过滤通过，返回到新数组中
            return true;
        }
        return false;
    });

    return accessedRouters;
}

/**
 * 判断是否有权限
 * @param key 当前角色
 * @param route 当前路由对象
 * */
export function hasPermission(key, route) {
    if (route.meta && route.meta.roles) {
        // 如果meta.roles是否包含角色的key值,如果包含那么就是有权限,否则无权限
        return route.meta.roles.some(role => role.indexOf(key) >= 0);
    } else {
        // 默认不设置有权限
        return true;
    }
}