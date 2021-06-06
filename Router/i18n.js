/**
 * i18n 实现原理
 * 利用 loadsh 寻找 n 级下的内容
 */

const { get }= require("loadsh")

const message = {
    en:{
        hello:"hello",
        key1:{
            key2:"en.key1.key2"
        }
    },
    'zh_cn':{
        hello:"中文",
        key1:{
            key2:"zh.key1.key2"
        }
    }
}

const locale = "en"

$t = key =>{
    const map = message[locale]
    return get(map,key)
}

console.log($t('key1.key2'))
