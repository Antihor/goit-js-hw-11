import{i as y,S as g}from"./assets/vendor-5b791d57.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const c=document.querySelector(".search-form"),L=document.querySelector(".container"),a=document.querySelector(".gallery");c.addEventListener("submit",b);function b(o){o.preventDefault(),S(),a.innerHTML="";const r="https://pixabay.com/api/",s="42059071-0978dc0d7158b742eee7c30f5",n=o.currentTarget.input.value;fetch(`${r}?key=${s}&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true`).then(e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}).then(e=>{if(e.hits.length===0||n==="")y.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),c.reset();else{const t=e.hits.map(({webformatURL:i,largeImageURL:u,tags:f,likes:p,views:d,comments:m,downloads:h})=>`<a href="${u}" class="gallery-link"><li class="gallery-item">
          <img class="gallery-image" src="${i}" alt="${f}">
          <p>Likes: ${p}</p>
          <p>Views: ${d}</p>
          <p>Comments: ${m}</p>
          <p>Downloads: ${h}</p>
          </li></a>`).join("");a.insertAdjacentHTML("beforeend",t),l.refresh(),c.reset()}}).catch(e=>{console.log(e)}).finally(()=>{$()})}function S(){const o=document.createElement("span");o.classList.add("loader"),L.append(o)}function $(){const o=document.querySelector(".loader");o&&o.remove()}const O={captions:!0,captionSelector:"img",captionsData:"alt",captionPosition:"bottom",animation:250},l=new g(".gallery a",O);l.on("show.simplelightbox");
//# sourceMappingURL=commonHelpers.js.map
