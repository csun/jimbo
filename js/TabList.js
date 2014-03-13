var jimbo = jimbo || {};

/**
* TabList
* An object for storing an ordered list of Tabs
**/
jimbo.TabList = (function() {
	/**
	* TabList(array of chrome.tabs.Tab chromeTabs)
	* Create a new TabList from a list of chromeTabs
	**/
	function TabList(chromeTabs) {
		this.tabs = [];

		if(chromeTabs !== undefined) {
			for(var i = 0; i < chromeTabs.length; i++) {
				this.tabs.push(new jimbo.Tab(chromeTabs[i]));
			}
		}
	}

	/**
	* TabList.openAll(TabList tabList)
	* Open all Tabs in a given TabList
	**/
	TabList.openAll = function(tabList) {
		tabList.tabs.forEach(function(tab) {
			jimbo.Tab.open(tab);
		});
	}

	/**
	* TabList.removeAll(TabList tabList)
	* Remove all Tabs in a given TabList
	**/
	TabList.removeAll = function(tabList) {
		tabList.tabs.forEach(function(tab) {
			jimbo.Tab.remove(tab);
		});
	}

	TabList.concat = function(tabList, otherTabs) {
		tabList.tabs = tabList.tabs.concat(otherTabs);
	}

	TabList.shift = function(tabList) {
		return tabList.tabs.shift();
	}

	/**
	* The TabList with all Tabs for a new session
	**/
	TabList.NEW_TAB_LIST = { "tabs": [jimbo.Tab.NEW_TAB] };

	return TabList;
})();