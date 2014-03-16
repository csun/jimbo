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

		this.open = open;
		this.remove = remove;
		this.toStoreableArray = toStoreableArray ;
		this.fromStoredArray = fromStoredArray;
	}

	/**
	* open()
	* Open all Tabs in this TabList
	**/
	function open() {
		this.tabs.forEach(function(tab) {
			tab.open();
		});
	}

	/**
	* remove()
	* Remove all Tabs in this TabList
	**/
	function remove() {
		this.tabs.forEach(function(tab) {
			tab.remove();
		});
	}

	/**
	* toStoreableArray()
	* Returns an array of tab data for storage
	**/
	function toStoreableArray() {
		var storeableArray = [];
		this.tabs.forEach(function(tab) {
			storeableArray.push(tab.toStoreableData());
		});

		return storeableArray;
	}

	/**
	* fromeStoredArray(array of stored tab data tabArray)
	* Load a stored array of tab data into this TabList
	**/
	function fromStoredArray(tabArray) {
		this.tabs = [];
		for(var i = 0; i < tabArray.length; i++){
			var tab = new jimbo.Tab();
			tab.fromStoredData(tabArray[i]);

			this.tabs.push(tab);
		}
	}

	return TabList;
})();