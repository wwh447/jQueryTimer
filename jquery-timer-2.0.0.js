!function() {
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
	$.fn.extend({
		
		timer: function() {
			
			//获取参数.
			var params = arguments;
			
			//当前元素.
			var $that = $(this);
			
			//定时器选项，预设的.
			var options = {
				//计时器执行的目标函数. (如果是一个集合，则以此执行队列中的函数).
				"iteration": $.noop,
				//计时器执行的时间间隔 (单位是每秒).
				"duration": 2,
				//计时器第一次执行的延迟时间，在这个时间过后才开始计时器.
				//"delay": 0,
				//需要执行的次数，如果设置为 -1 或 0 则不断执行，直到被设为停止
				"count": 1,
				//是否设置计时器后，就立即先执行一次. 
				"quick": false,
				//计时器走完计时后的回调函数.
				"callback": $.noop,
				//计时器索引的起始值，记录计时器已执行的次数。未设置则从 0 开始计数.
				"i": 0,
				//处于激活状态的计时器才会工作，否则等待被激活后工作.
				"actived": true
			};
			
			//缓存计时标识.
			var key = 0;
			
			//设置计时器.
			var setTimer = function() {
				
				//放置一个计时器，并且返回标识.
				key = setTimeout(autoCallback, options.duration * 1000);
				//把计时器的标记记录到元素缓存.
				$that.data("timer-key", key);
				
				return false;
			};
			
			//清除正在工作的计时器，并且清理使用痕迹（用在计时结束，或中止时）.
			var clearTimer = function(key, options) {
				
				//杀掉正在工作的计时器.
				clearTimeout(key);
				
				//调用结束函数，并传入总次数
				options.callback.apply($that, [options.i, options.count]);
				
				//清理元素上缓存的计时器数据.
				$that.removeData("timer-options");
				$that.removeData("timer-key");
				
				return $;
			};
			
			//自动放置计时器的回调函数.
			var autoCallback = function() {
				
				//执行计时器任务函数，并且把作用域设置为当前调用的 jquery 元素，另外参数代入调用次数统计，以及目标次数.
				options.iteration.apply($that, [options.i, options.count]);
				
				//记录调用次数增加一次.
				options.i += 1;
				
				//设置计时器，如果达到次数上限，清除计时器.
				if( options.i < options.count ) {
					setTimer();
				} else {
					clearTimer.apply(this, [key, options]);
				}
				
				//更新调用次数记录到元素配置缓存.
				$that.data("timer-options", options);
			};
			
			//如果设置了返回值，则立即返回. 不再继续执行，也不放置计时器了.
			var reValue = null;
			
			//根据第一个参数的类型，自动选择配置初始化方案.
			switch(typeof params[0]) {
			
				//如果第一个参数是布尔值，或者停止正在元素上运行的计时器.
				case "boolean":
					//如果设置为 true，则停止计时器.
					if( params[0] ) {
						clearTimer($that.data("timer-key"), $that.data("timer-options") );
					}
					//不再继续放置计时器.
					reValue = $that;
				break;
				
				//如果第一个参数是函数，则使用默认的配置执行.
				case "function":
					
					//参数顺序代表的KEY.
					var optionsArray = [];
					//根据现在参数的正序，填充参数顺序集.
					for(var j in options) {
						options.propertyIsEnumerable(j) && optionsArray.push(j);
					}
					//根据参数的数量和顺序，借助参数索引来初始化配置.
					for(j = 0; j < params.length; j++) {
						options[optionsArray[j]] = params[j];
					}
					
					//如果循环次数被设置为 0 或者小于 0，则认为是无限大.
					options.count = options.count > 0 ? options.count : Infinity;
					
					//把配置记录到元素缓存.
					$that.data("timer-options", options);
					
				break;
				
				//如果第一个参数是对象，则和默认的配置做一个交集.
				case "object":
					$.extend(options, params[0]);
					
					//如果循环次数被设置为 0 或者小于 0，则认为是无限大.
					options.count = options.count > 0 ? options.count : Infinity;
					
					//如果计时器设为未激活，则把数据先记录到元素缓存上.
					!options.actived && $that.data("timer-options", options);
				break;
				
				//如果第一个参数是数字，则认为是重设计时器的执行时间间隔。尝试重设以后激活计时器.
				case "number":
					if( $that.data("timer-options") ) {
						//获取元素缓存中的配置信息.
						options = $that.data("timer-options");
						//重设计时器的执行时间间隔.
						options.duration = params[0];
						//把配置中的计时器激活.
						options.actived = true;
					}
				break;
				
				//如果第一个参数是字符串，根据字符串值决定做什么.
				case "string":
					
					//获取元素缓存中的配置信息.
					options = $that.data("timer-options");
					key = $that.data("timer-key");
					
					switch( params[0] ) {
						//计时器挂起，不会调用完成的回调方法(暂停).
						case "stop":
							
							//杀掉正在工作的计时器.
							clearTimeout(key);
							//重置计时器标识.
							key = null;
							//状态更新到元素缓存.
							$that.removeData("timer-key");
							
							//把计时器的活动状态设为停止.
							options.actived = false;
							//状态更新到元素缓存.
							$that.data("timer-options", options);
							
							//不再继续放置计时器.
							reValue = $;
							
						break;
						
						//计时器继续执行，如果被挂起则继续，被禁用的则启用.
						case "play":
							//把配置中的计时器激活.
							options.actived = true;
						break;
						
						//计时器立即完成，并调用完成的回调函数（这个相当于是停止计时器的方法）.
						case "finish":
							clearTimer(key, options );
							//不再继续放置计时器.
							reValue = $;
						break;
					}
					
				break;
				
				//如果没有设置任何参数，则激活元素上的计时器。如果元素上没有计时器，就什么也不会发生.
				default:
					if( $that.data("timer-options") ) {
						//获取元素缓存中的配置信息.
						options = $that.data("timer-options");
						//把配置中的计时器激活.
						options.actived = true;
					}
			};
			
			//如果设置了返回值
			//或是 这个元素上计时器还未结束
			//或是 计时器没有激活.
			
			//则立即返回，不再继续放置计时器.
			if( reValue || $that.data("timer-key") || !options.actived ) { return reValue; }
			
			//如果设置了快速启动，则先马上跑一次，然后再进入计时器等待.
			if( options.quick ) {
				autoCallback.apply(this, [key, options]);
			} else {
				setTimer.apply(this, [key, options]);
			}
			
			//把放置计时器时返回的标识记录.
			$that.data("timer-key", key);
			
			//把配置参数压入缓存里记录下来.
			$that.data("timer-options", options);
			
			return $that;
			
		}
		
	});

}($);