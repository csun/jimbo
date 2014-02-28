var tabManager = (function () {
	function getHighlightedTabs(callback) {
		chrome.tabs.query({ "highlighted": true, "currentWindow": true },
			callback);
	}

	function removeTabs(tabs) {
		var idArray = [];
		for(var i = 0; i < tabs.length; i++) {
			idArray.push(tabs[i].id);
		}

		chrome.tabs.remove(idArray);
	}

	function openTabRecords(records) {
		if(!(records instanceof Array)) {
			TabRecord.open(records);
			return;
		}

		for(var i = 0; i < records.length; i++) {
			TabRecord.open(records[i]);
		}
	}

	function getCurrentSessionTabs(callback) {
		chrome.tabs.query({ "currentWindow": true }, callback);
	}

	function replaceCurrentSession(newSession) {
		chrome.tabs.query({ "currentWindow": true }, function(tabs) {
			openTabRecords(newSession);
			removeTabs(tabs);
		});
	}

	return { 
		"getHighlightedTabs": getHighlightedTabs,
		"removeTabs": removeTabs,
		"openTabRecords": openTabRecords,
		"getCurrentSessionTabs": getCurrentSessionTabs,
		"replaceCurrentSession": replaceCurrentSession
	}
})();
