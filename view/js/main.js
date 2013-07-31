(function(window){
	var colors = [
			"inteliBlue-bg","inteliGreen-bg",
			"inteliYellow-bg","inteliPurple-bg"],
		divs = ["#upper_left_","#upper_right_","#bottom_right_","#bottom_left_"],
		clock = 0, sides = ["left","up","right","down"], 
		colorPos = 0, names = [{name:'sier'},{name:'chux',org:'inteli'},{name:'manuel',org:'consis'}], lpShown = 0, queue = [],
		states = [
			{
				showing:"first",
				color: colors[colorPos++],
				enterBy: sides[0]
			},
			{
				showing:"first",
				color: colors[colorPos++],
				enterBy: sides[1]
			},
			{
				showing:"first",
				color: colors[colorPos++],
				enterBy: sides[2]
			},
			{
				showing:"first",
				color: colors[colorPos],
				enterBy: sides[3]
			}
		];

	(function(){
		for(var i = 0; i < divs.length ; i++){
			$(divs[i]+"first").addClass(states[i].color);
			$(divs[i]+"second").addClass(states[i].color);
		}
	})()

	function changeColor(){
		var newColor = (colorPos >= 3 ? 0 : colorPos+1),
		    oldClass = states[clock].color, old = states[clock].showing, 
		    actual = (old == "first" ? "second" : "first"),
		    x = $(divs[clock]+old).width() + 'px', 
		    person, org,
		    moveTo = states[clock].enterBy;

		lpShown = (lpShown >= names.length ? 0 : lpShown);
		person = names[lpShown];
		org = person.org || '';

		$(divs[clock]+actual).children()[0].innerHTML = '<strong>'+person.name+'</strong>'+'<br>'+'<em>&nbsp;'+org+'</em>';
		$(divs[clock]+actual)
			.removeClass('hidden')
			.removeClass(oldClass)
			.addClass(colors[newColor])	
			.transition({rotateX:'360deg', duration:800});

		lpShown++;
		colorPos = newColor;

		$(divs[clock]+old).addClass('hidden');
		$(divs[clock]+old).removeAttr('style');

		states[clock].showing = actual;
		states[clock].color = colors[newColor];
		
		clock++;
		if(clock > 3)
			clock=0;
	}

	function sayHi(){
		if(queue.length > 0){
			var person = queue.shift(), org = person.org || '';
			$('#welcome_guest')[0].innerHTML = '<strong>'+person.name+'</strong>'+'<em>'+org+'</em>';
			$('#announcer').removeAttr('style').transition({opacity:100});
				setTimeout(function(){
				$('#announcer').transition({opacity:0}).transition({display:'none'});
			},7000);
		}
	}
	setInterval(sayHi,7000)
	var time = setInterval(changeColor,4000);
	
	window.names = names;
	window.queue = queue;
	window.sayHi = sayHi;
	window.showPeople = changeColor;
})(window);