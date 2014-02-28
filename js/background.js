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
		case "saveSession": saveSession(request.name);
		break;
		case "loadSession": loadSession(request.name);
		break;
	}
}

function queueTabs(tabs) {
	storage.queueTabs(tabs);
	tabManager.removeTabs(tabs);
}

function openFirstQueued() {
	storage.getFirstQueued(tabManager.openTabRecords);
}

function saveSession(name) {
	tabManager.getCurrentSessionTabs(function(tabs) {
		storage.saveSession(name, tabs);
	});
}

function loadSession(name) {
	storage.getSession(name, function(session) {
		if(session !== null) {
			tabManager.replaceCurrentSession(session);
		}
	});
}