## jQuery Timer

欢迎贡献代码，以及 [DEMO](#所有示例) 和 BUG

## 什么是 jQuery Timer

- 依赖 jQuery 的计时器，取代 js 原生的 setTimeout 和 setInterval 等函数。
- 推荐 jQuery 使用：1.7+。
- 兼容浏览器：Chrome 14+, Safari 5.0+, IE6+, Firefox 3.5+.

## 目录
* [特性](#特性)
* [下载](#下载)
* [快速上手](#快速上手)
* [所有示例](#所有示例)
* [参数说明](#参数说明)
* [更新日志](#更新日志)

## 特性
* 兼容最新的 jQuery
* 方法较少，使用简单便捷
* 实例丰富，学习成本较低

## 下载
* [jquery-timer.js](jquery-timer.js) *(开发版,3.0kb)*
* [jquery-timer-min.js](jquery-timer-min.js) *(生产版,0.7kb)*

## 快速上手
```javascript
//两秒以后弹出对话框.
$("body").setTimer(function() {
	alert("Hello jQuery Timer!");
});
```

## 所有示例
1. [设定延迟执行函数，开始使用计时器插件](demo/param-fun.html)
2. [设定回调间隔时间](demo/param-time.html)
3. [指定回调的次数](demo/param-iCount.html)
4. [指定是否立即执行](demo/param-immediately.html)
5. [设置回调函数（所有回调结束以后调用）](demo/param-callback.html)
6. [创建倒计时程序](demo/pay0.html)
7. [创建计数器程序](demo/pay1.html)
8. [动态截取文本显示示例](demo/pay2.html)

## 参数说明

setTimer 方法接收的可选参数，依照参数顺序列举

参数 | 类型 | 默认值 | 说明
------------ | ------------ | ------------ | ------------
fun | Function | $.noop | 计时器延迟执行的回调函数，接受一个可选参数标识当前回调执行的次数，同时接受第二个参数可获得目标次数
time | Number | 2000 | 计时器回调时间间隔，时间单位是毫秒
iCount | Number | 1 | 计时器回调次数。小等于0则进行无限循环，直到调用 stopTimer 终止。比如设为 0 或者 -1 时。
immediately | Boolean | false | 是否立即执行。当设置为 true 时立即执行一次回调函数。
callback | Function | $.noop | 计时完成后的回调函数，回调参数达到，所有回调完成后执行的最终回调函数（无限循环回调失效）

[Project Home](http://wwh447.github.io/jQueryTimer/)

[DEMO](http://wwh447.github.io/jQueryTimer/#%E6%89%80%E6%9C%89%E7%A4%BA%E4%BE%8B)

## 更新日志
##### v1.0.0 beta
1. 创建项目初始代码
2. 发布说明和示例

