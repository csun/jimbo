var jimbo = jimbo || {};

/**
* window
* Deals with the active window
**/
jimbo.window = (function() {
	/**
	* addTabs(TabList tabs)
	* Add all of the given tabs to the window
	**/
	function addTabs(tabs) {
		jimbo.TabList.openAll(tabs);
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
			callback(new jimbo.TabList(tabs));
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
	* removeTabs(TabList tabs)
	* Remove all given tabs from window
	**/
	function removeTabs(tabs) {
		jimbo.TabList.removeAll(tabs);
	}

	return {
		"addTabs": addTabs,
		"loadTabs": loadTabs,
		"getAllTabs": getAllTabs,
		"getHighlightedTabs": getHighlightedTabs,
		"removeTabs": removeTabs
	}
})();