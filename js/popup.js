window.onload = function() {
    document.getElementById("queue").onclick = function() {
        chrome.extension.sendMessage({
            "type": "queue"
        });
    }

    document.getElementById("dequeue").onclick = function() {
        chrome.extension.sendMessage({
            "type": "dequeue"
        });
    }
}