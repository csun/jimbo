var jimbo = jimbo || {};

/**
* Tab
* An object for storing, opening, and removing a chrome.tabs.Tab
**/
jimbo.Tab = (function() {
	/**
	* Tab(chrome.tabs.Tab chromeTab)
	* Create a Tab based on a chrome representation of a Tab
	**/
	function Tab(chromeTab) {
		this.id = chromeTab.id;
		this.url = chromeTab.url;
		this.title = chromeTab.title;
		this.pinned = chromeTab.pinned;
	}

	/**
	* Tab.open(Tab tab)
	* Open the given tab in the current window
	**/
	Tab.open = function(tab) {
		chrome.tabs.create({ "url": tab.url, "pinned": tab.pinned });
	}

	/**
	* Tab.remove(Tab tab)
	* If the given tab exists in current window, remove it
	*
	* WARNING - Behavior not guaranteed for stored tabs that no
	* longer exist
	**/
	Tab.remove = function(tab) {
		chrome.tabs.remove(tab.id);
	}

	/**
	* An empty Tab
	**/
	Tab.NEW_TAB = { "url": "chrome://newtab" };

	return Tab;
})();