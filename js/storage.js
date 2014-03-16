var jimbo = jimbo || {};

/**
* storage
* Deals with all stored data. TabLists are stored as
* arrays, then converted later.
**/
jimbo.storage = (function() {
	/**
	* reset()
	* Remove all stored records
	**/
	function reset() {
		setStoredObject("sessions", {});
		setStoredObject("queue", []);
	}

	/**
	* saveSessionTabList(string name, TabList tabs, function() callback)
	* Store the given tabs under the given name and call callback when done
	**/
	function saveSessionTabList(name, tabs, callback) {
		setStoredObjectProperty("sessions", name, tabs.toStoreableArray(), callback);
	}

	/**
	* getSessionTabList(string name, function(TabList) callback)
	* Get the TabList stored under given name and give to callback
	**/
	function getSessionTabList(name, callback) {
		getStoredObjectProperty("sessions", name, function(tabsArray) {
			var tabList = new jimbo.TabList();
			tabList.fromStoredArray(tabsArray);

			callback(tabList);
		});
	}

	/**
	* addTabListToQueue(TabList newTabs)
	* Store a TabList at the end of the current queue
	**/
	function addTabListToQueue(newTabs) {
		getStoredObject("queue", function(currentTabsArray) {
			var newTabsArray = currentTabsArray.concat(newTabs.toStoreableArray());
			setStoredObject("queue", newTabsArray);
		});
	}

	/**
	* dequeueFirstTab(function(Tab) callback)
	* Remove the first Tab from the queue and give it to
	* callback
	**/
	function dequeueFirstTab(callback) {
		getStoredObject("queue", function(tabsArray) {
			var firstTab = new jimbo.Tab();
			firstTab.fromStoredData(tabsArray.shift());

			callback(firstTab);
			setStoredObjectProperty("queue", "tabs", tabs);
		});
	}

	/**
	* PRIVATE
	* getStoredObjectProperty(string objName, string propName, function(Object) callback)
	* If the given property of the given stored object exists,
	* give it to callback
	**/
	function getStoredObjectProperty(objName, propName, callback) {
		getStoredObject(objName, function(obj) {
			if(obj[propName] !== undefined) {
				callback(obj[propName]);
			}
		});
	}

	/**
	* PRIVATE
	* setStoredObjectProperty(string objName, string propName, Object newValue, function() callback)
	* If the given object is already in storage, set its given
	* property to newValue
	**/
	function setStoredObjectProperty(objName, propName, newValue, callback) {
		getStoredObject(objName, function(obj) {
			obj[propName] = newValue;
			setStoredObject(objName, obj, callback);
		});
	}

	/**
	* PRIVATE
	* getStoredObject(string name, function(Object) callback)
	* If the given object is already in storage, give it to callback,
	* else give an empty object
	**/
	function getStoredObject(name, callback) {
		chrome.storage.local.get(name, function(results) {
			if(results[name] !== undefined) {
				callback(results[name]);
			}
		});
	}

	/**
	* PRIVATE
	* setStoredObject(string name, Object newValue, function() callback)
	* Store newvalue under the given name
	**/
	function setStoredObject(name, newValue, callback) {
		var obj = {};
		obj[name] = newValue;

		chrome.storage.local.set(obj, callback);
	}

	return {
		"reset": reset,
		"saveSessionTabList": saveSessionTabList,
		"getSessionTabList": getSessionTabList,
		"addTabListToQueue": addTabListToQueue,
		"dequeueFirstTab": dequeueFirstTab
	}
})();