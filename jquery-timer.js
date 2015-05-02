jQuery.fn.extend({
	/**
     * 停止计时器.
     * @return (Object)this 支持链式调用.
     * @author Eded.Wang
     */
    stopTimer: function() {
        clearTimeout(this.data("timer"));  //获取计时器标识，来清除计时器.
		this.removeData("timer");  //清空计时器标识缓存.
        return this;  //返回自身.
    },
	/**
	 * 设置计时器，所有的参数都为可选参数.
	 * @param (Function)fun 回调函数 {默认值:$.noop}.
	 * @param (Number)time 回调间隔 {默认值:2000}.
	 * @param (Number)iCount 回调次数 {默认值:0}.
	 * @param (Boolean)immediately 是否立即执行 {默认值:false}.
	 * @param (Function)callback 计时完成后的回调函数，无限循环回调失效 {默认值:$.noop}.
	 * @return (Object)this 支链式调用.
	 * @author Eded.Wang
	 * @date 2015-03-13 17:13.
	 */
	setTimer: function() {
		var fun = arguments[0] || $.noop, //设置回调函数名称.
			time = arguments[1] || 2000, //设置回调时间间隔.
			iCount = arguments[2] || 0, //设置回调次数.
			immediately = arguments[3] || false, //回调函数立即执行.
			callback = arguments[4] || $.noop, //计时完成后的回调函数.
			iNum = 0, //已经执行的次数.
			that = this, //缓存当前对象.
			id = this.data("timer"), //设置缓存变量.
			timer = null;  //缓存计时标识.
		
		/* 如果计时器已经在进行，则取消设置. */
		if( id ) { return; }
		
		/* 清除计时器标识. */
		this.stopTimer();
		
		/* 如果启用立即执行，无论如何先执行一次函数. */
		immediately && !function() {
			//执行回调函数，并且代入参数，实现获取 计数 剩余次数.
			fun.apply(that, [iNum += 1, iCount - 1]);
		}();
		
		/* 选择计时器执行方案. */
		switch (true) {
			/* 循环一次. */
			case iCount == 1:
				!immediately  //如果立即执行启用，则放弃设置计时器.
					? (timer = setTimeout(function() {
						//执行回调函数，并且代入参数，实现获取 计数 剩余次数.
						fun.apply(that, [iNum, iCount]);
						callback.apply(that);  //执行回调函数.
					}, time))
					: !callback.apply(that);  //立即执行回调函数.
				break;
			/* 循环指定次数. */
			case iCount > 1:
				immediately && (iCount-=1);  //如果立即执行启用，循环次数减一次.
				timer = setInterval(function() {
					iNum += 1;  //循环计数加一次.
					( iCount -= 1 ) >= 0  //检查是否达到指定循环次数.
						? fun.apply(that, [iNum, iCount])  //执行回调函数，并且代入参数，实现获取 计数 剩余次数.
						: clearTimeout(timer) || !callback.apply(that);  //清除计时器，并执行回调.
				}, time);
				break;
			/* 进行无限循环. */
			case iCount <= 0:
				timer = setInterval(function() {
					iNum += 1;  //循环计数加一次.
					fun.apply(that, [iNum, iCount]);  //执行回调函数，并且代入参数，实现获取 计数 剩余次数.
				}, time);
				break;
		}
		
		/* 添加计时器标识. */
		that.data("timer", timer);

		return that;
	}
});