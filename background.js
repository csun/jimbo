chrome.runtime.onMessage.addListener(handleMessage);

function handleMessage(request, sender, sendResponse) {
	switch(request.type) {
		case "queue": queueCurrentTab();
			break;
		case "dequeue": loadFirstQueued();
	}
}

function queueCurrentTab() {
	chrome.tabs.query({ "active": true }, queue)
}

function queue(tabs) {
	if(tabs.length === 0) {
		return;
	}

	var activeTab = tabs[0];
	chrome.storage.local.get("queue", function(objects) {
		var newQueue = [];
		if("queue" in objects) {
			newQueue = objects.queue;
		}
		newQueue.push(activeTab.url);

		chrome.storage.local.set({ "queue": newQueue });
		chrome.tabs.remove(activeTab.id);
	});
}

function loadFirstQueued() {
	chrome.storage.local.get("queue", function(objects) {
		if("queue" in objects && objects.queue.length > 0) {
			var currentQueue = objects.queue;
			var url = currentQueue.shift();

			chrome.tabs.create({ "url": url });
			chrome.storage.local.set({ "queue": currentQueue });
		}
	});
}