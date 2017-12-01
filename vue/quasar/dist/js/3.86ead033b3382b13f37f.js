webpackJsonp([3,5],{199:function(t,e,n){var o=n(200);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(50)("b48a7d6a",o,!0)},200:function(t,e,n){e=t.exports=n(49)(void 0),e.push([t.i,".region-tooltip{display:none;position:absolute;background-color:snow;border:1px solid #666;border-radius:3px;padding:5px;z-index:500}",""])},201:function(t,e,n){"use strict";var o=n(2);e.a={name:"region-tooltip",components:{QProgress:o.r},data:function(){return{region:{},positionX:0,positionY:0,display:"none"}},computed:{regionIconSrc:function(){var t="state"===this.region.regionType?this.region.regionId:this.region.parentId;return this.$census.getRegionImageUrl(t)}},methods:{show:function(t,e){this.region=t,e&&void 0!==e&&2===e.length?(this.positionX=Number(e[0]),this.positionY=Number(e[1])):(this.positionX=0,this.positionY=0),this.display="block"},hide:function(){this.display="none"}}}},202:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"region-tooltip",style:{display:t.display,left:t.positionX+"px",top:t.positionY+"px"}},[n("div",{staticClass:"card-subtitle"},[n("img",{staticClass:"flag",attrs:{src:t.regionIconSrc,height:"24"}}),t._v(" "),n("span",{staticClass:"card-title"},[t._v(t._s(t.region.regionName))])]),t._v(" "),n("hr"),t._v(" "),n("div",{staticClass:"card-subtitle"},[n("q-icon",{attrs:{name:"people"}}),t._v(" "),n("span",{staticClass:"text-bold"},[t._v(t._s(t._f("formatNumber")(t.region.population)))])],1),t._v(" "),n("div",{staticClass:"card-subtitle"},[n("span",{staticClass:"text-faded"},[t._v("density:")]),t._v(" "),n("span",{staticClass:"text-bold"},[t._v(t._s(t._f("formatDecimal")(t.region.density)))]),t._v(" "),n("span",{staticClass:"text-small"},[t._v("p/mi²")])])])},r=[],i={render:o,staticRenderFns:r};e.a=i},203:function(t,e){var n=Math.ceil,o=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?o:n)(t)}},204:function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},205:function(t,e){var n=t.exports={version:"2.5.1"};"number"==typeof __e&&(__e=n)},206:function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},207:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},208:function(t,e){t.exports={}},209:function(t,e,n){var o=n(286)("keys"),r=n(287);t.exports=function(t){return o[t]||(o[t]=r(t))}},279:function(t,e,n){var o=n(70),r=n(205),i=n(280),a=n(71),s=function(t,e,n){var c,u,l,f=t&s.F,p=t&s.G,d=t&s.S,v=t&s.P,h=t&s.B,g=t&s.W,b=p?r:r[e]||(r[e]={}),y=b.prototype,m=p?o:d?o[e]:(o[e]||{}).prototype;p&&(n=e);for(c in n)(u=!f&&m&&void 0!==m[c])&&c in b||(l=u?m[c]:n[c],b[c]=p&&"function"!=typeof m[c]?n[c]:h&&u?i(l,o):g&&m[c]==l?function(t){var e=function(e,n,o){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,o)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(l):v&&"function"==typeof l?i(Function.call,l):l,v&&((b.virtual||(b.virtual={}))[c]=l,t&s.R&&y&&!y[c]&&a(y,c,l)))};s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},280:function(t,e,n){var o=n(325);t.exports=function(t,e,n){if(o(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,o){return t.call(e,n,o)};case 3:return function(n,o,r){return t.call(e,n,o,r)}}return function(){return t.apply(e,arguments)}}},281:function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},282:function(t,e,n){var o=n(206),r=n(70).document,i=o(r)&&o(r.createElement);t.exports=function(t){return i?r.createElement(t):{}}},283:function(t,e,n){var o=n(334),r=n(204);t.exports=function(t){return o(r(t))}},284:function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},285:function(t,e,n){var o=n(203),r=Math.min;t.exports=function(t){return t>0?r(o(t),9007199254740991):0}},286:function(t,e,n){var o=n(70),r=o["__core-js_shared__"]||(o["__core-js_shared__"]={});t.exports=function(t){return r[t]||(r[t]={})}},287:function(t,e){var n=0,o=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+o).toString(36))}},288:function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},289:function(t,e,n){var o=n(72).f,r=n(75),i=n(68)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,i)&&o(t,i,{configurable:!0,value:e})}},290:function(t,e,n){var o=n(204);t.exports=function(t){return Object(o(t))}},313:function(t,e,n){var o=n(314);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(50)("ec75a690",o,!0)},314:function(t,e,n){e=t.exports=n(49)(void 0),e.push([t.i,".q-item{min-height:32px;padding:0 5px}.q-item-side{min-width:32px}.q-collapsible-sub-item{padding:0}.card-subtitle{padding-left:5px;font-size:14px}.flag{vertical-align:middle}.data-table{height:272px;margin:5px 0 0 2px;overflow-y:scroll}th{background-color:#efefef}table.q-table td,table.q-table th,td,th{border:1px solid #eee;cursor:pointer;font-size:14px;padding:5px}",""])},315:function(t,e,n){var o=n(316);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(50)("f47288d2",o,!0)},316:function(t,e,n){e=t.exports=n(49)(void 0),e.push([t.i,"",""])},317:function(t,e,n){"use strict";var o=n(318),r=n.n(o),i=n(2),a=n(51);e.a={name:"population-table",components:{QBtn:i.c,QProgress:i.r,RegionTooltip:a.default},data:function(){return{selectedRegion:{},topLevelRegion:null,tableData:[],dataProgress:15,maxPopulation:0,maxDensity:0,sortColumn:"regionName",sortAscending:!0,regionColumnLabel:"state"}},computed:{regionIconSrc:function(){return this.$census.getRegionImageUrl(this.selectedRegion.regionId)}},created:function(){var t=this;this.onRegionSelectionChange=function(e){t.selectedRegion=e,null===t.topLevelRegion&&(t.topLevelRegion=e),t.dataProgress=15,console.log("table:selectedRegion:",e.regionName)},this.$q.events.$on(this.$census.events.REGION,this.onRegionSelectionChange),this.onPopulationUpdate=function(e){t.selectedRegion.population=e.totalPopulation,t.tableData=e.populationData,t.dataProgress=100,t.sortColumn="regionName",t.sortAscending=!0,t.tableData&&t.tableData.length>0&&(t.regionColumnLabel=t.tableData[0].regionType,t.maxPopulation=t.getMaxValue(t.tableData,"population"),t.maxDensity=t.getMaxValue(t.tableData,"density")),t.sortTableData("population"),console.log("table data updated")},this.$q.events.$on(this.$census.events.POPULATION,this.onPopulationUpdate),console.log("table created")},mounted:function(){console.log("table mounted")},beforeDestroy:function(){this.$q.events.$off(this.$census.events.REGION,this.onRegionSelectionChange),this.$q.events.$off(this.$census.events.POPULATION,this.onPopulationUpdate)},methods:{backToTopLevel:function(){i.b.$emit(this.$census.events.REGION,this.topLevelRegion),this.$census.getPopulation()},rowClick:function(t){console.log("table:rowClick: rowIndex="+t);var e=this.tableData[t];"state"===e.regionType&&i.b.$emit(this.$census.events.REGION,e)},rowMouseOver:function(t){var e=t.target.parentNode.getAttribute("data-index");if(e&&void 0!==this.$refs.regionTooltip){this.tableData[e].parentId=this.selectedRegion.regionId;var n=[2,-32];this.$refs.regionTooltip.show(this.tableData[e],n)}},rowMouseOut:function(t){this.$refs.regionTooltip.hide()},sortTableData:function(t){if(this.sortColumn===t)this.tableData=this.tableData.reverse(),this.sortAscending=!this.sortAscending;else{switch(t){case"regionName":this.tableData=this.tableData.sort(function(e,n){return e[t]>n[t]?-1:e[t]<n[t]?1:0});break;default:this.tableData=this.tableData.sort(function(e,n){return Number(e[t])-Number(n[t])})}this.sortColumn=t,this.sortAscending=!1,this.tableData=this.tableData.reverse()}console.log("table:sortData: property="+t+" ascending="+this.sortAscending)},getMaxValue:function(t,e){return Math.max.apply(Math,r()(t.filter(function(t){return Number(t[e])}).map(function(t){return Number(t[e])})))}}}},318:function(t,e,n){"use strict";e.__esModule=!0;var o=n(319),r=function(t){return t&&t.__esModule?t:{default:t}}(o);e.default=function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return(0,r.default)(t)}},319:function(t,e,n){t.exports={default:n(320),__esModule:!0}},320:function(t,e,n){n(321),n(339),t.exports=n(205).Array.from},321:function(t,e,n){"use strict";var o=n(322)(!0);n(323)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=o(e,n),this._i+=t.length,{value:t,done:!1})})},322:function(t,e,n){var o=n(203),r=n(204);t.exports=function(t){return function(e,n){var i,a,s=String(r(e)),c=o(n),u=s.length;return c<0||c>=u?t?"":void 0:(i=s.charCodeAt(c),i<55296||i>56319||c+1===u||(a=s.charCodeAt(c+1))<56320||a>57343?t?s.charAt(c):i:t?s.slice(c,c+2):a-56320+(i-55296<<10)+65536)}}},323:function(t,e,n){"use strict";var o=n(324),r=n(279),i=n(328),a=n(71),s=n(75),c=n(208),u=n(329),l=n(289),f=n(338),p=n(68)("iterator"),d=!([].keys&&"next"in[].keys()),v=function(){return this};t.exports=function(t,e,n,h,g,b,y){u(n,e,h);var m,x,_,w=function(t){if(!d&&t in D)return D[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},O=e+" Iterator",C="values"==g,P=!1,D=t.prototype,R=D[p]||D["@@iterator"]||g&&D[g],S=R||w(g),T=g?C?w("entries"):S:void 0,A="Array"==e?D.entries||R:R;if(A&&(_=f(A.call(new t)))!==Object.prototype&&_.next&&(l(_,O,!0),o||s(_,p)||a(_,p,v)),C&&R&&"values"!==R.name&&(P=!0,S=function(){return R.call(this)}),o&&!y||!d&&!P&&D[p]||a(D,p,S),c[e]=S,c[O]=v,g)if(m={values:C?S:w("values"),keys:b?S:w("keys"),entries:T},y)for(x in m)x in D||i(D,x,m[x]);else r(r.P+r.F*(d||P),e,m);return m}},324:function(t,e){t.exports=!0},325:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},326:function(t,e,n){t.exports=!n(74)&&!n(281)(function(){return 7!=Object.defineProperty(n(282)("div"),"a",{get:function(){return 7}}).a})},327:function(t,e,n){var o=n(206);t.exports=function(t,e){if(!o(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!o(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},328:function(t,e,n){t.exports=n(71)},329:function(t,e,n){"use strict";var o=n(330),r=n(207),i=n(289),a={};n(71)(a,n(68)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=o(a,{next:r(1,n)}),i(t,e+" Iterator")}},330:function(t,e,n){var o=n(73),r=n(331),i=n(288),a=n(209)("IE_PROTO"),s=function(){},c=function(){var t,e=n(282)("iframe"),o=i.length;for(e.style.display="none",n(337).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),c=t.F;o--;)delete c.prototype[i[o]];return c()};t.exports=Object.create||function(t,e){var n;return null!==t?(s.prototype=o(t),n=new s,s.prototype=null,n[a]=t):n=c(),void 0===e?n:r(n,e)}},331:function(t,e,n){var o=n(72),r=n(73),i=n(332);t.exports=n(74)?Object.defineProperties:function(t,e){r(t);for(var n,a=i(e),s=a.length,c=0;s>c;)o.f(t,n=a[c++],e[n]);return t}},332:function(t,e,n){var o=n(333),r=n(288);t.exports=Object.keys||function(t){return o(t,r)}},333:function(t,e,n){var o=n(75),r=n(283),i=n(335)(!1),a=n(209)("IE_PROTO");t.exports=function(t,e){var n,s=r(t),c=0,u=[];for(n in s)n!=a&&o(s,n)&&u.push(n);for(;e.length>c;)o(s,n=e[c++])&&(~i(u,n)||u.push(n));return u}},334:function(t,e,n){var o=n(284);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==o(t)?t.split(""):Object(t)}},335:function(t,e,n){var o=n(283),r=n(285),i=n(336);t.exports=function(t){return function(e,n,a){var s,c=o(e),u=r(c.length),l=i(a,u);if(t&&n!=n){for(;u>l;)if((s=c[l++])!=s)return!0}else for(;u>l;l++)if((t||l in c)&&c[l]===n)return t||l||0;return!t&&-1}}},336:function(t,e,n){var o=n(203),r=Math.max,i=Math.min;t.exports=function(t,e){return t=o(t),t<0?r(t+e,0):i(t,e)}},337:function(t,e,n){var o=n(70).document;t.exports=o&&o.documentElement},338:function(t,e,n){var o=n(75),r=n(290),i=n(209)("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=r(t),o(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},339:function(t,e,n){"use strict";var o=n(280),r=n(279),i=n(290),a=n(340),s=n(341),c=n(285),u=n(342),l=n(343);r(r.S+r.F*!n(345)(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,r,f,p=i(t),d="function"==typeof this?this:Array,v=arguments.length,h=v>1?arguments[1]:void 0,g=void 0!==h,b=0,y=l(p);if(g&&(h=o(h,v>2?arguments[2]:void 0,2)),void 0==y||d==Array&&s(y))for(e=c(p.length),n=new d(e);e>b;b++)u(n,b,g?h(p[b],b):p[b]);else for(f=y.call(p),n=new d;!(r=f.next()).done;b++)u(n,b,g?a(f,h,[r.value,b],!0):r.value);return n.length=b,n}})},340:function(t,e,n){var o=n(73);t.exports=function(t,e,n,r){try{return r?e(o(n)[0],n[1]):e(n)}catch(e){var i=t.return;throw void 0!==i&&o(i.call(t)),e}}},341:function(t,e,n){var o=n(208),r=n(68)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(o.Array===t||i[r]===t)}},342:function(t,e,n){"use strict";var o=n(72),r=n(207);t.exports=function(t,e,n){e in t?o.f(t,e,r(0,n)):t[e]=n}},343:function(t,e,n){var o=n(344),r=n(68)("iterator"),i=n(208);t.exports=n(205).getIteratorMethod=function(t){if(void 0!=t)return t[r]||t["@@iterator"]||i[o(t)]}},344:function(t,e,n){var o=n(284),r=n(68)("toStringTag"),i="Arguments"==o(function(){return arguments}()),a=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=a(e=Object(t),r))?n:i?o(e):"Object"==(s=o(e))&&"function"==typeof e.callee?"Arguments":s}},345:function(t,e,n){var o=n(68)("iterator"),r=!1;try{var i=[7][o]();i.return=function(){r=!0},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!r)return!1;var n=!1;try{var i=[7],a=i[o]();a.next=function(){return{done:n=!0}},i[o]=function(){return a},t(i)}catch(t){}return n}},346:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-card",[n("q-card-title",[n("img",{staticClass:"flag",attrs:{src:t.regionIconSrc,height:"24"}}),t._v(" "),n("span",{staticClass:"card-title"},[t._v(t._s(t.selectedRegion.regionName))]),t._v(" "),n("q-btn",{staticClass:"map-button",attrs:{slot:"right",small:"",flat:""},on:{click:function(e){t.backToTopLevel()}},slot:"right"},[n("q-icon",{attrs:{name:"arrow back"}})],1)],1),t._v(" "),n("q-progress",{ref:"progressBar",staticStyle:{height:"2px"},attrs:{percentage:t.dataProgress,color:"primary"}}),t._v(" "),n("q-collapsible",{attrs:{icon:"people",opened:"",label:t._f("formatNumber")(t.selectedRegion.population)}},[n("div",{staticClass:"card-subtitle"},[n("span",{staticClass:"text-faded"},[t._v("density:")]),t._v(" "),n("span",{staticClass:"text-bold"},[t._v(t._s(t._f("formatDecimal")(t.selectedRegion.density)))]),t._v(" "),n("span",{staticClass:"text-small"},[t._v("p/mi²")])]),t._v(" "),n("q-card-main",{staticClass:"table card data-table"},[n("region-tooltip",{ref:"regionTooltip",attrs:{id:"regionTooltip"}}),t._v(" "),n("table",{ref:"dataTable",staticClass:"q-table standard bordered highlight horizontal-separator vertical-separator",staticStyle:{width:"100%"},attrs:{id:"data-table"}},[n("thead",[n("tr",[n("th",{on:{click:function(e){t.sortTableData("regionName")}}},[t._v(t._s(t.regionColumnLabel))]),t._v(" "),n("th",{on:{click:function(e){t.sortTableData("population")}}},[t._v("population")]),t._v(" "),n("th",{on:{click:function(e){t.sortTableData("density")}}},[t._v("density")])])]),t._v(" "),n("tbody",t._l(t.tableData,function(e,o){return n("tr",{key:e.regionId,attrs:{"data-index":o},on:{click:function(e){t.rowClick(o)},mouseover:t.rowMouseOver,mouseout:t.rowMouseOut}},[n("td",{attrs:{"data-th":"State"}},[t._v(t._s(e.regionName))]),t._v(" "),n("td",{attrs:{"data-th":"Population"}},[t._v("\n            "+t._s(t._f("formatNumber")(e.population))+"\n            "),n("q-progress",{staticStyle:{height:"2px"},attrs:{percentage:e.population/t.selectedRegion.population*100,color:"cyan"}})],1),t._v(" "),n("td",{attrs:{"data-th":"Density"}},[t._v("\n            "+t._s(t._f("formatDecimal")(e.density))+"\n            "),n("q-progress",{staticStyle:{height:"2px"},attrs:{percentage:e.density/t.maxDensity*100,color:"red"}})],1)])}))])],1)],1)],1)},r=[],i={render:o,staticRenderFns:r};e.a=i},51:function(t,e,n){"use strict";function o(t){n(199)}Object.defineProperty(e,"__esModule",{value:!0});var r=n(201),i=n(202),a=n(11),s=o,c=a(r.a,i.a,!1,s,null,null);e.default=c.exports},55:function(t,e,n){"use strict";function o(t){n(313),n(315)}Object.defineProperty(e,"__esModule",{value:!0});var r=n(317),i=n(346),a=n(11),s=o,c=a(r.a,i.a,!1,s,null,null);e.default=c.exports},68:function(t,e,n){var o=n(286)("wks"),r=n(287),i=n(70).Symbol,a="function"==typeof i;(t.exports=function(t){return o[t]||(o[t]=a&&i[t]||(a?i:r)("Symbol."+t))}).store=o},70:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},71:function(t,e,n){var o=n(72),r=n(207);t.exports=n(74)?function(t,e,n){return o.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},72:function(t,e,n){var o=n(73),r=n(326),i=n(327),a=Object.defineProperty;e.f=n(74)?Object.defineProperty:function(t,e,n){if(o(t),e=i(e,!0),o(n),r)try{return a(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},73:function(t,e,n){var o=n(206);t.exports=function(t){if(!o(t))throw TypeError(t+" is not an object!");return t}},74:function(t,e,n){t.exports=!n(281)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},75:function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}}});