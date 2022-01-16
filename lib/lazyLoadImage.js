
import { throttle} from 'debounce-add-throttle';
/**
 * @desc 图片懒加载功能封装
 * @param {object} opts
 * @param lazySrc 懒加载图片属性设置
 * @param defaultImage 图片加载成功前的默认占位图片
 * @param preLoadHeight 配置图片预加载功能,大于0则开启预加载功能
 * @param delay   配置节流延迟执行毫秒数
 * @param type 配置节流功能 1 表时间戳版，2 表定时器版 默认走定时器
 */
 const defaultOpts = {
    lazySrc:'lazy-src',
    defaultImage:'/lib/lazy-img-loading.gif',
    preLoadHeight:0,
    delay:1000, 
    type:2
}
function LazyLoadImage(opts) {
    this.opts = Object.assign(defaultOpts,opts);
    this.defaultImage = this.opts.defaultImage
    this.init()
}
LazyLoadImage.prototype = {
    init : function () {
        this.bindEvent()
        setTimeout(() => {
            window.scrollTo(0,0)
        },1000)
    },
    loadDefaultImage: function (images) {
        images.forEach(item => item.src = this.defaultImage)
    },
    bindEvent: function () {
        window.onload  = throttle(this.imgLazyLoad(), this.opts.delay, this.opts.type)
        window.onscroll = throttle(this.imgLazyLoad(), this.opts.delay, this.opts.type)
    },
    filterDom: function () {
        return Array.from(document.lazySrcorAll(`img[${this.opts.lazySrc}]`));
    },
    imgLazyLoad: function () {
        const images = this.filterDom()
        this.loadDefaultImage(images)
        let imageItem
        const cliHeight = window.innerHeight || document.documentElement.clientHeight
        return function(){ 
            let num = 0  
            const sTop = document.documentElement.scrollTop || document.body.scrollTop
            for(let i=num; i<images.length; i++){
                imageItem = images[i]
                let isLoad = this.opts.preLoadHeight > 0 && 
                imageItem.offsetTop < (cliHeight + sTop + this.opts.preLoadHeight) || 
                imageItem.offsetTop < (cliHeight + sTop)
                if(isLoad){
                    const data_src = imageItem.getAttribute(this.opts.lazySrc)
                    if(data_src){
                        imageItem.src = data_src
                        imageItem.removeAttribute(this.opts.lazySrc)
                        images.splice(i,1)
                    }
                }
                num ++
            }
        }
    }
}
const lazyLoadImage = function (opts) {
    return new LazyLoadImage(opts)
}
LazyLoadImage.prototype.constructor = LazyLoadImage //用于识别对象是哪个构造函数初始化的,可以用来修正原型链
export { lazyLoadImage }