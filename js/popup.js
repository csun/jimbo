window.onload = function() {
    document.getElementById("queue").onclick = function() {
        chrome.extension.sendMessage({
            type: "queue"
        });
    }

    document.getElementById("dequeue").onclick = function() {
        chrome.extension.sendMessage({
            type: "dequeue"
        });
    }

    document.getElementById("saveSession").onclick = function() {
        chrome.extension.sendMessage({
            type: "saveSession",
            name: document.getElementById("sessionName").value
        });
    }

    document.getElementById("loadSession").onclick = function() {
        chrome.extension.sendMessage({
            type: "loadSession",
            name: document.getElementById("sessionName").value
        });
    }
}