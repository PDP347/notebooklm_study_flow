chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "nlsf:download") {
    handleDownload(message.payload, sendResponse);
    return true;
  }

  if (message?.type === "nlsf:download-direct") {
    handleDirectDownload(message.payload, sendResponse);
    return true;
  }

  return false;
});

function handleDownload(payload, sendResponse) {
  chrome.downloads.download(
    {
      url: payload.url,
      filename: payload.filename,
      saveAs: true
    },
    (downloadId) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          ok: false,
          error: chrome.runtime.lastError.message
        });
        return;
      }

      sendResponse({
        ok: true,
        downloadId
      });
    }
  );
}

function handleDirectDownload(payload, sendResponse) {
  chrome.downloads.download(
    {
      url: payload.url,
      filename: payload.filename,
      saveAs: true
    },
    (downloadId) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          ok: false,
          error: chrome.runtime.lastError.message
        });
        return;
      }

      sendResponse({
        ok: true,
        downloadId
      });
    }
  );
}
