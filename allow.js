const elements = document.querySelectorAll('img[src$="blue18.gif"]');
const ss_ex_flg = sessionStorage.getItem("ss_ex_flg");

chrome.runtime.sendMessage({
  action: "updateIcon",
  isEnabled: ss_ex_flg === "true",
});

if (ss_ex_flg === "true") {
  for (const element of elements) {
    const getEleAttr = element.getAttribute("alt");
    const lastQuoteIndex = getEleAttr.lastIndexOf("'");
    const secondLastQuoteIndex = getEleAttr.lastIndexOf(
      "'",
      lastQuoteIndex - 1
    );
    const folderNameFromAlt = getEleAttr.substring(
      secondLastQuoteIndex + 1,
      lastQuoteIndex
    );

    if (!folderNameFromAlt.includes("－－－")) {
      element.click();
      const jBox_elements = document.querySelectorAll(".jBox-content");
      jBox_elements[0].parentElement
        .querySelector(".jBox-Confirm-button-submit")
        .click();
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length > 0) {
      const activeTab = tabs[0];

      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          function: async () => {
            const ss_ex_flg = sessionStorage.getItem("ss_ex_flg");
            if (ss_ex_flg === "false" || !ss_ex_flg) {
              sessionStorage.setItem("ss_ex_flg", true);
            } else if (ss_ex_flg === "true") {
              sessionStorage.setItem("ss_ex_flg", false);
            }
            window.location.reload();
          },
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error(
              "Script injection failed: " + chrome.runtime.lastError.message
            );
          } else {
            console.log("Custom script executed successfully on the page.");
          }
          window.close();
        }
      );
    } else {
      console.error("No active tab found.");
    }
  });
});
