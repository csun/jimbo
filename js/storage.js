var storage = (function () {
	function reset() {
		chrome.storage.local.set( { "queue": [], "sessions": [] });
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
		chrome.storage.local.get("queue", function(objects) {
			var newQueue = objects.queue;

			for(var i = 0; i < records.length; i++) {
				newQueue.push(records[i]);
			}

			chrome.storage.local.set({ "queue": newQueue });
		});
	}

	function getFirstQueued(callback) {
		chrome.storage.local.get("queue", function(objects) {
			if(objects.queue.length > 0) {
				var currentQueue = objects.queue;

				callback(currentQueue.shift());
				chrome.storage.local.set({ "queue": currentQueue });
			}
		});
	}

	return {
		"reset": reset,
		"queueTabs": queueTabs,
		"getFirstQueued": getFirstQueued
	}
})();
