/**
 * @desc 图片懒加载功能封装
 * @param {object} opts
 * @param querySelect 懒加载图片属性设置
 * @param defaultImage 图片加载成功前的默认占位图片
 * @param preLoadHeight 配置图片预加载功能,大于0则开启预加载功能
 * @param delay   配置节流延迟执行毫秒数
 * @param type 配置节流功能 1 表时间戳版，2 表定时器版 默认走定时器
 */
const defaultOpts = {
    querySelect:'.lazy-src',
    defaultImage:'dist/lazy-img-loading.gif',
    preLoadHeight:0,
    delay:1000, 
    type:2

}
function LazyLoadImage(opts) {
    this.opts = Object.assign(defaultOpts,opts);
    this.defaultImage = this.opts.defaultImage
    this.imagesQuery = this.filterDom()
    this.loadDefaultImage()
    this.init()
}
LazyLoadImage.prototype = {
    init : function () {
        this.bindEvent()
        setTimeout(() => {
            window.scrollTo(0,0)
        },1000)
    },
    loadDefaultImage: function () {
        this.imagesQuery.forEach(item => item.src = this.defaultImage)
    },
    bindEvent: function () {
        window.onload  = window.onscroll = this.throttle(this.imgLazyLoad(), this.opts.delay, this.opts.type)
    },
    filterDom: function () {
        return Array.from(document.querySelectorAll(this.opts.querySelect));
    },
    imgLazyLoad: function () {
        images = this.imagesQuery
        let imageItem
        const cliHeight = window.innerHeight || document.documentElement.clientHeight
        return function(){ 
            let num = 0  
            const sTop = document.documentElement.scrollTop || document.body.scrollTop
            for(let i=num; i<images.length; i++){
                imageItem = images[i]
                let isLoad = (this.opts.preLoadHeight - 0) > 0 && 
                imageItem.offsetTop < (cliHeight + sTop + this.opts.preLoadHeight) || 
                imageItem.offsetTop < (cliHeight + sTop)
                if(isLoad){
                    const data_src = imageItem.getAttribute('data-src')
                    if(data_src){
                        imageItem.src = data_src
                        imageItem.removeAttribute('data-src')
                    }
                }
                num ++
            }
        }
    },
    throttle: function (fn, delay, type) {
        delay = delay || '1000';
        let preTime = 0
        let flag = true
        return () => {
            if(type === 1) {
                let now = Date.now()
                if(now - preTime > delay) {
                    fn.apply(this,arguments)
                    preTime = now
                }  
            }else{
                if(flag) {
                    setTimeout(() => {
                        fn.apply(this, arguments)
                        flag = true
                    },1000)
                }
                flag = false
            }  
        }
    }
}
const lazyLoadImage = function (opts) {
    return new LazyLoadImage(opts)
}
export { lazyLoadImage }