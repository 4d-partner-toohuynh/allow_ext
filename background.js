chrome.runtime.onMessage.addListener((message, sender, _) => {
  if (message.action === "updateIcon") {
    const iconPath = message.isEnabled ? "allow.png" : "disallow.png";
    const tabId = sender.tab ? sender.tab.id : message.tabId;
    if (tabId) {
      chrome.action.setIcon({
        path: { 16: iconPath },
        tabId: tabId,
      });
    }
  }
});
