isCycle = false;
chrome.commands.onCommand.addListener( function(command) {
	chrome.storage.sync.get({
    cycle: true
  }, function(items) {
    isCycle = items.cycle;
  });
	console.log('value read from storage: ' + isCycle);
    if(command === "switch-tab-left"){
	    chrome.tabs.query({currentWindow: true},
		    function(tabArray){
		    	if (tabArray[0].active && isCycle) {
		    		chrome.tabs.update(tabArray[tabArray.length - 1].id, {"active" : true});
		    		return;
		    	}
		    	currentFound = false;
		    	l = tabArray.length - 1;
		    	console.log('length: ' + l);
		    	for (tab in tabArray) {
		    		index = l - tab ;
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
	    chrome.tabs.query({currentWindow: true,},
		    function(tabArray){
		    	currentFound = false;
		    	for (tab in tabArray) {
		    		if (tabArray[tabArray.length - 1].active && isCycle) {
		    			chrome.tabs.update(tabArray[0].id, {"active" : true});
		    			return;
		    		}
		    		if (tabArray[tab].active) {
		    			currentFound = true;
		    		}
		    		else if (currentFound) {
		    			chrome.tabs.update(tabArray[tab].id, {"active" : true});
		    			break;
		    		}
		    	}
		    })
    }
});
