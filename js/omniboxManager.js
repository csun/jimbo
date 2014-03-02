var omniboxManager = (function () {
	var ACTION_FUNCTION_MAPPINGS = {
		"save": { "func": saveSession, "numArgs": 1 },
		"load": { "func": loadSession, "numArgs": 1 }
	}

	function handleInput(text, disposition) {
		handleCommand(new OmniboxCommand(text));
	}

	function handleCommand(command) {
		var afm = ACTION_FUNCTION_MAPPINGS[command.action];
		if(afm !== undefined && afm.numArgs === command.numArgs) {
			afm.func.apply(null, afm.args);
		}
	}

	function saveSession(name) {
		chrome.extension.sendMessage( {
			"type": "saveSession",
			"name": name
		});
	}

	function loadSession(name) {
		chrome.extension.sendMessage( {
			"type": "loadSession",
			"name": name
		});
	}

	return { 
		"handleInput": handleInput
	}
})();
