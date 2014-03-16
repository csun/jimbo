var jimbo = jimbo || {};

/**
* window
* Deals with the active window
**/
jimbo.window = (function() {
	/**
	* addTabs(TabList or Tab tabs)
	* Add all of the given tabs to the window
	**/
	function addTabs(tabs) {
		tabs.open();
	}

	/**
	* loadTabs(Tab or TabList tabs)
	* Replace all tabs in the window with the given tabs
	**/
	function loadTabs(tabs) {
		getAllTabs(function(oldTabs) {
			addTabs(tabs);
			removeTabs(oldTabs);
		});
	}

	/**
	* getAllTabs(function(TabList) callback)
	* Get all of the tabs in the window and give them to callback
	**/
	function getAllTabs(callback) {
		chrome.tabs.query({ "currentWindow": true }, function(tabs) {
			var tl = new jimbo.TabList(tabs);
			callback(tl);
		});
	}

	/**
	* getHighlightedTabs(function(TabList) callback)
	* Get all highlighted tabs and give them to callback
	**/
	function getHighlightedTabs(callback) {
		chrome.tabs.query({ "currentWindow": true, "highlighted": true }, function(tabs) {
			callback(new jimbo.TabList(tabs));
		});
	}
	
	/**
	* removeTabs(TabList or Tab tabs)
	* Remove all given tabs from window
	**/
	function removeTabs(tabs) {
		tabs.remove();
	}

	return {
		"addTabs": addTabs,
		"loadTabs": loadTabs,
		"getAllTabs": getAllTabs,
		"getHighlightedTabs": getHighlightedTabs,
		"removeTabs": removeTabs
	}
})();