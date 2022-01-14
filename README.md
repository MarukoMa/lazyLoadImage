# 图片懒加载
减少服务器压力，当图片出现在可视区域内再去加载对应的图片,图片加载成功之前使用默认图片进行占位,提高用户体验

## Installation

`$ npm i lazy-load-image-pre`

## options
### querySelect
* 设置懒加载图片属性 
* type: String
* default: '.lazy-src'
     
    
### defaultImage
* 默认站位图片
* type: String 
* default: 'dist/lazy-img-loading.gif'
    
### preLoadHeight  
* 配置图片预加载功能,大于0则开启预加载功能
* type: Number   
* default: 0
    
    
## Usage
```javascript
   import { lazyLoadImage } from 'lazy-load-image-pre';
   lazyLoadImage({
        querySelect:'.lazy-src',
        defaultImage:'lib/lazy-img-loading.gif',
        preLoadHeight:500
    })

```
