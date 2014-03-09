var jimbo = jimbo || {};

/**
* omnibox
* Handles input from the omnibox and commands as messages
**/
jimbo.omnibox = (function () {
	/**
	* Mappings of command names to functions
	**/
	var MAPPINGS = {
		"save": { "func": save, "numArgs": 0 },
		"saveas": { "func": saveAs, "numArgs": 1 },
		"load": { "func": load, "numArgs": 1 },
		"new": { "func": newSession, "numArgs": 0 }
	}

	/**
	* handleInput(string text)
	* Handles the text input from the omnibox
	**/
	function handleInput(text) {
		handleCommand(new jimbo.OmniboxCommand(text));
	}

	/**
	* handleCommand(OmniboxCommand command)
	* Handles a processed command from the omnibox
	**/
	function handleCommand(command) {
		var mapping = MAPPINGS[command.name];
		if(mapping !== undefined && mapping.numArgs === command.numArgs) {
			mapping.func.apply(null, command.args);
		}
	}

	/**
	* save()
	* Sends a message for the save command
	**/
	function save() {
		chrome.extension.sendMessage( {
			"type": "save"
		});
	}

	/**
	* saveAs(string name)
	* Sends a message for the saveas command under the given name
	**/
	function saveAs(name) {
		chrome.extension.sendMessage( {
			"type": "saveAs",
			"name": name
		});
	}

	/**
	* load(string name)
	* Sends a message for the load command under the given name
	**/
	function load(name) {
		chrome.extension.sendMessage( {
			"type": "load",
			"name": name
		});
	}


	/**
	* newSession()
	* Sends a message for the new command
	**/
	function newSession() {
		chrome.extension.sendMessage( {
			"type": "new"
		});
	}

	return { 
		"handleInput": handleInput
	}
})();
