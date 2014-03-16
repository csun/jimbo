var jimbo = jimbo || {};

/**
* queue
* Deals with tabs queued for opening later
**/
jimbo.queue = (function() {
	/**
	* queueHighlightedTabs()
	* Add all currenty highlighted tabs to the end of the
	* queue and remove them from the window
	**/
	function queueHighlightedTabs() {
		jimbo.window.getHighlightedTabs(function(tabs) {
			jimbo.storage.addTabListToQueue(tabs);
			jimbo.window.removeTabs(tabs);
		});
	}

	/**
	* openFirstTab()
	* Open the first tab in the queue and remove it
	* from the queue
	**/
	function openFirstTab() {
		jimbo.storage.dequeueFirstTab(function(tab) {
			jimbo.window.addTabs(tab);
		});
	}

	return {
		"queueHighlightedTabs": queueHighlightedTabs,
		"openFirstTab": openFirstTab
	}
})();