import{S as t,i as a,s as n,o as e,A as s,f as o,v as r,w as i,x as c,j as l,a2 as u,X as m,a3 as p,z as f,e as d,n as h,l as $,m as g,ac as b,p as v,b as k,q as w,u as j,y as x,F as y,B as z,c as A,ad as S}from"./main-624c4f0b.js";import _ from"./ArticleDetail-18aac731.js";import{H as C}from"./Head-39647b42.js";import{s as F}from"./index-70a8aa6a.js";import{S as H}from"./Share-d5ac7a62.js";import"./moment-3bf6445e.js";import"./Router-65dec624.js";function q(t){let a;return{c(){a=d("p"),a.textContent="An error occurred!"},m(t,n){o(t,a,n)},p:h,i:h,o:h,d(t){t&&l(a)}}}function B(t){let a,n,e,s,r,u,m,p,f,d;function h(a){t[5](a)}function y(a){t[6](a)}let z={};function A(a){t[7](a)}function S(a){t[8](a)}void 0!==t[0]&&(z.height=t[0]),void 0!==t[3]&&(z.page=t[3]),a=new C({props:z}),$.push((()=>g(a,"height",h))),$.push((()=>g(a,"page",y)));let F={};return void 0!==t[1]&&(F.url=t[1]),void 0!==t[2]&&(F.title=t[2]),r=new H({props:F}),$.push((()=>g(r,"url",A))),$.push((()=>g(r,"title",S))),f=new _({props:{data:{...t[11],type:R,thumbnail:"https://admin-dev.newsmap.id/uploads/"+R+"/"+t[11].thumbnail,thumbnail_social:void 0===t[11].thumbnail_social?"":"https://admin-dev.newsmap.id/uploads/"+R+"/"+t[11].thumbnail_social,footer:{uri:b,params:{except:t[11].id,size:3},thumbnailFolder:"news"}}}}),{c(){v(a.$$.fragment),s=k(),v(r.$$.fragment),p=k(),v(f.$$.fragment)},m(t,n){w(a,t,n),o(t,s,n),w(r,t,n),o(t,p,n),w(f,t,n),d=!0},p(t,s){const o={};!n&&1&s&&(n=!0,o.height=t[0],j((()=>n=!1))),!e&&8&s&&(e=!0,o.page=t[3],j((()=>e=!1))),a.$set(o);const i={};!u&&2&s&&(u=!0,i.url=t[1],j((()=>u=!1))),!m&&4&s&&(m=!0,i.title=t[2],j((()=>m=!1))),r.$set(i)},i(t){d||(i(a.$$.fragment,t),i(r.$$.fragment,t),i(f.$$.fragment,t),d=!0)},o(t){c(a.$$.fragment,t),c(r.$$.fragment,t),c(f.$$.fragment,t),d=!1},d(t){x(a,t),t&&l(s),x(r,t),t&&l(p),x(f,t)}}}function D(t){let a,n,e;return n=new y({props:{icon:z,size:"3x",pulse:!0}}),{c(){a=d("div"),v(n.$$.fragment),A(a,"class","placeholder-container svelte-f0b7j")},m(t,s){o(t,a,s),w(n,a,null),e=!0},p:h,i(t){e||(i(n.$$.fragment,t),e=!0)},o(t){c(n.$$.fragment,t),e=!1},d(t){t&&l(a),x(n)}}}function N(t){let a,n,u={ctx:t,current:null,token:null,hasCatch:!0,pending:D,then:B,catch:q,value:11,error:12,blocks:[,,,]};return e(t[4](),u),{c(){a=s(),u.block.c()},m(t,e){o(t,a,e),u.block.m(t,u.anchor=e),u.mount=()=>a.parentNode,u.anchor=a,n=!0},p(a,[n]){r(u,t=a,n)},i(t){n||(i(u.block),n=!0)},o(t){for(let t=0;t<3;t+=1){const a=u.blocks[t];c(a)}n=!1},d(t){t&&l(a),u.block.d(t),u.token=null,u=null}}}const R="deduktif";function X(t,a,n){let e;u(t,p,(t=>n(9,e=t)));const s=e.slug,o=async()=>{const t=await f(`${S}/${s}`);return await t};let r,i,c,l="deduktif";return i=document.location.href,m((()=>{F()})),o().then((t=>n(2,c=t.title))),[r,i,c,l,o,function(t){r=t,n(0,r)},function(t){l=t,n(3,l)},function(t){i=t,n(1,i)},function(t){c=t,n(2,c)}]}class E extends t{constructor(t){super(),a(this,t,X,N,n,{})}}export{E as default};
//# sourceMappingURL=_slug_-72073779.js.map
