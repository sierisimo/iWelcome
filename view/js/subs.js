(function(window,host,port){
	var uri = "ws://"+host+":"+port,
		iW= {}, socket = new window.WebSocket(uri),
		names = window.names, keys = {}, queue = window.queue;

	socket.onmessage = function(guest){
		guest = JSON.parse(guest.data);

		if(guest.length > 0) {

			if(guest.length === 1) {
				if(guest[l].isNew){
					value = guest[0].value;
					keys[guest[l].id] = true;
					names.push(value);
					queue.push(value);
				} else {
					names = guest;
				}
			} else {
				names = guest;
			}
		}
	};

	iW.end = function(){
		socket.close();
	};

	window._iWelcome = iW;

})(window,"192.168.100.64",8889);