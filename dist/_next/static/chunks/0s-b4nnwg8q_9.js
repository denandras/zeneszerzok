(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,10923,(e,t,a)=>{"use strict";function r({widthInt:e,heightInt:t,blurWidth:a,blurHeight:i,blurDataURL:s,objectFit:l}){let n=a?40*a:e,o=i?40*i:t,d=n&&o?`viewBox='0 0 ${n} ${o}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${d}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${d?"none":"contain"===l?"xMidYMid":"cover"===l?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${s}'/%3E%3C/svg%3E`}Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},33866,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={VALID_LOADERS:function(){return s},imageConfigDefault:function(){return l}};for(var i in r)Object.defineProperty(a,i,{enumerable:!0,get:r[i]});let s=["default","imgix","cloudinary","akamai","custom"],l={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},41912,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"getImgProps",{enumerable:!0,get:function(){return d}}),e.r(49980);let r=e.r(91476),i=e.r(10923),s=e.r(33866),l=["-moz-initial","fill","none","scale-down",void 0];function n(e){return void 0!==e.default}function o(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function d({src:e,sizes:t,unoptimized:a=!1,priority:m=!1,preload:c=!1,loading:u,className:f,quality:p,width:g,height:h,fill:x=!1,style:b,overrideSrc:y,onLoad:v,onLoadingComplete:k,placeholder:z="empty",blurDataURL:w,fetchPriority:j,decoding:N="async",layout:E,objectFit:S,objectPosition:_,lazyBoundary:A,lazyRoot:M,...O},P){var C;let L,R,I,{imgConf:q,showAltText:T,blurComplete:B,defaultLoader:D}=P,H=q||s.imageConfigDefault;if("allSizes"in H)L=H;else{let e=[...H.deviceSizes,...H.imageSizes].sort((e,t)=>e-t),t=H.deviceSizes.sort((e,t)=>e-t),a=H.qualities?.sort((e,t)=>e-t);L={...H,allSizes:e,deviceSizes:t,qualities:a}}if(void 0===D)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let V=O.loader||D;delete O.loader,delete O.srcSet;let $="__next_img_default"in V;if($){if("custom"===L.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=V;V=t=>{let{config:a,...r}=t;return e(r)}}if(E){"fill"===E&&(x=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[E];e&&(b={...b,...e});let a={responsive:"100vw",fill:"100vw"}[E];a&&!t&&(t=a)}let G="",W=o(g),F=o(h);if((C=e)&&"object"==typeof C&&(n(C)||void 0!==C.src)){let t=n(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(R=t.blurWidth,I=t.blurHeight,w=w||t.blurDataURL,G=t.src,!x)if(W||F){if(W&&!F){let e=W/t.width;F=Math.round(t.height*e)}else if(!W&&F){let e=F/t.height;W=Math.round(t.width*e)}}else W=t.width,F=t.height}let K=!m&&!c&&("lazy"===u||void 0===u);(!(e="string"==typeof e?e:G)||e.startsWith("data:")||e.startsWith("blob:"))&&(a=!0,K=!1),L.unoptimized&&(a=!0),$&&!L.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(a=!0);let Y=o(p),U=Object.assign(x?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:S,objectPosition:_}:{},T?{}:{color:"transparent"},b),J=B||"empty"===z?null:"blur"===z?`url("data:image/svg+xml;charset=utf-8,${(0,i.getImageBlurSvg)({widthInt:W,heightInt:F,blurWidth:R,blurHeight:I,blurDataURL:w||"",objectFit:U.objectFit})}")`:`url("${z}")`,Z=l.includes(U.objectFit)?"fill"===U.objectFit?"100% 100%":"cover":U.objectFit,X=J?{backgroundSize:Z,backgroundPosition:U.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:J}:{},Q=function({config:e,src:t,unoptimized:a,width:i,quality:s,sizes:l,loader:n}){if(a){if(t.startsWith("/")&&!t.startsWith("//")){let e=(0,r.getDeploymentId)();if(e){let a=t.indexOf("?");if(-1!==a){let r=new URLSearchParams(t.slice(a+1));r.get("dpl")||(r.append("dpl",e),t=t.slice(0,a)+"?"+r.toString())}else t+=`?dpl=${e}`}}return{src:t,srcSet:void 0,sizes:void 0}}let{widths:o,kind:d}=function({deviceSizes:e,allSizes:t},a,r){if(r){let a=/(^|\s)(1?\d?\d)vw/g,i=[];for(let e;e=a.exec(r);)i.push(parseInt(e[2]));if(i.length){let a=.01*Math.min(...i);return{widths:t.filter(t=>t>=e[0]*a),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof a?{widths:e,kind:"w"}:{widths:[...new Set([a,2*a].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,i,l),m=o.length-1;return{sizes:l||"w"!==d?l:"100vw",srcSet:o.map((a,r)=>`${n({config:e,src:t,quality:s,width:a})} ${"w"===d?a:r+1}${d}`).join(", "),src:n({config:e,src:t,quality:s,width:o[m]})}}({config:L,src:e,unoptimized:a,width:W,quality:Y,sizes:t,loader:V}),ee=K?"lazy":u;return{props:{...O,loading:ee,fetchPriority:j,width:W,height:F,decoding:N,className:f,style:{...U,...X},sizes:Q.sizes,srcSet:Q.srcSet,src:y||Q.src},meta:{unoptimized:a,preload:c||m,placeholder:z,fill:x}}}},82575,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return n}});let r=e.r(93649),i="u"<typeof window,s=i?()=>{}:r.useLayoutEffect,l=i?()=>{}:r.useEffect;function n(e){let{headManager:t,reduceComponentsToState:a}=e;function n(){if(t&&t.mountedInstances){let e=r.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(a(e))}}return i&&(t?.mountedInstances?.add(e.children),n()),s(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),s(()=>(t&&(t._pendingUpdate=n),()=>{t&&(t._pendingUpdate=n)})),l(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},88571,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={default:function(){return g},defaultHead:function(){return c}};for(var i in r)Object.defineProperty(a,i,{enumerable:!0,get:r[i]});let s=e.r(80244),l=e.r(13179),n=e.r(89312),o=l._(e.r(93649)),d=s._(e.r(82575)),m=e.r(49113);function c(){return[(0,n.jsx)("meta",{charSet:"utf-8"},"charset"),(0,n.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function u(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}e.r(49980);let f=["name","httpEquiv","charSet","itemProp"];function p(e){let t,a,r,i;return e.reduce(u,[]).reverse().concat(c().reverse()).filter((t=new Set,a=new Set,r=new Set,i={},e=>{let s=!0,l=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){l=!0;let a=e.key.slice(e.key.indexOf("$")+1);t.has(a)?s=!1:t.add(a)}switch(e.type){case"title":case"base":a.has(e.type)?s=!1:a.add(e.type);break;case"meta":for(let t=0,a=f.length;t<a;t++){let a=f[t];if(e.props.hasOwnProperty(a))if("charSet"===a)r.has(a)?s=!1:r.add(a);else{let t=e.props[a],r=i[a]||new Set;("name"!==a||!l)&&r.has(t)?s=!1:(r.add(t),i[a]=r)}}}return s})).reverse().map((e,t)=>{let a=e.key||t;return o.default.cloneElement(e,{key:a})})}let g=function({children:e}){let t=(0,o.useContext)(m.HeadManagerContext);return(0,n.jsx)(d.default,{reduceComponentsToState:p,headManager:t,children:e})};("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},68521,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"ImageConfigContext",{enumerable:!0,get:function(){return s}});let r=e.r(80244)._(e.r(93649)),i=e.r(33866),s=r.default.createContext(i.imageConfigDefault)},77953,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"RouterContext",{enumerable:!0,get:function(){return r}});let r=e.r(80244)._(e.r(93649)).default.createContext(null)},19333,(e,t,a)=>{"use strict";function r(e,t){let a=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-a)<Math.abs(e-a)?t:e,t.qualities[0]):a}Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"findClosestQuality",{enumerable:!0,get:function(){return r}})},70751,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return l}});let r=e.r(19333),i=e.r(91476);function s({config:e,src:t,width:a,quality:l}){let n=(0,i.getDeploymentId)();if(t.startsWith("/")&&!t.startsWith("//")){let e=t.indexOf("?");if(-1!==e){let a=new URLSearchParams(t.slice(e+1)),r=a.get("dpl");if(r){n=r,a.delete("dpl");let i=a.toString();t=t.slice(0,e)+(i?"?"+i:"")}}}if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let o=(0,r.findClosestQuality)(l,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${a}&q=${o}${t.startsWith("/")&&n?`&dpl=${n}`:""}`}s.__next_img_default=!0;let l=s},75589,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"useMergedRef",{enumerable:!0,get:function(){return i}});let r=e.r(93649);function i(e,t){let a=(0,r.useRef)(null),i=(0,r.useRef)(null);return(0,r.useCallback)(r=>{if(null===r){let e=a.current;e&&(a.current=null,e());let t=i.current;t&&(i.current=null,t())}else e&&(a.current=s(e,r)),t&&(i.current=s(t,r))},[e,t])}function s(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let a=e(t);return"function"==typeof a?a:()=>e(null)}}("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},69870,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"Image",{enumerable:!0,get:function(){return v}});let r=e.r(80244),i=e.r(13179),s=e.r(89312),l=i._(e.r(93649)),n=r._(e.r(20382)),o=r._(e.r(88571)),d=e.r(41912),m=e.r(33866),c=e.r(68521);e.r(49980);let u=e.r(77953),f=r._(e.r(70751)),p=e.r(75589),g={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function h(e,t,a,r,i,s,l){let n=e?.src;e&&e["data-loaded-src"]!==n&&(e["data-loaded-src"]=n,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&i(!0),a?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let r=!1,i=!1;a.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>r,isPropagationStopped:()=>i,persist:()=>{},preventDefault:()=>{r=!0,t.preventDefault()},stopPropagation:()=>{i=!0,t.stopPropagation()}})}r?.current&&r.current(e)}}))}function x(e){return l.use?{fetchPriority:e}:{fetchpriority:e}}"u"<typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let b=(0,l.forwardRef)(({src:e,srcSet:t,sizes:a,height:r,width:i,decoding:n,className:o,style:d,fetchPriority:m,placeholder:c,loading:u,unoptimized:f,fill:g,onLoadRef:b,onLoadingCompleteRef:y,setBlurComplete:v,setShowAltText:k,sizesInput:z,onLoad:w,onError:j,...N},E)=>{let S=(0,l.useCallback)(e=>{e&&(j&&(e.src=e.src),e.complete&&h(e,c,b,y,v,f,z))},[e,c,b,y,v,j,f,z]),_=(0,p.useMergedRef)(E,S);return(0,s.jsx)("img",{...N,...x(m),loading:u,width:i,height:r,decoding:n,"data-nimg":g?"fill":"1",className:o,style:d,sizes:a,srcSet:t,src:e,ref:_,onLoad:e=>{h(e.currentTarget,c,b,y,v,f,z)},onError:e=>{k(!0),"empty"!==c&&v(!0),j&&j(e)}})});function y({isAppRouter:e,imgAttributes:t}){let a={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...x(t.fetchPriority)};return e&&n.default.preload?(n.default.preload(t.src,a),null):(0,s.jsx)(o.default,{children:(0,s.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...a},"__nimg-"+t.src+t.srcSet+t.sizes)})}let v=(0,l.forwardRef)((e,t)=>{let a=(0,l.useContext)(u.RouterContext),r=(0,l.useContext)(c.ImageConfigContext),i=(0,l.useMemo)(()=>{let e=g||r||m.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),a=e.deviceSizes.sort((e,t)=>e-t),i=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:a,qualities:i,localPatterns:"u"<typeof window?r?.localPatterns:e.localPatterns}},[r]),{onLoad:n,onLoadingComplete:o}=e,p=(0,l.useRef)(n);(0,l.useEffect)(()=>{p.current=n},[n]);let h=(0,l.useRef)(o);(0,l.useEffect)(()=>{h.current=o},[o]);let[x,v]=(0,l.useState)(!1),[k,z]=(0,l.useState)(!1),{props:w,meta:j}=(0,d.getImgProps)(e,{defaultLoader:f.default,imgConf:i,blurComplete:x,showAltText:k});return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(b,{...w,unoptimized:j.unoptimized,placeholder:j.placeholder,fill:j.fill,onLoadRef:p,onLoadingCompleteRef:h,setBlurComplete:v,setShowAltText:z,sizesInput:e.sizes,ref:t}),j.preload?(0,s.jsx)(y,{isAppRouter:!a,imgAttributes:w}):null]})});("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},36175,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={default:function(){return m},getImageProps:function(){return d}};for(var i in r)Object.defineProperty(a,i,{enumerable:!0,get:r[i]});let s=e.r(80244),l=e.r(41912),n=e.r(69870),o=s._(e.r(70751));function d(e){let{props:t}=(0,l.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image/",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,a]of Object.entries(t))void 0===a&&delete t[e];return{props:t}}let m=n.Image},51409,(e,t,a)=>{t.exports=e.r(36175)},504,55620,e=>{"use strict";var t=e.i(89312),a=e.i(51409),r=e.i(93649);let i={title:`Zeneszerz\xe9s \xe9s Alkalmazott Zeneszerz\xe9s
BA diplomakoncert`,date:"2026. május 3.",time:"18:00",venue:`
Zeneakad\xe9mia, Solti terem
`,venueEn:"Liszt Academy Budapest",note:"A koncert előtt, 16.00 órától a diplomázók vizsgafilmjei az I. előadó teremben tekinthetők meg."},s=[{id:1,composer:"Botos Gergely",title:"Kvintett",performers:["Papp Máté (klarinét)","Mészáros Jázon Márk (klarinét)","Csongár Márton (basszetkürt)","Lakatos Béla (basszusklarinét)","Botos Gergely (kontrabasszus-klarinét)"],description:"Ebben a darabomban igyekeztem a klarinét hangszercsalád sokszínűségét bemutatni a legelterjedtebb szoprántól kezdve egészen a ritkán használt kontrabasszus-klarinétig."},{id:2,composer:"Sepsi Botond",title:"Egyenes labirintus",performers:["Híves Boglárka (szoprán)","Sárréti Márton (hegedű)","Pinkert Edina (hegedű)","Sándor József (brácsa)","Donáczi Cseperke (cselló)"],description:"Ha bármit. A legapróbb építő elemeire bontva. Mindenhol ugyan azokhoz az építőelemekhez érkezel. Akkor mi értelme van a bármiknek? Kiút keresés egy végtelen labirintusból, mely egyszerre zuhanó és emelkedő, táguló és összezsugorodó, de legfőképp szüntelenül önmagát ismétlő.",poem:`Milyen lesz az a visszar\xf6p\xfcl\xe9s,
amiről csak hasonlatok besz\xe9lnek,
olyanf\xe9l\xe9k, hogy olt\xe1r, szent\xe9ly,
k\xe9zfog\xe1s, visszat\xe9r\xe9s, \xf6lel\xe9s,
fűben, f\xe1k alatt megter\xedtett asztal,
hol nincs első \xe9s nincs utols\xf3 vend\xe9g,
v\xe9g\xfcl is milyen lesz, milyen lesz
e nyitott sz\xe1rny\xfa emelkedő zuhan\xe1s,
visszahull\xe1s a f\xf3kusz l\xe1ngol\xf3
k\xf6z\xf6s f\xe9szk\xe9be? - nem tudom,
\xe9s m\xe9gis, hogyha valamit tudok,
h\xe1t ezt tudom, e forr\xf3 folyos\xf3t,
e ny\xedlegyenes labirintust, melyben
mind t\xf6m\xf6ttebb \xe9s mind t\xf6m\xf6ttebb
\xe9s egyre szabadabb a t\xe9ny, hogy r\xf6p\xfcl\xfcnk.`,poemYear:"1965",poemAuthor:"Pilinszky János"},{id:3,composer:"Törőcsik Kristóf",title:"A lágy fényhez fohászkodom",performers:["Végh Janka (szoprán)","Vajda Denejra (hárfa)","Friderikusz Péter (cselló)"],description:"Anna Ahmatova XX. századi orosz költő versének megzenésítése Konczek József fordításában. A szopránra, hárfára és csellóra íródott darab egyfajta kontemplatív érzelmi kettősséget próbál megeleveníteni.",poem:`A l\xe1gy f\xe9nyhez foh\xe1szkodom…
(„Moljusz okonnomu lucsu…")

A l\xe1gy f\xe9nyhez foh\xe1szkodom,
Szit\xe1l az ablakon.
S eg\xe9sz nap nincs mit mondanom,
A sz\xedv - dereng-borong.
Kis f\xe9mlav\xf3rom perem\xe9n,
Hol z\xf6ldre v\xe1lt a r\xe9z,
\xdagy j\xe1tszadoz a k\xf6nnyű f\xe9ny,
Vid\xe1man elbec\xe9z.
Ily egyszerű \xe9s bűntelen
A csendes alkonyon
E prof\xe1n szent\xe9ly szűntelen,
S mik\xe9nt aranynak \xfcnnepe,
Oly hű vigasztal\xf3m.`,poemYear:"1909",poemAuthor:"Anna Ahmatova",poemTranslator:"Fordította: Konczek József"},{id:4,composer:"Nagy Emma",title:"Metallic Flowers",performers:["Krulik Eszter (hegedű)","Szűcs Boglárka (hegedű)","Lachegyi Róza (brácsa)","Bali Gabriella (cselló)","Szatzker Zsanett (harmonika)"],description:"A fémesség áttetsző ragyogás, ami egy lassan lélegző formát képez, mindezt hajlékonyan, lassan alakot váltva"},{id:5,composer:"Sebestyén-Lázár Regina",title:"something, someday, somewhere...",performers:["Réz körút:","Nagy Sándor (trombita)","Szilágyi Dusán (trombita)","Huszti Boldizsár (trombita)","Faragó István (kürt)","Gulyás Buda (harsona)","Dénes András (harsona)","Vida Mátyás (tuba)"],description:"A darabot Váci Mihály, *Valami nincs sehol* című verse inspirálta. Számomra ez a vers a beteljesülés hiányának állandó feszültségéről és a kitörés ismételődő, de mégis sikertelen kísérleteiről szól.\nA zenei anyagban ezt a hiányérzetet és keresést próbáltam megragadni: olyan folyamatokkal, amelyek elindulnak a feloldás felé, de nem jutnak el odáig.\nA szavak mélysége miatt nem vállalkozom teljes értelmezésre, ezért ajánlom a vers egészének elolvasását.",poem:`S\xfcv\xedtnek napjaink, a forr\xf3 sort\xfczek,
      – valamit mindennap elmulasztunk.
Robotolunk l\xe9lekszakadva, j\xf3ttevőn,
      – s valamit minden tettben elmulasztunk.
\xc1ldoz\xf3dunk a szerelemben egy \xe9leten \xe1t,
      – s valamit minden cs\xf3kban elmulasztunk.

Mert valami hi\xe1nyzik minden \xf6lel\xe9sből,
      – minden cs\xf3kb\xf3l hi\xe1nyzik valami.
Hi\xe1ba alkotjuk meg s v\xedv\xfcnk \xe9rte naponta,
      – minden szerelemből hi\xe1nyzik valami.
Hi\xe1ba vereksz\xfcnk \xe9rte hal\xe1lig: – ha mi\xe9nk is,
      – a boldogs\xe1gb\xf3l hi\xe1nyzik valami.

J\xf3llakhatsz fuldokl\xe1sig a gy\xf6ny\xf6r\xf6kkel,
      – az \xe9letedből hi\xe1nyzik valami.
Hi\xe1ba v\xe1gysz az emberi teljess\xe9gre,
      – mert az emberből hi\xe1nyzik valami.
Hi\xe1ba rem\xe9nykedsz a megv\xe1lt\xf3 Eg\xe9szben,
      – mert az Eg\xe9szből hi\xe1nyzik valami.

A Mindens\xe9gből hi\xe1nyzik egy csillag,
      – a Mindens\xe9gből hi\xe1nyzik valami.
A Vil\xe1gb\xf3l hi\xe1nyzik a mi vil\xe1gunk,
      – a Vil\xe1gb\xf3l hi\xe1nyzik valami.

Az \xe9gboltr\xf3l hi\xe1nyzik egy sug\xe1r,
      – felől\xfcnk hi\xe1nyzik valami.
A F\xf6ldből hi\xe1nyzik egy talpalatnyi f\xf6ld,
      – talpunk al\xf3l hi\xe1nyzik valami.

Pedig \xedgy sz\xf3lt az \xedg\xe9ret a m\xfaltb\xf3l:
      – „Valahol! Valamikor! Valami!”
Hitett\xe9k a b\xf6lcsek, hitt\xe9k a h\xedvők,
      – mi\xf3ta \xe9l\xfcnk, e hitet\xe9st hallani.
De m\xe1r re\xe1nk t\xf6rt a tud\xe1s: – Valami nincs sehol!
      – s a mi dolgunk ezt bevallani,
s keresni azt, amit m\xe1r nem szabad
      senkinek elmulasztani.

\xdajra kell kezdeni mindent,
      – minden sz\xf3t \xfajra kimondani.
\xdajra kezdeni minden \xf6lel\xe9st,
      – minden szerelmet \xfajra kibontani.
\xdajra kezdeni minden művet \xe9s minden \xe9letet,
      – kez\xfcnket mindenkinek \xfajra odany\xfajtani.

\xdajra kezdeni mindent e vil\xe1gon,
      – megteremteni, ami nincs sehol,
de itt van mindny\xe1junkban m\xe9gis,
      belől\xfcnk s\xfcrgetve dalol,
\xfajra hiteti, hogy elj\xf6n
      valami, valamikor, valahol…`,poemYear:"1994",poemAuthor:"Váci Mihály"},{id:6,composer:"Varga Nadin",title:"Glimmer",performers:["Kalafszky Adriána (szoprán)","Szabó Dénes (cselló)"],description:"A versben szereplő szavak egymás után olvasva nem alkotnak összefüggő jelentést, ugyanakkor hangzásuk és önálló jelentésük különféle benyomásokat keltenek. A lágyabb, zeneibb hangzású szavak inkább a kellemes érzetet erősítik, míg a keményebb hangzásúak feszültséget teremtenek - bár mindez természetesen teljesen szubjektív. Számomra a szöveg egy estétől hajnalig tartó folyamat képzetét idézte fel, amelyet a darabban is igyekeztem megjeleníteni.",poem:`mist thin sheer dim bleak
mist thin still drift green sheen
deep sleep dream breeze silent silver
evening melody horizon slowly
over drowsy low lone soft small
fall slow low lone
soft small fall
s
o
m
n
a
m
b
u
l
i
s
m
calm balm palm warm old soul
gloom bloom gloam loom loam room moon
moor mourn storm droop croon swoon drawl
hollow sorrow follow borrow morrow shadow
lonesome soothing moody autumn snowfall dawn dusk
moon room loom gloom bloom gloam loam calm balm palm warm
fog pond swarm spawn torn drawn drowse drone groan lull slow roam coast yore
dream deep sleep dream drift drift green sheen
mist thin sheer still drift sleep dream
green sheen mist thin sheer
mist thin
mist`,poemHu:`Lorem ipsum dolor sit amet
consectetur adipiscing elit sed
do eiusmod tempor incididunt ut
labore et dolore magna aliqua
ut enim ad minim veniam quis
nostrud exercitatio ullamco
laboris nisi ut
a
l
i
q
u
ip
e
x
ea
commodo
consequat duis aute irure dolor
in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla
pariatur excepteur sint occaecat cupidatat
non proident sunt in culpa qui officia
deserunt mollit anim id est laborum sed ut
perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
laudantium totam rem aperiam eaque ipsa quae
ab illo inventore veritatis et quasi
architecto beatae vitae
dicta sunt
explicabo`,poemYear:"2026",poemAuthor:"Zsigmond Soma"},{id:-1,composer:"",title:"SZÜNET",performers:[],description:""},{id:7,composer:"Botos Gergely",title:"Hajnaltól éjfélig",performers:["Kerti Júlia (mezzoszoprán)","Németh Flóra (fagott/kontrafagott)","Botos Gergely (zongora)"],description:"A mű Radnóti Miklós azonos című költeményéből dolgoz fel néhány rövid szemelvényt. A fagott-kontrafagott váltakozása szembeállítja az ártatlan tájverset az akkori kor szociális életével."},{id:8,composer:"Nagy Emma",title:"Limbs Move Better / Satellite",performers:["Harcsa Veronika (ének)","Horváth Áron (cimbalom)","Gyányi Marcell (nagybőgő)","Kapolcsi-Szabó Levente (zongora)"],description:"",poem:`LIMBSMOVE BETTER
Wind blows
Wailing
On the hill's fans
Step it
Over
You have done nothing wrong
Slide
Tamer soft as pillow
Left foot to the right
Nerve has moved on yesterday
Now you've got the time
Mellow
from harsh
Take a step
Forward
Limbs move
Better
Since together
Wind blow
Wailing
on the hills fans
Step it
Over
You have done nothing wrong
Slide
Tamer soft as pillow
Left foot to the right
Nerve has moved on yesterday
Now you've got the time

SATELLITE
Who can I enlight my vision
Or turn up the dimmer
How can it happen
Let me try to change view to 'nother version
High is the mountain
High is the firewall
Let me try to change view to 'nother version
Imagine
I hope
All these houses folding out
What remains is the lawn
No satellite brings me home
Naming a street was never
more difficult
Is this my hometown
Is this your hometown
Naming a street was never
more difficult
Is this my hometown
Is this your hometown
Is this your hometown`,poemHu:`V\xc9GTAGOK JOBBAN MOZOGNAK
Lorem ipsum dolor
Sit amet
Consectetur adipiscing
Elit sed
Do eiusmod
Tempor incididunt ut labore
Et dolore
Magna aliqua ut enim
Ad minim veniam quis
Nostrud exercitation ullamco
Laboris nisi ut aliquip
Ex ea
commodo consequat
Duis aute
Irure
Dolor in
Reprehenderit
In voluptate velit
Esse cillum
Dolore
eu fugiat nulla
Pariatur
Excepteur
Sint occaecat cupidatat
Non proident
Sunt in culpa qui officia
Deserunt mollit anim id
Est laborum sed ut

MŰHOLD
Sed ut perspiciatis unde omnis
Iste natus error sit
Voluptatem accusantium
Doloremque laudantium totam rem aperiam
Eaque ipsa quae ab
Illo inventore veritatis
Et quasi architecto beatae vitae
Dicta sunt
Explicabo
Nemo enim ipsam voluptatem
Qu ia voluptas sit aspernatur
Aut odit aut fugit
Sed quia consequuntur
magni dolores
Eos qui ratione
Voluptatem sequi nesciunt
Neque porro quisquam
Est qui dolorem ipsum
Qu ia dolor sit amet`,poemYear:"2026",poemAuthor:"Nagy Gergő"},{id:9,composer:"Varga Nadin",title:"Blue Jungle",performers:["Tóth Domonkos (klarinét)","Botos Gergely (basszusklarinét)","Pintér Anna (fuvola)","Holozsai Eszter (fuvola)","Sebestyén-Lázár Kata (fuvola)","Szilágyi Péter (marimba)","Vezényel: Kemény Péter"],description:"Ez a darab az esőerdők gazdag és sokszínű hangzásvilágának emlékére született. A különféle hangszeres effektusok ennek a különleges természeti környezetnek az atmoszféráját idézik meg: a csepegő eső hangját, a szél susogását, valamint a különböző madárfajok énekét. Mivel az esőerdők napjainkban egyre nagyobb veszélynek vannak kitéve, a mű egyfajta tisztelgés is e még létező, különleges erdei hangzásvilág előtt."},{id:10,composer:"Sepsi Botond",title:"Floating",performers:["Várallyay Fülöp (zongora)"],description:"A lebegés szóra – nagyon találóan – az angoloknak két szavuk van. Míg a „levitation” egy mágikus dolog, a „floating” az, amikor a könnyebb fajsúlyú dolog úszik, lebeg a nehezebben. A fókusz számomra az egészből a „könnyebb”-en van. Ez nem mágikus, hanem valóságos, természetes."},{id:11,composer:"Törőcsik Kristóf",title:"Nitzakhon",performers:["Krulik Eszter (hegedű)","Szűcs Boglárka (hegedű)","Lachegyi Róza (brácsa)","Koppán Kata (brácsa)","Bali Gabriella (cselló)"],description:"Egy lassan kibomló vonósdarab, amely finom texturális változásokon és fokozatos dinamikai építkezésen keresztül jut el egy intenzív tetőpontig, majd visszahullik a kezdeti lebegő csendbe."},{id:12,composer:"Botos Gergely",title:"Mémoire",performers:["Erdő Zoltán (tárogató)","Botos Gergely (zongora)"],description:"Ezzel a darabommal igyekeztem megidézni a századforduló francia zenei világát, ami a tárogató különleges hangszínével ötvözve egy kellemes hangulatot hoz magával. A koncerten ez a darab egy eredeti Stowasser tárogatón szólal meg."},{id:13,composer:"Sebestyén-Lázár Regina",title:"Detachment",performers:["Csörgeő Luca (ének)","Szikora Adél (ének)","Vámos Emma (ének)","Farkas Botond (zongora)","Szalovszky Viktória (preparáció)"],description:"",poem:`Elegy
through scattered lights
can be seen the One
thrown by time
on shores
of the sea
go blind
where it founds
the meeting what's complete
In parting

Moments
You called to Yourself
two apple
a cold sandwich
and vocal cord bouquet
if You tied my voice
as first sunburn after the winter
on shores like icebergs
my face is scattered by shards on my sole
You know maybe I never loved You
while wondering
I feed Myself with Your kisses
which We thought were true
so much that separation seemed as dusting

Detachment
prisoned by Myself I'm counting the days
like a dog without it's owner
a captive moment
faraway notes
it speaks for itself
if You do not come
and Your face becomes memory
on strangers faces
forgotten by the wind
like a spider web flowing in the breeze`,poemHu:`El\xe9gia
Lorem ipsum dolor
sit amet consectetur
adipiscing elit sed
do eiusmod
tempor incididunt
ut labore
et dolore magna
aliqua ut enim ad
Minim veniam

Pillanatok
Quis nostrud exercitation
ullamco laboris
nisi ut aliquip
ex ea commodo
consequat duis aute
irure dolor in reprehenderit
in voluptate velit esse
cillum dolore eu fugiat
nulla pariatur excepteur sint
occaecat cupidatat non
proident sunt
in culpa qui officia
deserunt mollit anim
id est laborum sed ut perspiciatis

Lev\xe1laszt\xe1s
unde omnis iste natus error
sit voluptatem accusantium
Doloremque laudantium totam
rem aperiam eaque
ipsa quae ab illo
inventore veritatis et
quasi architecto beatae
vitae dicta sunt
explicabo nemo enim
ipsam voluptatem`,poemYear:"2025",poemAuthor:"Zselyke Szentgyörgyi"}];function l({className:e=""}){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"fixed inset-0 z-0",children:(0,t.jsx)(a.default,{src:"/background-image.png",alt:"",fill:!0,priority:!0,quality:90,sizes:"100vw",className:`object-cover opacity-100 ${e}`,style:{transform:"translateZ(0)"}})}),(0,t.jsx)("div",{className:"fixed inset-0 bg-black/50 z-0 pointer-events-none"})]})}function n({piece:e,isAdjacent:i}){let s={"Sepsi Botond":"/sepsi-botond.jpg","Sebestyén-Lázár Regina":"/regina.jpg","Nagy Emma":"/nagy-emma.jpg","Varga Nadin":"/varga-nadin.jpg","Botos Gergely":"/botos-gergely.jpg","Törőcsik Kristóf":"/torocsik-kristof.jpg"},l=e.composer in s,o=s[e.composer],[d,m]=(0,r.useState)(!l),[c,u]=(0,r.useState)("EN"),f=(0,r.useRef)(null),p=(0,r.useCallback)(()=>{m(!0)},[]);return((0,r.useEffect)(()=>{if(!d)return;let e=setTimeout(()=>{let e=f.current?.querySelectorAll("[data-reveal]");e&&e.forEach(e=>{e.classList.add("is-visible")})},50);return()=>clearTimeout(e)},[d]),-1===e.id)?(0,t.jsx)("div",{className:"w-screen h-full flex-shrink-0 snap-center snap-always relative flex items-center justify-center",children:(0,t.jsxs)("div",{className:"flex items-center gap-6 px-16 md:px-24 w-full max-w-[calc(100%-52px)] md:max-w-[calc(100%-84px)]","data-reveal":"fade-only",style:{"--reveal-delay":"200ms"},children:[(0,t.jsx)("span",{className:"flex-1 h-px bg-white/30"}),(0,t.jsx)("span",{className:"text-sm md:text-base uppercase tracking-[0.4em] text-white flex-shrink-0",children:e.title}),(0,t.jsx)("span",{className:"flex-1 h-px bg-white/30"})]})}):(0,t.jsx)("div",{ref:f,className:"w-screen min-h-full flex-shrink-0 snap-center snap-always relative overflow-y-auto",children:(0,t.jsxs)("div",{className:"flex flex-col items-center px-16 sm:px-20 md:px-28 lg:px-36 gap-5 py-8",children:[(0,t.jsx)("div",{className:"h-16 flex-shrink-0"}),(0,t.jsx)("div",{className:"relative w-32 h-32 md:w-40 md:h-36 flex-shrink-0 border border-gray-800 bg-gray-950 overflow-hidden rounded-lg grayscale","data-reveal":!0,style:{"--reveal-delay":"120ms"},children:l?(0,t.jsx)(a.default,{src:o,alt:e.composer,fill:!0,className:"object-cover",style:{objectPosition:"center 15%"},sizes:"160px",loading:i?"eager":"lazy",priority:i,onLoad:p}):(0,t.jsx)("svg",{className:"absolute inset-0 w-full h-full p-6 md:p-8 text-white/20",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:.5,d:"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"})})}),(0,t.jsxs)("div",{className:"flex flex-col items-center gap-4","data-reveal":!0,style:{"--reveal-delay":"240ms"},children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-[0.15em] text-white text-center max-w-md leading-relaxed",children:e.composer}),(0,t.jsx)("h2",{className:"text-lg md:text-xl font-light leading-tight text-center max-w-md",children:e.title})]}),e.description&&(0,t.jsx)("p",{className:"text-sm text-white/80 text-center max-w-xs leading-relaxed","data-reveal":!0,style:{"--reveal-delay":"360ms"},dangerouslySetInnerHTML:{__html:e.description.replace(/\*([^*]+)\*/g,"<em>$1</em>").replace(/_([^_]+)_/g,"<em>$1</em>")}}),e.poem&&(0,t.jsxs)("div",{className:"flex flex-col items-center gap-4",children:[e.poemHu&&(0,t.jsxs)("div",{className:"flex gap-2 mb-2",children:[(0,t.jsx)("button",{onClick:()=>u("HU"),className:`text-xs uppercase tracking-widest px-3 py-1 rounded-full transition-all duration-300 border ${"HU"===c?"bg-white text-black border-white":"bg-transparent text-white/60 border-white/30 hover:text-white"}`,children:"HU"}),(0,t.jsx)("button",{onClick:()=>u("EN"),className:`text-xs uppercase tracking-widest px-3 py-1 rounded-full transition-all duration-300 border ${"EN"===c?"bg-white text-black border-white":"bg-transparent text-white/60 border-white/30 hover:text-white"}`,children:"EN"})]}),(0,t.jsx)("pre",{className:"text-xs italic text-white/70 text-center max-w-xs leading-relaxed whitespace-pre-wrap font-sora","data-reveal":!0,style:{"--reveal-delay":"480ms"},children:("HU"===c&&e.poemHu?e.poemHu:e.poem)?.split("\n").map((e,a,r)=>{let i=["Elegy","Moments","Detachment","Elégia","Pillanatok","Leválasztás","VÉGTAGOK JOBBAN MOZOGNAK","MŰHOLD","LIMBSMOVE BETTER","SATELLITE"].includes(e.trim());return(0,t.jsxs)("span",{className:i?"font-bold italic":"",children:[e,a<r.length-1?"\n":""]},a)})})]}),e.poem&&e.poemAuthor&&(0,t.jsxs)("div",{className:"text-center","data-reveal":!0,style:{"--reveal-delay":"560ms"},children:[e.poemYear&&(0,t.jsx)("p",{className:"text-xs text-white/60",children:e.poemYear}),(0,t.jsxs)("p",{className:"text-xs text-white/60",children:["-",e.poemAuthor,"-"]}),e.poemTranslator&&(0,t.jsx)("p",{className:"text-xs text-white/50 mt-1",children:e.poemTranslator})]}),e.performers.length>0&&(0,t.jsxs)("div",{className:"flex flex-col items-center gap-2","data-reveal":!0,style:{"--reveal-delay":"640ms"},children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-[0.15em] text-white/60",children:"Előadják:"}),(0,t.jsx)("div",{className:"h-2 flex-shrink-0"}),e.performers.map((e,a)=>(0,t.jsx)("p",{className:"text-sm text-white",children:e},a))]}),(0,t.jsx)("div",{className:"h-16 flex-shrink-0"})]})})}e.s(["default",0,function({startIndex:e=0,onBackToIndex:a}){let[i,o]=(0,r.useState)(e),[d,m]=(0,r.useState)(s.slice(0,e+1).filter(e=>e.id>0).length),c=(0,r.useRef)(null),u=(0,r.useRef)(!1);(0,r.useEffect)(()=>{-1!==s[i].id&&m(s.slice(0,i+1).filter(e=>e.id>0).length)},[i,s]),(0,r.useEffect)(()=>{let e=setTimeout(()=>{let e=Array.from(document.querySelectorAll("[data-reveal]"));e.length&&e.forEach(e=>{e.classList.add("is-visible")})},50);return()=>clearTimeout(e)},[i]),(0,r.useEffect)(()=>{let e=c.current;if(!e)return;let t=()=>{if(u.current)return;let t=Math.round(e.scrollLeft/e.clientWidth);o(e=>t!==e&&t>=0&&t<s.length?t:e)};return e.addEventListener("scroll",t),()=>e.removeEventListener("scroll",t)},[s.length]),(0,r.useEffect)(()=>{c.current&&e>0&&c.current.scrollTo({left:e*c.current.clientWidth,behavior:"auto"})},[e]);let f=e=>{c.current&&e>=0&&e<s.length&&(u.current=!0,c.current.scrollTo({left:e*c.current.clientWidth,behavior:"smooth"}),o(e),setTimeout(()=>{u.current=!1},500))},p=i>0,g=i<s.length-1;return(0,t.jsxs)("div",{className:"h-[100dvh] overflow-hidden relative flex flex-col",children:[(0,t.jsx)("link",{rel:"prefetch",href:"/sepsi-botond.jpg"}),(0,t.jsx)("link",{rel:"prefetch",href:"/regina.jpg"}),(0,t.jsx)("link",{rel:"prefetch",href:"/nagy-emma.jpg"}),(0,t.jsx)("link",{rel:"prefetch",href:"/varga-nadin.jpg"}),(0,t.jsx)("link",{rel:"prefetch",href:"/botos-gergely.jpg"}),(0,t.jsx)("link",{rel:"prefetch",href:"/torocsik-kristof.jpg"}),(0,t.jsx)(l,{}),(0,t.jsx)("header",{className:"fixed top-0 left-0 right-0 z-30 flex items-center px-6 py-8 min-h-[4rem] bg-black/30 backdrop-blur-md border-b border-white/10",children:(0,t.jsxs)("button",{onClick:a,className:"flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer pl-4","aria-label":"Vissza a műsorhoz",children:[(0,t.jsx)("span",{className:"text-xs",children:"  "}),(0,t.jsx)("svg",{className:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M15 19l-7-7 7-7"})}),(0,t.jsx)("span",{className:"text-xs uppercase tracking-[0.25em]",children:"Műsor"})]})}),p&&(0,t.jsx)("div",{className:"fixed left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none",children:(0,t.jsx)("svg",{className:"w-8 h-8 text-white/30",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1,d:"M15 19l-7-7 7-7"})})}),g&&(0,t.jsx)("div",{className:"fixed right-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none",children:(0,t.jsx)("svg",{className:"w-8 h-8 text-white/30",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1,d:"M9 5l7 7-7 7"})})}),p&&(0,t.jsx)("button",{onClick:()=>f(i-1),className:"fixed left-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 z-10 cursor-pointer","aria-label":"Előző"}),g&&(0,t.jsx)("button",{onClick:()=>f(i+1),className:"fixed right-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 z-10 cursor-pointer","aria-label":"Következő"}),(0,t.jsx)("div",{ref:c,className:"flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar flex pt-20",style:{WebkitOverflowScrolling:"touch"},children:s.map((e,a)=>(0,t.jsx)(n,{piece:e,isActive:a===i,pageNumber:a+1,isAdjacent:1>=Math.abs(a-i)},e.id))}),(0,t.jsx)("footer",{className:"fixed bottom-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-md border-t border-white/10",children:(0,t.jsxs)("div",{className:"px-8 py-4 min-h-[3rem] flex items-center justify-center grayscale relative",children:[(0,t.jsx)("span",{className:"absolute left-[10px] text-2xl md:text-3xl font-extralight text-white/40 leading-none select-none transition-opacity duration-300",style:{opacity:+(-1!==s[i].id)},children:String(d).padStart(2,"0")}),(0,t.jsx)("div",{className:"flex items-center gap-2",children:s.map((e,a)=>(0,t.jsx)("button",{onClick:()=>f(a),className:`h-1.5 rounded-full transition-all duration-300 z-10 ${i===a?"bg-white w-6":"w-1.5 bg-white/30 hover:bg-white/50 "}`},a))})]})})]})}],504),e.s(["default",0,function({onSelectPiece:e}){let[a,n]=(0,r.useState)(!1),o=(0,r.useRef)(null),d=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e=Array.from(document.querySelectorAll("[data-reveal]"));if(!e.length)return;let t=new IntersectionObserver(e=>{for(let a of e)a.isIntersecting&&(a.target.classList.add("is-visible"),t.unobserve(a.target))},{threshold:.05,rootMargin:"0px 0px 60% 0px"}),a=window.requestAnimationFrame(()=>{e.forEach(e=>t.observe(e))});return()=>{window.cancelAnimationFrame(a),t.disconnect()}},[]),(0,r.useEffect)(()=>{let e=d.current;if(!e)return;let t=()=>{n(!0),o.current&&clearTimeout(o.current),o.current=setTimeout(()=>{n(!1)},1500)};return e.addEventListener("scroll",t),()=>{e.removeEventListener("scroll",t),o.current&&clearTimeout(o.current)}},[]),(0,t.jsxs)("div",{className:"h-screen flex flex-col relative overflow-hidden",children:[(0,t.jsx)("link",{rel:"preload",as:"image",href:"/sepsi-botond.jpg"}),(0,t.jsx)("link",{rel:"preload",as:"image",href:"/regina.jpg"}),(0,t.jsx)("link",{rel:"preload",as:"image",href:"/nagy-emma.jpg"}),(0,t.jsx)("link",{rel:"preload",as:"image",href:"/varga-nadin.jpg"}),(0,t.jsx)("link",{rel:"preload",as:"image",href:"/botos-gergely.jpg"}),(0,t.jsx)("link",{rel:"preload",as:"image",href:"/torocsik-kristof.jpg"}),(0,t.jsx)(l,{}),(0,t.jsx)("header",{className:"fixed top-0 left-0 right-0 z-30 px-6 py-8 min-h-[4rem] bg-black/30 backdrop-blur-md border-b border-white/10 flex items-center justify-center",children:(0,t.jsx)("div",{className:"w-full max-w-2xl text-center",children:(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)("p",{className:"text-[10px] uppercase tracking-[0.3em] text-gray-200 whitespace-pre-line leading-relaxed drop-shadow-md",children:i.venue}),(0,t.jsx)("h1",{className:"text-sm md:text-base font-light whitespace-pre-line leading-relaxed text-white drop-shadow-md",children:i.title}),(0,t.jsxs)("p",{className:"text-xs text-gray-200 drop-shadow-md",children:[i.date," ",i.time]}),(0,t.jsx)("div",{className:"h-4"})]})})}),(0,t.jsx)("main",{ref:d,className:"flex-1 overflow-y-auto relative z-10 w-full flex flex-col items-center pt-32",children:(0,t.jsxs)("div",{className:"w-full max-w-2xl flex flex-col items-center gap-6 px-8 md:px-16 pb-32",children:[(0,t.jsx)("div",{className:"h-16 md:h-24 flex-shrink-0"}),(0,t.jsx)("div",{className:"h-4"}),s.map((r,i)=>{let s=-1===r.id,l=100+30*i;return s?(0,t.jsxs)("div",{className:"py-6 flex items-center justify-center gap-4 w-full max-w-md","data-reveal":"fade-only",style:{"--reveal-delay":`${l}ms`},children:[(0,t.jsx)("span",{className:"flex-1 h-px bg-white/30"}),(0,t.jsx)("span",{className:"text-xs uppercase tracking-[0.3em] text-gray-300 flex-shrink-0 drop-shadow-md",children:r.title}),(0,t.jsx)("span",{className:"flex-1 h-px bg-white/30"})]},r.id):(0,t.jsx)("button",{onClick:()=>e(i),className:"w-auto text-center cursor-pointer transition-all duration-[1500ms]","data-reveal":!0,style:{"--reveal-delay":`${l}ms`},children:(0,t.jsx)("div",{className:"py-5 px-10",children:(0,t.jsxs)("div",{className:"flex flex-col items-center gap-0.5 grayscale",children:[(0,t.jsx)("p",{className:"text-xs uppercase tracking-[0.15em] text-gray-200 drop-shadow-md",children:r.composer}),(0,t.jsxs)("div",{className:"relative inline-block",children:[(0,t.jsx)("p",{className:"text-base md:text-lg text-white drop-shadow-md whitespace-nowrap relative z-10",children:r.title}),(0,t.jsx)("div",{className:"absolute -inset-x-4 -inset-y-2 rounded-lg pointer-events-none transition-opacity duration-[1500ms]",style:{opacity:+!!a,boxShadow:"0 15px 11px -8px rgba(255,255,255,0.15)"},"aria-hidden":"true"})]})]})})},r.id)}),(0,t.jsx)("div",{className:"h-4 md:h-8"}),(0,t.jsxs)("div",{className:"text-[10px] text-white/5 text-center -mt-2","data-reveal":"fade-only",style:{"--reveal-delay":`${200+30*s.length}ms`},children:["website by"," ",(0,t.jsx)("a",{href:"https://andrasdenes.com",target:"_blank",rel:"noopener noreferrer",className:"hover:text-white/10 transition-colors",children:"András Dénes"})]}),(0,t.jsx)("div",{className:"h-8 md:h-12"})]})})]})}],55620)}]);