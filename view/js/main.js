(function(){
	var colors = [
			"inteliBlue-bg","inteliGreen-bg",
			"inteliRed-bg","inteliOrange-bg",
			"inteliYellow-bg","inteliPurple-bg"],
		divs = ["#upper_left_","#upper_right_","#bottom_right_","#bottom_left_"],
		clock = 0, sides = ["left","up","right","down"],
		states = [
			{
				showing:"first",
				color: colors[Math.floor(Math.random()*colors.length)],
				enterBy: sides[0]
			},
			{
				showing:"first",
				color: colors[Math.floor(Math.random()*colors.length)],
				enterBy: sides[1]
			},
			{
				showing:"first",
				color: colors[Math.floor(Math.random()*colors.length)],
				enterBy: sides[2]
			},
			{
				showing:"first",
				color: colors[Math.floor(Math.random()*colors.length)],
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
		var newColor = Math.floor(Math.random()*colors.length),
		    oldClass = states[clock].color, old = states[clock].showing, 
		    actual = (old == "first" ? "second" : "first"),
		    x = $(divs[clock]+old).width() + 'px',
		    moveTo = states[clock].enterBy;
		

		$(divs[clock]+actual)
			.removeClass('hidden')
			.removeClass(oldClass)
			.addClass(colors[newColor])
			.transition({rotateX:'360deg', duration:800});


		$(divs[clock]+old).addClass('hidden');
		$(divs[clock]+old).removeAttr('style');

		states[clock].showing = actual;
		states[clock].color = colors[newColor];
		
		//$(divs[clock]+actual).attr('style','');
		clock++;
		if(clock > 3)
			clock=0;
	}

	function sayHi(){
		$('#announcer').removeAttr('style').transition({opacity:100});
		setTimeout(function(){
			$('#announcer').transition({opacity:0}).transition({display:'none'});
		},3000);

	}
	//setInterval(sayHi,8000);
	var time = setInterval(changeColor,2000);
	setTimeout(function(){clearInterval(time);},100000);

})();
