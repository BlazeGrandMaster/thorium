(()=>{"use strict";var e,t,r,a={4373:(e,t,r)=>{var a=r(2667),o=r(6978);(0,o.xU)((async function({session:e,search:t,image:r,storageIds:i}){(0,a.uP)('#pageContent a[onclick^="document.cookie=\'_fullMobile=true"]',(e=>e.click()),{throwError:!1}),window.location.pathname.startsWith("/trademarks/search/quick")&&await(0,a.uP)("a#goToAdvancedSearch",(e=>e.click())),await(0,a.DY)(".advanced-search div#sideImageUpload");const n="input.dz-hidden-input",c=await(0,a.DY)(n);await(0,o.er)(n,c,r),c.dispatchEvent(new Event("change")),await(0,a.DY)("div.cropper-container"),await(0,o.bC)(i),(await(0,a.DY)("#qa-search-submit:not(.disabled)",{observerOptions:{attributes:!0,attributeFilter:["class"]}})).click()}),"auTrademark",taskId)}},o={};function i(e){var t=o[e];if(void 0!==t)return t.exports;var r=o[e]={exports:{}};return a[e].call(r.exports,r,r.exports,i),r.exports}i.m=a,e=[],i.O=(t,r,a,o)=>{if(!r){var n=1/0;for(u=0;u<e.length;u++){for(var[r,a,o]=e[u],c=!0,s=0;s<r.length;s++)(!1&o||n>=o)&&Object.keys(i.O).every((e=>i.O[e](r[s])))?r.splice(s--,1):(c=!1,o<n&&(n=o));if(c){e.splice(u--,1);var l=a();void 0!==l&&(t=l)}}return t}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[r,a,o]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,i.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var o=Object.create(null);i.r(o);var n={};t=t||[null,r({}),r([]),r(r)];for(var c=2&a&&e;"object"==typeof c&&!~t.indexOf(c);c=r(c))Object.getOwnPropertyNames(c).forEach((t=>n[t]=()=>e[t]));return n.default=()=>e,i.d(o,n),o},i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.j=9950,(()=>{var e={9950:0};i.O.j=t=>0===e[t];var t=(t,r)=>{var a,o,[n,c,s]=r,l=0;if(n.some((t=>0!==e[t]))){for(a in c)i.o(c,a)&&(i.m[a]=c[a]);if(s)var u=s(i)}for(t&&t(r);l<n.length;l++)o=n[l],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return i.O(u)},r=globalThis.webpackChunksearch_by_image=globalThis.webpackChunksearch_by_image||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var n=i.O(void 0,[5844],(()=>i(4373)));n=i.O(n)})();