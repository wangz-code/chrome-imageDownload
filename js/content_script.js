var imgValue = {};
var sources = [],
	i = 0,
	bgIm,
	protocol = location.protocol;
origin = location.origin;

function filename(key, url) {
	let n = url.split("wx_fmt=")[1];
	let path = "pic_";
	if (n == "jpeg") {
		return path + key.toString().padStart(3, "00") + ".jpg";
	}
	return path + key.toString().padStart(3, "00") + "." + n;
}

var img = document.getElementsByTagName("img");

for (var i = 0; img[i]; i++) {
	var src = img[i].getAttribute("src");
	if (!src.includes("logo")) {
		imgValue[src] = filename(i, src);
	}
	sources.push(src);
}

chrome.runtime.sendMessage(
	{
		greeting: { sources, imgValue },
	},
	function (e) {}
);
