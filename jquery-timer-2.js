!function() {
	
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
				//需要执行的次数，如果设置为 -1 则不断执行，直到被设为停止
				"count": 1,
				//是否设置计时器后，就立即先执行一次. (如果设置了延迟时间，这个设置就会失效).
				"quick": false,
				//计时器走完计时后的回调函数.
				"callback": $.noop,
				//处于激活状态的计时器才会工作，否则等待被激活后工作.
				"actived": true
			};
			
			//计时器已执行次数.
			var i = 1;
			
			//缓存计时标识.
			var key = 0;
			
			//设置计时器.
			var setTimer = function() {
				
				//如果条件满足，则放置一个计时器。
				//条件满足的情况是：即计数未达到界限，或者正在进行无线循环.
				if( i < options.count ) {
					key = setTimeout(autoCallback, options.duration * 1000);
					$that.data("timer-key", key);
					return $;
				}
				
				//如果总共只需要执行一次，则直接走起.
				/* 目前只执行一次会有BUG.
				if( options.count == 1 ) {
					key = setTimeout(autoCallback, options.duration * 1000);
					$that.data("timer-key", key);
				}
				*/
				
				//清除计时器.
				return clearTimer.apply(this, [i, key, options]);
			};
			
			//清除正在工作的计时器，并且清理使用痕迹（用在计时结束，或中止时）.
			var clearTimer = function(i, key, options) {
				
				//杀掉正在工作的计时器.
				clearTimeout(key);
				
				//因为计算方式的原因，如果循环次数是无限次，i 的实际值会大 1，所以要减去 1.
				i = options.count != Infinity ? i : i - 1;
				
				//调用结束函数，并传入总次数
				options.callback.apply($that, [i, options.count]);
				
				//清理元素上缓存的计时器数据.
				$that.removeData("timer-options");
				$that.removeData("timer-key");
				$that.removeData("timer-i");
				
				return $;
			};
			
			//自动放置计时器的回调函数.
			var autoCallback = function() {
				
				//执行计时器任务函数，并且把作用域设置为当前调用的 jquery 元素，另外参数代入调用次数统计，以及目标次数.
				options.iteration.apply($that, [i, options.count]);
				
				//设置计时器.
				setTimer();
				
				//记录调用次数增加一次.
				i += 1;
				
				//更新调用次数记录到元素缓存.
				$that.data("timer-i", i);
			};
			
			//如果设置了返回值，则立即返回. 不再继续执行，也不放置计时器了.
			var reValue = null;
			
			//根据第一个参数的类型，自动选择配置初始化方案.
			switch(typeof params[0]) {
			
				//如果第一个参数是布尔值，或者停止正在元素上运行的计时器.
				case "boolean":
					//如果设置为 true，则停止计时器.
					if( params[0] ) {
						clearTimer(
							$that.data("timer-options"),
							$that.data("timer-key"),
							$that.data("timer-i")
						);
						reValue = $;
					}
				break;
				
				//如果第一个参数是函数，则使用默认的配置执行.
				case "function":
					$.extend(options, {"iteration": params[0]});
					//把配置记录到元素缓存.
					//$that.data("timer-options", options);
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
				
				//如果第一个参数是字符串，还没想好做什么.
				case "string": break;
				
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
				autoCallback.apply(this, [i, key, options]);
			} else {
				setTimer.apply(this, [i, key, options]);
			}
			
			//把放置计时器时返回的标识记录.
			$that.data("timer-key", key);
			
			//把配置参数压入缓存里记录下来.
			$that.data("timer-options", options);
			
			return $;
			
		}
	});

}($);