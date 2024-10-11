class S{constructor(e){this.properties=e??[]}get(e){const n=this.properties.filter(r=>r.name===e).map(r=>r.value);if(n.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(n.length!==0)return n[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,n){const r=this.get(e);if(r!==void 0){if(n!=="json"&&typeof r!==n)throw new Error('Expected property "'+e+'" to have type "'+n+'"');return r}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,n){const r=this.get(e);if(r===void 0)throw new Error('Property "'+e+'" is missing');if(n!=="json"&&typeof r!==n)throw new Error('Expected property "'+e+'" to have type "'+n+'"');return r}getType(e){const n=this.properties.filter(r=>r.name===e).map(r=>r.type);if(n.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(n.length!==0)return n[0]}}const F="https://unpkg.com/@workadventure/scripting-api-extra@1.9.1/dist";class ae{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new S(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function D(t){const e=t?"#"+t.join():"";WA.nav.openCoWebSite(F+"/configuration.html"+e,!0)}async function ie(t,e){const n=await WA.room.getTiledMap(),r=new Map;return J(n.layers,r,t,e),r}function J(t,e,n,r){for(const o of t)if(o.type==="objectgroup"){for(const s of o.objects)if(s.type==="variable"||s.class==="variable"){if(n&&o.name!==n||r&&!r.includes(s.name))continue;e.set(s.name,new ae(s))}}else o.type==="group"&&J(o.layers,e,n,r)}let j;async function _(){return j===void 0&&(j=ue()),j}async function ue(){return ce(await WA.room.getTiledMap())}function ce(t){const e=new Map;return Q(t.layers,"",e),e}function Q(t,e,n){for(const r of t)r.type==="group"?Q(r.layers,e+r.name+"/",n):(r.name=e+r.name,n.set(r.name,r))}async function Z(){const t=await _(),e=[];for(const n of t.values())if(n.type==="objectgroup")for(const r of n.objects)(r.type==="area"||r.class==="area")&&e.push(r);return e}function le(t){let e=1/0,n=1/0,r=0,o=0;const s=t.data;if(typeof s=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let a=0;a<t.height;a++)for(let i=0;i<t.width;i++)s[i+a*t.width]!==0&&(e=Math.min(e,i),o=Math.max(o,i),n=Math.min(n,a),r=Math.max(r,a));return{top:n,left:e,right:o+1,bottom:r+1}}function ee(t){let e=1/0,n=1/0,r=0,o=0;for(const s of t){const a=le(s);a.left<e&&(e=a.left),a.top<n&&(n=a.top),a.right>o&&(o=a.right),a.bottom>r&&(r=a.bottom)}return{top:n,left:e,right:o,bottom:r}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var fe=Object.prototype.toString,E=Array.isArray||function(e){return fe.call(e)==="[object Array]"};function I(t){return typeof t=="function"}function pe(t){return E(t)?"array":typeof t}function V(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function N(t,e){return t!=null&&typeof t=="object"&&e in t}function de(t,e){return t!=null&&typeof t!="object"&&t.hasOwnProperty&&t.hasOwnProperty(e)}var ge=RegExp.prototype.test;function he(t,e){return ge.call(t,e)}var ye=/\S/;function ve(t){return!he(ye,t)}var we={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function me(t){return String(t).replace(/[&<>"'`=\/]/g,function(n){return we[n]})}var be=/\s*/,Ae=/\s+/,q=/\s*=/,We=/\s*\}/,Se=/#|\^|\/|>|\{|&|=|!/;function Ce(t,e){if(!t)return[];var n=!1,r=[],o=[],s=[],a=!1,i=!1,u="",l=0;function p(){if(a&&!i)for(;s.length;)delete o[s.pop()];else s=[];a=!1,i=!1}var h,v,k;function L(m){if(typeof m=="string"&&(m=m.split(Ae,2)),!E(m)||m.length!==2)throw new Error("Invalid tags: "+m);h=new RegExp(V(m[0])+"\\s*"),v=new RegExp("\\s*"+V(m[1])),k=new RegExp("\\s*"+V("}"+m[1]))}L(e||g.tags);for(var f=new T(t),w,c,y,P,x,A;!f.eos();){if(w=f.pos,y=f.scanUntil(h),y)for(var R=0,se=y.length;R<se;++R)P=y.charAt(R),ve(P)?(s.push(o.length),u+=P):(i=!0,n=!0,u+=" "),o.push(["text",P,w,w+1]),w+=1,P===`
`&&(p(),u="",l=0,n=!1);if(!f.scan(h))break;if(a=!0,c=f.scan(Se)||"name",f.scan(be),c==="="?(y=f.scanUntil(q),f.scan(q),f.scanUntil(v)):c==="{"?(y=f.scanUntil(k),f.scan(We),f.scanUntil(v),c="&"):y=f.scanUntil(v),!f.scan(v))throw new Error("Unclosed tag at "+f.pos);if(c==">"?x=[c,y,w,f.pos,u,l,n]:x=[c,y,w,f.pos],l++,o.push(x),c==="#"||c==="^")r.push(x);else if(c==="/"){if(A=r.pop(),!A)throw new Error('Unopened section "'+y+'" at '+w);if(A[1]!==y)throw new Error('Unclosed section "'+A[1]+'" at '+w)}else c==="name"||c==="{"||c==="&"?i=!0:c==="="&&L(y)}if(p(),A=r.pop(),A)throw new Error('Unclosed section "'+A[1]+'" at '+f.pos);return Ee(_e(o))}function _e(t){for(var e=[],n,r,o=0,s=t.length;o<s;++o)n=t[o],n&&(n[0]==="text"&&r&&r[0]==="text"?(r[1]+=n[1],r[3]=n[3]):(e.push(n),r=n));return e}function Ee(t){for(var e=[],n=e,r=[],o,s,a=0,i=t.length;a<i;++a)switch(o=t[a],o[0]){case"#":case"^":n.push(o),r.push(o),n=o[4]=[];break;case"/":s=r.pop(),s[5]=o[2],n=r.length>0?r[r.length-1][4]:e;break;default:n.push(o)}return e}function T(t){this.string=t,this.tail=t,this.pos=0}T.prototype.eos=function(){return this.tail===""};T.prototype.scan=function(e){var n=this.tail.match(e);if(!n||n.index!==0)return"";var r=n[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};T.prototype.scanUntil=function(e){var n=this.tail.search(e),r;switch(n){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=r.length,r};function C(t,e){this.view=t,this.cache={".":this.view},this.parent=e}C.prototype.push=function(e){return new C(e,this)};C.prototype.lookup=function(e){var n=this.cache,r;if(n.hasOwnProperty(e))r=n[e];else{for(var o=this,s,a,i,u=!1;o;){if(e.indexOf(".")>0)for(s=o.view,a=e.split("."),i=0;s!=null&&i<a.length;)i===a.length-1&&(u=N(s,a[i])||de(s,a[i])),s=s[a[i++]];else s=o.view[e],u=N(o.view,e);if(u){r=s;break}o=o.parent}n[e]=r}return I(r)&&(r=r.call(this.view)),r};function d(){this.templateCache={_cache:{},set:function(e,n){this._cache[e]=n},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}d.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};d.prototype.parse=function(e,n){var r=this.templateCache,o=e+":"+(n||g.tags).join(":"),s=typeof r<"u",a=s?r.get(o):void 0;return a==null&&(a=Ce(e,n),s&&r.set(o,a)),a};d.prototype.render=function(e,n,r,o){var s=this.getConfigTags(o),a=this.parse(e,s),i=n instanceof C?n:new C(n,void 0);return this.renderTokens(a,i,r,e,o)};d.prototype.renderTokens=function(e,n,r,o,s){for(var a="",i,u,l,p=0,h=e.length;p<h;++p)l=void 0,i=e[p],u=i[0],u==="#"?l=this.renderSection(i,n,r,o,s):u==="^"?l=this.renderInverted(i,n,r,o,s):u===">"?l=this.renderPartial(i,n,r,s):u==="&"?l=this.unescapedValue(i,n):u==="name"?l=this.escapedValue(i,n,s):u==="text"&&(l=this.rawValue(i)),l!==void 0&&(a+=l);return a};d.prototype.renderSection=function(e,n,r,o,s){var a=this,i="",u=n.lookup(e[1]);function l(v){return a.render(v,n,r,s)}if(u){if(E(u))for(var p=0,h=u.length;p<h;++p)i+=this.renderTokens(e[4],n.push(u[p]),r,o,s);else if(typeof u=="object"||typeof u=="string"||typeof u=="number")i+=this.renderTokens(e[4],n.push(u),r,o,s);else if(I(u)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");u=u.call(n.view,o.slice(e[3],e[5]),l),u!=null&&(i+=u)}else i+=this.renderTokens(e[4],n,r,o,s);return i}};d.prototype.renderInverted=function(e,n,r,o,s){var a=n.lookup(e[1]);if(!a||E(a)&&a.length===0)return this.renderTokens(e[4],n,r,o,s)};d.prototype.indentPartial=function(e,n,r){for(var o=n.replace(/[^ \t]/g,""),s=e.split(`
`),a=0;a<s.length;a++)s[a].length&&(a>0||!r)&&(s[a]=o+s[a]);return s.join(`
`)};d.prototype.renderPartial=function(e,n,r,o){if(r){var s=this.getConfigTags(o),a=I(r)?r(e[1]):r[e[1]];if(a!=null){var i=e[6],u=e[5],l=e[4],p=a;u==0&&l&&(p=this.indentPartial(a,l,i));var h=this.parse(p,s);return this.renderTokens(h,n,r,p,o)}}};d.prototype.unescapedValue=function(e,n){var r=n.lookup(e[1]);if(r!=null)return r};d.prototype.escapedValue=function(e,n,r){var o=this.getConfigEscape(r)||g.escape,s=n.lookup(e[1]);if(s!=null)return typeof s=="number"&&o===g.escape?String(s):o(s)};d.prototype.rawValue=function(e){return e[1]};d.prototype.getConfigTags=function(e){return E(e)?e:e&&typeof e=="object"?e.tags:void 0};d.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!E(e))return e.escape};var g={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){M.templateCache=t},get templateCache(){return M.templateCache}},M=new d;g.clearCache=function(){return M.clearCache()};g.parse=function(e,n){return M.parse(e,n)};g.render=function(e,n,r,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+pe(e)+'" was given as the first argument for mustache#render(template, view, partials)');return M.render(e,n,r,o)};g.escape=me;g.Scanner=T;g.Context=C;g.Writer=d;class te{constructor(e,n){this.template=e,this.state=n,this.ast=g.parse(e)}getValue(){return this.value===void 0&&(this.value=g.render(this.template,this.state)),this.value}onChange(e){const n=[];for(const r of this.getUsedVariables().values())n.push(this.state.onVariableChange(r).subscribe(()=>{const o=g.render(this.template,this.state);o!==this.value&&(this.value=o,e(this.value))}));return{unsubscribe:()=>{for(const r of n)r.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,n){for(const r of e){const o=r[0],s=r[1],a=r[4];["name","&","#","^"].includes(o)&&n.add(s),a!==void 0&&typeof a!="string"&&this.recursiveGetUsedVariables(a,n)}}}async function Le(){var t;const e=await Z();for(const n of e){const r=(t=n.properties)!==null&&t!==void 0?t:[];for(const o of r){if(o.type==="int"||o.type==="bool"||o.type==="object"||typeof o.value!="string")continue;const s=new te(o.value,WA.state);if(s.isPureString())continue;const a=s.getValue();await K(n.name,o.name,a),s.onChange(async i=>{await K(n.name,o.name,i)})}}}async function Pe(){var t;const e=await _();for(const[n,r]of e.entries())if(r.type!=="objectgroup"){const o=(t=r.properties)!==null&&t!==void 0?t:[];for(const s of o){if(s.type==="int"||s.type==="bool"||s.type==="object"||typeof s.value!="string")continue;const a=new te(s.value,WA.state);if(a.isPureString())continue;const i=a.getValue();$(n,s.name,i),a.onChange(u=>{$(n,s.name,u)})}}}async function K(t,e,n){console.log(t),(await WA.room.area.get(t)).setProperty(e,n)}function $(t,e,n){WA.room.setProperty(t,e,n),e==="visible"&&(n?WA.room.showLayer(t):WA.room.hideLayer(t))}const Me="https://admin.workadventu.re/html";let G,U=0,O=0;function H(t){if(WA.state[t.name]){let e=t.properties.mustGetString("openLayer");for(const n of e.split(`
`))WA.room.showLayer(n);e=t.properties.mustGetString("closeLayer");for(const n of e.split(`
`))WA.room.hideLayer(n)}else{let e=t.properties.mustGetString("openLayer");for(const n of e.split(`
`))WA.room.hideLayer(n);e=t.properties.mustGetString("closeLayer");for(const n of e.split(`
`))WA.room.showLayer(n)}}function Te(t){const e=t.properties.getString("openSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=re(t.properties.mustGetString("openLayer").split(`
`));if(o>n)return;r=1-o/n}e&&WA.sound.loadSound(e).play({volume:r})}function ke(t){const e=t.properties.getString("closeSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=re(t.properties.mustGetString("closeLayer").split(`
`));if(o>n)return;r=1-o/n}e&&WA.sound.loadSound(e).play({volume:r})}function ne(t){return t.map(e=>G.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function re(t){const e=ne(t),n=ee(e),r=((n.right-n.left)/2+n.left)*32,o=((n.bottom-n.top)/2+n.top)*32;return Math.sqrt(Math.pow(U-r,2)+Math.pow(O-o,2))}function xe(t){WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]?Te(t):ke(t),H(t)}),H(t)}function z(t,e,n,r){const o=t.name;let s,a,i=!1;const u=n.getString("tag");let l=!0;u&&!WA.player.tags.includes(u)&&(l=!1);const p=!!u;function h(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=n.getString("closeTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,v()}})}function v(){var c;s&&s.remove(),s=WA.ui.displayActionMessage({message:(c=n.getString("openTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,h()}})}function k(){let c;if(t.type==="tilelayer")c=ee(ne(e.properties.mustGetString("closeLayer").split(`
`)));else{if(t.x===void 0||t.y===void 0||t.width===void 0||t.height===void 0)throw new Error(`Doorstep zone "${t.name}" is missing x, y, width or height`);c={top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}a=WA.room.website.create({name:"doorKeypad"+o,url:r+"/keypad.html#"+encodeURIComponent(o),position:{x:c.right*32,y:c.top*32,width:32*3,height:32*4},allowApi:!0})}function L(){a&&(WA.room.website.delete(a.name),a=void 0)}function f(){if(i=!0,n.getBoolean("autoOpen")&&l){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(p&&!l||!p)&&(n.getString("code")||n.getString("codeVariable"))){k();return}l&&(WA.state[e.name]?h():v())}function w(){i=!1,n.getBoolean("autoClose")&&(WA.state[e.name]=!1),s&&s.remove(),L()}t.type==="tilelayer"?(WA.room.onEnterLayer(o).subscribe(f),WA.room.onLeaveLayer(o).subscribe(w)):(WA.room.area.onEnter(o).subscribe(f),WA.room.area.onLeave(o).subscribe(w)),WA.state.onVariableChange(e.name).subscribe(()=>{i&&(!n.getBoolean("autoClose")&&WA.state[e.name]===!0&&h(),a&&WA.state[e.name]===!0&&L(),!n.getBoolean("autoOpen")&&WA.state[e.name]===!1&&v())})}function Be(t){const e=t.properties.mustGetString("bellSound"),n=t.properties.getNumber("soundRadius");let r=1;if(n){const o=Math.sqrt(Math.pow(t.x-U,2)+Math.pow(t.y-O,2));if(o>n)return;r=1-o/n}WA.sound.loadSound(e).play({volume:r})}function Re(t){WA.state[t.name]===void 0&&(WA.state[t.name]=0),WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]&&Be(t)})}function X(t,e,n){let r;const o=e.getString("bellPopup");if(n.type==="tilelayer"){const s=n.name;WA.room.onEnterLayer(s).subscribe(()=>{var a;o?r=WA.ui.openPopup(o,"",[{label:(a=e.getString("bellButtonText"))!==null&&a!==void 0?a:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.onLeaveLayer(s).subscribe(()=>{r&&(r.close(),r=void 0)})}else{const s=n.name;WA.room.area.onEnter(s).subscribe(()=>{var a;o?r=WA.ui.openPopup(o,"",[{label:(a=e.getString("bellButtonText"))!==null&&a!==void 0?a:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.area.onLeave(s).subscribe(()=>{r&&(r.close(),r=void 0)})}}async function je(t){t=t??Me;const e=await ie();G=await _();for(const n of e.values())n.properties.get("door")&&xe(n),n.properties.get("bell")&&Re(n);for(const n of G.values()){const r=new S(n.properties),o=r.getString("doorVariable");if(o&&n.type==="tilelayer"){const a=e.get(o);if(a===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of layer "'+n.name+'"');z(n,a,r,t)}const s=r.getString("bellVariable");s&&n.type==="tilelayer"&&X(s,r,n)}for(const n of await Z()){const r=new S(n.properties),o=r.getString("doorVariable");if(o){const a=e.get(o);if(a===void 0)throw new Error('Cannot find variable "'+o+'" referred in the "doorVariable" property of object "'+n.name+'"');z(n,a,r,t)}const s=r.getString("bellVariable");s&&X(s,r,n)}WA.player.onPlayerMove(n=>{U=n.x,O=n.y})}function Ve(t,e){const n=t.getString("bindVariable");if(n){const r=t.get("enterValue"),o=t.get("leaveValue"),s=t.getString("triggerMessage"),a=t.getString("tag");Ge(n,e,r,o,s,a)}}function Ge(t,e,n,r,o,s){s&&!WA.player.tags.includes(s)||(n!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{o||(WA.state[t]=n)}),r!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[t]=r}))}async function Ie(){const t=await _();for(const e of t.values()){const n=new S(e.properties);Ve(n,e.name)}}let Y;async function Ue(t){const e=await WA.room.getTiledMap();t=t??F,Y=await _();const n=e.layers.find(r=>r.name==="configuration");if(n){const o=new S(n.properties).getString("tag");(!o||WA.player.tags.includes(o))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(t+"/configuration.html",!0)});for(const s of Y.values()){const a=new S(s.properties),i=a.getString("openConfig");i&&s.type==="tilelayer"&&Oe(i.split(","),s.name,a)}}}function Oe(t,e,n){let r;const o=n.getString("openConfigAdminTag");let s=!0;o&&!WA.player.tags.includes(o)&&(s=!1);function a(){var u;r&&r.remove(),r=WA.ui.displayActionMessage({message:(u=n.getString("openConfigTriggerMessage"))!==null&&u!==void 0?u:"Press SPACE or touch here to configure",callback:()=>D(t)})}function i(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const u=n.getString("openConfigTrigger");s&&(u&&u==="onaction"?a():D(t))}),WA.room.onLeaveLayer(e).subscribe(()=>{r&&r.remove(),i()})}function De(){return WA.onInit().then(()=>{je().catch(t=>console.error(t)),Ie().catch(t=>console.error(t)),Ue().catch(t=>console.error(t)),Pe().catch(t=>console.error(t)),Le().catch(t=>console.error(t))}).catch(t=>console.error(t))}var W=(t=>(t.wood="wood",t.forest="forest",t.snow="snow",t.marble="marble",t.grass="grass",t.stone="stone",t))(W||{});const B={[W.wood]:["/sounds/wood_01_a.wav","/sounds/wood_01_b.wav","/sounds/wood_01_c.wav","/sounds/wood_01_d.wav"],[W.forest]:["/sounds/forest_01.wav","/sounds/forest_02.wav","/sounds/forest_03.wav"],[W.snow]:["/sounds/snow_01_a.wav","/sounds/snow_01_b.wav","/sounds/snow_01_c.wav","/sounds/snow_01_d.wav"],[W.marble]:["/sounds/marble_01.wav","/sounds/marble_02.wav","/sounds/marble_03.wav"],[W.grass]:["/sounds/grass_01.wav","/sounds/grass_02.wav","/sounds/grass_03.wav"],[W.stone]:["/sounds/stone_01_a.wav","/sounds/stone_01_b.wav","/sounds/stone_01_c.wav","/sounds/stone_01_d.wav","/sounds/stone_01_e.wav"]},Ne={volume:1,loop:!1,rate:1.5,detune:1,delay:0,seek:0,mute:!1};let b,oe=[];function qe(t){if(!B[t])return;const e=Math.floor(Math.random()*B[t].length);b=WA.sound.loadSound(B[t][e]),b.play(Ne)}async function Ke(){var t;try{const e=await _(),n=[];for(const r of e.values())if(r.type==="objectgroup"){for(const o of r.objects)if(o.properties&&o.properties.some(s=>s.name==="stepSound"&&s.value===!0)){const s=(t=o.properties.find(a=>a.name==="material"))==null?void 0:t.value;B[s]&&n.push({name:o.name,x:o.x,y:o.y,width:o.width,height:o.height,material:s})}}return console.log("Found step sound areas:",n),n}catch(e){return console.error("Error while getting step sound areas:",e),[]}}function $e(t,e){return t.x>=e.x&&t.x<=e.x+e.width&&t.y>=e.y&&t.y<=e.y+e.height}async function He(t){try{for(const e of oe)if($e(t,e))return e.material;return null}catch(e){return console.error("Error while checking player material:",e),null}}WA.onInit().then(async()=>{oe=await Ke()});console.log("Script started successfully");WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags)});De().then(()=>{console.log("Scripting API Extra ready")}).catch(t=>console.error(t));WA.onInit().then(async()=>{WA.player.onPlayerMove(async({x:t,y:e,moving:n})=>{const r=await He({x:t,y:e});console.log(r),!n||!r?b==null||b.stop():(b==null||b.stop(),qe(r))})});
//# sourceMappingURL=main-a08058c4.js.map