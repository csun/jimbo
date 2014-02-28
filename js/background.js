chrome.runtime.onInstalled.addListener(setupStorage);
chrome.runtime.onMessage.addListener(handleMessage);

function setupStorage(details) {
	if(details.reason === "install") {
		storage.reset();
	}
}

function handleMessage(request, sender, sendResponse) {
	switch(request.type) {
		case "queue": tabManager.getHighlightedTabs(queueTabs);
		break;
		case "dequeue": openFirstQueued();
		break;
	}
}

function queueTabs(tabs) {
	storage.queueTabs(tabs);
	tabManager.removeTabs(tabs);
}

function openFirstQueued() {
	storage.getFirstQueued(tabManager.openStoredTabs);
}