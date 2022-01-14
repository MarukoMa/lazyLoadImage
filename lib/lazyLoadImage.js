const defaultOpts = {
    querySelect:'.lazy-src',
    defaultImage:'dist/lazy-img-loading.gif',
    preLoadHeight:0
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
        window.onload  = window.onscroll = this.throttle(this.imgLazyLoad(), 1000)
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
                let isLoad = this.opts.preLoadHeight > 0 && 
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