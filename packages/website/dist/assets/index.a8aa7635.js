import{S as N,i as O,s as z,e as _,a as o,b as w,n as v,d as k,t as ke,c as b,f as p,g as de,l as E,h as $e,j as ge,k as R,m as U,o as T,p as _e,q as A,r as V,u as S,v as q,w as D,x as Ce,y as Te}from"./vendor.e2d919a8.js";const Ae=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))i(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function t(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerpolicy&&(s.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?s.credentials="include":l.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(l){if(l.ep)return;l.ep=!0;const s=t(l);fetch(l.href,s)}};Ae();function Se(n){let e;return{c(){e=_("content"),e.innerHTML=`<section class="svelte-g76qqz">Welcome to 3d gear maker! You can use this tool to generate the STL file for
    any reasonable spur gear. If you want to customize it even more, download
    the OpenSCAD file and change the parameters as much as you&#39;d like.</section> 

  <b class="svelte-g76qqz">Units = mm</b>`,o(e,"class","content svelte-g76qqz")},m(t,i){w(t,e,i)},p:v,i:v,o:v,d(t){t&&k(e)}}}class qe extends N{constructor(e){super();O(this,e,null,Se,z,{})}}function De(n){let e,t,i,l,s,u,d;return{c(){e=_("div"),t=_("span"),i=ke(n[1]),l=b(),s=_("input"),o(t,"class","svelte-joyo0r"),o(s,"type","number"),s.disabled=n[6],o(s,"step",n[3]),o(s,"name",n[2]),o(s,"min",n[4]),o(s,"max",n[5]),o(s,"class","svelte-joyo0r"),o(e,"class","label svelte-joyo0r")},m(a,m){w(a,e,m),p(e,t),p(t,i),p(e,l),p(e,s),de(s,n[0]),u||(d=E(s,"input",n[7]),u=!0)},p(a,[m]){m&2&&$e(i,a[1]),m&64&&(s.disabled=a[6]),m&8&&o(s,"step",a[3]),m&4&&o(s,"name",a[2]),m&16&&o(s,"min",a[4]),m&32&&o(s,"max",a[5]),m&1&&ge(s.value)!==a[0]&&de(s,a[0])},i:v,o:v,d(a){a&&k(e),u=!1,d()}}}function Ge(n,e,t){let{label:i}=e,{name:l}=e,{value:s}=e,{step:u="1"}=e,{min:d=0}=e,{max:a=1e3}=e,{disabled:m=!1}=e;function h(){s=ge(this.value),t(0,s)}return n.$$set=f=>{"label"in f&&t(1,i=f.label),"name"in f&&t(2,l=f.name),"value"in f&&t(0,s=f.value),"step"in f&&t(3,u=f.step),"min"in f&&t(4,d=f.min),"max"in f&&t(5,a=f.max),"disabled"in f&&t(6,m=f.disabled)},[s,i,l,u,d,a,m,h]}class W extends N{constructor(e){super();O(this,e,Ge,De,z,{label:1,name:2,value:0,step:3,min:4,max:5,disabled:6})}}function Me(n){let e;return{c(){e=_("h4"),e.textContent="\xA0"},m(t,i){w(t,e,i)},d(t){t&&k(e)}}}function Pe(n){let e;return{c(){e=_("h4"),e.textContent="Generating preview..."},m(t,i){w(t,e,i)},d(t){t&&k(e)}}}function Le(n){let e;return{c(){e=_("h4"),e.textContent="Failed to generate gear with those parameters"},m(t,i){w(t,e,i)},d(t){t&&k(e)}}}function je(n){let e,t,i,l,s,u,d,a,m,h,f,G,B,$,J,Y,C,K,Q,I,y,H,X,c,M,ee,P,te,L,F,x,ne;function se(r,g){return r[9]?Le:r[8]?Pe:Me}let Z=se(n),j=Z(n);function be(r){n[14](r)}let le={label:"Teeth",name:"teeth",step:"1",min:15};n[3]!==void 0&&(le.value=n[3]),s=new W({props:le}),R.push(()=>U(s,"value",be));function ve(r){n[15](r)}let re={label:"Pitch",name:"pitch",step:"1"};n[0]!==void 0&&(re.value=n[0]),a=new W({props:re}),R.push(()=>U(a,"value",ve));function he(r){n[16](r)}let ae={label:"Pressure Angle",name:"pa",step:"0.1"};n[1]!==void 0&&(ae.value=n[1]),f=new W({props:ae}),R.push(()=>U(f,"value",he));function ye(r){n[17](r)}let ie={label:"Bore",name:"bore",step:"0.1"};n[2]!==void 0&&(ie.value=n[2]),$=new W({props:ie}),R.push(()=>U($,"value",ye));function we(r){n[18](r)}let ue={label:"Thickness",name:"thickness",step:"1"};return n[7]!==void 0&&(ue.value=n[7]),C=new W({props:ue}),R.push(()=>U(C,"value",we)),{c(){j.c(),e=b(),t=_("form"),i=_("div"),l=_("div"),T(s.$$.fragment),d=b(),T(a.$$.fragment),h=b(),T(f.$$.fragment),B=b(),T($.$$.fragment),Y=b(),T(C.$$.fragment),Q=b(),I=_("div"),y=_("img"),X=b(),c=_("div"),M=_("input"),ee=b(),P=_("input"),te=b(),L=_("input"),o(l,"class","gear-parameters"),o(y,"alt","Gear preview"),_e(y.src,H=`https://3dgearmaker.com/assets/files/SpurGear-T${n[3]}-P${n[4]}-pA${n[5]}-b${n[6]}-${n[7]}mm.png?invalidation=${n[10]}`)||o(y,"src",H),o(y,"class","svelte-1li5ivs"),o(I,"class","gear-preview svelte-1li5ivs"),o(i,"class","form svelte-1li5ivs"),o(M,"class","button svelte-1li5ivs"),o(M,"type","button"),M.value="Reset",o(P,"class","button svelte-1li5ivs"),o(P,"type","button"),P.value="View OpenSCAD Code",P.disabled=n[8],o(L,"class","button svelte-1li5ivs"),o(L,"type","button"),L.value="Download STL",L.disabled=n[8],o(c,"class","actions svelte-1li5ivs"),o(t,"action","https://api.3dgearmaker.com/gearmaker/spur/stl"),o(t,"method","GET"),o(t,"class","svelte-1li5ivs")},m(r,g){j.m(r,g),w(r,e,g),w(r,t,g),p(t,i),p(i,l),A(s,l,null),p(l,d),A(a,l,null),p(l,h),A(f,l,null),p(l,B),A($,l,null),p(l,Y),A(C,l,null),p(i,Q),p(i,I),p(I,y),p(t,X),p(t,c),p(c,M),p(c,ee),p(c,P),p(c,te),p(c,L),F=!0,x||(ne=[E(y,"load",n[19]),E(y,"error",n[20]),E(M,"click",n[11]),E(P,"click",n[12]),E(L,"click",n[13])],x=!0)},p(r,[g]){Z!==(Z=se(r))&&(j.d(1),j=Z(r),j&&(j.c(),j.m(e.parentNode,e)));const oe={};!u&&g&8&&(u=!0,oe.value=r[3],V(()=>u=!1)),s.$set(oe);const fe={};!m&&g&1&&(m=!0,fe.value=r[0],V(()=>m=!1)),a.$set(fe);const me={};!G&&g&2&&(G=!0,me.value=r[1],V(()=>G=!1)),f.$set(me);const pe={};!J&&g&4&&(J=!0,pe.value=r[2],V(()=>J=!1)),$.$set(pe);const ce={};!K&&g&128&&(K=!0,ce.value=r[7],V(()=>K=!1)),C.$set(ce),(!F||g&1272&&!_e(y.src,H=`https://3dgearmaker.com/assets/files/SpurGear-T${r[3]}-P${r[4]}-pA${r[5]}-b${r[6]}-${r[7]}mm.png?invalidation=${r[10]}`))&&o(y,"src",H),(!F||g&256)&&(P.disabled=r[8]),(!F||g&256)&&(L.disabled=r[8])},i(r){F||(S(s.$$.fragment,r),S(a.$$.fragment,r),S(f.$$.fragment,r),S($.$$.fragment,r),S(C.$$.fragment,r),F=!0)},o(r){q(s.$$.fragment,r),q(a.$$.fragment,r),q(f.$$.fragment,r),q($.$$.fragment,r),q(C.$$.fragment,r),F=!1},d(r){j.d(r),r&&k(e),r&&k(t),D(s),D(a),D(f),D($),D(C),x=!1,Ce(ne)}}}function Fe(n,e,t){let i=24,l=20,s=Math.round(l*100),u=14.5,d=Math.round(u*100),a=5,m=Math.round(a*100),h=6,f=!1,G=!1,B=new Date().getTime();function $(){t(3,i=24),t(0,l=20),t(1,u=14.5),t(2,a=5),t(7,h=6)}function J(){window.location.assign(`https://3dgearmaker.com/assets/files/SpurGear-T${i}-P${s}-pA${d}-b${m}-${h}mm.scad`)}function Y(){window.location.assign(`https://3dgearmaker.com/assets/files/SpurGear-T${i}-P${s}-pA${d}-b${m}-${h}mm.stl`)}function C(c){i=c,t(3,i)}function K(c){l=c,t(0,l)}function Q(c){u=c,t(1,u)}function I(c){a=c,t(2,a)}function y(c){h=c,t(7,h)}const H=()=>{t(9,G=!1)},X=()=>{t(8,f=!0),t(9,G=!1),Te.get(`https://tn7aauwobu7fsyqtlrph7yinhy0hmyzx.lambda-url.us-west-2.on.aws/?teeth=${i}&pitch=${l}&pa=${u}&bore=${a}&thickness=${h}`,{withCredentials:!1}).then(c=>{const{data:M}=c;M==="hello, world!"?(t(10,B=new Date().getTime()),t(9,G=!1)):t(9,G=!0)}).catch(c=>{console.error(c)}).finally(()=>{t(8,f=!1)})};return n.$$.update=()=>{n.$$.dirty&7&&(t(5,d=Math.round(u*100)),t(4,s=Math.round(l*100)),t(6,m=Math.round(a*100)))},[l,u,a,i,s,d,m,h,f,G,B,$,J,Y,C,K,Q,I,y,H,X]}class Ne extends N{constructor(e){super();O(this,e,Fe,je,z,{})}}function Oe(n){let e,t,i,l,s;return t=new qe({}),l=new Ne({}),{c(){e=_("content"),T(t.$$.fragment),i=b(),T(l.$$.fragment),o(e,"class","svelte-dh2jpw")},m(u,d){w(u,e,d),A(t,e,null),p(e,i),A(l,e,null),s=!0},p:v,i(u){s||(S(t.$$.fragment,u),S(l.$$.fragment,u),s=!0)},o(u){q(t.$$.fragment,u),q(l.$$.fragment,u),s=!1},d(u){u&&k(e),D(t),D(l)}}}class ze extends N{constructor(e){super();O(this,e,null,Oe,z,{})}}function Ie(n){let e;return{c(){e=_("footer"),e.innerHTML='Copyright \xA9 2022, <a href="https://joshcole.dev/" target="_blank">Josh Cole</a>',o(e,"class","svelte-1tgbrng")},m(t,i){w(t,e,i)},p:v,i:v,o:v,d(t){t&&k(e)}}}class He extends N{constructor(e){super();O(this,e,null,Ie,z,{})}}function Ee(n){let e;return{c(){e=_("div"),e.textContent="3D Gear Maker",o(e,"class","header svelte-ake2t5")},m(t,i){w(t,e,i)},p:v,i:v,o:v,d(t){t&&k(e)}}}class Be extends N{constructor(e){super();O(this,e,null,Ee,z,{})}}function Je(n){let e,t,i,l,s,u,d;return t=new Be({}),l=new ze({}),u=new He({}),{c(){e=_("main"),T(t.$$.fragment),i=b(),T(l.$$.fragment),s=b(),T(u.$$.fragment),o(e,"class","svelte-1oyedop")},m(a,m){w(a,e,m),A(t,e,null),p(e,i),A(l,e,null),p(e,s),A(u,e,null),d=!0},p:v,i(a){d||(S(t.$$.fragment,a),S(l.$$.fragment,a),S(u.$$.fragment,a),d=!0)},o(a){q(t.$$.fragment,a),q(l.$$.fragment,a),q(u.$$.fragment,a),d=!1},d(a){a&&k(e),D(t),D(l),D(u)}}}class Ke extends N{constructor(e){super();O(this,e,null,Je,z,{})}}new Ke({target:document.getElementById("app")});