let isHtmlShown = false;
const { runtime } = chrome;
const supportedTypes = ["JPG", "PNG", "WebP", "PDF"];

const getFormatHTML = (defaultType = "png", isSettings = false) => {
  let formatHTML = "";
  supportedTypes.forEach((format) => {
    const inSmallCase = format.toLocaleLowerCase();
    const radioId = (isSettings ? "settings" : "form") + inSmallCase;

    formatHTML += `<label for="${radioId}" class="pointer font-1rem">
    <input id="${radioId}" value="${inSmallCase}" type="radio" name="formats" ${
      inSmallCase === defaultType ? "checked" : ""
    } /> ${format}
  </label>`;
  });

  return formatHTML;
};

runtime.onMessage.addListener(({ action, configs }, sender, sendResponse) => {
  if (action === "ACTION_CLICKED") {
    if (isHtmlShown) removeHTMLContainer();
    else {
      const { defaultType, alwaysAskBeforeSave } = configs;

      const html = `<div class="saveimgtype">
        <div class="s-contain">
          <div class="header">
            <img src="${runtime.getURL("icons/icon128.png")}" class="sslogo" />
            <h2 class="app-name m-0">${runtime.getManifest().name}</h2>
            <button type="button" class="cls-button">&times;</button>
          </div>

          <form id="sform">
            <div class="flex-item form-inpts">
              <label class="font-1rem">Choose Format: </label>
              <div class="flex-item">${getFormatHTML(defaultType)}</div>
            </div>

            <div class="flex-item form-inpts">
              <label for="files" class="font-1rem">Choose Files:</label>
              <input id="files" type="file" accept="image/*" multiple />
            </div>

            <button type="submit" class="font-1rem">Convert and Download</button>
          </form>

          <div class="gconfigs">
            <h4>General Settings</h4>
            <label for="saveask" class="flex-item font-1rem pointer">
              <input type="checkbox" id="saveask" ${
                alwaysAskBeforeSave === "true" ? "checked" : ""
              } /> Always ask before saving the file <small class="underline">(Doesn't applies to PDFs)</small>
            </label>
            <div class="flex-item">
              <strong>Default Format:</strong>
              <div class="flex-item">${getFormatHTML(defaultType, true)}</div>
            </div>
          </div>
        </div>
      </div>`;

      isHtmlShown = true;
      $("body").append(html);
    }
  }

  sendResponse(true);
});

const removeHTMLContainer = () => {
  isHtmlShown = false;
  $(".saveimgtype").remove();
};

$(document).on("click", ".saveimgtype button.cls-button", removeHTMLContainer);

$(document).on("submit", ".saveimgtype form#sform", function (e) {
  e.preventDefault();

  const files = $(this).find("input#files")[0].files;
  const type = $(this).find("input[name=formats]:checked").val();

  Array.from(files).forEach((file) => {
    const name = file.name.split(".")[0] + "." + type;

    let reader = new FileReader();
    reader.onload = (e) => runtime.sendMessage({ action: "CONVERT_FILE", file: { name, url: e.target.result, type } });
    reader.readAsDataURL(file);
  });

  $(this).find("input#files").val("");
});

$(document).on("change", ".saveimgtype .gconfigs input#saveask", function () {
  runtime.sendMessage({ action: "SAVE_CONFIGS", configs: { alwaysAskBeforeSave: $(this).is(":checked") } });
});

$(document).on("change", ".saveimgtype .gconfigs input[name=formats]", function () {
  runtime.sendMessage({ action: "SAVE_CONFIGS", configs: { defaultType: $(this).val() } });
});
