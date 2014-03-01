var omniboxManager = (function () {
	var ACTION_FUNCTION_MAPPINGS = {
		"save": saveSession,
		"load": loadSession
	}

	function handleInput(text, disposition) {
		handleCommand(new OmniboxCommand(text));
	}

	function handleCommand(command) {
		actionFunction = ACTION_FUNCTION_MAPPINGS[command.action];
		actionFunction.apply(null, command.args);
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
