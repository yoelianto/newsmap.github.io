import{S as t,i as a,s as n,o as e,A as s,f as o,v as r,w as i,x as c,j as l,a2 as u,X as m,a3 as p,z as f,e as d,n as h,l as $,m as g,p as b,b as w,q as v,u as k,y as j,F as x,B as y,c as A,as as S}from"./main-624c4f0b.js";import _ from"./ArticleDetail-18aac731.js";import{H as z}from"./Head-39647b42.js";import{s as C}from"./index-70a8aa6a.js";import{S as H}from"./Share-d5ac7a62.js";import"./moment-3bf6445e.js";import"./Router-65dec624.js";function q(t){let a;return{c(){a=d("p"),a.textContent="An error occurred!"},m(t,n){o(t,a,n)},p:h,i:h,o:h,d(t){t&&l(a)}}}function B(t){let a,n,e,s,r,u,m,p,f,d;function h(a){t[5](a)}function x(a){t[6](a)}let y={};function A(a){t[7](a)}function S(a){t[8](a)}void 0!==t[0]&&(y.height=t[0]),void 0!==t[3]&&(y.page=t[3]),a=new z({props:y}),$.push((()=>g(a,"height",h))),$.push((()=>g(a,"page",x)));let C={};return void 0!==t[1]&&(C.url=t[1]),void 0!==t[2]&&(C.title=t[2]),r=new H({props:C}),$.push((()=>g(r,"url",A))),$.push((()=>g(r,"title",S))),f=new _({props:{data:{...t[11],thumbnail:"https://admin-dev.newsmap.id/uploads/rewara/"+t[11].thumbnail,thumbnail_social:void 0===t[11].thumbnail_social?"":"https://admin-dev.newsmap.id/uploads/"+type+"/"+t[11].thumbnail_social,type:"rewara"}}}),{c(){b(a.$$.fragment),s=w(),b(r.$$.fragment),p=w(),b(f.$$.fragment)},m(t,n){v(a,t,n),o(t,s,n),v(r,t,n),o(t,p,n),v(f,t,n),d=!0},p(t,s){const o={};!n&&1&s&&(n=!0,o.height=t[0],k((()=>n=!1))),!e&&8&s&&(e=!0,o.page=t[3],k((()=>e=!1))),a.$set(o);const i={};!u&&2&s&&(u=!0,i.url=t[1],k((()=>u=!1))),!m&&4&s&&(m=!0,i.title=t[2],k((()=>m=!1))),r.$set(i)},i(t){d||(i(a.$$.fragment,t),i(r.$$.fragment,t),i(f.$$.fragment,t),d=!0)},o(t){c(a.$$.fragment,t),c(r.$$.fragment,t),c(f.$$.fragment,t),d=!1},d(t){j(a,t),t&&l(s),j(r,t),t&&l(p),j(f,t)}}}function D(t){let a,n,e;return n=new x({props:{icon:y,size:"3x",pulse:!0}}),{c(){a=d("div"),b(n.$$.fragment),A(a,"class","placeholder-container")},m(t,s){o(t,a,s),v(n,a,null),e=!0},p:h,i(t){e||(i(n.$$.fragment,t),e=!0)},o(t){c(n.$$.fragment,t),e=!1},d(t){t&&l(a),j(n)}}}function F(t){let a,n,u={ctx:t,current:null,token:null,hasCatch:!0,pending:D,then:B,catch:q,value:11,error:12,blocks:[,,,]};return e(t[4](),u),{c(){a=s(),u.block.c()},m(t,e){o(t,a,e),u.block.m(t,u.anchor=e),u.mount=()=>a.parentNode,u.anchor=a,n=!0},p(a,[n]){r(u,t=a,n)},i(t){n||(i(u.block),n=!0)},o(t){for(let t=0;t<3;t+=1){const a=u.blocks[t];c(a)}n=!1},d(t){t&&l(a),u.block.d(t),u.token=null,u=null}}}function N(t,a,n){let e,s,o,r;u(t,p,(t=>n(9,e=t)));let i="artikel";const c=e.slug,l=async()=>{const t=await f(`${S}/${c}`);return await t};return o=document.location.href,m((()=>{C()})),l().then((t=>n(2,r=t.title))),[s,o,r,i,l,function(t){s=t,n(0,s)},function(t){i=t,n(3,i)},function(t){o=t,n(1,o)},function(t){r=t,n(2,r)}]}class R extends t{constructor(t){super(),a(this,t,N,F,n,{})}}export{R as default};
//# sourceMappingURL=_slug_-bb7bcf66.js.map
