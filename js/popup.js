chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	chrome.scripting.executeScript({
		target: { tabId: tabs[0].id, allFrames: true },
		files: ["js/content_script.js"],
	});
});

function fileType(key, url) {
	let t = "";
	let types = ["jpg", "png", "gif"];
	types.forEach((item) => {
		if (url.includes(item)) {
			t = "." + item;
		}
	});
	let path = "./下载/pic_";
	return path + key.toString().padStart(3, "00") + t;
}

function handleMessage(request, sender, sendResponse) {
	var res = request.greeting;
	var imgValue = res.imgValue;
	var tittle = res.tittle;
	var btnAll = document.getElementById("downall");
	var textarea = document.getElementById("textarea");
	var total = document.getElementById("total");
	textarea.value = JSON.stringify(imgValue);
	var urlArr = [];
	for (const key in imgValue) {
		urlArr.push(key);
	}
	total.innerText = urlArr.length;

	btnAll.onclick = function () {
		urlArr.map(function (url, k) {
			chrome.downloads.download(
				{
					url: url,
					conflictAction: "uniquify",
					saveAs: false,
					filename: "./" + tittle + "/" + imgValue[url],
				},
				function (id) {}
			);
		});
	};
	sendResponse({ farewell: "ok" });
}
chrome.runtime.onMessage.addListener(handleMessage);
