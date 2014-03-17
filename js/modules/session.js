var jimbo = jimbo || {};

/**
* session
* Deals with the current session of the active window
**/
jimbo.session = (function() {
	var NEW_SESSION_NAME = "";
	var currentName = NEW_SESSION_NAME;

	/**
	* startNew()
	* Replace the current session with an empty one
	**/
	function startNew() {
		setCurrentName(NEW_SESSION_NAME);
		jimbo.window.loadTabs(jimbo.Tab.NEW_TAB);
	}

	/**
	* save(function() callback)
	* If currently in a session, save the current session to storage,
	* then call callback
	**/
	function save(callback) {
		var name = getCurrentName();
		if(name !== NEW_SESSION_NAME) {
			saveAs(name, callback);
		}
		else {
			callback();
		}
	}

	/**
	* load(string name)
	* If a session has been saved as name, replace the current
	* session with it
	**/
	function load(name) {
		jimbo.storage.getSessionTabList(name, function(tabs) {
			setCurrentName(name);
			jimbo.window.loadTabs(tabs);
		});
	}

	/**
	* saveAs(string name, function() callback)
	* Save the current session under name, then call callback
	**/
	function saveAs(name, callback) {
		jimbo.window.getAllTabs(function(tabs) {
			jimbo.storage.saveSessionTabList(name, tabs, callback);
		});
	}

	/**
	* getCurrentName()
	* Returns the current session's name
	**/
	function getCurrentName() {
		return currentName;
	}

	/**
	* setCurrentName(string name)
	* Set the name of the current session to the given name
	**/
	function setCurrentName(name) {
		currentName = name;
	}

	return {
		"startNew": startNew,
		"save": save,
		"load": load,
		"saveAs": saveAs,
		"getCurrentName": getCurrentName,
		"setCurrentName": setCurrentName
	}
})();