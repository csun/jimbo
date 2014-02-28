var tabManager = (function () {
	function getHighlightedTabs(callback) {
		chrome.tabs.query({ "highlighted": true, "currentWindow": true },
			callback);
	}

	function removeTabs(tabs) {
		var idArray = [];
		for(var i = 0; i < tabs.length; i++) {
			idArray.push(tabs[i].id);
		}

		chrome.tabs.remove(idArray);
	}

	function openStoredTabs(stored) {
		if(!(stored instanceof Array)) {
			TabRecord.open(stored);
			return;
		}

		for(var i = 0; i < stored.length; i++) {
			TabRecord.open(stored[i]);
		}
	}

	return { 
		"getHighlightedTabs": getHighlightedTabs,
		"removeTabs": removeTabs,
		"openStoredTabs": openStoredTabs
	}
})();
