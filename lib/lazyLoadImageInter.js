
const defaultOpts = {
    querySelect:'.lazy-src',
    basePath :'/lib',
    defaultImage:'lazy-img-loading.gif'
}
function  LazyLoadImage(opts) {
    this.opts = Object.assign(defaultOpts, opts);
    this.init()
}
LazyLoadImage.prototype = {
    init:function () {
        function filterDom(selector) {
            return Array.from(document.querySelectorAll(selector));
        }
        function loadImage(entry) {
            const image = entry.target
            const data_src = image.getAttribute('data-src')
            image.setAttribute('src',data_src)
            observer.unobserve(image)
        } 
        const callback = (entries)=>{
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    loadImage(entry)
                }else{
                    console.log(this.opts)
                    entry.target.setAttribute('src',`${this.opts.basePath}/${defaultImage}`)
                }
            })
        }
        //事件观察者
        const observer = new IntersectionObserver(callback);
        //过滤元素
        filterDom(this.opts.querySelect).forEach(function (item) {
            observer.observe(item);
        });

    }
}
const lazyLoadImage = function (opts) {
    return new LazyLoadImage(opts)
}