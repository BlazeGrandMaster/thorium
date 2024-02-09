(()=>{"use strict";var e,t,s,i={4998:(e,t,s)=>{var i=s(341),n=s(729),r=s(9956),a=s(6229),o=s(2502);const c={key:0,class:"browse-content"},l={class:"drop-zone-content"},g={class:"drop-zone-text"},h={class:"browse-buttons"},p={class:"browse-preview"},d={class:"preview-images"},w=["srcset","type"],u=["src","alt"],m={class:"preview-buttons"},v={key:1,class:"share-content"},f={class:"preview-images"},b=["srcset","type"],k=["src","alt"],y=["src"],S=["src"],_={key:2,class:"error-content"},E={class:"error-text"},I={key:3,class:"spinner",src:"/src/assets/icons/misc/spinner.svg"};s(8755),s(8645),s(9786),s(7817),s(9291);var P=s(2343),C=s(2758),U=s(1068),D=s(2667),O=s(7788),j=s(3145);const x={components:{[C.gV.name]:C.gV,[C.zx.name]:C.zx,[C.iz.name]:C.iz,[C.JO.name]:C.JO,[C.aV.name]:C.aV,[C.HC.name]:C.HC},data:function(){return{dataLoaded:!1,processing:!1,isShare:!1,showSpinner:!1,showError:"",dropState:!1,showBrowseArea:!0,previewImages:null,engines:[],searchAllEngines:!1,showEngineIcons:!1,pasteEnabled:!1,dropEnabled:!1,confirmPaste:!1,theme:""}},computed:{appClasses:function(){return{"browse-view":!this.isShare,"share-view":this.isShare,"drop-state":this.dropState}}},rawData:{session:null},methods:{getText:D.Q,getEngineIcon:n.HF,initSetup:async function(){try{await this.setup()}catch(e){throw await(0,n.c0)({messageId:"error_internalError"}),e}finally{this.dataLoaded=!0}},setup:async function(){const e=await U.ZP.get(O.Gn);if(this.isShare){const t=new URL(window.location.href).searchParams.get("id"),s=await(0,n.S_)(e);if(await(0,n.$S)(t)){const i=[];for(const e of t.split("_")){const t=await j.runtime.sendNativeMessage("application.id",{id:"getSharedImage",shareId:e});if(!t)return void(this.showError=(0,D.Q)("error_invalidPageUrl"));{const e=`data:${(0,n.u$)(t.imageExt)||"application/octet-stream"};base64,${t.imageDataStr}`,s=await(0,n.nV)({dataUrl:e});s&&i.push(s)}}if(i.length){let t;1===s.length?t=s[0]:s.length>1&&"main"===e.searchAllEnginesAction&&(t="allEngines"),t?await this.initShareSearch({engine:t,images:i}):(this.addPreviewImages(i),this.engines=s,this.searchAllEngines="sub"===e.searchAllEnginesAction&&!this.$env.isSamsung,this.showEngineIcons=e.showEngineIcons)}else this.showError=(0,D.Q)("error_invalidImageFile")}else this.showError=(0,D.Q)("error_invalidPageUrl")}else{const t=new URL(window.location.href).searchParams.get("id"),s=await j.runtime.sendMessage({id:"storageRequest",asyncResponse:!0,saveReceipt:!0,storageId:t});s?(this.$options.rawData.session=s,this.dropEnabled=!this.$env.isAndroid,this.pasteEnabled=!(this.$env.isSamsung||this.$env.isMobile&&this.$env.isFirefox),this.confirmPaste=e.confirmPaste,this.pasteEnabled&&window.addEventListener("paste",this.onPasteEvent,{capture:!0,passive:!1})):this.showError=(0,D.Q)("error_invalidPageUrl")}this.theme=await(0,n.Z8)(e.appTheme),document.addEventListener("themeChange",(e=>{this.theme=e.detail}))},startProcessing:function(){if(!this.processing)return this.processing=!0,!0},stopProcessing:function(){this.processing=!1},onEngineClick:async function(e){if(this.startProcessing())try{await this.initShareSearch({engine:e})}catch(e){throw this.stopProcessing(),await(0,n.c0)({messageId:"error_internalError"}),e}},onCancelButtonClick:function(){this.processing||this.hidePreviewImages()},onSearchButtonClick:async function(){if(this.startProcessing())try{await this.initSearch()}catch(e){throw this.stopProcessing(),await(0,n.c0)({messageId:"error_internalError"}),e}},onBrowseButtonClick:function(){this.processing||this.$refs.browseInput.click()},onPasteButtonClick:function(){this.startProcessing()&&(0,n.RN)().then((e=>e?this.processClipboardImages():(0,n.c0)({messageId:"error_noClipboardReadAccess"}))).finally((()=>{this.stopProcessing()}))},onFileEvent:function(e,t){if(!this.startProcessing())return;let s;"input-event"===t?s=e.target.files:"drop-event"===t&&(s=e.dataTransfer.files),this.processSelectedImages(s).finally((()=>{this.stopProcessing(),"drop-event"===t&&(this.dropState=!1)}))},onPasteEvent:function(e){if(!this.startProcessing())return;if(e.preventDefault(),e.stopImmediatePropagation(),this.showSpinner||this.showError)return void this.stopProcessing();const t=Array.prototype.slice.call(e.clipboardData.files,0,3);this.processClipboardImages(t).finally((()=>{this.stopProcessing()}))},processClipboardImages:async function(e){try{e||(e=await(0,n.QT)());const t=await(0,n.ai)(e);t?this.confirmPaste?this.showPreviewImages(t):await this.initSearch(t):await(0,n.c0)({messageId:"error_invalidImageFile"})}catch(e){throw await(0,n.c0)({messageId:"error_internalError"}),e}},processSelectedImages:async function(e){try{if(e.length>3)return void await(0,n.c0)({messageId:"error_invalidImageCount"});const t=await(0,n.ai)(e);t?await this.initSearch(t):await(0,n.c0)({messageId:"error_invalidImageFile"})}catch(e){throw await(0,n.c0)({messageId:"error_internalError"}),e}},showPreviewImages:function(e){this.showBrowseArea=!1,this.addPreviewImages(e)},hidePreviewImages:function(){this.removePreviewImages(),this.showBrowseArea=!0},addPreviewImages:function(e){e&&(this.previewImages=e.map((e=>({image:(0,P.Xl)(e),objectUrl:URL.createObjectURL(e)}))))},removePreviewImages:function(){this.previewImages&&(this.previewImages.forEach((e=>URL.revokeObjectURL(e.objectUrl))),this.previewImages=null)},setBrokenPreviewImage:function(e){const t=e.target.previousElementSibling;t.srcset=e.target.src,t.type="image/svg+xml"},initShareSearch:async function({engine:e,images:t}={}){this.$options.rawData.session=await(0,n.ed)({sessionOrigin:"share",sessionType:"search",searchMode:"browse",engine:e}),await this.initSearch(t)},initSearch:async function(e){this.showSpinner=!0;try{const t=this.$options.rawData.session;t.closeSourceTab=!0;const s=e||this.previewImages.map((e=>e.image));if(!(e=await(0,n._j)(s)))throw new Error("cannot process images");await(0,n.MX)({message:{id:"imageBrowseSubmit",session:t,images:e},openConnection:this.$env.isSafari})}catch(e){throw this.showSpinner=!1,e}}},created:function(){document.title=(0,D.Q)("pageTitle",[(0,D.Q)("pageTitle_browse"),(0,D.Q)("extensionName")]),this.isShare="share"===new URL(window.location.href).searchParams.get("origin"),this.initSetup()}},T=(0,s(6021).Z)(x,[["render",function(e,t,s,n,r,P){const C=(0,a.up)("vn-icon"),U=(0,a.up)("vn-button"),D=(0,a.up)("vn-list-item"),O=(0,a.up)("vn-divider"),j=(0,a.up)("vn-list"),x=(0,a.up)("vn-app");return e.dataLoaded?((0,a.wg)(),(0,a.j4)(x,{key:0,class:(0,o.normalizeClass)(P.appClasses)},{default:(0,a.w5)((()=>[e.isShare||e.showSpinner||e.showError?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",c,[(0,a.wy)((0,a._)("div",null,[e.dropEnabled?((0,a.wg)(),(0,a.iD)("div",{key:0,class:"drop-zone",onDrop:t[0]||(t[0]=(0,i.withModifiers)((e=>P.onFileEvent(e,"drop-event")),["prevent"])),onDragstart:t[1]||(t[1]=(0,i.withModifiers)((t=>e.dropState=!0),["prevent"])),onDragend:t[2]||(t[2]=t=>e.dropState=!1),onDragenter:t[3]||(t[3]=(0,i.withModifiers)((t=>e.dropState=!0),["prevent"])),onDragleave:t[4]||(t[4]=t=>e.dropState=!1),onDragover:t[5]||(t[5]=(0,i.withModifiers)((()=>{}),["prevent"]))},null,32)):(0,a.kq)("",!0),(0,a.Uk)(),(0,a._)("div",l,[(0,a.Wm)(C,{class:"drop-zone-icon",src:"/src/assets/icons/misc/image.svg"}),(0,a.Uk)(),(0,a._)("div",g,(0,o.toDisplayString)(e.dropEnabled?P.getText("pageContent_browse_"+(e.dropState?"drop":"drag")):P.getText("pageContent_browse")),1),(0,a.Uk)(),(0,a.wy)((0,a._)("div",h,[(0,a._)("input",{ref:"browseInput",class:"browse-input",type:"file",accept:"image/*",multiple:"",onChange:t[6]||(t[6]=e=>P.onFileEvent(e,"input-event"))},null,544),(0,a.Uk)(),(0,a.Wm)(U,{class:"browse-button",disabled:e.processing,onClick:P.onBrowseButtonClick,variant:"tonal"},{default:(0,a.w5)((()=>[(0,a.Uk)((0,o.toDisplayString)(P.getText("buttonLabel_browse")),1)])),_:1},8,["disabled","onClick"]),(0,a.Uk)(),e.pasteEnabled?((0,a.wg)(),(0,a.j4)(U,{key:0,class:"browse-button",disabled:e.processing,onClick:P.onPasteButtonClick,variant:"tonal"},{default:(0,a.w5)((()=>[(0,a.Uk)((0,o.toDisplayString)(P.getText("buttonLabel_paste")),1)])),_:1},8,["disabled","onClick"])):(0,a.kq)("",!0)],512),[[i.vShow,!e.dropState]])])],512),[[i.vShow,e.showBrowseArea]]),(0,a.Uk)(),(0,a.wy)((0,a._)("div",p,[(0,a._)("div",d,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.previewImages,((s,i)=>((0,a.wg)(),(0,a.iD)("picture",{class:"tile-container",key:i},[(0,a._)("source",{srcset:s.objectUrl,type:s.image.type},null,8,w),(0,a.Uk)(),(0,a._)("img",{class:"tile",src:`/src/assets/icons/misc/${"dark"===e.theme?"broken-image-dark":"broken-image"}.svg`,onErrorOnce:t[7]||(t[7]=(...e)=>P.setBrokenPreviewImage&&P.setBrokenPreviewImage(...e)),alt:s.image.name},null,40,u)])))),128))]),(0,a.Uk)(),(0,a._)("div",m,[(0,a.Wm)(U,{class:"browse-button",disabled:e.processing,onClick:P.onCancelButtonClick,variant:"text"},{default:(0,a.w5)((()=>[(0,a.Uk)((0,o.toDisplayString)(P.getText("buttonLabel_cancel")),1)])),_:1},8,["disabled","onClick"]),(0,a.Uk)(),(0,a.Wm)(U,{class:"browse-button",disabled:e.processing,onClick:P.onSearchButtonClick,variant:"tonal"},{default:(0,a.w5)((()=>[(0,a.Uk)((0,o.toDisplayString)(P.getText("buttonLabel_search")),1)])),_:1},8,["disabled","onClick"])])],512),[[i.vShow,e.previewImages]])])),(0,a.Uk)(),!e.isShare||e.showSpinner||e.showError?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",v,[(0,a._)("div",f,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.previewImages,((s,i)=>((0,a.wg)(),(0,a.iD)("picture",{class:"tile-container",key:i},[(0,a._)("source",{srcset:s.objectUrl,type:s.image.type},null,8,b),(0,a.Uk)(),(0,a._)("img",{class:"tile",src:`/src/assets/icons/misc/${"dark"===e.theme?"broken-image-dark":"broken-image"}.svg`,onErrorOnce:t[8]||(t[8]=(...e)=>P.setBrokenPreviewImage&&P.setBrokenPreviewImage(...e)),alt:s.image.name},null,40,k)])))),128))]),(0,a.Uk)(),(0,a.Wm)(j,{class:"list-items"},{default:(0,a.w5)((()=>[e.searchAllEngines?((0,a.wg)(),(0,a.j4)(D,{key:0,title:P.getText("menuItemTitle_allEngines"),onClick:t[9]||(t[9]=e=>P.onEngineClick("allEngines"))},(0,a.Nv)({_:2},[e.showEngineIcons?{name:"prepend",fn:(0,a.w5)((()=>[e.showEngineIcons?((0,a.wg)(),(0,a.iD)("img",{key:0,class:"list-item-icon",src:P.getEngineIcon("allEngines",{variant:e.theme})},null,8,y)):(0,a.kq)("",!0)])),key:"0"}:void 0]),1032,["title"])):(0,a.kq)("",!0),(0,a.Uk)(),e.searchAllEngines?((0,a.wg)(),(0,a.j4)(O,{key:1,class:"list-separator"})):(0,a.kq)("",!0),(0,a.Uk)(),((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e.engines,(t=>((0,a.wg)(),(0,a.j4)(D,{title:P.getText(`menuItemTitle_${t}`),onClick:e=>P.onEngineClick(t)},(0,a.Nv)({_:2},[e.showEngineIcons?{name:"prepend",fn:(0,a.w5)((()=>[(0,a._)("img",{class:"list-item-icon",src:P.getEngineIcon(t,{variant:e.theme})},null,8,S)])),key:"0"}:void 0]),1032,["title","onClick"])))),256))])),_:1})])),(0,a.Uk)(),e.showError?((0,a.wg)(),(0,a.iD)("div",_,[(0,a.Wm)(C,{class:"error-icon",src:"/src/assets/icons/misc/error.svg"}),(0,a.Uk)(),(0,a._)("div",E,(0,o.toDisplayString)(e.showError),1)])):(0,a.kq)("",!0),(0,a.Uk)(),e.showSpinner&&!e.showError?((0,a.wg)(),(0,a.iD)("img",I)):(0,a.kq)("",!0)])),_:1},8,["class"])):(0,a.kq)("",!0)}]]);!async function(){await(0,n.hR)(["400 14px Roboto","500 14px Roboto"]);const e=(0,i.createApp)(T);await(0,n.cO)(e),await(0,r.y)(e),e.mount("body")}()}},n={};function r(e){var t=n[e];if(void 0!==t)return t.exports;var s=n[e]={exports:{}};return i[e].call(s.exports,s,s.exports,r),s.exports}r.m=i,e=[],r.O=(t,s,i,n)=>{if(!s){var a=1/0;for(g=0;g<e.length;g++){for(var[s,i,n]=e[g],o=!0,c=0;c<s.length;c++)(!1&n||a>=n)&&Object.keys(r.O).every((e=>r.O[e](s[c])))?s.splice(c--,1):(o=!1,n<a&&(a=n));if(o){e.splice(g--,1);var l=i();void 0!==l&&(t=l)}}return t}n=n||0;for(var g=e.length;g>0&&e[g-1][2]>n;g--)e[g]=e[g-1];e[g]=[s,i,n]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},s=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,r.t=function(e,i){if(1&i&&(e=this(e)),8&i)return e;if("object"==typeof e&&e){if(4&i&&e.__esModule)return e;if(16&i&&"function"==typeof e.then)return e}var n=Object.create(null);r.r(n);var a={};t=t||[null,s({}),s([]),s(s)];for(var o=2&i&&e;"object"==typeof o&&!~t.indexOf(o);o=s(o))Object.getOwnPropertyNames(o).forEach((t=>a[t]=()=>e[t]));return a.default=()=>e,r.d(n,a),n},r.d=(e,t)=>{for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.j=9088,(()=>{var e={9088:0};r.O.j=t=>0===e[t];var t=(t,s)=>{var i,n,[a,o,c]=s,l=0;if(a.some((t=>0!==e[t]))){for(i in o)r.o(o,i)&&(r.m[i]=o[i]);if(c)var g=c(r)}for(t&&t(s);l<a.length;l++)n=a[l],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return r.O(g)},s=globalThis.webpackChunksearch_by_image=globalThis.webpackChunksearch_by_image||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var a=r.O(void 0,[2787],(()=>r(4998)));a=r.O(a)})();