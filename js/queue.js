var jimbo = jimbo || {};

/**
* queue
* Deals with tabs queued for opening
**/
jimbo.queue = (function() {
	function queueHighlightedTabs() {
		jimbo.window.getHighlightedTabs(function(tabs) {
			jimbo.storage.addTabListToQueue(tabs);
			jimbo.window.removeTabs(tabs);
		});
	}

	function loadFirstTab() {
		jimbo.storage.dequeueFirstTab(function(tab) {
			jimbo.window.addTabs(tab);
		});
	}

	return {
		"queueHighlightedTabs": queueHighlightedTabs,
		"loadFirstTab": loadFirstTab
	}
})();