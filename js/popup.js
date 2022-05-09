chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	chrome.scripting.executeScript({
		target: { tabId: tabs[0].id, allFrames: true },
		files: ["js/content_script.js"],
	});
});


function fileType(key, url) {
	let n = url.split("wx_fmt=")[1];
	let path = "./下载/pic_";
	if (n == "jpeg") {
		return path + key.toString().padStart(3, "00") + ".jpg";
	}
	return path + key.toString().padStart(3, "00") + "." + n;
}


function handleMessage(request, sender, sendResponse) {
	var res = request.greeting;
	var sources = res.sources;
	var imgValue = res.imgValue;
	var btnAll = document.getElementById("downall");
	var textarea = document.getElementById("textarea");
	var total = document.getElementById("total");
	textarea.value = JSON.stringify(imgValue);
	total.innerText = sources.length;
	btnAll.onclick = function () {
		sources.map(function (url, k) {
			chrome.downloads.download(
				{
					url: url,
					conflictAction: "uniquify",
					saveAs: false,
					filename: "./下载/" + imgValue[url],
				},
				function (id) {}
			);
		});
	};
    sendResponse({farewell: "ok"});   
}
chrome.runtime.onMessage.addListener(handleMessage);
