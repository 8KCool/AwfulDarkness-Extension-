"use strict";
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(tab);
    if (changeInfo.url && changeInfo.url.includes("youtube.com/watch")) {
        const queryParameters = changeInfo.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);
        const messageData = {
            type: "NEW",
            videoId: urlParameters.get("v"),
        };
        chrome.tabs.sendMessage(tabId, messageData);
    }
});
