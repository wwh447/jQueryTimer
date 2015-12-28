/**
 * jQuery 计时器，所有的参数都为可选参数，支持JSON配置或根据参数顺序配置.
 * (https://github.com/wwh447/jQueryTimer)
 *
 * @param (Function)iteration 迭代函数 {默认值:空函数}.
 * @param (Number)duration 迭代间隔 {默认值:2秒}.
 * @param (Number)count 迭代目标次数 {默认值:1}.
 * @param (Boolean)quick 是否立即执行 {默认值:false}.
 * @param (Function)callback 计时完成后的回调函数 {默认值:空函数}.
 * @param (Number)i 计时的其实索引 {默认值:0}.
 * @param (Boolean)actived 是否激活计时器.标记为激活才会立即执行 {默认值:true}.
 * @return (Object)$this 支链式调用.
 * @author Eded.Wang
 * @date 2015-12-28.
 */
!function(){$.fn.extend({timer:function(){var params=arguments;var $that=$(this);var options={"iteration":$.noop,"duration":2,"count":1,"quick":false,"callback":$.noop,"i":0,"actived":true};var key=0;var setTimer=function(){key=setTimeout(autoCallback,options.duration*1000);$that.data("timer-key",key);return false};var clearTimer=function(key,options){clearTimeout(key);options.callback.apply($that,[options.i,options.count]);$that.removeData("timer-options");$that.removeData("timer-key");return $};var autoCallback=function(){options.iteration.apply($that,[options.i,options.count]);options.i+=1;if(options.i<options.count){setTimer()}else{clearTimer.apply(this,[key,options])}$that.data("timer-options",options)};var reValue=null;switch(typeof params[0]){case"boolean":if(params[0]){clearTimer($that.data("timer-key"),$that.data("timer-options"))}reValue=$that;break;case"function":var optionsArray=[];for(var j in options){options.propertyIsEnumerable(j)&&optionsArray.push(j)}for(j=0;j<params.length;j++){options[optionsArray[j]]=params[j]}options.count=options.count>0?options.count:Infinity;$that.data("timer-options",options);break;case"object":$.extend(options,params[0]);options.count=options.count>0?options.count:Infinity;!options.actived&&$that.data("timer-options",options);break;case"number":if($that.data("timer-options")){options=$that.data("timer-options");options.duration=params[0];options.actived=true}break;case"string":options=$that.data("timer-options");key=$that.data("timer-key");switch(params[0]){case"stop":clearTimeout(key);key=null;$that.removeData("timer-key");options.actived=false;$that.data("timer-options",options);reValue=$;break;case"play":options.actived=true;break;case"finish":clearTimer(key,options);reValue=$;break}break;default:if($that.data("timer-options")){options=$that.data("timer-options");options.actived=true}};if(reValue||$that.data("timer-key")||!options.actived){return reValue}if(options.quick){autoCallback.apply(this,[key,options])}else{setTimer.apply(this,[key,options])}$that.data("timer-key",key);$that.data("timer-options",options);return $that}})}($);