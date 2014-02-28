var TabRecord = (function () {
	function TabRecord(tab) {
		this.url = tab.url;
		this.title = tab.title;
	}

	TabRecord.open = function(record) {
		chrome.tabs.create({ "url": record.url });
	}

	return TabRecord;
})();
