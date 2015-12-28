
## jQuery Timer

- 新版修复了旧版的历史遗留问题，并且增加了更强大的功能，配置设计也更灵活。强烈建议升级到新版，旧版不再继续维护。
- 欢迎检查新版 [DEMO](http://wwh447.github.io/jQueryTimer/#%E6%89%80%E6%9C%89%E7%A4%BA%E4%BE%8B)，以及贡献代码。

## 什么是 jQuery Timer

- 为 jQuery 量身定制的计时器，取代 js 原生的 setTimeout 和 setInterval 函数，管理更简单。
- 兼容所有主流PC和移动浏览器，并且完美支持 jQuery 2.x
- 可以使用在简单倒计时、幻灯片程序、事件执行频率控制、以及所有需要计时器完成的地方

## 目录
* [特性](#特性)
* [下载](#下载)
* [快速上手](#快速上手)
* [所有示例](#所有示例)
* [参数说明](#参数说明)
* [更新日志](#更新日志)

## 特性
* 结合最新的 jQuery，血统优良
* 只需记忆一个API，使用简单便捷
* 为 jQuery 量身定制，元素调用计时器更加便捷
* 实例丰富，学习成本低，源码中文注释
* 方法灵活全面，能够应付大部分计时器使用场景
* 生产版大小仅有2KB，容易集成到更复杂的插件中

## 下载
* [jquery-timer-2.js](http://wwh447.github.io/jQueryTimer/jquery-timer-2.js) *(开发版,7.8kb)*
* [jquery-timer-2-min.js](http://wwh447.github.io/jQueryTimer/jquery-timer-2-min.js) *(生产版,2.1kb)*

## 快速上手
放置一个两秒计时器:
```javascript
//两秒后弹出对话框.
$("body").timer(function() {
	alert("Hello jQuery Timer!");
});
```
放置一个三秒计时器:
```javascript
//三秒后搜索页面中的 a 标签，弹出数量.
$("body").timer(function() {
	alert( $(this).find("a").length );
}, 3);
```
放置一个两秒计时器，并且指定迭代次数为三次:
```javascript
//每两秒控制台输出一下系统时间戳.
$("a").timer(function() {
	console.log( Date.now() );
}, 2, 3);
```
放置一个两秒计时器，并且指定迭代次数为三次，完成时弹出提示:
```javascript
//每两秒控制台输出一下当前迭代进度.
$("a").timer(function(i, count) {
	console.log( "计时进度: " + i + "/" + count );
}, 2, 3, function() {
	alert("计时已完成");
});
```

## 所有示例
1. [开始计时器](http://wwh447.github.io/jQueryTimer/demo2/hello.html)
2. [指定计时器的时间间隔](http://wwh447.github.io/jQueryTimer/demo2/duration.html)
3. [指定计时器的循环次数](http://wwh447.github.io/jQueryTimer/demo2/count.html)
4. [让计时器立即开始执行](http://wwh447.github.io/jQueryTimer/demo2/quick.html)
5. [设置计时器完成时的回调函数](http://wwh447.github.io/jQueryTimer/demo2/callback.html)
6. [用JSON的参数形式来配置计时器](http://wwh447.github.io/jQueryTimer/demo2/json.html)
7. [放置未激活的计时器，以及手动激活计时器](http://wwh447.github.io/jQueryTimer/demo2/actived.html)
8. [计时器暂停和继续以及停止示例](http://wwh447.github.io/jQueryTimer/demo2/pause.html)
9. [计时器应用 - 倒计时程序](http://wwh447.github.io/jQueryTimer/demo2/count-down.html)
10. [计时器应用 - 经典打字效果](http://wwh447.github.io/jQueryTimer/demo2/typist.html)

备注：DEMO中默认使用 jQuery 2.x，可以换做 1.9+ 来兼容IE

## 参数说明

timer 方法接收的可选参数，依照参数顺序列举。
可以按照顺序给出可选参数，也可以传入JSON格式配置指定参数。

参数 | 类型 | 默认值 | 说明
------------ | ------------ | ------------ | ------------
iteration | Function | 空函数 | 计时器执行的迭代函数，接受两个可选参数。第一个标识当前回调执行的次数，第二个参数标识迭代的目标次数
duration | Number | 2 | 计时器迭代时间间隔，时间单位是秒，默认为2秒
count | Number | 1 | 计时器迭代目标次数。如果设置为 -1 或 0 则无限迭代，直到被设为停止。
quick | Boolean | false | 是否设置计时器后，就立即先执行一次. 如果设置 true ，计时器放置后就率先执行一次，而不必等待第一次计时结束
callback | Function | 空函数 | 计时器走完计时后的回调函数, 所有迭代完成后执行. 无限循环退出时自动执行，或者配置为手动触发。
i | Number | 0 | 计时器索引的起始值，记录计时器已执行的次数。未设置则从 0 开始计数.
actived | Boolean | true | 处于激活状态的计时器才会工作，否则被手动激活后才开始工作.

[Project Home](http://wwh447.github.io/jQueryTimer/)

[DEMO](http://wwh447.github.io/jQueryTimer/#%E6%89%80%E6%9C%89%E7%A4%BA%E4%BE%8B)

## 更新日志

##### v2.0.0 beta
1. 构建了新的API方法，无需记忆多个API。只需一个API方法即可实现计时器的放置、暂停、继续、停止。
2. 计时器实现指定次数迭代：单次、指定次数、无限次数
3. 计时器添加可立即执行的配置，设置后计时器放置完就率先执行一次
4. 实现计时器的完成回调函数，所有迭代完成后执行。无限循环退出时自动执行，或者配置为手动触发。
5. 实现计时器可以暂停和继续上一次未完成的工作，接着跑完
6. 实现计时器可放置未激活的计时器，之后手动激活再运行

##### v1.0.1 beta
1. 优化代码提升性能

##### v1.0.0 beta
1. 创建项目初始代码
2. 发布说明和示例
