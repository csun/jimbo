var jimbo = jimbo || {};

/**
* OmniboxCommand
* An object for representing a command and arguments from the
* omnibox
**/
jimbo.OmniboxCommand = (function () {
	/**
	* OmniboxCommand(string text)
	* Create an OmniboxCommand from the given text
	**/
	function OmniboxCommand(text) {
		var split = text.split(" ");
		
		this.name = split.shift();
		this.args = split;
		this.numArgs = this.args.length;
	}

	return OmniboxCommand;
})();
