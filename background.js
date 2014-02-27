chrome.runtime.onInstalled.addListener(setupStorage);
chrome.runtime.onMessage.addListener(handleMessage);

function setupStorage(details) {
	if(details.reason === "install") {
		chrome.storage.local.set( { "queue": [], "sessions": [] });
	}
}

function handleMessage(request, sender, sendResponse) {
	switch(request.type) {
		case "queue": queueHighlightedTabs();
		break;
		case "dequeue": loadFirstQueued();
		break;
	}
}

function queueHighlightedTabs() {
	chrome.tabs.query({ "highlighted": true }, queueTabs)
}

function queueTabs(tabs) {
	var allUrls = [];
	var allIds = [];

	for(var i = 0; i < tabs.length; i++) {
		allUrls.push(tabs[i].url);
		allIds.push(tabs[i].id);
	}

	chrome.tabs.remove(allIds);
	addUrlsToQueue(allUrls);
}

function addUrlsToQueue(urls) {
	chrome.storage.local.get("queue", function(objects) {
		var newQueue = objects.queue;

		for(var i = 0; i < urls.length; i++) {
			newQueue.push(urls[i]);
		}

		chrome.storage.local.set({ "queue": newQueue });
	});
}

function loadFirstQueued() {
	chrome.storage.local.get("queue", function(objects) {
		if(objects.queue.length > 0) {
			var currentQueue = objects.queue;
			var url = currentQueue.shift();

			chrome.tabs.create({ "url": url });
			chrome.storage.local.set({ "queue": currentQueue });
		}
	});
}