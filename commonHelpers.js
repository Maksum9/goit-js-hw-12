import{S as y,a as m,i as u}from"./assets/vendor-c145bea9.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerpolicy&&(t.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?t.credentials="include":s.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(s){if(s.ep)return;s.ep=!0;const t=o(s);fetch(s.href,t)}})();const v=document.querySelector(".form"),c=document.querySelector(".gallery"),w=document.querySelector(".text-input"),l=document.querySelector(".load-more");let r=1,p="";const d=40,f=new y(".gallery a",{captionsData:"alt",captionDelay:250}),g=document.querySelector(".loader");g.style.display="none";v.addEventListener("submit",async e=>{e.preventDefault(),p=w.value,c.innerHTML="",r=1,l.style.display="none";const a=new URLSearchParams({key:"41525979-544d9b4f8d317eee068e80d65",q:p,image_type:"photo",orientation:"horizontal",safesearch:!0});try{const o=await m.get(`https://pixabay.com/api/?${a}&page=${r}&per_page=${d}`);if(g.style.display="none",o.status!==200)throw new Error(`HTTP request failed with status ${o.status}`);const n=o.data;if(n.hits.length>0){const s=b();n.hits.forEach(t=>{const i=h(t);c.appendChild(i)}),n.totalHits>r*d?(l.style.display="block",window.scrollBy({top:s*2,behavior:"smooth"})):(l.style.display="none",u.info({message:"We're sorry, but you've reached the end of search results.",messageColor:"#FAFAFB",backgroundColor:"#4285F4",position:"topRight"})),f.refresh()}else u.error({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"})}catch(o){console.error(o.message)}});l.addEventListener("click",async()=>{try{r++;const e=await m.get(`https://pixabay.com/api/?key=41525979-544d9b4f8d317eee068e80d65&q=${p}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${d}`);if(e.status!==200)throw new Error(`HTTP request failed with status ${e.status}`);const a=e.data;a.hits.length>0&&(a.hits.forEach(o=>{const n=h(o);c.appendChild(n)}),a.totalHits<=r*d&&(l.style.display="none"),f.refresh())}catch(e){console.error(e.message)}});function h(e){const a=document.createElement("div");return a.innerHTML=`
    <a href="${e.largeImageURL}">
    <img src="${e.webformatURL}" alt="${e.tags}"></a>
    <div class="info">
    <div class="image-info">
    <span>Likes</span>
    <span class="image-value">${e.likes}</span></div>
    <div class="image-info">
    <span>Views</span>
    <span class="image-value">${e.views}</span></div>
    <div class="image-info">
    <span>Comments</span>
    <span class="image-value">${e.comments}</span></div>
    <div class="image-info">
    <span>Downloads</span>
    <span class="image-value">${e.downloads}</span></div>
    </div>
  `,a}function b(){const e=document.createElement("div");e.style.visibility="hidden",e.style.position="absolute",e.style.zIndex="-1",e.innerHTML=`
    <a href="#">
    <img src="#" alt="#"></a>
    <div class="info">
    <div class="image-info">
    <span>Likes</span>
    <span class="image-value">0</span></div>
    <div class="image-info">
    <span>Views</span>
    <span class="image-value">0</span></div>
    <div class="image-info">
    <span>Comments</span>
    <span class="image-value">0</span></div>
    <div class="image-info">
    <span>Downloads</span>
    <span class="image-value">0</span></div>
    </div>
  `,c.appendChild(e);const a=e.getBoundingClientRect().height;return c.removeChild(e),a}
//# sourceMappingURL=commonHelpers.js.map
