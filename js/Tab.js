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
		this.data = {};

		if(chromeTab !== undefined) {
			this.data = {
				"id": chromeTab.id,
				"url": chromeTab.url,
				"title": chromeTab.title,
				"pinned": chromeTab.pinned,
			}
		}

		this.open = open;
		this.remove = remove;
		this.toStoreableData = toStoreableData;
		this.fromStoredData = fromStoredData;
	}

	/**
	* open()
	* Open the given tab in the current window
	**/
	function open() {
		chrome.tabs.create({
			"url": this.data.url,
			"pinned": this.data.pinned
		});
	}

	/**
	* remove()
	* If the given tab exists in current window, remove it
	**/
	function remove() {
		if(this.data.id !== undefined) {
			chrome.tabs.remove(this.data.id);
		}
	}

	function toStoreableData() {
		this.data.id = undefined;
		return this.data;
	}

	function fromStoredData(storedData) {
		this.data = storedData;
	}

	/**
	* An empty Tab
	**/
	Tab.NEW_TAB = new Tab({ "url": "chrome://newtab" });

	return Tab;
})();