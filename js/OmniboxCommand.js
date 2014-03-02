var OmniboxCommand = (function () {
	function OmniboxCommand(text) {
		var split = text.split(" ");
		
		this.action = split.shift();
		this.args = split;
		this.numArgs = this.args.length;
	}

	return OmniboxCommand;
})();
