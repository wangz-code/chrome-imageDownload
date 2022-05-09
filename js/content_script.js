var imgValue = {};
var sources = [],
	i = 0,
	bgIm,
	protocol = location.protocol;
origin = location.origin;

function filename(key, url) {
	let n = "";
	let types = ["jpg", "png", "gif"];
	types.forEach((item) => {
		if (url.includes(item)) {
			n = "." + item;
		}
	});
	let path = "pic_";
	return path + key.toString().padStart(3, "00") + n;
}

var img = document.getElementsByTagName("img");
var tittle = document.getElementsByTagName("title")[0].innerText;

for (var i = 0; img[i]; i++) {
	var src = img[i].getAttribute("src");
	if (src && !src.includes("logo")) {
		var newFileName = filename(i, src);
		if (newFileName.includes(".")) {
			imgValue[src] = newFileName;
			sources.push(src);
		}
	}
}

chrome.runtime.sendMessage(
	{
		greeting: { sources, imgValue, tittle },
	},
	function (e) {}
);
