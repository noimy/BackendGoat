document.addEventListener("DOMContentLoaded", () => {
  let tabCounter = 0;
  const tabsContainer = document.getElementById("tabs");
  const iframeContainer = document.getElementById("iframe-container");
  const addTabButton = document.getElementById("add-tab-button");

  function createNewTab() {
    tabCounter++;
    const tabId = `tab-${tabCounter}`;
    const iframeId = `iframe-${tabCounter}`;

    const tab = document.createElement("div");
    tab.id = tabId;
    tab.className = "tab";
    tab.textContent = `Tab ${tabCounter}`;
    tab.addEventListener("click", () => switchTab(tabId, iframeId));

    const closeButton = document.createElement("span");
    closeButton.className = "tab-close";
    closeButton.textContent = "×";
    closeButton.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTab(tabId, iframeId);
    });
    tab.appendChild(closeButton);

    const urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.className = "tab-url-input";
    urlInput.placeholder = "Enter URL";

    const goButton = document.createElement("button");
    goButton.className = "tab-go-button";
    goButton.textContent = "Go";
    goButton.addEventListener("click", () => {
      const url = urlInput.value;
      if (url) {
        const iframe = document.getElementById(iframeId);
        iframe.src = `/api/proxy?url=${encodeURIComponent(url)}`;
      }
    });

    tab.appendChild(urlInput);
    tab.appendChild(goButton);
    tabsContainer.appendChild(tab);
    iframeContainer.appendChild(document.createElement("iframe")).id = iframeId;

    switchTab(tabId, iframeId);
  }

  function switchTab(tabId, iframeId) {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll("iframe").forEach((f) => f.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");
    document.getElementById(iframeId).classList.add("active");
  }

  function deleteTab(tabId, iframeId) {
    document.getElementById(tabId)?.remove();
    document.getElementById(iframeId)?.remove();
  }

  addTabButton.addEventListener("click", createNewTab);
  createNewTab();
});
