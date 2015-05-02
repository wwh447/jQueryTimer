## jQuery Timer

欢迎贡献代码，以及 [DEMO](#参考示例) 和 BUG

## 什么是 jQuery Timer

- 依赖 jQuery 的计时器，取代 js 原生的 setTimeout 和 setInterval 等函数。
- 推荐 jQuery 使用：1.7+。
- 兼容浏览器：Chrome 14+, Safari 5.0+, IE6+, Firefox 3.5+.

## 主要方法

setTimer 在 jQuery 元素上绑定计时器

```javascript
/**
 * 设置计时器，所有的参数都为可选参数.
 * @param (Function)fun 回调函数 {默认值:$.noop}.
 * @param (Number)time 回调间隔 {默认值:2000}.
 * @param (Number)iCount 回调次数 {默认值:1}.
 * @param (Boolean)immediately 是否立即执行 {默认值:false}.
 * @param (Function)callback 计时完成后的回调函数，无限循环回调失效 {默认值:$.noop}.
 * @return (Object)this 支链式调用.
 * @author Eded.Wang
 * @date 2015-03-13 17:13.
 */
function setTimer() { /*...*/ }
```

stopTimer 停止 jQuery 元素上绑定的计时器

```javascript
/**
 * 停止计时器.
 * @return (Object)this 支持链式调用.
 * @author Eded.Wang
 */
function stopTimer() { /*...*/ }
```

## 参考示例

[Project Home](http://wwh447.github.io/jQueryTimer/)

[DEMO](http://wwh447.github.io/jQueryTimer/#%E6%89%80%E6%9C%89%E7%A4%BA%E4%BE%8B)

## 创建原因

> 在网上找不到类似的项目，可以在较新的 jQuery 版本下工作，所以我自己创建了它。我使用的 jQuery 是 1.11.x，未测试最低兼容版本，但是我建议引入 1.7 以上的。