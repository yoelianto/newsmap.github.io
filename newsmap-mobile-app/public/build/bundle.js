var app=function(){"use strict";function t(){}const e=t=>t;function n(t,e){for(const n in e)t[n]=e[n];return t}function l(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(l)}function c(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let i;function u(t,e){return i||(i=document.createElement("a")),i.href=e,t===i.href}function a(e,n,l){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const l=e.subscribe(...n);return l.unsubscribe?()=>l.unsubscribe():l}(n,l))}const d="undefined"!=typeof window;let f=d?()=>window.performance.now():()=>Date.now(),p=d?t=>requestAnimationFrame(t):t;const h=new Set;function m(t){h.forEach((e=>{e.c(t)||(h.delete(e),e.f())})),0!==h.size&&p(m)}function g(t){let e;return 0===h.size&&p(m),{promise:new Promise((n=>{h.add(e={c:t,f:n})})),abort(){h.delete(e)}}}function v(t,e){t.appendChild(e)}function w(t,e,n){t.insertBefore(e,n||null)}function $(t){t.parentNode.removeChild(t)}function b(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function k(t){return document.createElement(t)}function y(t){return document.createTextNode(t)}function x(){return y(" ")}function z(){return y("")}function C(t,e,n,l){return t.addEventListener(e,n,l),()=>t.removeEventListener(e,n,l)}function A(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function E(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function j(t,e,n,l){null===n?t.style.removeProperty(e):t.style.setProperty(e,n,l?"important":"")}let L,T;function N(){if(void 0===L){L=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(t){L=!0}}return L}function _(t,e,n){t.classList[n?"add":"remove"](e)}function O(t){T=t}function S(){if(!T)throw new Error("Function called outside component initialization");return T}const P=[],D=[],M=[],H=[],I=Promise.resolve();let q=!1;function B(t){M.push(t)}const W=new Set;let F=0;function R(){const t=T;do{for(;F<P.length;){const t=P[F];F++,O(t),X(t.$$)}for(O(null),P.length=0,F=0;D.length;)D.pop()();for(let t=0;t<M.length;t+=1){const e=M[t];W.has(e)||(W.add(e),e())}M.length=0}while(P.length);for(;H.length;)H.pop()();q=!1,W.clear(),O(t)}function X(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(B)}}const Y=new Set;let G;function K(t,e){t&&t.i&&(Y.delete(t),t.i(e))}function U(t,e,n,l){if(t&&t.o){if(Y.has(t))return;Y.add(t),G.c.push((()=>{Y.delete(t),l&&(n&&t.d(1),l())})),t.o(e)}}function Q(t,e){const n=e.token={};function l(t,l,o,c){if(e.token!==n)return;e.resolved=c;let s=e.ctx;void 0!==o&&(s=s.slice(),s[o]=c);const i=t&&(e.current=t)(s);let u=!1;e.block&&(e.blocks?e.blocks.forEach(((t,n)=>{n!==l&&t&&(G={r:0,c:[],p:G},U(t,1,1,(()=>{e.blocks[n]===t&&(e.blocks[n]=null)})),G.r||r(G.c),G=G.p)})):e.block.d(1),i.c(),K(i,1),i.m(e.mount(),e.anchor),u=!0),e.block=i,e.blocks&&(e.blocks[l]=i),u&&R()}if((o=t)&&"object"==typeof o&&"function"==typeof o.then){const n=S();if(t.then((t=>{O(n),l(e.then,1,e.value,t),O(null)}),(t=>{if(O(n),l(e.catch,2,e.error,t),O(null),!e.hasCatch)throw t})),e.current!==e.pending)return l(e.pending,0),!0}else{if(e.current!==e.then)return l(e.then,1,e.value,t),!0;e.resolved=t}var o}function V(t,e,n){const l=e.slice(),{resolved:o}=t;t.current===t.then&&(l[t.value]=o),t.current===t.catch&&(l[t.error]=o),t.block.p(l,n)}function J(t){t&&t.c()}function Z(t,e,n,o){const{fragment:s,on_mount:i,on_destroy:u,after_update:a}=t.$$;s&&s.m(e,n),o||B((()=>{const e=i.map(l).filter(c);u?u.push(...e):r(e),t.$$.on_mount=[]})),a.forEach(B)}function tt(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function et(t,e){-1===t.$$.dirty[0]&&(P.push(t),q||(q=!0,I.then(R)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function nt(e,n,l,c,s,i,u,a=[-1]){const d=T;O(e);const f=e.$$={fragment:null,ctx:null,props:i,update:t,not_equal:s,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(d?d.$$.context:[])),callbacks:o(),dirty:a,skip_bound:!1,root:n.target||d.$$.root};u&&u(f.root);let p=!1;if(f.ctx=l?l(e,n.props||{},((t,n,...l)=>{const o=l.length?l[0]:n;return f.ctx&&s(f.ctx[t],f.ctx[t]=o)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](o),p&&et(e,t)),n})):[],f.update(),p=!0,r(f.before_update),f.fragment=!!c&&c(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach($)}else f.fragment&&f.fragment.c();n.intro&&K(e.$$.fragment),Z(e,n.target,n.anchor,n.customElement),R()}O(d)}class lt{$destroy(){tt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function ot(t){return t<.5?4*t*t*t:.5*Math.pow(2*t-2,3)+1}const rt=[];function ct(t){return"[object Date]"===Object.prototype.toString.call(t)}function st(t,e){if(t===e||t!=t)return()=>t;const n=typeof t;if(n!==typeof e||Array.isArray(t)!==Array.isArray(e))throw new Error("Cannot interpolate values of different type");if(Array.isArray(t)){const n=e.map(((e,n)=>st(t[n],e)));return t=>n.map((e=>e(t)))}if("object"===n){if(!t||!e)throw new Error("Object cannot be null");if(ct(t)&&ct(e)){t=t.getTime();const n=(e=e.getTime())-t;return e=>new Date(t+e*n)}const n=Object.keys(e),l={};return n.forEach((n=>{l[n]=st(t[n],e[n])})),t=>{const e={};return n.forEach((n=>{e[n]=l[n](t)})),e}}if("number"===n){const n=e-t;return e=>t+e*n}throw new Error(`Cannot interpolate ${n} values`)}function it(l,o={}){const r=function(e,n=t){let l;const o=new Set;function r(t){if(s(e,t)&&(e=t,l)){const t=!rt.length;for(const t of o)t[1](),rt.push(t,e);if(t){for(let t=0;t<rt.length;t+=2)rt[t][0](rt[t+1]);rt.length=0}}}return{set:r,update:function(t){r(t(e))},subscribe:function(c,s=t){const i=[c,s];return o.add(i),1===o.size&&(l=n(r)||t),c(e),()=>{o.delete(i),0===o.size&&(l(),l=null)}}}}(l);let c,i=l;function u(t,s){if(null==l)return r.set(l=t),Promise.resolve();i=t;let u=c,a=!1,{delay:d=0,duration:p=400,easing:h=e,interpolate:m=st}=n(n({},o),s);if(0===p)return u&&(u.abort(),u=null),r.set(l=i),Promise.resolve();const v=f()+d;let w;return c=g((e=>{if(e<v)return!0;a||(w=m(l,t),"function"==typeof p&&(p=p(l,t)),a=!0),u&&(u.abort(),u=null);const n=e-v;return n>p?(r.set(l=t),!1):(r.set(l=w(h(n/p))),!0)})),c.promise}return{set:u,update:(t,e)=>u(t(i,l),e),subscribe:r.subscribe}}var ut={$:t=>"string"==typeof t?document.querySelector(t):t,extend:(...t)=>Object.assign(...t),cumulativeOffset(t){let e=0,n=0;do{e+=t.offsetTop||0,n+=t.offsetLeft||0,t=t.offsetParent}while(t);return{top:e,left:n}},directScroll:t=>t&&t!==document&&t!==document.body,scrollTop(t,e){let n=void 0!==e;return this.directScroll(t)?n?t.scrollTop=e:t.scrollTop:n?document.documentElement.scrollTop=document.body.scrollTop=e:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},scrollLeft(t,e){let n=void 0!==e;return this.directScroll(t)?n?t.scrollLeft=e:t.scrollLeft:n?document.documentElement.scrollLeft=document.body.scrollLeft=e:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0}};const at={container:"body",duration:500,delay:0,offset:0,easing:ot,onStart:t,onDone:t,onAborting:t,scrollX:!1,scrollY:!0},dt=t=>{let{offset:e,duration:n,delay:l,easing:o,x:r=0,y:c=0,scrollX:s,scrollY:i,onStart:u,onDone:a,container:d,onAborting:p,element:h}=t;"function"==typeof e&&(e=e());var m=ut.cumulativeOffset(d),v=h?ut.cumulativeOffset(h):{top:c,left:r},w=ut.scrollLeft(d),$=ut.scrollTop(d),b=v.left-m.left+e,k=v.top-m.top+e,y=b-w,x=k-$;let z=!0,C=!1,A=f()+l,E=A+n;function j(t){t||(C=!0,u(h,{x:r,y:c}))}function L(t){!function(t,e,n){s&&ut.scrollLeft(t,n),i&&ut.scrollTop(t,e)}(d,$+x*t,w+y*t)}function T(){z=!1}return g((t=>{if(!C&&t>=A&&j(!1),C&&t>=E&&(L(1),T(),a(h,{x:r,y:c})),!z)return p(h,{x:r,y:c}),!1;if(C){L(0+1*o((t-A)/n))}return!0})),j(l),L(0),T},ft=t=>dt((t=>{let e=ut.extend({},at,t);return e.container=ut.$(e.container),e.element=ut.$(e.element),e})(t));function pt(t,e,n){const l=t.slice();return l[14]=e[n],l[16]=n,l}function ht(t){let e,n,l,o,r,c,s=t[14].menu+"";function i(){return t[9](t[16])}return{c(){e=k("h4"),n=y(s),l=x(),A(e,"class","menu svelte-15w350p"),A(e,"id",o=t[14].id),_(e,"selected",!0===t[14].active)},m(t,o){w(t,e,o),v(e,n),v(e,l),r||(c=C(e,"click",i),r=!0)},p(l,r){t=l,2&r&&s!==(s=t[14].menu+"")&&E(n,s),2&r&&o!==(o=t[14].id)&&A(e,"id",o),2&r&&_(e,"selected",!0===t[14].active)},d(t){t&&$(e),r=!1,c()}}}function mt(e){let n,l,o,r,c,s,i,u,a,d,f,p,h,m=e[1],g=[];for(let t=0;t<m.length;t+=1)g[t]=ht(pt(e,m,t));return{c(){n=k("nav"),l=k("div"),o=k("div"),o.innerHTML="<h1>Newsmap.id (logo)</h1>",r=x(),c=k("div"),s=k("div");for(let t=0;t<g.length;t+=1)g[t].c();i=x(),u=k("div"),a=x(),d=k("div"),f=x(),p=k("div"),A(o,"class","header-logo"),A(s,"class","headertext svelte-15w350p"),A(u,"class","bar svelte-15w350p"),j(u,"left",25*e[2]+8.5+"vw"),A(d,"class","bar svelte-15w350p"),j(d,"left",25*e[3]+8.5+"vw"),A(p,"class","bar svelte-15w350p"),j(p,"left",25*e[4]+8.5+"vw"),A(c,"class","header-menu svelte-15w350p"),A(l,"class","container svelte-15w350p"),B((()=>e[10].call(l)))},m(t,m){w(t,n,m),v(n,l),v(l,o),v(l,r),v(l,c),v(c,s);for(let t=0;t<g.length;t+=1)g[t].m(s,null);v(c,i),v(c,u),v(c,a),v(c,d),v(c,f),v(c,p),h=function(t,e){"static"===getComputedStyle(t).position&&(t.style.position="relative");const n=k("iframe");n.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),n.setAttribute("aria-hidden","true"),n.tabIndex=-1;const l=N();let o;return l?(n.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",o=C(window,"message",(t=>{t.source===n.contentWindow&&e()}))):(n.src="about:blank",n.onload=()=>{o=C(n.contentWindow,"resize",e)}),v(t,n),()=>{(l||o&&n.contentWindow)&&o(),$(n)}}(l,e[10].bind(l))},p(t,[e]){if(258&e){let n;for(m=t[1],n=0;n<m.length;n+=1){const l=pt(t,m,n);g[n]?g[n].p(l,e):(g[n]=ht(l),g[n].c(),g[n].m(s,null))}for(;n<g.length;n+=1)g[n].d(1);g.length=m.length}4&e&&j(u,"left",25*t[2]+8.5+"vw"),8&e&&j(d,"left",25*t[3]+8.5+"vw"),16&e&&j(p,"left",25*t[4]+8.5+"vw")},i:t,o:t,d(t){t&&$(n),b(g,t),h()}}}function gt(t,e,n){let l,o,r,{height:c}=e;const s={duration:500,easing:ot,delay:20},i={duration:500,easing:ot,delay:40},u=it(0,{duration:500,easing:ot});a(t,u,(t=>n(2,l=t)));const d=it(0,s);a(t,d,(t=>n(3,o=t)));const f=it(0,i);a(t,f,(t=>n(4,r=t)));let p=[{menu:"Newsmap",id:0,active:!0,link:"#newsmap"},{menu:"Original",id:1,active:!1,link:"#original"},{menu:"Deduktif",id:2,active:!1,link:"#deduktif"},{menu:"Podcast",id:3,active:!1,link:"#podcast"}];const h=t=>{p.forEach((t=>{t.active=!1})),n(1,p[t].active=!0,p),ft({element:p[t].link,offset:-150}),u.set(t),d.set(t),f.set(t)};return t.$$set=t=>{"height"in t&&n(0,c=t.height)},[c,p,l,o,r,u,d,f,h,t=>{h(t)},function(){c=this.clientHeight,n(0,c)}]}class vt extends lt{constructor(t){super(),nt(this,t,gt,mt,s,{height:0})}}function wt(t,e,n){const l=t.slice();return l[3]=e[n],l[5]=n,l}function $t(t,e,n){const l=t.slice();return l[3]=e[n],l[5]=n,l}function bt(t,e,n){const l=t.slice();return l[3]=e[n],l[5]=n,l}function kt(e){let n;return{c(){n=k("p"),n.textContent="An error occurred!"},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function yt(e){let n,l;return{c(){n=k("img"),A(n,"class","imggrid svelte-1fgwnog"),u(n.src,l=e[2][0].url)||A(n,"src",l),A(n,"alt",e[2][0].title)},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function xt(e){let n;return{c(){n=k("p"),n.textContent="...waiting"},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function zt(e){let n;return{c(){n=k("p"),n.textContent="An error occurred!"},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function Ct(t){let e,n={length:4},l=[];for(let e=0;e<n.length;e+=1)l[e]=At(bt(t,n,e));return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=z()},m(t,n){for(let e=0;e<l.length;e+=1)l[e].m(t,n);w(t,e,n)},p(t,o){if(2&o){let r;for(n={length:4},r=0;r<n.length;r+=1){const c=bt(t,n,r);l[r]?l[r].p(c,o):(l[r]=At(c),l[r].c(),l[r].m(e.parentNode,e))}for(;r<l.length;r+=1)l[r].d(1);l.length=n.length}},d(t){b(l,t),t&&$(e)}}}function At(e){let n,l,o,r,c;return{c(){n=k("div"),l=k("img"),c=x(),A(l,"class","imggrid svelte-1fgwnog"),u(l.src,o=e[2][e[5]+1].url)||A(l,"src",o),A(l,"alt",r=e[2][e[5]+1].title),A(n,"class","grid4 svelte-1fgwnog")},m(t,e){w(t,n,e),v(n,l),v(n,c)},p:t,d(t){t&&$(n)}}}function Et(e){let n;return{c(){n=k("p"),n.textContent="...waiting"},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function jt(e){let n;return{c(){n=k("p"),n.textContent="An error occurred!"},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function Lt(t){let e,n={length:4},l=[];for(let e=0;e<n.length;e+=1)l[e]=Tt($t(t,n,e));return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=z()},m(t,n){for(let e=0;e<l.length;e+=1)l[e].m(t,n);w(t,e,n)},p(t,o){if(2&o){let r;for(n={length:4},r=0;r<n.length;r+=1){const c=$t(t,n,r);l[r]?l[r].p(c,o):(l[r]=Tt(c),l[r].c(),l[r].m(e.parentNode,e))}for(;r<l.length;r+=1)l[r].d(1);l.length=n.length}},d(t){b(l,t),t&&$(e)}}}function Tt(e){let n,l,o,r,c;return{c(){n=k("div"),l=k("img"),c=x(),A(l,"class","imggrid svelte-1fgwnog"),u(l.src,o=e[2][e[5]+5].url)||A(l,"src",o),A(l,"alt",r=e[2][e[5]+5].title),A(n,"class","grid4 svelte-1fgwnog")},m(t,e){w(t,n,e),v(n,l),v(n,c)},p:t,d(t){t&&$(n)}}}function Nt(e){let n;return{c(){n=k("p"),n.textContent="...waiting"},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function _t(e){let n;return{c(){n=k("p"),n.textContent="An error occurred!"},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function Ot(t){let e,n={length:9},l=[];for(let e=0;e<n.length;e+=1)l[e]=St(wt(t,n,e));return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=z()},m(t,n){for(let e=0;e<l.length;e+=1)l[e].m(t,n);w(t,e,n)},p(t,o){if(2&o){let r;for(n={length:9},r=0;r<n.length;r+=1){const c=wt(t,n,r);l[r]?l[r].p(c,o):(l[r]=St(c),l[r].c(),l[r].m(e.parentNode,e))}for(;r<l.length;r+=1)l[r].d(1);l.length=n.length}},d(t){b(l,t),t&&$(e)}}}function St(e){let n,l,o,r,c;return{c(){n=k("div"),l=k("img"),c=x(),A(l,"class","imggrid svelte-1fgwnog"),u(l.src,o=e[2][e[5]+9].url)||A(l,"src",o),A(l,"alt",r=e[2][e[5]+9].title),A(n,"class","grid9 svelte-1fgwnog")},m(t,e){w(t,n,e),v(n,l),v(n,c)},p:t,d(t){t&&$(n)}}}function Pt(e){let n;return{c(){n=k("p"),n.textContent="...waiting"},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function Dt(e){let n,l,o,r,c,s,i,u,a,d={ctx:e,current:null,token:null,hasCatch:!0,pending:xt,then:yt,catch:kt,value:2,error:6};Q(e[1],d);let f={ctx:e,current:null,token:null,hasCatch:!0,pending:Et,then:Ct,catch:zt,value:2,error:6};Q(e[1],f);let p={ctx:e,current:null,token:null,hasCatch:!0,pending:Nt,then:Lt,catch:jt,value:2,error:6};Q(e[1],p);let h={ctx:e,current:null,token:null,hasCatch:!0,pending:Pt,then:Ot,catch:_t,value:2,error:6};return Q(e[1],h),{c(){n=k("article"),l=k("div"),o=k("div"),d.block.c(),r=x(),c=k("div"),f.block.c(),s=x(),i=k("div"),p.block.c(),u=x(),a=k("div"),h.block.c(),A(o,"class","grid1 svelte-1fgwnog"),A(c,"class","grid1 svelte-1fgwnog"),A(i,"class","grid1 svelte-1fgwnog"),A(a,"class","grid1 svelte-1fgwnog"),A(l,"class","grid svelte-1fgwnog"),j(n,"margin-top",e[0]+"px"),A(n,"id","newsmap"),A(n,"class","svelte-1fgwnog")},m(t,e){w(t,n,e),v(n,l),v(l,o),d.block.m(o,d.anchor=null),d.mount=()=>o,d.anchor=null,v(l,r),v(l,c),f.block.m(c,f.anchor=null),f.mount=()=>c,f.anchor=null,v(l,s),v(l,i),p.block.m(i,p.anchor=null),p.mount=()=>i,p.anchor=null,v(l,u),v(l,a),h.block.m(a,h.anchor=null),h.mount=()=>a,h.anchor=null},p(t,[l]){V(d,e=t,l),V(f,e,l),V(p,e,l),V(h,e,l),1&l&&j(n,"margin-top",e[0]+"px")},i:t,o:t,d(t){t&&$(n),d.block.d(),d.token=null,d=null,f.block.d(),f.token=null,f=null,p.block.d(),p.token=null,p=null,h.block.d(),h.token=null,h=null}}}function Mt(t,e,n){const l=(async()=>{const t=await fetch("https://jsonplaceholder.typicode.com/photos");return await t.json()})();let{margin:o}=e;return t.$$set=t=>{"margin"in t&&n(0,o=t.margin)},[o,l]}class Ht extends lt{constructor(t){super(),nt(this,t,Mt,Dt,s,{margin:0})}}function It(e){let n;return{c(){n=k("div"),n.innerHTML='<p class="title svelte-12nhtzs">NEWSMAP ORIGINAL</p> \n    <div class="card svelte-12nhtzs"><div class="inner-card svelte-12nhtzs"><div class="sub-title svelte-12nhtzs">Original Newsmap</div> \n            <div class="card-title svelte-12nhtzs">Kenapa Bimbel Bisa Booming Banget</div></div></div>',A(n,"class","container"),A(n,"id","original")},m(t,e){w(t,n,e)},p:t,i:t,o:t,d(t){t&&$(n)}}}class qt extends lt{constructor(t){super(),nt(this,t,null,It,s,{})}}function Bt(t,e,n){const l=t.slice();return l[2]=e[n],l[4]=n,l}function Wt(e){let n;return{c(){n=k("p"),n.textContent="An error occurred!"},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function Ft(t){let e,n={length:10},l=[];for(let e=0;e<n.length;e+=1)l[e]=Rt(Bt(t,n,e));return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=z()},m(t,n){for(let e=0;e<l.length;e+=1)l[e].m(t,n);w(t,e,n)},p(t,o){if(1&o){let r;for(n={length:10},r=0;r<n.length;r+=1){const c=Bt(t,n,r);l[r]?l[r].p(c,o):(l[r]=Rt(c),l[r].c(),l[r].m(e.parentNode,e))}for(;r<l.length;r+=1)l[r].d(1);l.length=n.length}},d(t){b(l,t),t&&$(e)}}}function Rt(e){let n,l,o,r,c;return{c(){n=k("div"),l=k("img"),c=x(),A(l,"class","people svelte-1nwnlwr"),u(l.src,o=e[1][e[4]].url)||A(l,"src",o),A(l,"alt",r=e[1][e[4]].title),A(n,"class","sentiment svelte-1nwnlwr")},m(t,e){w(t,n,e),v(n,l),v(n,c)},p:t,d(t){t&&$(n)}}}function Xt(e){let n;return{c(){n=k("p"),n.textContent="...waiting"},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function Yt(e){let n,l,o={ctx:e,current:null,token:null,hasCatch:!0,pending:Xt,then:Ft,catch:Wt,value:1,error:5};return Q(e[0],o),{c(){n=k("div"),l=k("div"),o.block.c(),A(l,"class","slider svelte-1nwnlwr"),A(n,"class","container svelte-1nwnlwr")},m(t,e){w(t,n,e),v(n,l),o.block.m(l,o.anchor=null),o.mount=()=>l,o.anchor=null},p(t,[n]){V(o,e=t,n)},i:t,o:t,d(t){t&&$(n),o.block.d(),o.token=null,o=null}}}function Gt(t){return[(async()=>{const t=await fetch("https://jsonplaceholder.typicode.com/photos");return await t.json()})()]}class Kt extends lt{constructor(t){super(),nt(this,t,Gt,Yt,s,{})}}function Ut(e){let n;return{c(){n=k("div"),n.innerHTML='<div class="bottom svelte-kwfzpo"><div class="content svelte-kwfzpo"><div class="contentbot svelte-kwfzpo"><div class="left svelte-kwfzpo"><div class="profile svelte-kwfzpo"><img class="authorprofile svelte-kwfzpo" src="https://via.placeholder.com/600/24f355" alt="author profile"/></div></div> \n                <div class="right svelte-kwfzpo"><div class="excerpt svelte-kwfzpo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo doloribus maxime exercitationem, distinctio est aperiam eveniet ullam assumenda quae corporis voluptatum quasi consequuntur impedit! Quaerat?</div></div></div> \n            <div class="contenttop"><div class="headline svelte-kwfzpo"><div class="detail svelte-kwfzpo"><div class="author svelte-kwfzpo">oleh Ahsan Ridhoi</div> \n                        <div class="title svelte-kwfzpo">Lorem Ipsum Dolor Sit Amet</div></div></div></div></div></div> \n    <p class="deduktif svelte-kwfzpo">DEDUKTIF</p>',A(n,"class","container svelte-kwfzpo"),A(n,"id","deduktif")},m(t,e){w(t,n,e)},p:t,i:t,o:t,d(t){t&&$(n)}}}class Qt extends lt{constructor(t){super(),nt(this,t,null,Ut,s,{})}}function Vt(t,e,n){const l=t.slice();return l[3]=e[n],l[5]=n,l}function Jt(e){let n;return{c(){n=k("p"),n.textContent="An error occurred!"},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function Zt(t){let e,n={length:10},l=[];for(let e=0;e<n.length;e+=1)l[e]=te(Vt(t,n,e));return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=z()},m(t,n){for(let e=0;e<l.length;e+=1)l[e].m(t,n);w(t,e,n)},p(t,o){if(2&o){let r;for(n={length:10},r=0;r<n.length;r+=1){const c=Vt(t,n,r);l[r]?l[r].p(c,o):(l[r]=te(c),l[r].c(),l[r].m(e.parentNode,e))}for(;r<l.length;r+=1)l[r].d(1);l.length=n.length}},d(t){b(l,t),t&&$(e)}}}function te(e){let n,l,o,r,c,s,i,a,d,f,p=e[2][e[5]].title+"";return{c(){n=k("div"),l=k("img"),c=x(),s=k("p"),s.textContent="Author",i=x(),a=k("p"),d=y(p),f=x(),A(l,"class","imgthumb svelte-dfltzw"),u(l.src,o=e[2][e[5]].url)||A(l,"src",o),A(l,"alt",r=e[2][e[5]].title),A(s,"class","author svelte-dfltzw"),A(a,"class","article-title svelte-dfltzw"),A(n,"class","news svelte-dfltzw")},m(t,e){w(t,n,e),v(n,l),v(n,c),v(n,s),v(n,i),v(n,a),v(a,d),v(n,f)},p:t,d(t){t&&$(n)}}}function ee(e){let n;return{c(){n=k("p"),n.textContent="...waiting"},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function ne(e){let n,l,o,r,c,s,i={ctx:e,current:null,token:null,hasCatch:!0,pending:ee,then:Zt,catch:Jt,value:2,error:6};return Q(e[1],i),{c(){n=k("div"),l=k("p"),o=y(e[0]),r=x(),c=k("div"),s=k("div"),i.block.c(),A(l,"class","title svelte-dfltzw"),A(s,"class","slider svelte-dfltzw"),A(c,"class","slider-container svelte-dfltzw"),A(n,"class","container")},m(t,e){w(t,n,e),v(n,l),v(l,o),v(n,r),v(n,c),v(c,s),i.block.m(s,i.anchor=null),i.mount=()=>s,i.anchor=null},p(t,[n]){e=t,1&n&&E(o,e[0]),V(i,e,n)},i:t,o:t,d(t){t&&$(n),i.block.d(),i.token=null,i=null}}}function le(t,e,n){let{title:l=""}=e;const o=(async()=>{const t=await fetch("https://jsonplaceholder.typicode.com/photos");return await t.json()})();return t.$$set=t=>{"title"in t&&n(0,l=t.title)},[l,o]}class oe extends lt{constructor(t){super(),nt(this,t,le,ne,s,{title:0})}}function re(t,e,n){const l=t.slice();return l[3]=e[n],l[5]=n,l}function ce(t,e,n){const l=t.slice();return l[3]=e[n],l[5]=n,l}function se(e){let n;return{c(){n=k("p"),n.textContent="An error occurred!"},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function ie(t){let e,n={length:2},l=[];for(let e=0;e<n.length;e+=1)l[e]=ue(ce(t,n,e));return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=z()},m(t,n){for(let e=0;e<l.length;e+=1)l[e].m(t,n);w(t,e,n)},p(t,o){if(1&o){let r;for(n={length:2},r=0;r<n.length;r+=1){const c=ce(t,n,r);l[r]?l[r].p(c,o):(l[r]=ue(c),l[r].c(),l[r].m(e.parentNode,e))}for(;r<l.length;r+=1)l[r].d(1);l.length=n.length}},d(t){b(l,t),t&&$(e)}}}function ue(e){let n,l,o,r,c;return{c(){n=k("div"),l=k("img"),c=x(),A(l,"class","imgpod svelte-1en9wzo"),u(l.src,o=e[2][e[5]].url)||A(l,"src",o),A(l,"alt",r=e[2][e[5]].title),A(n,"class","podcast svelte-1en9wzo")},m(t,e){w(t,n,e),v(n,l),v(n,c)},p:t,d(t){t&&$(n)}}}function ae(e){let n;return{c(){n=k("p"),n.textContent="...waiting"},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function de(e){let n;return{c(){n=k("p"),n.textContent="An error occurred!"},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function fe(t){let e,n={length:10},l=[];for(let e=0;e<n.length;e+=1)l[e]=pe(re(t,n,e));return{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=z()},m(t,n){for(let e=0;e<l.length;e+=1)l[e].m(t,n);w(t,e,n)},p(t,o){if(1&o){let r;for(n={length:10},r=0;r<n.length;r+=1){const c=re(t,n,r);l[r]?l[r].p(c,o):(l[r]=pe(c),l[r].c(),l[r].m(e.parentNode,e))}for(;r<l.length;r+=1)l[r].d(1);l.length=n.length}},d(t){b(l,t),t&&$(e)}}}function pe(e){let n,l,o,r,c,s,i,u,a,d,f,p=e[2][e[5]].title+"";return{c(){n=k("div"),l=k("div"),l.innerHTML='<i class="fa fa-play"></i>',o=x(),r=k("div"),c=k("div"),s=y(p),i=x(),u=k("div"),a=x(),d=k("div"),d.textContent="15.00",f=x(),A(l,"class","play svelte-1en9wzo"),A(c,"class","podtitle"),A(u,"class","podauthor"),A(r,"class","poddetail svelte-1en9wzo"),A(d,"class","duration svelte-1en9wzo"),A(n,"class","podlist svelte-1en9wzo")},m(t,e){w(t,n,e),v(n,l),v(n,o),v(n,r),v(r,c),v(c,s),v(r,i),v(r,u),v(n,a),v(n,d),v(n,f)},p:t,d(t){t&&$(n)}}}function he(e){let n;return{c(){n=k("p"),n.textContent="...waiting"},m(t,e){w(t,n,e)},p:t,d(t){t&&$(n)}}}function me(e){let n,l,o,r,c,s,i,u,a,d={ctx:e,current:null,token:null,hasCatch:!0,pending:ae,then:ie,catch:se,value:2,error:6};Q(e[0],d);let f={ctx:e,current:null,token:null,hasCatch:!0,pending:he,then:fe,catch:de,value:2,error:6};return Q(e[0],f),{c(){n=k("div"),l=k("div"),l.innerHTML='<p class="title svelte-1en9wzo">PODCAST</p> \n        <p class="viewall svelte-1en9wzo">View all</p>',o=x(),r=k("div"),c=k("div"),d.block.c(),s=x(),i=k("p"),i.textContent="Playlist",u=x(),a=k("div"),f.block.c(),A(l,"class","title-container svelte-1en9wzo"),A(c,"class","album svelte-1en9wzo"),A(i,"class","playlist-title svelte-1en9wzo"),A(a,"class","playlist svelte-1en9wzo"),A(r,"class","inner svelte-1en9wzo"),A(n,"class","container"),A(n,"id","podcast")},m(t,e){w(t,n,e),v(n,l),v(n,o),v(n,r),v(r,c),d.block.m(c,d.anchor=null),d.mount=()=>c,d.anchor=null,v(r,s),v(r,i),v(r,u),v(r,a),f.block.m(a,f.anchor=null),f.mount=()=>a,f.anchor=null},p(t,[n]){V(d,e=t,n),V(f,e,n)},i:t,o:t,d(t){t&&$(n),d.block.d(),d.token=null,d=null,f.block.d(),f.token=null,f=null}}}function ge(t){const e=(async()=>{const t=await fetch("https://jsonplaceholder.typicode.com/photos");return await t.json()})();return(async()=>{const t=await fetch("https://jsonplaceholder.typicode.com/todos");await t.json()})(),[e]}class ve extends lt{constructor(t){super(),nt(this,t,ge,me,s,{})}}function we(t,e,n){const l=t.slice();return l[2]=e[n],l[4]=n,l}function $e(t){let e,n,l,o,r,c,s,i,a=t[2].menu+"";return{c(){e=k("div"),n=k("img"),o=x(),r=k("h4"),c=y(a),i=x(),u(n.src,l="")||A(n,"src",""),A(n,"alt",""),A(n,"class","svelte-fgayst"),A(r,"class","menutext svelte-fgayst"),A(r,"id",s=t[2].id),A(e,"class","menu svelte-fgayst"),_(e,"selected",!0===t[2].active)},m(t,l){w(t,e,l),v(e,n),v(e,o),v(e,r),v(r,c),v(e,i)},p(t,n){1&n&&a!==(a=t[2].menu+"")&&E(c,a),1&n&&s!==(s=t[2].id)&&A(r,"id",s),1&n&&_(e,"selected",!0===t[2].active)},d(t){t&&$(e)}}}function be(e){let n,l,o=e[0],r=[];for(let t=0;t<o.length;t+=1)r[t]=$e(we(e,o,t));return{c(){n=k("nav"),l=k("div");for(let t=0;t<r.length;t+=1)r[t].c();A(l,"class","menubar svelte-fgayst"),A(n,"class","container svelte-fgayst")},m(t,e){w(t,n,e),v(n,l);for(let t=0;t<r.length;t+=1)r[t].m(l,null)},p(t,[e]){if(1&e){let n;for(o=t[0],n=0;n<o.length;n+=1){const c=we(t,o,n);r[n]?r[n].p(c,e):(r[n]=$e(c),r[n].c(),r[n].m(l,null))}for(;n<r.length;n+=1)r[n].d(1);r.length=o.length}},i:t,o:t,d(t){t&&$(n),b(r,t)}}}function ke(t,e,n){return[[{menu:"Home",id:0,active:!0,link:"#newsmap"},{menu:"Search",id:1,active:!1,link:"#search"},{menu:"Newsmap",id:2,active:!1,link:"#original"},{menu:"Podcast",id:3,active:!1,link:"#podcast"}]]}class ye extends lt{constructor(t){super(),nt(this,t,ke,be,s,{})}}function xe(t){let e,n,l,o,r,c,s,i,u,a,d,f,p,h,m,g,b,y,z,C,E,j,L;function T(e){t[2](e)}let N={y:t[1]};return void 0!==t[0]&&(N.height=t[0]),r=new vt({props:N}),D.push((()=>function(t,e,n){const l=t.$$.props[e];void 0!==l&&(t.$$.bound[l]=n,n(t.$$.ctx[l]))}(r,"height",T))),i=new Ht({props:{margin:t[0]}}),a=new Kt({}),f=new qt({}),h=new Qt({}),g=new oe({props:{title:"TRENDING NOW"}}),y=new oe({props:{title:"PUBLIC NEWS"}}),C=new ve({}),j=new ye({}),{c(){e=k("link"),n=x(),l=k("main"),o=k("div"),J(r.$$.fragment),s=x(),J(i.$$.fragment),u=x(),J(a.$$.fragment),d=x(),J(f.$$.fragment),p=x(),J(h.$$.fragment),m=x(),J(g.$$.fragment),b=x(),J(y.$$.fragment),z=x(),J(C.$$.fragment),E=x(),J(j.$$.fragment),A(e,"rel","stylesheet"),A(e,"href","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"),A(o,"class","container svelte-18hvwtu"),A(l,"class","svelte-18hvwtu")},m(t,c){v(document.head,e),w(t,n,c),w(t,l,c),v(l,o),Z(r,o,null),v(o,s),Z(i,o,null),v(o,u),Z(a,o,null),v(o,d),Z(f,o,null),v(o,p),Z(h,o,null),v(o,m),Z(g,o,null),v(o,b),Z(y,o,null),v(o,z),Z(C,o,null),v(o,E),Z(j,o,null),L=!0},p(t,[e]){const n={};var l;!c&&1&e&&(c=!0,n.height=t[0],l=()=>c=!1,H.push(l)),r.$set(n);const o={};1&e&&(o.margin=t[0]),i.$set(o)},i(t){L||(K(r.$$.fragment,t),K(i.$$.fragment,t),K(a.$$.fragment,t),K(f.$$.fragment,t),K(h.$$.fragment,t),K(g.$$.fragment,t),K(y.$$.fragment,t),K(C.$$.fragment,t),K(j.$$.fragment,t),L=!0)},o(t){U(r.$$.fragment,t),U(i.$$.fragment,t),U(a.$$.fragment,t),U(f.$$.fragment,t),U(h.$$.fragment,t),U(g.$$.fragment,t),U(y.$$.fragment,t),U(C.$$.fragment,t),U(j.$$.fragment,t),L=!1},d(t){$(e),t&&$(n),t&&$(l),tt(r),tt(i),tt(a),tt(f),tt(h),tt(g),tt(y),tt(C),tt(j)}}}function ze(t,e,n){let l;return[l,undefined,function(t){l=t,n(0,l)}]}return new class extends lt{constructor(t){super(),nt(this,t,ze,xe,s,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
