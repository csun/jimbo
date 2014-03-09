chrome.runtime.onInstalled.addListener(setupStorage);
chrome.runtime.onMessage.addListener(handleMessage);
chrome.omnibox.onInputEntered.addListener(jimbo.omnibox.handleInput);

function setupStorage(details) {
	if(details.reason === "install") {
		jimbo.storage.reset();
	}
}

function handleMessage(request, sender, sendResponse) {
	switch(request.type) {
		case "save": save();
		break; 
		case "saveAs": saveAs(request.name);
		break;
		case "load": load(request.name);
		break;
		case "new": newSession();
	}
}

function save() {
	jimbo.session.save();
}

function saveAs(name) {
	jimbo.session.saveAs(name, function() {
		jimbo.session.setCurrentName(name);
	});
}

function load(name) {
	jimbo.session.save(function() {
		jimbo.session.load(name);
	});
}

function newSession() {
	jimbo.session.save(function() {
		jimbo.session.startNew();
	});
}