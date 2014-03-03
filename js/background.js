chrome.runtime.onInstalled.addListener(setupStorage);
chrome.runtime.onMessage.addListener(handleMessage);
chrome.omnibox.onInputEntered.addListener(omniboxManager.handleInput);

function setupStorage(details) {
	if(details.reason === "install") {
		storageManager.reset();
	}
}

function handleMessage(request, sender, sendResponse) {
	switch(request.type) {
		case "queue": tabManager.getHighlightedTabs(queueTabs);
		break;
		case "dequeue": openFirstQueued();
		break;
		case "saveSession": saveSession(request.name);
		break;
		case "loadSession": loadSession(request.name);
		break;
	}
}

function queueTabs(tabs) {
	storageManager.queueTabs(tabs);
	tabManager.removeTabs(tabs);
}

function openFirstQueued() {
	storageManager.getFirstQueued(tabManager.openTabRecords);
}

function saveSession(name) {
	tabManager.getCurrentSessionTabs(function(tabs) {
		storageManager.saveSession(name, tabs);
	});
}

function loadSession(name) {
	storageManager.getSession(name, function(session) {
		if(session !== null) {
			tabManager.replaceCurrentSession(session);
		}
	});
}