(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{KnHi:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return at})),r.d(t,"renderToDOM",(function(){return st}));var a,s=r("dI71"),n=r("q1tI"),o=r.n(n),c=r("i8i4"),i=r("iein"),l=r("OklE"),u=[{formatName:"Standard Image Formats",description:"Non-texture image formats. Compact on disk, but need to be fully decompressed into GPU texture memory, and mipmaps need to be generated by client.",codeSample:"load(url, ImageLoader)",images:[{format:"JPG",src:"shannon.jpg"},{format:"GIF",src:"shannon.gif"},{format:"PNG",src:"shannon.png"},{format:"BMP",src:"shannon.bmp"},{format:"WEBP",src:"shannon.webp"}]},{formatName:"Basis Universal",description:"Supercompressed GPU Texture Codec",link:"https://github.com/BinomialLLC/basis_universal",codeSample:"load(url, BasisLoader)",images:[{format:"BASIS",src:"alpha3.basis"},{format:"BASIS",src:"kodim01.basis"},{format:"BASIS",src:"kodim18.basis"},{format:"BASIS",src:"kodim20_1024x1024.basis"},{format:"BASIS",src:"kodim20.basis"}]},{formatName:"KTX",codeSample:"load(url, CompressedTextureLoader)",images:[{format:"DXT1",src:"shannon-dxt1.ktx2"},{format:"DXT3",src:"shannon-dxt3.ktx2"},{format:"DXT5",src:"shannon-dxt5.ktx2"}]},{formatName:"DDS: S3 Texture Compression (WEBGL_compressed_texture_s3tc",description:"S3 (aka DXTn, DXTC, or BCn).",availability:"Common on desktop GPUs. DXT5 is usually the preferred version",link:"https://en.wikipedia.org/wiki/S3_Texture_Compression",codeSample:"load(url, CompressedTextureLoader)",images:[{format:"DXT5",src:"shannon-dxt5.dds"},{format:"DXT3",src:"shannon-dxt3.dds"},{format:"DXT1",src:"shannon-dxt1.dds"}]},{formatName:"PVR: PowerVR Texture Compression (WEBGL_compressed_texture_pvrtc)",description:"Lossy, fixed-rate GPU texture compression format",availability:"iPhone, iPad and mobile devices with PowerVR chipsets.",link:"https://en.wikipedia.org/wiki/PVRTC",codeSample:"load(url, CompressedTextureLoader)",images:[{format:"PVRTC (2BPP RGB)",src:"shannon-pvrtc-2bpp-rgb.pvr"},{format:"PVRTC (2BPP RGBA)",src:"shannon-pvrtc-2bpp-rgba.pvr"},{format:"PVRTC (4BPP RGB)",src:"shannon-pvrtc-4bpp-rgb.pvr"},{format:"PVRTC (2BPP RGBA)",src:"shannon-pvrtc-4bpp-rgba.pvr"}]},{formatName:"PVR: ATC (WEBGL_compressed_texture_atc)",codeSample:"load(url, CompressedTextureLoader)",images:[{format:"ATC (RGB)",src:"shannon-atc-rgb.dds"},{format:"ATC (RGBA, Explicit)",src:"shannon-atc-rgba-explicit.dds"},{format:"ATC (RGBA, Interpolated)",src:"shannon-atc-rgba-interpolated.dds"}]},{formatName:"PVR: ASTC (WEBGL_compressed_texture_astc)",images:[{format:"ASTC 4x4",src:"shannon-astc-4x4.pvr"},{format:"ASTC 5x4",src:"shannon-astc-5x4.pvr"},{format:"ASTC 5x5",src:"shannon-astc-5x5.pvr"},{format:"ASTC 6x5",src:"shannon-astc-6x5.pvr"},{format:"ASTC 6x6",src:"shannon-astc-6x6.pvr"},{format:"ASTC 8x5",src:"shannon-astc-8x5.pvr"},{format:"ASTC 8x6",src:"shannon-astc-8x6.pvr"},{format:"ASTC 8x8",src:"shannon-astc-8x8.pvr"},{format:"ASTC 10x5",src:"shannon-astc-10x5.pvr"},{format:"ASTC 10x6",src:"shannon-astc-10x6.pvr"},{format:"ASTC 10x8",src:"shannon-astc-10x8.pvr"},{format:"ASTC 10x10",src:"shannon-astc-10x10.pvr"},{format:"ASTC 12x10",src:"shannon-astc-12x10.pvr"},{format:"ASTC 12x12",src:"shannon-astc-12x12.pvr"}]},{formatName:"PVR: ASTC (sRGB) (WEBGL_compressed_texture_astc)",images:[{format:"ASTC (sRGB) 4x4",src:"shannon-astc-srgb-4x4.pvr"},{format:"ASTC (sRGB) 5x4",src:"shannon-astc-srgb-5x4.pvr"},{format:"ASTC (sRGB) 5x5",src:"shannon-astc-srgb-5x5.pvr"},{format:"ASTC (sRGB) 6x5",src:"shannon-astc-srgb-6x5.pvr"},{format:"ASTC (sRGB) 6x6",src:"shannon-astc-srgb-6x6.pvr"},{format:"ASTC (sRGB) 8x5",src:"shannon-astc-srgb-8x5.pvr"},{format:"ASTC (sRGB) 8x6",src:"shannon-astc-srgb-8x6.pvr"},{format:"ASTC (sRGB) 8x8",src:"shannon-astc-srgb-8x8.pvr"},{format:"ASTC (sRGB) 10x5",src:"shannon-astc-srgb-10x5.pvr"},{format:"ASTC (sRGB) 10x6",src:"shannon-astc-srgb-10x6.pvr"},{format:"ASTC (sRGB) 10x8",src:"shannon-astc-srgb-10x8.pvr"},{format:"ASTC (sRGB) 10x10",src:"shannon-astc-srgb-10x10.pvr"},{format:"ASTC (sRGB) 12x10",src:"shannon-astc-srgb-12x10.pvr"},{format:"ASTC (sRGB) 12x12",src:"shannon-astc-srgb-12x12.pvr"}]},{formatName:"PVR: ETC1 (WEBGL_compressed_texture_etc1)",images:[{format:"ETC1",src:"shannon-etc1.pvr"}]},{formatName:"Crunch",description:"Advanced DXTn texture compression library.",link:"https://github.com/BinomialLLC/crunch",codeSample:"load(url, CrunchLoader)",images:[{format:"DXT1 (Crunch)",src:"shannon-dxt1.crn"},{format:"DXT5 (Crunch)",src:"shannon-dxt5.crn"}]}],p=r("KQm4"),m=r("rePB"),d=r("o0o1"),_=r.n(d),E=(r("wcNg"),r("HaE+")),h=r("vOnD"),S=r("15R0"),f=r("aiNV"),T=r("1UZV");function R(e){return b.apply(this,arguments)}function b(){return(b=Object(E.a)(_.a.mark((function e(t){var r;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(r=t.modules||{}).basis){e.next=3;break}return e.abrupt("return",r.basis);case 3:return a=a||x(t),e.next=6,a;case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(e){return C.apply(this,arguments)}function C(){return(C=Object(E.a)(_.a.mark((function e(t){var r,a,s;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=null,a=null,e.t0=Promise,e.next=5,Object(f.a)("basis_transcoder.js","textures",t);case 5:return e.t1=e.sent,e.next=8,Object(f.a)("basis_transcoder.wasm","textures",t);case 8:return e.t2=e.sent,e.t3=[e.t1,e.t2],e.next=12,e.t0.all.call(e.t0,e.t3);case 12:return s=e.sent,r=s[0],a=s[1],r=r||T.a.BASIS,e.next=18,g(r,a);case 18:return e.abrupt("return",e.sent);case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(e,t){var r={};return t&&(r.wasmBinary=t),new Promise((function(t){e(r).then((function(e){var r=e.BasisFile;(0,e.initializeBasis)(),t({BasisFile:r})}))}))}var A={etc1:{basisFormat:0,compressed:!0},etc2:{basisFormat:1,compressed:!0},bc1:{basisFormat:2,compressed:!0,format:S.a.COMPRESSED_RGB_S3TC_DXT1_EXT},bc3:{basisFormat:3,compressed:!0,format:S.a.COMPRESSED_RGBA_S3TC_DXT5_EXT},bc4:{basisFormat:4,compressed:!0},bc5:{basisFormat:5,compressed:!0},"bc7-m6-opaque-only":{basisFormat:6,compressed:!0},"bc7-m5":{basisFormat:7,compressed:!0},"pvrtc1-4-rgb":{basisFormat:8,compressed:!0},"pvrtc1-4-rgba":{basisFormat:9,compressed:!0},"astc-4x4":{basisFormat:10,compressed:!0},"atc-rgb":{basisFormat:11,compressed:!0},"atc-rgba-interpolated-alpha":{basisFormat:12,compressed:!0},rgba32:{basisFormat:13,compressed:!1},rgb565:{basisFormat:14,compressed:!1},bgr565:{basisFormat:15,compressed:!1},rgba4444:{basisFormat:16,compressed:!1}};function v(){return(v=Object(E.a)(_.a.mark((function e(t,r){var a,s,n,o,c,i,l,u,p;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R(r);case 2:if(a=e.sent,s=a.BasisFile,n=new s(new Uint8Array(t)),e.prev=5,n.startTranscoding()){e.next=8;break}return e.abrupt("return",null);case 8:for(o=n.getNumImages(),c=[],i=0;i<o;i++){for(l=n.getNumLevels(i),u=[],p=0;p<l;p++)u.push(P(n,i,p,r));c.push(u)}return e.abrupt("return",c);case 12:return e.prev=12,n.close(),n.delete(),e.finish(12);case 16:case"end":return e.stop()}}),e,null,[[5,,12,16]])})))).apply(this,arguments)}function P(e,t,r,a){var s=e.getImageWidth(t,r),n=e.getImageHeight(t,r),o=e.getHasAlpha(),c=function(e,t){var r=e&&e.basis&&e.basis.format;return"object"==typeof r&&(r=t?r.alpha:r.noAlpha),r=r.toLowerCase(),A[r]}(a,o),i=c.compressed,l=c.format,u=c.basisFormat,p=e.getImageTranscodedSizeInBytes(t,r,u),m=new Uint8Array(p);return e.transcodeImage(m,t,r,u,0,0)?{width:s,height:n,data:m,compressed:i,hasAlpha:o,format:l}:null}function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(Object(r),!0).forEach((function(t){Object(m.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var B="undefined"!=typeof __VERSION__?__VERSION__:"latest",G=O(O({},{id:"basis",name:"Basis",version:B,extensions:["basis"],mimeTypes:["application/octet-stream"],tests:["sB"],binary:!0,options:{basis:{format:"rgb565",libraryPath:"libs/",workerUrl:"https://unpkg.com/@loaders.gl/textures@"+B+"/dist/basis-loader.worker.js"}}}),{},{parse:function(e,t){return v.apply(this,arguments)}}),y=r("+PVp"),w=r("ipMt"),M={id:"crunch",name:"Crunch",version:"3.0.0-alpha.4",extensions:["crn"],mimeTypes:["application/octet-stream"],binary:!0,options:{crunch:{libraryPath:"libs/",workerUrl:"https://unpkg.com/@loaders.gl/textures@3.0.0-alpha.4/dist/crunch-loader.worker.js"}}},L=r("gQyj"),X=r("tXnp"),I=r("xlp0"),k=r("24Wh"),H=r("Ivtj"),j=r("f5Sf");function F(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function N(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?F(Object(r),!0).forEach((function(t){Object(m.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):F(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var U=S.a.COMPRESSED_RGB_S3TC_DXT1_EXT,K=S.a.COMPRESSED_RGBA_S3TC_DXT1_EXT,V=S.a.COMPRESSED_RGBA_S3TC_DXT3_EXT,W=S.a.COMPRESSED_RGBA_S3TC_DXT5_EXT,z=S.a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,J=S.a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,q=S.a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG,Q=S.a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG,Y=S.a.COMPRESSED_RGB_ATC_WEBGL,Z=S.a.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL,$=S.a.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL,ee=S.a.COMPRESSED_RGB_ETC1_WEBGL,te=S.a.COMPRESSED_RGBA_ASTC_4X4_KHR,re=S.a.COMPRESSED_RGBA_ASTC_5X4_KHR,ae=S.a.COMPRESSED_RGBA_ASTC_5X5_KHR,se=S.a.COMPRESSED_RGBA_ASTC_6X5_KHR,ne=S.a.COMPRESSED_RGBA_ASTC_6X6_KHR,oe=S.a.COMPRESSED_RGBA_ASTC_8X5_KHR,ce=S.a.COMPRESSED_RGBA_ASTC_8X6_KHR,ie=S.a.COMPRESSED_RGBA_ASTC_8X8_KHR,le=S.a.COMPRESSED_RGBA_ASTC_10X5_KHR,ue=S.a.COMPRESSED_RGBA_ASTC_10X6_KHR,pe=S.a.COMPRESSED_RGBA_ASTC_10X8_KHR,me=S.a.COMPRESSED_RGBA_ASTC_10X10_KHR,de=S.a.COMPRESSED_RGBA_ASTC_12X10_KHR,_e=S.a.COMPRESSED_RGBA_ASTC_12X12_KHR,Ee=S.a.COMPRESSED_SRGB8_ALPHA8_ASTC_4X4_KHR,he=S.a.COMPRESSED_SRGB8_ALPHA8_ASTC_5X4_KHR,Se=S.a.COMPRESSED_SRGB8_ALPHA8_ASTC_5X5_KHR,fe=S.a.COMPRESSED_SRGB8_ALPHA8_ASTC_6X5_KHR,Te=S.a.COMPRESSED_SRGB8_ALPHA8_ASTC_6X6_KHR,Re=S.a.COMPRESSED_SRGB8_ALPHA8_ASTC_8X5_KHR,be=S.a.COMPRESSED_SRGB8_ALPHA8_ASTC_8X6_KHR,xe=S.a.COMPRESSED_SRGB8_ALPHA8_ASTC_8X8_KHR,Ce=S.a.COMPRESSED_SRGB8_ALPHA8_ASTC_10X5_KHR,ge=S.a.COMPRESSED_SRGB8_ALPHA8_ASTC_10X6_KHR,Ae=S.a.COMPRESSED_SRGB8_ALPHA8_ASTC_10X8_KHR,ve=S.a.COMPRESSED_SRGB8_ALPHA8_ASTC_10X10_KHR,Pe=S.a.COMPRESSED_SRGB8_ALPHA8_ASTC_12X10_KHR,De=S.a.COMPRESSED_SRGB8_ALPHA8_ASTC_12X12_KHR,Oe=S.a.COMPRESSED_R11_EAC,Be=S.a.COMPRESSED_SIGNED,Ge=S.a.COMPRESSED_RG11_EAC,ye=S.a.COMPRESSED_SIGNED_RG11_EAC,we=S.a.COMPRESSED_RGB8_ETC2,Me=S.a.COMPRESSED_RGBA8_ETC2_EAC,Le=S.a.COMPRESSED_SRGB8_ETC2,Xe=S.a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC,Ie=S.a.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2,ke=S.a.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2,He=S.a.COMPRESSED_RED_RGTC1_EXT,je=S.a.COMPRESSED_SIGNED_RED_RGTC1_EXT,Fe=S.a.COMPRESSED_RED_GREEN_RGTC2_EXT,Ne=S.a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT,Ue=S.a.COMPRESSED_SRGB_S3TC_DXT1_EXT,Ke=S.a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT,Ve=S.a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT,We=S.a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT,ze=h.c.button.withConfig({displayName:"compressed-texture__TextureButton",componentId:"sc-1g38zwr-0"})(["height:256px;width:256px;border:1px solid black;margin:1em;position:relative;margin-left:0;"]),Je=h.c.h1.withConfig({displayName:"compressed-texture__ImageFormatHeader",componentId:"sc-1g38zwr-1"})(["position:absolute;top:0;left:0;margin:0;color:white;font-size:16px;"]),qe=h.c.h1.withConfig({displayName:"compressed-texture__ErrorFormatHeader",componentId:"sc-1g38zwr-2"})(["color:red;font-size:16px;"]),Qe=h.c.ul.withConfig({displayName:"compressed-texture__TextureInfo",componentId:"sc-1g38zwr-3"})(["position:absolute;transition:opacity 0.2s;top:20px;display:flex;flex-flow:column nowrap;align-items:flex-start;padding:10px;opacity:0.8;background-color:black;color:white;border-radius:5px;min-width:200px;list-style:none;font-size:14px;"]);Object(X.b)([G,y.a,L.a]);var Ye=function(e){function t(t){var r;return(r=e.call(this,t)||this).state={supportedFormats:Object(w.a)(t.gl),loadOptions:{basis:{workerUrl:"https://unpkg.com/@loaders.gl/textures@3.0.0-alpha.4/dist/basis-loader.worker.js"}},textureError:null,showStats:!1,stats:[]},r}Object(s.a)(t,e);var r=t.prototype;return r.componentDidMount=function(){var e=Object(E.a)(_.a.mark((function e(){var t;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.setupBasisLoadOptionsIfNeeded();case 2:return e.next=4,this.getTextureDataUrl();case 4:t=e.sent,this.setState({dataUrl:t});case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),r.getExtension=function(e){var t=this.props.gl,r=["","WEBKIT_","MOZ_"],a=null;for(var s in r)if(a=Boolean(t.getExtension(r[s]+e)))break;return a},r.setupBasisLoadOptionsIfNeeded=function(){if(this.state.supportedFormats.has("dxt")){var e=N(N({},this.state.loadOptions),{},{basis:N(N({},this.state.loadOptions.basis),{},{format:{alpha:"BC3",noAlpha:"BC1"}})});this.setState({loadOptions:e})}},r.getTextureDataUrl=function(){var e=Object(E.a)(_.a.mark((function e(){var t,r,a,s,n,o,c,i,l,u,p,m,d;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state.loadOptions,r=this.props,a=r.canvas,s=r.gl,n=r.program,o=r.image,e.prev=2,e.next=5,this.getLoadedData(o);case 5:return c=e.sent,i=c.arrayBuffer,l=c.length,u=c.src,e.next=11,Object(I.a)(u,[y.a,M,G,L.a]);case 11:if(p=e.sent,e.t0=p,!e.t0){e.next=17;break}return e.next=16,Object(k.a)(i,p,t);case 16:e.t0=e.sent;case 17:m=e.t0,this.addStat("File Size",Math.floor(l/1024),"Kb"),e.t1=p&&p.name,e.next="Crunch"===e.t1||"CompressedTexture"===e.t1?22:"Images"===e.t1?25:"Basis"===e.t1?28:32;break;case 22:return this.renderEmptyTexture(s,n),this.renderCompressedTexture(s,n,m,p.name,u),e.abrupt("break",33);case 25:return this.renderEmptyTexture(s,n),this.renderImageTexture(s,n,m),e.abrupt("break",33);case 28:return d=m[0],this.renderEmptyTexture(s,n),this.renderCompressedTexture(s,n,d,p.name,u),e.abrupt("break",33);case 32:throw new Error("Unknown texture loader");case 33:e.next=40;break;case 35:e.prev=35,e.t2=e.catch(2),console.error(e.t2),this.renderEmptyTexture(s,n),this.setState({textureError:e.t2.message});case 40:return e.abrupt("return",a.toDataURL());case 41:case"end":return e.stop()}}),e,this,[[2,35]])})));return function(){return e.apply(this,arguments)}}(),r.getLoadedData=function(){var e=Object(E.a)(_.a.mark((function e(t){var r,a,s,n;return _.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=null,a=0,s="",!(t instanceof File)){e.next=11;break}return e.next=6,t.arrayBuffer();case 6:r=e.sent,a=t.size,s=t.name,e.next=19;break;case 11:return s="https://raw.githubusercontent.com/visgl/loaders.gl/master/modules/textures/test/data/"+t.src,e.next=14,Object(H.a)(s);case 14:return n=e.sent,e.next=17,n.arrayBuffer();case 17:r=e.sent,a=r.byteLength;case 19:return e.abrupt("return",{arrayBuffer:r,length:a,src:s});case 20:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r.createCompressedTexture2D=function(e,t){var r;return new j.a(e,{data:t,compressed:!0,mipmaps:!1,parameters:(r={},r[e.TEXTURE_MAG_FILTER]=e.LINEAR,r[e.TEXTURE_MIN_FILTER]=t.length>1?e.LINEAR_MIPMAP_NEAREST:e.LINEAR,r[e.TEXTURE_WRAP_S]=e.CLAMP_TO_EDGE,r[e.TEXTURE_WRAP_T]=e.CLAMP_TO_EDGE,r)}).handle},r.renderEmptyTexture=function(e,t){var r,a=new Uint8Array([68,0,0,255]),s=new j.a(e,{width:1,height:1,data:a,mipmaps:!0,parameters:(r={},r[e.TEXTURE_MAG_FILTER]=e.LINEAR,r[e.TEXTURE_MIN_FILTER]=e.LINEAR,r[e.TEXTURE_WRAP_S]=e.CLAMP_TO_EDGE,r[e.TEXTURE_WRAP_T]=e.CLAMP_TO_EDGE,r)}).handle;e.useProgram(t),e.bindTexture(e.TEXTURE_2D,s),e.drawArrays(e.TRIANGLE_STRIP,0,4)},r.renderImageTexture=function(e,t,r){var a,s=new j.a(e,{data:r,parameters:(a={},a[e.TEXTURE_MAG_FILTER]=e.LINEAR,a[e.TEXTURE_MIN_FILTER]=e.LINEAR,a[e.TEXTURE_WRAP_S]=e.CLAMP_TO_EDGE,a[e.TEXTURE_WRAP_T]=e.CLAMP_TO_EDGE,a)});e.useProgram(t),e.bindTexture(e.TEXTURE_2D,s.handle);var n=new Date;e.drawArrays(e.TRIANGLE_STRIP,0,4);var o=Date.now()-n;this.addStat("Upload time",Math.floor(o)+" ms"),this.addStat("Dimensions",r.width+" x "+r.height),this.addStat("Size in memory (Lvl 0)",Math.floor(r.width*r.height*4/1024),"Kb")},r.renderCompressedTexture=function(e,t,r,a,s){if(!r||!r.length)throw new Error(a+" loader doesn't support texture "+s+" format");var n=r[0],o=n.format,c=n.width,i=n.height,l=n.levelSize;if(!this.isFormatSupported(o))throw new Error("Texture format "+o+" not supported by this GPU");var u=new Date,p=this.createCompressedTexture2D(e,r);e.bindTexture(e.TEXTURE_2D,p),e.useProgram(t),e.drawArrays(e.TRIANGLE_STRIP,0,4);var m=Date.now()-u;this.addStat("Upload time",Math.floor(m)+" ms"),this.addStat("Dimensions",c+" x "+i),l&&this.addStat("Size in memory (Lvl 0)",Math.floor(l/1024),"Kb")},r.isFormatSupported=function(e){if("number"!=typeof e)throw new Error("Invalid internal format of compressed texture");var t=this.state.supportedFormats;switch(e){case U:case V:case W:case K:return t.has("dxt");case z:case J:case q:case Q:return t.has("pvrtc");case Y:case Z:case $:return t.has("atc");case ee:return t.has("etc1");case te:case re:case ae:case se:case ne:case oe:case ce:case ie:case le:case ue:case pe:case me:case de:case _e:case Ee:case he:case Se:case fe:case Te:case Re:case be:case xe:case Ce:case ge:case Ae:case ve:case Pe:case De:return t.has("astc");case Oe:case Be:case Ge:case ye:case we:case Me:case Le:case Xe:case Ie:case ke:return t.has("etc2");case He:case je:case Fe:case Ne:return t.has("rgtc");case Ue:case Ke:case Ve:case We:return t.has("dxt-srgb");default:return!1}},r.addStat=function(e,t,r){void 0===r&&(r="");var a=[].concat(Object(p.a)(this.state.stats),[{name:e,value:t,units:r}]);this.setState({stats:a})},r.renderStats=function(){var e=this.state.stats;if(!e.length)return null;for(var t=[],r=0;r<e.length;r++)t.push(o.a.createElement("li",{key:r},e[r].name+": "+e[r].value+e[r].units));return o.a.createElement(Qe,{style:{opacity:this.state.showStats?.8:0}},t)},r.render=function(){var e=this,t=this.state,r=t.dataUrl,a=t.textureError,s=this.props.image,n=s.format,c=s.name;return r?o.a.createElement(ze,{style:{backgroundImage:"url("+r+")"},onMouseEnter:function(){return e.setState({showStats:!0})},onMouseLeave:function(){return e.setState({showStats:!1})}},a?o.a.createElement(qe,{style:{color:"red"}},a):o.a.createElement(Je,null,n||c),this.renderStats()):null},t}(n.PureComponent);Ye.defaultProps={canvas:null,image:null,gl:null,program:null};var Ze=r("JX7q"),$e=h.c.div.withConfig({displayName:"textures-uploader__Container",componentId:"n9oi00-0"})(["display:flex;flex-flow:column nowrap;"]),et=h.c.div.withConfig({displayName:"textures-uploader__TextureFrame",componentId:"n9oi00-1"})(["display:flex;width:256px;height:256px;align-items:center;justify-content:center;border:1px dashed black;"]),tt=h.c.div.withConfig({displayName:"textures-uploader__ImageContainer",componentId:"n9oi00-2"})(["display:flex;flex-flow:column nowrap;align-items:center;width:270px;"]),rt=function(e){function t(t){var r;return(r=e.call(this,t)||this).state={uploadedImage:null},r.handleLoadFile=r.handleLoadFile.bind(Object(Ze.a)(r)),r.handleCleanTexture=r.handleCleanTexture.bind(Object(Ze.a)(r)),r}Object(s.a)(t,e);var r=t.prototype;return r.handleLoadFile=function(e){var t=e.dataTransfer.files[0];this.setState({uploadedImage:t}),e.preventDefault()},r.handleCleanTexture=function(){this.setState({uploadedImage:null})},r.render=function(){var e=this.props,t=e.canvas,r=e.gl,a=e.program,s=this.state,n=s.uploadedImage,c=s.files;return o.a.createElement("div",null,!n&&o.a.createElement($e,null,o.a.createElement(et,{onDrop:this.handleLoadFile,onDragOver:function(e){return e.preventDefault()}},"Drag&Drop texture"),o.a.createElement("input",{style:{display:"none"},type:"file",id:"fileInput",files:c})),o.a.createElement(tt,null,n&&o.a.createElement(Ye,{image:n,canvas:t,gl:r,program:a}),n&&o.a.createElement("button",{onClick:this.handleCleanTexture},"Clean")))},t}(n.PureComponent);rt.defaultProps={canvas:null,gl:null,program:null};var at=function(e){function t(t){var r;return(r=e.call(this,t)||this).state={canvas:null,gl:null,program:null},r}Object(s.a)(t,e);var r=t.prototype;return r.componentDidMount=function(){var e=this.setupCanvas(),t=e.getContext("webgl");Object(i.g)(t),this.createAndFillBufferObject(t);var r=new l.a(t,{vs:"\nprecision highp float;\n\nattribute vec2 position;\nvarying vec2 uv;\n\nvoid main() {\n  gl_Position = vec4(position, 0.0, 1.0);\n  uv = vec2(position.x * .5, -position.y * .5) + vec2(.5, .5);\n}\n",fs:"\nprecision highp float;\n\nuniform sampler2D tex;\nvarying vec2 uv;\n\nvoid main() {\n  gl_FragColor = vec4(texture2D(tex, uv).rgb, 1.);\n}\n"});this.setState({canvas:e,gl:t,program:r.handle})},r.setupCanvas=function(){var e=document.createElement("canvas");return e.width=256,e.height=256,e},r.createAndFillBufferObject=function(e){var t=new Float32Array([-1,-1,-1,1,1,-1,1,1]),r=e.createBuffer();r||console.error("Failed to create the buffer object"),e.bindBuffer(e.ARRAY_BUFFER,r),e.enableVertexAttribArray(0),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0)},r.renderTexturesBlocks=function(){var e=this,t=this.state,r=t.canvas,a=t.gl,s=t.program;return u.map((function(t,n){return o.a.createElement("div",{key:n},e.renderTexturesHeader(t),e.renderTextures(a,r,s,t.images),e.renderTexturesDescription(t))}))},r.renderTexturesHeader=function(e){var t=e.formatName,r=e.link;return o.a.createElement("div",{style:{display:"flex",flexFlow:"column"}},o.a.createElement("h2",{style:{borderBottom:"1px solid black",marginBottom:0}},r?o.a.createElement("a",{style:{textDecoration:"none"},href:r},t):t))},r.renderTexturesDescription=function(e){var t=e.description,r=e.codeSample,a=e.availability;return o.a.createElement("div",null,t&&o.a.createElement("p",null,o.a.createElement("b",null,"Description: "),t),a&&o.a.createElement("p",null,o.a.createElement("b",null,"Availability: "),a),r&&o.a.createElement("div",null,o.a.createElement("p",null,o.a.createElement("code",null,r))))},r.renderTextures=function(e,t,r,a){return a.map((function(a,s){return o.a.createElement(Ye,{key:s,image:a,canvas:t,gl:e,program:r})}))},r.renderDescription=function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"Texture Loaders"),o.a.createElement("p",null,"This page loads every  ",o.a.createElement("a",{href:"https://loaders.gl/modules/textures/docs/using-compressed-textures"},"texture format")," ","  supported by loaders.gl and attempts to display them in WebGL using the"," ",o.a.createElement("a",{href:"https://luma.gl"},o.a.createElement("b",null,"luma.gl"))," ",o.a.createElement("code",null,"Texture2D")," class."),o.a.createElement("p",null,"The ",o.a.createElement("code",null,"@loaders.gl/textures"),"   module provides loaders for compressed textures stored in ",o.a.createElement("b",null,"KTX"),", ",o.a.createElement("b",null,"DDS")," and ",o.a.createElement("b",null,"PVR")," container files, plus ",o.a.createElement("b",null,"CRN")," ","(Crunch), and ",o.a.createElement("b",null,"Basis")," supercompressed textures."),o.a.createElement("p",null,"This page also shows which compressed texture types your device and browser supports."),o.a.createElement("p",null,o.a.createElement("i",null,"Note that multiple textures on this page will fail to display due to lack of GPU support (reported via WebGL extensions). For example: DXT formats are usually only supported on Desktops while PVRTC is typically only available on mobile devices with PowerVR chipsets.")),o.a.createElement("p",null,o.a.createElement("i",null,"Inspired by toji's awesome"," ",o.a.createElement("a",{href:"http://toji.github.io/texture-tester"},"texture-tester"))))},r.render=function(){var e=this.state,t=e.gl,r=e.canvas,a=e.program;return o.a.createElement("div",{style:{margin:30}},this.renderDescription(),t&&o.a.createElement(rt,{canvas:r,gl:t,program:a}),t&&this.renderTexturesBlocks())},t}(n.PureComponent);function st(e){Object(c.render)(o.a.createElement(at,null),e)}}}]);