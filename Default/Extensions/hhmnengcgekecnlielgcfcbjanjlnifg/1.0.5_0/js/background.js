let canvas;
const defaultType = "png";
const alwaysAskBeforeSave = true;
const supportedTypes = ["JPG", "PNG", "WebP", "PDF", "GIF"];
const { runtime, contextMenus, browserAction, tabs, downloads } = chrome;

const getImageName = (src, type) => {
  if (src.match(/googleusercontent\.com\/[0-9a-zA-Z]{30,}/)) return "screenshot." + type;

  let filename = src
    .replace(/[?#].*/, "")
    .replace(/.*[\/]/, "")
    .replace(/\+/g, " ");
  filename = decodeURIComponent(filename);
  filename = filename.replace(/[\x00-\x7f]+/g, (s) => s.replace(/[^\w\-\.\,@ ]+/g, ""));

  while (filename.match(/\.[^0-9a-z]*\./)) {
    filename = filename.replace(/\.[^0-9a-z]*\./g, ".");
  }

  filename = filename.replace(/\s\s+/g, " ").trim();
  filename = filename.replace(/\.(jpe?g|png|gif|webp|svg)$/gi, "").trim();
  if (filename.length > 32) filename = filename.substr(0, 32);
  filename = filename.replace(/[^0-9a-z]+$/i, "").trim();
  if (!filename) filename = "image";
  return filename + "." + type;
};

// Download Files
const downloadFile = (url, filename) => {
  downloads.download({ url, filename, saveAs: localStorage.alwaysAskBeforeSave === "true" }, () => {
    if (runtime.lastError) alert("An error occurred while saving the image: \n" + runtime.lastError.message);
  });
};

const saveImageAs = (img, type, name) => {
  if (!canvas) canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  let context = canvas.getContext("2d");
  context.drawImage(img, 0, 0);

  let mimeType = "image/" + (type == "jpg" ? "jpeg" : type);
  let url = canvas.toDataURL(mimeType);
  let filename = name ? name : getImageName(img.src, type);

  // Save as PDF
  if (type === "pdf") {
    const pdf = new jsPDF({ unit: "pt", orientation: "l", format: [canvas.width + 30, canvas.height + 50] }); // set surface larger according to desired margins
    pdf.setFontSize(14);
    pdf.text(15, 25, filename);
    pdf.addImage(img, "JPEG", 15, 35, canvas.width, canvas.height); // set margins there in image / 2 of margins above
    pdf.save(filename);
  } else downloadFile(url, filename); // Download Image
};

const verifyImgSrc = (srcUrl, type, name = "") => {
  let img = new Image();
  img.onload = () => saveImageAs(img, type, name);
  img.onerror = () => alert("An error occurred while loading the image: \n" + srcUrl);
  img.src = srcUrl;
};

supportedTypes.forEach((type) => {
  contextMenus.create({
    type: "normal",
    contexts: ["image"],
    title: "Save as " + type,
    id: type.toLocaleLowerCase(),
    onclick: ({ mediaType, srcUrl, menuItemId }) => {
      if (mediaType == "image" && srcUrl) {
        if (menuItemId === "gif") {
          if (srcUrl.startsWith("http") && srcUrl.includes(".gif")) downloadFile(srcUrl, getImageName(srcUrl, "gif"));
          else alert("It is not a GIF. Please choose another option to download the image.");
        } else verifyImgSrc(srcUrl, menuItemId);
      } else alert("It is not an image. Please choose an image to download");
    },
  });
});
contextMenus.create({ type: "separator", contexts: ["image"] });
contextMenus.create({
  type: "normal",
  contexts: ["image"],
  title: "Convert Local Files",
  onclick: (info, { id }) => tabs.sendMessage(id, { action: "ACTION_CLICKED" }),
});
contextMenus.create({ type: "separator", contexts: ["image"] });
contextMenus.create({
  type: "normal",
  contexts: ["image"],
  title: "View in Store",
  onclick: () => tabs.create({ url: "https://chrome.google.com/webstore/detail/" + runtime.id }),
});

browserAction.onClicked.addListener(({ id }) => tabs.sendMessage(id, { action: "ACTION_CLICKED", configs: localStorage }));

runtime.onMessage.addListener(({ action, file, configs, src }, sender, sendResponse) => {
  if (action === "CONVERT_FILE") verifyImgSrc(file.url, file.type, file.name);

  if (action === "SAVE_CONFIGS") {
    if (configs.defaultType) localStorage.defaultType = configs.defaultType;
    if (configs.alwaysAskBeforeSave !== undefined) localStorage.alwaysAskBeforeSave = configs.alwaysAskBeforeSave;
  }

  if (action === "DOWNLOAD_GIF" && src) downloadFile(src, getImageName(src, "gif"));

  sendResponse(true);
});

runtime.onInstalled.addListener(() => {
  if (!localStorage.defaultType) localStorage.defaultType = defaultType;
  if (!localStorage.alwaysAskBeforeSave) localStorage.alwaysAskBeforeSave = alwaysAskBeforeSave;
});
