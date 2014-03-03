var storageManager = (function () {
	function reset() {
		chrome.storage.local.set( { "queue": [], "sessions": {} });
	}

	function queueTabs(tabs) {
		var records = convertTabsToRecords(tabs);
		addToQueue(records);
	}

	function convertTabsToRecords(tabs) {
		var records = [];
		for(var i = 0; i < tabs.length; i++) {
			records.push(new TabRecord(tabs[i]));
		}

		return records;
	}

	function addToQueue(records) {
		updateRecord("queue", function(result) {
			return { "queue": result.queue.concat(records) }
		});
	}

	function getFirstQueued(callback) {
		updateRecord("queue", function(result){
			if(result.queue.length > 0) {
				callback(result.queue.shift());
			}
			return result;
		});
	}

	function saveSession(name, tabs) {
		updateRecord("sessions", function(result) {
			result.sessions[name] = convertTabsToRecords(tabs);
			return result;
		});
	}

	function getSession(name, callback) {
		chrome.storage.local.get("sessions", function(result) {
			if(result.sessions[name] === undefined) {
				callback(null);
				return;
			}
			callback(result.sessions[name]);
		});
	}

	function updateRecord(key, updateFunction) {
		chrome.storage.local.get(key, function(result) {
			chrome.storage.local.set(updateFunction(result));
		});
	}

	return {
		"reset": reset,
		"queueTabs": queueTabs,
		"getFirstQueued": getFirstQueued,
		"saveSession": saveSession,
		"getSession": getSession
	}
})();
