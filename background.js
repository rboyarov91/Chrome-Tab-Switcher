console.log("running background script");
chrome.commands.onCommand.addListener( function(command) {
	console.log('onCommand event received for message: ', command);
    if(command === "switch-tab-left"){
	    console.log("switching to the right");
	    chrome.tabs.query({currentWindow: true},
		    function(tabArray){
		    	if (tabArray[0].active) {
		    		chrome.tabs.update(tabArray[tabArray.length - 1].id, {"active" : true});
		    		return;
		    	}
		    	currentFound = false;
		    	l = tabArray.length - 1;
		    	console.log('length: ' + l);
		    	for (tab in tabArray) {
		    		index = l - tab ;
		    		console.log('index: ' + index);
		    		console.log('checking tab:' + tab + 'is active? ' + tabArray[index].active);
		    		if (tabArray[index].active) {
		    			currentFound = true;
		    		}
		    		else if (currentFound) {
		    			chrome.tabs.update(tabArray[index].id, {"active" : true});
		    			break;
		    		}
		    	}
		    })
    }
    if(command === "switch-tab-right"){
	    console.log("switching to the left");
	    chrome.tabs.query({currentWindow: true,},
		    function(tabArray){
		    	currentFound = false;
		    	for (tab in tabArray) {
		    		if (tabArray[tabArray.length - 1].active) {
		    			chrome.tabs.update(tabArray[0].id, {"active" : true});
		    			return;
		    		}
		    		console.log('checking tab:' + tab + 'is active? ' + tabArray[tab].active);
		    		if (tabArray[tab].active) {
		    			currentFound = true;
		    		}
		    		else if (currentFound) {
		    			console.log('changing to tab: ' + tab);
		    			chrome.tabs.update(tabArray[tab].id, {"active" : true});
		    			break;
		    		}
		    	}
		    })
    }
});
