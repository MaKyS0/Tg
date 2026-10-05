(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1e3,t=1001,n=1002,r=1003,i=1004,a=1005,o=1006,s=1007,c=1008,l=1009,u=1010,d=1011,f=1012,p=1013,m=1014,h=1015,g=1016,_=1017,v=1018,y=1020,b=35902,x=35899,S=1021,C=1022,w=1023,T=1026,E=1027,D=1028,O=1029,k=1030,A=1031,j=1033,M=33776,ee=33777,N=33778,te=33779,P=35840,ne=35841,F=35842,re=35843,ie=36196,ae=37492,oe=37496,se=37488,I=37489,ce=37490,le=37491,ue=37808,de=37809,fe=37810,pe=37811,me=37812,he=37813,ge=37814,_e=37815,ve=37816,ye=37817,be=37818,xe=37819,Se=37820,Ce=37821,we=36492,Te=36494,Ee=36495,De=36283,Oe=36284,ke=36285,Ae=36286,je=2300,L=2301,Me=2302,Ne=2303,Pe=2400,R=2401,Fe=2402,z=3200,Ie=`srgb`,B=`srgb-linear`,Le=`linear`,Re=`srgb`,ze=7680,Be=35044,Ve=35048,He=2e3;function Ue(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function We(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Ge(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ke(){let e=Ge(`canvas`);return e.style.display=`block`,e}var qe={};function Je(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Ye(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function V(...e){e=Ye(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function H(...e){e=Ye(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Xe(...e){let t=e.join(` `);t in qe||(qe[t]=!0,V(...e))}function Ze(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Qe={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},$e=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},et=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),tt=Math.PI/180,nt=180/Math.PI;function rt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(et[e&255]+et[e>>8&255]+et[e>>16&255]+et[e>>24&255]+`-`+et[t&255]+et[t>>8&255]+`-`+et[t>>16&15|64]+et[t>>24&255]+`-`+et[n&63|128]+et[n>>8&255]+`-`+et[n>>16&255]+et[n>>24&255]+et[r&255]+et[r>>8&255]+et[r>>16&255]+et[r>>24&255]).toLowerCase()}function U(e,t,n){return Math.max(t,Math.min(n,e))}function it(e,t){return(e%t+t)%t}function at(e,t,n){return(1-n)*e+n*t}function ot(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function st(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var W=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=U(this.x,e.x,t.x),this.y=U(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=U(this.x,e,t),this.y=U(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(U(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(U(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ct=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:V(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(U(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},G=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ut.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ut.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=U(this.x,e.x,t.x),this.y=U(this.y,e.y,t.y),this.z=U(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=U(this.x,e,t),this.y=U(this.y,e,t),this.z=U(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(U(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return lt.copy(this).projectOnVector(e),this.sub(lt)}reflect(e){return this.sub(lt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(U(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},lt=new G,ut=new ct,K=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Xe(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(dt.makeScale(e,t)),this}rotate(e){return Xe(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(dt.makeRotation(-e)),this}translate(e,t){return Xe(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(dt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},dt=new K,ft=new K().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pt=new K().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function mt(){let e={enabled:!0,workingColorSpace:B,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=ht(e.r),e.g=ht(e.g),e.b=ht(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=gt(e.r),e.g=gt(e.g),e.b=gt(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Le:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Xe(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Xe(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[B]:{primaries:t,whitePoint:r,transfer:Le,toXYZ:ft,fromXYZ:pt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:t,whitePoint:r,transfer:Re,toXYZ:ft,fromXYZ:pt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}}),e}var q=mt();function ht(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function gt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var _t,vt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{_t===void 0&&(_t=Ge(`canvas`)),_t.width=e.width,_t.height=e.height;let t=_t.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=_t}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Ge(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=ht(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(ht(t[e]/255)*255):t[e]=ht(t[e]);return{data:t,width:e.width,height:e.height}}return V(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},yt=0,bt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:yt++}),this.uuid=rt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(xt(r[t].image)):e.push(xt(r[t]))}else e=xt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function xt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?vt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(V(`Texture: Unable to serialize Texture.`),{})}var St=0,Ct=new G,wt=class r extends $e{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,i=t,a=t,s=o,u=c,d=w,f=l,p=r.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:St++}),this.uuid=rt(),this.name=``,this.source=new bt(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new W(0,0),this.repeat=new W(1,1),this.center=new W(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new K,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ct).x}get height(){return this.source.getSize(Ct).y}get depth(){return this.source.getSize(Ct).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){V(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){V(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x)}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y)}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};wt.DEFAULT_IMAGE=null,wt.DEFAULT_MAPPING=300,wt.DEFAULT_ANISOTROPY=1;var Tt=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=U(this.x,e.x,t.x),this.y=U(this.y,e.y,t.y),this.z=U(this.z,e.z,t.z),this.w=U(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=U(this.x,e,t),this.y=U(this.y,e,t),this.z=U(this.z,e,t),this.w=U(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(U(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Et=class extends $e{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:o,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t),this.textures=[];let r=new wt({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:o,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new bt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Dt=class extends Et{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ot=class extends wt{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},kt=class extends wt{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},At=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/jt.setFromMatrixColumn(e,0).length(),i=1/jt.setFromMatrixColumn(e,1).length(),a=1/jt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Nt,e,Pt)}lookAt(e,t,n){let r=this.elements;return Lt.subVectors(e,t),Lt.lengthSq()===0&&(Lt.z=1),Lt.normalize(),Ft.crossVectors(n,Lt),Ft.lengthSq()===0&&(Math.abs(n.z)===1?Lt.x+=1e-4:Lt.z+=1e-4,Lt.normalize(),Ft.crossVectors(n,Lt)),Ft.normalize(),It.crossVectors(Lt,Ft),r[0]=Ft.x,r[4]=It.x,r[8]=Lt.x,r[1]=Ft.y,r[5]=It.y,r[9]=Lt.y,r[2]=Ft.z,r[6]=It.z,r[10]=Lt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],ee=r[3],N=r[7],te=r[11],P=r[15];return i[0]=a*x+o*T+s*k+c*ee,i[4]=a*S+o*E+s*A+c*N,i[8]=a*C+o*D+s*j+c*te,i[12]=a*w+o*O+s*M+c*P,i[1]=l*x+u*T+d*k+f*ee,i[5]=l*S+u*E+d*A+f*N,i[9]=l*C+u*D+d*j+f*te,i[13]=l*w+u*O+d*M+f*P,i[2]=p*x+m*T+h*k+g*ee,i[6]=p*S+m*E+h*A+g*N,i[10]=p*C+m*D+h*j+g*te,i[14]=p*w+m*O+h*M+g*P,i[3]=_*x+v*T+y*k+b*ee,i[7]=_*S+v*E+y*A+b*N,i[11]=_*C+v*D+y*j+b*te,i[15]=_*w+v*O+y*M+b*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=jt.set(r[0],r[1],r[2]).length(),o=jt.set(r[4],r[5],r[6]).length(),s=jt.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Mt.copy(this);let c=1/a,l=1/o,u=1/s;return Mt.elements[0]*=c,Mt.elements[1]*=c,Mt.elements[2]*=c,Mt.elements[4]*=l,Mt.elements[5]*=l,Mt.elements[6]*=l,Mt.elements[8]*=u,Mt.elements[9]*=u,Mt.elements[10]*=u,t.setFromRotationMatrix(Mt),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=He,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=He,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},jt=new G,Mt=new At,Nt=new G(0,0,0),Pt=new G(1,1,1),Ft=new G,It=new G,Lt=new G,Rt=new At,zt=new ct,Bt=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(U(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-U(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(U(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-U(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(U(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-U(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:V(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Rt.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rt,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zt.setFromEuler(this),this.setFromQuaternion(zt,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Bt.DEFAULT_ORDER=`XYZ`;var Vt=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},Ht=0,Ut=new G,Wt=new ct,Gt=new At,Kt=new G,qt=new G,Jt=new G,Yt=new ct,Xt=new G(1,0,0),Zt=new G(0,1,0),Qt=new G(0,0,1),$t={type:`added`},en={type:`removed`},tn={type:`childadded`,child:null},nn={type:`childremoved`,child:null},rn=class e extends $e{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ht++}),this.uuid=rt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new G,n=new Bt,r=new ct,i=new G(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new At},normalMatrix:{value:new K}}),this.matrix=new At,this.matrixWorld=new At,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vt,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Wt.setFromAxisAngle(e,t),this.quaternion.multiply(Wt),this}rotateOnWorldAxis(e,t){return Wt.setFromAxisAngle(e,t),this.quaternion.premultiply(Wt),this}rotateX(e){return this.rotateOnAxis(Xt,e)}rotateY(e){return this.rotateOnAxis(Zt,e)}rotateZ(e){return this.rotateOnAxis(Qt,e)}translateOnAxis(e,t){return Ut.copy(e).applyQuaternion(this.quaternion),this.position.add(Ut.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xt,e)}translateY(e){return this.translateOnAxis(Zt,e)}translateZ(e){return this.translateOnAxis(Qt,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Gt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Kt.copy(e):Kt.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),qt.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gt.lookAt(qt,Kt,this.up):Gt.lookAt(Kt,qt,this.up),this.quaternion.setFromRotationMatrix(Gt),r&&(Gt.extractRotation(r.matrixWorld),Wt.setFromRotationMatrix(Gt),this.quaternion.premultiply(Wt.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(H(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($t),tn.child=e,this.dispatchEvent(tn),tn.child=null):H(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(en),nn.child=e,this.dispatchEvent(nn),nn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Gt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Gt.multiply(e.parent.matrixWorld)),e.applyMatrix4(Gt),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($t),tn.child=e,this.dispatchEvent(tn),tn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qt,e,Jt),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qt,Yt,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};rn.DEFAULT_UP=new G(0,1,0),rn.DEFAULT_MATRIX_AUTO_UPDATE=!0,rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var an=class extends rn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},on={type:`move`},sn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new an,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new an,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new an,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(on)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new an;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},cn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ln={h:0,s:0,l:0},un={h:0,s:0,l:0};function dn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var J=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ie){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,q.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=q.workingColorSpace){return this.r=e,this.g=t,this.b=n,q.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=q.workingColorSpace){if(e=it(e,1),t=U(t,0,1),n=U(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=dn(i,r,e+1/3),this.g=dn(i,r,e),this.b=dn(i,r,e-1/3)}return q.colorSpaceToWorking(this,r),this}setStyle(e,t=Ie){function n(t){t!==void 0&&parseFloat(t)<1&&V(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:V(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);V(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ie){let n=cn[e.toLowerCase()];return n===void 0?V(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ht(e.r),this.g=ht(e.g),this.b=ht(e.b),this}copyLinearToSRGB(e){return this.r=gt(e.r),this.g=gt(e.g),this.b=gt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ie){return q.workingToColorSpace(fn.copy(this),e),Math.round(U(fn.r*255,0,255))*65536+Math.round(U(fn.g*255,0,255))*256+Math.round(U(fn.b*255,0,255))}getHexString(e=Ie){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=q.workingColorSpace){q.workingToColorSpace(fn.copy(this),t);let n=fn.r,r=fn.g,i=fn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=q.workingColorSpace){return q.workingToColorSpace(fn.copy(this),t),e.r=fn.r,e.g=fn.g,e.b=fn.b,e}getStyle(e=Ie){q.workingToColorSpace(fn.copy(this),e);let t=fn.r,n=fn.g,r=fn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(ln),this.setHSL(ln.h+e,ln.s+t,ln.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ln),e.getHSL(un);let n=at(ln.h,un.h,t),r=at(ln.s,un.s,t),i=at(ln.l,un.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},fn=new J;J.NAMES=cn;var pn=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new J(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},mn=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new J(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},hn=class extends rn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bt,this.environmentIntensity=1,this.environmentRotation=new Bt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},gn=new G,_n=new G,vn=new G,yn=new G,bn=new G,xn=new G,Sn=new G,Cn=new G,wn=new G,Tn=new G,En=new Tt,Dn=new Tt,On=new Tt,kn=class e{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),gn.subVectors(e,t),r.cross(gn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){gn.subVectors(r,t),_n.subVectors(n,t),vn.subVectors(e,t);let a=gn.dot(gn),o=gn.dot(_n),s=gn.dot(vn),c=_n.dot(_n),l=_n.dot(vn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,yn)!==null&&yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,yn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,yn.x),s.addScaledVector(a,yn.y),s.addScaledVector(o,yn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return En.setScalar(0),Dn.setScalar(0),On.setScalar(0),En.fromBufferAttribute(e,t),Dn.fromBufferAttribute(e,n),On.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(En,i.x),a.addScaledVector(Dn,i.y),a.addScaledVector(On,i.z),a}static isFrontFacing(e,t,n,r){return gn.subVectors(n,t),_n.subVectors(e,t),gn.cross(_n).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return gn.subVectors(this.c,this.b),_n.subVectors(this.a,this.b),gn.cross(_n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;bn.subVectors(r,n),xn.subVectors(i,n),Cn.subVectors(e,n);let s=bn.dot(Cn),c=xn.dot(Cn);if(s<=0&&c<=0)return t.copy(n);wn.subVectors(e,r);let l=bn.dot(wn),u=xn.dot(wn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(bn,a);Tn.subVectors(e,i);let f=bn.dot(Tn),p=xn.dot(Tn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(xn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Sn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Sn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(bn,a).addScaledVector(xn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},An=class{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Mn):Mn.fromBufferAttribute(r,t),Mn.applyMatrix4(e.matrixWorld),this.expandByPoint(Mn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Nn.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Nn.copy(e.boundingBox)),Nn.applyMatrix4(e.matrixWorld),this.union(Nn)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mn),Mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Bn),Vn.subVectors(this.max,Bn),Pn.subVectors(e.a,Bn),Fn.subVectors(e.b,Bn),In.subVectors(e.c,Bn),Ln.subVectors(Fn,Pn),Rn.subVectors(In,Fn),zn.subVectors(Pn,In);let t=[0,-Ln.z,Ln.y,0,-Rn.z,Rn.y,0,-zn.z,zn.y,Ln.z,0,-Ln.x,Rn.z,0,-Rn.x,zn.z,0,-zn.x,-Ln.y,Ln.x,0,-Rn.y,Rn.x,0,-zn.y,zn.x,0];return!Wn(t,Pn,Fn,In,Vn)||(t=[1,0,0,0,1,0,0,0,1],!Wn(t,Pn,Fn,In,Vn))?!1:(Hn.crossVectors(Ln,Rn),t=[Hn.x,Hn.y,Hn.z],Wn(t,Pn,Fn,In,Vn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},jn=[new G,new G,new G,new G,new G,new G,new G,new G],Mn=new G,Nn=new An,Pn=new G,Fn=new G,In=new G,Ln=new G,Rn=new G,zn=new G,Bn=new G,Vn=new G,Hn=new G,Un=new G;function Wn(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Un.fromArray(e,a);let o=i.x*Math.abs(Un.x)+i.y*Math.abs(Un.y)+i.z*Math.abs(Un.z),s=t.dot(Un),c=n.dot(Un),l=r.dot(Un);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Gn=new G,Kn=new W,qn=0,Jn=class extends $e{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qn++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Be,this.updateRanges=[],this.gpuType=h,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Kn.fromBufferAttribute(this,t),Kn.applyMatrix3(e),this.setXY(t,Kn.x,Kn.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Gn.fromBufferAttribute(this,t),Gn.applyMatrix3(e),this.setXYZ(t,Gn.x,Gn.y,Gn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Gn.fromBufferAttribute(this,t),Gn.applyMatrix4(e),this.setXYZ(t,Gn.x,Gn.y,Gn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gn.fromBufferAttribute(this,t),Gn.applyNormalMatrix(e),this.setXYZ(t,Gn.x,Gn.y,Gn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gn.fromBufferAttribute(this,t),Gn.transformDirection(e),this.setXYZ(t,Gn.x,Gn.y,Gn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ot(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ot(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ot(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ot(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ot(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),r=st(r,this.array),i=st(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},Yn=class extends Jn{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Xn=class extends Jn{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Zn=class extends Jn{constructor(e,t,n){super(new Float32Array(e),t,n)}},Qn=new An,$n=new G,er=new G,tr=class{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Qn.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;$n.subVectors(e,this.center);let t=$n.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector($n,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(er.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint($n.copy(e.center).add(er)),this.expandByPoint($n.copy(e.center).sub(er))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},nr=0,rr=new At,ir=new rn,ar=new G,or=new An,sr=new An,cr=new G,lr=class e extends $e{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nr++}),this.uuid=rt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Ue(e)?Xn:Yn)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new K().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return rr.makeRotationFromQuaternion(e),this.applyMatrix4(rr),this}rotateX(e){return rr.makeRotationX(e),this.applyMatrix4(rr),this}rotateY(e){return rr.makeRotationY(e),this.applyMatrix4(rr),this}rotateZ(e){return rr.makeRotationZ(e),this.applyMatrix4(rr),this}translate(e,t,n){return rr.makeTranslation(e,t,n),this.applyMatrix4(rr),this}scale(e,t,n){return rr.makeScale(e,t,n),this.applyMatrix4(rr),this}lookAt(e){return ir.lookAt(e),ir.updateMatrix(),this.applyMatrix4(ir.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ar).negate(),this.translate(ar.x,ar.y,ar.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Zn(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&V(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new An);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){H(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];or.setFromBufferAttribute(n),this.morphTargetsRelative?(cr.addVectors(this.boundingBox.min,or.min),this.boundingBox.expandByPoint(cr),cr.addVectors(this.boundingBox.max,or.max),this.boundingBox.expandByPoint(cr)):(this.boundingBox.expandByPoint(or.min),this.boundingBox.expandByPoint(or.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&H(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new tr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){H(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new G,1/0);return}if(e){let n=this.boundingSphere.center;if(or.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];sr.setFromBufferAttribute(n),this.morphTargetsRelative?(cr.addVectors(or.min,sr.min),or.expandByPoint(cr),cr.addVectors(or.max,sr.max),or.expandByPoint(cr)):(or.expandByPoint(sr.min),or.expandByPoint(sr.max))}or.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)cr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(cr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)cr.fromBufferAttribute(a,t),o&&(ar.fromBufferAttribute(e,t),cr.add(ar)),r=Math.max(r,n.distanceToSquared(cr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&H(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){H(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Jn(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new G,s[e]=new G;let c=new G,l=new G,u=new G,d=new W,f=new W,p=new W,m=new G,h=new G;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new G,y=new G,b=new G,x=new G;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Jn(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new G,i=new G,a=new G,o=new G,s=new G,c=new G,l=new G,u=new G;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)cr.fromBufferAttribute(e,t),cr.normalize(),e.setXYZ(t,cr.x,cr.y,cr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Jn(a,r,i)}if(this.index===null)return V(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},ur=new G,dr=new G,fr=new K,pr=class{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=ur.subVectors(n,t).cross(dr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(ur),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||fr.getNormalMatrix(e),r=this.coplanarPoint(ur).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},mr=0,hr=class extends $e{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mr++}),this.uuid=rt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new J(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ze,this.stencilZFail=ze,this.stencilZPass=ze,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){V(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){V(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new J().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new pr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new W().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new W().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},gr=new G,_r=new G,vr=new G,yr=new G,br=class{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=gr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gr.copy(this.origin).addScaledVector(this.direction,t),gr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){_r.copy(e).add(t).multiplyScalar(.5),vr.copy(t).sub(e).normalize(),yr.copy(this.origin).sub(_r);let i=e.distanceTo(t)*.5,a=-this.direction.dot(vr),o=yr.dot(this.direction),s=-yr.dot(vr),c=yr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(_r).addScaledVector(vr,d),f}intersectSphere(e,t){if(e.radius<0)return null;gr.subVectors(e.center,this.origin);let n=gr.dot(this.direction),r=gr.dot(gr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,gr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,ee;if(y>=b&&y>=x?(w=s,D=u,A=p,ee=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,ee=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,ee=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let N=S/w,te=C/w,P=1/w,ne=T-N*D,F=E-te*D,re=O-N*A,ie=k-te*A,ae=j-N*ee,oe=M-te*ee,se=ae*ie-oe*re,I=ne*oe-F*ae,ce=re*F-ie*ne;if(r){if(se<0||I<0||ce<0)return null}else if((se<0||I<0||ce<0)&&(se>0||I>0||ce>0))return null;let le=se+I+ce;if(le===0)return null;let ue=P*(se*D+I*A+ce*ee);return(le>0?ue<0:ue>0)?null:this.at(ue/le,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},xr=class extends hr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bt,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Sr=new At,Cr=new br,wr=new tr,Tr=new G,Er=new G,Dr=new G,Or=new G,kr=new G,Ar=new G,jr=new G,Mr=new G,Nr=class extends rn{constructor(e=new lr,t=new xr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Ar.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(kr.fromBufferAttribute(s,e),a?Ar.addScaledVector(kr,r):Ar.addScaledVector(kr.sub(t),r))}t.add(Ar)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),wr.copy(n.boundingSphere),wr.applyMatrix4(i),Cr.copy(e.ray).recast(e.near),!(wr.containsPoint(Cr.origin)===!1&&(Cr.intersectSphere(wr,Tr)===null||Cr.origin.distanceToSquared(Tr)>(e.far-e.near)**2))&&(Sr.copy(i).invert(),Cr.copy(e.ray).applyMatrix4(Sr),(n.boundingBox===null||Cr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Cr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Fr(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Fr(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Fr(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Fr(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Pr(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Mr.copy(s),Mr.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Mr);return l<n.near||l>n.far?null:{distance:l,point:Mr.clone(),object:e}}function Fr(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Er),e.getVertexPosition(c,Dr),e.getVertexPosition(l,Or);let u=Pr(e,t,n,r,Er,Dr,Or,jr);if(u){let e=new G;kn.getBarycoord(jr,Er,Dr,Or,e),i&&(u.uv=kn.getInterpolatedAttribute(i,s,c,l,e,new W)),a&&(u.uv1=kn.getInterpolatedAttribute(a,s,c,l,e,new W)),o&&(u.normal=kn.getInterpolatedAttribute(o,s,c,l,e,new G),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new G,materialIndex:0};kn.getNormal(Er,Dr,Or,t.normal),u.face=t,u.barycoord=e}return u}var Ir=class extends wt{constructor(e=null,t=1,n=1,i,a,o,s,c,l=r,u=r,d,f){super(null,o,s,c,l,u,i,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Lr=class extends Jn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Rr=new At,zr=new At,Br=[],Vr=new An,Hr=new At,Ur=new Nr,Wr=new tr,Gr=class extends Nr{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Lr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Hr)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new An),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rr),Vr.copy(e.boundingBox).applyMatrix4(Rr),this.boundingBox.union(Vr)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new tr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Rr),Wr.copy(e.boundingSphere).applyMatrix4(Rr),this.boundingSphere.union(Wr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Ur.geometry=this.geometry,Ur.material=this.material,Ur.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wr.copy(this.boundingSphere),Wr.applyMatrix4(n),e.ray.intersectsSphere(Wr)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Rr),zr.multiplyMatrices(n,Rr),Ur.matrixWorld=zr,Ur.raycast(e,Br);for(let e=0,n=Br.length;e<n;e++){let n=Br[e];n.instanceId=i,n.object=this,t.push(n)}Br.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Lr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ir(new Float32Array(r*this.count),r,this.count,D,h));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Kr=new tr,qr=new W(.5,.5),Jr=new G,Yr=class{constructor(e=new pr,t=new pr,n=new pr,r=new pr,i=new pr,a=new pr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=He,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Kr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Kr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Kr)}intersectsSprite(e){return Kr.center.set(0,0,0),Kr.radius=.7071067811865476+qr.distanceTo(e.center),Kr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Kr)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Jr.x=r.normal.x>0?e.max.x:e.min.x,Jr.y=r.normal.y>0?e.max.y:e.min.y,Jr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Jr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Xr=class extends hr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new J(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Zr=new At,Qr=new br,$r=new tr,ei=new G,ti=class extends rn{constructor(e=new lr,t=new Xr){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$r.copy(n.boundingSphere),$r.applyMatrix4(r),$r.radius+=i,e.ray.intersectsSphere($r)===!1)return;Zr.copy(r).invert(),Qr.copy(e.ray).applyMatrix4(Zr);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);ei.fromBufferAttribute(l,n),ni(ei,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)ei.fromBufferAttribute(l,a),ni(ei,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function ni(e,t,n,r,i,a,o){let s=Qr.distanceSqToPoint(e);if(s<n){let n=new G;Qr.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var ri=class extends wt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ii=class extends wt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ai=class extends wt{constructor(e,t,n=m,i,a,o,s=r,c=r,l,u=T,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},i,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new bt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},oi=class extends ai{constructor(e,t=m,n=301,i,a,o=r,s=r,c,l=T){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,i,a,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},si=class extends wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ci=class e extends lr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Zn(c,3)),this.setAttribute(`normal`,new Zn(l,3)),this.setAttribute(`uv`,new Zn(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new G;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},li=class e extends lr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Zn(u,3)),this.setAttribute(`normal`,new Zn(d,3)),this.setAttribute(`uv`,new Zn(f,2));function _(){let a=new G,_=new G,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new W,m=new G,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ui=class e extends li{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},di=class e extends lr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Zn(i,3)),this.setAttribute(`normal`,new Zn(i.slice(),3)),this.setAttribute(`uv`,new Zn(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new G,r=new G,i=new G;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new G;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new G;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new G,t=new G,n=new G,r=new G,o=new W,s=new W,c=new W;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},fi=class e extends di{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},pi=class e extends di{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},mi=class e extends lr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Zn(p,3)),this.setAttribute(`normal`,new Zn(m,3)),this.setAttribute(`uv`,new Zn(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},hi=class e extends lr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new G,d=new G,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Zn(p,3)),this.setAttribute(`normal`,new Zn(m,3)),this.setAttribute(`uv`,new Zn(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function gi(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(vi(i))i.isRenderTargetTexture?(V(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(vi(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function _i(e){let t={};for(let n=0;n<e.length;n++){let r=gi(e[n]);for(let e in r)t[e]=r[e]}return t}function vi(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function yi(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function bi(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:q.workingColorSpace}var xi={clone:gi,merge:_i},Si=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ci=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,wi=class extends hr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Si,this.fragmentShader=Ci,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=gi(e.uniforms),this.uniformsGroups=yi(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new J().setHex(r.value);break;case`v2`:this.uniforms[n].value=new W().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Tt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new K().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new At().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ti=class extends wi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Ei=class extends hr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new J(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new J(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Di=class extends hr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=z,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Oi=class extends hr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ki(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Ai(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var ji=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Mi=class extends ji{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pe,endingEnd:Pe}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case R:i=e,o=2*t-n;break;case Fe:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case R:a=e,s=2*n-t;break;case Fe:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Ni=class extends ji{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Pi=class extends ji{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Fi=class extends ji{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Ri(n,t,g,y,r);i[p]=Ii(x,o,_,b,m)}return i}};function Ii(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Li(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Ri(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Ii(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Li(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var zi=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=ki(t,this.TimeBufferType),this.values=ki(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ki(e.times,Array),values:ki(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Ai(e.settings)&&(n.settings={inTangents:ki(e.settings.inTangents,Array),outTangents:ki(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Pi(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ni(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Mi(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Fi(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case je:t=this.InterpolantFactoryMethodDiscrete;break;case L:t=this.InterpolantFactoryMethodLinear;break;case Me:t=this.InterpolantFactoryMethodSmooth;break;case Ne:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return V(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return je;case this.InterpolantFactoryMethodLinear:return L;case this.InterpolantFactoryMethodSmooth:return Me;case this.InterpolantFactoryMethodBezier:return Ne}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Ai(this.settings)&&(Bi(this.settings.inTangents,e),Bi(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(H(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(H(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){H(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){H(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&We(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){H(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Me,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Ai(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Bi(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}zi.prototype.ValueTypeName=``,zi.prototype.TimeBufferType=Float32Array,zi.prototype.ValueBufferType=Float32Array,zi.prototype.DefaultInterpolation=L;var Vi=class extends zi{constructor(e,t,n){super(e,t,n)}};Vi.prototype.ValueTypeName=`bool`,Vi.prototype.ValueBufferType=Array,Vi.prototype.DefaultInterpolation=je,Vi.prototype.InterpolantFactoryMethodLinear=void 0,Vi.prototype.InterpolantFactoryMethodSmooth=void 0;var Hi=class extends zi{constructor(e,t,n,r){super(e,t,n,r)}};Hi.prototype.ValueTypeName=`color`;var Ui=class extends zi{constructor(e,t,n,r){super(e,t,n,r)}};Ui.prototype.ValueTypeName=`number`;var Wi=class extends ji{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)ct.slerpFlat(i,0,a,c-o,a,c,s);return i}},Gi=class extends zi{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Wi(this.times,this.values,this.getValueSize(),e)}};Gi.prototype.ValueTypeName=`quaternion`,Gi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ki=class extends zi{constructor(e,t,n){super(e,t,n)}};Ki.prototype.ValueTypeName=`string`,Ki.prototype.ValueBufferType=Array,Ki.prototype.DefaultInterpolation=je,Ki.prototype.InterpolantFactoryMethodLinear=void 0,Ki.prototype.InterpolantFactoryMethodSmooth=void 0;var qi=class extends zi{constructor(e,t,n,r){super(e,t,n,r)}};qi.prototype.ValueTypeName=`vector`;var Ji=class extends rn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new J(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Yi=class extends Ji{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new J(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Xi=new At,Zi=new G,Qi=new G,$i=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new W(512,512),this.mapType=l,this.map=null,this.mapPass=null,this.matrix=new At,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yr,this._frameExtents=new W(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Zi.setFromMatrixPosition(e.matrixWorld),t.position.copy(Zi),Qi.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Qi),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Xi.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Xi,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Xi)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},ea=new G,ta=new ct,na=new G,ra=class extends rn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new At,this.projectionMatrix=new At,this.projectionMatrixInverse=new At,this.coordinateSystem=He,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ea,ta,na),na.x===1&&na.y===1&&na.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ea,ta,na.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ea,ta,na),na.x===1&&na.y===1&&na.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ea,ta,na.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ia=new G,aa=new W,oa=new W,sa=class extends ra{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=nt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(tt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return nt*2*Math.atan(Math.tan(tt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ia.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ia.x,ia.y).multiplyScalar(-e/ia.z),ia.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ia.x,ia.y).multiplyScalar(-e/ia.z)}getViewSize(e,t){return this.getViewBounds(e,aa,oa),t.subVectors(oa,aa)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(tt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ca=class extends $i{constructor(){super(new sa(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=nt*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},la=class extends Ji{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.target=new rn,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new ca}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},ua=class extends $i{constructor(){super(new sa(90,1,.5,500)),this.isPointLightShadow=!0}},da=class extends Ji{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new ua}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},fa=class extends ra{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},pa=class extends $i{constructor(){super(new fa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ma=class extends Ji{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.target=new rn,this.shadow=new pa}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},ha=class extends Ji{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},ga=-90,_a=1,va=class extends rn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new sa(ga,_a,e,t);r.layers=this.layers,this.add(r);let i=new sa(ga,_a,e,t);i.layers=this.layers,this.add(i);let a=new sa(ga,_a,e,t);a.layers=this.layers,this.add(a);let o=new sa(ga,_a,e,t);o.layers=this.layers,this.add(o);let s=new sa(ga,_a,e,t);s.layers=this.layers,this.add(s);let c=new sa(ga,_a,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ya=class extends sa{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},ba=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=xa.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function xa(){this._document.hidden===!1&&this.reset()}var Sa=`\\[\\]\\.:\\/`,Ca=RegExp(`[\\[\\]\\.:\\/]`,`g`),wa=`[^\\[\\]\\.:\\/]`,Ta=`[^`+Sa.replace(`\\.`,``)+`]`,Ea=`((?:WC+[\\/:])*)`.replace(`WC`,wa),Da=`(WCOD+)?`.replace(`WCOD`,Ta),Oa=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,wa),ka=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,wa),Aa=RegExp(`^`+Ea+Da+Oa+ka+`$`),ja=[`material`,`materials`,`bones`,`map`],Ma=class{constructor(e,t,n){let r=n||Na.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Na=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Ca,``)}static parseTrackName(e){let t=Aa.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);ja.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){V(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){H(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){H(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){H(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){H(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){H(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){H(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){H(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;H(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){H(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){H(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Na.Composite=Ma,Na.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Na.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Na.prototype.GetterByBindingType=[Na.prototype._getValue_direct,Na.prototype._getValue_array,Na.prototype._getValue_arrayElement,Na.prototype._getValue_toArray],Na.prototype.SetterByBindingTypeAndVersioning=[[Na.prototype._setValue_direct,Na.prototype._setValue_direct_setNeedsUpdate,Na.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Na.prototype._setValue_array,Na.prototype._setValue_array_setNeedsUpdate,Na.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Na.prototype._setValue_arrayElement,Na.prototype._setValue_arrayElement_setNeedsUpdate,Na.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Na.prototype._setValue_fromArray,Na.prototype._setValue_fromArray_setNeedsUpdate,Na.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function Pa(e,t,n,r){let i=Fa(r);switch(n){case S:return e*t;case D:return e*t/i.components*i.byteLength;case O:return e*t/i.components*i.byteLength;case k:return e*t*2/i.components*i.byteLength;case A:return e*t*2/i.components*i.byteLength;case C:return e*t*3/i.components*i.byteLength;case w:return e*t*4/i.components*i.byteLength;case j:return e*t*4/i.components*i.byteLength;case M:case ee:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case N:case te:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ne:case re:return Math.max(e,16)*Math.max(t,8)/4;case P:case F:return Math.max(e,8)*Math.max(t,8)/2;case ie:case ae:case se:case I:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case oe:case ce:case le:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ue:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case de:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case fe:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case pe:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case me:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case he:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ge:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case _e:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ve:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ye:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case be:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case xe:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Se:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Ce:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case we:case Te:case Ee:return Math.ceil(e/4)*Math.ceil(t/4)*16;case De:case Oe:return Math.ceil(e/4)*Math.ceil(t/4)*8;case ke:case Ae:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Fa(e){switch(e){case l:case u:return{byteLength:1,components:1};case f:case d:case g:return{byteLength:2,components:1};case _:case v:return{byteLength:2,components:4};case m:case p:case h:return{byteLength:4,components:1};case b:case x:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?V(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function Ia(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function La(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Y={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},X={common:{diffuse:{value:new J(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new K},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new K}},envmap:{envMap:{value:null},envMapRotation:{value:new K},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new K}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new K}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new K},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new K},normalScale:{value:new W(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new K},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new K}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new K}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new K}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new J(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new G},probesMax:{value:new G},probesResolution:{value:new G}},points:{diffuse:{value:new J(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0},uvTransform:{value:new K}},sprite:{diffuse:{value:new J(16777215)},opacity:{value:1},center:{value:new W(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new K},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0}}},Ra={basic:{uniforms:_i([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.fog]),vertexShader:Y.meshbasic_vert,fragmentShader:Y.meshbasic_frag},lambert:{uniforms:_i([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new J(0)},envMapIntensity:{value:1}}]),vertexShader:Y.meshlambert_vert,fragmentShader:Y.meshlambert_frag},phong:{uniforms:_i([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new J(0)},specular:{value:new J(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Y.meshphong_vert,fragmentShader:Y.meshphong_frag},standard:{uniforms:_i([X.common,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.roughnessmap,X.metalnessmap,X.fog,X.lights,{emissive:{value:new J(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag},toon:{uniforms:_i([X.common,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.gradientmap,X.fog,X.lights,{emissive:{value:new J(0)}}]),vertexShader:Y.meshtoon_vert,fragmentShader:Y.meshtoon_frag},matcap:{uniforms:_i([X.common,X.bumpmap,X.normalmap,X.displacementmap,X.fog,{matcap:{value:null}}]),vertexShader:Y.meshmatcap_vert,fragmentShader:Y.meshmatcap_frag},points:{uniforms:_i([X.points,X.fog]),vertexShader:Y.points_vert,fragmentShader:Y.points_frag},dashed:{uniforms:_i([X.common,X.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Y.linedashed_vert,fragmentShader:Y.linedashed_frag},depth:{uniforms:_i([X.common,X.displacementmap]),vertexShader:Y.depth_vert,fragmentShader:Y.depth_frag},normal:{uniforms:_i([X.common,X.bumpmap,X.normalmap,X.displacementmap,{opacity:{value:1}}]),vertexShader:Y.meshnormal_vert,fragmentShader:Y.meshnormal_frag},sprite:{uniforms:_i([X.sprite,X.fog]),vertexShader:Y.sprite_vert,fragmentShader:Y.sprite_frag},background:{uniforms:{uvTransform:{value:new K},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Y.background_vert,fragmentShader:Y.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new K}},vertexShader:Y.backgroundCube_vert,fragmentShader:Y.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Y.cube_vert,fragmentShader:Y.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Y.equirect_vert,fragmentShader:Y.equirect_frag},distance:{uniforms:_i([X.common,X.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Y.distance_vert,fragmentShader:Y.distance_frag},shadow:{uniforms:_i([X.lights,X.fog,{color:{value:new J(0)},opacity:{value:1}}]),vertexShader:Y.shadow_vert,fragmentShader:Y.shadow_frag}};Ra.physical={uniforms:_i([Ra.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new K},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new K},clearcoatNormalScale:{value:new W(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new K},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new K},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new K},sheen:{value:0},sheenColor:{value:new J(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new K},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new K},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new K},transmissionSamplerSize:{value:new W},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new K},attenuationDistance:{value:0},attenuationColor:{value:new J(0)},specularColor:{value:new J(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new K},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new K},anisotropyVector:{value:new W},anisotropyMap:{value:null},anisotropyMapTransform:{value:new K}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag};var za={r:0,b:0,g:0},Ba=new At,Va=new K;Va.set(-1,0,0,0,1,0,0,0,1);function Ha(e,t,n,r,i,a){let o=new J(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Nr(new ci(1,1,1),new wi({name:`BackgroundCubeMaterial`,uniforms:gi(Ra.backgroundCube.uniforms),vertexShader:Ra.backgroundCube.vertexShader,fragmentShader:Ra.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ba.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Va),l.material.toneMapped=q.getTransfer(i.colorSpace)!==Re,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Nr(new mi(2,2),new wi({name:`BackgroundMaterial`,uniforms:gi(Ra.background.uniforms),vertexShader:Ra.background.vertexShader,fragmentShader:Ra.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=q.getTransfer(i.colorSpace)!==Re,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(za,bi(e)),n.buffers.color.setClear(za.r,za.g,za.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Ua(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Wa(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Ga(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(V(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&V(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Ka(e){let t=this,n=null,r=0,i=!1,a=!1,o=new pr,s=new K,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var qa=4,Ja=6,Ya=20,Xa=256,Za=new fa,Qa=new J,$a=null,eo=0,to=0,no=!1,ro=new G,io=new G,ao=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=ro}=i;$a=this._renderer.getRenderTarget(),eo=this._renderer.getActiveCubeFace(),to=this._renderer.getActiveMipmapLevel(),no=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=po(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget($a,eo,to),this._renderer.xr.enabled=no,e.scissorTest=!1,co(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$a=this._renderer.getRenderTarget(),eo=this._renderer.getActiveCubeFace(),to=this._renderer.getActiveMipmapLevel(),no=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:o,minFilter:o,generateMipmaps:!1,type:g,format:w,colorSpace:B,depthBuffer:!1},r=so(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=so(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=oo(r)),this._blurMaterial=uo(r,e,t),this._ggxMaterial=lo(r,e,t)}return r}_compileMaterial(e){let t=new Nr(new lr,e);this._renderer.compile(t,Za)}_sceneToCubeUV(e,t,n,r,i){let a=new sa(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Qa),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Nr(new ci,new xr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Qa),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;co(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=po()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fo());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;co(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Za)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-qa?n-d+qa:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,co(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Za),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,co(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Za)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];co(t,3*l*(r>this._lodMax-qa?r-this._lodMax+qa:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Za)}};function oo(e){let t=[],n=[],r=e,i=e-qa+1+Ja;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?io.set(1,r,n):e===1?io.set(-n,1,-r):e===2?io.set(-n,r,1):e===3?io.set(-1,r,-n):e===4?io.set(-n,-1,r):io.set(n,r,-1),io.toArray(l,(e*6+t)*3)}}let u=new lr;u.setAttribute(`position`,new Jn(c,3)),u.setAttribute(`outputDirection`,new Jn(l,3)),n.push(new Nr(u,null)),r>qa&&r--}return{lodMeshes:n,sizeLods:t}}function so(e,t,n){let r=new Dt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function co(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function lo(e,t,n){return new wi({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Xa,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:mo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function uo(e,t,n){return new wi({name:`SphericalGaussianBlur`,defines:{SAMPLES:Ya,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:mo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function fo(){return new wi({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function po(){return new wi({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function mo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var ho=class extends Dt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ri(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ci(5,5,5),i=new wi({name:`CubemapFromEquirect`,uniforms:gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Nr(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=o),new va(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function go(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new ho(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new ao(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new ao(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function _o(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Xe(`WebGLRenderer: `+e+` extension not supported.`),t}}}function vo(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Xn:Yn)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function yo(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function bo(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:H(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function xo(e,t,n){let r=new WeakMap,i=new Tt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let g=new Float32Array(p*m*4*u),_=new Ot(g,p,m,u);_.type=h,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new W(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function So(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Co={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function wo(e,t,n,r,i,a){let o=new Dt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new lr;l.setAttribute(`position`,new Zn([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new Zn([0,2,0,0,2,0],2));let u=new Ti({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Nr(l,u),f=new fa(-1,1,1,-1,0,1),p=null,m=null,h=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Dt(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}),c=new Dt(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,h=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},q.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Co[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(d,f),v=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var To=new wt,Eo=new ai(1,1),Do=new Ot,Oo=new kt,ko=new ri,Ao=[],jo=[],Mo=new Float32Array(16),No=new Float32Array(9),Po=new Float32Array(4);function Fo(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Ao[i];if(a===void 0&&(a=new Float32Array(i),Ao[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Io(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Lo(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Ro(e,t){let n=jo[t];n===void 0&&(n=new Int32Array(t),jo[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function zo(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Bo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Io(n,t))return;e.uniform2fv(this.addr,t),Lo(n,t)}}function Vo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Io(n,t))return;e.uniform3fv(this.addr,t),Lo(n,t)}}function Ho(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Io(n,t))return;e.uniform4fv(this.addr,t),Lo(n,t)}}function Uo(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Io(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Lo(n,t)}else{if(Io(n,r))return;Po.set(r),e.uniformMatrix2fv(this.addr,!1,Po),Lo(n,r)}}function Wo(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Io(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Lo(n,t)}else{if(Io(n,r))return;No.set(r),e.uniformMatrix3fv(this.addr,!1,No),Lo(n,r)}}function Go(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Io(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Lo(n,t)}else{if(Io(n,r))return;Mo.set(r),e.uniformMatrix4fv(this.addr,!1,Mo),Lo(n,r)}}function Ko(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function qo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Io(n,t))return;e.uniform2iv(this.addr,t),Lo(n,t)}}function Jo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Io(n,t))return;e.uniform3iv(this.addr,t),Lo(n,t)}}function Yo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Io(n,t))return;e.uniform4iv(this.addr,t),Lo(n,t)}}function Xo(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Zo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Io(n,t))return;e.uniform2uiv(this.addr,t),Lo(n,t)}}function Qo(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Io(n,t))return;e.uniform3uiv(this.addr,t),Lo(n,t)}}function $o(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Io(n,t))return;e.uniform4uiv(this.addr,t),Lo(n,t)}}function es(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Eo.compareFunction=n.isReversedDepthBuffer()?518:515,a=Eo):a=To,n.setTexture2D(t||a,i)}function ts(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Oo,i)}function ns(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||ko,i)}function rs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Do,i)}function is(e){switch(e){case 5126:return zo;case 35664:return Bo;case 35665:return Vo;case 35666:return Ho;case 35674:return Uo;case 35675:return Wo;case 35676:return Go;case 5124:case 35670:return Ko;case 35667:case 35671:return qo;case 35668:case 35672:return Jo;case 35669:case 35673:return Yo;case 5125:return Xo;case 36294:return Zo;case 36295:return Qo;case 36296:return $o;case 35678:case 36198:case 36298:case 36306:case 35682:return es;case 35679:case 36299:case 36307:return ts;case 35680:case 36300:case 36308:case 36293:return ns;case 36289:case 36303:case 36311:case 36292:return rs}}function as(e,t){e.uniform1fv(this.addr,t)}function os(e,t){let n=Fo(t,this.size,2);e.uniform2fv(this.addr,n)}function ss(e,t){let n=Fo(t,this.size,3);e.uniform3fv(this.addr,n)}function cs(e,t){let n=Fo(t,this.size,4);e.uniform4fv(this.addr,n)}function ls(e,t){let n=Fo(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function us(e,t){let n=Fo(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function ds(e,t){let n=Fo(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function fs(e,t){e.uniform1iv(this.addr,t)}function ps(e,t){e.uniform2iv(this.addr,t)}function ms(e,t){e.uniform3iv(this.addr,t)}function hs(e,t){e.uniform4iv(this.addr,t)}function gs(e,t){e.uniform1uiv(this.addr,t)}function _s(e,t){e.uniform2uiv(this.addr,t)}function vs(e,t){e.uniform3uiv(this.addr,t)}function ys(e,t){e.uniform4uiv(this.addr,t)}function bs(e,t,n){let r=this.cache,i=t.length,a=Ro(n,i);Io(r,a)||(e.uniform1iv(this.addr,a),Lo(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Eo:To;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function xs(e,t,n){let r=this.cache,i=t.length,a=Ro(n,i);Io(r,a)||(e.uniform1iv(this.addr,a),Lo(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Oo,a[e])}function Ss(e,t,n){let r=this.cache,i=t.length,a=Ro(n,i);Io(r,a)||(e.uniform1iv(this.addr,a),Lo(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||ko,a[e])}function Cs(e,t,n){let r=this.cache,i=t.length,a=Ro(n,i);Io(r,a)||(e.uniform1iv(this.addr,a),Lo(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Do,a[e])}function ws(e){switch(e){case 5126:return as;case 35664:return os;case 35665:return ss;case 35666:return cs;case 35674:return ls;case 35675:return us;case 35676:return ds;case 5124:case 35670:return fs;case 35667:case 35671:return ps;case 35668:case 35672:return ms;case 35669:case 35673:return hs;case 5125:return gs;case 36294:return _s;case 36295:return vs;case 36296:return ys;case 35678:case 36198:case 36298:case 36306:case 35682:return bs;case 35679:case 36299:case 36307:return xs;case 35680:case 36300:case 36308:case 36293:return Ss;case 36289:case 36303:case 36311:case 36292:return Cs}}var Ts=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=is(t.type)}},Es=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ws(t.type)}},Ds=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Os=/(\w+)(\])?(\[|\.)?/g;function ks(e,t){e.seq.push(t),e.map[t.id]=t}function As(e,t,n){let r=e.name,i=r.length;for(Os.lastIndex=0;;){let a=Os.exec(r),o=Os.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){ks(n,l===void 0?new Ts(s,e,t):new Es(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Ds(s),ks(n,e)),n=e}}}var js=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);As(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Ms(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Ns=37297,Ps=0;function Fs(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Is=new K;function Ls(e){q._getMatrix(Is,q.workingColorSpace,e);let t=`mat3( ${Is.elements.map(e=>e.toFixed(4))} )`;switch(q.getTransfer(e)){case Le:return[t,`LinearTransferOETF`];case Re:return[t,`sRGBTransferOETF`];default:return V(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Rs(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Fs(e.getShaderSource(t),r)}return i}function zs(e,t){let n=Ls(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Bs={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Vs(e,t){let n=Bs[t];return n===void 0?(V(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Hs=new G;function Us(){return q.getLuminanceCoefficients(Hs),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Hs.x.toFixed(4)}, ${Hs.y.toFixed(4)}, ${Hs.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Ws(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(qs).join(`
`)}function Gs(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Ks(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function qs(e){return e!==``}function Js(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ys(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Xs=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zs(e){return e.replace(Xs,$s)}var Qs=new Map;function $s(e,t){let n=Y[t];if(n===void 0){let e=Qs.get(t);if(e!==void 0)n=Y[e],V(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Zs(n)}var ec=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tc(e){return e.replace(ec,nc)}function nc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function rc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var ic={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function ac(e){return ic[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var oc={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function sc(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:oc[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var cc={302:`ENVMAP_MODE_REFRACTION`};function lc(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:cc[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var uc={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function dc(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:uc[e.combine]||`ENVMAP_BLENDING_NONE`}function fc(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function pc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=ac(n),l=sc(n),u=lc(n),d=dc(n),f=fc(n),p=Ws(n),m=Gs(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(qs).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(qs).join(`
`),_.length>0&&(_+=`
`)):(g=[rc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(qs).join(`
`),_=[rc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Y.tonemapping_pars_fragment,n.toneMapping===0?``:Vs(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Y.colorspace_pars_fragment,zs(`linearToOutputTexel`,n.outputColorSpace),Us(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(qs).join(`
`)),o=Zs(o),o=Js(o,n),o=Ys(o,n),s=Zs(s),s=Js(s,n),s=Ys(s,n),o=tc(o),s=tc(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Ms(i,i.VERTEX_SHADER,y),S=Ms(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Rs(i,x,`vertex`),n=Rs(i,S,`fragment`);H(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):V(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new js(i,h),T=Ks(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Ns)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Ps++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var mc=0,hc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new gc(e),t.set(e,n)),n}},gc=class{constructor(e){this.id=mc++,this.code=e,this.usedTimes=0}};function _c(e){return e===1030||e===37490||e===36285}function vc(e,t,n,r,i,a){let o=new Vt,s=new hc,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&V(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Ra[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),ee=h.isInstancedMesh===!0,N=h.isBatchedMesh===!0,te=!!i.map,P=!!i.matcap,ne=!!x,F=!!i.aoMap,re=!!i.lightMap,ie=!!i.bumpMap&&i.wireframe===!1,ae=!!i.normalMap,oe=!!i.displacementMap,se=!!i.emissiveMap,I=!!i.metalnessMap,ce=!!i.roughnessMap,le=i.anisotropy>0,ue=i.clearcoat>0,de=i.dispersion>0,fe=i.retroreflectivity>0,pe=i.iridescence>0,me=i.sheen>0,he=i.transmission>0,ge=le&&!!i.anisotropyMap,_e=ue&&!!i.clearcoatMap,ve=ue&&!!i.clearcoatNormalMap,ye=ue&&!!i.clearcoatRoughnessMap,be=pe&&!!i.iridescenceMap,xe=pe&&!!i.iridescenceThicknessMap,Se=me&&!!i.sheenColorMap,Ce=me&&!!i.sheenRoughnessMap,we=!!i.specularMap,Te=!!i.specularColorMap,Ee=!!i.specularIntensityMap,De=he&&!!i.transmissionMap,Oe=he&&!!i.thicknessMap,ke=!!i.gradientMap,Ae=!!i.alphaMap,je=i.alphaTest>0,L=!!i.alphaHash,Me=!!i.extensions,Ne=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ne=e.toneMapping);let Pe={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:N,batchingColor:N&&h._colorsTexture!==null,instancing:ee,instancingColor:ee&&h.instanceColor!==null,instancingMorph:ee&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:q.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:te,matcap:P,envMap:ne,envMapMode:ne&&x.mapping,envMapCubeUVHeight:S,aoMap:F,lightMap:re,bumpMap:ie,normalMap:ae,displacementMap:oe,emissiveMap:se,normalMapObjectSpace:ae&&i.normalMapType===1,normalMapTangentSpace:ae&&i.normalMapType===0,packedNormalMap:ae&&i.normalMapType===0&&_c(i.normalMap.format),metalnessMap:I,roughnessMap:ce,anisotropy:le,anisotropyMap:ge,clearcoat:ue,clearcoatMap:_e,clearcoatNormalMap:ve,clearcoatRoughnessMap:ye,dispersion:de,retroreflection:fe,iridescence:pe,iridescenceMap:be,iridescenceThicknessMap:xe,sheen:me,sheenColorMap:Se,sheenRoughnessMap:Ce,specularMap:we,specularColorMap:Te,specularIntensityMap:Ee,transmission:he,transmissionMap:De,thicknessMap:Oe,gradientMap:ke,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ae,alphaTest:je,alphaHash:L,combine:i.combine,mapUv:te&&m(i.map.channel),aoMapUv:F&&m(i.aoMap.channel),lightMapUv:re&&m(i.lightMap.channel),bumpMapUv:ie&&m(i.bumpMap.channel),normalMapUv:ae&&m(i.normalMap.channel),displacementMapUv:oe&&m(i.displacementMap.channel),emissiveMapUv:se&&m(i.emissiveMap.channel),metalnessMapUv:I&&m(i.metalnessMap.channel),roughnessMapUv:ce&&m(i.roughnessMap.channel),anisotropyMapUv:ge&&m(i.anisotropyMap.channel),clearcoatMapUv:_e&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ve&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&m(i.sheenRoughnessMap.channel),specularMapUv:we&&m(i.specularMap.channel),specularColorMapUv:Te&&m(i.specularColorMap.channel),specularIntensityMapUv:Ee&&m(i.specularIntensityMap.channel),transmissionMapUv:De&&m(i.transmissionMap.channel),thicknessMapUv:Oe&&m(i.thicknessMap.channel),alphaMapUv:Ae&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ae||le),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(te||Ae),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ae===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ne,decodeVideoTexture:te&&i.map.isVideoTexture===!0&&q.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:se&&i.emissiveMap.isVideoTexture===!0&&q.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Me&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Me&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Ra[t];n=xi.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new pc(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function yc(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function bc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function xc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Sc(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||bc),r.length>1&&r.sort(t||xc),i.length>1&&i.sort(t||xc)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Cc(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Sc,e.set(t,[i])):n>=r.length?(i=new Sc,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function wc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new G,color:new J};break;case`SpotLight`:n={position:new G,direction:new G,color:new J,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new G,color:new J,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new G,skyColor:new J,groundColor:new J};break;case`RectAreaLight`:n={color:new J,position:new G,halfWidth:new G,halfHeight:new G}}return e[t.id]=n,n}}}function Tc(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Ec=0;function Dc(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Oc(e){let t=new wc,n=Tc(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new G);let i=new G,a=new At,o=new At;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Dc);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=X.LTC_FLOAT_1,r.rectAreaLTC2=X.LTC_FLOAT_2):(r.rectAreaLTC1=X.LTC_HALF_1,r.rectAreaLTC2=X.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Ec++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function kc(e){let t=new Oc(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Ac(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new kc(e),t.set(n,[a])):r>=i.length?(a=new kc(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var jc=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Mc=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Nc=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],Pc=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],Fc=new At,Ic=new G,Lc=new G;function Rc(e,t,n){let i=new Yr,a=new W,s=new W,c=new Tt,l=new Di,u=new Oi,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},_=new wi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new W},radius:{value:4}},vertexShader:jc,fragmentShader:Mc}),v=_.clone();v.defines.HORIZONTAL_PASS=1;let y=new lr;y.setAttribute(`position`,new Jn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Nr(y,_),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(V(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.state;_.setBlending(0),_.buffers.depth.getReversed()===!0?_.buffers.color.setClear(0,0,0,0):_.buffers.color.setClear(1,1,1,1),_.buffers.depth.setTest(!0),_.setScissorTest(!1);let v=S!==this.type;v&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){V(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;a.copy(p.mapSize);let y=p.getFrameExtents();a.multiply(y),s.copy(p.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(s.x=Math.floor(f/y.x),a.x=s.x*y.x,p.mapSize.x=s.x),a.y>f&&(s.y=Math.floor(f/y.y),a.y=s.y*y.y,p.mapSize.y=s.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||v===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){V(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new Dt(a.x,a.y,{format:k,type:g,minFilter:o,magFilter:o,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new ai(a.x,a.y,h),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=T,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r}else d.isPointLight?(p.map=new ho(a.x),p.map.depthTexture=new oi(a.x,m)):(p.map=new Dt(a.x,a.y),p.map.depthTexture=new ai(a.x,a.y,m)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=T,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=o,p.map.depthTexture.magFilter=o):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==a.x||p.map.height!==a.y)&&p.map.setSize(a.x,a.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);for(let t=0;t<x;t++){let r=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Ic.setFromMatrixPosition(d.matrixWorld),e.position.copy(Ic),Lc.copy(e.position),Lc.add(Nc[t]),e.up.copy(Pc[t]),e.lookAt(Lc),e.updateMatrixWorld(),n.makeTranslation(-Ic.x,-Ic.y,-Ic.z),Fc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(Fc,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);c.set(s.x*n.x,s.y*n.y,s.x*n.z,s.y*n.w),_.viewport(c)}i=p.getFrustum(t),E(n,l,r,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let i=t.update(b);_.defines.VSM_SAMPLES!==n.blurSamples&&(_.defines.VSM_SAMPLES=n.blurSamples,v.defines.VSM_SAMPLES=n.blurSamples,_.needsUpdate=!0,v.needsUpdate=!0),n.mapPass===null?n.mapPass=new Dt(a.x,a.y,{format:k,type:g}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),_.uniforms.shadow_pass.value=n.map.depthTexture,_.uniforms.resolution.value.set(n.map.width,n.map.height),_.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,_,b,null),v.uniforms.shadow_pass.value=n.mapPass.texture,v.uniforms.resolution.value.set(n.map.width,n.map.height),v.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,v,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function E(n,r,a,o,s){if(n.visible===!1)return;if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(i))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let i=t.update(n),c=n.material;if(Array.isArray(c)){let t=i.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,r,a,i,t,u),e.renderBufferDirect(a,null,i,t,n,u),n.onAfterShadow(e,n,r,a,i,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,r,a,i,t,null),e.renderBufferDirect(a,null,i,t,n,null),n.onAfterShadow(e,n,r,a,i,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)E(c[e],r,a,o,s)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function zc(e,t){function n(){let t=!1,n=new Tt,r=null,i=new Tt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?I(e.DEPTH_TEST):ce(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Qe[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?I(e.STENCIL_TEST):ce(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ee=!1,N=0,te=e.getParameter(e.VERSION);te.indexOf(`WebGL`)===-1?te.indexOf(`OpenGL ES`)!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),ee=N>=2):(N=parseFloat(/^WebGL (\d)/.exec(te)[1]),ee=N>=1);let P=null,ne={},F=e.getParameter(e.SCISSOR_BOX),re=e.getParameter(e.VIEWPORT),ie=new Tt().fromArray(F),ae=new Tt().fromArray(re);function oe(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let se={};se[e.TEXTURE_2D]=oe(e.TEXTURE_2D,e.TEXTURE_2D,1),se[e.TEXTURE_CUBE_MAP]=oe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[e.TEXTURE_2D_ARRAY]=oe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),se[e.TEXTURE_3D]=oe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),I(e.DEPTH_TEST),o.setFunc(3),ge(!1),_e(1),I(e.CULL_FACE),me(0);function I(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ce(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function le(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ue(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function de(t){return h!==t&&(e.useProgram(t),h=t,!0)}let fe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};fe[103]=e.MIN,fe[104]=e.MAX;let pe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function me(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(ce(e.BLEND),g=!1);return}if(g===!1&&(I(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:H(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:H(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:H(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:H(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(fe[n],fe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(pe[r],pe[i],pe[o],pe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function he(t,n){t.side===2?ce(e.CULL_FACE):I(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ge(r),t.blending===1&&t.transparent===!1?me(0):me(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ye(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?I(e.SAMPLE_ALPHA_TO_COVERAGE):ce(e.SAMPLE_ALPHA_TO_COVERAGE)}function ge(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function _e(t){t===0?ce(e.CULL_FACE):(I(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ve(t){t!==k&&(ee&&e.lineWidth(t),k=t)}function ye(t,n,r){t?(I(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ce(e.POLYGON_OFFSET_FILL)}function be(t){t?I(e.SCISSOR_TEST):ce(e.SCISSOR_TEST)}function xe(t){t===void 0&&(t=e.TEXTURE0+M-1),P!==t&&(e.activeTexture(t),P=t)}function Se(t,n,r){r===void 0&&(r=P===null?e.TEXTURE0+M-1:P);let i=ne[r];i===void 0&&(i={type:void 0,texture:void 0},ne[r]=i),(i.type!==t||i.texture!==n)&&(P!==r&&(e.activeTexture(r),P=r),e.bindTexture(t,n||se[t]),i.type=t,i.texture=n)}function Ce(){let t=ne[P];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function we(){try{e.compressedTexImage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Te(){try{e.compressedTexImage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Ee(){try{e.texSubImage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function De(){try{e.texSubImage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Oe(){try{e.compressedTexSubImage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function ke(){try{e.compressedTexSubImage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Ae(){try{e.texStorage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function je(){try{e.texStorage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function L(){try{e.texImage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Me(){try{e.texImage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Ne(t){return d[t]===void 0?e.getParameter(t):d[t]}function Pe(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function R(t){ie.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ie.copy(t))}function Fe(t){ae.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ae.copy(t))}function z(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ie(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function B(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},P=null,ne={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ie.set(0,0,e.canvas.width,e.canvas.height),ae.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:I,disable:ce,bindFramebuffer:le,drawBuffers:ue,useProgram:de,setBlending:me,setMaterial:he,setFlipSided:ge,setCullFace:_e,setLineWidth:ve,setPolygonOffset:ye,setScissorTest:be,activeTexture:xe,bindTexture:Se,unbindTexture:Ce,compressedTexImage2D:we,compressedTexImage3D:Te,texImage2D:L,texImage3D:Me,pixelStorei:Pe,getParameter:Ne,updateUBOMapping:z,uniformBlockBinding:Ie,texStorage2D:Ae,texStorage3D:je,texSubImage2D:Ee,texSubImage3D:De,compressedTexSubImage2D:Oe,compressedTexSubImage3D:ke,scissor:R,viewport:Fe,reset:B}}function Bc(l,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new W,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):Ge(`canvas`)}function T(e,t,n){let r=1,i=Ne(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),V(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&V(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function D(e){return e.generateMipmaps}function O(e){l.generateMipmap(e)}function k(e){return e.isWebGLCubeRenderTarget?l.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?l.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?l.TEXTURE_2D_ARRAY:l.TEXTURE_2D}function A(e,t,n,r,i,a=!1){if(e!==null){if(l[e]!==void 0)return l[e];V(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let o;r&&(o=u.get(`EXT_texture_norm16`),o||V(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let s=t;if(t===l.RED&&(n===l.FLOAT&&(s=l.R32F),n===l.HALF_FLOAT&&(s=l.R16F),n===l.UNSIGNED_BYTE&&(s=l.R8),n===l.UNSIGNED_SHORT&&o&&(s=o.R16_EXT),n===l.SHORT&&o&&(s=o.R16_SNORM_EXT)),t===l.RED_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.R8UI),n===l.UNSIGNED_SHORT&&(s=l.R16UI),n===l.UNSIGNED_INT&&(s=l.R32UI),n===l.BYTE&&(s=l.R8I),n===l.SHORT&&(s=l.R16I),n===l.INT&&(s=l.R32I)),t===l.RG&&(n===l.FLOAT&&(s=l.RG32F),n===l.HALF_FLOAT&&(s=l.RG16F),n===l.UNSIGNED_BYTE&&(s=l.RG8),n===l.UNSIGNED_SHORT&&o&&(s=o.RG16_EXT),n===l.SHORT&&o&&(s=o.RG16_SNORM_EXT)),t===l.RG_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RG8UI),n===l.UNSIGNED_SHORT&&(s=l.RG16UI),n===l.UNSIGNED_INT&&(s=l.RG32UI),n===l.BYTE&&(s=l.RG8I),n===l.SHORT&&(s=l.RG16I),n===l.INT&&(s=l.RG32I)),t===l.RGB_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGB8UI),n===l.UNSIGNED_SHORT&&(s=l.RGB16UI),n===l.UNSIGNED_INT&&(s=l.RGB32UI),n===l.BYTE&&(s=l.RGB8I),n===l.SHORT&&(s=l.RGB16I),n===l.INT&&(s=l.RGB32I)),t===l.RGBA_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGBA8UI),n===l.UNSIGNED_SHORT&&(s=l.RGBA16UI),n===l.UNSIGNED_INT&&(s=l.RGBA32UI),n===l.BYTE&&(s=l.RGBA8I),n===l.SHORT&&(s=l.RGBA16I),n===l.INT&&(s=l.RGBA32I)),t===l.RGB&&(n===l.UNSIGNED_SHORT&&o&&(s=o.RGB16_EXT),n===l.SHORT&&o&&(s=o.RGB16_SNORM_EXT),n===l.UNSIGNED_INT_5_9_9_9_REV&&(s=l.RGB9_E5),n===l.UNSIGNED_INT_10F_11F_11F_REV&&(s=l.R11F_G11F_B10F)),t===l.RGBA){let e=a?Le:q.getTransfer(i);n===l.FLOAT&&(s=l.RGBA32F),n===l.HALF_FLOAT&&(s=l.RGBA16F),n===l.UNSIGNED_BYTE&&(s=e===`srgb`?l.SRGB8_ALPHA8:l.RGBA8),n===l.UNSIGNED_SHORT&&o&&(s=o.RGBA16_EXT),n===l.SHORT&&o&&(s=o.RGBA16_SNORM_EXT),n===l.UNSIGNED_SHORT_4_4_4_4&&(s=l.RGBA4),n===l.UNSIGNED_SHORT_5_5_5_1&&(s=l.RGB5_A1)}return(s===l.R16F||s===l.R32F||s===l.RG16F||s===l.RG32F||s===l.RGBA16F||s===l.RGBA32F)&&u.get(`EXT_color_buffer_float`),s}function j(e,t){let n;return e?t===null||t===1014||t===1020?n=l.DEPTH24_STENCIL8:t===1015?n=l.DEPTH32F_STENCIL8:t===1012&&(n=l.DEPTH24_STENCIL8,V(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):t===null||t===1014||t===1020?n=l.DEPTH_COMPONENT24:t===1015?n=l.DEPTH_COMPONENT32F:t===1012&&(n=l.DEPTH_COMPONENT16),n}function M(e,t){return D(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function ee(e){let t=e.target;t.removeEventListener(`dispose`,ee),te(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function N(e){let t=e.target;t.removeEventListener(`dispose`,N),ne(t)}function te(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&P(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function P(e){let t=f.get(e);l.deleteTexture(t.__webglTexture);let n=e.source,r=S.get(n);delete r[t.__cacheKey],h.memory.textures--}function ne(e){let t=f.get(e);if(e.depthTexture&&(e.depthTexture.dispose(),f.remove(e.depthTexture)),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(t.__webglFramebuffer[e]))for(let n=0;n<t.__webglFramebuffer[e].length;n++)l.deleteFramebuffer(t.__webglFramebuffer[e][n]);else l.deleteFramebuffer(t.__webglFramebuffer[e]);t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer[e])}else{if(Array.isArray(t.__webglFramebuffer))for(let e=0;e<t.__webglFramebuffer.length;e++)l.deleteFramebuffer(t.__webglFramebuffer[e]);else l.deleteFramebuffer(t.__webglFramebuffer);if(t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer),t.__webglMultisampledFramebuffer&&l.deleteFramebuffer(t.__webglMultisampledFramebuffer),t.__webglColorRenderbuffer)for(let e=0;e<t.__webglColorRenderbuffer.length;e++)t.__webglColorRenderbuffer[e]&&l.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);t.__webglDepthRenderbuffer&&l.deleteRenderbuffer(t.__webglDepthRenderbuffer)}let n=e.textures;for(let e=0,t=n.length;e<t;e++){let t=f.get(n[e]);t.__webglTexture&&(l.deleteTexture(t.__webglTexture),h.memory.textures--),f.remove(n[e])}f.remove(e)}let F=0;function re(){F=0}function ie(){return F}function ae(e){F=e}function oe(){let e=F;return e>=p.maxTextures&&V(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),F+=1,e}function se(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function I(e,t){let n=f.get(e);if(e.isVideoTexture&&L(e),e.isRenderTargetTexture===!1&&e.isExternalTexture!==!0&&e.version>0&&n.__version!==e.version){let r=e.image;if(r===null)V(`WebGLRenderer: Texture marked for update but no image data found.`);else if(r.complete===!1)V(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ve(n,e,t);return}}else e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null);d.bindTexture(l.TEXTURE_2D,n.__webglTexture,l.TEXTURE0+t)}function ce(e,t){let n=f.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){ve(n,e,t);return}e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null),d.bindTexture(l.TEXTURE_2D_ARRAY,n.__webglTexture,l.TEXTURE0+t)}function le(e,t){let n=f.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){ve(n,e,t);return}d.bindTexture(l.TEXTURE_3D,n.__webglTexture,l.TEXTURE0+t)}function ue(e,t){let n=f.get(e);if(e.isCubeDepthTexture!==!0&&e.version>0&&n.__version!==e.version){ye(n,e,t);return}d.bindTexture(l.TEXTURE_CUBE_MAP,n.__webglTexture,l.TEXTURE0+t)}let de={[e]:l.REPEAT,[t]:l.CLAMP_TO_EDGE,[n]:l.MIRRORED_REPEAT},fe={[r]:l.NEAREST,[i]:l.NEAREST_MIPMAP_NEAREST,[a]:l.NEAREST_MIPMAP_LINEAR,[o]:l.LINEAR,[s]:l.LINEAR_MIPMAP_NEAREST,[c]:l.LINEAR_MIPMAP_LINEAR},pe={512:l.NEVER,519:l.ALWAYS,513:l.LESS,515:l.LEQUAL,514:l.EQUAL,518:l.GEQUAL,516:l.GREATER,517:l.NOTEQUAL};function me(e,t){if(t.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(t.magFilter===1006||t.magFilter===1007||t.magFilter===1005||t.magFilter===1008||t.minFilter===1006||t.minFilter===1007||t.minFilter===1005||t.minFilter===1008)&&V(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),l.texParameteri(e,l.TEXTURE_WRAP_S,de[t.wrapS]),l.texParameteri(e,l.TEXTURE_WRAP_T,de[t.wrapT]),(e===l.TEXTURE_3D||e===l.TEXTURE_2D_ARRAY)&&l.texParameteri(e,l.TEXTURE_WRAP_R,de[t.wrapR]),l.texParameteri(e,l.TEXTURE_MAG_FILTER,fe[t.magFilter]),l.texParameteri(e,l.TEXTURE_MIN_FILTER,fe[t.minFilter]),t.compareFunction&&(l.texParameteri(e,l.TEXTURE_COMPARE_MODE,l.COMPARE_REF_TO_TEXTURE),l.texParameteri(e,l.TEXTURE_COMPARE_FUNC,pe[t.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(t.magFilter===1003||t.minFilter!==1005&&t.minFilter!==1008||t.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(t.anisotropy>1||f.get(t).__currentAnisotropy){let n=u.get(`EXT_texture_filter_anisotropic`);l.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,p.getMaxAnisotropy())),f.get(t).__currentAnisotropy=t.anisotropy}}}function he(e,t){let n=!1;e.__webglInit===void 0&&(e.__webglInit=!0,t.addEventListener(`dispose`,ee));let r=t.source,i=S.get(r);i===void 0&&(i={},S.set(r,i));let a=se(t);if(a!==e.__cacheKey){i[a]===void 0&&(i[a]={texture:l.createTexture(),usedTimes:0},h.memory.textures++,n=!0),i[a].usedTimes++;let r=i[e.__cacheKey];r!==void 0&&(i[e.__cacheKey].usedTimes--,r.usedTimes===0&&P(t)),e.__cacheKey=a,e.__webglTexture=i[a].texture}return n}function ge(e,t,n){return Math.floor(Math.floor(e/n)/t)}function _e(e,t,n,r){let i=e.updateRanges;if(i.length===0)d.texSubImage2D(l.TEXTURE_2D,0,0,0,t.width,t.height,n,r,t.data);else{i.sort((e,t)=>e.start-t.start);let a=0;for(let e=1;e<i.length;e++){let n=i[a],r=i[e],o=n.start+n.count,s=ge(r.start,t.width,4),c=ge(n.start,t.width,4);r.start<=o+1&&s===c&&ge(r.start+r.count-1,t.width,4)===s?n.count=Math.max(n.count,r.start+r.count-n.start):(++a,i[a]=r)}i.length=a+1;let o=d.getParameter(l.UNPACK_ROW_LENGTH),s=d.getParameter(l.UNPACK_SKIP_PIXELS),c=d.getParameter(l.UNPACK_SKIP_ROWS);d.pixelStorei(l.UNPACK_ROW_LENGTH,t.width);for(let e=0,a=i.length;e<a;e++){let a=i[e],o=Math.floor(a.start/4),s=Math.ceil(a.count/4),c=o%t.width,u=Math.floor(o/t.width),f=s;d.pixelStorei(l.UNPACK_SKIP_PIXELS,c),d.pixelStorei(l.UNPACK_SKIP_ROWS,u),d.texSubImage2D(l.TEXTURE_2D,0,c,u,f,1,n,r,t.data)}e.clearUpdateRanges(),d.pixelStorei(l.UNPACK_ROW_LENGTH,o),d.pixelStorei(l.UNPACK_SKIP_PIXELS,s),d.pixelStorei(l.UNPACK_SKIP_ROWS,c)}}function ve(e,t,n){let r=l.TEXTURE_2D;(t.isDataArrayTexture||t.isCompressedArrayTexture)&&(r=l.TEXTURE_2D_ARRAY),t.isData3DTexture&&(r=l.TEXTURE_3D);let i=he(e,t),a=t.source;d.bindTexture(r,e.__webglTexture,l.TEXTURE0+n);let o=f.get(a);if(a.version!==o.__version||i===!0){if(d.activeTexture(l.TEXTURE0+n),!(typeof ImageBitmap<`u`&&t.image instanceof ImageBitmap)){let e=q.getPrimaries(q.workingColorSpace),n=t.colorSpace===``?null:q.getPrimaries(t.colorSpace),r=t.colorSpace===``||e===n?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,r)}d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment);let e=T(t.image,!1,p.maxTextureSize);e=Me(t,e);let s=m.convert(t.format,t.colorSpace),c=m.convert(t.type),u=A(t.internalFormat,s,c,t.normalized,t.colorSpace,t.isVideoTexture);me(r,t);let f,h=t.mipmaps,g=t.isVideoTexture!==!0,_=o.__version===void 0||i===!0,v=a.dataReady,y=M(t,e);if(t.isDepthTexture)u=j(t.format===E,t.type),_&&(g?d.texStorage2D(l.TEXTURE_2D,1,u,e.width,e.height):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,null));else if(t.isDataTexture){if(h.length>0){g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data);t.generateMipmaps=!1}else g?(_&&d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height),v&&_e(t,e,s,c)):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,e.data)}else if(t.isCompressedTexture){if(t.isCompressedArrayTexture){g&&_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,e.depth);for(let n=0,r=h.length;n<r;n++)if(f=h[n],t.format!==1023){if(s!==null){if(g){if(v){if(t.layerUpdates.size>0){let e=Pa(f.width,f.height,t.format,t.type);for(let r of t.layerUpdates){let t=f.data.subarray(r*e/f.data.BYTES_PER_ELEMENT,(r+1)*e/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,r,f.width,f.height,1,s,t)}}else d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,f.data)}}else d.compressedTexImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,f.data,0,0)}else V(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&d.texSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,c,f.data):d.texImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,s,c,f.data);t.layerUpdates.size>0&&t.clearLayerUpdates()}else{g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,n=h.length;e<n;e++)f=h[e],t.format===1023?g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data):s===null?V(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,f.data):d.compressedTexImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,f.data)}}else if(t.isDataArrayTexture){if(g){if(_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,e.width,e.height,e.depth),v){if(t.layerUpdates.size>0){let n=Pa(e.width,e.height,t.format,t.type);for(let r of t.layerUpdates){let t=e.data.subarray(r*n/e.data.BYTES_PER_ELEMENT,(r+1)*n/e.data.BYTES_PER_ELEMENT);d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,r,e.width,e.height,1,s,c,t)}t.clearLayerUpdates()}else d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)}}else d.texImage3D(l.TEXTURE_2D_ARRAY,0,u,e.width,e.height,e.depth,0,s,c,e.data)}else if(t.isData3DTexture)g?(_&&d.texStorage3D(l.TEXTURE_3D,y,u,e.width,e.height,e.depth),v&&d.texSubImage3D(l.TEXTURE_3D,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)):d.texImage3D(l.TEXTURE_3D,0,u,e.width,e.height,e.depth,0,s,c,e.data);else if(t.isFramebufferTexture){if(_){if(g)d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height);else{let t=e.width,n=e.height;for(let e=0;e<y;e++)d.texImage2D(l.TEXTURE_2D,e,u,t,n,0,s,c,null),t>>=1,n>>=1}}}else if(t.isHTMLTexture){if(`texElementImage2D`in l){let n=l.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),e.parentNode!==n){n.appendChild(e),b.add(t),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(l.texElementImage2D.length===3)l.texElementImage2D(l.TEXTURE_2D,l.RGBA8,e);else{let t=l.RGBA,n=l.RGBA,r=l.UNSIGNED_BYTE;l.texElementImage2D(l.TEXTURE_2D,0,t,n,r,e)}l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MIN_FILTER,l.LINEAR),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let e=Ne(h[0]);d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height)}for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,s,c,f):d.texImage2D(l.TEXTURE_2D,e,u,s,c,f);t.generateMipmaps=!1}else if(g){if(_){let t=Ne(e);d.texStorage2D(l.TEXTURE_2D,y,u,t.width,t.height)}v&&d.texSubImage2D(l.TEXTURE_2D,0,0,0,s,c,e)}else d.texImage2D(l.TEXTURE_2D,0,u,s,c,e);D(t)&&O(r),o.__version=a.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function ye(e,t,n){if(t.image.length!==6)return;let r=he(e,t),i=t.source;d.bindTexture(l.TEXTURE_CUBE_MAP,e.__webglTexture,l.TEXTURE0+n);let a=f.get(i);if(i.version!==a.__version||r===!0){d.activeTexture(l.TEXTURE0+n);let e=q.getPrimaries(q.workingColorSpace),o=t.colorSpace===``?null:q.getPrimaries(t.colorSpace),s=t.colorSpace===``||e===o?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,s);let c=t.isCompressedTexture||t.image[0].isCompressedTexture,u=t.image[0]&&t.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!c&&!u?f[e]=T(t.image[e],!0,p.maxCubemapSize):f[e]=u?t.image[e].image:t.image[e],f[e]=Me(t,f[e]);let h=f[0],g=m.convert(t.format,t.colorSpace),_=m.convert(t.type),v=A(t.internalFormat,g,_,t.normalized,t.colorSpace),y=t.isVideoTexture!==!0,b=a.__version===void 0||r===!0,x=i.dataReady,S=M(t,h);me(l.TEXTURE_CUBE_MAP,t);let C;if(c){y&&b&&d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let e=0;e<6;e++){C=f[e].mipmaps;for(let n=0;n<C.length;n++){let r=C[n];t.format===1023?y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,_,r.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,g,_,r.data):g===null?V(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,r.data):d.compressedTexImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,r.data)}}}else{if(C=t.mipmaps,y&&b){C.length>0&&S++;let e=Ne(f[0]);d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,e.width,e.height)}for(let e=0;e<6;e++)if(u){y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,f[e].width,f[e].height,g,_,f[e].data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,f[e].width,f[e].height,0,g,_,f[e].data);for(let t=0;t<C.length;t++){let n=C[t].image[e].image;y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,n.width,n.height,g,_,n.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,n.width,n.height,0,g,_,n.data)}}else{y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,g,_,f[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,g,_,f[e]);for(let t=0;t<C.length;t++){let n=C[t];y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,g,_,n.image[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,g,_,n.image[e])}}}D(t)&&O(l.TEXTURE_CUBE_MAP),a.__version=i.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function be(e,t,n,r,i,a){let o=m.convert(n.format,n.colorSpace),s=m.convert(n.type),c=A(n.internalFormat,o,s,n.normalized,n.colorSpace),u=f.get(t),p=f.get(n);if(p.__renderTarget=t,!u.__hasExternalTextures){let e=Math.max(1,t.width>>a),n=Math.max(1,t.height>>a);i===l.TEXTURE_3D||i===l.TEXTURE_2D_ARRAY?d.texImage3D(i,a,c,e,n,t.depth,0,o,s,null):d.texImage2D(i,a,c,e,n,0,o,s,null)}d.bindFramebuffer(l.FRAMEBUFFER,e),je(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,r,i,p.__webglTexture,0,Ae(t)):(i===l.TEXTURE_2D||i>=l.TEXTURE_CUBE_MAP_POSITIVE_X&&i<=l.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&l.framebufferTexture2D(l.FRAMEBUFFER,r,i,p.__webglTexture,a),d.bindFramebuffer(l.FRAMEBUFFER,null)}function xe(e,t,n){if(l.bindRenderbuffer(l.RENDERBUFFER,e),t.depthBuffer){let r=t.depthTexture,i=r&&r.isDepthTexture?r.type:null,a=j(t.stencilBuffer,i),o=t.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;je(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Ae(t),a,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,Ae(t),a,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,a,t.width,t.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,o,l.RENDERBUFFER,e)}else{let e=t.textures;for(let r=0;r<e.length;r++){let i=e[r],a=m.convert(i.format,i.colorSpace),o=m.convert(i.type),s=A(i.internalFormat,a,o,i.normalized,i.colorSpace);je(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Ae(t),s,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,Ae(t),s,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,s,t.width,t.height)}}l.bindRenderbuffer(l.RENDERBUFFER,null)}function Se(e,t,n){let r=t.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(l.FRAMEBUFFER,e),!(t.depthTexture&&t.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let i=f.get(t.depthTexture);if(i.__renderTarget=t,(!i.__webglTexture||t.depthTexture.image.width!==t.width||t.depthTexture.image.height!==t.height)&&(t.depthTexture.image.width=t.width,t.depthTexture.image.height=t.height,t.depthTexture.needsUpdate=!0),r){if(i.__webglInit===void 0&&(i.__webglInit=!0,t.depthTexture.addEventListener(`dispose`,ee)),i.__webglTexture===void 0){i.__webglTexture=l.createTexture(),d.bindTexture(l.TEXTURE_CUBE_MAP,i.__webglTexture),me(l.TEXTURE_CUBE_MAP,t.depthTexture);let e=m.convert(t.depthTexture.format),n=m.convert(t.depthTexture.type),r;t.depthTexture.format===1026?r=l.DEPTH_COMPONENT24:t.depthTexture.format===1027&&(r=l.DEPTH24_STENCIL8);for(let i=0;i<6;i++)l.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+i,0,r,t.width,t.height,0,e,n,null)}}else I(t.depthTexture,0);let a=i.__webglTexture,o=Ae(t),s=r?l.TEXTURE_CUBE_MAP_POSITIVE_X+n:l.TEXTURE_2D,c=t.depthTexture.format===1027?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;if(t.depthTexture.format===1026)je(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else if(t.depthTexture.format===1027)je(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Ce(e){let t=f.get(e),n=e.isWebGLCubeRenderTarget===!0;if(t.__boundDepthTexture!==e.depthTexture){let n=e.depthTexture;if(t.__depthDisposeCallback&&t.__depthDisposeCallback(),n){let e=()=>{delete t.__boundDepthTexture,delete t.__depthDisposeCallback,n.removeEventListener(`dispose`,e)};n.addEventListener(`dispose`,e),t.__depthDisposeCallback=e}t.__boundDepthTexture=n}if(e.depthTexture&&!t.__autoAllocateDepthBuffer){if(n)for(let n=0;n<6;n++)Se(t.__webglFramebuffer[n],e,n);else{let n=e.texture.mipmaps;n&&n.length>0?Se(t.__webglFramebuffer[0],e,0):Se(t.__webglFramebuffer,e,0)}}else if(n){t.__webglDepthbuffer=[];for(let n=0;n<6;n++)if(d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[n]),t.__webglDepthbuffer[n]===void 0)t.__webglDepthbuffer[n]=l.createRenderbuffer(),xe(t.__webglDepthbuffer[n],e,!1);else{let r=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,i=t.__webglDepthbuffer[n];l.bindRenderbuffer(l.RENDERBUFFER,i),l.framebufferRenderbuffer(l.FRAMEBUFFER,r,l.RENDERBUFFER,i)}}else{let n=e.texture.mipmaps;if(n&&n.length>0?d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[0]):d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer),t.__webglDepthbuffer===void 0)t.__webglDepthbuffer=l.createRenderbuffer(),xe(t.__webglDepthbuffer,e,!1);else{let n=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,r=t.__webglDepthbuffer;l.bindRenderbuffer(l.RENDERBUFFER,r),l.framebufferRenderbuffer(l.FRAMEBUFFER,n,l.RENDERBUFFER,r)}}d.bindFramebuffer(l.FRAMEBUFFER,null)}function we(e,t,n){let r=f.get(e);t!==void 0&&be(r.__webglFramebuffer,e,e.texture,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,0),n!==void 0&&Ce(e)}function Te(e){let t=e.texture,n=f.get(e),r=f.get(t);e.addEventListener(`dispose`,N);let i=e.textures,a=e.isWebGLCubeRenderTarget===!0,o=i.length>1;if(o||(r.__webglTexture===void 0&&(r.__webglTexture=l.createTexture()),r.__version=t.version,h.memory.textures++),a){n.__webglFramebuffer=[];for(let e=0;e<6;e++)if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer[e]=[];for(let r=0;r<t.mipmaps.length;r++)n.__webglFramebuffer[e][r]=l.createFramebuffer()}else n.__webglFramebuffer[e]=l.createFramebuffer()}else{if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer=[];for(let e=0;e<t.mipmaps.length;e++)n.__webglFramebuffer[e]=l.createFramebuffer()}else n.__webglFramebuffer=l.createFramebuffer();if(o)for(let e=0,t=i.length;e<t;e++){let t=f.get(i[e]);t.__webglTexture===void 0&&(t.__webglTexture=l.createTexture(),h.memory.textures++)}if(e.samples>0&&je(e)===!1){n.__webglMultisampledFramebuffer=l.createFramebuffer(),n.__webglColorRenderbuffer=[],d.bindFramebuffer(l.FRAMEBUFFER,n.__webglMultisampledFramebuffer);for(let t=0;t<i.length;t++){let r=i[t];n.__webglColorRenderbuffer[t]=l.createRenderbuffer(),l.bindRenderbuffer(l.RENDERBUFFER,n.__webglColorRenderbuffer[t]);let a=m.convert(r.format,r.colorSpace),o=m.convert(r.type),s=A(r.internalFormat,a,o,r.normalized,r.colorSpace,e.isXRRenderTarget===!0),c=Ae(e);l.renderbufferStorageMultisample(l.RENDERBUFFER,c,s,e.width,e.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+t,l.RENDERBUFFER,n.__webglColorRenderbuffer[t])}l.bindRenderbuffer(l.RENDERBUFFER,null),e.depthBuffer&&(n.__webglDepthRenderbuffer=l.createRenderbuffer(),xe(n.__webglDepthRenderbuffer,e,!0)),d.bindFramebuffer(l.FRAMEBUFFER,null)}}if(a){d.bindTexture(l.TEXTURE_CUBE_MAP,r.__webglTexture),me(l.TEXTURE_CUBE_MAP,t);for(let r=0;r<6;r++)if(t.mipmaps&&t.mipmaps.length>0)for(let i=0;i<t.mipmaps.length;i++)be(n.__webglFramebuffer[r][i],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else be(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);D(t)&&O(l.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(o){for(let t=0,r=i.length;t<r;t++){let r=i[t],a=f.get(r),o=l.TEXTURE_2D;(e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(o=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(o,a.__webglTexture),me(o,r),be(n.__webglFramebuffer,e,r,l.COLOR_ATTACHMENT0+t,o,0),D(r)&&O(o)}d.unbindTexture()}else{let i=l.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(i,r.__webglTexture),me(i,t),t.mipmaps&&t.mipmaps.length>0)for(let r=0;r<t.mipmaps.length;r++)be(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,i,r);else be(n.__webglFramebuffer,e,t,l.COLOR_ATTACHMENT0,i,0);D(t)&&O(i),d.unbindTexture()}e.depthBuffer&&Ce(e)}function Ee(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(D(r)){let t=k(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),O(t),d.unbindTexture()}}}let De=[],Oe=[];function ke(e){if(e.samples>0){if(je(e)===!1){let t=e.textures,n=e.width,r=e.height,i=l.COLOR_BUFFER_BIT,a=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,o=f.get(e),s=t.length>1;if(s)for(let e=0;e<t.length;e++)d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,null),d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,null,0);d.bindFramebuffer(l.READ_FRAMEBUFFER,o.__webglMultisampledFramebuffer);let c=e.texture.mipmaps;c&&c.length>0?d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer[0]):d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer);for(let c=0;c<t.length;c++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(i|=l.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(i|=l.STENCIL_BUFFER_BIT)),s){l.framebufferRenderbuffer(l.READ_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.RENDERBUFFER,o.__webglColorRenderbuffer[c]);let e=f.get(t[c]).__webglTexture;l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,e,0)}l.blitFramebuffer(0,0,n,r,0,0,n,r,i,l.NEAREST),_===!0&&(De.length=0,Oe.length=0,De.push(l.COLOR_ATTACHMENT0+c),e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&(De.push(a),Oe.push(a),l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,Oe)),l.invalidateFramebuffer(l.READ_FRAMEBUFFER,De))}if(d.bindFramebuffer(l.READ_FRAMEBUFFER,null),d.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),s)for(let e=0;e<t.length;e++){d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,o.__webglColorRenderbuffer[e]);let n=f.get(t[e]).__webglTexture;d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,n,0)}d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglMultisampledFramebuffer)}else if(e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&_){let t=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,[t])}}}function Ae(e){return Math.min(p.maxSamples,e.samples)}function je(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function L(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Me(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(q.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&V(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):H(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ne(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=oe,this.resetTextureUnits=re,this.getTextureUnits=ie,this.setTextureUnits=ae,this.setTexture2D=I,this.setTexture2DArray=ce,this.setTexture3D=le,this.setTextureCube=ue,this.rebindTextures=we,this.setupRenderTarget=Te,this.updateRenderTargetMipmap=Ee,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=be,this.useMultisampledRTT=je,this.isReversedDepthBuffer=function(){return d.buffers.depth.getReversed()}}function Vc(e,t){function n(n,r=``){let i,a=q.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Hc=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Uc=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Wc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new si(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new wi({vertexShader:Hc,fragmentShader:Uc,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Nr(new mi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Gc=class extends $e{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,u=null,d=null,f=null,p=null,h=null,g=typeof XRWebGLBinding<`u`,_=new Wc,v={},b=t.getContextAttributes(),x=null,S=null,C=[],D=[],O=new W,k=null,A=null,j=new sa;j.viewport=new Tt;let M=new sa;M.viewport=new Tt;let ee=[j,M],N=new ya,te=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new sn,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new sn,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new sn,C[e]=t),t.getHandSpace()};function ne(e){let t=D.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function F(){r.removeEventListener(`select`,ne),r.removeEventListener(`selectstart`,ne),r.removeEventListener(`selectend`,ne),r.removeEventListener(`squeeze`,ne),r.removeEventListener(`squeezestart`,ne),r.removeEventListener(`squeezeend`,ne),r.removeEventListener(`end`,F),r.removeEventListener(`inputsourceschange`,re);for(let e=0;e<C.length;e++){let t=D[e];t!==null&&(D[e]=null,C[e].disconnect(t))}te=null,P=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,ue.stop(),n.isPresenting=!1,e.setPixelRatio(k),e.setSize(O.width,O.height,!1),A!==null){let e=A.camera;e.fov=A.fov,e.zoom=A.zoom,e.updateProjectionMatrix(),A=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&V(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&V(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(u){if(r=u,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,ne),r.addEventListener(`selectstart`,ne),r.addEventListener(`selectend`,ne),r.addEventListener(`squeeze`,ne),r.addEventListener(`squeezestart`,ne),r.addEventListener(`squeezeend`,ne),r.addEventListener(`end`,F),r.addEventListener(`inputsourceschange`,re),b.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(O),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;b.depth&&(o=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=b.stencil?E:T,a=b.stencil?y:m);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new Dt(f.textureWidth,f.textureHeight,{format:w,type:l,depthTexture:new ai(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Dt(p.framebufferWidth,p.framebufferHeight,{format:w,type:l,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ue.setContext(r),ue.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function re(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=D.indexOf(n);r>=0&&(D[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=D.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=D.length){D.push(n),r=e;break}else if(D[e]===null){D[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let ie=new G,ae=new G;function oe(e,t,n){ie.setFromMatrixPosition(t.matrixWorld),ae.setFromMatrixPosition(n.matrixWorld);let r=ie.distanceTo(ae),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function se(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),N.near=M.near=j.near=t,N.far=M.far=j.far=n,(te!==N.near||P!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),te=N.near,P=N.far),N.layers.mask=e.layers.mask|6,j.layers.mask=N.layers.mask&-5,M.layers.mask=N.layers.mask&-3;let i=e.parent,a=N.cameras;se(N,i);for(let e=0;e<a.length;e++)se(a[e],i);a.length===2?oe(N,j,M):N.projectionMatrix.copy(j.projectionMatrix),A===null&&e.isPerspectiveCamera&&(A={camera:e,fov:e.fov,zoom:e.zoom}),I(e,N,i)};function I(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=nt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(N)},this.getCameraTexture=function(e){return v[e]};let ce=null;function le(t,i){if(u=i.getViewerPose(c||a),h=i,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==N.cameras.length&&(N.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=ee[n];o===void 0&&(o=new sa,o.layers.enable(n),o.viewport=new Tt,ee[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(N.matrix.copy(o.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),i===!0&&N.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new si,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=D[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ce&&ce(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),h=null}let ue=new Ia;ue.setAnimationLoop(le),this.setAnimationLoop=function(e){ce=e},this.dispose=function(){}}},Kc=new At,qc=new K;qc.set(-1,0,0,0,1,0,0,0,1);function Jc(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,bi(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Kc.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(qc),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Yc(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return H(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?V(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):V(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Xc=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Zc=null;function Qc(){return Zc===null&&(Zc=new Ir(Xc,16,16,k,g),Zc.name=`DFG_LUT`,Zc.minFilter=o,Zc.magFilter=o,Zc.wrapS=t,Zc.wrapT=t,Zc.generateMipmaps=!1,Zc.needsUpdate=!0),Zc}var $c=class{constructor(e={}){let{canvas:t=Ke(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:b=l}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);x=n.getContextAttributes().alpha}else x=a;let S=b,C=new Set([j,A,O]),w=new Set([l,m,f,y,_,v]),T=new Uint32Array(4),E=new Int32Array(4),D=new G,k=null,M=null,ee=[],N=[],te=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,ne=!1,F=null,re=null,ie=null,ae=null;this._outputColorSpace=Ie;let oe=0,se=0,I=null,ce=-1,le=null,ue=new Tt,de=new Tt,fe=null,pe=new J(0),me=0,he=t.width,ge=t.height,_e=1,ve=null,ye=null,be=new Tt(0,0,he,ge),xe=new Tt(0,0,he,ge),Se=!1,Ce=new Yr,we=!1,Te=!1,Ee=new At,De=new G,Oe=new Tt,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ae=!1;function je(){return I===null?_e:1}let L=n;function Me(e,n){return t.getContext(e,n)}let Ne,Pe,R,Fe,z,B,Le,Re,ze,Be,Ve,Ue,We,Ge,qe,Ye,Xe,Qe,$e,et,tt,nt,rt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:p};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,at,!1),t.addEventListener(`webglcontextrestored`,ot,!1),t.addEventListener(`webglcontextcreationerror`,st,!1),L===null){let t=`webgl2`;if(L=Me(t,e),L===null)throw Me(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}U()}catch(e){throw t.removeEventListener(`webglcontextlost`,at,!1),t.removeEventListener(`webglcontextrestored`,ot,!1),t.removeEventListener(`webglcontextcreationerror`,st,!1),H(`WebGLRenderer: `+e.message),e}function U(){Ne=new _o(L),Ne.init(),tt=new Vc(L,Ne),Pe=new Ga(L,Ne,e,tt),R=new zc(L,Ne),Pe.reversedDepthBuffer&&h&&R.buffers.depth.setReversed(!0),re=L.createFramebuffer(),ie=L.createFramebuffer(),ae=L.createFramebuffer(),Fe=new bo(L),z=new yc,B=new Bc(L,Ne,R,z,Pe,tt,Fe),Le=new go(P),Re=new La(L),nt=new Ua(L,Re),ze=new vo(L,Re,Fe,nt),Be=new So(L,ze,Re,nt,Fe),Qe=new xo(L,Pe,B),qe=new Ka(z),Ve=new vc(P,Le,Ne,Pe,nt,qe),Ue=new Jc(P,z),We=new Cc,Ge=new Ac(Ne),Xe=new Ha(P,Le,R,Be,x,s),Ye=new Rc(P,Be,Pe),rt=new Yc(L,Fe,Pe,R),$e=new Wa(L,Ne,Fe),et=new yo(L,Ne,Fe),Fe.programs=Ve.programs,P.capabilities=Pe,P.extensions=Ne,P.properties=z,P.renderLists=We,P.shadowMap=Ye,P.state=R,P.info=Fe}S!==1009&&(te=new wo(S,t.width,t.height,o,r,i));let it=new Gc(P,L);this.xr=it,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let e=Ne.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ne.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return _e},this.setPixelRatio=function(e){e!==void 0&&(_e=e,this.setSize(he,ge,!1))},this.getSize=function(e){return e.set(he,ge)},this.setSize=function(e,n,r=!0){if(it.isPresenting){V(`WebGLRenderer: Can't change size while VR device is presenting.`);return}he=e,ge=n,t.width=Math.floor(e*_e),t.height=Math.floor(n*_e),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),te!==null&&te.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(he*_e,ge*_e).floor()},this.setDrawingBufferSize=function(e,n,r){he=e,ge=n,_e=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009){H(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){V(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}te.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(ue)},this.getViewport=function(e){return e.copy(be)},this.setViewport=function(e,t,n,r){e.isVector4?be.set(e.x,e.y,e.z,e.w):be.set(e,t,n,r),R.viewport(ue.copy(be).multiplyScalar(_e).round())},this.getScissor=function(e){return e.copy(xe)},this.setScissor=function(e,t,n,r){e.isVector4?xe.set(e.x,e.y,e.z,e.w):xe.set(e,t,n,r),R.scissor(de.copy(xe).multiplyScalar(_e).round())},this.getScissorTest=function(){return Se},this.setScissorTest=function(e){R.setScissorTest(Se=e)},this.setOpaqueSort=function(e){ve=e},this.setTransparentSort=function(e){ye=e},this.getClearColor=function(e){return e.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(I!==null){let t=I.texture.format;e=C.has(t)}if(e){let e=I.texture.type,t=w.has(e),n=Xe.getClearColor(),r=Xe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,L.clearBufferuiv(L.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,L.clearBufferiv(L.COLOR,0,E))}else r|=L.COLOR_BUFFER_BIT}t&&(r|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&L.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),F=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,at,!1),t.removeEventListener(`webglcontextrestored`,ot,!1),t.removeEventListener(`webglcontextcreationerror`,st,!1),Xe.dispose(),We.dispose(),Ge.dispose(),z.dispose(),Le.dispose(),Be.dispose(),nt.dispose(),rt.dispose(),Ve.dispose(),it.dispose(),it.removeEventListener(`sessionstart`,ft),it.removeEventListener(`sessionend`,pt),mt.stop()};function at(e){e.preventDefault(),Je(`WebGLRenderer: Context Lost.`),ne=!0}function ot(){Je(`WebGLRenderer: Context Restored.`),ne=!1;let e=Fe.autoReset,t=Ye.enabled,n=Ye.autoUpdate,r=Ye.needsUpdate,i=Ye.type;U(),Fe.autoReset=e,Ye.enabled=t,Ye.autoUpdate=n,Ye.needsUpdate=r,Ye.type=i}function st(e){H(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function W(e){let t=e.target;t.removeEventListener(`dispose`,W),ct(t)}function ct(e){lt(e),z.remove(e)}function lt(e){let t=z.get(e).programs;t!==void 0&&(t.forEach(function(e){Ve.releaseProgram(e)}),e.isShaderMaterial&&Ve.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ke);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=wt(e,t,n,r,i);R.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=ze.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;nt.setup(i,r,s,n,c);let h,g=$e;if(c!==null&&(h=Re.get(c),g=et,g.setIndex(h)),i.isMesh)r.wireframe===!0?(R.setLineWidth(r.wireframeLinewidth*je()),g.setMode(L.LINES)):g.setMode(L.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),R.setLineWidth(e*je()),i.isLineSegments?g.setMode(L.LINES):i.isLineLoop?g.setMode(L.LINE_LOOP):g.setMode(L.LINE_STRIP)}else i.isPoints?g.setMode(L.POINTS):i.isSprite&&g.setMode(L.TRIANGLES);if(i.isBatchedMesh){if(Ne.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Re.get(c).bytesPerElement:1,o=z.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(L,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ut(e,t,n,r){F!==null&&e.isNodeMaterial&&F.setObject(r,e),we===!0&&qe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,bt(e,t,r),e.side=0,e.needsUpdate=!0,bt(e,t,r),e.side=2):bt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),F!==null&&F.renderStart(e,t,n),M=Ge.get(n),M.init(t),N.push(M),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(M.pushLight(e),e.castShadow&&M.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(M.pushLight(e),e.castShadow&&M.pushShadow(e))}),M.setupLights(),F!==null&&F.updateLights(M.state.lightsArray),Te=this.localClippingEnabled,we=qe.init(this.clippingPlanes,Te),we===!0&&qe.setGlobalState(this.clippingPlanes,t),F!==null&&Ye.render(M.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ut(o,n,t,e),r.add(o)}else ut(i,n,t,e),r.add(i)}}),M=N.pop(),F!==null&&F.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=z.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Ne.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let K=null;function dt(e){K&&K(e)}function ft(){mt.stop()}function pt(){mt.start()}let mt=new Ia;mt.setAnimationLoop(dt),typeof self<`u`&&mt.setContext(self),this.setAnimationLoop=function(e){K=e,it.setAnimationLoop(e),e===null?mt.stop():mt.start()},it.addEventListener(`sessionstart`,ft),it.addEventListener(`sessionend`,pt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){H(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ne===!0)return;F!==null&&F.renderStart(e,t);let n=it.enabled===!0&&it.isPresenting===!0,r=te!==null&&(I===null||n)&&te.begin(P,I);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(te===null||te.isCompositing()===!1)&&(it.cameraAutoUpdate===!0&&it.updateCamera(t),t=it.getCamera()),e.isScene===!0&&e.onBeforeRender(P,e,t,I),M=Ge.get(e,N.length),M.init(t),M.state.textureUnits=B.getTextureUnits(),N.push(M),Ee.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Ce.setFromProjectionMatrix(Ee,He,t.reversedDepth),Te=this.localClippingEnabled,we=qe.init(this.clippingPlanes,Te),k=We.get(e,ee.length),k.init(),ee.push(k),it.enabled===!0&&it.isPresenting===!0){let e=P.xr.getDepthSensingMesh();e!==null&&ht(e,t,-1/0,P.sortObjects)}ht(e,t,0,P.sortObjects),k.finish(),F!==null&&F.updateLights(M.state.lightsArray),P.sortObjects===!0&&k.sort(ve,ye),Ae=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Ae&&Xe.addToRenderList(k,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),we===!0&&qe.beginShadows();let i=M.state.shadowsArray;if(Ye.render(i,e,t),we===!0&&qe.endShadows(),(r&&te.hasRenderPass())===!1){let n=k.opaque,r=k.transmissive;if(M.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];_t(n,r,e,a)}Ae&&Xe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];gt(k,e,n,n.viewport)}}else r.length>0&&_t(n,r,e,t),Ae&&Xe.render(e),gt(k,e,t)}I!==null&&se===0&&(B.updateMultisampleRenderTarget(I),B.updateRenderTargetMipmap(I)),r&&te.end(P),e.isScene===!0&&e.onAfterRender(P,e,t),nt.resetDefaultState(),ce=-1,le=null,N.pop(),N.length>0?(M=N[N.length-1],B.setTextureUnits(M.state.textureUnits),we===!0&&qe.setGlobalState(P.clippingPlanes,M.state.camera)):M=null,ee.pop(),k=ee.length>0?ee[ee.length-1]:null,F!==null&&F.renderEnd()};function ht(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)M.pushLightProbeGrid(e);else if(e.isLight)M.pushLight(e),e.castShadow&&M.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Ce)){r&&Oe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Ee);let i=Be.update(e),a=e.material;a.visible&&k.push(e,i,a,n,Oe.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Ce))){let i=Be.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Oe.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Oe.copy(e.boundingSphere.center)),Oe.applyMatrix4(e.matrixWorld).applyMatrix4(Ee)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&k.push(e,i,c,n,Oe.z,s,t)}}else a.visible&&k.push(e,i,a,n,Oe.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)ht(i[e],t,n,r)}function gt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;M.setupLightsView(n),we===!0&&qe.setGlobalState(P.clippingPlanes,n),r&&R.viewport(ue.copy(r)),i.length>0&&vt(i,t,n),a.length>0&&vt(a,t,n),o.length>0&&vt(o,t,n),R.buffers.depth.setTest(!0),R.buffers.depth.setMask(!0),R.buffers.color.setMask(!0),R.setPolygonOffset(!1)}function _t(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[r.id]===void 0){let e=Ne.has(`EXT_color_buffer_half_float`)||Ne.has(`EXT_color_buffer_float`);M.state.transmissionRenderTarget[r.id]=new Dt(1,1,{generateMipmaps:!0,type:e?g:l,minFilter:c,samples:Math.max(4,Pe.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:q.workingColorSpace})}let a=M.state.transmissionRenderTarget[r.id],o=r.viewport||ue;a.setSize(o.z*P.transmissionResolutionScale,o.w*P.transmissionResolutionScale);let s=P.getRenderTarget(),u=P.getActiveCubeFace(),d=P.getActiveMipmapLevel();P.setRenderTarget(a),P.getClearColor(pe),me=P.getClearAlpha(),me<1&&P.setClearColor(16777215,.5),P.clear(),Ae&&Xe.render(n);let f=P.toneMapping;P.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),M.setupLightsView(r),we===!0&&qe.setGlobalState(P.clippingPlanes,r),vt(e,n,r),B.updateMultisampleRenderTarget(a),B.updateRenderTargetMipmap(a),Ne.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,yt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(B.updateMultisampleRenderTarget(a),B.updateRenderTargetMipmap(a))}P.setRenderTarget(s,u,d),P.setClearColor(pe,me),p!==void 0&&(r.viewport=p),P.toneMapping=f}function vt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&yt(o,t,n,s,l,c)}}function yt(e,t,n,r,i,a){F!==null&&i.isNodeMaterial&&F.setObject(e,i),e.onBeforeRender(P,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(P,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,P.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,P.renderBufferDirect(n,t,r,i,e,a),i.side=2):P.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(P,t,n,r,i,a)}function bt(e,t,n){t.isScene!==!0&&(t=ke);let r=z.get(e),i=M.state.lights,a=M.state.shadowsArray,o=i.state.version,s=Ve.getParameters(e,i.state,a,t,n,M.state.lightProbeGridArray),c=Ve.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Le.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,W),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return St(e,s),d}else s.uniforms=Ve.getUniforms(e),F!==null&&e.isNodeMaterial&&F.build(e,n,s),e.onBeforeCompile(s,P),d=Ve.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=qe.uniform),St(e,s),r.needsLights=Ot(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=M.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function xt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=js.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function St(e,t){let n=z.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Ct(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function wt(e,t,n,r,i){t.isScene!==!0&&(t=ke),B.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=I===null?P.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:q.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Le.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(h=P.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=z.get(r),y=M.state.lights;if(we===!0&&(Te===!0||e!==le)){let t=e===le&&r.id===ce;qe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==qe.numPlanes||v.numIntersection!==qe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=M.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=bt(r,t,i),F&&r.isNodeMaterial&&F.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(R.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==ce&&(ce=r.id,C=!0),v.needsLights){let e=Ct(M.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||le!==e){R.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(L,`projectionMatrix`,e.projectionMatrix),T.setValue(L,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(L,De.setFromMatrixPosition(e.matrixWorld)),Pe.logarithmicDepthBuffer&&T.setValue(L,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(L,`isOrthographic`,e.isOrthographicCamera===!0),le!==e&&(le=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(L,`sunShadowMap`,y.state.sunShadowMap,B),y.state.directionalShadowMap.length>0&&T.setValue(L,`directionalShadowMap`,y.state.directionalShadowMap,B),y.state.spotShadowMap.length>0&&T.setValue(L,`spotShadowMap`,y.state.spotShadowMap,B),y.state.pointShadowMap.length>0&&T.setValue(L,`pointShadowMap`,y.state.pointShadowMap,B)),i.isSkinnedMesh){T.setOptional(L,i,`bindMatrix`),T.setOptional(L,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(L,`boneTexture`,e.boneTexture,B))}i.isBatchedMesh&&(T.setOptional(L,i,`batchingTexture`),T.setValue(L,`batchingTexture`,i._matricesTexture,B),T.setOptional(L,i,`batchingIdTexture`),T.setValue(L,`batchingIdTexture`,i._indirectTexture,B),T.setOptional(L,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(L,`batchingColorTexture`,i._colorsTexture,B));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&Qe.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(L,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=Qc()),C){if(T.setValue(L,`toneMappingExposure`,P.toneMappingExposure),v.needsLights&&Et(E,w),a&&r.fog===!0&&Ue.refreshFogUniforms(E,a),Ue.refreshMaterialUniforms(E,r,_e,ge,M.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}js.upload(L,xt(v),E,B)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(js.upload(L,xt(v),E,B),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(L,`center`,i.center),T.setValue(L,`modelViewMatrix`,i.modelViewMatrix),T.setValue(L,`normalMatrix`,i.normalMatrix),T.setValue(L,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];rt.update(n,x),rt.bind(n,x)}}return x}function Et(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Ot(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return oe},this.getActiveMipmapLevel=function(){return se},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(e,t,n){let r=z.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),z.get(e.texture).__webglTexture=t,z.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=z.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){I=e,oe=t,se=n;let r=null,i=!1,a=!1;if(e){let o=z.get(e);if(o.__useDefaultFramebuffer!==void 0){R.bindFramebuffer(L.FRAMEBUFFER,o.__webglFramebuffer),ue.copy(e.viewport),de.copy(e.scissor),fe=e.scissorTest,R.viewport(ue),R.scissor(de),R.setScissorTest(fe),ce=-1;return}if(o.__webglFramebuffer===void 0)B.setupRenderTarget(e);else if(o.__hasExternalTextures)B.rebindTextures(e,z.get(e.texture).__webglTexture,z.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&z.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);B.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=z.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&B.useMultisampledRTT(e)===!1?z.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ue.copy(e.viewport),de.copy(e.scissor),fe=e.scissorTest}else ue.copy(be).multiplyScalar(_e).floor(),de.copy(xe).multiplyScalar(_e).floor(),fe=Se;if(n!==0&&(r=re),R.bindFramebuffer(L.FRAMEBUFFER,r)&&R.drawBuffers(e,r),R.viewport(ue),R.scissor(de),R.setScissorTest(fe),i){let r=z.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=z.get(e.textures[t]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=z.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,t.__webglTexture,n)}ce=-1};function kt(e){let t=z.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Pe.textureFormatReadable(e.format),t.__typeReadable=Pe.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){H(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=z.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){R.bindFramebuffer(L.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s);let u=kt(o);if(u.__formatReadable===!1){H(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){H(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&L.readPixels(t,n,r,i,tt.convert(c),tt.convert(l),a)}finally{let e=I===null?null:z.get(I).__webglFramebuffer;R.bindFramebuffer(L.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=z.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){R.bindFramebuffer(L.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s);let d=kt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,f),L.bufferData(L.PIXEL_PACK_BUFFER,a.byteLength,L.STREAM_READ),L.readPixels(t,n,r,i,tt.convert(l),tt.convert(u),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let p=I===null?null:z.get(I).__webglFramebuffer;R.bindFramebuffer(L.FRAMEBUFFER,p);let m=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Ze(L,m,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,f),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,a),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(f),L.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;B.setTexture2D(e,0),L.copyTexSubImage2D(L.TEXTURE_2D,n,0,0,o,s,i,a),R.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=tt.convert(t.format),_=tt.convert(t.type),v;t.isData3DTexture?(B.setTexture3D(t,0),v=L.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(B.setTexture2DArray(t,0),v=L.TEXTURE_2D_ARRAY):(B.setTexture2D(t,0),v=L.TEXTURE_2D),R.activeTexture(L.TEXTURE0),R.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,t.flipY),R.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),R.pixelStorei(L.UNPACK_ALIGNMENT,t.unpackAlignment);let y=R.getParameter(L.UNPACK_ROW_LENGTH),b=R.getParameter(L.UNPACK_IMAGE_HEIGHT),x=R.getParameter(L.UNPACK_SKIP_PIXELS),S=R.getParameter(L.UNPACK_SKIP_ROWS),C=R.getParameter(L.UNPACK_SKIP_IMAGES);R.pixelStorei(L.UNPACK_ROW_LENGTH,h.width),R.pixelStorei(L.UNPACK_IMAGE_HEIGHT,h.height),R.pixelStorei(L.UNPACK_SKIP_PIXELS,l),R.pixelStorei(L.UNPACK_SKIP_ROWS,u),R.pixelStorei(L.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=z.get(e),r=z.get(t),h=z.get(n.__renderTarget),g=z.get(r.__renderTarget);R.bindFramebuffer(L.READ_FRAMEBUFFER,h.__webglFramebuffer),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(e).__webglTexture,i,d+n),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(t).__webglTexture,a,m+n)),L.blitFramebuffer(l,u,o,s,f,p,o,s,L.DEPTH_BUFFER_BIT,L.NEAREST);R.bindFramebuffer(L.READ_FRAMEBUFFER,null),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||z.has(e)){let n=z.get(e),r=z.get(t);R.bindFramebuffer(L.READ_FRAMEBUFFER,ie),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,ae);for(let e=0;e<c;e++)w?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,n.__webglTexture,i),T?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,r.__webglTexture,a),i===0?T?L.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):L.copyTexSubImage2D(v,a,f,p,l,u,o,s):L.blitFramebuffer(l,u,o,s,f,p,o,s,L.COLOR_BUFFER_BIT,L.NEAREST);R.bindFramebuffer(L.READ_FRAMEBUFFER,null),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?L.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h);R.pixelStorei(L.UNPACK_ROW_LENGTH,y),R.pixelStorei(L.UNPACK_IMAGE_HEIGHT,b),R.pixelStorei(L.UNPACK_SKIP_PIXELS,x),R.pixelStorei(L.UNPACK_SKIP_ROWS,S),R.pixelStorei(L.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&L.generateMipmap(v),R.unbindTexture()},this.initRenderTarget=function(e){z.get(e).__webglFramebuffer===void 0&&B.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?B.setTextureCube(e,0):e.isData3DTexture?B.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?B.setTexture2DArray(e,0):B.setTexture2D(e,0),R.unbindTexture()},this.resetState=function(){oe=0,se=0,I=null,R.reset(),nt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return He}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=q._getDrawingBufferColorSpace(e),t.unpackColorSpace=q._getUnpackColorSpace()}},el=Math.PI/180,tl=180/Math.PI,nl=Math.PI*2,rl=9.81;function Z(e,t,n){return e<t?t:e>n?n:e}function il(e,t,n){return e+(t-e)*n}function al(e){return e=(e+Math.PI)%nl,e<0&&(e+=nl),e-Math.PI}function ol(e,t,n){return e<t?Math.min(e+n,t):Math.max(e-n,t)}function sl(e,t){return 1-Math.exp(-e*t)}function cl(e,t,n){let r=Z((n-e)/(t-e),0,1);return r*r*(3-2*r)}function ll(e,t=new G){return t.set(Math.sin(e),0,Math.cos(e))}function ul(e,t=new G){return t.set(-Math.cos(e),0,Math.sin(e))}function dl(e,t){return Math.atan2(e,t)}function fl(e){return Math.round(e).toString().replace(/\B(?=(\d{3})+(?!\d))/g,` `)}var pl=[``,`I`,`II`,`III`,`IV`,`V`,`VI`,`VII`,`VIII`,`IX`,`X`],ml=class{ctx=null;master;sfx;engineBus;ambientBus;uiBus;noise;brown;engine=null;otherEngine=null;ambience=null;volumes={master:.8,sfx:.9,engine:.7,ambient:.5};voiceEnabled=!0;lastVoice=0;unlock(){if(!this.ctx){let e=window.AudioContext??window.webkitAudioContext;if(!e)return;this.ctx=new e;let t=this.ctx;this.master=t.createGain(),this.master.connect(t.destination);let n=t.createDynamicsCompressor();n.threshold.value=-14,n.ratio.value=4,n.connect(this.master),this.sfx=t.createGain(),this.engineBus=t.createGain(),this.ambientBus=t.createGain(),this.uiBus=t.createGain();for(let e of[this.sfx,this.engineBus,this.ambientBus,this.uiBus])e.connect(n);this.noise=this.makeNoise(2,!1),this.brown=this.makeNoise(3,!0),this.applyVolumes()}this.ctx.state===`suspended`&&this.ctx.resume()}get ready(){return!!this.ctx&&this.ctx.state===`running`}setVolumes(e,t,n,r,i){this.volumes={master:e,sfx:t,engine:n,ambient:r},this.voiceEnabled=i,this.applyVolumes()}applyVolumes(){this.ctx&&(this.master.gain.value=this.volumes.master,this.sfx.gain.value=this.volumes.sfx,this.engineBus.gain.value=this.volumes.engine*.6,this.ambientBus.gain.value=this.volumes.ambient*.5,this.uiBus.gain.value=.5)}makeNoise(e,t){let n=this.ctx,r=Math.floor(n.sampleRate*e),i=n.createBuffer(1,r,n.sampleRate),a=i.getChannelData(0),o=0;for(let e=0;e<r;e++){let n=Math.random()*2-1;t?(o=(o+.02*n)/1.02,a[e]=o*3.5):a[e]=n}return i}updateListener(e,t,n){if(!this.ctx)return;let r=this.ctx.listener;r.positionX?(r.positionX.value=e.x,r.positionY.value=e.y,r.positionZ.value=e.z,r.forwardX.value=t.x,r.forwardY.value=t.y,r.forwardZ.value=t.z,r.upX.value=n.x,r.upY.value=n.y,r.upZ.value=n.z):(r.setPosition(e.x,e.y,e.z),r.setOrientation(t.x,t.y,t.z,n.x,n.y,n.z))}panner(e,t=12){let n=this.ctx;if(!e)return this.sfx;let r=n.createPanner();return r.panningModel=`equalpower`,r.distanceModel=`inverse`,r.refDistance=t,r.rolloffFactor=1.1,r.maxDistance=2e3,r.positionX?(r.positionX.value=e.x,r.positionY.value=e.y,r.positionZ.value=e.z):r.setPosition(e.x,e.y,e.z),r.connect(this.sfx),r}noiseBurst(e,t,n,r,i,a,o,s=!1,c=.8){let l=this.ctx,u=l.createBufferSource();u.buffer=s?this.brown:this.noise,u.playbackRate.value=.8+Math.random()*.4;let d=l.createBiquadFilter();d.type=r,d.Q.value=c,d.frequency.setValueAtTime(i,t),d.frequency.exponentialRampToValueAtTime(Math.max(20,a),t+n);let f=l.createGain();f.gain.setValueAtTime(1e-4,t),f.gain.exponentialRampToValueAtTime(o,t+.004),f.gain.exponentialRampToValueAtTime(1e-4,t+n),u.connect(d).connect(f).connect(e),u.start(t,Math.random()*1),u.stop(t+n+.05)}tone(e,t,n,r,i,a,o){let s=this.ctx,c=s.createOscillator();c.type=n,c.frequency.setValueAtTime(r,t),c.frequency.exponentialRampToValueAtTime(Math.max(10,i),t+a);let l=s.createGain();l.gain.setValueAtTime(1e-4,t),l.gain.exponentialRampToValueAtTime(o,t+.005),l.gain.exponentialRampToValueAtTime(1e-4,t+a),c.connect(l).connect(e),c.start(t),c.stop(t+a+.05)}distanceChain(e,t){let n=this.ctx,r=this.panner(e);if(!e||t<60)return{dest:r,delay:0};let i=n.createBiquadFilter();return i.type=`lowpass`,i.frequency.value=Z(9e3-t*14,500,9e3),i.connect(r),{dest:i,delay:Math.min(1.5,t/343)}}shot(e,t,n,r){if(!this.ready)return;let i=this.ctx,{dest:a,delay:o}=this.distanceChain(r?null:e,n),s=i.currentTime+o,c=Z(t/100,.4,1.8),l=r?.9:.75;this.noiseBurst(a,s,.35+c*.5,`lowpass`,5e3,180,l),this.noiseBurst(a,s,1.2+c*.8,`lowpass`,900,60,l*.6,!0),this.tone(a,s,`sine`,110/c+40,32,.45+c*.3,l*.9)}reload(){if(!this.ready)return;let e=this.ctx.currentTime;this.noiseBurst(this.uiBus,e,.05,`bandpass`,3200,2400,.5,!1,3),this.noiseBurst(this.uiBus,e+.11,.07,`bandpass`,2e3,1600,.6,!1,4),this.tone(this.uiBus,e+.11,`triangle`,1800,1500,.12,.12)}hit(e,t,n,r){if(!this.ready)return;let i=this.ctx,{dest:a,delay:o}=this.distanceChain(r?null:e,n),s=i.currentTime+o,c=r?1:.7;switch(t){case`ricochet`:{let e=i.createOscillator();e.type=`sine`,e.frequency.setValueAtTime(2600+Math.random()*600,s),e.frequency.exponentialRampToValueAtTime(700,s+.45);let t=i.createOscillator();t.frequency.value=38;let n=i.createGain();n.gain.value=60,t.connect(n).connect(e.frequency);let r=i.createGain();r.gain.setValueAtTime(1e-4,s),r.gain.exponentialRampToValueAtTime(.28*c,s+.01),r.gain.exponentialRampToValueAtTime(1e-4,s+.5),e.connect(r).connect(a),e.start(s),t.start(s),e.stop(s+.55),t.stop(s+.55),this.noiseBurst(a,s,.08,`highpass`,3e3,5e3,.4*c);break}case`noPenetration`:for(let[e,t]of[[310,.3],[472,.22],[829,.16],[1291,.1]])this.tone(a,s,`sine`,e,e*.97,.9,t*c);this.noiseBurst(a,s,.15,`bandpass`,1800,900,.5*c,!1,2);break;case`penetration`:case`heSplash`:this.noiseBurst(a,s,.5,`lowpass`,2500,200,.85*c);for(let[e,t]of[[523,.18],[739,.14],[1187,.1]])this.tone(a,s,`square`,e,e*.8,.25,t*c*.5);this.tone(a,s,`sine`,90,40,.4,.6*c);break;case`critical`:this.noiseBurst(a,s,.3,`bandpass`,900,400,.6*c,!1,1.5),this.tone(a,s,`sawtooth`,180,60,.3,.2*c);break;default:this.noiseBurst(a,s,.4,`lowpass`,1500,150,.6*c,!0)}}explosion(e,t,n){if(!this.ready)return;let r=this.ctx,{dest:i,delay:a}=this.distanceChain(e,n),o=r.currentTime+a;this.noiseBurst(i,o,1.4+t*.8,`lowpass`,1800,50,.9,!0),this.noiseBurst(i,o,.6,`lowpass`,6e3,300,.6),this.tone(i,o,`sine`,70,25,1.2,.9)}moduleDamage(){if(!this.ready)return;let e=this.ctx.currentTime;this.noiseBurst(this.uiBus,e,.25,`bandpass`,700,300,.7,!1,2),this.tone(this.uiBus,e,`square`,220,110,.2,.12)}destructible(e,t,n){if(!this.ready)return;let{dest:r,delay:i}=this.distanceChain(e,t),a=this.ctx.currentTime+i;if(n===`tree`||n===`fence`||n===`crate`||n===`house`){this.noiseBurst(r,a,.6,`bandpass`,900,250,.6,!1,1.2);for(let e=0;e<4;e++)this.noiseBurst(r,a+.08*e+Math.random()*.05,.08,`bandpass`,1400,800,.4,!1,4)}else this.noiseBurst(r,a,.5,`lowpass`,2500,300,.6),this.tone(r,a,`triangle`,400,120,.4,.2)}ui(e){if(!this.ready)return;let t=this.ctx.currentTime,n=this.uiBus;e===`click`?this.tone(n,t,`triangle`,900,700,.06,.2):e===`buy`?(this.tone(n,t,`triangle`,660,660,.12,.25),this.tone(n,t+.1,`triangle`,990,990,.18,.25)):e===`error`?this.tone(n,t,`square`,220,160,.2,.15):e===`spotted`?(this.tone(n,t,`sine`,1200,1200,.08,.3),this.tone(n,t+.12,`sine`,1200,1200,.08,.3)):this.tone(n,t,`sawtooth`,600,400,.3,.12)}radio(e){if(!this.ready)return;let t=this.ctx.currentTime;if(this.noiseBurst(this.uiBus,t,.18,`bandpass`,2200,1800,.25,!1,2),this.tone(this.uiBus,t+.05,`sine`,1050,1050,.07,.15),this.voiceEnabled&&typeof speechSynthesis<`u`&&performance.now()-this.lastVoice>2500){this.lastVoice=performance.now();try{let t=new SpeechSynthesisUtterance(e.replace(/^[^:]+:\s*/,``));t.lang=`ru-RU`,t.rate=1.15,t.pitch=.8,t.volume=.6*this.volumes.master,speechSynthesis.cancel(),speechSynthesis.speak(t)}catch{}}}createEngine(e){if(!this.ctx)return null;let t=this.ctx,n=t.createOscillator();n.type=`sawtooth`;let r=t.createOscillator();r.type=`sawtooth`,r.detune.value=18;let i=t.createOscillator();i.type=`square`;let a=t.createBiquadFilter();a.type=`lowpass`,a.Q.value=2;let o=t.createGain();o.gain.value=0;let s=t.createGain();s.gain.value=.4,n.connect(a),r.connect(a),i.connect(s).connect(a),a.connect(o);let c=t.createBufferSource();c.buffer=this.brown,c.loop=!0;let l=t.createGain();l.gain.value=0,c.connect(l);let u=t.createBufferSource();u.buffer=this.noise,u.loop=!0;let d=t.createBiquadFilter();d.type=`bandpass`,d.frequency.value=700,d.Q.value=.9;let f=t.createGain();f.gain.value=0;let p=t.createOscillator();p.type=`square`;let m=t.createGain();m.gain.value=0,p.connect(m).connect(f.gain),u.connect(d).connect(f);let h=null,g=e?h=t.createPanner():this.engineBus;h&&(h.panningModel=`equalpower`,h.refDistance=8,h.rolloffFactor=1.3,h.connect(this.engineBus)),o.connect(g),l.connect(g),f.connect(g);for(let e of[n,r,i,p])e.start();return c.start(),u.start(),{osc1:n,osc2:r,sub:i,filter:a,gain:o,rumble:c,rumbleGain:l,track:u,trackFilter:d,trackGain:f,trackLfo:p,trackLfoGain:m,panner:h,gear:1,rpm:700,shiftDip:0}}driveEngine(e,t,n,r){let i=this.ctx,a=t.data.hull.transmission.gears,o=Math.max(1,t.stats.maxSpeed),s=Z(Math.abs(t.speedLong)/o,0,1),c=Z(Math.floor(s*a*.999)+1,1,a),l=!1;c!==e.gear&&(l=!0,e.shiftDip=.35,e.gear=c),e.shiftDip=Math.max(0,e.shiftDip-n);let u=s*a-(c-1),d=Math.abs(t.input.throttle),f=700+Z(u,0,1)*1900+d*350;e.shiftDip>0&&(f*=.78),(!t.alive||!t.stats.canMove)&&(f=t.alive?650:0),e.rpm+=(f-e.rpm)*Math.min(1,n*6);let p=e.rpm/60*3,m=i.currentTime;e.osc1.frequency.setTargetAtTime(p,m,.03),e.osc2.frequency.setTargetAtTime(p*.5,m,.03),e.sub.frequency.setTargetAtTime(p*.25,m,.03),e.filter.frequency.setTargetAtTime(250+d*900+e.rpm*.25,m,.05);let h=+!!t.alive;e.gain.gain.setTargetAtTime((.12+d*.13)*r*h,m,.08),e.rumbleGain.gain.setTargetAtTime((.25+d*.35)*r*h,m,.08);let g=(Math.abs(t.trackSpeedL)+Math.abs(t.trackSpeedR))/2,_=Z(g/10,0,1)*.35*r;return e.trackGain.gain.setTargetAtTime(_*.6,m,.1),e.trackLfoGain.gain.setTargetAtTime(_*.4,m,.1),e.trackLfo.frequency.setTargetAtTime(2+g*2.4,m,.1),e.trackFilter.frequency.setTargetAtTime(500+g*40,m,.1),l}updateEngines(e,t,n){if(this.ready){if(e&&(this.engine??=this.createEngine(!1),this.engine&&this.driveEngine(this.engine,e,n,1))){let e=this.ctx.currentTime;this.noiseBurst(this.engineBus,e,.12,`bandpass`,400,250,.35,!1,1.5)}if(this.otherEngine??=this.createEngine(!0),this.otherEngine){if(t){let e=this.otherEngine.panner;e.positionX?(e.positionX.value=t.position.x,e.positionY.value=t.position.y+1,e.positionZ.value=t.position.z):e.setPosition(t.position.x,t.position.y+1,t.position.z),this.driveEngine(this.otherEngine,t,n,.8)}else{let e=this.ctx.currentTime;for(let t of[this.otherEngine.gain,this.otherEngine.rumbleGain,this.otherEngine.trackGain])t.gain.setTargetAtTime(0,e,.2)}}}}setAmbience(e){if(!this.ctx)return;if(this.ambience){for(let e of this.ambience.nodes)e instanceof AudioScheduledSourceNode&&e.stop(),e.disconnect();this.ambience=null}if(!e)return;let t=this.ctx,n=[],r=t.createBufferSource();r.buffer=this.brown,r.loop=!0;let i=t.createBiquadFilter();i.type=`lowpass`,i.frequency.value=e===`waves`?700:380;let a=t.createGain();a.gain.value=e===`wind`?.5:.25;let o=t.createOscillator();o.frequency.value=e===`waves`?.12:.07;let s=t.createGain();if(s.gain.value=e===`waves`?.25:.12,o.connect(s).connect(a.gain),r.connect(i).connect(a).connect(this.ambientBus),r.start(),o.start(),n.push(r,i,a,o,s),e===`industry`){let e=t.createOscillator();e.frequency.value=50;let r=t.createGain();r.gain.value=.05,e.connect(r).connect(this.ambientBus),e.start(),n.push(e,r)}this.ambience={nodes:n,kind:e,timer:2}}updateAmbience(e){if(!this.ready||!this.ambience)return;let t=this.ambience;if(t.timer-=e,t.timer>0)return;t.timer=2+Math.random()*6;let n=this.ctx.currentTime;if(t.kind===`birds`||t.kind===`waves`){let e=2+Math.floor(Math.random()*4),r=t.kind===`waves`?1400:2800+Math.random()*1500;for(let i=0;i<e;i++)this.tone(this.ambientBus,n+i*.13,`sine`,r,r*(t.kind===`waves`?.7:1.3),.09,.05)}else(t.kind===`industry`||t.kind===`city`)&&this.noiseBurst(this.ambientBus,n,.4,`bandpass`,600+Math.random()*800,300,.08,!1,3)}stopBattle(){if(this.ctx){for(let e of[this.engine,this.otherEngine])if(e){for(let t of[e.osc1,e.osc2,e.sub,e.trackLfo,e.rumble,e.track])try{t.stop()}catch{}e.gain.disconnect(),e.rumbleGain.disconnect(),e.trackGain.disconnect(),e.panner?.disconnect()}this.engine=null,this.otherEngine=null,this.setAmbience(null)}}},hl=class{state;constructor(e){this.state=e>>>0||2654435769}next(){let e=this.state+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}range(e,t){return e+(t-e)*this.next()}int(e,t){return Math.floor(this.range(e,t+1))}chance(e){return this.next()<e}pick(e){return e[Math.floor(this.next()*e.length)]}gaussian(){let e=Math.max(1e-9,this.next()),t=this.next();return Math.sqrt(-2*Math.log(e))*Math.cos(2*Math.PI*t)}shuffle(e){for(let t=e.length-1;t>0;t--){let n=Math.floor(this.next()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e}};function gl(e){let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}var _l=[{id:`ussr`,name:`СССР`,short:`СССР`,colors:{base:`#4f5a33`,dark:`#353d22`,light:`#6c7647`,accent:`#b8322a`},flag:[`#b8322a`,`#d9b13b`,`#b8322a`],flavor:{hullArmor:1.08,turretArmor:1.15,slope:5,hp:1,alpha:1.1,penetration:1,reload:1.06,accuracy:1.12,aimTime:1.08,mobility:1.02,view:.96,depression:.7,shellVelocity:.95},names:{main:[`ЛТ-1 «Искра»`,`ЛТ-2 «Стриж»`,`ЛТ-3 «Сапсан»`,`СТ-4 «Вихрь»`,`СТ-5 «Буревестник»`,`СТ-6 «Гроза»`,`СТ-7 «Ураган»`,`СТ-8 «Метель»`,`СТ-9 «Шторм»`,`СТ-10 «Цунами»`],light:[`ЛТ-4 «Ласка»`,`ЛТ-5 «Горностай»`,`ЛТ-6 «Куница»`,`ЛТ-7 «Соболь»`,`ЛТ-8 «Росомаха»`],heavy:[`ТТ-5 «Утёс»`,`ТТ-6 «Бастион»`,`ТТ-7 «Цитадель»`,`ТТ-8 «Монолит»`,`ТТ-9 «Курган»`,`ТТ-10 «Исполин»`],td:[`ПТ-4 «Шершень»`,`ПТ-5 «Оса»`,`ПТ-6 «Гадюка»`,`ПТ-7 «Кобра»`,`ПТ-8 «Фаланга»`,`ПТ-9 «Тарантул»`,`ПТ-10 «Василиск»`],spg:[`САУ-4 «Молот»`,`САУ-5 «Набат»`,`САУ-6 «Гром»`,`САУ-7 «Зарево»`]},modulePrefix:{gun:`ОП`,turret:`Башня`,engine:`Д`,suspension:`Ходовая`,radio:`Р`},crewNames:[`Ковалёв`,`Петренко`,`Савельев`,`Громов`,`Белов`,`Шубин`,`Рябов`,`Зуев`,`Лыков`,`Носов`]},{id:`germany`,name:`Германия`,short:`ГЕР`,colors:{base:`#8a7d57`,dark:`#5e5539`,light:`#a99c74`,accent:`#2c2c2c`},flag:[`#1d1d1d`,`#c2272d`,`#e8b923`],flavor:{hullArmor:1.05,turretArmor:1,slope:-8,hp:1,alpha:.95,penetration:1.08,reload:1,accuracy:.88,aimTime:.94,mobility:.93,view:1.06,depression:1,shellVelocity:1.1},names:{main:[`LK-1 «Igel»`,`LK-2 «Dachs»`,`LK-3 «Iltis»`,`MK-4 «Habicht»`,`MK-5 «Sperber»`,`MK-6 «Bussard»`,`MK-7 «Milan»`,`MK-8 «Adler»`,`MK-9 «Greif»`,`MK-10 «Drache»`],light:[`LK-4 «Hermelin»`,`LK-5 «Frettchen»`,`LK-6 «Zobel»`,`LK-7 «Vielfraß»`,`LK-8 «Schakal»`],heavy:[`SK-5 «Fels»`,`SK-6 «Burg»`,`SK-7 «Bollwerk»`,`SK-8 «Festung»`,`SK-9 «Koloss»`,`SK-10 «Titan»`],td:[`JK-4 «Biene»`,`JK-5 «Spinne»`,`JK-6 «Natter»`,`JK-7 «Viper»`,`JK-8 «Kreuzotter»`,`JK-9 «Mamba»`,`JK-10 «Lindwurm»`],spg:[`AK-4 «Hammer»`,`AK-5 «Amboss»`,`AK-6 «Donner»`,`AK-7 «Blitz»`]},modulePrefix:{gun:`KwG`,turret:`Turm`,engine:`HM`,suspension:`Laufwerk`,radio:`FuG`},crewNames:[`Bauer`,`Keller`,`Vogt`,`Hartmann`,`Lenz`,`Brandt`,`Seidel`,`Kraus`,`Engel`,`Roth`]},{id:`usa`,name:`США`,short:`США`,colors:{base:`#5b5f3c`,dark:`#3e4129`,light:`#787c55`,accent:`#e8e8e8`},flag:[`#2f4a8a`,`#f2f2f2`,`#b0262f`],flavor:{hullArmor:.92,turretArmor:1.3,slope:0,hp:1.06,alpha:1,penetration:1,reload:.98,accuracy:1,aimTime:1,mobility:1.04,view:1,depression:1.3,shellVelocity:1},names:{main:[`XL1 «Scout»`,`XL2 «Ranger»`,`XL3 «Pathfinder»`,`XM4 «Bronco»`,`XM5 «Stallion»`,`XM6 «Thunderbird»`,`XM7 «Falcon»`,`XM8 «Raptor»`,`XM9 «Condor»`,`XM10 «Eagle Prime»`],light:[`XL4 «Coyote»`,`XL5 «Jackal»`,`XL6 «Ocelot»`,`XL7 «Bobcat»`,`XL8 «Cougar»`],heavy:[`XH5 «Rampart»`,`XH6 «Fortress»`,`XH7 «Bulwark»`,`XH8 «Juggernaut»`,`XH9 «Colossus»`,`XH10 «Goliath»`],td:[`XT4 «Rattler»`,`XT5 «Copperhead»`,`XT6 «Sidewinder»`,`XT7 «Diamondback»`,`XT8 «Cottonmouth»`,`XT9 «Kingsnake»`,`XT10 «Anaconda»`],spg:[`XA4 «Longbow»`,`XA5 «Ballista»`,`XA6 «Trebuchet»`,`XA7 «Catapult»`]},modulePrefix:{gun:`XG`,turret:`Turret`,engine:`AE`,suspension:`VVSS-X`,radio:`SCR-X`},crewNames:[`Miller`,`Walker`,`Hayes`,`Brooks`,`Turner`,`Price`,`Dawson`,`Fletcher`,`Mason`,`Reed`]},{id:`uk`,name:`Великобритания`,short:`ВБР`,colors:{base:`#6b6a45`,dark:`#47462d`,light:`#8d8b62`,accent:`#d8d0b0`},flag:[`#1f3d7a`,`#e9e9e9`,`#c3262e`],flavor:{hullArmor:1,turretArmor:1.05,slope:-4,hp:1,alpha:.88,penetration:1.04,reload:.86,accuracy:.86,aimTime:.92,mobility:.94,view:1.02,depression:1.25,shellVelocity:1.02},names:{main:[`Mk.I «Sparrow»`,`Mk.II «Robin»`,`Mk.III «Kestrel»`,`Mk.IV «Harrier»`,`Mk.V «Merlin»`,`Mk.VI «Peregrine»`,`Mk.VII «Gyrfalcon»`,`Mk.VIII «Osprey»`,`Mk.IX «Albatross»`,`Mk.X «Sovereign»`],light:[`Mk.IV-L «Fox»`,`Mk.V-L «Badger»`,`Mk.VI-L «Stoat»`,`Mk.VII-L «Otter»`,`Mk.VIII-L «Wolfhound»`],heavy:[`HV.5 «Warden»`,`HV.6 «Keeper»`,`HV.7 «Guardian»`,`HV.8 «Templar»`,`HV.9 «Highlander»`,`HV.10 «Monarch»`],td:[`AT.4 «Pike»`,`AT.5 «Halberd»`,`AT.6 «Glaive»`,`AT.7 «Claymore»`,`AT.8 «Broadsword»`,`AT.9 «Lance»`,`AT.10 «Greatsword»`],spg:[`SP.4 «Thunderer»`,`SP.5 «Drummer»`,`SP.6 «Bombard»`,`SP.7 «Culverin»`]},modulePrefix:{gun:`QF`,turret:`Turret`,engine:`RM`,suspension:`Bogie`,radio:`WS`},crewNames:[`Ashford`,`Barnes`,`Collins`,`Davies`,`Ellis`,`Foster`,`Grant`,`Hughes`,`Irving`,`Jenkins`]},{id:`france`,name:`Франция`,short:`ФРА`,colors:{base:`#5d6650`,dark:`#3f4636`,light:`#7d866d`,accent:`#2a3f7a`},flag:[`#23408e`,`#f2f2f2`,`#d5263a`],flavor:{hullArmor:.78,turretArmor:.82,slope:2,hp:.97,alpha:1,penetration:1.02,reload:1,accuracy:.95,aimTime:.98,mobility:1.16,view:1.04,depression:1.1,shellVelocity:1.05,magazine:{fromTier:6,classes:[`LT`,`MT`,`HT`],size:3,interShot:2.2}},names:{main:[`CL-1 «Moineau»`,`CL-2 «Pinson»`,`CL-3 «Alouette»`,`CM-4 «Faucon»`,`CM-5 «Épervier»`,`CM-6 «Gerfaut»`,`CM-7 «Mistral»`,`CM-8 «Tramontane»`,`CM-9 «Sirocco»`,`CM-10 «Tempête»`],light:[`CL-4 «Renard»`,`CL-5 «Furet»`,`CL-6 «Belette»`,`CL-7 «Genette»`,`CL-8 «Guépard»`],heavy:[`CLD-5 «Rempart»`,`CLD-6 «Donjon»`,`CLD-7 «Citadelle»`,`CLD-8 «Forteresse»`,`CLD-9 «Bastille»`,`CLD-10 «Colosse»`],td:[`CA-4 «Frelon»`,`CA-5 «Guêpe»`,`CA-6 «Vipère»`,`CA-7 «Aspic»`,`CA-8 «Mante»`,`CA-9 «Taon»`,`CA-10 «Dard»`],spg:[`AA-4 «Mortier»`,`AA-5 «Obusier»`,`AA-6 «Bombarde»`,`AA-7 «Couleuvrine»`]},modulePrefix:{gun:`CN`,turret:`Tourelle`,engine:`MT`,suspension:`Train`,radio:`ER`},crewNames:[`Moreau`,`Laurent`,`Girard`,`Rousseau`,`Fontaine`,`Mercier`,`Lefèvre`,`Garnier`,`Chevalier`,`Blanc`]},{id:`japan`,name:`Япония`,short:`ЯП`,colors:{base:`#7c7349`,dark:`#544d30`,light:`#9e9468`,accent:`#c8312f`},flag:[`#f4f4f4`,`#c8312f`,`#f4f4f4`],flavor:{hullArmor:.95,turretArmor:.95,slope:-2,hp:1.08,alpha:1.1,penetration:.96,reload:1.04,accuracy:1.04,aimTime:1.02,mobility:.98,view:1,depression:1.25,shellVelocity:.98},names:{main:[`KS-1 «Suzume»`,`KS-2 «Tsubame»`,`KS-3 «Hayabusa»`,`CS-4 «Taka»`,`CS-5 «Washi»`,`CS-6 «Kaze»`,`CS-7 «Raijin»`,`CS-8 «Fūjin»`,`CS-9 «Ryūsei»`,`CS-10 «Tenrai»`],light:[`KS-4 «Kitsune»`,`KS-5 «Tanuki»`,`KS-6 «Itachi»`,`KS-7 «Ōkami»`,`KS-8 «Tora»`],heavy:[`OS-5 «Iwa»`,`OS-6 «Shiro»`,`OS-7 «Tetsu»`,`OS-8 «Yama»`,`OS-9 «Kongō»`,`OS-10 «Fudō»`],td:[`TS-4 «Hachi»`,`TS-5 «Kumo»`,`TS-6 «Mamushi»`,`TS-7 «Habu»`,`TS-8 «Sasori»`,`TS-9 «Mukade»`,`TS-10 «Orochi»`],spg:[`HS-4 «Taiko»`,`HS-5 «Kaminari»`,`HS-6 «Inazuma»`,`HS-7 «Kazan»`]},modulePrefix:{gun:`Hō`,turret:`Hōtō`,engine:`DK`,suspension:`Kidō`,radio:`Musen`},crewNames:[`Tanaka`,`Sato`,`Kato`,`Mori`,`Ishii`,`Ogawa`,`Fujita`,`Endo`,`Kimura`,`Ueda`]}],vl=(e,t,n)=>Array.from({length:t-e+1},(t,r)=>[e+r,n]),yl=[{key:`light`,row:0,steps:vl(4,8,`LT`),parent:{line:`main`,tier:3}},{key:`main`,row:1,steps:[...vl(1,3,`LT`),...vl(4,10,`MT`)],parent:null},{key:`heavy`,row:2,steps:vl(5,10,`HT`),parent:{line:`main`,tier:4}},{key:`td`,row:3,steps:vl(4,10,`TD`),parent:{line:`main`,tier:3}},{key:`spg`,row:4,steps:vl(4,7,`SPG`),parent:{line:`main`,tier:3}}],bl={ussr:{heavy:{armor:1.06,turretArmor:1.1,accuracy:1.05,premiumShell:`APCR`},td:{alpha:1.08,armor:1.05},"td:10":{armor:1.25,hp:1.05},light:{speed:1.05}},germany:{main:{screens:!0},heavy:{screens:!0,armor:1.05,accuracy:.95},td:{armor:1.12,screens:!0,pen:1.04},spg:{reload:.95}},usa:{td:{hasTurret:!0,armor:.85,premiumShell:`HEAT`,camo:.9},heavy:{turretArmor:1.15,premiumShell:`HEAT`,hp:1.04},main:{premiumShell:`HEAT`}},uk:{heavy:{armor:1.12,speed:.92,reload:.95},td:{armor:1.25,speed:.82,hasTurret:!0,camo:.85},"td:10":{armor:1.35,hp:1.1},light:{premiumShell:`APCR`}},france:{heavy:{armor:.95,speed:1.08,premiumShell:`HEAT`},light:{speed:1.12,view:1.05},td:{premiumShell:`HEAT`,speed:1.1,armor:.85}},japan:{heavy:{hp:1.08,armor:1.08,alpha:1.08,speed:.9,premiumShell:`HEAT`},td:{alpha:1.1,camo:1.05},main:{premiumShell:`HEAT`}}},xl=[{id:`ussr_prem8`,name:`СТ-8П «Гарпун»`,nation:`ussr`,cls:`MT`,tier:8,parents:[],treeRow:5,premium:!0,tweak:{armor:1.1,alpha:1.05},description:`Премиум-машина: повышенный доход кредитов.`},{id:`germany_prem7`,name:`SK-7P «Wächter»`,nation:`germany`,cls:`HT`,tier:7,parents:[],treeRow:5,premium:!0,tweak:{armor:1.15,screens:!0},description:`Премиум-машина: повышенный доход кредитов.`},{id:`usa_prem6`,name:`XT6P «Ironhide»`,nation:`usa`,cls:`TD`,tier:6,parents:[],treeRow:5,premium:!0,tweak:{hasTurret:!0,premiumShell:`HEAT`},description:`Премиум-машина: повышенный доход кредитов.`}];function Sl(){let e=[];for(let t of _l){let n=bl[t.id]??{};for(let r of yl){let i=t.names[r.key];if(!i||i.length!==r.steps.length)throw Error(`Nation ${t.id} has ${i?.length??0} names for line ${r.key}, expected ${r.steps.length}`);r.steps.forEach(([a,o],s)=>{let c=`${t.id}_${r.key}${a}`,l;l=s>0?[`${t.id}_${r.key}${r.steps[s-1][0]}`]:r.parent?[`${t.id}_${r.parent.line}${r.parent.tier}`]:[],e.push({id:c,name:i[s],nation:t.id,cls:o,tier:a,parents:l,treeRow:r.row,tweak:{...n[r.key],...n[`${r.key}:${a}`]}})})}}return[...e,...xl]}var Cl={LT:{cls:`LT`,name:`Лёгкий танк`,role:`Разведка, обход флангов, засвет`,hpMul:.82,massBase:7,massPerTier:2.2,specificPower:24,maxSpeed:64,reverseSpeed:22,hullTraverse:52,turretTraverse:46,armorFrontBase:13,armorFrontPerTier:3.6,sideRatio:.75,upperAngle:50,lowerAngle:40,penMul:.88,alphaMul:.8,dpmMul:.92,accuracy:.42,aimTime:1.9,elevation:20,depression:8,ammoCapacity:70,viewRange:410,camo:{stationary:.4,moving:.38},dims:{length:4.6,width:2.5,height:.95},dispersionMove:.14,hasTurret:!0,traverseLimit:180},MT:{cls:`MT`,name:`Средний танк`,role:`Универсальный боец, поддержка и манёвр`,hpMul:1,massBase:9,massPerTier:4.2,specificPower:18,maxSpeed:54,reverseSpeed:20,hullTraverse:44,turretTraverse:40,armorFrontBase:16,armorFrontPerTier:9.5,sideRatio:.6,upperAngle:56,lowerAngle:48,penMul:1,alphaMul:1,dpmMul:1,accuracy:.38,aimTime:2.1,elevation:20,depression:8,ammoCapacity:60,viewRange:385,camo:{stationary:.26,moving:.19},dims:{length:5.4,width:2.8,height:1.05},dispersionMove:.17,hasTurret:!0,traverseLimit:180},HT:{cls:`HT`,name:`Тяжёлый танк`,role:`Прорыв, удержание направления, танкование`,hpMul:1.32,massBase:18,massPerTier:6.3,specificPower:12.5,maxSpeed:38,reverseSpeed:14,hullTraverse:27,turretTraverse:27,armorFrontBase:28,armorFrontPerTier:16.5,sideRatio:.55,upperAngle:48,lowerAngle:50,penMul:1.1,alphaMul:1.3,dpmMul:1.05,accuracy:.4,aimTime:2.5,elevation:18,depression:7,ammoCapacity:45,viewRange:370,camo:{stationary:.12,moving:.06},dims:{length:6.4,width:3.3,height:1.2},dispersionMove:.2,hasTurret:!0,traverseLimit:180},TD:{cls:`TD`,name:`ПТ-САУ`,role:`Огневая поддержка из засады, высокий урон`,hpMul:.95,massBase:10,massPerTier:4.6,specificPower:15,maxSpeed:44,reverseSpeed:16,hullTraverse:33,turretTraverse:30,armorFrontBase:18,armorFrontPerTier:13,sideRatio:.45,upperAngle:55,lowerAngle:45,penMul:1.22,alphaMul:1.38,dpmMul:1.18,accuracy:.33,aimTime:1.9,elevation:16,depression:7,ammoCapacity:40,viewRange:365,camo:{stationary:.46,moving:.27},dims:{length:6,width:3,height:1},dispersionMove:.2,hasTurret:!1,traverseLimit:12},SPG:{cls:`SPG`,name:`САУ`,role:`Навесной огонь с дальних дистанций`,hpMul:.68,massBase:9,massPerTier:3.4,specificPower:15,maxSpeed:46,reverseSpeed:16,hullTraverse:34,turretTraverse:16,armorFrontBase:10,armorFrontPerTier:2.5,sideRatio:.8,upperAngle:30,lowerAngle:30,penMul:.6,alphaMul:2.6,dpmMul:.62,accuracy:.72,aimTime:4.6,elevation:50,depression:2,ammoCapacity:30,viewRange:320,camo:{stationary:.34,moving:.17},dims:{length:5.6,width:2.9,height:1.1},dispersionMove:.3,hasTurret:!1,traverseLimit:18}},wl={AP:{kind:`AP`,name:`Бронебойный`,short:`ББ`,penMul:1,damageMul:1,velocityMul:1,massMul:1,dragCd:.3,normalization:5,ricochetAngle:70,velocityPenExponent:1.43,priceMul:1,premium:!1,color:`#ffd27a`},APCR:{kind:`APCR`,name:`Подкалиберный`,short:`БП`,penMul:1.32,damageMul:1,velocityMul:1.28,massMul:.55,dragCd:.36,normalization:2,ricochetAngle:70,velocityPenExponent:1.6,priceMul:3.2,premium:!0,color:`#9fe8ff`},HE:{kind:`HE`,name:`Осколочно-фугасный`,short:`ОФ`,penMul:.5,damageMul:1.32,velocityMul:.92,massMul:1.05,dragCd:.38,normalization:0,ricochetAngle:90,velocityPenExponent:0,priceMul:.85,premium:!1,color:`#ff9a4a`},HEAT:{kind:`HEAT`,name:`Кумулятивный`,short:`КС`,penMul:1.28,damageMul:1,velocityMul:.8,massMul:.9,dragCd:.4,normalization:0,ricochetAngle:85,velocityPenExponent:0,priceMul:3,premium:!0,color:`#ff7ad2`}},Tl=.5,El=[100,150,230,330,450,610,800,1040,1330,1680,2080],Dl=[30,40,55,75,110,150,190,230,280,330,390],Ol=[30,38,52,68,90,115,145,175,205,235,265],kl=[1200,1300,1450,1600,1750,1900,2050,2250,2500,2800,3150],Al=[0,0,3e3,12e3,35e3,8e4,15e4,26e4,42e4,65e4,95e4],jl=[0,0,400,1400,3200,6500,12e3,2e4,32e3,48e3,7e4],Ml=[20,37,45,50,57,75,76,85,88,90,100,105,107,120,122,128,130,150,152,155,180];function Nl(e,t){let n=Z(t,0,e.length-1),r=Math.floor(n),i=n-r;return r>=e.length-1?e[e.length-1]:e[r]*(1-i)+e[r+1]*i}function Pl(e,t){let n=t?50+e*.18:25+e**.72*1.2,r=Ml[0];for(let e of Ml)Math.abs(e-n)<Math.abs(r-n)&&(r=e);return r}var Fl=e=>Math.round(e/5)*5,Il=e=>Math.round(e/10)*10;function Ll(e,t){if(t<=2)return e===`LT`?[`commander`,`driver`,`gunner`]:[`commander`,`driver`,`gunner`,`loader`];switch(e){case`LT`:return[`commander`,`gunner`,`driver`,`radioman`];case`TD`:return[`commander`,`gunner`,`driver`,`loader`];default:return[`commander`,`gunner`,`driver`,`loader`,`radioman`]}}function Rl(e,t,n,r,i,a,o){let s=wl[t],c=15e-6*n**3,l=Math.max(.3,c*s.massMul),u=Math.PI*(n/2e3)**2,d=.6125*s.dragCd*u/l,f=r*s.penMul;t===`HE`&&(f=Math.max(r*.35,n*.5));let p=i*s.damageMul;o&&t!==`HE`&&(p=i*.85),o&&t===`HE`&&(p=i);let m=a*(o?t===`HE`?1:1.08:s.velocityMul);return{id:`${e}_${t}`,kind:t,name:`${s.name} ${n} мм`,caliber:n,penetration:Math.round(f),damage:Math.round(p),velocity:Math.round(m),mass:Math.round(l*100)/100,dragK:d,gravityScale:o?5.2:1.5,normalization:s.normalization,ricochetAngle:s.ricochetAngle,explosionRadius:t===`HE`?(.5+n/75)*(o?1.8:1):0,price:Math.round(p*(o?.9:1.4)*s.priceMul),premium:s.premium}}function zl(e,t,n,r){let i=Cl[e.cls],a=e.nation.flavor,o=e.tweak,s=e.cls===`SPG`,c=`${e.tankId}_gun${n}`,l=Fl(Nl(Dl,t)*i.alphaMul*a.alpha*(o.alpha??1)),u=Math.round(Nl(Ol,t)*i.penMul*a.penetration*(o.pen??1)),d=Pl(l,s),f=Nl(kl,t)*i.dpmMul,p=Z(60*l/f*a.reload*(o.reload??1),1.6,45),m=null,h=o.magazine??(a.magazine&&e.tier>=a.magazine.fromTier&&a.magazine.classes.includes(e.cls)&&!r?{size:a.magazine.size+ +(e.tier>=9),interShot:a.magazine.interShot}:null);h&&(m={size:h.size,interShot:h.interShot},p=p*h.size*1.05);let g=s?165+t*7:(560+42*t)*a.shellVelocity*(e.cls===`TD`?1.08:e.cls===`HT`?.95:1),_=o.premiumShell??(e.cls===`HT`||e.cls===`TD`?`HEAT`:`APCR`),v=(s?[`HE`,`AP`,`HEAT`]:[`AP`,_,`HE`]).map(e=>Rl(c,e,d,u,l,g,s)),y=s?26:e.cls===`TD`?58:e.cls===`HT`?46:e.cls===`LT`?44:52;return{id:c,slot:`gun`,name:`${e.nation.modulePrefix.gun} ${d} мм L/${y}${r?``:` М`}`,tier:Math.max(1,Math.round(t)),caliber:d,ammo:v,reloadTime:Math.round(p*100)/100,magazine:m,accuracy:Math.round(i.accuracy*a.accuracy*(1-.012*t)*(r?1.06:1)*(o.accuracy??1)*1e3)/1e3,aimTime:Math.round(i.aimTime*a.aimTime*(r?1.1:1)*100)/100,elevation:i.elevation,depression:Math.round(i.depression*a.depression),ammoCapacity:Math.round(Z(i.ammoCapacity*Math.sqrt(76/Math.max(d,40)),18,120)),barrelLength:Z(d/1e3*y,1.4,6.8),artillery:s,mass:Math.round(d**2*24e-5*100)/100,price:r?0:Math.round(Al[e.tier]*.14+1500),researchXp:r?0:Math.round(jl[e.tier]*.14+150)}}function Bl(e,t){let n=Cl[e.cls],r=t.flavor,i=e.tweak??{},a=e.tier,o=i.size??1,s=Il(Nl(El,a)*n.hpMul*r.hp*(i.hp??1)),c=n.armorFrontBase+n.armorFrontPerTier*a,l=c*r.hullArmor*(i.armor??1),u={upperFront:Math.round(l),lowerFront:Math.round(l*.8),side:Math.round(Math.max(10,l*n.sideRatio)),rear:Math.round(Math.max(8,l*.4)),roof:Math.round(Z(l*.18,8,40)),bottom:Math.round(Z(l*.15,8,35))},d=(n.dims.length+.2*a)*o,f=(n.dims.width+.06*a)*o,p=(n.dims.height+.03*a)*o,m=i.hasTurret??n.hasTurret,h={tankId:e.id,nation:t,cls:e.cls,tweak:i,tier:a},g=[zl(h,Math.max(.6,a-.65),0,!0),zl(h,a,1,!1)],_=c*r.turretArmor*(i.turretArmor??1)*(i.armor??1)*(e.cls===`HT`?1.25:e.cls===`TD`?1.15:1.1),v=n=>{let r=n?.94:1;if(!m){let t=e.cls===`SPG`;return{length:d*(t?.38:.45),width:f*(t?.72:.78),height:(t?.95:.75)+.02*a,frontAngle:t?10:20,slope:t?.05:.22,offsetZ:t?-d*.22:d*.12}}return{length:f*(e.cls===`HT`?.7:.62)*r,width:f*(e.cls===`HT`?.66:.6)*r,height:(.55+.025*a)*(e.cls===`HT`?1.15:1)*r,frontAngle:t.id===`ussr`?34:t.id===`germany`?12:24,slope:t.id===`ussr`?.3:t.id===`germany`?.08:.18,offsetZ:e.cls===`HT`?-d*.02:d*.05}},y=(o,c)=>{let l=Math.round(_*(c&&m?.85:1)*(e.cls===`SPG`?.6:1));return{id:`${e.id}_turret${o}`,slot:`turret`,name:m?`${t.modulePrefix.turret} ${e.tier}-${o+1}`:`Рубка`,tier:Math.max(1,c?a-1:a),armor:{front:l,side:Math.round(Math.max(10,l*(e.cls===`TD`?.45:.62))),rear:Math.round(Math.max(8,l*.42)),roof:e.cls===`SPG`?6:Math.round(Z(l*.18,8,45)),mantlet:Math.round(l*.55)},shape:v(c),traverseSpeed:Math.round((n.turretTraverse*(c?.88:1)+(a-5)*.4)*(m&&e.cls===`TD`?.8:1)),viewRange:Math.round(n.viewRange*r.view*(i.view??1)*(c?.95:1)+a*2),hpBonus:c||!m?0:Il(s*.06),guns:c&&m?[g[0].id]:g.map(e=>e.id),mass:Math.round(f*f*.25*(1+l/120)*(m?1:.6)*100)/100,price:c?0:Math.round(Al[a]*.1+1e3),researchXp:c?0:Math.round(jl[a]*.1+100)}},b=m?[y(0,!0),y(1,!1)]:[y(0,!0)],x=(n.massBase+n.massPerTier*a)*o,S=g[0].mass+b[0].mass+.6+.4,C=Math.max(3,x-S),w=C+S,T=C+g[1].mass+b[b.length-1].mass+.7+.45,E=n.specificPower*x*r.mobility*(i.speed??1),D=[0,1].map(n=>({id:`${e.id}_engine${n}`,slot:`engine`,name:`${t.modulePrefix.engine}-${Math.round(E*(n===0?.86:1))}`,tier:Math.max(1,a-+(n===0)),power:Math.round(E*(n===0?.86:1)),fireChance:n===0?.2:.15,mass:n===0?.6:.7,price:n===0?0:Math.round(Al[a]*.08+800),researchXp:n===0?0:Math.round(jl[a]*.08+80)})),O=e.cls===`LT`?1.6:e.cls===`HT`?2.2:1.9,k=[0,1].map(o=>({id:`${e.id}_susp${o}`,slot:`suspension`,name:`${t.modulePrefix.suspension} ${e.tier}-${o+1}`,tier:Math.max(1,a-+(o===0)),maxLoad:Math.round((o===0?w+(T-w)*.45+.1:T+1.5)*100)/100,traverseSpeed:Math.round(n.hullTraverse*r.mobility*(o===0?.88:1)*(i.speed??1)),resistance:o===0?{hard:1,medium:1.2,soft:O}:{hard:.95,medium:1.1,soft:O*.9},dispersionMove:Math.round(n.dispersionMove*(o===0?1.1:1)*1e3)/1e3,dispersionTraverse:Math.round(n.dispersionMove*.9*(o===0?1.1:1)*1e3)/1e3,mass:.4+o*.05,price:o===0?0:Math.round(Al[a]*.07+700),researchXp:o===0?0:Math.round(jl[a]*.07+70)})),A=[0,1].map(n=>({id:`${e.id}_radio${n}`,slot:`radio`,name:`${t.modulePrefix.radio}-${a}${n===0?`A`:`M`}`,tier:Math.max(1,a-+(n===0)),range:Math.round((300+45*a)*(n===0?.8:1)),mass:.05,price:n===0?0:Math.round(Al[a]*.04+400),researchXp:n===0?0:Math.round(jl[a]*.04+40)})),j=4+Math.floor(a/3),M=Z(1/o,.8,1.2),ee=e.premium??!1;return{id:e.id,name:e.name,nation:t.id,cls:e.cls,tier:a,premium:ee,description:e.description??`${n.name} ${t.name}. ${n.role}.`,hull:{mass:Math.round(C*100)/100,hp:s,armor:u,angles:{upperFront:Z(n.upperAngle+r.slope,10,68),lowerFront:Z(n.lowerAngle+r.slope*.5,10,65)},dims:{length:d,width:f,height:p,clearance:.42+.01*a,noseHeight:.42},trackWidth:f*.19,trackArmor:Math.round(10+2*a),screens:i.screens&&a>=4?Math.round(5+a):0,transmission:{name:`${j}-ступ. механическая`,gears:j,efficiency:.68+.01*a},maxSpeed:Math.round(n.maxSpeed*r.mobility*(i.speed??1)+a*.3),reverseSpeed:Math.round(n.reverseSpeed*(i.speed??1))},hasTurret:m,traverseLimit:m?180:n.traverseLimit,modules:{gun:g,turret:b,engine:D,suspension:k,radio:A},crew:Ll(e.cls,a),camo:{stationary:Math.round(n.camo.stationary*(i.camo??1)*M*1e3)/1e3,moving:Math.round(n.camo.moving*(i.camo??1)*M*1e3)/1e3,firingPenalty:Z(.25+g[1].caliber/400,.3,.75)},price:ee?Math.round(Al[a]*1.6):Al[a],researchXp:ee?0:jl[a],parents:e.parents,treeRow:e.treeRow}}var Vl={ground:`grass`,secondary:`dirt`,steep:`stone`,noiseAmp:9,noiseScale:.0045,sky:{top:`#3d6fb8`,horizon:`#bcd3e6`,fog:`#c4d4de`,fogDensity:.0011},sun:{elevation:48,azimuth:135,color:`#fff2dc`,intensity:2.6},ambient:{sky:`#b9d3f0`,ground:`#5a5236`,intensity:.9},treeKinds:[`broadleaf`,`birch`],ambience:`birds`,waterColor:`#3c6670`},Hl=[{id:`steppe`,name:`Ковыльная степь`,description:`Холмистая степь с рекой, двумя деревнями и открытыми полями — простор для разведки и снайперов.`,size:1e3,seed:1101,biome:Vl,waterLevel:8,features:[{type:`hill`,at:[-260,40],radius:170,height:26},{type:`hill`,at:[230,-90],radius:150,height:20},{type:`hill`,at:[40,270],radius:120,height:16},{type:`hill`,at:[-60,-300],radius:110,height:12},{type:`ridge`,points:[[330,-320],[360,0],[320,300]],width:60,height:14},{type:`river`,points:[[-520,130],[-260,70],[-40,-10],[200,40],[520,-30]],width:20,depth:1.5},{type:`road`,points:[[0,-500],[10,-220],[70,-20],[40,220],[0,500]],width:9,surface:`dirt`},{type:`road`,points:[[-500,-120],[-140,-70],[70,-20]],width:7,surface:`dirt`},{type:`village`,at:[-140,-80],radius:75,houses:14,style:`wood`},{type:`village`,at:[170,210],radius:65,houses:11,style:`wood`},{type:`field`,at:[200,-250],size:[180,120],surface:`dirt`,rotation:.3},{type:`field`,at:[-260,280],size:[160,140],surface:`dirt`,rotation:-.2},{type:`forest`,at:[-320,-260],radius:95,density:.5,kind:`birch`},{type:`forest`,at:[300,330],radius:85,density:.5,kind:`broadleaf`},{type:`forest`,at:[-380,330],radius:70,density:.55,kind:`broadleaf`},{type:`bushes`,at:[-60,20],radius:160,count:70},{type:`bushes`,at:[260,40],radius:120,count:45},{type:`bushes`,at:[-260,120],radius:120,count:40},{type:`rocks`,at:[230,-90],radius:120,count:18,size:3},{type:`cars`,at:[-140,-80],radius:70,count:5},{type:`crates`,at:[170,210],radius:50,count:8}],spawns:{a:[0,-418],b:[0,418]},bases:{a:[10,-380],b:[0,385],neutral:[70,-20]},lanes:{heavy:[[-150,-280],[-150,-90],[-200,120],[-120,320]],light:[[230,-280],[300,-40],[250,180],[200,330]],center:[[20,-250],[70,-40],[40,200],[10,330]]},sniperSpots:{a:[[-60,-300],[230,-170],[-260,-60]],b:[[40,300],[-260,160],[300,260]]},scoutSpots:{a:[[-60,-60],[150,-40]],b:[[60,60],[-150,60]]}},{id:`city`,name:`Старый Вейсбург`,description:`Плотная городская застройка, узкие улицы и площади. Рай для тяжёлых танков, ловушка для САУ.`,size:820,seed:2203,biome:{...Vl,ground:`dirt`,secondary:`grass`,noiseAmp:3,noiseScale:.004,sky:{top:`#4f6f95`,horizon:`#c7cdd2`,fog:`#b9bfc4`,fogDensity:.0016},ambience:`city`,treeKinds:[`broadleaf`]},waterLevel:6,features:[{type:`town`,at:[0,0],size:[560,520],block:64,style:`stone`,ruined:.25},{type:`road`,points:[[0,-410],[0,410]],width:14,surface:`asphalt`},{type:`road`,points:[[-410,0],[410,0]],width:14,surface:`asphalt`},{type:`river`,points:[[-420,300],[-200,330],[100,300],[420,340]],width:16,depth:1.3},{type:`hill`,at:[-320,-320],radius:90,height:10},{type:`hill`,at:[320,320],radius:90,height:10},{type:`forest`,at:[330,-300],radius:70,density:.45,kind:`broadleaf`},{type:`forest`,at:[-330,280],radius:70,density:.45,kind:`broadleaf`},{type:`ruins`,at:[0,0],radius:240,count:30},{type:`cars`,at:[0,0],radius:260,count:30},{type:`barricades`,at:[0,0],radius:200,count:22},{type:`crates`,at:[0,0],radius:240,count:20},{type:`bushes`,at:[-330,-280],radius:80,count:25},{type:`bushes`,at:[330,280],radius:80,count:25}],spawns:{a:[0,-335],b:[0,335]},bases:{a:[0,-310],b:[0,310],neutral:[0,0]},lanes:{heavy:[[-120,-220],[-130,-60],[-120,100],[-80,240]],light:[[220,-250],[250,-40],[240,160],[200,270]],center:[[0,-230],[0,-40],[10,120],[0,250]]},sniperSpots:{a:[[-320,-320],[300,-280]],b:[[320,320],[-300,270]]},scoutSpots:{a:[[-200,-150],[200,-150]],b:[[200,150],[-200,150]]}},{id:`desert`,name:`Барханы Эль-Харад`,description:`Песчаные дюны, скалистые плато и оазис с глинобитной деревней.`,size:1e3,seed:3307,biome:{ground:`sand`,secondary:`stone`,steep:`stone`,noiseAmp:7,noiseScale:.004,sky:{top:`#5a86c2`,horizon:`#ead9b8`,fog:`#e3d2b0`,fogDensity:.0012},sun:{elevation:62,azimuth:160,color:`#fff0d0`,intensity:3},ambient:{sky:`#d9d4c3`,ground:`#a07f54`,intensity:1},treeKinds:[`palm`],ambience:`wind`,waterColor:`#3f7a78`},waterLevel:6,features:[{type:`dunes`,at:[-200,0],radius:330,height:9,direction:.6},{type:`dunes`,at:[260,120],radius:260,height:7,direction:.4},{type:`plateau`,at:[250,-160],radius:110,height:22},{type:`plateau`,at:[-260,230],radius:100,height:20},{type:`mountains`,at:[-380,-330],radius:150,height:40},{type:`lake`,at:[40,40],radius:45,depth:2.5},{type:`village`,at:[60,-40],radius:90,houses:16,style:`adobe`},{type:`forest`,at:[40,40],radius:85,density:.3,kind:`palm`},{type:`road`,points:[[-500,-60],[-150,-50],[60,-40],[260,-10],[500,30]],width:9,surface:`dirt`},{type:`rocks`,at:[250,-160],radius:140,count:30,size:4},{type:`rocks`,at:[-260,230],radius:130,count:26,size:4},{type:`rocks`,at:[0,0],radius:450,count:40,size:3},{type:`ruins`,at:[-60,200],radius:60,count:10},{type:`bushes`,at:[60,0],radius:160,count:50},{type:`crates`,at:[60,-40],radius:80,count:10},{type:`cars`,at:[60,-40],radius:80,count:4}],spawns:{a:[-60,-418],b:[60,418]},bases:{a:[-60,-380],b:[60,380],neutral:[60,-40]},lanes:{heavy:[[-50,-260],[60,-100],[80,120],[60,300]],light:[[-260,-260],[-320,0],[-260,230],[-150,330]],center:[[150,-280],[250,-160],[280,100],[180,320]]},sniperSpots:{a:[[250,-160],[-300,-250]],b:[[-260,230],[300,250]]},scoutSpots:{a:[[-120,-60],[200,-60]],b:[[120,80],[-200,60]]}},{id:`winter`,name:`Северный перевал`,description:`Заснеженные холмы, замёрзшее озеро и хвойные леса. Снег замедляет и заносит танки.`,size:1e3,seed:4409,biome:{ground:`snow`,secondary:`snow`,steep:`stone`,noiseAmp:12,noiseScale:.0045,sky:{top:`#7f97b3`,horizon:`#dfe6ee`,fog:`#dde4ec`,fogDensity:.0018},sun:{elevation:22,azimuth:200,color:`#fbe8d6`,intensity:2},ambient:{sky:`#d6e2f2`,ground:`#a5acb8`,intensity:1.15},treeKinds:[`pine`],ambience:`wind`,waterColor:`#8fb0c4`},waterLevel:7,features:[{type:`lake`,at:[-40,30],radius:150,depth:2,frozen:!0},{type:`hill`,at:[-320,-150],radius:180,height:32},{type:`hill`,at:[300,150],radius:190,height:30},{type:`hill`,at:[250,-300],radius:120,height:18},{type:`hill`,at:[-250,320],radius:120,height:18},{type:`forest`,at:[-330,-150],radius:140,density:.55,kind:`pine`},{type:`forest`,at:[320,160],radius:140,density:.55,kind:`pine`},{type:`forest`,at:[150,-150],radius:80,density:.45,kind:`pine`},{type:`forest`,at:[-150,220],radius:80,density:.45,kind:`pine`},{type:`village`,at:[180,-40],radius:70,houses:12,style:`wood`},{type:`village`,at:[-230,100],radius:60,houses:9,style:`wood`},{type:`road`,points:[[0,-500],[100,-250],[180,-40],[120,200],[0,500]],width:8,surface:`dirt`},{type:`rocks`,at:[-320,-150],radius:150,count:25,size:3.5},{type:`bushes`,at:[0,0],radius:300,count:60},{type:`barricades`,at:[180,-40],radius:80,count:10}],spawns:{a:[-80,-418],b:[80,418]},bases:{a:[-80,-380],b:[80,380],neutral:[-40,30]},lanes:{heavy:[[60,-280],[180,-100],[160,100],[100,300]],light:[[-250,-320],[-380,0],[-300,220],[-150,350]],center:[[-80,-250],[-40,30],[-20,220],[60,330]]},sniperSpots:{a:[[-320,-150],[250,-300]],b:[[300,150],[-250,320]]},scoutSpots:{a:[[-100,-100],[80,-120]],b:[[100,140],[-80,150]]}},{id:`forest`,name:`Чернолесье`,description:`Густые леса, поляны и болото. Маскировка решает всё — засады на каждом шагу.`,size:1e3,seed:5501,biome:{...Vl,ground:`grass`,secondary:`mud`,noiseAmp:10,sky:{top:`#45698f`,horizon:`#b7c8c9`,fog:`#a9bab3`,fogDensity:.0019},treeKinds:[`pine`,`broadleaf`,`birch`],waterColor:`#2f4a3f`},waterLevel:7,features:[{type:`forest`,at:[-280,-200],radius:170,density:.65,kind:`pine`},{type:`forest`,at:[280,200],radius:170,density:.65,kind:`pine`},{type:`forest`,at:[-300,250],radius:150,density:.6,kind:`broadleaf`},{type:`forest`,at:[300,-250],radius:150,density:.6,kind:`broadleaf`},{type:`forest`,at:[0,0],radius:90,density:.5,kind:`birch`},{type:`field`,at:[120,40],size:[220,160],surface:`mud`,rotation:.4},{type:`lake`,at:[140,40],radius:60,depth:1.2},{type:`hill`,at:[-150,-50],radius:130,height:18},{type:`hill`,at:[180,-380],radius:100,height:14},{type:`hill`,at:[-180,380],radius:100,height:14},{type:`road`,points:[[-500,0],[-200,-40],[0,0],[200,40],[500,0]],width:8,surface:`dirt`},{type:`road`,points:[[0,-500],[-40,-200],[0,0],[40,200],[0,500]],width:8,surface:`dirt`},{type:`village`,at:[-120,180],radius:60,houses:9,style:`wood`},{type:`village`,at:[130,-170],radius:60,houses:9,style:`wood`},{type:`bushes`,at:[0,0],radius:420,count:120},{type:`rocks`,at:[-150,-50],radius:120,count:14,size:3}],spawns:{a:[0,-420],b:[0,420]},bases:{a:[0,-390],b:[0,390],neutral:[0,0]},lanes:{heavy:[[-60,-250],[-150,-40],[-120,180],[-40,330]],light:[[200,-300],[330,0],[200,250],[80,350]],center:[[40,-250],[10,-10],[40,200],[0,340]]},sniperSpots:{a:[[-150,-60],[180,-360]],b:[[-180,360],[160,150]]},scoutSpots:{a:[[-50,-80],[100,-40]],b:[[60,90],[-100,50]]}},{id:`industrial`,name:`Сталелитейный комбинат`,description:`Цеха, трубы, железнодорожные пути и контейнеры. Ближний бой среди бетона и металла.`,size:900,seed:6607,biome:{ground:`dirt`,secondary:`asphalt`,steep:`stone`,noiseAmp:4,noiseScale:.004,sky:{top:`#5d6a78`,horizon:`#c2bcb0`,fog:`#a8a39b`,fogDensity:.0019},sun:{elevation:38,azimuth:120,color:`#ffe6c8`,intensity:2.3},ambient:{sky:`#bfc5cc`,ground:`#5f5548`,intensity:.95},treeKinds:[`dead`,`birch`],ambience:`industry`,waterColor:`#40504c`},waterLevel:5,features:[{type:`industrial`,at:[0,0],size:[520,420]},{type:`rail`,points:[[-450,-60],[450,-60]]},{type:`rail`,points:[[-450,70],[450,70]]},{type:`road`,points:[[0,-450],[0,450]],width:12,surface:`asphalt`},{type:`hill`,at:[-300,-300],radius:110,height:14},{type:`hill`,at:[300,300],radius:110,height:14},{type:`hill`,at:[330,-280],radius:90,height:10},{type:`river`,points:[[-450,330],[0,300],[450,340]],width:14,depth:1.3},{type:`crates`,at:[0,0],radius:300,count:50},{type:`cars`,at:[0,0],radius:260,count:14},{type:`barricades`,at:[0,0],radius:260,count:20},{type:`ruins`,at:[-250,150],radius:80,count:10},{type:`forest`,at:[-330,-320],radius:70,density:.4,kind:`birch`},{type:`forest`,at:[330,300],radius:70,density:.4,kind:`dead`},{type:`bushes`,at:[0,0],radius:400,count:50}],spawns:{a:[0,-378],b:[0,378]},bases:{a:[0,-340],b:[0,340],neutral:[0,0]},lanes:{heavy:[[-150,-250],[-160,-60],[-150,120],[-90,280]],light:[[250,-250],[320,0],[260,200],[150,300]],center:[[40,-250],[0,0],[40,200],[0,300]]},sniperSpots:{a:[[-300,-300],[330,-280]],b:[[300,300],[-300,250]]},scoutSpots:{a:[[-100,-120],[150,-100]],b:[[100,140],[-150,120]]}},{id:`mountains`,name:`Каменный хребет`,description:`Высокие хребты, узкие перевалы и деревня в долине. Высоты дают огромное преимущество.`,size:1e3,seed:7703,biome:{...Vl,ground:`grass`,secondary:`stone`,noiseAmp:14,noiseScale:.005,sky:{top:`#3a65a8`,horizon:`#c9d8e6`,fog:`#c0cfdc`,fogDensity:9e-4},treeKinds:[`pine`,`birch`]},waterLevel:6,features:[{type:`mountains`,at:[-330,0],radius:220,height:75},{type:`mountains`,at:[340,60],radius:200,height:65},{type:`ridge`,points:[[-100,-200],[60,-120],[200,-180]],width:70,height:24,rough:1},{type:`ridge`,points:[[-200,200],[-40,140],[120,210]],width:70,height:22,rough:1},{type:`valley`,points:[[0,-500],[-40,-250],[20,0],[-20,250],[0,500]],width:90,depth:6},{type:`river`,points:[[0,-520],[-40,-250],[20,0],[-20,250],[0,520]],width:14,depth:1.2},{type:`village`,at:[70,20],radius:70,houses:12,style:`stone`},{type:`forest`,at:[-200,-330],radius:110,density:.55,kind:`pine`},{type:`forest`,at:[220,330],radius:110,density:.55,kind:`pine`},{type:`forest`,at:[-330,0],radius:160,density:.3,kind:`pine`},{type:`road`,points:[[60,-500],[80,-250],[70,20],[60,250],[40,500]],width:8,surface:`dirt`},{type:`rocks`,at:[0,0],radius:460,count:70,size:4},{type:`bushes`,at:[0,0],radius:400,count:70}],spawns:{a:[60,-420],b:[40,420]},bases:{a:[60,-390],b:[40,390],neutral:[70,20]},lanes:{heavy:[[100,-280],[80,-60],[100,120],[60,320]],light:[[-150,-300],[-180,-60],[-150,120],[-100,330]],center:[[230,-300],[220,-50],[230,180],[150,320]]},sniperSpots:{a:[[-60,-190],[150,-180]],b:[[-150,200],[60,190]]},scoutSpots:{a:[[-60,-60],[180,-40]],b:[[0,100],[200,120]]}},{id:`coast`,name:`Маячный берег`,description:`Морское побережье с пляжем, скалами, рыбацкой деревней и маяком на утёсе.`,size:1e3,seed:8807,biome:{...Vl,ground:`grass`,secondary:`sand`,noiseAmp:9,sky:{top:`#3f78c4`,horizon:`#cfe0ec`,fog:`#c7d9e4`,fogDensity:.001},ambience:`waves`,treeKinds:[`pine`,`broadleaf`],waterColor:`#2d6a86`},waterLevel:6,features:[{type:`sea`,side:`east`,distance:330},{type:`ridge`,points:[[220,-420],[240,-150],[230,120],[250,420]],width:70,height:20,rough:1},{type:`hill`,at:[-280,-100],radius:170,height:25},{type:`hill`,at:[-200,300],radius:130,height:18},{type:`plateau`,at:[300,300],radius:60,height:22},{type:`lighthouse`,at:[300,300]},{type:`village`,at:[120,-60],radius:80,houses:14,style:`wood`},{type:`village`,at:[-150,120],radius:60,houses:8,style:`stone`},{type:`road`,points:[[-500,40],[-150,120],[120,-60],[180,-300],[160,-500]],width:8,surface:`dirt`},{type:`road`,points:[[0,-500],[20,-200],[120,-60],[80,200],[0,500]],width:8,surface:`asphalt`},{type:`forest`,at:[-330,-120],radius:130,density:.5,kind:`pine`},{type:`forest`,at:[-330,330],radius:110,density:.5,kind:`broadleaf`},{type:`rocks`,at:[300,0],radius:200,count:35,size:4},{type:`bushes`,at:[0,0],radius:380,count:80},{type:`crates`,at:[120,-60],radius:70,count:10},{type:`cars`,at:[120,-60],radius:70,count:4}],spawns:{a:[-60,-418],b:[-60,418]},bases:{a:[-60,-380],b:[-60,380],neutral:[120,-60]},lanes:{heavy:[[100,-260],[130,-60],[100,150],[40,320]],light:[[-280,-300],[-380,0],[-300,220],[-180,360]],center:[[-80,-250],[-150,0],[-120,200],[-80,330]]},sniperSpots:{a:[[-280,-100],[240,-250]],b:[[-200,300],[240,250]]},scoutSpots:{a:[[-60,-60],[60,-150]],b:[[0,100],[-200,100]]}}],Ul=[{id:`standard`,name:`Стандартный бой`,description:`Уничтожьте всех противников или захватите их базу.`,bases:`both`,winByDestroy:!0,winByCapture:!0,timeLimit:600,timeoutResult:`draw`,captureRate:1,maxCapturers:3,captureResetOnDamage:!0},{id:`capture`,name:`Захват`,description:`Победа только захватом базы противника. Уничтожение врагов победы не даёт.`,bases:`both`,winByDestroy:!1,winByCapture:!0,timeLimit:720,timeoutResult:`draw`,captureRate:1.4,maxCapturers:4,captureResetOnDamage:!0},{id:`encounter`,name:`Встречный бой`,description:`Одна нейтральная база в центре. Захватите её или уничтожьте врага.`,bases:`neutral`,winByDestroy:!0,winByCapture:!0,timeLimit:600,timeoutResult:`draw`,captureRate:.8,maxCapturers:3,captureResetOnDamage:!0},{id:`assault`,name:`Штурм`,description:`Команда А атакует базу команды Б. По истечении времени побеждают защитники.`,bases:`defender`,winByDestroy:!0,winByCapture:!0,timeLimit:540,timeoutResult:`defenders`,captureRate:1,maxCapturers:3,captureResetOnDamage:!0}],Wl=new class{tanks=new Map;nations=new Map;maps=new Map;modes=new Map;children=new Map;modules=new Map;constructor(e,t,n,r){for(let t of e)this.nations.set(t.id,t);for(let e of n)this.maps.set(e.id,e);for(let e of r)this.modes.set(e.id,e);for(let e of t)this.addTank(e)}addTank(e){if(this.tanks.has(e.id))throw Error(`Duplicate tank id ${e.id}`);this.tanks.set(e.id,e);for(let t of e.parents){let n=this.children.get(t)??[];n.push(e.id),this.children.set(t,n)}for(let t of[`gun`,`turret`,`engine`,`suspension`,`radio`])for(let n of e.modules[t])this.modules.set(n.id,{tankId:e.id,module:n})}getTank(e){let t=this.tanks.get(e);if(!t)throw Error(`Unknown tank ${e}`);return t}getNation(e){let t=this.nations.get(e);if(!t)throw Error(`Unknown nation ${e}`);return t}getMap(e){let t=this.maps.get(e);if(!t)throw Error(`Unknown map ${e}`);return t}getMode(e){let t=this.modes.get(e);if(!t)throw Error(`Unknown mode ${e}`);return t}getModule(e){let t=this.modules.get(e);if(!t)throw Error(`Unknown module ${e}`);return t.module}childrenOf(e){return(this.children.get(e)??[]).map(e=>this.getTank(e))}tanksOfNation(e){return[...this.tanks.values()].filter(t=>t.nation===e)}starterTanks(){return[...this.tanks.values()].filter(e=>e.parents.length===0&&!e.premium)}allTanks(){return[...this.tanks.values()]}validate(){let e=[];for(let t of this.tanks.values()){this.nations.has(t.nation)||e.push(`${t.id}: unknown nation ${t.nation}`),(t.tier<1||t.tier>10)&&e.push(`${t.id}: tier out of range`);for(let n of t.parents){let r=this.tanks.get(n);r?(t.tier-r.tier>1||t.tier<r.tier)&&e.push(`${t.id}: bad tier step from ${n}`):e.push(`${t.id}: missing parent ${n}`)}for(let n of[`gun`,`turret`,`engine`,`suspension`,`radio`])t.modules[n].length===0&&e.push(`${t.id}: no ${n} modules`);for(let n of t.modules.turret)for(let r of n.guns)t.modules.gun.some(e=>e.id===r)||e.push(`${t.id}: turret ${n.id} references missing gun ${r}`);for(let n of t.modules.gun)n.ammo.length===0&&e.push(`${t.id}: gun ${n.id} has no ammo`),n.reloadTime<=0&&e.push(`${t.id}: gun ${n.id} bad reload`);this.loadOf(t,{gun:t.modules.gun[0].id,turret:t.modules.turret[0].id,engine:t.modules.engine[0].id,suspension:t.modules.suspension[0].id,radio:t.modules.radio[0].id})>t.modules.suspension[0].maxLoad+1e-6&&e.push(`${t.id}: stock config overloads stock suspension`);let n={gun:t.modules.gun.at(-1).id,turret:t.modules.turret.at(-1).id,engine:t.modules.engine.at(-1).id,suspension:t.modules.suspension.at(-1).id,radio:t.modules.radio.at(-1).id};this.loadOf(t,n)>t.modules.suspension.at(-1).maxLoad+1e-6&&e.push(`${t.id}: top config overloads top suspension`)}for(let t of this.nations.values())this.starterTanks().some(e=>e.nation===t.id)||e.push(`nation ${t.id} has no starter tank`);return e}loadOf(e,t){let n=e.hull.mass;for(let r of Object.keys(t)){let i=e.modules[r].find(e=>e.id===t[r]);i&&(n+=i.mass)}return n}}(_l,Sl().map(e=>Bl(e,_l.find(t=>t.id===e.nation))),Hl,Ul);function Gl(e,t,n){let r=e.data.tier,i=e.battle,a=t.winner===-1?`draw`:t.winner===e.team?`win`:`loss`,o=[],s=(e,t,n)=>{(t>0||n>0)&&o.push({label:e,xp:Math.round(t),credits:Math.round(n)})};s(`Участие в бою`,80+20*r,2e3+900*r),s(`Нанесённый урон (${i.damageDealt})`,i.damageDealt*.35,i.damageDealt*(6+.6*r)),s(`Уничтожено (${i.kills})`,i.kills*60*r,i.kills*1500*r**.6),s(`Обнаружено (${i.spotted})`,i.spotted*25,i.spotted*300),s(`Урон по разведданным (${i.assistDamage})`,i.assistDamage*.2,i.assistDamage*3),s(`Заблокировано бронёй (${i.damageBlocked})`,i.damageBlocked*.05,i.damageBlocked*.8),s(`Захват базы (${Math.round(i.capturePoints)})`,i.capturePoints*3,i.capturePoints*40),s(`Защита базы (${Math.round(i.defensePoints)})`,i.defensePoints*4,i.defensePoints*50),e.alive&&s(`Выживание`,30*r,0);let c=o.reduce((e,t)=>e+t.xp,0),l=o.reduce((e,t)=>e+t.credits,0);if(a===`win`){let e=c*.5,t=l*.3;o.push({label:`Победа`,xp:Math.round(e),credits:Math.round(t)}),c+=e,l+=t}if(e.data.premium){let e=l*.5;o.push({label:`Премиум-танк`,xp:0,credits:Math.round(e)}),l+=e}let u=1-e.hp/e.maxHp,d=Math.round(u*r**1.8*180);return c=Math.round(c),l=Math.round(l),{outcome:a,lines:o,xp:c,freeXp:Math.round(c*.05),crewXp:c,creditsGross:l,repairCost:d,ammoCost:Math.round(n),creditsNet:l-d-Math.round(n)}}var Kl={commander:`Командир`,gunner:`Наводчик`,driver:`Механик-водитель`,loader:`Заряжающий`,radioman:`Радист`},ql=[{id:`repair`,name:`Ремонт`,description:`+25% к скорости ремонта модулей`,role:`any`},{id:`camo`,name:`Маскировка`,description:`+15% к маскировке танка`,role:`any`},{id:`firefight`,name:`Пожаротушение`,description:`Пожар гаснет вдвое быстрее`,role:`any`},{id:`snapshot`,name:`Плавный поворот`,description:`-15% к разбросу при повороте башни`,role:`gunner`},{id:`smooth`,name:`Плавный ход`,description:`-15% к разбросу при движении`,role:`driver`},{id:`eagle`,name:`Орлиный глаз`,description:`+8% к обзору`,role:`commander`}];function Jl(e){return Math.round(40+Math.max(0,e-50)**1.6*3)}var Yl=3e4;function Xl(e,t,n){let r=e[t[0]],i=e[t[1]],a=e[t[2]],o=new G().subVectors(i,r).cross(new G().subVectors(a,r)).normalize(),s=t;return o.dot(new G().subVectors(r,n))<0&&(o.negate(),s=[...t].reverse()),{normal:o,d:o.dot(r),verts:s}}function Zl(e,t,n,r,i,a){let o=e.length,s=[...e,...t],c=new G;for(let e of s)c.add(e);c.divideScalar(s.length);let l=[];for(let e=0;e<o;e++){let t=(e+1)%o,i=Xl(s,[e,t,o+t,o+e],c);l.push({verts:i.verts,normal:i.normal,d:i.d,tag:n[e],thickness:r[e]})}let u=Xl(s,e.map((e,t)=>t),c);l.push({verts:u.verts,normal:u.normal,d:u.d,tag:i[0],thickness:i[1]});let d=Xl(s,t.map((e,t)=>o+t),c);return l.push({verts:d.verts,normal:d.normal,d:d.d,tag:a[0],thickness:a[1]}),{vertices:s,faces:l}}function Ql(e,t,n,r){let i=n=>[new G(t.x,e.y,n),new G(e.x,e.y,n),new G(e.x,t.y,n),new G(t.x,t.y,n)];return Zl(i(e.z),i(t.z),[n.bottom,n.side,n.top,n.side],[r.bottom,r.side,r.top,r.side],[n.rear,r.rear],[n.front,r.front])}function $l(e,t,n){let r=e.hull,{length:i,width:a,height:o,clearance:s}=r.dims,c=a/2,l=r.armor,u=s+o,d=s+o*.42,f=Math.min((d-s)*Math.tan(r.angles.lowerFront*el),i*.18),p=Math.min((u-d)*Math.tan(r.angles.upperFront*el),i*.32),m=[[-i/2,s],[i/2-f,s],[i/2,d],[i/2-p,u],[-i/2+.15,u]],h=[`bottom`,`lowerFront`,`upperFront`,`roof`,`rear`],g=[l.bottom,l.lowerFront,l.upperFront,l.roof,l.rear],_=Zl(m.map(([e,t])=>new G(c*.86,t,e)),m.map(([e,t])=>new G(-c*.86,t,e)),h,g,[`side`,l.side],[`side`,l.side]),v=[{name:`hull`,frame:`hull`,role:`main`,part:`hull`,vertices:_.vertices,faces:_.faces}],y=r.trackWidth,b=s+o*.35;for(let e of[1,-1]){let t=e*c,n=e*(c-y),a=Ql(new G(Math.min(t,n),0,-i/2-.05),new G(Math.max(t,n),b,i/2-.05),{front:`track`,side:`track`,rear:`track`,top:`track`,bottom:`track`},{front:r.trackArmor,side:r.trackArmor,rear:r.trackArmor,top:r.trackArmor,bottom:r.trackArmor});if(v.push({name:e>0?`trackL`:`trackR`,frame:`hull`,role:`spaced`,part:`none`,module:`tracks`,...a}),r.screens>0){let t=e*(c+.08),n=Ql(new G(Math.min(t,t+e*.03),s+.05,-i*.42),new G(Math.max(t,t+e*.03),u-.05,i*.4),{front:`screen`,side:`screen`,rear:`screen`,top:`screen`,bottom:`screen`},{front:r.screens,side:r.screens,rear:r.screens,top:r.screens,bottom:r.screens});v.push({name:e>0?`screenL`:`screenR`,frame:`hull`,role:`spaced`,part:`none`,...n})}}let x=t.shape,S=t.armor,C=x.length,w=x.width/2,T=Math.min(C*.35,Math.tan(x.frontAngle*el)*w*.8),E=w*.62,D=[[E,C/2],[w,C/2-T],[w*.92,-C/2],[-w*.92,-C/2],[-w,C/2-T],[-E,C/2]],O=[`turretFront`,`turretSide`,`turretRear`,`turretSide`,`turretFront`,`turretFront`],k=[S.front,S.side,S.rear,S.side,S.front,S.front],A=x.height,j=1-x.slope,M=Zl(D.map(([e,t])=>new G(e,0,t)),D.map(([e,t])=>new G(e*j,A,t*j)),O,k,[`turretRing`,S.side],[`turretRoof`,S.roof]);v.push({name:`turret`,frame:`turret`,role:`main`,part:`turret`,vertices:M.vertices,faces:M.faces});let ee=new G(0,u-.02,x.offsetZ),N=new G(0,x.height*.45,C/2-.1),te=Math.max(.5,E*1.1),P=Math.max(.35,x.height*.42),ne=Ql(new G(-te/2,-P/2,-.05),new G(te/2,P/2,.28),{front:`mantlet`,side:`mantlet`,rear:`mantlet`,top:`mantlet`,bottom:`mantlet`},{front:S.mantlet,side:S.mantlet*.6,rear:S.mantlet,top:S.mantlet*.5,bottom:S.mantlet*.5});v.push({name:`mantlet`,frame:`gun`,role:`spaced`,part:`none`,...ne});let F=Math.max(.06,e.modules.gun[0].caliber/1e3),re=Ql(new G(-F,-F,.25),new G(F,F,n),{front:`barrel`,side:`barrel`,rear:`barrel`,top:`barrel`,bottom:`barrel`},{front:15,side:15,rear:15,top:15,bottom:15});if(v.push({name:`barrel`,frame:`gun`,role:`external`,part:`none`,module:`gun`,...re}),e.hasTurret&&e.tier>=3){let e=Math.min(.35,w*.3),t=-C*.15,n=w*.35,r=Ql(new G(n-e,A-.02,t-e),new G(n+e,A+.28,t+e),{front:`cupola`,side:`cupola`,rear:`cupola`,top:`cupola`,bottom:`cupola`},{front:Math.round(S.side*.55),side:Math.round(S.side*.55),rear:Math.round(S.side*.5),top:S.roof,bottom:S.roof});v.push({name:`cupola`,frame:`turret`,role:`main`,part:`turret`,...r})}let ie=(e,t,n,r,i)=>({id:e,kind:t,frame:n,min:new G(...r),max:new G(...i)}),ae=c*.8,oe=[ie(`engine`,`module`,`hull`,[-ae*.7,s+.05,-i/2+.2],[ae*.7,s+o*.75,-i/2+i*.28]),ie(`fuelTank`,`module`,`hull`,[ae*.55,s+.05,-i*.22],[ae,s+o*.8,i*.05]),ie(`ammoRack`,`module`,`hull`,[-ae,s+.05,-i*.2],[-ae*.45,s+o*.6,i*.12]),ie(`transmission`,`module`,`hull`,[-ae*.6,s+.05,i/2-f-.6],[ae*.6,s+o*.45,i/2-f]),ie(`turretRing`,`module`,`hull`,[-w*.8,u-.25,x.offsetZ-C*.4],[w*.8,u,x.offsetZ+C*.4]),ie(`driver`,`crew`,`hull`,[.05,s+.1,i/2-p-.9],[ae*.75,s+o*.85,i/2-p*.3]),ie(`radio`,`module`,`turret`,[-w*.7,.1,-C/2+.05],[w*.7,x.height*.6,-C/2+.45]),ie(`gunBreech`,`module`,`turret`,[-.3,x.height*.2,-C*.05],[.3,x.height*.7,C/2-.1]),ie(`gunner`,`crew`,`turret`,[-w*.85,0,-C*.15],[-.32,x.height*.8,C*.3]),ie(`commander`,`crew`,`turret`,[.32,0,-C*.35],[w*.85,x.height*.9,0]),ie(`loader`,`crew`,`turret`,[.32,0,0],[w*.85,x.height*.8,C*.35])];e.crew.includes(`radioman`)&&oe.push(ie(`radioman`,`crew`,`hull`,[-ae*.75,s+.1,i/2-p-.9],[-.05,s+o*.85,i/2-p*.3]));let se=Math.sqrt((i/2+.5)**2+c*c+(u+x.height+.5)**2)+Math.max(0,n-i/2);return{components:v,internals:oe.filter(t=>t.kind===`module`||e.crew.includes(t.id)),turretPivot:ee,gunPivot:N,barrelLength:n,boundingRadius:se,hullTop:u,turretTop:u+x.height}}function eu(e,t,n,r){let i=-1/0,a=1/0,o=null;for(let r of e.faces){let e=r.normal.dot(n),s=r.d-r.normal.dot(t);if(Math.abs(e)<1e-9){if(s<0)return null;continue}let c=s/e;if(e<0?c>i&&(i=c,o=r):c<a&&(a=c),i>a)return null}return!o||i<0||i>r?null:{tIn:i,tOut:a,face:o}}function tu(e,t,n,r,i){let a=0,o=i;for(let i of[`x`,`y`,`z`]){if(Math.abs(r[i])<1e-9){if(n[i]<e[i]||n[i]>t[i])return-1;continue}let s=(e[i]-n[i])/r[i],c=(t[i]-n[i])/r[i];if(s>c&&([s,c]=[c,s]),a=Math.max(a,s),o=Math.min(o,c),a>o)return-1}return a}function nu(){return{throttle:0,steer:0,brake:!1,aimPoint:null,fire:!1,ammoSlot:null,lockTurret:!1,consumable:null}}var ru={engine:`Двигатель`,transmission:`Трансмиссия`,tracks:`Ходовая`,gun:`Орудие`,turretRing:`Погон башни`,radio:`Радиостанция`,ammoRack:`Боеукладка`,fuelTank:`Топливный бак`},iu={engine:140,transmission:120,tracks:150,gun:110,turretRing:100,radio:70,ammoRack:120,fuelTank:120},au=1,ou=class{data;team;callsign;id;layout;gun;turret;engine;suspension;radio;ammoTypes;crew;modules;maxHp;stats;battle;input=nu();hp;alive=!0;position=new G;velocity=new G;quaternion=new ct;prevPosition=new G;prevYaw=0;prevTurretYaw=0;yaw=0;yawRate=0;pitch=0;roll=0;pitchVel=0;rollVel=0;vy=0;speedLong=0;trackSpeedL=0;trackSpeedR=0;surface=`grass`;drowning=0;airborne=!1;odometer=0;turretYaw=0;gunPitch=0;turretRate=0;dispersion;reloadTimer=0;magazineLeft;ammoCounts;selectedAmmo=0;pendingAmmo=-1;lastShotTime=-100;aimTarget=new G;aimCache={point:new G(1e9,0,0),elevation:null,time:-1,ammo:``};burning=!1;fireTimer=0;consumableCooldown=[0,0,0];consumableUsed=[!1,!1,!1];lastDamagedBy=-1;lastDamageTime=-100;damagers=new Map;spottedUntil=0;isPlayer=!1;constructor(e,t,n,r){this.data=e,this.team=t,this.callsign=n,this.id=au++;let i=t=>{let n=e.modules[t];return n.find(e=>e.id===r.modules[t])??n[0]};this.gun=i(`gun`),this.turret=i(`turret`),this.engine=i(`engine`),this.suspension=i(`suspension`),this.radio=i(`radio`),this.turret.guns.includes(this.gun.id)||(this.gun=e.modules.gun.find(e=>this.turret.guns.includes(e.id))??e.modules.gun[0]),this.ammoTypes=this.gun.ammo,this.ammoCounts=this.ammoTypes.map(e=>r.ammo[e.id]??0),this.ammoCounts.every(e=>e<=0)&&(this.ammoCounts[0]=this.gun.ammoCapacity),this.selectedAmmo=this.ammoCounts.findIndex(e=>e>0),this.layout=$l(e,this.turret,this.gun.barrelLength),this.maxHp=e.hull.hp+this.turret.hpBonus,this.hp=this.maxHp,this.crew=e.crew.map(e=>({role:e,skill:r.crewSkill,wounded:!1}));let a=.7+e.tier*.09;this.modules=Object.fromEntries(Object.keys(iu).map(e=>{let t=Math.round(iu[e]*a);return[e,{id:e,hp:t,maxHp:t,status:`ok`,repairTimer:0}]})),this.magazineLeft=this.gun.magazine?.size??1,this.perks=new Set(r.perks),this.stats=this.computeStats(),this.dispersion=this.stats.accuracy*4,this.reloadTimer=2,this.battle={damageDealt:0,damageReceived:0,damageBlocked:0,assistDamage:0,kills:0,shots:0,hits:0,penetrations:0,spotted:0,capturePoints:0,defensePoints:0,survivedTime:0,shellsUsed:{}}}perks;get ammo(){return this.ammoTypes[this.selectedAmmo]}get hpFraction(){return this.hp/this.maxHp}get isArtillery(){return this.gun.artillery}crewEfficiency(e){let t=this.crew.find(t=>t.role===e)??this.crew.find(e=>e.role===`commander`);if(!t)return .75;let n=this.crew.find(e=>e.role===`commander`),r=n&&!n.wounded&&e!==`commander`?n.skill*5e-4:0;return .5+(t.wounded?t.skill*.5:t.skill)*.005+r}crewTimeMul(e){return 1+(1-this.crewEfficiency(e))*.5}moduleFactor(e,t,n){let r=this.modules[e].status;return r===`ok`?1:r===`damaged`?t:n}computeStats(){let e=this.data,t=e.hull.mass+this.gun.mass+this.turret.mass+this.engine.mass+this.suspension.mass+this.radio.mass,n=this.crewEfficiency(`driver`),r=1/this.crewTimeMul(`driver`),i=this.moduleFactor(`engine`,.5,0),a=this.moduleFactor(`transmission`,.75,0),o=this.modules.tracks.status!==`destroyed`,s=this.moduleFactor(`turretRing`,.5,0),c=this.moduleFactor(`radio`,.6,.25),l=this.moduleFactor(`radio`,.92,.82),u=this.modules.gun.status,d=this.moduleFactor(`ammoRack`,1.5,1.8),f=this.perks.has(`camo`)?1.15:1,p=this.perks.has(`eagle`)?1.08:1,m=(e.cls===`HT`?16:e.cls===`SPG`?10:22)*el;return{mass:t*1e3,power:this.engine.power*735.5*e.hull.transmission.efficiency*i*a*(.9+n*.1),maxSpeed:e.hull.maxSpeed/3.6*a*(this.modules.tracks.status===`damaged`?.85:1),reverseSpeed:e.hull.reverseSpeed/3.6,hullTraverse:this.suspension.traverseSpeed*el*r*a,turretTraverse:this.turret.traverseSpeed*el*s*(1/this.crewTimeMul(`gunner`)),elevationSpeed:m,reload:this.gun.reloadTime*this.crewTimeMul(`loader`)*d,aimTime:this.gun.aimTime*this.crewTimeMul(`gunner`)*(u===`damaged`?1.25:1),accuracy:this.gun.accuracy/100*this.crewTimeMul(`gunner`)*(u===`damaged`?1.5:1),dispersionMove:this.suspension.dispersionMove*.6*(this.perks.has(`smooth`)?.85:1),dispersionHull:this.suspension.dispersionTraverse*.6*(this.perks.has(`smooth`)?.85:1),dispersionTurret:(e.cls===`TD`?.05:.08)*(this.perks.has(`snapshot`)?.85:1),viewRange:Math.min(445,this.turret.viewRange*(.85+this.crewEfficiency(`commander`)*.15)*l*p),radioRange:this.radio.range*c*(.85+this.crewEfficiency(`radioman`)*.15),camoStationary:e.camo.stationary*f,camoMoving:e.camo.moving*f,repairSpeed:(this.perks.has(`repair`)?1.25:1)*(.8+this.crewEfficiency(`driver`)*.2),canFire:u!==`destroyed`&&this.alive,canMove:o&&i>0&&a>0&&this.alive}}refreshStats(){Object.assign(this.stats,this.computeStats())}updateQuaternion(){su.set(-this.pitch,this.yaw,this.roll,`YXZ`),this.quaternion.setFromEuler(su)}get turretFrameYaw(){return this.data.hasTurret?this.turretYaw:0}get gunFrameYaw(){return this.data.hasTurret?0:this.turretYaw}turretQuaternion(e){return cu.setFromAxisAngle(fu,this.turretFrameYaw),e.copy(this.quaternion).multiply(cu)}gunQuaternion(e){return this.turretQuaternion(e),cu.setFromAxisAngle(fu,this.gunFrameYaw),e.multiply(cu),cu.setFromAxisAngle(pu,-this.gunPitch),e.multiply(cu)}turretWorldPosition(e){return e.copy(this.layout.turretPivot).applyQuaternion(this.quaternion).add(this.position)}gunWorldPosition(e){return this.turretQuaternion(lu),e.copy(this.layout.gunPivot).applyQuaternion(lu).add(this.turretWorldPosition(uu))}gunDirection(e){return this.gunQuaternion(lu),e.set(0,0,1).applyQuaternion(lu)}muzzlePosition(e){return this.gunWorldPosition(e),e.addScaledVector(this.gunDirection(du),this.layout.barrelLength)}eyePosition(e){return e.set(0,this.layout.turretTop+.3,this.layout.turretPivot.z).applyQuaternion(this.quaternion).add(this.position)}get isMoving(){return Math.abs(this.speedLong)>.6||Math.abs(this.yawRate)>.15}},su=new Bt,cu=new ct,lu=new ct,uu=new G,du=new G,fu=new G(0,1,0),pu=new G(1,0,0);function mu(e,t=75,n=!1){let r=t=>n?e.modules[t].at(-1).id:e.modules[t][0].id,i={gun:r(`gun`),turret:r(`turret`),engine:r(`engine`),suspension:r(`suspension`),radio:r(`radio`)},a=e.modules.gun.find(e=>e.id===i.gun),o=a.ammoCapacity,s={};return a.artillery?(s[a.ammo[0].id]=Math.round(o*.7),s[a.ammo[1].id]=Math.round(o*.2),s[a.ammo[2].id]=o-s[a.ammo[0].id]-s[a.ammo[1].id]):(s[a.ammo[0].id]=Math.round(o*.65),s[a.ammo[1].id]=Math.round(o*.15),s[a.ammo[2].id]=o-s[a.ammo[0].id]-s[a.ammo[1].id]),{modules:i,ammo:s,crewSkill:t,perks:[]}}var hu=`steel-frontier.save`,gu=`steel-frontier.save.backup`,_u={forward:[`KeyW`,`ArrowUp`],back:[`KeyS`,`ArrowDown`],left:[`KeyA`,`ArrowLeft`],right:[`KeyD`,`ArrowRight`],brake:[`Space`],fire:[`Mouse0`],sniper:[`ShiftLeft`,`ShiftRight`],lockTurret:[`Mouse2`],zoomIn:[`WheelUp`],zoomOut:[`WheelDown`],ammo1:[`Digit1`],ammo2:[`Digit2`],ammo3:[`Digit3`],repair:[`Digit4`],medkit:[`Digit5`],extinguisher:[`Digit6`],radioHelp:[`F2`],radioAttack:[`F3`],radioRetreat:[`F4`],radioTarget:[`KeyT`],scoreboard:[`Tab`],pause:[`Escape`]};function vu(){return{graphics:`high`,renderScale:1,shadows:!0,fov:70,masterVolume:.8,sfxVolume:.9,engineVolume:.7,ambientVolume:.5,voice:!0,mouseSensitivity:1,sniperSensitivity:.5,gamepadSensitivity:1,invertY:!1,bindings:structuredClone(_u),teamSize:15,difficulty:`normal`,showFps:!1,touchControls:`auto`}}function yu(){return{battles:0,wins:0,losses:0,draws:0,damage:0,kills:0,spotted:0,shots:0,hits:0,bestDamage:0,bestKills:0,totalXp:0,creditsEarned:0}}var bu=class{get(e){try{return localStorage.getItem(e)}catch{return null}}set(e,t){try{localStorage.setItem(e,t)}catch{}}remove(e){try{localStorage.removeItem(e)}catch{}}},xu=class{storage;constructor(e){this.storage=e}load(e){for(let[t,n]of[[hu,`primary`],[gu,`backup`]]){let r=this.storage.get(t);if(!r)continue;let i=this.decode(r);if(i)return{data:this.normalize(i,e),source:n}}return{data:e(),source:`new`}}save(e){e.updatedAt=Date.now(),e.version=3;let t=this.encode(e),n=this.storage.get(hu);n&&this.decode(n)&&this.storage.set(gu,n),this.storage.set(hu,t)}reset(){this.storage.remove(hu),this.storage.remove(gu)}encode(e){let t={v:3,checksum:gl(JSON.stringify(e)),data:e};return JSON.stringify(t)}decode(e){try{let t=JSON.parse(e);return!t||typeof t!=`object`||!t.data||typeof t.v!=`number`||gl(JSON.stringify(t.data))!==t.checksum?null:this.migrate(t.data,t.v)}catch{return null}}exportString(e){return btoa(unescape(encodeURIComponent(this.encode(e))))}importString(e){try{return this.decode(decodeURIComponent(escape(atob(e.trim()))))}catch{return null}}migrate(e,t){let n=e;if(t<2)for(let e of Object.values(n.tanks??{})){let t=e.crewSkill;typeof t==`number`&&(e.crew={skill:t,xp:0,perkXp:0,perks:[],perkPoints:0})}if(t<3)for(let e of Object.values(n.tanks??{}))e.purchasedModules??=[...e.researchedModules??[]];return n.version=3,n}normalize(e,t){let n=t(),r={...n,...e,settings:{...n.settings,...e.settings??{}},stats:{...n.stats,...e.stats??{}},tanks:{...e.tanks??{}},researched:Array.isArray(e.researched)?e.researched:n.researched};r.settings.bindings={...structuredClone(_u),...e.settings?.bindings??{}},(!Number.isFinite(r.credits)||r.credits<0)&&(r.credits=0),(!Number.isFinite(r.freeXp)||r.freeXp<0)&&(r.freeXp=0);for(let e of n.researched)r.researched.includes(e)||r.researched.push(e);for(let[e,t]of Object.entries(n.tanks))r.tanks[e]||(r.tanks[e]=t);return r}},Su=[`gun`,`turret`,`engine`,`suspension`,`radio`],Cu=4e4,wu=e=>({ok:!1,message:e}),Tu=e=>({ok:!0,message:e}),Eu=class e{data;constructor(e){this.data=e}static newProfile(){let t=Wl.starterTanks(),n={};for(let r of t)n[r.id]=e.newTankProgress(r,!0);return{version:0,createdAt:Date.now(),updatedAt:Date.now(),credits:Cu,freeXp:0,researched:t.map(e=>e.id),tanks:n,selectedTank:t.find(e=>e.nation===`ussr`)?.id??t[0].id,settings:vu(),stats:yu(),lastMode:`standard`,lastMap:`random`}}static newTankProgress(e,t){let n=mu(e,50);return{xp:0,owned:t,researchedModules:Su.map(t=>e.modules[t][0].id),purchasedModules:Su.map(t=>e.modules[t][0].id),equipped:{...n.modules},ammo:n.ammo,crew:{skill:50,xp:0,perkXp:0,perks:[],perkPoints:0},battles:0,wins:0,damage:0,kills:0}}progress(t){let n=this.data.tanks[t];return n||(n=e.newTankProgress(Wl.getTank(t),!1),this.data.tanks[t]=n),n}isResearched(e){return this.data.researched.includes(e)}isOwned(e){return!!this.data.tanks[e]?.owned}ownedTanks(){return Wl.allTanks().filter(e=>this.isOwned(e.id))}tankState(e){if(this.isOwned(e))return`owned`;if(this.isResearched(e))return`researched`;let t=Wl.getTank(e);return t.premium?`researched`:t.parents.some(e=>this.isResearched(e))?`researchable`:`locked`}availableXpFor(e){let t=Wl.getTank(e),n=null,r=0;for(let e of t.parents){if(!this.isResearched(e))continue;let t=this.data.tanks[e]?.xp??0;(n===null||t>r)&&(n=e,r=t)}return{parent:n,tankXp:r,total:r+this.data.freeXp}}spendXp(e,t){let n=t;if(e){let t=this.progress(e),r=Math.min(t.xp,n);t.xp-=r,n-=r}this.data.freeXp-=n}research(e){if(this.tankState(e)!==`researchable`)return wu(`Танк недоступен для исследования`);let t=Wl.getTank(e),n=this.availableXpFor(e);return n.total<t.researchXp?wu(`Недостаточно опыта: нужно ${t.researchXp}`):(this.spendXp(n.parent,t.researchXp),this.data.researched.push(e),this.progress(e),Tu(`Исследован ${t.name}`))}buy(e){let t=Wl.getTank(e),n=this.tankState(e);if(n===`owned`)return wu(`Танк уже в ангаре`);if(n!==`researched`)return wu(`Сначала исследуйте танк`);if(this.data.credits<t.price)return wu(`Недостаточно кредитов: нужно ${t.price}`);this.data.credits-=t.price;let r=this.progress(e);return r.owned=!0,this.isResearched(e)||this.data.researched.push(e),Tu(`Куплен ${t.name}`)}sellPrice(e){let t=Wl.getTank(e),n=this.data.tanks[e],r=0;if(n)for(let e of Su)for(let i of t.modules[e])n.purchasedModules.includes(i.id)&&(r+=i.price);return Math.round(t.price*.5+r*.5)}sell(e){if(!this.isOwned(e))return wu(`Танк не в ангаре`);if(this.ownedTanks().length<=1)return wu(`Нельзя продать последний танк`);let t=Wl.getTank(e),n=this.sellPrice(e);this.data.credits+=n;let r=this.progress(e);r.owned=!1,r.crew={skill:50,xp:0,perkXp:0,perks:[],perkPoints:0},r.purchasedModules=Su.map(e=>t.modules[e][0].id);let i=mu(t,50);return r.equipped={...i.modules},r.ammo=i.ammo,this.data.selectedTank===e&&(this.data.selectedTank=this.ownedTanks()[0].id),Tu(`Продан ${t.name} за ${n} кр.`)}findModule(e,t){for(let n of Su){let r=e.modules[n],i=r.findIndex(e=>e.id===t);if(i>=0)return{slot:n,module:r[i],index:i}}return null}moduleState(e,t){let n=Wl.getTank(e),r=this.progress(e),i=this.findModule(n,t);if(!i)return`locked`;if(r.equipped[i.slot]===t)return`equipped`;if(r.purchasedModules.includes(t))return`purchased`;if(r.researchedModules.includes(t))return`researched`;let a=n.modules[i.slot][i.index-1];return!a||r.researchedModules.includes(a.id)?`researchable`:`locked`}researchModule(e,t){if(this.moduleState(e,t)!==`researchable`)return wu(`Модуль недоступен для исследования`);let n=Wl.getTank(e),r=this.findModule(n,t).module,i=this.progress(e);return i.xp+this.data.freeXp<r.researchXp?wu(`Недостаточно опыта: нужно ${r.researchXp}`):(this.spendXp(e,r.researchXp),i.researchedModules.push(t),Tu(`Исследован модуль ${r.name}`))}configWith(e,t){let n=Wl.getTank(e),r=this.progress(e),i=this.findModule(n,t),a={...r.equipped,[i.slot]:t},o=n.modules.turret.find(e=>e.id===a.turret);return o.guns.includes(a.gun)||(a.gun=[...n.modules.gun].reverse().find(e=>o.guns.includes(e.id)&&r.purchasedModules.includes(e.id))?.id??o.guns[0]),a}canEquip(e,t){let n=Wl.getTank(e),r=this.findModule(n,t);if(!r)return wu(`Неизвестный модуль`);let i=this.configWith(e,t);if(r.slot===`gun`&&!n.modules.turret.find(e=>e.id===i.turret).guns.includes(t))return wu(`Орудие требует другую башню`);let a=n.modules.suspension.find(e=>e.id===i.suspension),o=Wl.loadOf(n,i);return o>a.maxLoad+1e-6?wu(`Перегруз ходовой: ${o.toFixed(1)} т из ${a.maxLoad.toFixed(1)} т`):Tu(``)}buyAndEquipModule(e,t){let n=this.moduleState(e,t);if(n===`equipped`)return Tu(`Уже установлен`);if(n===`locked`||n===`researchable`)return wu(`Сначала исследуйте модуль`);let r=Wl.getTank(e),i=this.findModule(r,t),a=this.progress(e),o=this.canEquip(e,t);if(!o.ok)return o;if(n===`researched`){if(this.data.credits<i.module.price)return wu(`Недостаточно кредитов: нужно ${i.module.price}`);this.data.credits-=i.module.price,a.purchasedModules.push(t)}let s=this.configWith(e,t),c=s.gun!==a.equipped.gun;return a.equipped=s,c&&(a.ammo=this.defaultAmmo(r,s.gun)),Tu(`Установлен ${i.module.name}`)}defaultAmmo(e,t){let n=mu(e,50),r=e.modules.gun.find(e=>e.id===t);if(r.id===n.modules.gun)return n.ammo;let i=r.ammoCapacity,a={};return a[r.ammo[0].id]=Math.round(i*.65),a[r.ammo[1].id]=Math.round(i*.15),a[r.ammo[2].id]=i-a[r.ammo[0].id]-a[r.ammo[1].id],a}equippedGun(e){let t=Wl.getTank(e),n=this.progress(e);return t.modules.gun.find(e=>e.id===n.equipped.gun)??t.modules.gun[0]}setAmmo(e,t,n){let r=this.equippedGun(e),i=this.progress(e);if(!r.ammo.some(e=>e.id===t))return wu(`Снаряд не подходит`);let a=r.ammo.filter(e=>e.id!==t).reduce((e,t)=>e+(i.ammo[t.id]??0),0);return i.ammo[t]=Math.max(0,Math.min(Math.round(n),r.ammoCapacity-a)),Tu(``)}restockCost(e,t){let n=this.equippedGun(e),r=0;for(let e of n.ammo)r+=(t[e.id]??0)*e.price;return r}crewTrainingCost(e,t){let n=Wl.getTank(e);return t===75?4e3+n.tier*3e3:15e3+n.tier*12e3}trainCrew(e,t){let n=this.progress(e);if(!n.owned)return wu(`Танк не в ангаре`);if(n.crew.skill>=t)return wu(`Экипаж уже обучен`);let r=this.crewTrainingCost(e,t);return this.data.credits<r?wu(`Недостаточно кредитов: нужно ${r}`):(this.data.credits-=r,n.crew.skill=t,n.crew.xp=0,Tu(`Экипаж обучен до ${t}%`))}addCrewXp(e,t){let n=t;for(;n>0&&e.skill<100;){let t=Jl(e.skill)-e.xp;n>=t?(n-=t,e.skill++,e.xp=0):(e.xp+=n,n=0)}if(e.skill>=100&&n>0&&e.perks.length+e.perkPoints<3)for(e.perkXp+=n;e.perkXp>=3e4&&e.perks.length+e.perkPoints<3;)e.perkXp-=Yl,e.perkPoints++}learnPerk(e,t){let n=this.progress(e);return n.crew.perkPoints<=0?wu(`Нет очков навыков`):ql.some(e=>e.id===t)?n.crew.perks.includes(t)?wu(`Навык уже изучен`):(n.crew.perkPoints--,n.crew.perks.push(t),Tu(`Навык изучен`)):wu(`Неизвестный навык`)}loadoutFor(e){let t=this.progress(e);return{modules:{...t.equipped},ammo:{...t.ammo},crewSkill:t.crew.skill,perks:[...t.crew.perks]}}convertToFreeXp(e,t){let n=this.progress(e),r=Math.min(Math.floor(t),n.xp),i=r*25;return r<=0?wu(`Нет опыта для перевода`):this.data.credits<i?wu(`Недостаточно кредитов: нужно ${i}`):(this.data.credits-=i,n.xp-=r,this.data.freeXp+=r,Tu(`Переведено ${r} опыта в свободный`))}applyBattleRewards(e,t,n){let r=this.progress(e);r.xp+=t.xp,r.battles++,t.outcome===`win`&&r.wins++,r.damage+=n.damage,r.kills+=n.kills,this.addCrewXp(r.crew,t.crewXp),this.data.freeXp+=t.freeXp,this.data.credits=Math.max(0,this.data.credits+t.creditsNet);let i=this.data.stats;i.battles++,t.outcome===`win`?i.wins++:t.outcome===`loss`?i.losses++:i.draws++,i.damage+=n.damage,i.kills+=n.kills,i.spotted+=n.spotted,i.shots+=n.shots,i.hits+=n.hits,i.bestDamage=Math.max(i.bestDamage,n.damage),i.bestKills=Math.max(i.bestKills,n.kills),i.totalXp+=t.xp,i.creditsEarned+=Math.max(0,t.creditsNet)}},Du=[`PadA`,`PadB`,`PadX`,`PadY`,`PadLB`,`PadRB`,`PadLT`,`PadRT`,`PadBack`,`PadStart`,`PadLS`,`PadRS`,`PadUp`,`PadDown`,`PadLeft`,`PadRight`],Ou={fire:[`PadRT`],sniper:[`PadLT`],brake:[`PadB`],lockTurret:[`PadRS`],ammo1:[`PadLeft`],ammo2:[`PadUp`],ammo3:[`PadRight`],repair:[`PadX`],medkit:[`PadY`],extinguisher:[`PadDown`],radioHelp:[`PadLB`],radioAttack:[`PadRB`],scoreboard:[`PadBack`],pause:[`PadStart`]},ku=class{element;down=new Set;pressedThisFrame=new Set;wheel=0;lookDX=0;lookDY=0;axes={moveX:0,moveY:0,lookX:0,lookY:0};touchAxes={moveX:0,moveY:0};touchLookX=0;touchLookY=0;padPrev=new Set;bindings;gamepadConnected=!1;enabled=!0;onRawKey=null;listeners=[];constructor(e,t){this.element=e,this.bindings=t,this.listen(window,`keydown`,e=>{let t=e;if(this.onRawKey){t.preventDefault(),this.onRawKey(t.code);return}this.enabled&&([`Tab`,`Space`,`F2`,`F3`,`F4`,`ArrowUp`,`ArrowDown`].includes(t.code)&&t.preventDefault(),this.down.has(t.code)||this.pressedThisFrame.add(t.code),this.down.add(t.code))}),this.listen(window,`keyup`,e=>this.down.delete(e.code)),this.listen(window,`blur`,()=>this.down.clear()),this.listen(e,`mousedown`,e=>{let t=e;if(this.onRawKey){this.onRawKey(`Mouse${t.button}`);return}let n=`Mouse${t.button}`;this.down.has(n)||this.pressedThisFrame.add(n),this.down.add(n)}),this.listen(window,`mouseup`,e=>this.down.delete(`Mouse${e.button}`)),this.listen(e,`contextmenu`,e=>e.preventDefault()),this.listen(window,`mousemove`,t=>{let n=t;(document.pointerLockElement===e||this.down.has(`Mouse2`))&&(this.lookDX+=n.movementX,this.lookDY+=n.movementY)}),this.listen(e,`wheel`,e=>{let t=e;t.preventDefault(),this.wheel+=t.deltaY<0?1:-1,this.pressedThisFrame.add(t.deltaY<0?`WheelUp`:`WheelDown`)}),this.listen(window,`gamepadconnected`,()=>this.gamepadConnected=!0),this.listen(window,`gamepaddisconnected`,()=>this.gamepadConnected=!1)}listen(e,t,n){let r=t===`wheel`?{passive:!1}:void 0;e.addEventListener(t,n,r),this.listeners.push([e,t,n])}requestPointerLock(){if(document.pointerLockElement!==this.element&&`requestPointerLock`in this.element)try{let e=this.element.requestPointerLock();e instanceof Promise&&e.catch(()=>{})}catch{}}exitPointerLock(){document.pointerLockElement&&document.exitPointerLock()}get pointerLocked(){return document.pointerLockElement===this.element}isDown(e){if(!this.enabled)return!1;let t=this.bindings[e]??[];for(let e of t)if(this.down.has(e))return!0;for(let t of Ou[e]??[])if(this.down.has(t))return!0;return this.down.has(`Touch:${e}`)}pressed(e){if(!this.enabled)return!1;for(let t of this.bindings[e]??[])if(this.pressedThisFrame.has(t))return!0;for(let t of Ou[e]??[])if(this.pressedThisFrame.has(t))return!0;return this.pressedThisFrame.has(`Touch:${e}`)}isRawDown(e){return this.down.has(e)}setVirtual(e,t){t&&!this.down.has(e)&&this.pressedThisFrame.add(e),t?this.down.add(e):this.down.delete(e)}addTouchLook(e,t){this.touchLookX+=e,this.touchLookY+=t}addWheel(e){this.wheel+=e}poll(){let e=[...typeof navigator<`u`&&navigator.getGamepads?navigator.getGamepads():[]].find(e=>e&&e.connected)??null;this.axes.moveX=this.touchAxes.moveX,this.axes.moveY=this.touchAxes.moveY,this.axes.lookX=0,this.axes.lookY=0;let t=new Set;if(e){this.gamepadConnected=!0;let n=e=>Math.abs(e)<.15?0:(e-Math.sign(e)*.15)/.85;Math.abs(this.touchAxes.moveX)<.01&&Math.abs(this.touchAxes.moveY)<.01&&(this.axes.moveX=n(e.axes[0]??0),this.axes.moveY=-n(e.axes[1]??0)),this.axes.lookX=n(e.axes[2]??0),this.axes.lookY=n(e.axes[3]??0),e.buttons.forEach((e,n)=>{n<Du.length&&(e.pressed||e.value>.4)&&t.add(Du[n])})}for(let e of t)this.padPrev.has(e)||(this.pressedThisFrame.add(e),this.down.add(e));for(let e of this.padPrev)t.has(e)||this.down.delete(e);this.padPrev=t}consumeLook(){let e={dx:this.lookDX+this.touchLookX,dy:this.lookDY+this.touchLookY};return this.lookDX=this.lookDY=this.touchLookX=this.touchLookY=0,e}consumeWheel(){let e=this.wheel;return this.wheel=0,e}endFrame(){this.pressedThisFrame.clear()}dispose(){for(let[e,t,n]of this.listeners)e.removeEventListener(t,n);this.listeners=[]}};function Au(e){return e.startsWith(`Key`)?e.slice(3):e.startsWith(`Digit`)?e.slice(5):{Mouse0:`ЛКМ`,Mouse1:`СКМ`,Mouse2:`ПКМ`,WheelUp:`Колесо ↑`,WheelDown:`Колесо ↓`,Space:`Пробел`,ShiftLeft:`L-Shift`,ShiftRight:`R-Shift`,ControlLeft:`L-Ctrl`,ArrowUp:`↑`,ArrowDown:`↓`,ArrowLeft:`←`,ArrowRight:`→`,Escape:`Esc`,Tab:`Tab`,Enter:`Enter`,AltLeft:`L-Alt`}[e]??e}var ju=class{input;root;stick;knob;stickId=null;lookId=null;lookLast={x:0,y:0};stickCenter={x:0,y:0};constructor(e,t){this.input=t,this.root=document.createElement(`div`),this.root.className=`touch-layer`,this.root.innerHTML=`
      <div class="touch-look"></div>
      <div class="touch-stick"><div class="touch-knob"></div></div>
      <div class="touch-buttons">
        <button data-code="Touch:fire" class="tb tb-fire">ОГОНЬ</button>
        <button data-code="Touch:sniper" class="tb tb-sniper">ПРИЦЕЛ</button>
        <button data-code="Touch:zoomIn" class="tb tb-zin">+</button>
        <button data-code="Touch:zoomOut" class="tb tb-zout">−</button>
        <button data-code="Touch:brake" class="tb tb-brake">СТОП</button>
      </div>`,e.appendChild(this.root),document.body.classList.add(`touch-mode`),this.stick=this.root.querySelector(`.touch-stick`),this.knob=this.root.querySelector(`.touch-knob`);let n=this.root.querySelector(`.touch-look`);this.stick.addEventListener(`touchstart`,e=>{e.preventDefault();let t=e.changedTouches[0];this.stickId=t.identifier;let n=this.stick.getBoundingClientRect();this.stickCenter={x:n.left+n.width/2,y:n.top+n.height/2},this.moveStick(t.clientX,t.clientY)},{passive:!1}),n.addEventListener(`touchstart`,e=>{e.preventDefault();let t=e.changedTouches[0];this.lookId=t.identifier,this.lookLast={x:t.clientX,y:t.clientY}},{passive:!1}),window.addEventListener(`touchmove`,this.onMove,{passive:!1}),window.addEventListener(`touchend`,this.onEnd),window.addEventListener(`touchcancel`,this.onEnd);for(let e of this.root.querySelectorAll(`button[data-code]`)){let t=e.dataset.code,n=n=>r=>{r.preventDefault(),t===`Touch:zoomIn`&&n?this.input.addWheel(1):t===`Touch:zoomOut`&&n?this.input.addWheel(-1):this.input.setVirtual(t,n),e.classList.toggle(`active`,n)};e.addEventListener(`touchstart`,n(!0),{passive:!1}),e.addEventListener(`touchend`,n(!1),{passive:!1}),e.addEventListener(`touchcancel`,n(!1),{passive:!1})}}onMove=e=>{for(let t of Array.from(e.changedTouches))t.identifier===this.stickId?(e.preventDefault(),this.moveStick(t.clientX,t.clientY)):t.identifier===this.lookId&&(e.preventDefault(),this.input.addTouchLook((t.clientX-this.lookLast.x)*1.6,(t.clientY-this.lookLast.y)*1.6),this.lookLast={x:t.clientX,y:t.clientY})};onEnd=e=>{for(let t of Array.from(e.changedTouches))t.identifier===this.stickId?(this.stickId=null,this.input.touchAxes.moveX=0,this.input.touchAxes.moveY=0,this.knob.style.transform=`translate(-50%, -50%)`):t.identifier===this.lookId&&(this.lookId=null)};moveStick(e,t){let n=e-this.stickCenter.x,r=t-this.stickCenter.y,i=Math.hypot(n,r);i>55&&(n=n/i*55,r=r/i*55),this.knob.style.transform=`translate(calc(-50% + ${n}px), calc(-50% + ${r}px))`,this.input.touchAxes.moveX=n/55,this.input.touchAxes.moveY=-r/55}bindSlots(e,t){e.forEach((e,n)=>{let r=`Touch:${t[n]}`;e.addEventListener(`touchstart`,e=>{e.preventDefault(),this.input.setVirtual(r,!0)},{passive:!1}),e.addEventListener(`touchend`,()=>this.input.setVirtual(r,!1))})}setVisible(e){this.root.style.display=e?`block`:`none`}dispose(){window.removeEventListener(`touchmove`,this.onMove),window.removeEventListener(`touchend`,this.onEnd),window.removeEventListener(`touchcancel`,this.onEnd),document.body.classList.remove(`touch-mode`),this.root.remove()}},Mu={asphalt:{id:`asphalt`,name:`Асфальт`,grip:.95,resistanceClass:`hard`,speedFactor:1,color:[.23,.23,.24],dust:null,trackMarks:!1},stone:{id:`stone`,name:`Камень`,grip:.8,resistanceClass:`hard`,speedFactor:.92,color:[.44,.42,.4],dust:[.55,.53,.5],trackMarks:!1},dirt:{id:`dirt`,name:`Грунт`,grip:.85,resistanceClass:`medium`,speedFactor:.96,color:[.42,.33,.22],dust:[.55,.45,.32],trackMarks:!0},grass:{id:`grass`,name:`Трава`,grip:.8,resistanceClass:`medium`,speedFactor:.95,color:[.3,.42,.18],dust:[.45,.42,.3],trackMarks:!0},sand:{id:`sand`,name:`Песок`,grip:.62,resistanceClass:`soft`,speedFactor:.85,color:[.78,.68,.46],dust:[.85,.75,.55],trackMarks:!0},mud:{id:`mud`,name:`Грязь`,grip:.5,resistanceClass:`soft`,speedFactor:.75,color:[.28,.22,.15],dust:[.3,.24,.16],trackMarks:!0},snow:{id:`snow`,name:`Снег`,grip:.45,resistanceClass:`soft`,speedFactor:.85,color:[.9,.92,.95],dust:[.95,.96,1],trackMarks:!0},water:{id:`water`,name:`Вода`,grip:.5,resistanceClass:`soft`,speedFactor:.55,color:[.2,.3,.35],dust:null,trackMarks:!1}},Nu=Object.keys(Mu),Pu=Object.fromEntries(Nu.map((e,t)=>[e,t]));function Fu(e,t){let n=wl[e.kind].velocityPenExponent;return n<=0?e.penetration:e.penetration*Z(t/e.velocity,.05,1.2)**+n}function Iu(e,t){let n=e.normalization;return n>0&&e.caliber>2*t&&(n*=1.4*e.caliber/(2*t)),n}function Lu(e,t){return e.caliber>3*t}function Ru(e,t,n){let r=Lu(e,t),i=e.kind!==`HE`&&!r&&n>e.ricochetAngle,a=Iu(e,t),o=Math.max(0,n-a);return{effective:t/Math.max(.05,Math.cos(o*el)),ricochet:i,normAngle:Math.min(a,n)}}var zu=new G,Bu=new G,Vu=new G;function Hu(e){let t=e.quaternion.clone(),n=e.turretQuaternion(new ct),r=e.gunQuaternion(new ct),i=e.turretWorldPosition(new G),a=e.gunWorldPosition(new G);return{hull:{pos:e.position.clone(),quat:t,inv:t.clone().invert()},turret:{pos:i,quat:n,inv:n.clone().invert()},gun:{pos:a,quat:r,inv:r.clone().invert()}}}function Uu(e,t,n,r,i){let a=[];for(let o of e.layout.components){let e=t[o.frame];zu.copy(n).sub(e.pos).applyQuaternion(e.inv),Bu.copy(r).applyQuaternion(e.inv);let s=eu(o,zu,Bu,i);s&&a.push({comp:o,tIn:s.tIn,tOut:s.tOut,normalLocal:s.face.normal,thickness:s.face.thickness,tag:s.face.tag,frame:e})}return a.sort((e,t)=>e.tIn-t.tIn),a}function Wu(e,t,n,r){Vu.copy(e.position).sub(t);let i=Vu.dot(n),a=e.layout.boundingRadius;if(i<-a||i>r+a||Vu.lengthSq()-i*i>a*a)return-1;let o=Uu(e,Hu(e),t,n,r);return o.length?o[0].tIn:-1}function Gu(){return{kind:`miss`,damage:0,point:new G,normal:new G,plate:null,angle:0,thickness:0,effective:0,penetration:0,modules:[],crew:[],ricochetDir:null,t:0,fireChance:0}}function Ku(e,t,n,r,i,a,o){let s=Gu(),c=Hu(e),l=Uu(e,c,t,n,r);if(l.length===0)return s;let u=Fu(i,a)*o.range(.92,1.08);s.penetration=Math.round(u),s.t=l[0].tIn;let d=!0,f=-1;for(let r of l){let a=r.comp,p=-Bu.copy(n).applyQuaternion(r.frame.inv).dot(r.normalLocal),m=Math.acos(Z(p,-1,1))*tl,h=t.clone().addScaledVector(n,r.tIn),g=r.normalLocal.clone().applyQuaternion(r.frame.quat);if(a.role===`external`){if(o.chance(i.kind===`HE`?.8:.45)&&s.modules.push({id:`gun`,damage:i.damage*.5}),d&&(s.point.copy(h),s.normal.copy(g),s.plate=r.tag),i.kind===`HE`)return s.kind=`critical`,s;continue}i.kind===`HEAT`&&f>=0&&(u*=Math.max(0,1-Tl*Math.max(0,r.tIn-f)));let _=Ru(i,r.thickness,m);if((d||a.role===`main`)&&(s.point.copy(h),s.normal.copy(g),s.plate=r.tag,s.angle=m,s.thickness=r.thickness,s.effective=Math.round(_.effective)),i.kind===`HE`){if(a.role===`main`&&u>=_.effective)s.kind=`penetration`,s.damage=Math.round(i.damage*o.range(.85,1.15)),qu(e,c,h,n,2,i,s,o,1.2);else{let e=r.thickness;if(a.role===`spaced`){let t=l.find(e=>e.comp.role===`main`&&e.tIn>r.tIn);e=r.thickness*2+(t?t.thickness:r.thickness),a.module===`tracks`&&s.modules.push({id:`tracks`,damage:i.damage*.9})}let t=i.explosionRadius>2?1.25:1;s.damage=Math.max(0,Math.round((i.damage*.5-e*1.1)*t*o.range(.9,1.1))),s.kind=`heSplash`,(r.tag===`lowerFront`||r.tag===`side`)&&s.modules.push({id:`tracks`,damage:i.damage*.3}),s.fireChance=.02}return s}if(_.ricochet){s.kind=d?`ricochet`:`noPenetration`;let e=g;return s.ricochetDir=n.clone().addScaledVector(e,-2*n.dot(e)).normalize(),s}if(u<_.effective)return s.kind=`noPenetration`,a.module===`tracks`&&(s.modules.push({id:`tracks`,damage:i.damage*.8}),s.kind=`critical`),s;if(u-=_.effective,d=!1,f=Math.max(f,r.tIn+Math.min(.15,r.tOut-r.tIn)),a.role===`spaced`){a.module===`tracks`&&s.modules.push({id:`tracks`,damage:i.damage*.6});continue}s.kind=`penetration`,s.damage=Math.round(i.damage*o.range(.85,1.15));let v=n.clone();if(_.normAngle>0){let e=g.clone().negate();v.lerp(e,Math.sin(_.normAngle*el)).normalize()}return qu(e,c,h,v,Math.min(4,Math.max(.6,r.tOut-r.tIn)),i,s,o,1),s}return s.kind=s.modules.length?`critical`:`miss`,s}function qu(e,t,n,r,i,a,o,s,c){let l=a.kind===`HE`;for(let u of e.layout.internals){let d=t[u.frame];zu.copy(n).sub(d.pos).applyQuaternion(d.inv),Bu.copy(r).applyQuaternion(d.inv);let f=tu(u.min,u.max,zu,Bu,i)>=0;if(!f&&l){let e=(u.min.x+u.max.x)/2-zu.x,t=(u.min.y+u.max.y)/2-zu.y,n=(u.min.z+u.max.z)/2-zu.z;f=Math.sqrt(e*e+t*t+n*n)<a.explosionRadius}if(f){if(u.kind===`crew`)s.chance(l?.6:.45)&&o.crew.push(u.id);else{let t=u.id===`gunBreech`?`gun`:u.id;o.modules.push({id:t,damage:a.damage*s.range(.5,1)*c}),t===`engine`&&(o.fireChance=Math.max(o.fireChance,e.engine.fireChance)),t===`fuelTank`&&(o.fireChance=Math.max(o.fireChance,.3))}}}}function Ju(e,t,n,r,i,a){let o=Uu(e,Hu(e),t,n,r),s=Fu(i,a),c=0,l=-1;for(let e of o){if(e.comp.role===`external`)continue;l<0&&(l=e.tIn);let t=Bu.copy(n).applyQuaternion(e.frame.inv),r=Math.acos(Z(-t.dot(e.normalLocal),-1,1))*tl,a=Ru(i,e.thickness,r);if(i.kind===`HE`)return{hit:!0,effective:a.effective,penetration:s,ricochet:!1,angle:r,plate:e.tag};if(c+=a.effective,i.kind===`HEAT`&&e.comp.role===`spaced`&&(c+=s*Tl*.3),a.ricochet&&c===a.effective)return{hit:!0,effective:c,penetration:s,ricochet:!0,angle:r,plate:e.tag};if(e.comp.role===`main`)return{hit:!0,effective:c,penetration:s,ricochet:!1,angle:r,plate:e.tag}}return{hit:!1,effective:0,penetration:s,ricochet:!1,angle:0,plate:null}}var Yu=[2,4,8,16],Xu=new G,Zu=new G,Qu=new G,$u=class{camera;baseFov;mode=`orbit`;yaw=0;pitch=-.12;distance=13;smoothDistance=13;sniperZoom=0;artyHeight=180;artyTarget=new G;aimPoint=new G;aimTank=null;aimDistance=0;shake=0;freeLook=!1;position=new G;constructor(e,t=70){this.camera=e,this.baseFov=t}reset(e){this.yaw=e.yaw,this.pitch=-.12,this.mode=`orbit`,this.distance=10+e.data.hull.dims.length*.6,this.smoothDistance=this.distance,this.artyTarget.copy(e.position).add(new G(Math.sin(e.yaw)*200,0,Math.cos(e.yaw)*200))}addShake(e){this.shake=Math.min(1.5,this.shake+e)}setFreeLook(e){this.freeLook=e}get isFreeLook(){return this.freeLook}look(e,t,n){let r=this.mode===`sniper`?1/Yu[this.sniperZoom]:1;if(this.mode===`arty`){let r=this.artyHeight*.0022,i=Math.sin(this.yaw),a=Math.cos(this.yaw);this.artyTarget.x+=(-i*t*(n?-1:1)-Math.cos(this.yaw)*e)*r,this.artyTarget.z+=(-a*t*(n?-1:1)+Math.sin(this.yaw)*e)*r;return}this.yaw=al(this.yaw-e*.0025*r),this.pitch=Z(this.pitch-t*.0025*r*(n?-1:1),this.mode===`sniper`?-.5:-.75,this.mode===`sniper`?.45:.4)}zoom(e,t){e!==0&&(this.mode===`orbit`?(this.distance=Z(this.distance*.85**e,4.5,34),e>0&&this.distance<=4.5&&!t.isArtillery&&this.enterSniper(t)):this.mode===`sniper`?(this.sniperZoom=Z(this.sniperZoom+Math.sign(e),-1,Yu.length-1),this.sniperZoom<0&&(this.sniperZoom=0,this.mode=`orbit`,this.distance=7)):this.artyHeight=Z(this.artyHeight*.85**e,60,420))}enterSniper(e){if(e.isArtillery){this.mode=`arty`,this.artyTarget.copy(this.aimPoint);return}this.mode=`sniper`,this.sniperZoom=0}toggleSniper(e){this.mode===`orbit`?this.enterSniper(e):(this.mode===`arty`&&(Zu.subVectors(this.artyTarget,e.position),this.yaw=Math.atan2(Zu.x,Zu.z)),this.mode=`orbit`)}update(e,t,n,r){let i=this.camera;this.shake=Math.max(0,this.shake-e*2.5);let a=this.shake*this.shake;if(this.mode===`orbit`){Qu.set(n.x,n.y+t.layout.turretTop+1.4,n.z),this.smoothDistance+=(this.distance-this.smoothDistance)*sl(10,e),Xu.set(Math.sin(this.yaw)*Math.cos(this.pitch),Math.sin(this.pitch),Math.cos(this.yaw)*Math.cos(this.pitch));let a=this.smoothDistance,o=r.terrain;for(let e=1;e<=12;e++){let t=a*e/12;if(Zu.copy(Qu).addScaledVector(Xu,-t),Zu.y<o.heightAt(Zu.x,Zu.z)+.8){a=Math.max(2.5,t-1);break}}this.position.copy(Qu).addScaledVector(Xu,-a);let s=o.heightAt(this.position.x,this.position.z)+1;this.position.y<s&&(this.position.y=s),i.position.copy(this.position),i.lookAt(Zu.copy(Qu).addScaledVector(Xu,50)),i.fov=this.baseFov}else if(this.mode===`sniper`)t.gunWorldPosition(this.position),this.position.y+=.35,Xu.set(Math.sin(this.yaw)*Math.cos(this.pitch),Math.sin(this.pitch),Math.cos(this.yaw)*Math.cos(this.pitch)),this.position.addScaledVector(Xu,.8),i.position.copy(this.position),i.lookAt(Zu.copy(this.position).add(Xu)),i.fov=this.baseFov/Yu[this.sniperZoom];else{let e=r.terrain,t=e.half-20;this.artyTarget.x=Z(this.artyTarget.x,-t,t),this.artyTarget.z=Z(this.artyTarget.z,-t,t),this.artyTarget.y=e.heightAt(this.artyTarget.x,this.artyTarget.z);let n=this.artyHeight*.32;this.position.set(this.artyTarget.x-Math.sin(this.yaw)*n,this.artyTarget.y+this.artyHeight,this.artyTarget.z-Math.cos(this.yaw)*n),i.position.copy(this.position),i.lookAt(this.artyTarget),i.fov=55}a>0&&(i.position.x+=(Math.random()-.5)*a*.4,i.position.y+=(Math.random()-.5)*a*.4,i.rotation.z+=(Math.random()-.5)*a*.01),i.updateProjectionMatrix(),i.updateMatrixWorld(),this.computeAim(r,t)}computeAim(e,t){if(this.mode===`arty`){this.aimPoint.copy(this.artyTarget),this.aimTank=null;for(let n of e.tanks)n!==t&&n.alive&&n.position.distanceTo(this.artyTarget)<4&&e.detection.isVisibleTo(t,n)&&(this.aimTank=n);this.aimDistance=this.aimPoint.distanceTo(t.position);return}let n=this.camera.position;this.camera.getWorldDirection(Xu);let r=1500,i=e.terrain.raycast(n,Xu,r,2);i>=0&&(r=i);let a=e.statics.raycast(n,Xu,r,e=>e.blocksShell);a&&(r=a.t),this.aimTank=null;for(let i of e.tanks){if(i===t||i.team!==t.team&&i.alive&&!e.detection.isVisibleTo(t,i))continue;let a=Wu(i,n,Xu,r);a>=0&&a<r&&(r=a,this.aimTank=i)}this.aimPoint.copy(n).addScaledVector(Xu,r),this.aimDistance=this.aimPoint.distanceTo(t.position)}},ed=class{perm=new Uint8Array(512);gx=new Float32Array(256);gy=new Float32Array(256);constructor(e){let t=new hl(e),n=Array.from({length:256},(e,t)=>t);t.shuffle(n);for(let e=0;e<512;e++)this.perm[e]=n[e&255];for(let e=0;e<256;e++){let n=t.next()*Math.PI*2;this.gx[e]=Math.cos(n),this.gy[e]=Math.sin(n)}}noise(e,t){let n=Math.floor(e),r=Math.floor(t),i=e-n,a=t-r,o=n&255,s=r&255,c=i*i*i*(i*(i*6-15)+10),l=a*a*a*(a*(a*6-15)+10),u=(e,t,n,r)=>{let i=this.perm[e+this.perm[t]];return this.gx[i]*n+this.gy[i]*r},d=u(o,s,i,a),f=u(o+1,s,i-1,a),p=u(o,s+1,i,a-1),m=u(o+1,s+1,i-1,a-1),h=d+c*(f-d);return(h+l*(p+c*(m-p)-h))*1.41}fbm(e,t,n,r=2,i=.5){let a=1,o=1,s=0,c=0;for(let l=0;l<n;l++)s+=a*this.noise(e*o,t*o),c+=a,a*=i,o*=r;return s/c}ridged(e,t,n){let r=.5,i=1,a=0;for(let o=0;o<n;o++){let n=1-Math.abs(this.noise(e*i,t*i));a+=n*n*r,r*=.5,i*=2.1}return a}},td=new Map;function nd(e){let t=document.createElement(`canvas`);return t.width=e,t.height=e,[t,t.getContext(`2d`,{willReadFrequently:!0})]}function rd(n,r,i=!0){let a=new ii(n);return a.wrapS=a.wrapT=i?e:t,a.minFilter=c,a.anisotropy=4,r&&(a.colorSpace=Ie),a.needsUpdate=!0,a}function id(e,t){let n=td.get(e);return n||(n=t(),td.set(e,n)),n}function ad(e,t,n,r){let i=new ed(t),a=new Float32Array(e*e),o=n/(Math.PI*2);for(let t=0;t<e;t++)for(let n=0;n<e;n++){let s=n/e*Math.PI*2,c=t/e*Math.PI*2,l=Math.cos(s)*o,u=Math.sin(s)*o,d=Math.cos(c)*o,f=Math.sin(c)*o,p=i.fbm(l+d*.7+13.1,u+f*.7+7.7,r)*.6+i.fbm(d-u*.3+3.3,f+l*.3-9.1,r)*.4;a[t*e+n]=p*.5+.5}return a}function od(e,t,n){let[r,i]=nd(t),a=i.createImageData(t,t);for(let r=0;r<t;r++)for(let i=0;i<t;i++){let o=e[r*t+(i-1+t)%t],s=e[r*t+(i+1)%t],c=e[(r-1+t)%t*t+i],l=e[(r+1)%t*t+i],u=(o-s)*n,d=(c-l)*n,f=1,p=Math.hypot(u,d,f);u/=p,d/=p,f/=p;let m=(r*t+i)*4;a.data[m]=(u*.5+.5)*255,a.data[m+1]=(d*.5+.5)*255,a.data[m+2]=(f*.5+.5)*255,a.data[m+3]=255}return i.putImageData(a,0,0),r}function sd(e,t,n,r){let[i,a]=nd(t),o=a.createImageData(t,t);for(let i=0;i<t*t;i++){let t=(n+(r-n)*e[i])*255;o.data[i*4]=o.data[i*4+1]=o.data[i*4+2]=t,o.data[i*4+3]=255}return a.putImageData(o,0,0),i}var cd={groundDetail(){return id(`groundDetail`,()=>{let e=ad(256,11,6,5),t=ad(256,12,24,3);for(let n=0;n<e.length;n++)e[n]=e[n]*.7+t[n]*.3;return rd(sd(e,256,.72,1.12),!0)})},groundNormal(){return id(`groundNormal`,()=>rd(od(ad(256,13,18,4),256,5),!1))},camo(e,t,n,r){return id(`camo:${e}:${t}:${n}:${r}`,()=>{let[i,a]=nd(256),o=ad(256,r,3,4),s=ad(256,r+1,4,4),c=ad(256,r+2,60,2),l=a.createImageData(256,256),u=ld(e),d=ld(t),f=ld(n);for(let e=0;e<65536;e++){let t=u;o[e]>.6?t=d:s[e]>.63&&(t=f);let n=.88+c[e]*.2;l.data[e*4]=Math.min(255,t[0]*n),l.data[e*4+1]=Math.min(255,t[1]*n),l.data[e*4+2]=Math.min(255,t[2]*n),l.data[e*4+3]=255}a.putImageData(l,0,0);let p=new hl(r);a.globalAlpha=.08;for(let e=0;e<120;e++)a.fillStyle=p.chance(.5)?`#2a2418`:`#c9c0a6`,a.fillRect(p.next()*256,p.next()*256,1+p.next()*2,6+p.next()*30);return a.globalAlpha=1,rd(i,!0)})},armorNormal(){return id(`armorNormal`,()=>{let e=ad(512,21,40,3);for(let t=0;t<e.length;t++)e[t]*=.15;let t=(t,n,r,i,a)=>{let o=Math.max(Math.abs(r-t),Math.abs(i-n));for(let s=0;s<=o;s++){let c=Math.round(t+(r-t)*s/o),l=Math.round(n+(i-n)*s/o);for(let t=-1;t<=1;t++){let r=(c+(n===i?0:t)+512)%512,o=(l+(n===i?t:0)+512)%512;e[o*512+r]-=a*(t===0?1:.5)}}};for(let e=0;e<512;e+=128)t(e,0,e,511,.6),t(0,e,511,e,.6);for(let t=16;t<512;t+=128)for(let n=8;n<512;n+=24)for(let r=-2;r<=2;r++)for(let i=-2;i<=2;i++)i*i+r*r<=4&&(e[(t+r+512)%512*512+(n+i+512)%512]+=.5);return rd(od(e,512,3),!1)})},armorAO(){return id(`armorAO`,()=>{let e=ad(512,22,10,3),[t,n]=nd(512),r=n.createImageData(512,512);for(let t=0;t<512;t++)for(let n=0;n<512;n++){let i=Math.min(n%128,128-n%128),a=Math.min(t%128,128-t%128),o=(.55+.45*Math.min(1,Math.min(i,a)/6))*(.85+e[t*512+n]*.15),s=(t*512+n)*4;r.data[s]=r.data[s+1]=r.data[s+2]=o*255,r.data[s+3]=255}return n.putImageData(r,0,0),rd(t,!1)})},armorRoughness(){return id(`armorRough`,()=>rd(sd(ad(256,31,12,4),256,.55,.95),!1))},track(){return id(`track`,()=>{let[e,t]=nd(128);t.fillStyle=`#2b2a28`,t.fillRect(0,0,128,128);for(let e=0;e<128;e+=16)t.fillStyle=`#4a4744`,t.fillRect(e,0,11,128),t.fillStyle=`#5d5953`,t.fillRect(e+2,8,7,112),t.fillStyle=`#1a1918`,t.fillRect(e+11,0,5,128);return rd(e,!0)})},facade(e){return id(`facade:${e}`,()=>{let[t,n]=nd(256),r=new hl(e.length*977),[i,a]={stone:[`#9c8f7d`,`#6f655a`],concrete:[`#8f8e89`,`#6c6b67`],wood:[`#7a5a3a`,`#5a4029`],adobe:[`#c3a57c`,`#a5865f`],hall:[`#7f8486`,`#5c6163`],container:[`#b0b0b0`,`#8c8c8c`]}[e];n.fillStyle=i,n.fillRect(0,0,256,256);let o=ad(256,e.length*31,20,3),s=n.getImageData(0,0,256,256);for(let e=0;e<65536;e++){let t=.85+o[e]*.3;s.data[e*4]*=t,s.data[e*4+1]*=t,s.data[e*4+2]*=t}if(n.putImageData(s,0,0),e===`wood`){n.strokeStyle=a,n.lineWidth=2;for(let e=0;e<256;e+=16)n.beginPath(),n.moveTo(0,e),n.lineTo(256,e),n.stroke()}else if(e===`container`||e===`hall`){n.fillStyle=a;for(let e=0;e<256;e+=12)n.fillRect(e,0,4,256)}else{n.fillStyle=a;for(let e=0;e<256;e+=32)n.fillRect(0,e,256,2)}if(e!==`container`)for(let t=0;t<4;t++)for(let i=0;i<4;i++){if(e===`hall`&&t!==1)continue;let a=i*64+18,o=t*64+16,s=r.chance(.15);n.fillStyle=`#3b3a36`,n.fillRect(a-3,o-3,34,38),n.fillStyle=s?`#c9b77a`:r.chance(.3)?`#1b2228`:`#33434d`,n.fillRect(a,o,28,32),n.fillStyle=`#2a2a28`,n.fillRect(a+13,o,2,32),n.fillRect(a,o+15,28,2)}return rd(t,!0)})},bark(){return id(`bark`,()=>{let[e,t]=nd(128),n=ad(128,41,30,3),r=t.createImageData(128,128);for(let e=0;e<128;e++)for(let t=0;t<128;t++){let i=e*128+t,a=.6+(.5+.5*Math.sin(t/128*Math.PI*16+n[i]*4))*.3+n[i]*.2;r.data[i*4]=92*a,r.data[i*4+1]=72*a,r.data[i*4+2]=52*a,r.data[i*4+3]=255}return t.putImageData(r,0,0),rd(e,!0)})},rock(){return id(`rock`,()=>rd(sd(ad(256,51,10,5),256,.55,1),!0))},rockNormal(){return id(`rockNormal`,()=>rd(od(ad(256,52,14,5),256,6),!1))},waterNormal(){return id(`waterNormal`,()=>rd(od(ad(256,61,8,4),256,3),!1))},softParticle(){return id(`softParticle`,()=>{let[e,t]=nd(128),n=ad(128,71,6,4),r=t.createImageData(128,128);for(let e=0;e<128;e++)for(let t=0;t<128;t++){let i=(t-64)/64,a=(e-64)/64,o=Math.sqrt(i*i+a*a),s=Math.max(0,1-o)**1.5*(.6+.6*n[e*128+t]),c=(e*128+t)*4;r.data[c]=r.data[c+1]=r.data[c+2]=255,r.data[c+3]=Math.min(255,s*255)}return t.putImageData(r,0,0),rd(e,!1,!1)})},scorch(){return id(`scorch`,()=>{let[e,t]=nd(128),n=t.createRadialGradient(64,64,4,64,64,62);return n.addColorStop(0,`rgba(5,5,5,1)`),n.addColorStop(.15,`rgba(20,18,16,0.95)`),n.addColorStop(.5,`rgba(40,34,28,0.55)`),n.addColorStop(1,`rgba(40,34,28,0)`),t.fillStyle=n,t.fillRect(0,0,128,128),rd(e,!0,!1)})},trackMark(){return id(`trackMark`,()=>{let[e,t]=nd(64);t.clearRect(0,0,64,64);for(let e=0;e<64;e+=8)t.fillStyle=`rgba(30,24,16,0.55)`,t.fillRect(6,e,52,5);return rd(e,!0)})},hangarFloor(){return id(`hangarFloor`,()=>{let[e,t]=nd(512),n=ad(512,81,8,4),r=t.createImageData(512,512);for(let e=0;e<262144;e++){let t=70+n[e]*40;r.data[e*4]=t,r.data[e*4+1]=t*.98,r.data[e*4+2]=t*.94,r.data[e*4+3]=255}t.putImageData(r,0,0),t.strokeStyle=`rgba(20,20,20,0.6)`,t.lineWidth=3;for(let e=0;e<=512;e+=128)t.beginPath(),t.moveTo(e,0),t.lineTo(e,512),t.moveTo(0,e),t.lineTo(512,e),t.stroke();return rd(e,!0)})}};function ld(e){let t=parseInt(e.replace(`#`,``),16);return[t>>16&255,t>>8&255,t&255]}var ud=`
  attribute float size;
  attribute vec4 rgba;
  varying vec4 vColor;
  uniform float scale;
  #include <fog_pars_vertex>
  void main() {
    vColor = rgba;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * scale / max(0.1, -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`,dd=`
  uniform sampler2D map;
  varying vec4 vColor;
  #include <common>
  #include <fog_pars_fragment>
  void main() {
    vec4 t = texture2D(map, gl_PointCoord);
    gl_FragColor = vec4(vColor.rgb * t.rgb, vColor.a * t.a);
    if (gl_FragColor.a < 0.004) discard;
    #include <fog_fragment>
  }
`,fd=class{capacity;points;pos;rgba;size;vel;life;maxLife;grow;baseSize;startCol;endCol;alpha;drag;gravity;count=0;geo;material;constructor(e,t,n){this.capacity=e,this.pos=new Float32Array(e*3),this.rgba=new Float32Array(e*4),this.size=new Float32Array(e),this.vel=new Float32Array(e*3),this.life=new Float32Array(e),this.maxLife=new Float32Array(e),this.grow=new Float32Array(e),this.baseSize=new Float32Array(e),this.startCol=new Float32Array(e*3),this.endCol=new Float32Array(e*3),this.alpha=new Float32Array(e),this.drag=new Float32Array(e),this.gravity=new Float32Array(e),this.geo=new lr,this.geo.setAttribute(`position`,new Jn(this.pos,3).setUsage(Ve)),this.geo.setAttribute(`rgba`,new Jn(this.rgba,4).setUsage(Ve)),this.geo.setAttribute(`size`,new Jn(this.size,1).setUsage(Ve)),this.geo.setDrawRange(0,0),this.material=new wi({uniforms:{map:{value:cd.softParticle()},scale:{value:600},fogColor:{value:new J},fogDensity:{value:0},fogNear:{value:1},fogFar:{value:1e3}},vertexShader:ud,fragmentShader:dd,transparent:!0,depthWrite:!1,blending:t,fog:n}),this.points=new ti(this.geo,this.material),this.points.frustumCulled=!1}spawn(e){if(this.count>=this.capacity)return;let t=this.count++;this.pos.set([e.pos.x,e.pos.y,e.pos.z],t*3),this.vel.set([e.vel.x,e.vel.y,e.vel.z],t*3),this.life[t]=0,this.maxLife[t]=e.life,this.baseSize[t]=e.size,this.grow[t]=e.grow,this.startCol.set([e.color.r,e.color.g,e.color.b],t*3);let n=e.endColor??e.color;this.endCol.set([n.r,n.g,n.b],t*3),this.alpha[t]=e.alpha,this.drag[t]=e.drag,this.gravity[t]=e.gravity}kill(e){let t=--this.count;if(e===t)return;let n=(n,r)=>n.copyWithin(e*r,t*r,t*r+r);n(this.pos,3),n(this.vel,3),n(this.startCol,3),n(this.endCol,3),n(this.life,1),n(this.maxLife,1),n(this.baseSize,1),n(this.grow,1),n(this.alpha,1),n(this.drag,1),n(this.gravity,1)}update(e){for(let t=this.count-1;t>=0;t--)this.life[t]+=e,this.life[t]>=this.maxLife[t]&&this.kill(t);for(let t=0;t<this.count;t++){let n=this.life[t]/this.maxLife[t],r=Math.max(0,1-this.drag[t]*e);this.vel[t*3]*=r,this.vel[t*3+1]=this.vel[t*3+1]*r-this.gravity[t]*e,this.vel[t*3+2]*=r,this.pos[t*3]+=this.vel[t*3]*e,this.pos[t*3+1]+=this.vel[t*3+1]*e,this.pos[t*3+2]+=this.vel[t*3+2]*e,this.size[t]=this.baseSize[t]*(1+this.grow[t]*n);for(let e=0;e<3;e++)this.rgba[t*4+e]=this.startCol[t*3+e]*(1-n)+this.endCol[t*3+e]*n;let i=Math.min(1,n*8);this.rgba[t*4+3]=this.alpha[t]*i*(1-n)*(1-n*.3)}this.geo.setDrawRange(0,this.count),this.geo.getAttribute(`position`).needsUpdate=!0,this.geo.getAttribute(`rgba`).needsUpdate=!0,this.geo.getAttribute(`size`).needsUpdate=!0}get active(){return this.count}dispose(){this.geo.dispose(),this.material.dispose()}},pd=new G,md=new G,hd=new ct,gd=new At,_d=new G(0,0,1),vd=class{group=new rn;smoke;glow;tracers;decals=[];decalGeo=new mi(1,1);decalMat=new xr({map:cd.scorch(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4});lights=[];marks;quality;constructor(e,t){this.quality={low:.4,medium:.7,high:1,ultra:1.3}[t];let n=Math.round(3500*this.quality);this.smoke=new fd(n,1,!0),this.glow=new fd(Math.round(n*.5),2,!1),this.group.add(this.smoke.points,this.glow.points);let r=new li(.06,.06,1,5,1,!0);r.rotateX(Math.PI/2),r.translate(0,0,-.5);let i=new xr({color:16777215,blending:2,transparent:!0,depthWrite:!1});this.tracers=new Gr(r,i,160),this.tracers.frustumCulled=!1,this.tracers.instanceMatrix.setUsage(Ve),this.tracers.count=0,this.group.add(this.tracers);for(let e=0;e<3;e++){let e=new da(16756848,0,40,2);this.group.add(e),this.lights.push({light:e,t:1,dur:1,peak:0})}this.marks=new yd(Math.round(2400*this.quality)),this.group.add(this.marks.mesh),e.add(this.group)}setPixelScale(e,t){let n=e/(2*Math.tan(t*Math.PI/360));this.smoke.material.uniforms.scale.value=n,this.glow.material.uniforms.scale.value=n}flash(e,t,n,r=16756848){let i=this.lights.reduce((e,t)=>e.t/e.dur>t.t/t.dur?e:t);i.light.position.copy(e),i.light.color.setHex(r),i.t=0,i.dur=n,i.peak=t}n(e){return Math.max(1,Math.round(e*this.quality))}muzzleFlash(e,t,n){let r=n/100;for(let n=0;n<this.n(6);n++)this.glow.spawn({pos:pd.copy(e).addScaledVector(t,Math.random()*1.2*r),vel:md.copy(t).multiplyScalar(8+Math.random()*12),life:.08+Math.random()*.06,size:(1.6+Math.random()*1.2)*r+.6,grow:1,color:new J(1,.75,.35),alpha:1,drag:4,gravity:0});for(let n=0;n<this.n(10);n++){let n=new G(Math.random()-.5,(Math.random()-.2)*.6,Math.random()-.5);this.smoke.spawn({pos:pd.copy(e),vel:md.copy(t).multiplyScalar(4+Math.random()*6).add(n.multiplyScalar(4)),life:1.2+Math.random()*1.4,size:(1.6+Math.random())*r+.8,grow:2.6,color:new J(.62,.6,.56),endColor:new J(.75,.74,.7),alpha:.28,drag:1.8,gravity:-.12})}this.flash(e,30*r+10,.12)}explosion(e,t,n){for(let n=0;n<this.n(14*t);n++){let n=new G(Math.random()-.5,Math.random()*.8,Math.random()-.5).normalize().multiplyScalar(4+Math.random()*8*t);this.glow.spawn({pos:pd.copy(e),vel:n,life:.2+Math.random()*.25,size:2.2*t+Math.random(),grow:1.5,color:new J(1,.6,.2),endColor:new J(.6,.2,.05),alpha:1,drag:3,gravity:0})}for(let r=0;r<this.n(16*t);r++){let r=new G(Math.random()-.5,.4+Math.random(),Math.random()-.5).multiplyScalar(3+Math.random()*5*t),i=n??new J(.25,.24,.22);this.smoke.spawn({pos:pd.copy(e),vel:r,life:1.5+Math.random()*2.5,size:2.5*t+Math.random()*2,grow:2.5,color:i,endColor:new J(.45,.44,.42),alpha:.7,drag:1.4,gravity:n?1.5:-.4})}for(let n=0;n<this.n(10*t);n++){let t=new G(Math.random()-.5,Math.random(),Math.random()-.5).normalize().multiplyScalar(10+Math.random()*15);this.glow.spawn({pos:pd.copy(e),vel:t,life:.4+Math.random()*.5,size:.25,grow:0,color:new J(1,.8,.4),alpha:1,drag:.5,gravity:9})}this.flash(e,60*t,.35)}sparks(e,t,n=14){for(let r=0;r<this.n(n);r++){let n=new G(Math.random()-.5,Math.random()-.5,Math.random()-.5).multiplyScalar(.9).add(t).normalize().multiplyScalar(6+Math.random()*14);this.glow.spawn({pos:pd.copy(e),vel:n,life:.25+Math.random()*.35,size:.18+Math.random()*.12,grow:0,color:new J(1,.85,.5),alpha:1,drag:1,gravity:9.8})}this.flash(e,12,.08,16773312)}dust(e,t,n,r=1.5){for(let i=0;i<this.n(n);i++){let n=new G((Math.random()-.5)*2,Math.random()*1.5,(Math.random()-.5)*2);this.smoke.spawn({pos:pd.copy(e).add(new G((Math.random()-.5)*1.5,0,(Math.random()-.5)*1.5)),vel:n,life:1.2+Math.random()*1.5,size:r+Math.random(),grow:2.2,color:t,alpha:.35,drag:1.2,gravity:-.1})}}splash(e,t){for(let n=0;n<this.n(18*t);n++){let n=new G((Math.random()-.5)*3,6+Math.random()*8*t,(Math.random()-.5)*3);this.smoke.spawn({pos:pd.copy(e),vel:n,life:.9+Math.random()*.6,size:1+Math.random()*t,grow:1.5,color:new J(.85,.9,.95),alpha:.65,drag:.6,gravity:12})}}debris(e,t,n){for(let r=0;r<this.n(n);r++){let n=new G(Math.random()-.5,Math.random()*1.2,Math.random()-.5).multiplyScalar(6+Math.random()*6);this.smoke.spawn({pos:pd.copy(e),vel:n,life:.8+Math.random()*.8,size:.35+Math.random()*.3,grow:0,color:t,alpha:1,drag:.3,gravity:12})}this.dust(e,t.clone().lerp(new J(.6,.58,.55),.5),n*.6,2.5)}fire(e,t,n){Math.random()<t*40*n*this.quality&&this.glow.spawn({pos:pd.copy(e).add(new G((Math.random()-.5)*1.2,0,(Math.random()-.5)*1.2)),vel:new G(0,2+Math.random()*2,0),life:.4+Math.random()*.4,size:1.4+Math.random(),grow:-.3,color:new J(1,.55,.15),endColor:new J(.7,.15,.05),alpha:.9,drag:.5,gravity:-1}),this.smokeColumn(e,t,n)}smokeColumn(e,t,n){Math.random()<t*14*n*this.quality&&this.smoke.spawn({pos:pd.copy(e).add(new G(Math.random()-.5,0,Math.random()-.5)),vel:new G((Math.random()-.5)*.6+.6,2.5+Math.random(),(Math.random()-.5)*.6),life:4+Math.random()*3,size:2+Math.random(),grow:4,color:new J(.12,.11,.1),endColor:new J(.35,.34,.33),alpha:.55,drag:.15,gravity:-.15})}artyTrail(e){this.smoke.spawn({pos:pd.copy(e),vel:new G(0,.3,0),life:1.2,size:.9,grow:2,color:new J(.7,.7,.68),alpha:.35,drag:.5,gravity:0})}decal(e,t,n,r){let i;this.decals.length<80?(i={mesh:new Nr(this.decalGeo,this.decalMat),age:0},this.decals.push(i)):i=this.decals.reduce((e,t)=>e.age>t.age?e:t),i.age=0,i.mesh.removeFromParent(),e.add(i.mesh),i.mesh.position.copy(t).addScaledVector(n,.02),i.mesh.quaternion.setFromUnitVectors(_d,n),i.mesh.scale.setScalar(r)}trackMark(e,t,n,r,i){this.marks.add(e,t,n,r,i)}setTracers(e){let t=Math.min(e.length,160);for(let n=0;n<t;n++){let t=e[n];pd.copy(t.vel).normalize(),hd.setFromUnitVectors(_d,pd),gd.compose(t.pos,hd,md.set(1.4,1.4,t.length)),this.tracers.setMatrixAt(n,gd),this.tracers.setColorAt(n,t.color)}this.tracers.count=t,this.tracers.instanceMatrix.needsUpdate=!0,this.tracers.instanceColor&&(this.tracers.instanceColor.needsUpdate=!0)}update(e){this.smoke.update(e),this.glow.update(e);for(let t of this.decals)t.age+=e;for(let t of this.lights){t.t+=e;let n=Math.max(0,1-t.t/t.dur);t.light.intensity=t.peak*n*n}}get particleCount(){return this.smoke.active+this.glow.active}dispose(){this.smoke.dispose(),this.glow.dispose(),this.tracers.dispose(),this.decalGeo.dispose(),this.decalMat.dispose(),this.marks.dispose(),this.group.removeFromParent()}},yd=class{capacity;mesh;pos;uv;next=0;geo;constructor(e){this.capacity=e,this.geo=new lr,this.pos=new Float32Array(e*6*3),this.uv=new Float32Array(e*6*2),this.geo.setAttribute(`position`,new Jn(this.pos,3).setUsage(Ve)),this.geo.setAttribute(`uv`,new Jn(this.uv,2));let t=new xr({map:cd.trackMark(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,opacity:.8});this.mesh=new Nr(this.geo,t),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}add(e,t,n,r,i){let a=Math.sin(n)*.45,o=Math.cos(n)*.45,s=-Math.cos(n)*r*.5,c=Math.sin(n)*r*.5,l=[[e-a-s,t-o-c],[e-a+s,t-o+c],[e+a+s,t+o+c],[e+a-s,t+o-c]].map(([e,t])=>[e,i(e,t)+.05,t]),u=[0,1,2,0,2,3],d=[[0,0],[1,0],[1,1],[0,1]],f=this.next*18;u.forEach((e,t)=>{this.pos[f+t*3]=l[e][0],this.pos[f+t*3+1]=l[e][1],this.pos[f+t*3+2]=l[e][2],this.uv[this.next*12+t*2]=d[e][0],this.uv[this.next*12+t*2+1]=d[e][1]}),this.next=(this.next+1)%this.capacity,this.geo.getAttribute(`position`).needsUpdate=!0,this.geo.getAttribute(`uv`).needsUpdate=!0}dispose(){this.geo.dispose(),this.mesh.material.dispose()}},bd=class{size;cell;waterLevel;half;res;verts;heights;surface;ice;constructor(e,t,n){this.size=e,this.cell=t,this.waterLevel=n,this.half=e/2,this.res=Math.round(e/t),this.verts=this.res+1,this.heights=new Float32Array(this.verts*this.verts),this.surface=new Uint8Array(this.res*this.res),this.ice=new Uint8Array(this.res*this.res)}vertexX(e){return-this.half+e*this.cell}getVertexHeight(e,t){return e=Z(e,0,this.verts-1),t=Z(t,0,this.verts-1),this.heights[t*this.verts+e]}heightAt(e,t){let n=Z((e+this.half)/this.cell,0,this.res-1e-4),r=Z((t+this.half)/this.cell,0,this.res-1e-4),i=Math.floor(n),a=Math.floor(r),o=n-i,s=r-a,c=this.verts,l=this.heights[a*c+i],u=this.heights[a*c+i+1],d=this.heights[(a+1)*c+i],f=this.heights[(a+1)*c+i+1];return(l*(1-o)+u*o)*(1-s)+(d*(1-o)+f*o)*s}normalAt(e,t,n=new G){let r=this.cell,i=this.heightAt(e-r,t),a=this.heightAt(e+r,t),o=this.heightAt(e,t-r),s=this.heightAt(e,t+r);return n.set(i-a,2*r,o-s).normalize()}slopeAt(e,t){let n=this.cell,r=(this.heightAt(e+n,t)-this.heightAt(e-n,t))/(2*n),i=(this.heightAt(e,t+n)-this.heightAt(e,t-n))/(2*n);return Math.sqrt(r*r+i*i)}cellIndex(e,t){let n=Z(Math.floor((e+this.half)/this.cell),0,this.res-1);return Z(Math.floor((t+this.half)/this.cell),0,this.res-1)*this.res+n}surfaceAt(e,t){return Nu[this.surface[this.cellIndex(e,t)]]}isIce(e,t){return this.ice[this.cellIndex(e,t)]===1}waterDepthAt(e,t){return this.isIce(e,t)?0:Math.max(0,this.waterLevel-this.heightAt(e,t))}inBounds(e,t,n=0){let r=this.half-n;return e>-r&&e<r&&t>-r&&t<r}raycast(e,t,n,r=this.cell*.5){let i=0,a=e.y-this.heightAt(e.x,e.z);if(a<0)return 0;for(let o=r;o<=n+r;o+=r){let r=Math.min(o,n),s=e.x+t.x*r,c=e.y+t.y*r,l=e.z+t.z*r,u=c-this.heightAt(s,l);if(u<0){let n=i,a=r;for(let r=0;r<6;r++){let r=(n+a)/2;e.y+t.y*r-this.heightAt(e.x+t.x*r,e.z+t.z*r)<0?a=r:n=r}return a}if(i=r,a=u,r>=n)break}return-1}segmentClear(e,t,n=this.cell){let r=t.x-e.x,i=t.y-e.y,a=t.z-e.z,o=Math.sqrt(r*r+i*i+a*a),s=Math.max(1,Math.ceil(o/n));for(let t=1;t<s;t++){let n=t/s;if(e.y+i*n<this.heightAt(e.x+r*n,e.z+a*n))return!1}return!0}},xd=16,Sd=class{colliders=[];foliage=[];cells;foliageCells;dim;half;stamp=1;stamps=new Uint32Array(1024);fstamps=new Uint32Array(1024);constructor(e){this.half=e/2,this.dim=Math.ceil(e/xd),this.cells=Array.from({length:this.dim*this.dim},()=>[]),this.foliageCells=Array.from({length:this.dim*this.dim},()=>[])}cellCoord(e){return Math.max(0,Math.min(this.dim-1,Math.floor((e+this.half)/xd)))}addCollider(e){let t={...e,id:this.colliders.length,alive:!0,foliage:e.foliage??[]};this.colliders.push(t);let n=t.shape===`circle`?t.r:Math.hypot(t.hx,t.hz);for(let e=this.cellCoord(t.z-n);e<=this.cellCoord(t.z+n);e++)for(let r=this.cellCoord(t.x-n);r<=this.cellCoord(t.x+n);r++)this.cells[e*this.dim+r].push(t.id);if(this.stamps.length<this.colliders.length){let e=new Uint32Array(this.stamps.length*2);e.set(this.stamps),this.stamps=e}return t}addFoliage(e){let t={...e,id:this.foliage.length,alive:!0};this.foliage.push(t);for(let n=this.cellCoord(e.z-e.r);n<=this.cellCoord(e.z+e.r);n++)for(let r=this.cellCoord(e.x-e.r);r<=this.cellCoord(e.x+e.r);r++)this.foliageCells[n*this.dim+r].push(t.id);if(this.fstamps.length<this.foliage.length){let e=new Uint32Array(this.fstamps.length*2);e.set(this.fstamps),this.fstamps=e}return t}queryCircle(e,t,n,r){let i=++this.stamp;for(let a=this.cellCoord(t-n);a<=this.cellCoord(t+n);a++)for(let t=this.cellCoord(e-n);t<=this.cellCoord(e+n);t++)for(let e of this.cells[a*this.dim+t]){if(this.stamps[e]===i)continue;this.stamps[e]=i;let t=this.colliders[e];t.alive&&r(t)}}queryFoliage(e,t,n,r){let i=++this.stamp;for(let a=this.cellCoord(t-n);a<=this.cellCoord(t+n);a++)for(let t=this.cellCoord(e-n);t<=this.cellCoord(e+n);t++)for(let e of this.foliageCells[a*this.dim+t]){if(this.fstamps[e]===i)continue;this.fstamps[e]=i;let t=this.foliage[e];t.alive&&r(t)}}circlePenetration(e,t,n,r,i){if(e.shape===`circle`){let a=t-e.x,o=n-e.z,s=Math.sqrt(a*a+o*o),c=r+e.r-s;return c<=0?!1:(i.nx=s>1e-6?a/s:1,i.nz=s>1e-6?o/s:0,i.depth=c,!0)}let a=Math.cos(e.rot),o=Math.sin(e.rot),s=t-e.x,c=n-e.z,l=s*a-c*o,u=s*o+c*a,d=Math.max(-e.hx,Math.min(e.hx,l)),f=Math.max(-e.hz,Math.min(e.hz,u)),p=l-d,m=u-f,h=Math.sqrt(p*p+m*m),g;if(h<1e-6){let t=e.hx-Math.abs(l),n=e.hz-Math.abs(u);t<n?(p=Math.sign(l)||1,m=0,g=t+r):(p=0,m=Math.sign(u)||1,g=n+r),h=1}else if(g=r-h,g<=0)return!1;let _=p/h,v=m/h;return i.nx=_*a+v*o,i.nz=-_*o+v*a,i.depth=g,!0}rayCollider(e,t,n,r,i){if(e.shape===`circle`){let a=t.x-e.x,o=t.z-e.z,s=n.x*n.x+n.z*n.z;if(s<1e-9){if(a*a+o*o>e.r*e.r)return-1;let s=n.y>0?(e.y0-t.y)/n.y:(e.y1-t.y)/n.y;return s<0||s>r?-1:(i.set(0,n.y>0?-1:1,0),s)}let c=a*n.x+o*n.z,l=a*a+o*o-e.r*e.r,u=c*c-s*l;if(u<0)return-1;let d=Math.sqrt(u),f=(-c-d)/s;if(f<0&&(f=l<0?0:(-c+d)/s),f<0||f>r)return-1;let p=t.y+n.y*f;if(p<e.y0||p>e.y1){if(n.y<0&&t.y>e.y1){let s=(e.y1-t.y)/n.y,c=a+n.x*s,l=o+n.z*s;if(s>=0&&s<=r&&c*c+l*l<=e.r*e.r)return i.set(0,1,0),s}return-1}return i.set(a+n.x*f,0,o+n.z*f).normalize(),f}let a=Math.cos(e.rot),o=Math.sin(e.rot),s=t.x-e.x,c=t.z-e.z,l=[s*a-c*o,t.y-(e.y0+e.y1)/2,s*o+c*a],u=[n.x*a-n.z*o,n.y,n.x*o+n.z*a],d=[e.hx,(e.y1-e.y0)/2,e.hz],f=0,p=r,m=-1,h=1;for(let e=0;e<3;e++){if(Math.abs(u[e])<1e-9){if(l[e]<-d[e]||l[e]>d[e])return-1;continue}let t=(-d[e]-l[e])/u[e],n=(d[e]-l[e])/u[e],r=-1;if(t>n){let e=t;t=n,n=e,r=1}if(t>f&&(f=t,m=e,h=r),p=Math.min(p,n),f>p)return-1}if(m===-1)return i.set(-n.x,-n.y,-n.z),0;let g=[0,0,0];return g[m]=h,i.set(g[0]*a+g[2]*o,g[1],-g[0]*o+g[2]*a),f}raycast(e,t,n,r,i){let a=++this.stamp,o=null,s=new G,c=Math.ceil(n/(xd*.5))+1;for(let l=0;l<=c;l++){let c=Math.min(n,l*xd*.5);if(o&&c-xd>o.t)break;let u=e.x+t.x*c,d=e.z+t.z*c,f=this.cellCoord(u),p=this.cellCoord(d);for(let c=Math.max(0,p-1);c<=Math.min(this.dim-1,p+1);c++)for(let l=Math.max(0,f-1);l<=Math.min(this.dim-1,f+1);l++)for(let u of this.cells[c*this.dim+l]){if(this.stamps[u]===a)continue;this.stamps[u]=a;let c=this.colliders[u];if(!c.alive||!r(c))continue;let l=this.rayCollider(c,e,t,o?o.t:n,s);l>=0&&(!o||l<o.t)&&(o=i??{t:0,collider:c,normal:new G},o.t=l,o.collider=c,o.normal.copy(s))}if(c>=n)break}return o}foliageAlong(e,t,n){let r=t.x-e.x,i=t.z-e.z,a=Math.sqrt(r*r+i*i);if(a<.001)return 0;let o=r/a,s=i/a,c=0,l=++this.stamp;for(let r=0;r<=a;r+=xd*.5){let i=this.cellCoord(e.x+o*r),u=this.cellCoord(e.z+s*r);for(let r of this.foliageCells[u*this.dim+i]){if(this.fstamps[r]===l)continue;this.fstamps[r]=l;let i=this.foliage[r];if(!i.alive)continue;let u=i.x-e.x,d=i.z-e.z,f=u*o+d*s;if(f<n||f>a+i.r||Math.abs(u*s-d*o)>i.r)continue;let p=e.y+(t.y-e.y)*Math.min(1,f/a);p<i.y0||p>i.y1+.5||(c+=i.camo)}}return c}foliageAt(e,t,n){let r=0;return this.queryFoliage(e,t,n+4,i=>{Math.hypot(i.x-e,i.z-t)<i.r+n*.6&&(r=Math.max(r,i.camo))}),r}destroy(e){e.alive=!1;for(let t of e.foliage)this.foliage[t].alive=!1}},Cd=[`pine`,`broadleaf`,`palm`,`birch`,`dead`],wd=[`stone`,`wood`,`adobe`,`concrete`],Td={houseWood:{kind:`house`,strength:210,hp:260,passThrough:!1},houseAdobe:{kind:`house`,strength:300,hp:380,passThrough:!1},fence:{kind:`fence`,strength:4,hp:1,passThrough:!0},tree:{kind:`tree`,strength:38,hp:40,passThrough:!0},car:{kind:`car`,strength:45,hp:120,passThrough:!1},crate:{kind:`crate`,strength:6,hp:1,passThrough:!0},wall:{kind:`wall`,strength:150,hp:300,passThrough:!1},barricade:{kind:`barricade`,strength:420,hp:600,passThrough:!1},wagon:{kind:`wagon`,strength:900,hp:900,passThrough:!1}},Ed=12,Dd=48;function Od(e,t,n){let r=1/0,i=0,a=0;for(let o=0;o<n.length-1;o++){let[s,c]=n[o],[l,u]=n[o+1],d=l-s,f=u-c,p=d*d+f*f,m=p>0?Z(((e-s)*d+(t-c)*f)/p,0,1):0,h=e-(s+d*m),g=t-(c+f*m),_=Math.sqrt(h*h+g*g);_<r&&(r=_,i=o,a=m)}return{d:r,seg:i,t:a}}var kd=(e,t)=>e>=t?0:.5*(1+Math.cos(Math.PI*e/t)),Ad=class{data;rng;noise;noise2;terrain;statics;props=[];roads=[];rails=[];reserved=[];constructor(e,t=2){this.data=e,this.rng=new hl(e.seed),this.noise=new ed(e.seed),this.noise2=new ed(e.seed^1540483477),this.terrain=new bd(e.size,t,e.waterLevel),this.statics=new Sd(e.size)}build(){for(let e of this.steps());return this.result()}result(){return{data:this.data,terrain:this.terrain,statics:this.statics,props:this.props,roads:this.roads,rails:this.rails}}*steps(){yield`Рельеф`,this.buildHeights(),yield`Покрытия`,this.buildSurfaces(),yield`Постройки`,this.reserveZones(),this.placeStructures(),yield`Растительность`,this.placeNature(),yield`Готово`}buildHeights(){let{terrain:e,data:t}=this,n=t.biome,r=e.verts,i=e.heights,a=e.half;for(let t=0;t<r;t++)for(let a=0;a<r;a++){let o=e.vertexX(a),s=e.vertexX(t),c=Ed+this.noise.fbm(o*n.noiseScale,s*n.noiseScale,5)*n.noiseAmp;c+=this.noise2.fbm(o*.03,s*.03,2)*.35,i[t*r+a]=c}let o=t.features.filter(e=>[`hill`,`ridge`,`mountains`,`plateau`,`dunes`].includes(e.type));for(let e of o)this.applyAdditive(e);let s=t.features.filter(e=>e.type===`road`),c=s.map(n=>n.points.map(([n,r])=>Math.max(e.heightAt(n,r),t.waterLevel+.5)));for(let e of t.features)(e.type===`valley`||e.type===`river`||e.type===`lake`||e.type===`sea`)&&this.applyCarve(e);let l=t.features.find(e=>e.type===`sea`);for(let t=0;t<r;t++)for(let n=0;n<r;n++){let o=e.vertexX(n),s=e.vertexX(t),c=Math.max(Math.abs(o),Math.abs(s));if(l&&(l.side===`east`?o:l.side===`west`?-o:l.side===`north`?s:-s)>l.distance-40)continue;let u=cl(a-48,a-4,c);u>0&&(i[t*r+n]+=u*(28+12*this.noise.ridged(o*.01,s*.01,3)))}let u=[];for(let e of t.features)(e.type===`town`||e.type===`industrial`)&&u.push({x:e.at[0],z:e.at[1],rx:e.size[0]/2+30,rz:e.size[1]/2+30}),e.type===`village`&&u.push({x:e.at[0],z:e.at[1],rx:e.radius+20,rz:e.radius+20});for(let e of[t.bases.a,t.bases.b,t.bases.neutral,t.spawns.a,t.spawns.b])u.push({x:e[0],z:e[1],rx:55,rz:55});for(let e of u)this.flattenArea(e.x,e.z,e.rx,e.rz,.8);s.forEach((e,t)=>{let n=c[t];this.forEachVertexNear(e.points,e.width/2+10,(t,r,a)=>{let{d:o,seg:s,t:c}=Od(r,a,e.points),l=n[s]*(1-c)+n[s+1]*c,u=1-cl(e.width/2,e.width/2+10,o);i[t]=i[t]*(1-u)+l*u})})}forEachVertexNear(e,t,n){let r=1/0,i=-1/0,a=1/0,o=-1/0;for(let[t,n]of e)r=Math.min(r,t),i=Math.max(i,t),a=Math.min(a,n),o=Math.max(o,n);this.forEachVertexInRect(r-t,a-t,i+t,o+t,n)}forEachVertexInRect(e,t,n,r,i){let a=this.terrain,o=Z(Math.floor((e+a.half)/a.cell),0,a.verts-1),s=Z(Math.ceil((n+a.half)/a.cell),0,a.verts-1),c=Z(Math.floor((t+a.half)/a.cell),0,a.verts-1),l=Z(Math.ceil((r+a.half)/a.cell),0,a.verts-1);for(let e=c;e<=l;e++)for(let t=o;t<=s;t++)i(e*a.verts+t,a.vertexX(t),a.vertexX(e))}applyAdditive(e){let t=this.terrain.heights;switch(e.type){case`hill`:this.forEachVertexInRect(e.at[0]-e.radius,e.at[1]-e.radius,e.at[0]+e.radius,e.at[1]+e.radius,(n,r,i)=>{let a=Math.hypot(r-e.at[0],i-e.at[1]);t[n]+=e.height*kd(a,e.radius)*(.85+.3*this.noise2.noise(r*.02,i*.02))});break;case`mountains`:this.forEachVertexInRect(e.at[0]-e.radius,e.at[1]-e.radius,e.at[0]+e.radius,e.at[1]+e.radius,(n,r,i)=>{let a=kd(Math.hypot(r-e.at[0],i-e.at[1]),e.radius);a>0&&(t[n]+=e.height*a*(.45+1.1*this.noise.ridged(r*.008,i*.008,4)))});break;case`plateau`:this.forEachVertexInRect(e.at[0]-e.radius*1.2,e.at[1]-e.radius*1.2,e.at[0]+e.radius*1.2,e.at[1]+e.radius*1.2,(n,r,i)=>{let a=Math.hypot(r-e.at[0],i-e.at[1])*(1+.15*this.noise2.noise(r*.03,i*.03));t[n]+=e.height*(1-cl(e.radius*.7,e.radius*1.05,a))});break;case`ridge`:this.forEachVertexNear(e.points,e.width,(n,r,i)=>{let{d:a}=Od(r,i,e.points),o=kd(a,e.width);o>0&&(t[n]+=e.height*o*(1+(e.rough??.3)*.5*this.noise.noise(r*.02,i*.02)))});break;case`dunes`:{let n=Math.cos(e.direction),r=Math.sin(e.direction);this.forEachVertexInRect(e.at[0]-e.radius,e.at[1]-e.radius,e.at[0]+e.radius,e.at[1]+e.radius,(i,a,o)=>{let s=kd(Math.hypot(a-e.at[0],o-e.at[1]),e.radius);if(s<=0)return;let c=(a*n+o*r)*.035+this.noise2.noise(a*.01,o*.01)*2,l=(.5+.5*Math.sin(c))**1.6;t[i]+=e.height*s*l});break}}}applyCarve(e){let t=this.terrain,n=t.heights,r=this.data.waterLevel;switch(e.type){case`valley`:this.forEachVertexNear(e.points,e.width,(t,r,i)=>{let{d:a}=Od(r,i,e.points);n[t]-=e.depth*kd(a,e.width)});break;case`river`:this.forEachVertexNear(e.points,e.width/2+14,(t,i,a)=>{let{d:o}=Od(i,a,e.points),s=e.width/2;if(o<s){let i=r-e.depth*(1-o/s*(o/s));n[t]=Math.min(n[t],i)}else if(o<s+14){let e=1-cl(s,s+14,o),i=r+.3;n[t]>i&&(n[t]=n[t]*(1-e)+i*e)}});break;case`lake`:{let t=e.radius*1.35;this.forEachVertexInRect(e.at[0]-t,e.at[1]-t,e.at[0]+t,e.at[1]+t,(i,a,o)=>{let s=Math.hypot(a-e.at[0],o-e.at[1])*(1+.12*this.noise2.noise(a*.02,o*.02));if(e.frozen){if(s<e.radius)n[i]=r+.15;else if(s<t){let a=1-cl(e.radius,t,s);n[i]=n[i]*(1-a)+(r+.15)*a}return}if(s<e.radius)n[i]=Math.min(n[i],r-e.depth*(1-(s/e.radius)**2));else if(s<t){let a=1-cl(e.radius,t,s);n[i]>r+.3&&(n[i]=n[i]*(1-a)+(r+.3)*a)}});break}case`sea`:this.forEachVertexInRect(-t.half,-t.half,t.half,t.half,(t,i,a)=>{let o=e.side===`east`?i:e.side===`west`?-i:e.side===`north`?a:-a,s=e.distance+25*this.noise2.noise(i*.01,a*.01);if(o>s-50){let e=cl(s-50,s+40,o),i=r-8*cl(s,s+140,o)-.5;n[t]=n[t]*(1-e)+Math.min(n[t],i)*e,o>s-50&&o<s+10&&(n[t]=Math.min(n[t],r+1.5+(s-o)*.1))}})}}flattenArea(e,t,n,r,i){let a=this.terrain.heights,o=0,s=0;this.forEachVertexInRect(e-n*.6,t-r*.6,e+n*.6,t+r*.6,e=>{o+=a[e],s++});let c=Math.max(s?o/s:Ed,this.data.waterLevel+.6);this.forEachVertexInRect(e-n,t-r,e+n,t+r,(o,s,l)=>{let u=(s-e)/n,d=(l-t)/r,f=(1-cl(.6,1,Math.sqrt(u*u+d*d)))*i;f>0&&(a[o]=a[o]*(1-f)+c*f)})}setSurfaceRect(e,t,n,r,i){let a=this.terrain,o=Z(Math.floor((e+a.half)/a.cell),0,a.res-1),s=Z(Math.ceil((n+a.half)/a.cell),0,a.res-1),c=Z(Math.floor((t+a.half)/a.cell),0,a.res-1),l=Z(Math.ceil((r+a.half)/a.cell),0,a.res-1);for(let e=c;e<=l;e++)for(let t=o;t<=s;t++){let n=i(-a.half+(t+.5)*a.cell,-a.half+(e+.5)*a.cell);n&&(a.surface[e*a.res+t]=Pu[n])}}buildSurfaces(){let e=this.terrain,t=this.data.biome,n=this.data.waterLevel,r=t.ground===`snow`?`snow`:t.ground===`sand`?`sand`:`mud`;this.setSurfaceRect(-e.half,-e.half,e.half,e.half,(i,a)=>{let o=e.heightAt(i,a),s=e.slopeAt(i,a);if(s>.75)return t.steep;if(o<n+.4)return r;let c=this.noise2.fbm(i*.012,a*.012,3);return c>.28?t.secondary:s>.45&&c>-.1?t.steep:t.ground===`grass`&&c<-.42?`dirt`:t.ground});for(let t of this.data.features)switch(t.type){case`field`:{let e=Math.cos(t.rotation??0),n=Math.sin(t.rotation??0),r=Math.hypot(t.size[0],t.size[1])/2;this.setSurfaceRect(t.at[0]-r,t.at[1]-r,t.at[0]+r,t.at[1]+r,(r,i)=>{let a=r-t.at[0],o=i-t.at[1],s=a*e-o*n,c=a*n+o*e;return Math.abs(s)<t.size[0]/2&&Math.abs(c)<t.size[1]/2?t.surface:null});break}case`lake`:if(t.frozen){let n=t.radius;this.setSurfaceRect(t.at[0]-n,t.at[1]-n,t.at[0]+n,t.at[1]+n,(r,i)=>Math.hypot(r-t.at[0],i-t.at[1])*(1+.12*this.noise2.noise(r*.02,i*.02))<n?(e.ice[e.cellIndex(r,i)]=1,`snow`):null)}break;case`sea`:this.setSurfaceRect(-e.half,-e.half,e.half,e.half,(t,r)=>e.heightAt(t,r)<n+2.5&&e.slopeAt(t,r)<.5?`sand`:null);break;case`town`:case`industrial`:{let[e,n]=t.at,[r,i]=t.size;this.setSurfaceRect(e-r/2,n-i/2,e+r/2,n+i/2,()=>(t.type,`dirt`));break}}for(let e of this.data.features)e.type===`road`?(this.roads.push({points:e.points,width:e.width,surface:e.surface}),this.paintPolyline(e.points,e.width/2,e.surface)):e.type===`rail`&&(this.rails.push(e.points),this.paintPolyline(e.points,3,`stone`))}paintPolyline(e,t,n){let r=1/0,i=-1/0,a=1/0,o=-1/0;for(let[t,n]of e)r=Math.min(r,t),i=Math.max(i,t),a=Math.min(a,n),o=Math.max(o,n);let s=t+2;this.setSurfaceRect(r-s,a-s,i+s,o+s,(r,i)=>this.terrain.waterDepthAt(r,i)>.2?null:Od(r,i,e).d<t?n:null)}reserveZones(){let e=this.data;for(let t of[e.bases.a,e.bases.b,e.bases.neutral])this.reserved.push({x:t[0],z:t[1],r:Dd});for(let t of[e.spawns.a,e.spawns.b])this.reserved.push({x:t[0],z:t[1],r:60})}nearRoad(e,t,n){for(let r of this.roads)if(Od(e,t,r.points).d<r.width/2+n)return!0;for(let r of this.rails)if(Od(e,t,r).d<3+n)return!0;return!1}canPlace(e,t,n,r={}){let i=this.terrain;if(!i.inBounds(e,t,30+n)||i.waterDepthAt(e,t)>.05||i.heightAt(e,t)<this.data.waterLevel+.2||i.slopeAt(e,t)>(r.maxSlope??.5))return!1;if(!r.ignoreReserved){for(let r of this.reserved)if(Math.hypot(e-r.x,t-r.z)<r.r+n)return!1}if(!r.allowRoad&&this.nearRoad(e,t,n+1))return!1;let a=!0;return this.statics.queryCircle(e,t,n+1,r=>{a&&this.statics.circlePenetration(r,e,t,n+.5,{nx:0,nz:0,depth:0})&&(a=!1)}),a}addProp(e,t,n,r,i,a,o,s,c,l=0){let u=this.terrain,d=u.heightAt(t,n);if(c&&c.shape!==`circle`){let e=Math.cos(r),a=Math.sin(r);for(let[r,s]of[[i/2,o/2],[-i/2,o/2],[i/2,-o/2],[-i/2,-o/2]])d=Math.min(d,u.heightAt(t+r*e+s*a,n-r*a+s*e))}d+=l;let f={id:this.props.length,kind:e,x:t,y:d,z:n,rot:r,sx:i,sy:a,sz:o,variant:s,colliderId:-1};return c&&(f.colliderId=this.statics.addCollider({shape:c.shape??`box`,x:t,z:n,hx:c.hx??i/2,hz:c.hz??o/2,rot:r,r:c.r??Math.max(i,o)/2,y0:d-.5,y1:d+(c.y1??a),blocksMove:c.blocksMove??!0,blocksShell:c.blocksShell??!0,blocksView:c.blocksView??!0,destructible:c.destructible??null,propId:f.id,foliage:c.foliage}).id),this.props.push(f),f}placeBuilding(e,t,n,r,i,a,o){if(!this.canPlace(t,n,Math.max(i,a)*.55,{maxSlope:.35}))return!1;let s=wd.indexOf(e);return e===`wood`||e===`adobe`?this.addProp(`house`,t,n,r,i,o,a,s,{destructible:e===`wood`?Td.houseWood:Td.houseAdobe}):this.addProp(`building`,t,n,r,i,o,a,s,{}),!0}placeStructures(){for(let e of this.data.features)switch(e.type){case`town`:this.placeTown(e);break;case`industrial`:this.placeIndustrial(e);break;case`village`:this.placeVillage(e);break;case`lighthouse`:this.addProp(`lighthouse`,e.at[0],e.at[1],0,8,28,8,0,{shape:`circle`,r:4})}for(let e of this.rails)this.placeRail(e);for(let e of this.data.features)switch(e.type){case`ruins`:this.scatter(e.at,e.radius,e.count,3,(e,t,n)=>{let r=this.rng.range(4,10);this.addProp(`ruin`,e,t,n,r,this.rng.range(1.2,3.5),this.rng.range(.8,1.4),0,{})});break;case`barricades`:this.scatter(e.at,e.radius,e.count,2,(e,t,n)=>{this.addProp(`barricade`,e,t,n,2.4,1.4,2.4,this.rng.int(0,1),{destructible:Td.barricade})},!0);break;case`cars`:this.scatter(e.at,e.radius,e.count,3,(e,t,n)=>{this.addProp(`car`,e,t,n,1.9,1.5,4.3,this.rng.int(0,5),{destructible:Td.car,y1:1.5})},!0);break;case`crates`:this.scatter(e.at,e.radius,e.count,1.5,(e,t,n)=>{let r=this.rng.range(1.2,1.8);this.addProp(`crate`,e,t,n,r,r,r,this.rng.int(0,2),{destructible:Td.crate,blocksView:!1})})}}scatter(e,t,n,r,i,a=!1){let o=0;for(let s=0;s<n*8&&o<n;s++){let n=this.rng.next()*Math.PI*2,s=Math.sqrt(this.rng.next())*t,c=e[0]+Math.cos(n)*s,l=e[1]+Math.sin(n)*s;this.canPlace(c,l,r,{allowRoad:a})&&(i(c,l,this.rng.next()*Math.PI*2),o++)}}placeTown(e){let[t,n]=e.at,[r,i]=e.size,a=e.block,o=Math.floor(r/a),s=Math.floor(i/a),c=t-o*a/2,l=n-s*a/2;for(let e=0;e<=o;e++){let t=c+e*a;this.paintPolyline([[t,l],[t,l+s*a]],7,`asphalt`)}for(let e=0;e<=s;e++){let t=l+e*a;this.paintPolyline([[c,t],[c+o*a,t]],7,`asphalt`)}for(let t=0;t<o;t++)for(let n=0;n<s;n++){let r=c+t*a+a/2,i=l+n*a+a/2,o=a-14-4,s=this.rng.next();if(s<.14){for(let e=0;e<6;e++){let e=r+this.rng.range(-o/2,o/2),t=i+this.rng.range(-o/2,o/2);this.placeTree(e,t,`broadleaf`)}for(let e=0;e<4;e++)this.placeBush(r+this.rng.range(-o/2,o/2),i+this.rng.range(-o/2,o/2));continue}if(s<.22)continue;let u=this.rng.next()<(e.ruined??0),d=this.rng.int(1,2),f=this.rng.int(1,2),p=o/d,m=o/f;for(let t=0;t<d;t++)for(let n=0;n<f;n++){let a=r-o/2+p*(t+.5),s=i-o/2+m*(n+.5),c=p-this.rng.range(2,5),l=m-this.rng.range(2,5);u?this.canPlace(a,s,Math.max(c,l)*.5,{maxSlope:.4})&&(this.addProp(`ruin`,a,s,0,c,this.rng.range(2,6),l*.25,1,{}),this.addProp(`ruin`,a+c*.3,s+l*.3,Math.PI/2,l*.6,this.rng.range(1.5,4),c*.15,1,{})):this.placeBuilding(e.style,a,s,0,c,l,this.rng.range(8,19))}}}placeVillage(e){let t=0;for(let n=0;n<e.houses*12&&t<e.houses;n++){let n=this.rng.next()*Math.PI*2,r=Math.sqrt(this.rng.next())*e.radius,i=e.at[0]+Math.cos(n)*r,a=e.at[1]+Math.sin(n)*r,o=this.nearestRoadAngle(i,a)??this.rng.next()*Math.PI,s=this.rng.range(6,9),c=this.rng.range(5,7);if(this.placeBuilding(e.style,i,a,o,s,c,this.rng.range(4,6))){if(t++,this.rng.chance(.55)&&e.style!==`stone`){let e=Math.cos(o),t=Math.sin(o),n=s/2+4,r=c/2+4,l=[[0,r,n*2,0],[0,-r,n*2,0],[n,0,r*2,Math.PI/2],[-n,0,r*2,Math.PI/2]];for(let[n,r,s,c]of l){if(this.rng.chance(.25))continue;let l=i+n*e+r*t,u=a-n*t+r*e;this.canPlace(l,u,.6,{maxSlope:.6})&&this.addProp(`fence`,l,u,o+c,s,1.3,.15,0,{destructible:Td.fence,blocksView:!1})}}this.rng.chance(.5)&&this.placeTree(i+this.rng.range(-10,10),a+this.rng.range(-10,10),this.rng.pick(this.data.biome.treeKinds))}}}nearestRoadAngle(e,t){let n=40,r=null;for(let i of this.roads){let{d:a,seg:o}=Od(e,t,i.points);if(a<n){n=a;let[e,t]=i.points[o],[s,c]=i.points[o+1];r=Math.atan2(s-e,c-t)}}return r}placeIndustrial(e){let[t,n]=e.at,[r,i]=e.size;this.setSurfaceRect(t-r/2,n-i/2,t+r/2,n+i/2,(e,t)=>this.noise2.noise(e*.02,t*.02)>0?`asphalt`:null);let a=0;for(let e=0;e<200&&a<9;e++){let e=t+this.rng.range(-r/2+30,r/2-30),o=n+this.rng.range(-i/2+30,i/2-30),s=this.rng.range(30,50),c=this.rng.range(18,28),l=this.rng.chance(.5)?0:Math.PI/2;if(this.canPlace(e,o,Math.max(s,c)*.55,{maxSlope:.4})&&(this.addProp(`hall`,e,o,l,s,this.rng.range(11,16),c,0,{}),a++,this.rng.chance(.7))){let t=e+Math.cos(l)*(s/2+6),n=o-Math.sin(l)*(s/2+6);this.canPlace(t,n,3)&&this.addProp(`chimney`,t,n,0,4.5,this.rng.range(32,48),4.5,0,{shape:`circle`,r:2.2})}}for(let e=0;e<10;e++){let e=t+this.rng.range(-r/2,r/2),a=n+this.rng.range(-i/2,i/2);this.canPlace(e,a,6)&&this.addProp(`silo`,e,a,0,10,this.rng.range(10,16),10,0,{shape:`circle`,r:5})}for(let e=0;e<40;e++){let e=t+this.rng.range(-r/2,r/2),a=n+this.rng.range(-i/2,i/2),o=this.rng.chance(.5)?0:Math.PI/2;this.canPlace(e,a,4)&&this.addProp(`container`,e,a,o,2.5,2.6,6.1,this.rng.int(0,4),{})}for(let e=0;e<16;e++){let e=t+this.rng.range(-r/2,r/2),a=n+this.rng.range(-i/2,i/2),o=this.rng.chance(.5)?0:Math.PI/2;this.canPlace(e,a,6)&&this.addProp(`wall`,e,a,o,12,2.4,.5,0,{destructible:Td.wall})}}placeRail(e){for(let t=0;t<e.length-1;t++){let[n,r]=e[t],[i,a]=e[t+1],o=Math.hypot(i-n,a-r),s=Math.atan2(i-n,a-r),c=Math.floor(o/20);for(let e=0;e<c;e++){let t=(e+.5)/c,l=n+(i-n)*t,u=r+(a-r)*t;this.addProp(`rail`,l,u,s,2.2,.2,o/c,0,null,.05)}for(let e=0;e<4;e++){let e=this.rng.range(.15,.85),t=n+(i-n)*e,o=r+(a-r)*e;if(this.reserved.some(e=>Math.hypot(e.x-t,e.z-o)<e.r+10))continue;let c=!0;this.statics.queryCircle(t,o,9,e=>{this.props[e.propId]?.kind===`wagon`&&(c=!1)}),c&&this.addProp(`wagon`,t,o,s,3,3.6,13,this.rng.int(0,2),{destructible:Td.wagon},.6)}}}placeTree(e,t,n){if(!this.canPlace(e,t,1.2,{maxSlope:.7}))return!1;let r=this.rng.range(.8,1.3),i=(n===`pine`?14:n===`palm`?11:n===`dead`?9:11)*r,a=(n===`pine`?2.8:n===`palm`?3:n===`dead`?1.5:3.8)*r,o=this.terrain.heightAt(e,t),s=this.statics.addFoliage({x:e,z:t,r:a,y0:o+i*.25,y1:o+i,camo:n===`dead`?.05:.18});return this.addProp(`tree`,e,t,this.rng.next()*Math.PI*2,r,i,r,Cd.indexOf(n),{shape:`circle`,r:.45*r,y1:i,destructible:Td.tree,blocksView:!1,foliage:[s.id]}),!0}placeBush(e,t){if(!this.canPlace(e,t,1.5,{maxSlope:.7}))return!1;let n=this.rng.range(1.6,3.2),r=this.terrain.heightAt(e,t);return this.statics.addFoliage({x:e,z:t,r:n*1.1,y0:r-.2,y1:r+n*1.1,camo:.42}),this.addProp(`bush`,e,t,this.rng.next()*Math.PI*2,n,n*.9,n,this.rng.int(0,2),null),!0}placeNature(){for(let e of this.data.features)if(e.type===`forest`){let t=Math.round(Math.PI*e.radius*e.radius*e.density/70),n=0;for(let r=0;r<t*3&&n<t;r++){let t=this.rng.next()*Math.PI*2,r=Math.sqrt(this.rng.next())*e.radius,i=e.at[0]+Math.cos(t)*r,a=e.at[1]+Math.sin(t)*r;this.noise2.noise(i*.03,a*.03)<-.25||(this.placeTree(i,a,e.kind)&&n++,this.rng.chance(.25)&&this.placeBush(i+this.rng.range(-5,5),a+this.rng.range(-5,5)))}}else if(e.type===`bushes`){let t=0;for(let n=0;n<e.count*4&&t<e.count;n++){let n=this.rng.next()*Math.PI*2,r=Math.sqrt(this.rng.next())*e.radius,i=e.at[0]+Math.cos(n)*r,a=e.at[1]+Math.sin(n)*r,o=this.rng.int(1,3);for(let e=0;e<o;e++)this.placeBush(i+this.rng.range(-4,4),a+this.rng.range(-4,4))&&t++}}else e.type===`rocks`&&this.scatter(e.at,e.radius,e.count,e.size,(t,n,r)=>{let i=e.size*this.rng.range(.6,1.4);this.addProp(`rock`,t,n,r,i*1.2,i*.8,i,this.rng.int(0,2),{shape:`circle`,r:i*.55,y1:i*.8},-i*.15)});let e=this.data.biome.treeKinds;for(let t=0;t<140;t++){let t=this.rng.range(-this.terrain.half+40,this.terrain.half-40),n=this.rng.range(-this.terrain.half+40,this.terrain.half-40);this.noise2.noise(t*.01,n*.01)>.15&&this.placeTree(t,n,this.rng.pick(e))}}};function jd(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new lr,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Md(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Md(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function Md(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new Jn(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function Nd(e,t=`#ffffff`){let n=e.index?e.toNonIndexed():e;n.getAttribute(`normal`)||n.computeVertexNormals();let r=n.getAttribute(`position`).count;n.getAttribute(`uv`)||n.setAttribute(`uv`,new Jn(new Float32Array(r*2),2));let i=typeof t==`string`?new J().set(t):t,a=new Float32Array(r*3);for(let e=0;e<r;e++)a[e*3]=i.r,a[e*3+1]=i.g,a[e*3+2]=i.b;n.setAttribute(`color`,new Jn(a,3));for(let e of Object.keys(n.attributes))[`position`,`normal`,`uv`,`color`].includes(e)||n.deleteAttribute(e);return n}var Pd=new At,Fd=new ct,Id=new Bt;function Q(e,t,n,r,i=0,a=0,o=0,s=1,c=1,l=1){return Fd.setFromEuler(Id.set(i,a,o)),Pd.compose(new G(t,n,r),Fd,new G(s,c,l)),e.applyMatrix4(Pd),e}function Ld(e){let t=jd(e,!1);if(!t)throw Error(`mergeGeometries failed (attribute mismatch)`);return t.computeBoundingSphere(),t.computeBoundingBox(),t}var $={box(e,t,n,r=`#ffffff`){return Nd(new ci(e,t,n),r)},cyl(e,t,n,r=10,i=`#ffffff`){return Nd(new li(e,t,n,r),i)},cone(e,t,n=8,r=`#ffffff`){return Nd(new ui(e,t,n),r)},blob(e,t,n,r,i=`#ffffff`){let a=new pi(e,t);return Rd(a,n,r),a.computeVertexNormals(),Nd(a,i)},rock(e){let t=new fi(.5,1);return Rd(t,e,.16),t.computeVertexNormals(),Nd(t,`#ffffff`)}};function Rd(e,t,n){let r=e.getAttribute(`position`),i=new hl(t),a=new Map,o=new G;for(let e=0;e<r.count;e++){o.fromBufferAttribute(r,e);let t=`${o.x.toFixed(3)},${o.y.toFixed(3)},${o.z.toFixed(3)}`,s=a.get(t);s||(s=new G(i.range(-1,1),i.range(-1,1),i.range(-1,1)).multiplyScalar(n),a.set(t,s)),o.add(s),r.setXYZ(e,o.x,o.y,o.z)}}function zd(e){return new J().setStyle(e,Ie)}function Bd(e,t,n){let r=new Ei(e);return r.onBeforeCompile=e=>{e.uniforms.texScale={value:t},e.uniforms.roofColor={value:n??new J(.3,.28,.26)},e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vWPos;
varying vec3 vWNormal;`).replace(`#include <project_vertex>`,`#include <project_vertex>
        vec4 wpos = vec4(transformed, 1.0);
        vec3 wn = objectNormal;
        #ifdef USE_INSTANCING
          wpos = instanceMatrix * wpos;
          wn = mat3(instanceMatrix) * wn;
        #endif
        wpos = modelMatrix * wpos;
        vWPos = wpos.xyz;
        vWNormal = normalize(mat3(modelMatrix) * wn);`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 vWPos;
varying vec3 vWNormal;
uniform float texScale;
uniform vec3 roofColor;`).replace(`#include <map_fragment>`,`#ifdef USE_MAP
          vec3 an = abs(vWNormal);
          vec2 wuv = an.x > an.z ? vWPos.zy : vWPos.xy;
          vec4 texel = texture2D(map, wuv * texScale);
          if (an.y > 0.45) {
            vec4 rt = texture2D(map, vWPos.xz * texScale * 2.0);
            texel = vec4(roofColor * (0.75 + 0.35 * rt.r), 1.0);
          }
          diffuseColor *= texel;
        #endif`)},r}var Vd=250,Hd=new At,Ud=new ct,Wd=new ct,Gd=new G,Kd=new G,qd=new G(0,1,0),Jd=new J,Yd=class{map;quality;group=new an;refs=new Map;chunks=[];falling=[];rubble=null;rubbleNext=0;archetypes=new Map;constructor(e,t){this.map=e,this.quality=t,this.createArchetypes(),this.buildInstances()}createArchetypes(){let e=this.map.data.biome,t=e=>this.archetypes.set(e.key,e),n=(e,t,n=1/12.8)=>Bd({map:cd.facade(e),roughness:.9,metalness:0,vertexColors:!0},n,zd(t));t({key:`building:0`,geometry:Q($.box(1,1,1),0,.5,0),material:n(`stone`,`#4a4643`),castShadow:!0,chunked:!1}),t({key:`building:3`,geometry:Q($.box(1,1,1),0,.5,0),material:n(`concrete`,`#555553`),castShadow:!0,chunked:!1});let r=()=>{let e=Q($.box(1,.7,1,`#ffffff`),0,.35,0),t=Q($.box(.62,.06,1.08,`#ffffff`),.25,.85,0,0,0,.62),n=Q($.box(.62,.06,1.08,`#ffffff`),-.25,.85,0,0,0,-.62);return Ld([e,Q($.box(.7,.3,.96,`#ffffff`),0,.78,0,0,0,0),t,n])};t({key:`house:1`,geometry:r(),material:n(`wood`,`#6b2f22`,1/9),castShadow:!0,chunked:!1}),t({key:`house:2`,geometry:Q($.box(1,1,1),0,.5,0),material:n(`adobe`,`#b49870`,1/9),castShadow:!0,chunked:!1}),t({key:`house:0`,geometry:r(),material:n(`stone`,`#5c3a2c`,1/9),castShadow:!0,chunked:!1}),t({key:`house:3`,geometry:r(),material:n(`concrete`,`#444444`,1/9),castShadow:!0,chunked:!1}),t({key:`hall`,geometry:Ld([Q($.box(1,1,1),0,.5,0),Q($.box(1.02,.08,.6),0,1,.2,.25,0,0)]),material:n(`hall`,`#3e4447`,1/16),castShadow:!0,chunked:!1});let i=Bd({map:cd.rock(),roughness:.95,vertexColors:!0,color:zd(`#8d8478`)},1/4,zd(`#6b645a`));t({key:`ruin`,geometry:Q($.box(1,1,1),0,.5,0),material:i,castShadow:!0,chunked:!1}),t({key:`wall`,geometry:Q($.box(1,1,1),0,.5,0),material:Bd({map:cd.facade(`concrete`),roughness:.9,vertexColors:!0},1/6,zd(`#777`)),castShadow:!0,chunked:!1}),t({key:`chimney`,geometry:Ld([Q($.cyl(.38,.5,1,10,`#8a4b38`),0,.5,0),Q($.cyl(.42,.42,.05,10,`#2a2420`),0,.98,0)]),material:new Ei({vertexColors:!0,roughness:.9}),castShadow:!0,chunked:!1}),t({key:`silo`,geometry:Ld([Q($.cyl(.5,.5,.85,14,`#a4a7a8`),0,.425,0),Q($.cone(.52,.15,14,`#8c8f90`),0,.925,0)]),material:new Ei({vertexColors:!0,roughness:.45,metalness:.6}),castShadow:!0,chunked:!1}),t({key:`container`,geometry:Q($.box(1,1,1),0,.5,0),material:Bd({map:cd.facade(`container`),roughness:.6,metalness:.5,vertexColors:!0},1/3,zd(`#8a8a8a`)),castShadow:!0,chunked:!1}),t({key:`fence`,geometry:Q($.box(1,1,1),0,.5,0),material:Bd({map:cd.facade(`wood`),roughness:.95,vertexColors:!0},1/3,zd(`#5a4029`)),castShadow:!0,chunked:!1}),t({key:`crate`,geometry:Q($.box(1,1,1),0,.5,0),material:Bd({map:cd.facade(`wood`),roughness:.95,vertexColors:!0,color:zd(`#b0915f`)},1/1.5,zd(`#8a6d45`)),castShadow:!0,chunked:!1});let a=new Ei({vertexColors:!0,roughness:.55,metalness:.7});t({key:`barricade:0`,geometry:Ld([0,1,2].map(e=>Q($.box(.12,1.3,.12,`#4b4a48`),0,.5,0,e===0?.9:0,e===1?.9:0,e===2?.9:0))),material:a,castShadow:!0,chunked:!1}),t({key:`barricade:1`,geometry:Ld([Q($.box(1,.55,1,`#9a9890`),0,.275,0),Q($.box(.7,.35,.7,`#8d8b83`),0,.72,0)]),material:new Ei({vertexColors:!0,roughness:.95}),castShadow:!0,chunked:!1}),t({key:`car`,geometry:Ld([Q($.box(1,.45,1,`#ffffff`),0,.5,0),Q($.box(.9,.35,.5,`#d8d8d8`),0,.88,-.05),...[[.48,.32],[-.48,.32],[.48,-.32],[-.48,-.32]].map(([e,t])=>Q($.cyl(.17,.17,.1,10,`#151515`),e,.17,t,0,0,Math.PI/2))]),material:new Ei({vertexColors:!0,roughness:.35,metalness:.6}),castShadow:!0,chunked:!1}),t({key:`wagon`,geometry:Ld([Q($.box(1,.85,1,`#7a4a32`),0,.55,0),Q($.box(.9,.12,.95,`#2a2522`),0,.08,0),Q($.box(1.04,.05,1.01,`#5d3826`),0,.99,0)]),material:Bd({map:cd.facade(`container`),roughness:.7,metalness:.4,vertexColors:!0},1/3,zd(`#4d3324`)),castShadow:!0,chunked:!1});let o=[];for(let e=0;e<6;e++)o.push(Q($.cyl(.42-e*.03,.45-e*.03,1/6,14,e%2?`#b8302a`:`#f0eee8`),0,(e+.5)/6*.86,0));o.push(Q($.cyl(.32,.32,.1,12,`#2c2c2c`),0,.9,0),Q($.cone(.34,.08,12,`#7a1d1a`),0,.99,0)),t({key:`lighthouse`,geometry:Ld(o),material:new Ei({vertexColors:!0,roughness:.6}),castShadow:!0,chunked:!1}),t({key:`rail`,geometry:Ld([Q($.box(.07,1,1,`#55524e`),.36,.5,0),Q($.box(.07,1,1,`#55524e`),-.36,.5,0),...Array.from({length:6},(e,t)=>Q($.box(1,.6,.08,`#3d3125`),0,.3,-.42+t*.168))]),material:new Ei({vertexColors:!0,roughness:.6,metalness:.5}),castShadow:!1,chunked:!1});let s=new Ei({map:cd.rock(),normalMap:cd.rockNormal(),aoMap:cd.rock(),aoMapIntensity:.6,color:zd(e.ground===`snow`?`#9ea4aa`:e.ground===`sand`?`#b39a76`:`#8b857c`),roughness:.92,vertexColors:!0});t({key:`rock`,geometry:$.rock(3),material:s,castShadow:!0,chunked:!0,low:{geometry:Xd($.rock(5)),material:s}});let c=e=>new Ei({color:zd(e),roughness:.85,vertexColors:!0,flatShading:!0}),l=new Ei({map:cd.bark(),roughness:.95,vertexColors:!0}),u=e.ground===`snow`,d=u?`#5c7363`:e.ground===`sand`?`#6a7a3a`:`#4a6b2a`;for(let e of Cd){let n=Cd.indexOf(e),r,i,a=c(d);switch(e){case`pine`:r=Q($.cyl(.08,.13,1,6,`#ffffff`),0,.5,0),i=Ld([0,1,2,3].map(e=>Q($.cone(.28-e*.05,.32,8,e%2?`#e6f0e6`:`#ffffff`),0,.32+e*.17,0))),a=c(u?`#6f8a78`:`#35502c`);break;case`palm`:r=Q($.cyl(.05,.08,1,6,`#c8b090`),0,.5,0,.08,0,0),i=Ld(Array.from({length:7},(e,t)=>Q($.box(.07,.015,.42,`#ffffff`),Math.sin(t)*.15,.97,Math.cos(t)*.15,-.35,t/7*Math.PI*2,0))),a=c(`#5f7f2e`);break;case`birch`:r=Q($.cyl(.05,.08,1,6,`#f2efe6`),0,.5,0),i=Ld([Q($.blob(.22,1,11,.06),0,.72,0),Q($.blob(.18,1,12,.05),.08,.88,.04)]),a=c(u?`#7c8a72`:`#6a8a34`);break;case`dead`:r=Ld([Q($.cyl(.04,.08,1,5,`#6f6255`),0,.5,0),Q($.cyl(.015,.03,.35,4,`#6f6255`),.08,.7,0,0,0,-.8),Q($.cyl(.015,.03,.3,4,`#6f6255`),-.07,.6,.03,.3,0,.9)]),i=null;break;default:r=Q($.cyl(.07,.12,1,6,`#ffffff`),0,.5,0),i=Ld([Q($.blob(.3,1,21,.08),0,.68,0),Q($.blob(.24,1,22,.07),.15,.78,.08),Q($.blob(.22,1,23,.07),-.12,.8,-.1)])}if(t({key:`trunk:${n}`,geometry:r,material:e===`birch`||e===`palm`||e===`dead`?new Ei({vertexColors:!0,roughness:.9}):l,castShadow:!0,chunked:!0}),i){let r=e===`pine`?Q($.cone(.27,.85,5),0,.55,0):Q($.blob(.32,0,30+n,.04),0,.72,0);t({key:`canopy:${n}`,geometry:i,material:a,castShadow:!0,chunked:!0,low:{geometry:Xd(r),material:a}})}}let f=c(u?`#6d7f6c`:e.ground===`sand`?`#7b8044`:`#4f7029`);t({key:`bush`,geometry:Ld([Q($.blob(.5,1,41,.12),0,.42,0),Q($.blob(.38,1,42,.1),.35,.32,.1),Q($.blob(.36,1,43,.1),-.3,.3,-.12)]),material:f,castShadow:!1,chunked:!0,low:{geometry:Xd(Q($.blob(.55,0,44,.08),0,.4,0)),material:f}}),this.rubbleMaterial=new Ei({map:cd.rock(),color:zd(`#6e6457`),roughness:1,vertexColors:!0}),this.rubbleGeometry=Ld([Q($.blob(.5,1,51,.15),0,.15,0,0,0,0,1,.35,1),Q($.box(.5,.2,.1,`#5a4029`),.2,.3,.1,.4,.3,.2),Q($.box(.4,.15,.1,`#5a4029`),-.25,.25,-.2,-.3,.8,.1)])}rubbleMaterial;rubbleGeometry;archetypeKeys(e){switch(e.kind){case`tree`:return[`trunk:${e.variant}`,`canopy:${e.variant}`].filter(e=>this.archetypes.has(e));case`building`:return[`building:${e.variant===3?3:0}`];case`house`:return[`house:${e.variant}`];case`barricade`:return[`barricade:${e.variant}`];default:return[e.kind]}}propMatrix(e,t){Ud.setFromAxisAngle(qd,e.rot);let n=e.kind===`tree`?Kd.set(e.sy*.9,e.sy,e.sy*.9):e.kind===`rock`?Kd.set(e.sx,e.sy,e.sz).multiplyScalar(1.1):Kd.set(e.sx,e.sy,e.sz);return t.compose(Gd.set(e.x,e.y,e.z),Ud,n)}buildInstances(){let e=new Map;for(let t of this.map.props)for(let n of this.archetypeKeys(t)){let r=this.archetypes.get(n);if(!r)continue;let i=r.chunked?`${n}|${Math.floor((t.x+2e3)/Vd)}|${Math.floor((t.z+2e3)/Vd)}`:n,a=e.get(i);a||(a=[],e.set(i,a)),a.push(t)}let t=new Map,n=new J;for(let[r,i]of e){let[e,a,o]=r.split(`|`),s=this.archetypes.get(e),c=(e,t)=>{let r=new Gr(e,t,i.length);return r.castShadow=s.castShadow&&this.quality.shadows,r.receiveShadow=!0,i.forEach((e,t)=>{r.setMatrixAt(t,this.propMatrix(e,Hd)),n.copy(this.instanceTint(e)),r.setColorAt(t,n)}),r.instanceMatrix.needsUpdate=!0,r.instanceColor&&(r.instanceColor.needsUpdate=!0),r.computeBoundingSphere(),this.group.add(r),r},l=c(s.geometry,s.material);if(i.forEach((e,t)=>this.addRef(e.id,l,t)),s.chunked){let e=`${a}|${o}`,n=t.get(e);if(n||(n={cx:(Number(a)+.5)*Vd-2e3,cz:(Number(o)+.5)*Vd-2e3,high:[],low:[]},t.set(e,n)),n.high.push(l),s.low){let e=c(s.low.geometry,s.low.material);e.castShadow=!1,e.visible=!1,i.forEach((t,n)=>this.addRef(t.id,e,n)),n.low.push(e)}else n.low.push(l)}}this.chunks=[...t.values()];let r=this.map.props.filter(e=>e.colliderId>=0&&this.map.statics.colliders[e.colliderId].destructible).length;if(r>0){this.rubble=new Gr(this.rubbleGeometry,this.rubbleMaterial,r),Hd.makeScale(0,0,0);for(let e=0;e<r;e++)this.rubble.setMatrixAt(e,Hd);this.rubble.receiveShadow=!0,this.rubble.frustumCulled=!1,this.group.add(this.rubble)}}instanceTint(e){let t=(e.id*2654435761>>>0)/4294967296;switch(e.kind){case`car`:return Jd.setHSL(t,.45,.32+t*.2);case`container`:return Jd.setHSL([0,.08,.33,.58,.12][e.variant%5],.55,.38);case`house`:return Jd.setRGB(.9+t*.15,.9+t*.1,.88+t*.1);case`building`:return Jd.setRGB(.85+t*.25,.82+t*.22,.78+t*.2);case`tree`:case`bush`:return Jd.setRGB(.85+t*.3,.85+t*.25,.8+t*.2);case`rock`:return Jd.setRGB(.85+t*.2,.85+t*.2,.85+t*.2);default:return Jd.setRGB(1,1,1)}}addRef(e,t,n){let r=this.refs.get(e);r||(r=[],this.refs.set(e,r)),r.push({mesh:t,index:n})}onDestroyed(e,t){let n=this.map.props[e.propId];if(!n)return;let r=this.refs.get(n.id)??[];if(n.kind===`tree`){let e=t?new G(n.x-t.x,0,n.z-t.z).normalize():new G(1,0,0),i=new G(e.z,0,-e.x).normalize();this.falling.push({prop:n,refs:r,axis:i,t:0});return}if(n.kind===`car`||n.kind===`wagon`){for(let e of r)this.propMatrix(n,Hd),Hd.decompose(Gd,Ud,Kd),Kd.y*=n.kind===`car`?.45:.7,Wd.setFromAxisAngle(new G(0,0,1),n.kind===`wagon`?.25:.05),Ud.multiply(Wd),Hd.compose(Gd,Ud,Kd),e.mesh.setMatrixAt(e.index,Hd),e.mesh.setColorAt(e.index,Jd.setRGB(.12,.11,.1)),e.mesh.instanceMatrix.needsUpdate=!0,e.mesh.instanceColor&&(e.mesh.instanceColor.needsUpdate=!0);return}Hd.makeScale(0,0,0);for(let e of r)e.mesh.setMatrixAt(e.index,Hd),e.mesh.instanceMatrix.needsUpdate=!0;(n.kind===`house`||n.kind===`wall`||n.kind===`barricade`)&&this.rubble&&this.rubbleNext<this.rubble.count&&(Ud.setFromAxisAngle(qd,n.rot),Hd.compose(Gd.set(n.x,n.y,n.z),Ud,Kd.set(n.sx*1.1,Math.max(.6,n.sy*.35),Math.max(1,n.sz*1.1))),this.rubble.setMatrixAt(this.rubbleNext++,Hd),this.rubble.instanceMatrix.needsUpdate=!0)}update(e,t){for(let e of this.chunks){let n=Math.hypot(e.cx-t.x,e.cz-t.z)-Vd*.7,r=n<this.quality.drawDistance,i=n>this.quality.lodDistance;for(let t=0;t<e.high.length;t++){let n=e.high[t],a=e.low[t];n===a?n.visible=r:(n.visible=r&&!i,a.visible=r&&i)}}for(let t=this.falling.length-1;t>=0;t--){let n=this.falling[t];n.t=Math.min(1,n.t+e/1.6);let r=n.t*n.t*(Math.PI/2-.12);this.propMatrix(n.prop,Hd),Hd.decompose(Gd,Ud,Kd),Wd.setFromAxisAngle(n.axis,r),Ud.premultiply(Wd),Hd.compose(Gd,Ud,Kd);for(let e of n.refs)e.mesh.setMatrixAt(e.index,Hd),e.mesh.instanceMatrix.needsUpdate=!0;n.t>=1&&this.falling.splice(t,1)}}dispose(){this.group.traverse(e=>{e instanceof Gr&&e.dispose()});for(let e of this.archetypes.values())e.geometry.dispose(),e.low?.geometry.dispose()}};function Xd(e){return e.computeBoundingSphere(),e}var Zd=`
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = p.xyww;
  }
`,Qd=`
  uniform vec3 topColor;
  uniform vec3 horizonColor;
  uniform vec3 groundColor;
  uniform vec3 sunDir;
  uniform vec3 sunColor;
  uniform float time;
  uniform float cloudiness;
  varying vec3 vDir;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float s = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++) { s += a * noise(p); p *= 2.03; a *= 0.5; }
    return s;
  }
  void main() {
    vec3 d = normalize(vDir);
    float h = d.y;
    vec3 col = h > 0.0 ? mix(horizonColor, topColor, pow(clamp(h, 0.0, 1.0), 0.55)) : mix(horizonColor, groundColor, clamp(-h * 4.0, 0.0, 1.0));
    float sd = max(dot(d, normalize(sunDir)), 0.0);
    col += sunColor * (pow(sd, 900.0) * 6.0 + pow(sd, 12.0) * 0.25);
    if (h > 0.0) {
      vec2 cp = d.xz / (h + 0.12) * 1.6 + vec2(time * 0.004, time * 0.002);
      float c = smoothstep(1.0 - cloudiness, 1.0, fbm(cp));
      vec3 cloud = mix(vec3(1.0), horizonColor * 0.85, 0.35) + sunColor * pow(sd, 6.0) * 0.3;
      col = mix(col, cloud, c * smoothstep(0.0, 0.18, h) * 0.85);
    }
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,$d=class{mesh;material;constructor(e,t,n,r,i=.45){this.material=new wi({uniforms:{topColor:{value:new J(e)},horizonColor:{value:new J(t)},groundColor:{value:new J(t).multiplyScalar(.7)},sunDir:{value:n.clone().normalize()},sunColor:{value:new J(r)},time:{value:0},cloudiness:{value:i}},vertexShader:Zd,fragmentShader:Qd,side:1,depthWrite:!1,fog:!1}),this.mesh=new Nr(new hi(3e3,32,16),this.material),this.mesh.frustumCulled=!1,this.mesh.renderOrder=-10}update(e,t){this.material.uniforms.time.value=e,this.mesh.position.copy(t)}dispose(){this.mesh.geometry.dispose(),this.material.dispose()}},ef=new Map,tf=new Map,nf=new Ei({color:zd(`#1f1c1a`),roughness:1,metalness:.2});function rf(e){let t=ef.get(e.id);return t||(t={camo:new Ei({map:cd.camo(e.colors.base,e.colors.dark,e.colors.light,e.id.length*101+e.id.charCodeAt(0)),normalMap:cd.armorNormal(),normalScale:new W(.7,.7),roughnessMap:cd.armorRoughness(),aoMap:cd.armorAO(),aoMapIntensity:.8,roughness:.85,metalness:.35,vertexColors:!0}),metal:new Ei({color:zd(`#3d3b38`),roughness:.55,metalness:.75,roughnessMap:cd.armorRoughness(),aoMap:cd.armorAO(),aoMapIntensity:.5,vertexColors:!0}),burnt:nf},ef.set(e.id,t)),t}function af(e,t=.5){let n=[],r=[],i=[],a=new G,o=new G;for(let s of e.faces){let c=s.normal;a.set(0,1,0),Math.abs(c.y)>.9&&a.set(1,0,0),o.crossVectors(c,a).normalize(),a.crossVectors(o,c).normalize();for(let l=1;l<s.verts.length-1;l++)for(let u of[s.verts[0],s.verts[l],s.verts[l+1]]){let s=e.vertices[u];n.push(s.x,s.y,s.z),r.push(c.x,c.y,c.z),i.push(s.dot(o)*t,s.dot(a)*t)}}let s=new lr;s.setAttribute(`position`,new Jn(new Float32Array(n),3)),s.setAttribute(`normal`,new Jn(new Float32Array(r),3)),s.setAttribute(`uv`,new Jn(new Float32Array(i),2));let c=new Float32Array(n.length/3*3).fill(1);return s.setAttribute(`color`,new Jn(c,3)),s}function of(e){let t=`${e.data.id}|${e.turret.id}|${e.gun.id}`,n=tf.get(t);if(n)return n;let r=e.layout,i=e.data.hull.dims,a=e=>r.components.find(t=>t.name===e),o=i.width/2,s=e.data.hull.trackWidth,c=i.clearance+i.height*.35,l=[af(a(`hull`))];for(let e of[1,-1]){l.push(Q($.box(s+.08,.05,i.length*.98),e*(o-s/2),c+.03,0));let t=a(e>0?`screenL`:`screenR`);t&&l.push(af(t))}l.push(Q($.box(i.width*.5,.18,.35,`#cfcfcf`),0,i.clearance+i.height+.05,-i.length/2+.4)),l.push(Q($.box(.5,.2,.3),o*.55,i.clearance+i.height*.95,-i.length*.25));let u=[],d=Math.max(.25,c*.42),f=Math.max(4,Math.round(i.length/.95));for(let e of[1,-1]){let t=e*(o-s/2);for(let e=0;e<f;e++){let n=-i.length/2+.55+e*(i.length-1.1)/(f-1);u.push(Q($.cyl(d,d,s*.7,12,`#4a4844`),t,d+.06,n,0,0,Math.PI/2)),u.push(Q($.cyl(d*.45,d*.45,s*.78,8,`#2a2826`),t,d+.06,n,0,0,Math.PI/2))}u.push(Q($.cyl(d*.85,d*.85,s*.9,12,`#3a3835`),t,c-d*.75,i.length/2-.2,0,0,Math.PI/2)),u.push(Q($.cyl(d*.85,d*.85,s*.9,12,`#3a3835`),t,c-d*.75,-i.length/2+.2,0,0,Math.PI/2)),u.push(Q($.cyl(.07,.07,.5,6,`#222`),e*o*.5,i.clearance+i.height*.8,-i.length/2-.1,Math.PI/2,0,0))}u.push(Q($.cyl(.12,.14,.12,8,`#d8d2a0`),o*.65,i.clearance+i.height*.85,i.length/2-.25,Math.PI/2,0,0)),u.push(Q($.cyl(.035,.035,.55,6,`#1e1e1e`),-o*.35,i.clearance+i.height*.6,i.length/2-.05,Math.PI/2,0,0));let p=(e,t,n,r)=>{let i=$.box(s,.07,e),a=i.getAttribute(`uv`),o=i.getAttribute(`position`);for(let e=0;e<a.count;e++)a.setXY(e,o.getZ(e)/.6,o.getX(e)*2+o.getY(e));return Q(i,0,t,n,r,0,0)},m=c-.075,h=Math.hypot(m,.4)+.06,g=Math.atan2(m,.4),_=Ld([p(i.length-.5,c-.04,0,0),p(i.length-1.3,.035,0,0),p(h,c/2,i.length/2-.45,-g),p(h,c/2,-i.length/2+.45,g)]),v=[af(a(`turret`))],y=a(`cupola`);y&&v.push(af(y));let b=e.turret.shape,x=[];e.data.hasTurret?(x.push(Q($.cyl(.02,.02,1.8,4,`#222`),-b.width*.35,b.height+.9,-b.length*.35)),x.push(Q($.cyl(.2,.22,.06,10,`#3b3a37`),-b.width*.2,b.height+.02,-b.length*.1)),v.push(Q($.box(b.width*.75,b.height*.35,.35),0,b.height*.4,-b.length/2-.12))):e.data.cls===`SPG`&&x.push(Q($.box(b.width*.85,.08,b.length*.8,`#2b2a28`),0,b.height+.02,0));let S=af(a(`mantlet`)),C=Math.max(.06,e.gun.caliber/1e3),w=e.layout.barrelLength,T=[Q($.cyl(C*.85,C*1.25,w-.25,12,`#4a4844`),0,0,.25+(w-.25)/2,Math.PI/2,0,0)];e.data.tier>=5&&T.push(Q($.cyl(C*1.45,C*1.45,w*.12,12,`#3c3a37`),0,0,.25+w*.55,Math.PI/2,0,0)),T.push(Q($.box(C*2.6,C*1.8,C*3.2),0,0,w-C*1.5,0,0,0));let E=Ld([Q($.box(i.width*.95,i.height,i.length*.95),0,i.clearance+i.height/2,0),Q($.box(i.width,c,i.length,`#333`),0,c/2,0)]),D=Q($.box(b.width*.85,b.height,b.length*.85),0,b.height/2,0),O=Q($.cyl(C*1.3,C*1.3,w,6,`#444`),0,0,w/2,Math.PI/2,0,0),k={hull:Ld(l),hullMetal:Ld(u),turret:Ld(v),turretMetal:x.length?Ld(x):Ld([$.box(.01,.01,.01)]),gun:Ld(T),mantlet:Ld([S]),track:Ld([_]),lodHull:E,lodTurret:D,lodGun:O};return tf.set(t,k),k}function sf(e,t,n){let r=of(e),i=rf(t),a=cd.track(),o=()=>{let e=a.clone();return e.needsUpdate=!0,new Ei({map:e,roughness:.8,metalness:.6,color:new J(.9,.9,.9)})},s=(e,t)=>{let r=new Nr(e,t);return r.castShadow=n,r.receiveShadow=!0,r},c=new an,l=new an,u=new an,d=new an,f=new an;c.add(l);let p=s(r.hull,i.camo),m=s(r.hullMetal,i.metal),h=e.data.hull.dims.width/2,g=e.data.hull.trackWidth,_=s(r.track,o());_.position.x=h-g/2;let v=s(r.track,o());v.position.x=-(h-g/2),l.add(p,m,_,v),u.position.copy(e.layout.turretPivot),l.add(u);let y=s(r.turret,i.camo),b=s(r.turretMetal,i.metal);u.add(y,b),d.position.copy(e.layout.gunPivot),d.rotation.order=`YXZ`,u.add(d);let x=s(r.mantlet,i.camo);d.add(x,f);let S=s(r.gun,i.metal);f.add(S);let C=new an,w=new an,T=new an,E=new an;C.add(w),w.add(new Nr(r.lodHull,i.camo)),T.position.copy(e.layout.turretPivot),T.add(new Nr(r.lodTurret,i.camo)),w.add(T),E.position.copy(e.layout.gunPivot),E.rotation.order=`YXZ`,E.add(new Nr(r.lodGun,i.metal)),T.add(E),C.visible=!1;for(let e of[w,T,E])for(let t of e.children)t instanceof Nr&&(t.castShadow=n);return{root:c,hull:l,turret:u,gun:d,barrel:f,trackL:_,trackR:v,bodyMeshes:[p,m,y,b,x,S],lod:{root:C,hull:w,turret:T,gun:E}}}function cf(){return nf}var lf=170,uf=new G,df=new G,ff=class{tank;parts;recoil=0;burnt=!1;turretFlight=null;lastMarkOdo=0;dustTimer=0;exhaustTimer=0;wreckSmoke=25;originalMaterials=new Map;renderPos=new G;hidden=!1;constructor(e,t,n){this.tank=e,this.parts=sf(e,t,n);for(let e of this.parts.bodyMeshes)this.originalMaterials.set(e,e.material)}onShot(){this.recoil=1}blowTurret(){if(this.turretFlight||!this.tank.data.hasTurret)return;let e=this.parts.turret;e.getWorldPosition(uf),e.removeFromParent(),this.parts.root.parent?.add(e),e.position.copy(uf),e.quaternion.copy(this.tank.quaternion),this.turretFlight={vel:new G((Math.random()-.5)*6,9+Math.random()*5,(Math.random()-.5)*6),spin:new G(Math.random()*3,Math.random()*4,Math.random()*3),landed:!1}}applyBurnt(){if(this.burnt)return;this.burnt=!0;let e=cf();for(let t of this.parts.bodyMeshes)t.material=e;for(let e of[this.parts.trackL,this.parts.trackR])e.material.color=new J(.25,.23,.22);for(let t of this.parts.lod.root.children)t.traverse(t=>{t instanceof Nr&&(t.material=e)})}update(e,t,n,r,i,a,o){let s=this.tank,c=this.parts;this.renderPos.lerpVectors(s.prevPosition,s.position,e);let l=r&&!o;this.hidden=!l;let u=this.renderPos.distanceTo(n),d=u>lf&&!this.turretFlight;c.root.visible=l&&!d,c.lod.root.visible=l&&d;let f=il(s.prevTurretYaw,s.prevTurretYaw+al(s.turretYaw-s.prevTurretYaw),e),p=s.data.hasTurret?f:0,m=s.data.hasTurret?0:f;for(let e of[c.root,c.lod.root])e.position.copy(this.renderPos),e.quaternion.copy(s.quaternion);this.turretFlight||(c.turret.rotation.y=p),c.lod.turret.rotation.y=p,c.gun.rotation.set(-s.gunPitch,m,0),c.lod.gun.rotation.set(-s.gunPitch,m,0),this.recoil=Math.max(0,this.recoil-t*2.2),c.barrel.position.z=-Math.sin(Math.min(1,this.recoil)*Math.PI*.5)*.45*(this.recoil>.7?1:this.recoil/.7);let h=c.trackL.material,g=c.trackR.material;if(h.map&&(h.map.offset.x-=s.trackSpeedL*t/.6),g.map&&(g.map.offset.x-=s.trackSpeedR*t/.6),s.alive||this.applyBurnt(),this.turretFlight){let e=this.turretFlight;if(!e.landed){e.vel.y-=9.81*t,c.turret.position.addScaledVector(e.vel,t),c.turret.rotation.x+=e.spin.x*t,c.turret.rotation.y+=e.spin.y*t,c.turret.rotation.z+=e.spin.z*t;let n=a.heightAt(c.turret.position.x,c.turret.position.z);c.turret.position.y<n+.2&&e.vel.y<0&&(c.turret.position.y=n+.2,e.landed=!0,i.dust(c.turret.position,new J(.4,.37,.33),10,2))}c.turret.visible=l||u<600}if(!l||u>650)return;let _=Mu[s.surface],v=Math.abs(s.speedLong);if(s.alive&&_?.trackMarks&&s.odometer-this.lastMarkOdo>.9){this.lastMarkOdo=s.odometer;let e=s.data.hull.dims.width/2-s.data.hull.trackWidth/2,t=-Math.cos(s.yaw)*e,n=Math.sin(s.yaw)*e,r=(e,t)=>a.heightAt(e,t);i.trackMark(s.position.x+t,s.position.z+n,s.yaw,s.data.hull.trackWidth,r),i.trackMark(s.position.x-t,s.position.z-n,s.yaw,s.data.hull.trackWidth,r)}if(s.alive&&_?.dust&&v>3&&(this.dustTimer-=v/6*t,this.dustTimer<=0)){this.dustTimer=.12;let e=s.data.hull.dims.length*.5;uf.set(s.position.x-Math.sin(s.yaw)*e,s.position.y+.3,s.position.z-Math.cos(s.yaw)*e),i.dust(uf,new J(..._.dust),2,1.2+v*.06)}if(s.alive&&Math.abs(s.input.throttle)>.5&&(this.exhaustTimer-=t,this.exhaustTimer<=0)){this.exhaustTimer=.25;let e=s.data.hull.dims;df.set(0,e.clearance+e.height,-e.length/2).applyQuaternion(s.quaternion).add(s.position),i.dust(df,new J(.2,.2,.2),1,.7)}s.burning?(uf.set(0,s.layout.hullTop+.2,-s.data.hull.dims.length*.3).applyQuaternion(s.quaternion).add(s.position),i.fire(uf,t,1)):!s.alive&&this.wreckSmoke>0&&(this.wreckSmoke-=t,uf.set(0,s.layout.hullTop,0).applyQuaternion(s.quaternion).add(s.position),this.wreckSmoke>18?i.fire(uf,t,.6):i.smokeColumn(uf,t,this.wreckSmoke/25))}dispose(){this.parts.root.removeFromParent(),this.parts.lod.root.removeFromParent(),this.parts.turret.removeFromParent(),this.parts.trackL.material.map?.dispose(),this.parts.trackR.material.map?.dispose(),this.parts.trackL.material.dispose(),this.parts.trackR.material.dispose()}},pf=125,mf=class{map;group=new an;material;water=null;waterMat=null;constructor(e,t){this.map=e;let n=cd.groundDetail(),r=cd.groundNormal();this.material=new Ei({vertexColors:!0,map:n,normalMap:r,normalScale:new W(.6,.6),roughness:.95,metalness:0}),this.material.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#ifdef USE_MAP
          vec4 sampledDiffuseColor = texture2D( map, vMapUv );
          vec4 macro = texture2D( map, vMapUv * 0.071 + 0.37 );
          diffuseColor *= vec4( sampledDiffuseColor.rgb * (0.55 + 0.45 * macro.rgb) * 1.25, 1.0 );
        #endif`)},this.build(t);let i=e.terrain;if(this.hasWater()){let t=new mi(i.size+800,i.size+800,1,1);t.rotateX(-Math.PI/2);let n=cd.waterNormal().clone();n.needsUpdate=!0,n.repeat.set(60,60),this.waterMat=new Ei({color:new J(e.data.biome.waterColor),roughness:.08,metalness:.2,normalMap:n,normalScale:new W(.35,.35),transparent:!0,opacity:.86});let r=new Nr(t,this.waterMat);r.position.y=i.waterLevel,r.receiveShadow=!0,r.renderOrder=1,this.water=r,this.group.add(r)}}hasWater(){let e=this.map.terrain;for(let t=0;t<e.verts;t+=4)for(let n=0;n<e.verts;n+=4)if(e.heights[t*e.verts+n]<e.waterLevel-.2)return!0;return!1}build(e){let t=this.map.terrain,n=new ed(this.map.data.seed+99),r=Math.ceil(t.size/pf),i=Nu.map(e=>new J().setRGB(...Mu[e].color,Ie)),a=new J().setRGB(.72,.82,.9,Ie),o=new J,s=new J;for(let c=0;c<r;c++)for(let l=0;l<r;l++){let r=-t.half+l*pf,u=-t.half+c*pf,d=Math.round(pf/e),f=(d+1)*(d+1),p=new Float32Array(f*3),m=new Float32Array(f*3),h=new Float32Array(f*2),g=0;for(let c=0;c<=d;c++)for(let l=0;l<=d;l++){let d=Math.min(t.half,r+l*e),f=Math.min(t.half,u+c*e),_=t.heightAt(d,f);p[g*3]=d,p[g*3+1]=_,p[g*3+2]=f,h[g*2]=d/6,h[g*2+1]=f/6,s.setRGB(0,0,0);let v=0;for(let[e,n,r]of hf){let a=t.surface[t.cellIndex(d+e*t.cell,f+n*t.cell)];o.copy(i[a]).multiplyScalar(r),s.add(o),v+=r}s.multiplyScalar(1/v),t.isIce(d,f)&&s.copy(a);let y=t.slopeAt(d,f),b=.9+.2*n.fbm(d*.02,f*.02,3),x=(_-(t.heightAt(d+6,f)+t.heightAt(d-6,f)+t.heightAt(d,f+6)+t.heightAt(d,f-6))/4)*.04,S=Math.max(.55,Math.min(1.2,b*(1-Math.min(.35,y*.25))+x)),C=_<t.waterLevel+.6?.75:1;m[g*3]=s.r*S*C,m[g*3+1]=s.g*S*C,m[g*3+2]=s.b*S*C,g++}let _=[];for(let e=0;e<d;e++)for(let t=0;t<d;t++){let n=e*(d+1)+t,r=n+1,i=n+(d+1),a=i+1;_.push(n,i,r,r,i,a)}let v=new lr;v.setAttribute(`position`,new Jn(p,3)),v.setAttribute(`color`,new Jn(m,3)),v.setAttribute(`uv`,new Jn(h,2)),v.setIndex(_),v.computeVertexNormals(),v.computeBoundingSphere();let y=new Nr(v,this.material);y.receiveShadow=!0,y.matrixAutoUpdate=!1,y.updateMatrix(),this.group.add(y)}}update(e){this.waterMat?.normalMap&&this.waterMat.normalMap.offset.set(e*.004,e*.0025)}dispose(){this.group.traverse(e=>{e instanceof Nr&&e.geometry.dispose()}),this.material.dispose(),this.waterMat?.dispose()}},hf=[[0,0,2],[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1.5,1.5,.5],[-1.5,-1.5,.5],[1.5,-1.5,.5],[-1.5,1.5,.5]],gf=new G,_f=new G,vf=class{world;player;quality;scene=new hn;camera;cameraCtl;effects;views=new Map;terrain;props;sky;sun;envMap=null;unsubs=[];time=0;tracerData=[];tracerColors=new Map;constructor(e,t,n,r,i){this.world=t,this.player=n,this.quality=r;let a=t.map.data.biome;this.camera=new sa(i,16/9,.3,4200),this.cameraCtl=new $u(this.camera,i),this.scene.fog=new pn(new J(a.sky.fog),a.sky.fogDensity*r.fogScale),this.scene.background=new J(a.sky.fog);let o=new G(Math.cos(a.sun.elevation*el)*Math.sin(a.sun.azimuth*el),Math.sin(a.sun.elevation*el),Math.cos(a.sun.elevation*el)*Math.cos(a.sun.azimuth*el));if(this.sky=new $d(a.sky.top,a.sky.horizon,o,a.sun.color,a.ambience===`industry`?.6:.42),this.scene.add(this.sky.mesh),this.sun=new ma(new J(a.sun.color),a.sun.intensity),this.sun.position.copy(o).multiplyScalar(300),this.sun.castShadow=r.shadowMapSize>0,this.sun.castShadow){this.sun.shadow.mapSize.set(r.shadowMapSize,r.shadowMapSize);let e=r.shadowRange;Object.assign(this.sun.shadow.camera,{left:-e,right:e,top:e,bottom:-e,near:10,far:900}),this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=.04}if(this.scene.add(this.sun,this.sun.target),this.scene.add(new Yi(new J(a.ambient.sky),new J(a.ambient.ground),a.ambient.intensity)),this.scene.add(new ha(16777215,.08)),r.environment){let t=new ao(e),n=new hn,r=new $d(a.sky.top,a.sky.horizon,o,a.sun.color,.3);n.add(r.mesh),this.envMap=t.fromScene(n,.02).texture,this.scene.environment=this.envMap,this.scene.environmentIntensity=.45,r.dispose(),t.dispose()}this.terrain=new mf(t.map,r.terrainStep),this.scene.add(this.terrain.group),this.props=new Yd(t.map,{lodDistance:r.lodDistance,drawDistance:r.drawDistance,shadows:r.shadowMapSize>0}),this.scene.add(this.props.group),this.effects=new vd(this.scene,r.id);for(let e of t.tanks)this.addTankView(e);n&&this.cameraCtl.reset(n),this.bindEvents()}addTankView(e){let t=new ff(e,Wl.getNation(e.data.nation),this.quality.shadowMapSize>0);this.scene.add(t.parts.root,t.parts.lod.root),this.views.set(e.id,t)}bindEvents(){let e=this.world.events,t=this.effects;this.unsubs.push(e.on(`shot`,e=>{t.muzzleFlash(e.pos,e.dir,e.ammo.caliber),this.views.get(e.tank.id)?.onShot(),e.tank===this.player&&this.cameraCtl.addShake(.35+e.ammo.caliber/400),gf.copy(e.pos),gf.y=this.world.terrain.heightAt(gf.x,gf.z)+.2;let n=Mu[this.world.terrain.surfaceAt(gf.x,gf.z)];n.dust&&t.dust(gf,new J(...n.dust),6,2)}),e.on(`impact`,e=>{let n=e.ammo.kind===`HE`?.7+e.ammo.explosionRadius*.35:.45;if(e.kind===`water`)t.splash(e.pos,n+.5);else{let r=Mu[e.surface];t.explosion(e.pos,n,e.kind===`ground`&&r?.dust?new J(...r.dust):null)}this.player&&e.pos.distanceTo(this.player.position)<25&&this.cameraCtl.addShake(.4)}),e.on(`hit`,e=>{let n=e.result;if(n.kind===`miss`)return;let r=this.views.get(e.target.id);if(n.kind===`ricochet`||n.kind===`noPenetration`?t.sparks(n.point,n.normal,n.kind===`ricochet`?18:10):t.explosion(n.point,e.ammo.kind===`HE`?.9:.5,null),r&&(n.kind===`penetration`||n.kind===`heSplash`)){let i=n.plate&&n.plate.startsWith(`turret`)?r.parts.turret:r.parts.hull;i.updateMatrixWorld(!0);let a=i.worldToLocal(n.point.clone()),o=n.normal.clone().transformDirection(i.matrixWorld.clone().invert());t.decal(i,a,o,.35+e.ammo.caliber/250)}e.target===this.player&&this.cameraCtl.addShake(n.kind===`penetration`?.8:.4)}),e.on(`tankDestroyed`,e=>{let n=this.views.get(e.tank.id);gf.set(0,e.tank.layout.hullTop,0).applyQuaternion(e.tank.quaternion).add(e.tank.position),t.explosion(gf,e.ammoRack?2.4:1.4,null),e.ammoRack&&n?.blowTurret()}),e.on(`destructible`,e=>{let n=e.collider.destructible?.kind,r=n===`tree`?new J(.3,.42,.18):n===`car`?new J(.2,.2,.2):new J(.45,.36,.25);t.debris(e.pos,r,n===`house`?30:n===`tree`?8:12),this.props.onDestroyed(e.collider,e.by?e.by.position:null)}),e.on(`ricochet`,e=>t.sparks(e.pos,e.dir,8)),e.on(`ram`,e=>t.sparks(e.pos,new G(0,1,0),20)))}update(e,t,n){this.time+=e;let r=this.world,i=this.player,a=this.cameraCtl;i?(_f.lerpVectors(i.prevPosition,i.position,t),a.update(e,i,_f,r)):(this.camera.position.set(Math.sin(this.time*.05)*300,160,Math.cos(this.time*.05)*300),this.camera.lookAt(0,0,0));let o=this.camera.position;for(let n of this.views.values()){let s=n.tank,c=!i||s.team===i.team||r.detection.isVisibleTo(i,s)||!s.alive&&r.detection.wasEverSpotted(i.team,s),l=s===i&&a.mode===`sniper`;n.update(t,e,o,c,this.effects,r.terrain,l)}this.tracerData.length=0;for(let e of r.projectiles.active){let n=this.tracerColors.get(e.ammo.kind);n||(n=new J(wl[e.ammo.kind].color).multiplyScalar(2.2),this.tracerColors.set(e.ammo.kind,n));let r=e.vel.length();this.tracerData.push({pos:Sf(e.prev,e.pos,t),vel:e.vel,color:n,length:Math.min(22,r*.025)}),e.ammo.gravityScale>3&&Math.random()<.6&&this.effects.artyTrail(e.pos)}this.effects.setTracers(this.tracerData),this.effects.setPixelScale(n,this.camera.fov),this.effects.update(e),this.terrain.update(this.time),this.props.update(e,o),this.sky.update(this.time,o);let s=i?a.mode===`arty`?a.artyTarget:_f:gf.set(0,0,0);this.sun.target.position.copy(s),this.sun.position.copy(s).addScaledVector(this.sunDirection(),400)}sunDirection(){let e=this.world.map.data.biome.sun;return yf.set(Math.cos(e.elevation*el)*Math.sin(e.azimuth*el),Math.sin(e.elevation*el),Math.cos(e.elevation*el)*Math.cos(e.azimuth*el))}setAspect(e){this.camera.aspect=e,this.camera.updateProjectionMatrix()}get stats(){return{particles:this.effects.particleCount}}dispose(){for(let e of this.unsubs)e();for(let e of this.views.values())e.dispose();this.terrain.dispose(),this.props.dispose(),this.effects.dispose(),this.sky.dispose(),this.envMap?.dispose(),this.scene.clear()}},yf=new G,bf=[],xf=0;function Sf(e,t,n){xf>=200&&(xf=0);let r=bf[xf]??(bf[xf]=new G);return xf++,r.lerpVectors(e,t,n)}var Cf=class{scene=new hn;camera=new sa(45,16/9,.1,500);platform;parts=null;displayTank=null;yaw=.7;pitch=.22;dist=13;targetDist=13;autoRotate=!0;time=0;constructor(e){this.scene.background=new J(`#1b1f22`),this.scene.fog=new mn(`#1b1f22`,30,90);let t=cd.hangarFloor().clone();t.needsUpdate=!0,t.repeat.set(8,8);let n=new Nr(new mi(120,120),new Ei({map:t,roughness:.75,metalness:.1}));n.rotation.x=-Math.PI/2,n.receiveShadow=!0,this.scene.add(n);let r=new Ei({map:cd.facade(`hall`),color:new J(`#5d6468`),roughness:.9});for(let[e,t,n]of[[0,-28,0],[-30,0,Math.PI/2],[30,0,-Math.PI/2]]){let i=new Nr(new ci(60,20,.5),r);i.position.set(e,10,t),i.rotation.y=n,i.receiveShadow=!0,this.scene.add(i)}let i=new Ei({color:`#3b3f42`,metalness:.8,roughness:.45});for(let e=-3;e<=3;e++){let t=new Nr(new ci(60,.6,.6),i);t.position.set(0,16,e*8),this.scene.add(t)}this.platform=new an;let a=new Nr(new li(6.2,6.4,.3,48),new Ei({color:`#2d3236`,metalness:.7,roughness:.35}));a.position.y=.15,a.receiveShadow=!0;let o=new Nr(new li(6.5,6.5,.12,48),new Ei({color:`#c8a64a`,metalness:.9,roughness:.3,emissive:new J(`#3a2a05`)}));o.position.y=.06,this.platform.add(o,a),this.scene.add(this.platform),this.scene.add(new Yi(`#bcd0e0`,`#3a352c`,.8)),this.scene.add(new ha(`#ffffff`,.1));let s=new ma(`#fff1dc`,2.2);s.position.set(10,20,12),s.castShadow=!0,s.shadow.mapSize.set(2048,2048),Object.assign(s.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:1,far:60}),s.shadow.bias=-5e-4,this.scene.add(s);for(let[e,t,n]of[[-12,8,`#8fb4ff`],[12,-6,`#ffc58a`]]){let r=new la(n,300,60,.5,.6,1.6);r.position.set(e,14,t),r.target.position.set(0,1,0),this.scene.add(r,r.target)}let c=new ao(e),l=new hn,u=new $d(`#4a5e72`,`#a9b6c2`,new G(.5,.6,.3),`#fff0d8`,.2);l.add(u.mesh),this.scene.environment=c.fromScene(l,.04).texture,this.scene.environmentIntensity=.6,u.dispose(),c.dispose()}showTank(e,t){this.parts&&(this.platform.remove(this.parts.root),this.parts.trackL.material.dispose(),this.parts.trackR.material.dispose());let n=Wl.getTank(e),r=new ou(n,0,``,t);r.turretYaw=.35,r.gunPitch=.03,this.displayTank=r,this.parts=sf(r,Wl.getNation(n.nation),!0),this.parts.root.position.y=.3,this.parts.turret.rotation.y=n.hasTurret?r.turretYaw:0,this.parts.gun.rotation.set(-r.gunPitch,n.hasTurret?0:.1,0),this.platform.add(this.parts.root),this.targetDist=6+n.hull.dims.length*1.15}drag(e,t){this.autoRotate=!1,this.yaw-=e*.006,this.pitch=Z(this.pitch+t*.004,.02,.9)}wheel(e){this.targetDist=Z(this.targetDist*(e>0?1.1:.9),6,30)}update(e,t){this.time+=e,this.autoRotate&&(this.platform.rotation.y+=e*.15),this.displayTank&&this.parts&&this.displayTank.data.hasTurret&&(this.parts.turret.rotation.y=.35+Math.sin(this.time*.3)*.25),this.dist+=(this.targetDist-this.dist)*sl(6,e);let n=new G(0,1.4,0);this.camera.position.set(Math.sin(this.yaw)*Math.cos(this.pitch)*this.dist,1.4+Math.sin(this.pitch)*this.dist,Math.cos(this.yaw)*Math.cos(this.pitch)*this.dist),this.camera.lookAt(n),this.camera.aspect=t,this.camera.updateProjectionMatrix()}},wf={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Tf=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Ef=new fa(-1,1,1,-1,0,1),Df=new class extends lr{constructor(){super(),this.setAttribute(`position`,new Zn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new Zn([0,2,0,0,2,0],2))}},Of=class{constructor(e){this._mesh=new Nr(Df,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ef)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},kf=class extends Tf{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof wi?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=xi.clone(e.uniforms),this.material=new wi({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Of(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Af=class extends Tf{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},jf=class extends Tf{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Mf=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new W);this._width=n.width,this._height=n.height,t=new Dt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:g}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new kf(wf),this.copyPass.material.blending=0,this.timer=new ba}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Af!==void 0&&(r instanceof Af?n=!0:r instanceof jf&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new W);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Nf=class extends Tf{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new J}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Pf={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new J(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},Ff=class e extends Tf{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new W(256,256):new W(e.x,e.y),this.clearColor=new J(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Dt(i,a,{type:g,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new Dt(i,a,{type:g,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new Dt(i,a,{type:g,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=Pf;this.highPassUniforms=xi.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new wi({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new W(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new G(1,1,1),new G(1,1,1),new G(1,1,1),new G(1,1,1),new G(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=xi.clone(wf.uniforms),this.blendMaterial=new wi({uniforms:this.copyUniforms,vertexShader:wf.vertexShader,fragmentShader:wf.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new J,this._oldClearAlpha=1,this._basic=new xr,this._fsQuad=new Of(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new W(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new wi({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new W(.5,.5)},direction:{value:new W(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new wi({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Ff.BlurDirectionX=new W(1,0),Ff.BlurDirectionY=new W(0,1);var If={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Lf=class extends Tf{constructor(){super(),this.isOutputPass=!0,this.uniforms=xi.clone(If.uniforms),this.material=new Ti({name:If.name,uniforms:this.uniforms,vertexShader:If.vertexShader,fragmentShader:If.fragmentShader}),this._fsQuad=new Of(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},q.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Rf={low:{id:`low`,pixelRatio:.75,shadowMapSize:0,shadowRange:0,terrainStep:5,lodDistance:140,drawDistance:420,environment:!1,antialias:!1,fogScale:1.5,bloom:!1},medium:{id:`medium`,pixelRatio:1,shadowMapSize:1024,shadowRange:90,terrainStep:2.5,lodDistance:220,drawDistance:600,environment:!0,antialias:!1,fogScale:1.15,bloom:!1},high:{id:`high`,pixelRatio:1.25,shadowMapSize:2048,shadowRange:130,terrainStep:2.5,lodDistance:300,drawDistance:800,environment:!0,antialias:!0,fogScale:1,bloom:!0},ultra:{id:`ultra`,pixelRatio:2,shadowMapSize:4096,shadowRange:170,terrainStep:2.5,lodDistance:420,drawDistance:1100,environment:!0,antialias:!0,fogScale:.9,bloom:!0}},zf=class{canvas;renderer;quality;renderScale=1;shadowsEnabled=!0;composer=null;renderPass=null;bloomPass=null;constructor(e,t){this.canvas=e,this.quality=Rf[t],this.renderer=new $c({canvas:e,antialias:this.quality.antialias,powerPreference:`high-performance`,stencil:!1}),this.renderer.outputColorSpace=Ie,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1,this.renderer.shadowMap.type=1,this.apply(t,1,!0)}apply(e,t,n){this.quality={...Rf[e]},n||(this.quality.shadowMapSize=0),this.renderScale=t,this.shadowsEnabled=n&&this.quality.shadowMapSize>0,this.renderer.shadowMap.enabled=this.shadowsEnabled,this.quality.bloom&&!this.composer?(this.composer=new Mf(this.renderer),this.renderPass=new Nf(null,null),this.bloomPass=new Ff(new W(256,256),.32,.45,.92),this.composer.addPass(this.renderPass),this.composer.addPass(this.bloomPass),this.composer.addPass(new Lf)):!this.quality.bloom&&this.composer&&(this.composer.dispose(),this.composer=null,this.renderPass=null,this.bloomPass=null),this.resize()}resize(){let e=this.canvas.clientWidth||window.innerWidth,t=this.canvas.clientHeight||window.innerHeight,n=Math.min(window.devicePixelRatio||1,2)*this.quality.pixelRatio*this.renderScale;this.renderer.setPixelRatio(Math.max(.4,Math.min(n,2.5))),this.renderer.setSize(e,t,!1),this.composer&&(this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.composer.setSize(e,t),this.bloomPass?.resolution.set(e/2,t/2))}get aspect(){return(this.canvas.clientWidth||window.innerWidth)/(this.canvas.clientHeight||window.innerHeight)}get height(){return this.renderer.domElement.height}render(e,t,n=!0){this.composer&&this.renderPass&&n?(this.renderPass.scene=e,this.renderPass.camera=t,this.composer.render()):this.renderer.render(e,t)}get info(){let e=this.renderer.info;return{calls:e.render.calls,triangles:e.render.triangles,geometries:e.memory.geometries,textures:e.memory.textures}}};function Bf(e){return rl*e.gravityScale}function Vf(e,t,n,r){let i=t.length(),a=n.dragK*i;t.x-=t.x*a*r,t.y-=t.y*a*r+Bf(n)*r,t.z-=t.z*a*r,e.addScaledVector(t,r)}function Hf(e,t,n,r=30){let i=1/120,a=0,o=0,s=Math.cos(t)*e.velocity,c=Math.sin(t)*e.velocity,l=Bf(e),u=0;for(;u<r;){let t=Math.sqrt(s*s+c*c),r=e.dragK*t,d=s-s*r*i,f=c-(c*r+l)*i,p=a+d*i,m=o+f*i;if(p>=n){let e=(n-a)/Math.max(1e-6,p-a);return{y:o+(m-o)*e,t:u+i*e}}if(m<-2e3||d<1)return null;a=p,o=m,s=d,c=f,u+=i}return null}function Uf(e,t,n,r=!1){if(t<.5)return Math.atan2(n,Math.max(.01,t));let i=0,a=-1/0,o=-.35,s=[];for(let n=0;n<=24;n++){let r=o+1.6*n/24,c=Hf(e,r,t),l=c?c.y:-1/0;s.push({a:r,y:l}),l>a&&(a=l,i=r)}if(a<n)return null;let c,l;if(r)c=i,l=1.25;else if(c=o,l=i,(Hf(e,c,t)?.y??-1/0)>n)return c;for(let i=0;i<28;i++){let i=(c+l)/2,a=(Hf(e,i,t)?.y??-1/0)>n;r?a?c=i:l=i:a?l=i:c=i}return(c+l)/2}function Wf(e,t,n){let r=Bf(e),i=e.velocity*Math.exp(-e.dragK*t*.5),a=i*i,o=a*a-r*(r*t*t+2*n*a);return o<0?Math.PI/4:Math.atan((a-Math.sqrt(o))/(r*t))}var Gf=new Map;function Kf(e){let t=Gf.get(e.id);if(t!==void 0)return t;let n=0;for(let t=.2;t<=1.1;t+=.05){let r=0,i=6e3;for(let n=0;n<20;n++){let n=(r+i)/2,a=Hf(e,t,n);a&&a.y>=0?r=n:i=n}n=Math.max(n,r)}return Gf.set(e.id,n),n}function qf(e,t,n,r,i,a){let o=e.clone(),s=t.clone().multiplyScalar(n.velocity),c=new G;for(let e=0;e<r;e+=i)if(c.copy(o),Vf(o,s,n,i),a(c,o,e+i))return}var Jf=class{world;team;focusTarget=null;focusUntil=0;aggressiveUntil=0;regroupUntil=0;helpRequests=[];lastKnown=new Map;lastRadio=-100;unsub;constructor(e,t){this.world=e,this.team=t,this.unsub=e.events.on(`radio`,e=>{e.team===t&&e.from&&this.onRadio(e.kind,e.from)})}dispose(){this.unsub()}onRadio(e,t){let n=this.world.time;switch(e){case`help`:this.helpRequests.push({from:t,pos:t.position.clone(),time:n}),this.helpRequests.length>6&&this.helpRequests.shift();break;case`attack`:this.aggressiveUntil=n+40,this.regroupUntil=0;break;case`retreat`:this.regroupUntil=n+30,this.aggressiveUntil=0;break;case`target`:{let e=this.findAimedEnemy(t);e&&(this.focusTarget=e,this.focusUntil=n+25);break}}}findAimedEnemy(e){let t=null,n=30;for(let r of this.world.tanks){if(r.team===e.team||!r.alive||!this.world.detection.isKnownToTeam(e.team,r))continue;let i=r.position.distanceTo(e.aimTarget);i<n&&(n=i,t=r)}return t}update(){let e=this.world;for(let t of e.tanks)if(t.team!==this.team&&t.alive&&e.detection.isKnownToTeam(this.team,t)){let n=this.lastKnown.get(t.id);n?(n.pos.copy(t.position),n.time=e.time):this.lastKnown.set(t.id,{pos:t.position.clone(),time:e.time})}for(let[t,n]of this.lastKnown){let r=e.tankById(t);(!r||!r.alive||e.time-n.time>60)&&this.lastKnown.delete(t)}for(;this.helpRequests.length&&e.time-this.helpRequests[0].time>25;)this.helpRequests.shift();this.focusTarget&&(!this.focusTarget.alive||e.time>this.focusUntil)&&(this.focusTarget=null)}say(e,t,n,r=!1){!r&&this.world.time-this.lastRadio<7||(this.lastRadio=this.world.time,this.world.events.emit(`radio`,{team:this.team,from:e,text:n,kind:t}))}};function Yf(e,t){let n=e.terrain.size,r=Math.max(0,Math.min(9,Math.floor((n/2-t.x)/n*10)));return`${`АБВГДЕЖЗИК`[Math.max(0,Math.min(9,Math.floor((n/2-t.z)/n*10)))]}${r+1}`}var Xf={LT:`scout`,MT:`flanker`,HT:`brawler`,TD:`sniper`,SPG:`artillery`},Zf=new G,Qf=new G,$f=new G,ep=class{tank;world;brain;difficulty;role;state=`advance`;target=null;goal=null;path=[];pathIndex=0;repathTimer=0;thinkTimer;targetTimer=0;reactionLeft=0;aimWait=0;aimNoise=new G;noiseTimer=0;memoryTimer=0;stuckTimer=0;stuckCount=0;stuckCheckPos=new G;unstuckTimer=0;unstuckSteer=1;lane;laneIndex=0;holdSpot=null;firingSpot=null;lastAmmoSwitch=-100;lastHelpCall=-100;memory=new Map;losCache=new Map;wasDamagedAt=-100;strafeDir=1;strafeTimer=0;reverseOut=!1;constructor(e,t,n,r){this.tank=e,this.world=t,this.brain=n,this.difficulty=r,this.role=Xf[e.data.cls]??`flanker`,this.thinkTimer=t.rng.range(0,r.thinkInterval),this.stuckCheckPos.copy(e.position);let i=t.map.data.lanes,a=this.role===`brawler`?i.heavy:(this.role===`scout`||this.role===`flanker`)&&t.rng.chance(.6)?i.light:i.center,o=e.team===1;if(this.lane=o?[...a].reverse():[...a],this.role===`sniper`||this.role===`scout`){let n=this.role===`sniper`?t.map.data.sniperSpots:t.map.data.scoutSpots,r=e.team===0?n.a:n.b;r.length&&(this.holdSpot=t.rng.pick(r))}if(this.role===`artillery`){let n=e.team===0?t.map.data.spawns.a:t.map.data.spawns.b;this.holdSpot=[n[0]+t.rng.range(-60,60),n[1]+(e.team===0?20:-20)]}}update(e,t){let n=this.tank,r=n.input;if(!n.alive){r.throttle=0,r.steer=0,r.fire=!1;return}n.lastDamageTime>this.wasDamagedAt&&this.onDamaged(),this.thinkTimer-=t,this.thinkTimer<=0&&(this.thinkTimer=this.difficulty.thinkInterval*e.rng.range(.8,1.2),this.think()),this.targetTimer-=t,this.targetTimer<=0&&(this.targetTimer=.35+e.rng.next()*.2,this.selectTarget()),this.memoryTimer-=t,this.memoryTimer<=0&&(this.memoryTimer=.25,this.updateMemory()),this.drive(t),this.fireControl(t),this.useConsumables()}useConsumables(){let e=this.tank,t=e.input;this.difficulty.id!==`easy`&&(e.burning&&!e.consumableUsed[2]?t.consumable=2:!e.consumableUsed[0]&&(e.modules.tracks.status===`destroyed`||e.modules.gun.status===`destroyed`)&&(this.target||this.world.time-e.lastDamageTime<5)?t.consumable=0:!e.consumableUsed[1]&&e.crew.filter(e=>e.wounded).length>=2&&(t.consumable=1))}visibleEnemies(){let e=[];for(let t of this.world.tanks)t.team!==this.tank.team&&t.alive&&this.world.detection.isVisibleTo(this.tank,t)&&e.push(t);return e}updateMemory(){for(let e of this.visibleEnemies()){let t=this.memory.get(e.id);t?(t.pos.copy(e.position),t.vel.copy(e.velocity),t.time=this.world.time):this.memory.set(e.id,{pos:e.position.clone(),vel:e.velocity.clone(),time:this.world.time})}}onDamaged(){let e=this.tank;this.wasDamagedAt=e.lastDamageTime;let t=this.world.tankById(e.lastDamagedBy);t&&t.team!==e.team&&t.alive&&this.world.detection.isVisibleTo(e,t)&&(!this.target||this.world.rng.chance(.6))&&this.setTarget(t),e.hpFraction<.5&&this.world.time-this.lastHelpCall>30&&(this.lastHelpCall=this.world.time,this.brain.say(e,`help`,`${e.callsign}: Нужна помощь в квадрате ${Yf(this.world,e.position)}!`,!0)),this.difficulty.coverChance>0&&e.reloadTimer>3&&this.world.rng.chance(this.difficulty.coverChance*.6)&&this.seekCover()}lineOfFire(e,t){let n=this.losCache.get(e.id);if(n&&this.world.time-n.time<.4)return n.clear;let r=this.tank.gunWorldPosition(Qf).clone(),i=this.world.detection.lineOfSight(r,t)&&(!this.difficulty.carefulFire||!this.allyInLine(r,t));return this.losCache.set(e.id,{time:this.world.time,clear:i}),i}allyInLine(e,t){$f.subVectors(t,e);let n=$f.length();$f.divideScalar(n);for(let t of this.world.tanks)if(t!==this.tank&&t.team===this.tank.team&&t.alive&&Wu(t,e,$f,n)>=0)return!0;return!1}think(){let e=this.world,t=this.tank,n=e.mode,r=this.visibleEnemies(),i=t.hpFraction,a=t.position,o=e.tanks.filter(e=>e.team===t.team&&e.alive),s=e.tanks.filter(e=>e.team!==t.team&&e.alive).length,c=n.defendBase(t.team),l=n.attackBase(t.team),u=e.battleTime;if(c&&this.role!==`artillery`){let n=(c.owner,c.points[1-t.team]),r=Math.hypot(a.x-c.x,a.z-c.z);if(n>12&&r<520&&(this.role!==`sniper`||r<250)){this.state!==`defend`&&this.brain.say(t,`defend`,`${t.callsign}: Возвращаюсь на защиту базы!`),this.state=`defend`;let n=c.capturers.find(e=>e.team!==t.team);n&&e.detection.isVisibleTo(t,n)&&this.setTarget(n),this.setGoal([c.x+e.rng.range(-20,20),c.z+e.rng.range(-20,20)]);return}}let d=e.time<this.brain.regroupUntil;if((i<this.difficulty.retreatHp||d&&i<.5)&&r.some(e=>e.position.distanceTo(a)<260)){this.state=`retreat`;let n=t.team===0?e.map.data.bases.a:e.map.data.bases.b,i=this.findCover(r[0],60);this.setGoal(i??n);return}let f=l&&(!n.data.winByDestroy||s<=Math.max(1,Math.floor(o.length/3))||u>n.data.timeLimit*.55||n.attackers===t.team&&u>70||n.data.bases===`neutral`&&u>50&&this.role!==`sniper`&&this.role!==`artillery`||r.length===0&&this.brain.lastKnown.size===0&&u>100);if(l&&f&&this.role!==`artillery`&&(this.role!==`sniper`||s<=2||u>n.data.timeLimit*.75)){this.state!==`capture`&&this.brain.say(t,`capture`,`${t.callsign}: Иду на захват базы!`),this.state=`capture`,(!this.goal||Math.hypot(this.goal[0]-l.x,this.goal[1]-l.z)>l.radius)&&this.setGoal([l.x+e.rng.range(-18,18),l.z+e.rng.range(-18,18)]);return}let p=this.brain.helpRequests.find(e=>e.from!==t&&e.from.alive&&e.pos.distanceTo(a)<280);if(p&&this.role!==`artillery`&&this.role!==`sniper`&&r.length===0){this.state=`support`,this.setGoal([p.pos.x+e.rng.range(-25,25),p.pos.z+e.rng.range(-25,25)]);return}if(this.target&&this.target.alive&&r.includes(this.target)){if(this.state===`cover`)return;this.state=`engage`,this.planEngagement(this.target);return}if(this.holdSpot&&(this.role===`sniper`||this.role===`artillery`||this.role===`scout`&&u<200)&&e.time>=this.brain.aggressiveUntil){this.state=`hold`,this.setGoal(this.holdSpot);return}if(this.laneIndex<this.lane.length){this.state=`advance`;let e=this.lane[this.laneIndex];Math.hypot(a.x-e[0],a.z-e[1])<30&&this.laneIndex++;let t=this.lane[Math.min(this.laneIndex,this.lane.length-1)];this.setGoal(t);return}this.state=`hunt`;let m=null,h=1/0;for(let e of this.brain.lastKnown.values()){let t=e.pos.distanceTo(a);t<h&&(h=t,m=[e.pos.x,e.pos.z])}if(!m){let n=t.team===0?e.map.data.spawns.b:e.map.data.spawns.a;m=l?[l.x,l.z]:n}this.setGoal(m)}planEngagement(e){let t=this.tank,n=this.world,r=e.position.distanceTo(t.position),i=n.time<this.brain.aggressiveUntil;switch(this.role){case`artillery`:case`sniper`:this.holdSpot?this.setGoal(this.holdSpot):this.setGoal(null);break;case`brawler`:{let t=i?60:140;r>t+40?this.setGoal(this.approachPoint(e,t)):this.setGoal(null);break}case`flanker`:{let t=i?100:200;r>t+60?this.setGoal(this.approachPoint(e,t)):r<70?this.setGoal(this.retreatPoint(e,60)):this.setGoal(null);break}case`scout`:if(r<120){let n=dl(t.position.x-e.position.x,t.position.z-e.position.z)+this.strafeDir*.6;this.setGoal([e.position.x+Math.sin(n)*70,e.position.z+Math.cos(n)*70])}else this.holdSpot&&n.battleTime<240?this.setGoal(this.holdSpot):this.setGoal(null)}}approachPoint(e,t){let n=this.tank.position,r=n.x-e.position.x,i=n.z-e.position.z,a=this.role===`flanker`?this.strafeDir*.5:0,o=Math.atan2(r,i)+a;return[e.position.x+Math.sin(o)*t,e.position.z+Math.cos(o)*t]}retreatPoint(e,t){let n=this.tank.position,r=n.x-e.position.x,i=n.z-e.position.z,a=Math.hypot(r,i)||1;return[n.x+r/a*t,n.z+i/a*t]}findCover(e,t=45){if(!e)return null;let n=this.world,r=this.tank.position,i=e.eyePosition(new G),a=null,o=1/0,s=dl(r.x-e.position.x,r.z-e.position.z);for(let e of[12,24,t]){for(let t=0;t<10;t++){let c=s+(t-4.5)/4.5*Math.PI*.75,l=r.x+Math.sin(c)*e,u=r.z+Math.cos(c)*e;if(!n.nav.isWalkable(l,u))continue;let d=n.terrain.heightAt(l,u)+this.tank.layout.turretTop*.8;if(Zf.set(l,d,u),n.detection.lineOfSight(i,Zf))continue;let f=e+Math.abs(t-4.5)*3;f<o&&(o=f,a=[l,u])}if(a)break}return a}seekCover(){let e=this.target??this.visibleEnemies()[0],t=this.findCover(e);t&&(this.firingSpot=[this.tank.position.x,this.tank.position.z],this.state=`cover`,this.setGoal(t))}addDetour(){let e=this.tank,t=this.world,n=t.rng.chance(.5)?1:-1;for(let r of[n*1.2,-n*1.2,n*2.2,-n*2.2]){let n=e.yaw+r,i=e.position.x+Math.sin(n)*22,a=e.position.z+Math.cos(n)*22;if(!(!t.nav.isWalkable(i,a)||t.terrain.slopeAt(i,a)>.35)){this.path.splice(this.pathIndex,0,[i,a]),this.repathTimer=5;return}}}setGoal(e){if(!e){this.goal=null,this.path=[];return}let t=!this.goal||Math.hypot(e[0]-this.goal[0],e[1]-this.goal[1])>20;this.goal=e,(t||this.repathTimer<=0||this.pathIndex>=this.path.length)&&this.repath()}repath(){if(!this.goal)return;let e=this.tank.position,t=this.world.nav.findPath(e.x,e.z,this.goal[0],this.goal[1]);this.path=t??[this.goal],this.pathIndex=+(this.path.length>1),this.repathTimer=6+this.world.rng.next()*2}setTarget(e){e!==this.target&&(this.target=e,this.reactionLeft=this.difficulty.reaction*this.world.rng.range(.8,1.3),this.aimWait=0)}selectTarget(){let e=this.tank,t=this.world,n=this.visibleEnemies();if(n.length===0){this.setTarget(null);return}let r=e.isArtillery?this.artyRange():650,i=null,a=-1/0,o=e.gunWorldPosition(new G),s=t.mode.defendBase(e.team);for(let c of n){let n=c.position.distanceTo(e.position);if(n>r)continue;let l=this.aimPointFor(c,!1);if(!e.isArtillery&&!this.lineOfFire(c,l))continue;let u=1.2*(1-n/r)+.7*(1-c.hpFraction);if(c.gunDirection($f),Zf.subVectors(e.position,c.position).normalize(),$f.dot(Zf)>.97&&(u+=.35),e.lastDamagedBy===c.id&&t.time-e.lastDamageTime<8&&(u+=.6),c===this.target&&(u+=.35),c.data.cls===`SPG`&&(u+=.25),this.brain.focusTarget===c&&(u+=.8),s&&s.capturers.includes(c)&&(u+=1),this.difficulty.smartAmmo&&!e.isArtillery){$f.subVectors(l,o).normalize();let e=this.bestAmmoAgainst(c,o,$f,n);u+=e.ratio>1.1?.5:e.ratio<.85?-.7:0}e.isArtillery&&(u+=c.isMoving?-.3:.4),u>a&&(a=u,i=c)}this.setTarget(i)}cachedArtyRange=-1;artyRange(){return this.cachedArtyRange<0&&(this.cachedArtyRange=Kf(this.tank.ammoTypes[0])*.95),this.cachedArtyRange}bestAmmoAgainst(e,t,n,r){let i=this.tank,a={index:i.selectedAmmo,ratio:0};for(let o=0;o<i.ammoTypes.length;o++){if(i.ammoCounts[o]<=0)continue;let s=i.ammoTypes[o],c=s.velocity*Math.exp(-s.dragK*r),l=Ju(e,t,n,r+20,s,c);if(!l.hit)continue;let u=l.ricochet?.2:l.penetration/Math.max(1,l.effective);s.kind===`HE`&&(u=l.penetration>=l.effective?1.15:Math.max(.3,(s.damage*.5-l.effective)/Math.max(1,s.damage*.5)));let d=s.premium?-.25:0;u+(u>1.15?d:0)>a.ratio+(a.ratio>1.15&&i.ammoTypes[a.index].premium?-.25:0)&&(a={index:o,ratio:u})}return a}aimPointFor(e,t){let n=this.tank,r=new G,i=e.data.hull.dims,a=new G(0,i.clearance+i.height*.6,0);if(this.difficulty.weakspots&&!n.isArtillery){let t=Zf.subVectors(n.position,e.position),r=al(dl(t.x,t.z)-e.yaw),o=Math.abs(r);o>55*el&&o<125*el?a.set(Math.sign(r)*i.width*.45,i.clearance+i.height*.55,-i.length*.1):o<=55*el?a.set(0,this.difficulty.id===`expert`?i.clearance+i.height*.22:i.clearance+i.height*.7,i.length*.47):a.set(0,i.clearance+i.height*.6,-i.length*.45)}if(r.copy(a).applyQuaternion(e.quaternion).add(e.position),t&&this.difficulty.lead>0){let t=r.distanceTo(n.position)/Math.max(50,n.ammo.velocity*.9)*(n.isArtillery?2.2:1);r.addScaledVector(e.velocity,t*this.difficulty.lead)}return r}drive(e){let t=this.tank,n=t.input,r=this.world;if(this.repathTimer-=e,this.strafeTimer-=e,this.strafeTimer<=0&&(this.strafeTimer=4+r.rng.next()*4,this.strafeDir=r.rng.chance(.5)?1:-1),this.state===`cover`&&t.reloadTimer<1.2&&this.firingSpot&&(this.state=`engage`,this.setGoal(this.firingSpot),this.firingSpot=null),this.unstuckTimer>0){this.unstuckTimer-=e,n.throttle=-.8,n.steer=this.unstuckSteer,this.unstuckTimer<=0&&this.stuckCount<2&&this.repath();return}let i=0,a=0,o=null;if(this.goal&&this.path.length){for(;this.pathIndex<this.path.length-1;){let e=this.path[this.pathIndex];if(Math.hypot(t.position.x-e[0],t.position.z-e[1])<7)this.pathIndex++;else break}let e=this.path[Math.min(this.pathIndex,this.path.length-1)],n=e[0]-t.position.x,r=e[1]-t.position.z,s=Math.hypot(n,r),c=Math.hypot(this.goal[0]-t.position.x,this.goal[1]-t.position.z);if(c>6){o=Math.atan2(n,r);let e=al(o-t.yaw);this.reverseOut=c<35&&Math.abs(e)>2.3&&(this.state===`cover`||this.state===`retreat`),this.reverseOut&&(e=al(e+Math.PI)),a=-Z(e*2.2,-1,1),i=Z((Math.abs(e)>1.1?.15:1-Math.abs(e)/2.2)*Z(c/25,.35,1),0,1),this.reverseOut&&(i=-i,t.speedLong<-.5&&(a=-a)),this.repathTimer<=0&&s>3&&this.repath()}}if(i===0&&this.target&&this.target.alive){let e=Zf.subVectors(this.target.position,t.position),n=Math.atan2(e.x,e.z),r=null;if(t.data.traverseLimit<180){let e=al(n-t.yaw);Math.abs(e)>t.data.traverseLimit*el*.75&&(r=n)}else if(this.difficulty.angleArmor&&(t.data.cls===`HT`||t.data.cls===`MT`)&&e.length()<350){let e=n+(this.strafeDir>0?.48:-.48);Math.abs(al(e-t.yaw))>.12&&(r=e)}r!==null&&(a=-Z(al(r-t.yaw)*2,-1,1))}if(i>0){let e=0;for(let n of r.tanks){if(n===t)continue;let r=n.position.x-t.position.x,a=n.position.z-t.position.z,o=r*r+a*a;if(o>484)continue;let s=Math.sqrt(o),c=(Math.sin(t.yaw)*r+Math.cos(t.yaw)*a)/s;if(c<.55)continue;let l=-Math.cos(t.yaw)*r+Math.sin(t.yaw)*a,u=(1-s/22)*(n.alive&&Math.abs(n.speedLong)>1?.7:1.2);e+=(l>=0?-1:1)*u,s<9&&c>.85&&(i*=.5)}a=Z(a+e*1.4,-1,1)}if(this.stuckTimer+=e,this.stuckTimer>2.5){let e=this.stuckCheckPos.distanceTo(t.position);Math.abs(i)>.3&&e<1.5&&t.stats.canMove&&!r.frozen?(this.stuckCount++,this.unstuckTimer=1.4+r.rng.next(),this.unstuckSteer=r.rng.chance(.5)?1:-1,this.stuckCount>=2&&this.addDetour()):e>6&&(this.stuckCount=0),this.stuckTimer=0,this.stuckCheckPos.copy(t.position)}n.throttle=Z(i,-1,1),n.steer=Z(a,-1,1),n.brake=i===0}fireControl(e){let t=this.tank,n=t.input,r=this.world;n.fire=!1;let i=this.target;if(!i||!i.alive){let e=null;for(let t of this.memory.values())(!e||t.time>e.time)&&(e=t);n.aimPoint=e&&r.time-e.time<20?Qf.copy(e.pos).setY(e.pos.y+1.5).clone():new G(t.position.x+Math.sin(t.yaw)*100,t.position.y+2,t.position.z+Math.cos(t.yaw)*100);return}this.noiseTimer-=e;let a=i.position.distanceTo(t.position);if(this.noiseTimer<=0){this.noiseTimer=1+r.rng.next();let e=Math.tan(this.difficulty.aimErrorDeg*el)*a;this.aimNoise.set(r.rng.gaussian()*e,r.rng.gaussian()*e*.5,r.rng.gaussian()*e)}let o=this.aimPointFor(i,!0).add(this.aimNoise);if(n.aimPoint=o,this.difficulty.smartAmmo&&r.time-this.lastAmmoSwitch>8&&!t.isArtillery){let e=t.gunWorldPosition(new G);$f.subVectors(o,e).normalize();let s=this.bestAmmoAgainst(i,e,$f,a);s.index!==t.selectedAmmo&&(t.reloadTimer>t.stats.reload*.5||s.ratio>1)&&(n.ammoSlot=s.index,this.lastAmmoSwitch=r.time)}if(this.reactionLeft>0){this.reactionLeft-=e;return}if(t.reloadTimer>0||!t.stats.canFire)return;this.aimWait+=e;let s=t.gunDirection(new G),c=t.gunWorldPosition(new G);$f.subVectors(o,c).normalize(),!(Math.abs(al(Math.atan2(s.x,s.z)-Math.atan2($f.x,$f.z)))>Math.max(1.5*el,t.dispersion*2))&&(t.isArtillery||this.lineOfFire(i,o))&&(t.dispersion<=t.stats.accuracy*this.difficulty.patience||this.aimWait>this.difficulty.maxAimWait*(t.isArtillery?3:1))&&(n.fire=!0,this.aimWait=0,this.difficulty.coverChance>0&&t.stats.reload>5&&r.rng.chance(this.difficulty.coverChance*.5)&&(this.role===`brawler`||this.role===`flanker`||this.role===`sniper`)&&this.seekCover())}},tp={easy:{id:`easy`,name:`Лёгкий`,reaction:1.6,aimErrorDeg:.9,lead:0,patience:3.4,maxAimWait:1.4,weakspots:!1,coverChance:0,angleArmor:!1,thinkInterval:1.3,retreatHp:.12,smartAmmo:!1,carefulFire:!1},normal:{id:`normal`,name:`Нормальный`,reaction:1,aimErrorDeg:.45,lead:.5,patience:2.3,maxAimWait:2.4,weakspots:!1,coverChance:.35,angleArmor:!1,thinkInterval:.9,retreatHp:.22,smartAmmo:!0,carefulFire:!0},hard:{id:`hard`,name:`Сложный`,reaction:.6,aimErrorDeg:.22,lead:.85,patience:1.6,maxAimWait:3.5,weakspots:!0,coverChance:.75,angleArmor:!0,thinkInterval:.6,retreatHp:.3,smartAmmo:!0,carefulFire:!0},expert:{id:`expert`,name:`Эксперт`,reaction:.35,aimErrorDeg:.1,lead:1,patience:1.3,maxAimWait:5,weakspots:!0,coverChance:1,angleArmor:!0,thinkInterval:.45,retreatHp:.35,smartAmmo:!0,carefulFire:!0}},np=class{handlers=new Map;on(e,t){let n=this.handlers.get(e);return n||(n=new Set,this.handlers.set(e,n)),n.add(t),()=>n.delete(t)}emit(e,t){let n=this.handlers.get(e);if(n)for(let e of n)e(t)}clear(){this.handlers.clear()}},rp={engine:12,transmission:12,tracks:10,gun:10,turretRing:9,radio:8,ammoRack:10,fuelTank:10},ip=7,ap=.012,op=60,sp=class{world;constructor(e){this.world=e}applyShellHit(e,t,n,r){let i=t&&t.team!==e.team;if(t&&i&&t.battle.hits++,e.alive&&(r.kind===`penetration`?(t&&i&&t.battle.penetrations++,this.dealDamage(e,t,r.damage)):r.kind===`heSplash`&&r.damage>0?(this.dealDamage(e,t,r.damage),e.battle.damageBlocked+=Math.max(0,n.damage-r.damage)):(r.kind===`ricochet`||r.kind===`noPenetration`||r.kind===`critical`||r.kind===`heSplash`)&&(e.battle.damageBlocked+=n.damage),e.alive)){for(let t of r.modules)this.damageModule(e,t.id,t.damage);for(let t of r.crew)this.woundCrew(e,t);r.fireChance>0&&!e.burning&&this.world.rng.chance(r.fireChance)&&this.startFire(e)}this.world.events.emit(`hit`,{target:e,attacker:t,result:r,ammo:n})}dealDamage(e,t,n){if(!e.alive||n<=0)return 0;let r=Math.min(e.hp,Math.round(n));if(e.hp-=r,e.battle.damageReceived+=r,e.lastDamageTime=this.world.time,t&&(e.lastDamagedBy=t.id,e.damagers.set(t.id,(e.damagers.get(t.id)??0)+r),t.team!==e.team)){t.battle.damageDealt+=r;let n=this.world.detection.lastSpotter(e);n&&n!==t&&(n.battle.assistDamage+=r)}return this.world.mode.onTankDamaged(e),e.hp<=0&&this.destroy(e,t,!1),r}damageModule(e,t,n){let r=e.modules[t];if(!e.alive||r.status===`destroyed`)return;r.hp=Math.max(0,r.hp-n);let i=r.status;if(r.hp<=0?i=`destroyed`:r.hp<=r.maxHp*.5&&(i=`damaged`),i===r.status)return;r.status=i,i===`destroyed`&&(r.repairTimer=rp[t]),e.refreshStats(),this.world.events.emit(`moduleChanged`,{tank:e,module:t,status:i,repaired:!1});let a=this.world.rng;if(t===`ammoRack`&&i===`destroyed`&&a.chance(.35)){this.destroy(e,this.world.tankById(e.lastDamagedBy),!0);return}t===`engine`&&i===`destroyed`&&a.chance(e.engine.fireChance)&&this.startFire(e),t===`fuelTank`&&a.chance(i===`destroyed`?.3:.12)&&this.startFire(e)}woundCrew(e,t){let n=e.crew.find(e=>e.role===t);n&&!n.wounded&&(n.wounded=!0,e.refreshStats(),this.world.events.emit(`crewWounded`,{tank:e,role:t}))}startFire(e){e.alive&&!e.burning&&(e.burning=!0,e.fireTimer=ip*(e.perks.has(`firefight`)?.5:1),this.world.events.emit(`fire`,{tank:e,burning:!0}))}applySplash(e,t,n){let r=t.explosionRadius,i=new G,a=new ct;for(let o of this.world.tanks){if(!o.alive)continue;let s=r+o.layout.boundingRadius;if(o.position.distanceToSquared(e)>s*s)continue;a.copy(o.quaternion).invert(),i.copy(e).sub(o.position).applyQuaternion(a);let c=o.data.hull.dims,l=c.width/2,u=c.length/2,d=o.layout.turretTop,f=Math.max(-l,Math.min(l,i.x)),p=Math.max(0,Math.min(d,i.y)),m=Math.max(-u,Math.min(u,i.z)),h=Math.hypot(i.x-f,i.y-p,i.z-m);if(h>r)continue;let g=o.data.hull.armor,_;_=i.y>c.clearance+c.height*.9?g.roof:Math.abs(i.x)>l*.95?g.side+(o.data.hull.screens?o.data.hull.screens*2:0):i.z>0?g.upperFront:g.rear;let v=(t.damage*.5*(1-h/r)-_*1.1)*(t.explosionRadius>2?1.2:1);v>0&&(n&&n.team!==o.team&&n.battle.hits++,this.dealDamage(o,n,v),i.y<1&&this.world.rng.chance(.4)&&this.damageModule(o,`tracks`,t.damage*.3))}this.world.statics.queryCircle(e.x,e.z,r+1,e=>{e.destructible&&(e.destructible.hp-=t.damage*.6,e.destructible.hp<=0&&this.world.destroyCollider(e,n))})}destroy(e,t,n){e.alive&&(e.alive=!1,e.hp=0,e.burning=!1,e.refreshStats(),e.battle.survivedTime=this.world.time,t&&t.team!==e.team&&t.battle.kills++,this.world.events.emit(`tankDestroyed`,{tank:e,killer:t,ammoRack:n}))}update(e){let t=this.world;for(let n of t.tanks){if(!n.alive)continue;n.burning&&(n.fireTimer-=e,this.dealDamage(n,t.tankById(n.lastDamagedBy),n.maxHp*ap*e+t.rng.next()*.5),t.rng.chance(e*.3)&&this.damageModule(n,`engine`,20),n.fireTimer<=0&&n.alive&&(n.burning=!1,t.events.emit(`fire`,{tank:n,burning:!1})));for(let r of Object.values(n.modules))r.status===`destroyed`&&(r.repairTimer-=e*n.stats.repairSpeed,r.repairTimer<=0&&(r.status=`damaged`,r.hp=Math.round(r.maxHp*.5),n.refreshStats(),t.events.emit(`moduleChanged`,{tank:n,module:r.id,status:`damaged`,repaired:!0})));for(let t=0;t<3;t++)n.consumableCooldown[t]=Math.max(0,n.consumableCooldown[t]-e);let r=n.input.consumable;r!==null&&r>=0&&r<3&&this.useConsumable(n,r)}}useConsumable(e,t){if(e.consumableUsed[t]||e.consumableCooldown[t]>0)return!1;if(t===0){if(!Object.values(e.modules).some(e=>e.status!==`ok`))return!1;for(let t of Object.values(e.modules))t.status!==`ok`&&this.world.events.emit(`moduleChanged`,{tank:e,module:t.id,status:`ok`,repaired:!0}),t.status=`ok`,t.hp=t.maxHp,t.repairTimer=0}else if(t===1){if(!e.crew.some(e=>e.wounded))return!1;for(let t of e.crew)t.wounded=!1}else{if(!e.burning)return!1;e.burning=!1,this.world.events.emit(`fire`,{tank:e,burning:!1})}return e.consumableUsed[t]=!0,e.consumableCooldown[t]=op,e.refreshStats(),this.world.events.emit(`consumable`,{tank:e,index:t}),!0}},cp=50,lp=445,up=2.5,dp=.5,fp=3,pp=15,mp=new G,hp=new G,gp=new G,_p=class{world;records=[new Map,new Map];everSpotted=[new Set,new Set];timers=new Map;constructor(e){this.world=e}update(e){let t=this.world;for(let n of t.tanks){if(!n.alive)continue;let t=this.timers.get(n.id)??n.id*.037%dp;t-=e,t<=0&&(t+=dp,this.scan(n)),this.timers.set(n.id,t)}}scan(e){let t=this.world;for(let n of t.tanks)if(n.team!==e.team&&n.alive&&this.canSee(e,n)){let r=this.records[e.team].get(n.id),i=!this.everSpotted[e.team].has(n.id);(!r||t.time-r.time>up)&&(i&&(this.everSpotted[e.team].add(n.id),e.battle.spotted++),t.events.emit(`spotted`,{tank:n,byTeam:e.team,first:i})),this.records[e.team].set(n.id,{time:t.time,spotter:e}),n.spottedUntil=t.time+up}}detectionDistance(e,t,n){let r=Math.min(lp,e.stats.viewRange),i=this.world.time-t.lastShotTime<fp,a=t.isMoving?t.stats.camoMoving:t.stats.camoStationary,o=this.world.statics.foliageAt(t.position.x,t.position.z,t.data.hull.dims.width/2);i&&(a*=1-t.data.camo.firingPenalty,o*=.25),t.isMoving&&(o*=.7);let s=Z(a+o+Math.min(.5,n),0,.95);return Math.max(cp,r-(r-cp)*s)}canSee(e,t){let n=e.position.distanceTo(t.position);if(n>lp)return!1;if(n<cp)return!0;if(n>e.stats.viewRange)return!1;e.eyePosition(mp);let r=[hp.set(0,t.layout.turretTop*.95,t.layout.turretPivot.z).applyQuaternion(t.quaternion).add(t.position)],i=new G(0,t.layout.hullTop*.6,0).applyQuaternion(t.quaternion).add(t.position);r.push(i);let a=1/0,o=!1;for(let e of r)this.lineOfSight(mp,e)&&(o=!0,a=Math.min(a,this.world.statics.foliageAlong(mp,e,pp)));return o?n<=this.detectionDistance(e,t,a):!1}lineOfSight(e,t){let n=this.world;if(!n.terrain.segmentClear(e,t))return!1;gp.subVectors(t,e);let r=gp.length();return gp.divideScalar(r),!n.statics.raycast(e,gp,r,e=>e.blocksView)}isVisibleTo(e,t){if(e.team===t.team)return!0;let n=this.records[e.team].get(t.id);if(!n||this.world.time-n.time>up)return!1;if(n.spotter===e)return!0;let r=n.spotter.stats.radioRange+e.stats.radioRange;return n.spotter.position.distanceToSquared(e.position)<=r*r}isKnownToTeam(e,t){if(t.team===e)return!0;let n=this.records[e].get(t.id);return!!n&&this.world.time-n.time<=up}wasEverSpotted(e,t){return this.everSpotted[e].has(t.id)}isSpotted(e){let t=this.records[1-e.team].get(e.id);return!!t&&this.world.time-t.time<=dp*2.2}lastSpotter(e){let t=this.records[1-e.team].get(e.id);return t&&this.world.time-t.time<=up?t.spotter:null}},vp=class{world;data;bases=[];outcome=null;contribution=new Map;attackers;constructor(e,t,n){this.world=e,this.data=t;let r=(e,t)=>({owner:e,x:t[0],z:t[1],radius:40,points:[0,0],capturers:[],contested:!1});t.bases===`both`?this.bases.push(r(0,n.a),r(1,n.b)):t.bases===`neutral`?this.bases.push(r(-1,n.neutral)):this.bases.push(r(1,n.b)),this.attackers=t.bases===`defender`?0:-1}get timeLeft(){return Math.max(0,this.data.timeLimit-this.world.battleTime)}canCapture(e,t){return e.owner===-1||e.owner!==t}update(e){if(this.outcome)return;let t=this.world;for(let n of this.bases){n.capturers=[];let r=[0,0];for(let e of t.tanks){if(!e.alive)continue;let t=e.position.x-n.x,i=e.position.z-n.z;t*t+i*i>n.radius*n.radius||(r[e.team]++,this.canCapture(n,e.team)&&n.capturers.push(e))}n.contested=n.owner===-1?r[0]>0&&r[1]>0:r[n.owner]>0&&n.capturers.length>0;for(let r of[0,1]){if(!this.canCapture(n,r))continue;let i=n.capturers.filter(e=>e.team===r);if(i.length===0){n.points[r]=0;for(let e of t.tanks)e.team===r&&this.contribution.delete(e.id);continue}if(n.contested)continue;let a=Math.min(this.data.maxCapturers,i.length),o=this.data.captureRate*a*e;n.points[r]=Math.min(100,n.points[r]+o);for(let e of i.slice(0,a)){let t=o/a;this.contribution.set(e.id,(this.contribution.get(e.id)??0)+t),e.battle.capturePoints+=t}if(n.points[r]>=100&&this.data.winByCapture){this.finish(r,`capture`);return}}}let n=[0,0];for(let e of t.tanks)e.alive&&n[e.team]++;if(this.data.winByDestroy||this.data.bases===`defender`){if(n[0]===0&&n[1]===0)return this.finish(-1,`destroyed`);if(n[0]===0)return this.finish(1,`destroyed`);if(n[1]===0)return this.finish(0,`destroyed`)}else if(n[0]===0&&n[1]===0)return this.finish(-1,`destroyed`);t.battleTime>=this.data.timeLimit&&this.finish(this.data.timeoutResult===`defenders`?1:-1,`timeout`)}onTankDamaged(e){if(!this.data.captureResetOnDamage)return;let t=this.contribution.get(e.id);if(!t)return;for(let n of this.bases)n.capturers.includes(e)&&(n.points[e.team]=Math.max(0,n.points[e.team]-t));this.contribution.delete(e.id);let n=this.world.tankById(e.lastDamagedBy);n&&n.team!==e.team&&(n.battle.defensePoints+=t)}finish(e,t){this.outcome||(this.outcome={winner:e,reason:t},this.world.events.emit(`battleEnd`,{winner:e,reason:t}))}attackBase(e){return this.bases.find(t=>this.canCapture(t,e))??null}defendBase(e){return this.bases.find(t=>t.owner===e)??(this.bases[0]?.owner===-1?this.bases[0]:null)}},yp=class{ids;prio;count=0;constructor(e=1024){this.ids=new Int32Array(e),this.prio=new Float32Array(e)}get length(){return this.count}clear(){this.count=0}push(e,t){if(this.count>=this.ids.length){let e=new Int32Array(this.ids.length*2),t=new Float32Array(this.prio.length*2);e.set(this.ids),t.set(this.prio),this.ids=e,this.prio=t}let n=this.count++;for(;n>0;){let e=n-1>>1;if(this.prio[e]<=t)break;this.ids[n]=this.ids[e],this.prio[n]=this.prio[e],n=e}this.ids[n]=e,this.prio[n]=t}pop(){let e=this.ids[0],t=this.ids[--this.count],n=this.prio[this.count],r=0,i=this.count>>1;for(;r<i;){let e=2*r+1;if(e+1<this.count&&this.prio[e+1]<this.prio[e]&&e++,this.prio[e]>=n)break;this.ids[r]=this.ids[e],this.prio[r]=this.prio[e],r=e}return this.ids[r]=t,this.prio[r]=n,e}},bp=4,xp=1e9,Sp=Math.SQRT2,Cp=class{map;dim;half;cost;g;parent;stamp;closed;run=0;heap=new yp(4096);constructor(e){this.map=e,this.half=e.terrain.half,this.dim=Math.ceil(e.terrain.size/bp);let t=this.dim*this.dim;this.cost=new Float32Array(t),this.g=new Float32Array(t),this.parent=new Int32Array(t),this.stamp=new Uint32Array(t),this.closed=new Uint32Array(t);for(let e=0;e<this.dim;e++)for(let t=0;t<this.dim;t++)this.cost[e*this.dim+t]=this.evaluate(t,e);this.addClearance()}center(e){return-this.half+(e+.5)*bp}evaluate(e,t){let n=this.map.terrain,r=this.center(e),i=this.center(t);if(!n.inBounds(r,i,22))return xp;let a=n.slopeAt(r,i);if(a>.62)return xp;let o=n.waterDepthAt(r,i);if(o>1.7)return xp;let s=1;a>.3&&(s+=(a-.3)*9),o>.2&&(s+=1.5+o*2);let c=n.surfaceAt(r,i);(c===`mud`||c===`sand`||c===`snow`)&&(s+=.4),c===`asphalt`&&(s-=.15);let l=!1,u={nx:0,nz:0,depth:0};return this.map.statics.queryCircle(r,i,4,e=>{!l&&e.blocksMove&&this.map.statics.circlePenetration(e,r,i,2.2,u)&&(e.destructible&&e.destructible.strength<60?s+=2.5:l=!0)}),l?xp:s}addClearance(){let e=this.dim,t=new Float32Array(e*e);for(let n=1;n<e-1;n++)for(let r=1;r<e-1;r++){let i=n*e+r;if(this.cost[i]>=xp)continue;let a=0;for(let t=-1;t<=1;t++)for(let n=-1;n<=1;n++)this.cost[i+t*e+n]>=xp&&a++;t[i]=a*.6}for(let n=0;n<e*e;n++)this.cost[n]<xp&&(this.cost[n]+=t[n])}onColliderDestroyed(e){let t=(e.shape===`circle`?e.r:Math.hypot(e.hx,e.hz))+6,n=this.cellOf(e.x-t),r=this.cellOf(e.x+t),i=this.cellOf(e.z-t),a=this.cellOf(e.z+t);for(let e=i;e<=a;e++)for(let t=n;t<=r;t++)this.cost[e*this.dim+t]=this.evaluate(t,e)}cellOf(e){return Math.max(0,Math.min(this.dim-1,Math.floor((e+this.half)/bp)))}isWalkable(e,t){return this.cost[this.cellOf(t)*this.dim+this.cellOf(e)]<xp}nearestWalkable(e,t,n=30){let r=this.cellOf(e),i=this.cellOf(t);for(let e=0;e<=n;e++)for(let t=-e;t<=e;t++)for(let n=-e;n<=e;n++){if(Math.max(Math.abs(n),Math.abs(t))!==e)continue;let a=r+n,o=i+t;if(!(a<0||o<0||a>=this.dim||o>=this.dim)&&this.cost[o*this.dim+a]<xp)return[this.center(a),this.center(o)]}return null}findPath(e,t,n,r,i=4e4){let a=this.dim,o=this.nearestWalkable(e,t,6),s=this.nearestWalkable(n,r,12);if(!o||!s)return null;let c=this.cellOf(o[0]),l=this.cellOf(o[1]),u=this.cellOf(s[0]),d=this.cellOf(s[1]),f=l*a+c,p=d*a+u,m=++this.run,h=this.heap;h.clear(),this.g[f]=0,this.stamp[f]=m,this.parent[f]=-1,h.push(f,0);let g=0,_=f,v=1/0;for(;h.length>0&&g<i;){let e=h.pop();if(this.closed[e]===m)continue;if(this.closed[e]=m,g++,e===p){_=p;break}let t=e%a,n=(e-t)/a,r=wp(t,n,u,d);r<v&&(v=r,_=e);for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){if(i===0&&r===0)continue;let o=t+i,s=n+r;if(o<0||s<0||o>=a||s>=a)continue;let c=s*a+o,l=this.cost[c];if(l>=xp||this.closed[c]===m||i!==0&&r!==0&&(this.cost[n*a+o]>=xp||this.cost[s*a+t]>=xp))continue;let f=(i!==0&&r!==0?Sp:1)*l,p=this.g[e]+f;this.stamp[c]===m&&p>=this.g[c]||(this.stamp[c]=m,this.g[c]=p,this.parent[c]=e,h.push(c,p+wp(o,s,u,d)))}}let y=[];for(let e=_;e!==-1&&(y.push(e),!(y.length>a*4));e=this.parent[e]);return y.reverse(),this.smooth(y.map(e=>[this.center(e%a),this.center(Math.floor(e/a))]))}smooth(e){if(e.length<=2)return e;let t=[e[0]],n=0;for(let r=2;r<e.length;r++)this.lineWalkable(e[n],e[r])||(t.push(e[r-1]),n=r-1);return t.push(e[e.length-1]),t}lineWalkable(e,t){let n=t[0]-e[0],r=t[1]-e[1],i=Math.ceil(Math.hypot(n,r)/(bp*.5));for(let t=1;t<i;t++){let a=e[0]+n*t/i,o=e[1]+r*t/i;if(this.cost[this.cellOf(o)*this.dim+this.cellOf(a)]>=3.5)return!1}return!0}};function wp(e,t,n,r){let i=Math.abs(e-n),a=Math.abs(t-r);return(i+a+(Sp-2)*Math.min(i,a))*.9}var Tp=class{factory;reset;maxSize;free=[];created=0;constructor(e,t=()=>{},n=1/0){this.factory=e,this.reset=t,this.maxSize=n}acquire(){let e=this.free.pop();return e===void 0?this.created>=this.maxSize?null:(this.created++,this.factory()):e}release(e){this.reset(e),this.free.push(e)}get size(){return this.created}get available(){return this.free.length}},Ep=2,Dp=new G,Op=new G,kp={t:0,collider:null,normal:new G},Ap=class{world;active=[];nextId=1;pool=new Tp(()=>({id:0,active:!1,owner:null,ammo:null,pos:new G,prev:new G,vel:new G,age:0,maxAge:0,ricochets:0}),e=>{e.active=!1,e.owner=null},512);constructor(e){this.world=e}spawn(e,t,n,r){let i=this.pool.acquire();return i?(i.id=this.nextId++,i.active=!0,i.owner=e,i.ammo=t,i.pos.copy(n),i.prev.copy(n),i.vel.copy(r).multiplyScalar(t.velocity),i.age=0,i.maxAge=t.gravityScale>3?25:6,i.ricochets=0,this.active.push(i),i):null}update(e){let t=e/Ep;for(let e=this.active.length-1;e>=0;e--){let n=this.active[e];n.prev.copy(n.pos);for(let e=0;e<Ep&&n.active;e++){let e=Op.copy(n.pos);Vf(n.pos,n.vel,n.ammo,t),n.age+=t,this.collide(n,e)}n.active&&(n.age>n.maxAge||!this.world.terrain.inBounds(n.pos.x,n.pos.z,-50)||n.pos.y<-50)&&(n.active=!1),n.active||(this.active[e]=this.active[this.active.length-1],this.active.pop(),this.pool.release(n))}}collide(e,t){let n=this.world;Dp.subVectors(e.pos,t);let r=Dp.length();if(r<1e-6)return;Dp.divideScalar(r);let i=t.clone(),a=r,o=`none`,s=n.terrain.raycast(i,Dp,r);s>=0&&s<a&&(a=s,o=`ground`);let c=n.statics.raycast(i,Dp,a,e=>e.blocksShell,kp),l=null;if(c&&c.t<a&&(a=c.t,o=`static`,l=c.collider),Dp.y<0){let r=n.terrain.waterLevel;if(t.y>r&&e.pos.y<=r){let e=(r-t.y)/Dp.y;e<a&&n.terrain.waterDepthAt(t.x+Dp.x*e,t.z+Dp.z*e)>.3&&(a=e,o=`water`)}}let u=null,d=a;for(let t of n.tanks){if(t===e.owner&&e.age<.15)continue;let r=t.layout.boundingRadius,a=t.position.x-i.x,o=t.position.y+1-i.y,s=t.position.z-i.z,c=a*Dp.x+o*Dp.y+s*Dp.z;if(c<-r||c>d+r||a*a+o*o+s*s-c*c>r*r)continue;let l=Ku(t,i,Dp,d,e.ammo,e.vel.length(),n.rng);l.kind!==`miss`&&l.t<=d&&(d=l.t,u=t,n.pendingHit=l)}if(u&&n.pendingHit){let t=n.pendingHit;if(n.pendingHit=null,n.damage.applyShellHit(u,e.owner,e.ammo,t),t.kind===`ricochet`&&t.ricochetDir&&e.ricochets<1){e.ricochets++;let r=e.vel.length()*.7;e.pos.copy(t.point).addScaledVector(t.ricochetDir,.3),e.vel.copy(t.ricochetDir).multiplyScalar(r),n.events.emit(`ricochet`,{pos:t.point.clone(),dir:t.ricochetDir.clone()});return}e.pos.copy(t.point),e.active=!1;return}if(o===`none`)return;let f=i.clone().addScaledVector(Dp,a);if(o===`static`&&l){let t=l.destructible;if(t&&(t.hp-=e.ammo.damage*(e.ammo.kind===`HE`?2:1),t.hp<=0&&n.destroyCollider(l,e.owner),t.passThrough||t.hp<=0&&e.ammo.kind!==`HE`)){e.vel.multiplyScalar(.9);return}n.events.emit(`impact`,{pos:f,normal:kp.normal.clone(),kind:`static`,ammo:e.ammo,surface:`stone`}),e.ammo.kind===`HE`&&n.damage.applySplash(f,e.ammo,e.owner),e.active=!1;return}let p=o===`ground`?n.terrain.normalAt(f.x,f.z):new G(0,1,0);n.events.emit(`impact`,{pos:f,normal:p,kind:o,ammo:e.ammo,surface:n.terrain.surfaceAt(f.x,f.z)}),e.ammo.kind===`HE`&&o!==`water`&&n.damage.applySplash(f,e.ammo,e.owner),e.pos.copy(f),e.active=!1}},jp=3.2,Mp=new G,Np=new G,Pp=new ct,Fp=new G;function Ip(e,t,n,r=!1){let i=n.x-t.x,a=n.z-t.z,o=Math.sqrt(i*i+a*a),s=n.y-t.y;if(e.gravityScale>3)return Uf(e,o,s,r);let c=Wf(e,o,s);for(let t=0;t<2;t++){let t=Hf(e,c,o,8);if(!t)break;c+=Math.atan2(s-t.y,Math.max(o,1))*.95}return c}function Lp(e,t,n,r){let i=e.stats,a=e.input,o=e.turretYaw;if(a.ammoSlot!==null&&a.ammoSlot!==e.selectedAmmo&&a.ammoSlot<e.ammoTypes.length&&e.ammoCounts[a.ammoSlot]>0&&(e.selectedAmmo=a.ammoSlot,e.reloadTimer=i.reload,e.magazineLeft=e.gun.magazine?.size??1),e.alive&&a.aimPoint&&!a.lockTurret){e.aimTarget.copy(a.aimPoint);let r=e.gunWorldPosition(Mp),o=e.ammo,s,c=e.aimCache;o.gravityScale>3&&c.ammo===o.id&&c.point.distanceToSquared(a.aimPoint)<1&&t.time-c.time<.4?s=c.elevation:(s=Ip(o,r,a.aimPoint,!1),c.point.copy(a.aimPoint),c.elevation=s,c.time=t.time,c.ammo=o.id);let l=a.aimPoint.x-r.x,u=a.aimPoint.z-r.z,d=Math.atan2(l,u),f=s??45*el;Fp.set(Math.sin(d)*Math.cos(f),Math.sin(f),Math.cos(d)*Math.cos(f)),Pp.copy(e.quaternion).invert(),Fp.applyQuaternion(Pp);let p=Math.atan2(Fp.x,Fp.z),m=Math.atan2(Fp.y,Math.sqrt(Fp.x*Fp.x+Fp.z*Fp.z)),h=e.data.traverseLimit*el;e.data.traverseLimit<180&&(p=Z(p,-h,h));let g=i.turretTraverse*n,_=al(p-e.turretYaw);e.turretYaw=al(e.turretYaw+Z(_,-g,g)),e.data.traverseLimit<180&&(e.turretYaw=Z(e.turretYaw,-h,h));let v=Z(m,-e.gun.depression*el,e.gun.elevation*el);e.gunPitch=ol(e.gunPitch,v,i.elevationSpeed*n)}e.turretRate=Math.abs(al(e.turretYaw-o))/Math.max(n,1e-4);let s=Math.abs(e.speedLong)*3.6,c=Math.abs(e.yawRate)*tl,l=e.turretRate*tl,u=i.accuracy*Math.sqrt(1+(i.dispersionMove*s)**2+(i.dispersionHull*c)**2+(i.dispersionTurret*l)**2);if(e.dispersion=u>e.dispersion?u:Math.max(u,e.dispersion*Math.exp(-n/Math.max(.2,i.aimTime))),e.alive&&e.reloadTimer>0&&(e.reloadTimer=Math.max(0,e.reloadTimer-n)),!(!e.alive||r||!a.fire||!i.canFire||e.reloadTimer>0)){if(e.ammoCounts[e.selectedAmmo]<=0){let t=e.ammoCounts.findIndex(e=>e>0);if(t<0)return;e.selectedAmmo=t,e.reloadTimer=i.reload;return}Rp(e,t)}}function Rp(e,t){let n=e.ammo,r=e.muzzlePosition(new G),i=e.gunDirection(new G),a=t.rng,o=e.dispersion*Math.min(1,Math.abs(a.gaussian())/2),s=a.next()*Math.PI*2,c=Math.abs(i.y)>.95?Np.set(1,0,0):Np.set(0,1,0),l=new G().crossVectors(i,c).normalize(),u=new G().crossVectors(l,i).normalize();i.addScaledVector(l,Math.cos(s)*o).addScaledVector(u,Math.sin(s)*o).normalize(),t.projectiles.spawn(e,n,r,i),e.ammoCounts[e.selectedAmmo]--,e.battle.shots++,e.battle.shellsUsed[n.id]=(e.battle.shellsUsed[n.id]??0)+1,e.lastShotTime=t.time,e.dispersion*=jp;let d=e.gun.magazine;d?(e.magazineLeft--,e.magazineLeft<=0?(e.magazineLeft=d.size,e.reloadTimer=e.stats.reload):e.reloadTimer=d.interShot):e.reloadTimer=e.stats.reload;let f=n.caliber/100*(25e3/e.stats.mass)*.35,p=e.turretFrameYaw+e.gunFrameYaw;e.pitchVel+=Math.cos(p)*f,e.rollVel+=Math.sin(p)*f*.6,t.events.emit(`shot`,{tank:e,ammo:n,pos:r,dir:i})}var zp=.06,Bp=1.3,Vp=5.6,Hp=5.5,Up=1.6,Wp=60,Gp=11,Kp=7,qp=new G,Jp=new G,Yp=new G,Xp={nx:0,nz:0,depth:0};function Zp(e,t,n,r){let i=t.terrain,a=e.stats,o=e.input,s=e.position,c=e.velocity;e.prevPosition.copy(s),e.prevYaw=e.yaw,e.prevTurretYaw=e.turretYaw;let l=a.mass;ll(e.yaw,qp),ul(e.yaw,Jp),i.normalAt(s.x,s.z,Yp);let u=i.surfaceAt(s.x,s.z);e.surface=u;let d=Mu[u],f=i.isIce(s.x,s.z),p=i.waterDepthAt(s.x,s.z),m=d.grip*(f?.4:1),h=e.suspension.resistance[d.resistanceClass]*(f?.75:1),g=d.speedFactor;p>.1&&(h*=1+p*1.4,g*=Math.max(.35,1-p*.35),m*=.8);let _=a.canMove&&!r&&!e.airborne,v=_?Z(o.throttle,-1,1):0,y=_?Z(o.steer,-1,1):0,b=c.dot(qp),x=c.dot(Jp),S=rl*Yp.y*(Yp.x*qp.x+Yp.z*qp.z),C=rl*Yp.y*(Yp.x*Jp.x+Yp.z*Jp.z),w=(v>=0?a.maxSpeed:a.reverseSpeed)*g,T=0;if(v!==0){let e=Math.min(m*l*rl*Yp.y,Vp*l);T=v*a.power/Math.max(Math.abs(b),Bp),T=Z(T,-e,e);let t=b*Math.sign(v);t>w?T=0:t>w-1&&(T*=w-t)}let E=T/l+S,D=zp*h*rl*Yp.y,O=4e-4*b*Math.abs(b);b+=E*n-O*n;let k=v!==0&&Math.sign(v)!==Math.sign(b)&&Math.abs(b)>.2,A=D;if(k||o.brake?A+=Hp*m:v===0&&(A+=Up),Math.abs(b)<=A*n){let e=(m+.15)*rl;b=v===0&&Math.abs(S)<e?0:b,v===0&&Math.abs(S)<e&&(E=0)}else b-=Math.sign(b)*A*n;x+=C*n;let j=m*rl*1.3;Math.abs(x)<=j*n?x=0:x-=Math.sign(x)*j*n;let M=Z(Math.abs(b)/Math.max(1,a.maxSpeed),0,1),ee=Z(1.25-h*.18,.6,1),N=-y*a.hullTraverse*(1-.3*M)*ee;b<-.5&&(N=-N),a.canMove||(N=0);let te=a.hullTraverse*(2.5+m),P=Z(N-e.yawRate,-te*n,te*n);e.yawRate+=P,e.yaw+=e.yawRate*n;let ne=Z(m/.85,0,1),F=ll(e.yaw,qp),re=ul(e.yaw,Jp),ie=e.yawRate*n*(1-ne),ae=Math.cos(ie),oe=Math.sin(ie),se=b*ae+x*oe,I=-b*oe+x*ae;c.x=F.x*se+re.x*I,c.z=F.z*se+re.z*I,e.speedLong=se;let ce=e.data.hull.dims.width/2;e.trackSpeedL=se+e.yawRate*ce,e.trackSpeedR=se-e.yawRate*ce,s.x+=c.x*n,s.z+=c.z*n,e.odometer+=Math.hypot(c.x,c.z)*n;let le=i.half-15;(s.x<-le||s.x>le)&&(s.x=Z(s.x,-le,le),c.x=0),(s.z<-le||s.z>le)&&(s.z=Z(s.z,-le,le),c.z=0),Qp(e,t);let ue=i.heightAt(s.x,s.z);if(s.y>ue+.25&&(e.airborne=!0,e.vy-=rl*n,s.y+=e.vy*n),s.y<=ue+.25){if(e.airborne&&e.vy<-7&&e.alive){let n=-e.vy-Kp;t.damage.dealDamage(e,null,n*n*l*12e-5+5),t.damage.damageModule(e,`tracks`,n*30)}e.airborne=!1,s.y=ue,e.vy=0}let de=e.data.hull.dims.length*.42,fe=ce*.85,pe=i.heightAt(s.x+F.x*de,s.z+F.z*de),me=i.heightAt(s.x-F.x*de,s.z-F.z*de),he=i.heightAt(s.x-re.x*fe,s.z-re.z*fe),ge=i.heightAt(s.x+re.x*fe,s.z+re.z*fe),_e=Math.atan2(pe-me,2*de)-E*.004,ve=Math.atan2(he-ge,2*fe)+e.yawRate*se*.002,ye=Z(3e4/l,.5,1.5);e.pitchVel+=(Wp*ye*(_e-e.pitch)-Gp*e.pitchVel)*n,e.rollVel+=(Wp*ye*(ve-e.roll)-Gp*e.rollVel)*n,e.pitch+=e.pitchVel*n,e.roll+=e.rollVel*n,e.updateQuaternion(),e.alive&&p>e.data.hull.dims.height+e.data.hull.dims.clearance?(e.drowning+=n,e.drowning>6&&t.damage.destroy(e,null,!1)):e.drowning=Math.max(0,e.drowning-n*2)}function Qp(e,t){let n=t.statics,r=e.data.hull.dims,i=r.width*.48,a=Math.max(0,r.length/2-i),o=ll(e.yaw,qp),s=e.stats.mass/1e3;for(let r of a>.3?[-a,0,a]:[0]){let a=e.position.x+o.x*r,c=e.position.z+o.z*r;n.queryCircle(a,c,i+1,r=>{if(!r.blocksMove)return;let o=e.position.y;if(o+.5<r.y0||o+1>r.y1||!n.circlePenetration(r,a,c,i,Xp))return;let l=e.velocity.x*Xp.nx+e.velocity.z*Xp.nz;if(r.destructible){let n=s*Math.max(0,-l);if(n>=r.destructible.strength){t.destroyCollider(r,e);let i=1-Math.min(.6,r.destructible.strength/Math.max(1,n)*.5);e.velocity.x*=i,e.velocity.z*=i;return}}e.position.x+=Xp.nx*Xp.depth,e.position.z+=Xp.nz*Xp.depth,l<0&&(e.velocity.x-=Xp.nx*l*1.1,e.velocity.z-=Xp.nz*l*1.1,-l>8&&e.alive&&t.damage.dealDamage(e,null,(-l-8)*s*.4))})}}function $p(e){let t=e.tanks;for(let n=0;n<t.length;n++){let r=t[n];for(let i=n+1;i<t.length;i++){let n=t[i],a=r.data.hull.dims.length*.5,o=n.data.hull.dims.length*.5,s=n.position.x-r.position.x,c=n.position.z-r.position.z;s*s+c*c>(a+o)*(a+o)||Math.abs(r.position.y-n.position.y)>4||em(e,r,n)}}}function em(e,t,n){let r=ll(t.yaw),i=ll(n.yaw),a=(e,t)=>{let n=e.data.hull.dims.width*.48,r=Math.max(0,e.data.hull.dims.length/2-n);return[-r,0,r].map(r=>({x:e.position.x+t.x*r,z:e.position.z+t.z*r,r:n}))},o=a(t,r),s=a(n,i),c={depth:0,nx:0,nz:0,px:0,pz:0};for(let e of o)for(let t of s){let n=t.x-e.x,r=t.z-e.z,i=Math.sqrt(n*n+r*r),a=e.r+t.r-i;a>c.depth&&i>1e-4&&(c={depth:a,nx:n/i,nz:r/i,px:(e.x+t.x)/2,pz:(e.z+t.z)/2})}if(c.depth<=0)return;let l=t.stats.mass,u=n.stats.mass,d=l+u,f=t.alive?u/d:.1,p=n.alive?l/d:.1,m=f+p;t.position.x-=c.nx*c.depth*(f/m),t.position.z-=c.nz*c.depth*(f/m),n.position.x+=c.nx*c.depth*(p/m),n.position.z+=c.nz*c.depth*(p/m);let h=(n.velocity.x-t.velocity.x)*c.nx+(n.velocity.z-t.velocity.z)*c.nz;if(h>=0)return;let g=-1.15*h/(1/l+1/u);t.velocity.x-=g/l*c.nx,t.velocity.z-=g/l*c.nz,n.velocity.x+=g/u*c.nx,n.velocity.z+=g/u*c.nz;let _=-h;if(_>2.5&&t.team!==n.team){let r=.5*(l*u/d)*_*_,i=r*13e-5*(u/d)*2,a=r*13e-5*(l/d)*2,o=new G(c.px,(t.position.y+n.position.y)/2+1,c.pz);t.alive&&n.alive&&(e.damage.dealDamage(n,t,a),e.damage.dealDamage(t,n,i),e.events.emit(`ram`,{a:t,b:n,damage:Math.round(a),pos:o}))}}var tm=1/60,nm=class{map;events=new np;tanks=[];controllers=[];preStep=[];rng;nav;projectiles;damage;detection;mode;pendingHit=null;time=0;countdown;tankMap=new Map;constructor(e,t,n,r=5){this.map=e,this.rng=new hl(n),this.nav=new Cp(e),this.projectiles=new Ap(this),this.damage=new sp(this),this.detection=new _p(this),this.mode=new vp(this,t,e.data.bases),this.countdown=r}get terrain(){return this.map.terrain}get statics(){return this.map.statics}get battleTime(){return Math.max(0,this.time-this.countdown)}get frozen(){return this.time<this.countdown}addTank(e,t,n,r){return e.position.set(t,this.terrain.heightAt(t,n),n),e.prevPosition.copy(e.position),e.yaw=r,e.prevYaw=r,e.updateQuaternion(),e.aimTarget.copy(e.position).add(new G(Math.sin(r)*100,2,Math.cos(r)*100)),this.tanks.push(e),this.tankMap.set(e.id,e),e}addController(e){this.controllers.push(e)}tankById(e){return this.tankMap.get(e)??null}destroyCollider(e,t){e.alive&&(this.statics.destroy(e),this.nav.onColliderDestroyed(e),this.events.emit(`destructible`,{collider:e,by:t,pos:new G(e.x,(e.y0+e.y1)/2,e.z)}))}step(e=tm){this.time+=e;let t=this.frozen||this.mode.outcome!==null;for(let e of this.preStep)e();for(let t of this.controllers)t.update(this,e);for(let n of this.tanks)Lp(n,this,e,t);for(let n of this.tanks)Zp(n,this,e,t);$p(this),this.projectiles.update(e),this.damage.update(e),this.detection.update(e),this.frozen||this.mode.update(e);for(let e of this.tanks)e.input.ammoSlot=null,e.input.consumable=null}},rm=`Ястреб.Беркут.Гром.Тайфун.Кречет.Сапсан.Волк.Медведь.Барс.Вепрь.Филин.Лис.Ворон.Тур.Сыч.Кобра.Рысь.Орёл.Сокол.Мираж.Шквал.Буран.Зенит.Каскад.Пламя.Вега.Гранит.Сигма.Рубин.Аргон`.split(`.`);function im(e,t,n){let r=t>=3?Math.max(0,Math.round(e*.1)):0,i=Math.round(e*.2),a=t>=4?Math.round(e*.26):0,o=Math.max(1,Math.round(e*.14)),s=Math.max(0,e-r-i-a-o),c=[],l=(e,r)=>{for(let i=0;i<r;i++){let r=n.next(),i=Math.max(1,Math.min(10,t+(r<.25?-1:+(r>.75))));c.push({cls:e,tier:i})}};return l(`SPG`,r),l(`TD`,i),l(`HT`,a),l(`LT`,o),l(`MT`,s),c.slice(0,e)}function am(e,t,n){let r=Wl.allTanks().filter(e=>!e.premium);for(let i of[0,1]){let a=r.filter(n=>n.cls===e&&Math.abs(n.tier-t)<=i);if(a.length)return n.pick(a)}for(let i=0;i<=3;i++){let a=r.filter(n=>Math.abs(n.tier-t)<=i&&(n.cls!==`SPG`||e===`SPG`));if(a.length)return n.pick(a)}return n.pick(r)}function om(e,t,n,r){let i=Math.atan2(n[0]-t[0],n[1]-t[1]),a=Math.sin(i),o=Math.cos(i),s=-Math.cos(i),c=Math.sin(i),l=Math.ceil(r/5),u=[];for(let n=0;n<r;n++){let r=Math.floor(n/5)-(l-1)/2,d=n%5-2,f=t[0]+s*d*15-a*r*14,p=t[1]+c*d*15-o*r*14,m=e.nav.nearestWalkable(f,p,10);m&&([f,p]=m),u.push({x:f,z:p,yaw:i})}return u}function sm(e,t){let n=Wl.getMap(e.mapId),r=new nm(t??new Ad(n).build(),Wl.getMode(e.modeId),e.seed,e.countdown??5),i=new hl(e.seed^10855845),a=tp[e.difficulty],o=[new Jf(r,0),new Jf(r,1)],s=e.player?Wl.getTank(e.player.tankId):null,c=s?.tier??5,l=im(e.teamSize,c,i),u={easy:.3,normal:.6,hard:.9,expert:1}[e.difficulty],d={easy:55,normal:75,hard:90,expert:100}[e.difficulty],f=i.shuffle([...rm]),p=0,m=[],h=null;for(let t of[0,1]){let c=l.map(e=>({...e}));if(t===0&&s){let e=c.findIndex(e=>e.cls===s.cls);e<0&&(e=c.length-1),c.splice(e,1)}let g=om(r,t===0?n.spawns.a:n.spawns.b,t===0?n.spawns.b:n.spawns.a,c.length+(t===0&&s?1:0)),_=0;if(t===0&&s&&e.player){let t=g[_++];h=new ou(s,0,e.player.callsign,e.player.loadout),h.isPlayer=!0,r.addTank(h,t.x,t.z,t.yaw)}for(let e of c){let n=am(e.cls,e.tier,i),s=mu(n,d,i.chance(u)),c=new ou(n,t,`${f[p++%f.length]}-${i.int(10,99)}`,s),l=g[_++];r.addTank(c,l.x,l.z,l.yaw);let h=new ep(c,r,o[t],a);m.push(h),r.addController(h)}}return r.preStep.push(()=>o.forEach(e=>e.update())),{world:r,player:h,ais:m,brains:o,setup:e}}function cm(e,t=``,n=``){let r=document.createElement(e);return t&&(r.className=t),n&&(r.textContent=n),r}var lm=null;function um(e,t=!1){lm||(lm=cm(`div`,`toast-wrap`),document.body.appendChild(lm));let n=cm(`div`,`toast${t?` err`:``}`,e);lm.appendChild(n),setTimeout(()=>n.remove(),2600)}var dm={LT:`<svg class="cls-icon" viewBox="0 0 16 16"><path d="M8 2 L14 13 L2 13 Z" fill="none" stroke="#9fd3ff" stroke-width="2"/></svg>`,MT:`<svg class="cls-icon" viewBox="0 0 16 16"><path d="M8 2 L14 13 L2 13 Z" fill="#9fd3ff"/></svg>`,HT:`<svg class="cls-icon" viewBox="0 0 16 16"><path d="M8 1 L15 14 L1 14 Z" fill="#ffd36b"/><path d="M8 6 L11 12 L5 12 Z" fill="#1a1a1a"/></svg>`,TD:`<svg class="cls-icon" viewBox="0 0 16 16"><path d="M8 14 L14 3 L2 3 Z" fill="#c9a0ff"/></svg>`,SPG:`<svg class="cls-icon" viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="10" fill="#ff9a8a"/></svg>`},fm={gun:`Орудие`,turret:`Башня`,engine:`Двигатель`,suspension:`Ходовая`,radio:`Радиостанция`},pm=class{prog;cb;root;tab=`modules`;constructor(e,t,n){this.prog=t,this.cb=n,this.root=cm(`div`,`garage`),e.appendChild(this.root),this.render()}get tankId(){return this.prog.data.selectedTank}render(){let e=this.prog,t=Wl.getTank(this.tankId),n=e.data,r=Ul.map(e=>`<option value="${e.id}" ${n.lastMode===e.id?`selected`:``}>${e.name}</option>`).join(``),i=[`<option value="random">Случайная карта</option>`,...Hl.map(e=>`<option value="${e.id}" ${n.lastMap===e.id?`selected`:``}>${e.name}</option>`)].join(``);this.root.innerHTML=`
      <div class="g-top">
        <div class="g-logo">СТАЛЬНОЙ РУБЕЖ</div>
        <button class="btn small" data-act="tree">Исследования</button>
        <button class="btn small" data-act="settings">Настройки</button>
        <div class="g-battle">
          <select class="sel-mode" title="Режим">${r}</select>
          <select class="sel-map" title="Карта">${i}</select>
          <button class="btn primary" data-act="battle">В БОЙ!</button>
        </div>
        <div class="g-res"><span class="cr">⛁ ${fl(n.credits)}</span><span class="xp">★ ${fl(n.freeXp)} своб.</span></div>
      </div>
      <div class="g-left panel">${this.renderStats(t)}</div>
      <div class="g-center"><div class="tank-title"><h2>${dm[t.cls]}${t.name}</h2><div class="muted">${Wl.getNation(t.nation).name} · ${Cl[t.cls].name} · уровень ${pl[t.tier]}${t.premium?` · <span class="cr">премиум</span>`:``}</div><div class="xp">Опыт машины: ${fl(e.progress(t.id).xp)}</div></div></div>
      <div class="g-right panel">
        <div class="tabs">
          <button data-tab="modules" class="${this.tab===`modules`?`active`:``}">Модули</button>
          <button data-tab="ammo" class="${this.tab===`ammo`?`active`:``}">Снаряды</button>
          <button data-tab="crew" class="${this.tab===`crew`?`active`:``}">Экипаж</button>
          <button data-tab="stats" class="${this.tab===`stats`?`active`:``}">Статистика</button>
        </div>
        <div class="tab-body">${this.renderTab(t)}</div>
      </div>
      <div class="g-bottom">${this.renderCarousel()}</div>`,this.bind()}renderStats(e){let t=this.prog.loadoutFor(e.id),n=new ou(e,0,``,t),r=n.stats,i=n.gun,a=i.ammo[0],o=r.mass/1e3,s=Wl.loadOf(e,t.modules),c=(e,t)=>`<div class="stat-row"><span class="muted">${e}</span><span>${t}</span></div>`,l=e.hull,u=n.turret.armor;return`
      <div class="section-title">Живучесть</div>
      ${c(`Прочность`,n.maxHp)}
      ${c(`Масса / предел ходовой`,`${o.toFixed(1)} / ${n.suspension.maxLoad.toFixed(1)} т`)}
      ${c(`Броня корпуса (лоб/борт/корма)`,`${l.armor.upperFront}/${l.armor.side}/${l.armor.rear} мм`)}
      ${c(`Наклон ВЛД / НЛД`,`${l.angles.upperFront.toFixed(0)}° / ${l.angles.lowerFront.toFixed(0)}°`)}
      ${c(e.hasTurret?`Броня башни (лоб/борт/корма)`:`Броня рубки (лоб/борт/корма)`,`${u.front}/${u.side}/${u.rear} мм`)}
      ${c(`Маска орудия`,`${u.mantlet} мм`)}
      ${l.screens?c(`Противокумулятивные экраны`,`${l.screens} мм`):``}
      <div class="section-title">Огневая мощь · ${i.name}</div>
      ${c(`Калибр`,`${i.caliber} мм`)}
      ${c(`Урон (ББ)`,a.damage)}
      ${c(`Пробитие ББ / спец.`,`${a.penetration} / ${i.ammo[1].penetration} мм`)}
      ${c(`Скорострельность`,i.magazine?`магазин ${i.magazine.size} шт · ${i.magazine.interShot} с`:`${(60/r.reload).toFixed(1)} выстр/мин`)}
      ${c(`Перезарядка`,`${r.reload.toFixed(2)} с`)}
      ${c(`Урон в минуту`,Math.round(60/r.reload*a.damage*(i.magazine?i.magazine.size:1)))}
      ${c(`Разброс на 100 м`,`${(r.accuracy*100).toFixed(2)} м`)}
      ${c(`Время сведения`,`${r.aimTime.toFixed(2)} с`)}
      ${c(`Скорость снаряда (ББ)`,`${a.velocity} м/с`)}
      ${c(`Углы ВН`,`+${i.elevation}° / −${i.depression}°`)}
      ${e.traverseLimit<180?c(`Углы ГН`,`±${e.traverseLimit}°`):``}
      ${i.artillery?c(`Дальность стрельбы`,`${Math.round(Kf(a))} м`):``}
      ${c(`Боезапас`,`${i.ammoCapacity} шт`)}
      <div class="section-title">Подвижность</div>
      ${c(`Двигатель`,`${n.engine.name} · ${n.engine.power} л.с.`)}
      ${c(`Удельная мощность`,`${(n.engine.power/o).toFixed(1)} л.с./т`)}
      ${c(`Трансмиссия`,l.transmission.name)}
      ${c(`Макс. скорость вперёд / назад`,`${l.maxSpeed} / ${l.reverseSpeed} км/ч`)}
      ${c(`Поворот корпуса`,`${n.suspension.traverseSpeed}°/с`)}
      ${c(`Поворот башни`,`${n.turret.traverseSpeed}°/с`)}
      <div class="section-title">Разведка</div>
      ${c(`Обзор`,`${Math.round(r.viewRange)} м`)}
      ${c(`Дальность связи`,`${Math.round(r.radioRange)} м`)}
      ${c(`Маскировка (стоя/движение)`,`${Math.round(r.camoStationary*100)}% / ${Math.round(r.camoMoving*100)}%`)}
      ${c(`Экипаж`,`${e.crew.length} чел. · ${t.crewSkill}%`)}
      ${c(`Нагрузка ходовой`,`${s.toFixed(1)} т`)}`}renderTab(e){let t=this.prog,n=t.progress(e.id);if(this.tab===`modules`)return[`gun`,`turret`,`engine`,`suspension`,`radio`].map(n=>{let r=e.modules[n].map(n=>{let r=t.moduleState(e.id,n.id),i=this.moduleDesc(n),a=``;return a=r===`researchable`?`<button class="btn small" data-research="${n.id}">Исследовать <span class="xp">${fl(n.researchXp)}</span></button>`:r===`researched`?`<button class="btn small" data-equip="${n.id}">Купить <span class="cr">${fl(n.price)}</span></button>`:r===`purchased`?`<button class="btn small" data-equip="${n.id}">Установить</button>`:r===`equipped`?`<span class="muted">установлен</span>`:`<span class="muted">🔒</span>`,`<div class="module-row ${r===`equipped`?`equipped`:``}"><div><div>${n.name}</div><div class="sub">${i}</div></div><div>${a}</div></div>`}).join(``);return`<div class="section-title">${fm[n]}</div>${r}`}).join(``);if(this.tab===`ammo`){let r=t.equippedGun(e.id);return`<div class="muted" style="margin-bottom:8px">Боекомплект: ${r.ammo.reduce((e,t)=>e+(n.ammo[t.id]??0),0)} / ${r.ammoCapacity}. Израсходованные снаряды докупаются автоматически после боя.</div>`+r.ammo.map(e=>`
          <div class="ammo-row">
            <div><b style="color:${wl[e.kind].color}">${wl[e.kind].short}</b> ${e.name}<div class="muted" style="font-size:11px">Пробитие ${e.penetration} мм · урон ${e.damage} · ${e.velocity} м/с · ${e.mass} кг · <span class="cr">${e.price} кр.</span>${e.kind===`HE`?` · радиус ${e.explosionRadius.toFixed(1)} м`:``}${e.kind===`HEAT`?` · без нормализации`:``}</div></div>
            <input type="range" min="0" max="${r.ammoCapacity}" value="${n.ammo[e.id]??0}" data-ammo="${e.id}">
            <span>${n.ammo[e.id]??0}</span>
          </div>`).join(``)}if(this.tab===`crew`){let r=n.crew,i=Jl(r.skill);return`
        <div class="section-title">Уровень подготовки: ${r.skill}%</div>
        <div class="muted" style="font-size:12px">${r.skill<100?`Опыт до следующего процента: ${r.xp} / ${i}`:`Опыт до нового навыка: ${Math.floor(r.perkXp)} / ${Yl}`}</div>
        ${e.crew.map((t,n)=>`<div class="crew-member"><span>${Kl[t]}</span><span class="muted">${Wl.getNation(e.nation).crewNames[(n*3+e.tier)%10]} · ${r.skill}%</span></div>`).join(``)}
        <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">
          <button class="btn small" data-train="75" ${r.skill>=75?`disabled`:``}>Обучить до 75% · <span class="cr">${fl(t.crewTrainingCost(e.id,75))}</span></button>
          <button class="btn small" data-train="100" ${r.skill>=100?`disabled`:``}>Обучить до 100% · <span class="cr">${fl(t.crewTrainingCost(e.id,100))}</span></button>
        </div>
        <div class="section-title">Навыки (${r.perks.length}/3, очков: ${r.perkPoints})</div>
        ${ql.map(e=>`<div class="module-row ${r.perks.includes(e.id)?`equipped`:``}"><div><div>${e.name}</div><div class="sub">${e.description}</div></div><div>${r.perks.includes(e.id)?`<span class="muted">изучен</span>`:`<button class="btn small" data-perk="${e.id}" ${r.perkPoints>0?``:`disabled`}>Изучить</button>`}</div></div>`).join(``)}
        <div class="section-title">Опыт</div>
        <button class="btn small" data-convert ${n.xp>0?``:`disabled`}>Перевести весь опыт машины в свободный (25 кр./ед.)</button>`}let r=t.data.stats,i=(e,t)=>`<div class="stat-row"><span class="muted">${e}</span><span>${t}</span></div>`,a=r.battles?(r.wins/r.battles*100).toFixed(1):`0`;return`
      <div class="section-title">Общая статистика</div>
      ${i(`Боёв`,r.battles)}${i(`Побед / поражений / ничьих`,`${r.wins} / ${r.losses} / ${r.draws}`)}${i(`Процент побед`,`${a}%`)}
      ${i(`Средний урон`,r.battles?Math.round(r.damage/r.battles):0)}${i(`Уничтожено машин`,r.kills)}${i(`Обнаружено`,r.spotted)}
      ${i(`Точность`,r.shots?`${(r.hits/r.shots*100).toFixed(1)}%`:`—`)}${i(`Рекорд урона`,r.bestDamage)}${i(`Рекорд фрагов`,r.bestKills)}
      ${i(`Всего опыта`,fl(r.totalXp))}${i(`Заработано кредитов`,fl(r.creditsEarned))}
      <div class="section-title">${e.name}</div>
      ${i(`Боёв`,n.battles)}${i(`Побед`,n.wins)}${i(`Урон`,fl(n.damage))}${i(`Фраги`,n.kills)}
      <div style="margin-top:12px">${t.isOwned(e.id)&&t.ownedTanks().length>1?`<button class="btn small danger" data-sell>Продать за ${fl(t.sellPrice(e.id))} кр.</button>`:``}</div>`}moduleDesc(e){switch(e.slot){case`gun`:return`${e.caliber} мм · урон ${e.ammo[0].damage} · пробитие ${e.ammo[0].penetration} · ${e.reloadTime.toFixed(1)} с · ${e.mass} т`;case`turret`:return`броня ${e.armor.front}/${e.armor.side}/${e.armor.rear} · ${e.traverseSpeed}°/с · обзор ${e.viewRange} м${e.hpBonus?` · +${e.hpBonus} HP`:``}`;case`engine`:return`${e.power} л.с. · пожар ${Math.round(e.fireChance*100)}%`;case`suspension`:return`нагрузка ${e.maxLoad.toFixed(1)} т · поворот ${e.traverseSpeed}°/с`;case`radio`:return`дальность ${e.range} м`}}renderCarousel(){return this.prog.ownedTanks().sort((e,t)=>e.tier-t.tier||e.nation.localeCompare(t.nation)).map(e=>`<div class="tank-card ${e.id===this.tankId?`selected`:``}" data-tank="${e.id}">
          <span class="tier">${pl[e.tier]}</span>
          <div class="muted" style="font-size:11px">${Wl.getNation(e.nation).name}</div>
          <div class="name">${dm[e.cls]}${e.name}</div>
          <div class="xp" style="font-size:11px">★ ${fl(this.prog.progress(e.id).xp)}</div>
        </div>`).join(``)}result(e){e.message&&um(e.message,!e.ok),this.cb.sound(e.ok?`buy`:`error`),e.ok&&this.cb.onChanged(),this.render()}bind(){let e=e=>[...this.root.querySelectorAll(e)];e(`[data-tank]`).forEach(e=>e.addEventListener(`click`,()=>{this.cb.sound(`click`),this.cb.onSelectTank(e.dataset.tank),this.render()})),e(`[data-tab]`).forEach(e=>e.addEventListener(`click`,()=>{this.tab=e.dataset.tab,this.cb.sound(`click`),this.render()})),e(`[data-research]`).forEach(e=>e.addEventListener(`click`,()=>this.result(this.prog.researchModule(this.tankId,e.dataset.research)))),e(`[data-equip]`).forEach(e=>e.addEventListener(`click`,()=>{this.result(this.prog.buyAndEquipModule(this.tankId,e.dataset.equip)),this.cb.onSelectTank(this.tankId)})),e(`[data-ammo]`).forEach(e=>e.addEventListener(`input`,()=>{this.prog.setAmmo(this.tankId,e.dataset.ammo,Number(e.value));let t=this.prog.progress(this.tankId);e.value=String(t.ammo[e.dataset.ammo]??0),e.nextElementSibling.textContent=e.value,this.cb.onChanged()})),e(`[data-train]`).forEach(e=>e.addEventListener(`click`,()=>this.result(this.prog.trainCrew(this.tankId,Number(e.dataset.train))))),e(`[data-perk]`).forEach(e=>e.addEventListener(`click`,()=>this.result(this.prog.learnPerk(this.tankId,e.dataset.perk)))),e(`[data-convert]`).forEach(e=>e.addEventListener(`click`,()=>this.result(this.prog.convertToFreeXp(this.tankId,this.prog.progress(this.tankId).xp)))),e(`[data-sell]`).forEach(e=>e.addEventListener(`click`,()=>{if(!confirm(`Продать танк? Экипаж будет расформирован.`))return;let e=this.prog.sell(this.tankId);this.result(e),this.cb.onSelectTank(this.prog.data.selectedTank),this.render()})),e(`[data-act="battle"]`).forEach(e=>e.addEventListener(`click`,()=>{let e=this.root.querySelector(`.sel-mode`).value,t=this.root.querySelector(`.sel-map`).value;this.cb.onBattle(e,t)})),e(`[data-act="tree"]`).forEach(e=>e.addEventListener(`click`,()=>this.cb.onOpenTree(Wl.getTank(this.tankId).nation))),e(`[data-act="settings"]`).forEach(e=>e.addEventListener(`click`,()=>this.cb.onOpenSettings()))}dispose(){this.root.remove()}},mm=512,hm=class{map;canvas;ctx;background;scale;half;lastSeen=new Map;constructor(e){this.map=e,this.canvas=document.createElement(`canvas`),this.canvas.width=this.canvas.height=mm,this.ctx=this.canvas.getContext(`2d`),this.half=e.terrain.half,this.scale=mm/e.terrain.size,this.background=this.renderBackground()}toScreen(e,t){return[(this.half-e)*this.scale,(this.half-t)*this.scale]}renderBackground(){let e=this.map.terrain,t=document.createElement(`canvas`);t.width=t.height=mm;let n=t.getContext(`2d`),r=n.createImageData(mm,mm),i=parseInt(this.map.data.biome.waterColor.slice(1),16),a=i>>16&255,o=i>>8&255,s=i&255;for(let t=0;t<mm;t++)for(let n=0;n<mm;n++){let i=this.half-n/this.scale,c=this.half-t/this.scale,l=e.heightAt(i,c),u=(t*mm+n)*4;if(e.waterDepthAt(i,c)>.15)r.data[u]=a,r.data[u+1]=o,r.data[u+2]=s;else{let t=Mu[Nu[e.surface[e.cellIndex(i,c)]]],n=.75+(e.heightAt(i+3,c-3)-l)*.12+(l-10)*.004,a=Math.max(.45,Math.min(1.35,n));r.data[u]=Math.min(255,t.color[0]*255*a),r.data[u+1]=Math.min(255,t.color[1]*255*a),r.data[u+2]=Math.min(255,t.color[2]*255*a)}r.data[u+3]=255}n.putImageData(r,0,0);for(let e of this.map.props){if(![`building`,`house`,`hall`,`silo`,`container`,`wall`,`wagon`,`lighthouse`,`chimney`].includes(e.kind))continue;let[t,r]=this.toScreen(e.x,e.z);n.save(),n.translate(t,r),n.rotate(e.rot),n.fillStyle=e.kind===`house`?`rgba(120,80,60,0.9)`:`rgba(70,70,75,0.95)`,n.fillRect(-e.sx/2*this.scale,-e.sz/2*this.scale,Math.max(1.5,e.sx*this.scale),Math.max(1.5,e.sz*this.scale)),n.restore()}n.fillStyle=`rgba(20,60,20,0.55)`;for(let e of this.map.props){if(e.kind!==`tree`)continue;let[t,r]=this.toScreen(e.x,e.z);n.beginPath(),n.arc(t,r,1.6,0,Math.PI*2),n.fill()}n.strokeStyle=`rgba(255,255,255,0.15)`,n.fillStyle=`rgba(255,255,255,0.55)`,n.font=`13px sans-serif`;for(let e=1;e<10;e++)n.beginPath(),n.moveTo(e*mm/10,0),n.lineTo(e*mm/10,mm),n.moveTo(0,e*mm/10),n.lineTo(mm,e*mm/10),n.stroke();for(let e=0;e<10;e++)n.fillText(`АБВГДЕЖЗИК`[e],3,e*mm/10+14),n.fillText(String(e+1),e*mm/10+4,508);return t}draw(e,t,n){let r=this.ctx;r.drawImage(this.background,0,0);for(let n of e.mode.bases){let[e,i]=this.toScreen(n.x,n.z),a=t?n.owner===t.team:n.owner===0;r.strokeStyle=n.owner===-1?`#ffffff`:a?`#7be366`:`#ff5a4d`,r.fillStyle=n.owner===-1?`rgba(255,255,255,0.15)`:a?`rgba(123,227,102,0.18)`:`rgba(255,90,77,0.18)`,r.lineWidth=2,r.beginPath(),r.arc(e,i,40*this.scale,0,Math.PI*2),r.fill(),r.stroke();let o=Math.max(n.points[0],n.points[1]);o>0&&(r.strokeStyle=`#ffd36b`,r.lineWidth=4,r.beginPath(),r.arc(e,i,40*this.scale+4,-Math.PI/2,-Math.PI/2+o/100*Math.PI*2),r.stroke())}if(t&&t.alive){let[e,i]=this.toScreen(t.position.x,t.position.z);r.strokeStyle=`rgba(255,255,255,0.35)`,r.lineWidth=1,r.beginPath(),r.arc(e,i,t.stats.viewRange*this.scale,0,Math.PI*2),r.stroke(),r.strokeStyle=`rgba(255,255,255,0.12)`,r.beginPath(),r.arc(e,i,445*this.scale,0,Math.PI*2),r.stroke();let a=Math.atan2(-Math.cos(n),-Math.sin(n));r.fillStyle=`rgba(255,255,255,0.12)`,r.beginPath(),r.moveTo(e,i),r.arc(e,i,70,a-.45,a+.45),r.closePath(),r.fill()}for(let n of e.tanks){let i=t?n.team===t.team:n.team===0;if(!(!t||i||e.detection.isVisibleTo(t,n)))continue;i||this.lastSeen.set(n.id,{x:n.position.x,z:n.position.z,time:e.time});let[a,o]=this.toScreen(n.position.x,n.position.z),s=n===t?`#ffffff`:i?`#7be366`:`#ff5a4d`;r.save(),r.translate(a,o),r.rotate(-n.yaw),r.fillStyle=n.alive?s:`rgba(40,40,40,0.9)`,r.strokeStyle=`rgba(0,0,0,0.8)`,r.lineWidth=1.5,r.beginPath(),n.data.cls===`SPG`?r.rect(-5,-5,10,10):(r.moveTo(0,-9),r.lineTo(6,6),r.lineTo(-6,6),r.closePath()),r.fill(),r.stroke(),r.restore()}if(t){r.fillStyle=`rgba(255,150,140,0.5)`;for(let n of e.tanks){if(n.team===t.team||!n.alive||e.detection.isVisibleTo(t,n))continue;let i=this.lastSeen.get(n.id);if(!i||e.time-i.time>25)continue;let[a,o]=this.toScreen(i.x,i.z);r.beginPath(),r.arc(a,o,3,0,Math.PI*2),r.fill()}}}},gm=[`engine`,`transmission`,`tracks`,`gun`,`turretRing`,`radio`,`ammoRack`,`fuelTank`],_m={engine:`Двиг.`,transmission:`Трансм.`,tracks:`Гусен.`,gun:`Орудие`,turretRing:`Башня`,radio:`Рация`,ammoRack:`БК`,fuelTank:`Бак`},vm={LT:`ЛТ`,MT:`СТ`,HT:`ТТ`,TD:`ПТ`,SPG:`САУ`},ym=new G,bm=new G,xm=new G,Sm=new G,Cm=class{world;player;cam;root;minimap;els={};markers=new Map;markerLayer;slowTimer=0;teamRows=new Map;unsubs=[];fpsFrames=0;fpsTime=0;showFps=!1;scoreboardVisible=!1;artyReach=null;constructor(e,t,n,r){this.world=t,this.player=n,this.cam=r,this.minimap=new hm(t.map),this.root=cm(`div`,`hud`),this.root.innerHTML=`
      <div class="scope hidden"></div>
      <div class="zoom-label hidden"></div>
      <div class="markers"></div>
      <div class="score"><span class="num ally">0</span><span class="timer">10:00</span><span class="num enemy">0</span></div>
      <div class="capture"></div>
      <div class="teams left"></div><div class="teams right"></div>
      <div class="kill-feed"></div>
      <div class="radio-log"></div>
      <div class="hit-log"></div>
      <div class="crosshair"><div class="dot"></div></div>
      <div class="gun-marker"><div class="rl"></div></div>
      <div class="aim-info"></div>
      <div class="spotted-lamp">💡</div>
      <div class="notice"></div>
      <div class="center-msg"></div>
      <div class="damage-panel panel">
        <div><b class="dp-name"></b> <span class="muted dp-tier"></span></div>
        <div class="hp-big"><div></div><span></span></div>
        <div class="modules-grid"></div>
        <div class="crew-row"></div>
        <svg class="dir-widget" viewBox="-30 -30 60 60"><circle r="27" fill="rgba(0,0,0,.4)" stroke="rgba(255,255,255,.2)"/>
          <g class="dw-hull"><rect x="-8" y="-14" width="16" height="28" rx="2" fill="#7be366" opacity=".8"/></g>
          <g class="dw-turret"><circle r="5" fill="#fff"/><rect x="-1.2" y="-22" width="2.4" height="18" fill="#fff"/></g>
          <path class="dw-cam" d="M0 0 L-9 -26 A27 27 0 0 1 9 -26 Z" fill="rgba(255,255,255,.18)"/></svg>
      </div>
      <div class="speed"></div>
      <div class="ammo-bar"></div>
      <div class="minimap"></div>
      <div class="scoreboard panel hidden"></div>
      <div class="fps hidden"></div>`,e.appendChild(this.root);for(let e of[`score`,`capture`,`kill-feed`,`radio-log`,`hit-log`,`gun-marker`,`aim-info`,`spotted-lamp`,`notice`,`center-msg`,`speed`,`ammo-bar`,`minimap`,`scoreboard`,`fps`,`scope`,`zoom-label`,`markers`])this.els[e]=this.root.querySelector(`.${e}`);this.markerLayer=this.els.markers,this.els.minimap.appendChild(this.minimap.canvas),this.buildStatic(),this.bindEvents()}buildStatic(){let e=this.player;this.root.querySelector(`.dp-name`).textContent=e.data.name,this.root.querySelector(`.dp-tier`).textContent=`${vm[e.data.cls]} ${pl[e.data.tier]}`;let t=this.root.querySelector(`.modules-grid`);for(let e of gm)t.appendChild(cm(`div`,`mod mod-${e}`,_m[e]));let n=this.root.querySelector(`.crew-row`);for(let t of e.crew)n.appendChild(cm(`span`,`c c-${t.role}`,Kl[t.role].split(`-`)[0]));let r=this.els[`ammo-bar`];e.ammoTypes.forEach((e,t)=>{let n=cm(`div`,`ammo-slot`);n.innerHTML=`<span class="k">${t+1}</span><div class="t" style="color:${wl[e.kind].color}">${wl[e.kind].short}</div><div class="n"></div><div class="reload"></div>`,n.title=`${e.name}: пробитие ${e.penetration} мм, урон ${e.damage}`,r.appendChild(n)}),[`🔧`,`✚`,`🧯`].forEach((e,t)=>{let n=cm(`div`,`cons-slot`);n.innerHTML=`<span class="k">${t+4}</span>${e}`,r.appendChild(n)});for(let t of[`left`,`right`]){let n=this.root.querySelector(`.teams.${t}`),r=t===`left`?e.team:1-e.team;for(let t of this.world.tanks.filter(e=>e.team===r)){let r=cm(`div`,`team-row${t===e?` me`:``}`);r.innerHTML=`<span>${vm[t.data.cls]}</span><span>${t.callsign} <span class="muted">${pl[t.data.tier]}</span></span><div class="hpb"><div></div></div>`,n.appendChild(r),this.teamRows.set(t.id,r)}}}log(e,t,n,r=4e3,i=6){let a=this.els[e],o=cm(`div`,`e ${n}`,t);for(a.prepend(o);a.children.length>i;)a.lastChild?.remove();setTimeout(()=>o.remove(),r)}notice(e,t=2500){let n=this.els.notice;n.textContent=e,clearTimeout(n._t),n._t=window.setTimeout(()=>n.textContent=``,t)}bindEvents(){let e=this.world.events,t=this.player;this.unsubs.push(e.on(`hit`,e=>{let n=e.result;if(e.attacker===t&&e.target!==t){let e={penetration:[`Пробитие! −${n.damage}`,`good`],heSplash:[n.damage>0?`Фугас: −${n.damage}`:`Фугас не нанёс урона`,n.damage>0?`good`:`neutral`],ricochet:[`Рикошет`,`neutral`],noPenetration:[`Не пробил`,`neutral`],critical:[`Критическое попадание`,`good`]}[n.kind];e&&this.log(`hit-log`,e[0],e[1])}else if(e.target===t){let t=n.kind===`penetration`||n.kind===`heSplash`&&n.damage>0?`Получено −${n.damage} от ${e.attacker?.callsign??`?`}`:n.kind===`ricochet`?`Броня: рикошет`:n.kind===`noPenetration`?`Броня выдержала`:`Попадание в модуль`;this.log(`hit-log`,t,n.damage>0?`bad`:`neutral`)}}),e.on(`moduleChanged`,e=>{e.tank===t&&(e.repaired||this.log(`hit-log`,`${ru[e.module]}: ${e.status===`destroyed`?`уничтожен`:`повреждён`}`,`bad`))}),e.on(`crewWounded`,e=>{e.tank===t&&this.log(`hit-log`,`${Kl[e.role]} ранен`,`bad`)}),e.on(`fire`,e=>{e.tank===t&&e.burning&&this.notice(`🔥 ПОЖАР! Нажмите 6 — огнетушитель`,3500)}),e.on(`tankDestroyed`,e=>{let n=e.killer,r=e=>e?e.team===t.team?`#9ef08a`:`#ff8b80`:`#ccc`,i=cm(`div`,`e`);for(i.innerHTML=`<span style="color:${r(n)}">${n?.callsign??`—`}</span> ${e.ammoRack?`💥`:`✖`} <span style="color:${r(e.tank)}">${e.tank.callsign} (${e.tank.data.name})</span>`,this.els[`kill-feed`].prepend(i);this.els[`kill-feed`].children.length>6;)this.els[`kill-feed`].lastChild?.remove();setTimeout(()=>i.remove(),9e3),n===t&&this.notice(`Уничтожен ${e.tank.data.name}!`),e.tank===t&&this.notice(`Ваш танк уничтожен · Esc — выйти в ангар`,8e3)}),e.on(`radio`,e=>{e.team===t.team&&this.log(`radio-log`,`📻 ${e.text}`,``,6e3,5)}),e.on(`spotted`,e=>{e.byTeam===t.team&&e.first&&this.log(`radio-log`,`👁 Обнаружен: ${e.tank.data.name}`,``,4e3,5)}),e.on(`consumable`,e=>{e.tank===t&&this.notice([`Ремкомплект использован`,`Аптечка использована`,`Огнетушитель использован`][e.index],1500)}))}setScoreboard(e){e!==this.scoreboardVisible&&(this.scoreboardVisible=e,this.els.scoreboard.classList.toggle(`hidden`,!e),e&&this.renderScoreboard())}renderScoreboard(){let e=this.player,t=t=>`<table><tr><th>Игрок</th><th>Танк</th><th>Урон</th><th>Фраги</th><th>HP</th></tr>${this.world.tanks.filter(e=>e.team===t).sort((e,t)=>t.battle.damageDealt-e.battle.damageDealt).map(n=>`<tr style="opacity:${n.alive?1:.45}"><td>${n===e?`<b>`+n.callsign+`</b>`:n.callsign}</td><td>${vm[n.data.cls]} ${pl[n.data.tier]} ${n.data.name}</td><td>${t===e.team||!n.alive?n.battle.damageDealt:`?`}</td><td>${t===e.team||!n.alive?n.battle.kills:`?`}</td><td>${n.alive?t===e.team||this.world.detection.isVisibleTo(e,n)?n.hp:`?`:`—`}</td></tr>`).join(``)}</table>`;this.els.scoreboard.innerHTML=`<div><h3 style="color:#7be366;margin:0 0 6px">Союзники</h3>${t(e.team)}</div><div><h3 style="color:#ff5a4d;margin:0 0 6px">Противники</h3>${t(1-e.team)}</div>`}setCenter(e,t=``){this.els[`center-msg`].innerHTML=e?`${e}${t?`<small>${t}</small>`:``}`:``}update(e,t,n,r){let i=this.world,a=this.player;this.fpsFrames++,this.fpsTime+=e,this.fpsTime>.5&&(this.els.fps.textContent=`${Math.round(this.fpsFrames/this.fpsTime)} FPS`,this.fpsFrames=0,this.fpsTime=0),this.els.fps.classList.toggle(`hidden`,!this.showFps);let o=this.cam.mode===`sniper`;this.els.scope.classList.toggle(`hidden`,!o),this.els[`zoom-label`].classList.toggle(`hidden`,!o),o&&(this.els[`zoom-label`].textContent=`×${[2,4,8,16][this.cam.sniperZoom]}`),this.updateGunMarker(t,n,r),this.updateMarkers(t,n,r),this.els[`spotted-lamp`].classList.toggle(`on`,a.alive&&i.detection.isSpotted(a)),this.els.speed.innerHTML=`${Math.round(Math.abs(a.speedLong)*3.6)}<small> км/ч</small>`;let s=(a.yaw-this.cam.yaw)*tl;this.root.querySelector(`.dw-hull`).setAttribute(`transform`,`rotate(${-s})`),this.root.querySelector(`.dw-turret`).setAttribute(`transform`,`rotate(${-(s+a.turretYaw*tl)})`);let c=this.els[`ammo-bar`].children,l=a.stats.reload>0?1-a.reloadTimer/(a.gun.magazine&&a.magazineLeft!==a.gun.magazine.size?a.gun.magazine.interShot:a.stats.reload):1;a.ammoTypes.forEach((e,t)=>{let n=c[t];n.classList.toggle(`sel`,t===a.selectedAmmo),n.querySelector(`.n`).textContent=String(a.ammoCounts[t]),n.querySelector(`.reload`).style.width=t===a.selectedAmmo?`${Math.max(0,Math.min(1,l))*100}%`:`0`});for(let e=0;e<3;e++)c[a.ammoTypes.length+e].classList.toggle(`used`,a.consumableUsed[e]);let u=this.root.querySelector(`.hp-big > div`);if(u.style.width=`${a.hp/a.maxHp*100}%`,this.root.querySelector(`.hp-big span`).textContent=`${a.hp} / ${a.maxHp}`,this.slowTimer-=e,this.slowTimer>0)return;this.slowTimer=.12;for(let e of gm){let t=a.modules[e],n=this.root.querySelector(`.mod-${e}`);n.classList.toggle(`damaged`,t.status===`damaged`),n.classList.toggle(`destroyed`,t.status===`destroyed`)}for(let e of a.crew)this.root.querySelector(`.c-${e.role}`)?.classList.toggle(`wounded`,e.wounded);let d=[0,0];for(let e of i.tanks)e.alive&&d[e.team]++;let f=i.tanks.filter(e=>e.team!==a.team&&!e.alive).length,p=i.tanks.filter(e=>e.team===a.team&&!e.alive).length,m=this.els.score.children;m[0].textContent=String(f),m[2].textContent=String(p);let h=i.frozen?i.mode.data.timeLimit:i.mode.timeLeft;m[1].textContent=`${Math.floor(h/60)}:${String(Math.floor(h%60)).padStart(2,`0`)}`;let g=i.mode.bases.filter(e=>e.points[0]>.5||e.points[1]>.5).map(e=>{let t=e.points[0]>=e.points[1]?0:1,n=t===a.team;return`<div class="cap-label">${n?`Захват базы противника`:`Захват нашей базы!`} ${Math.floor(e.points[t])}%${e.contested?` (заблокирован)`:``}</div><div class="cap-bar"><div style="width:${e.points[t]}%;background:${n?`#7be366`:`#ff5a4d`}"></div></div>`}).join(``);this.els.capture.innerHTML!==g&&(this.els.capture.innerHTML=g);for(let e of i.tanks){let t=this.teamRows.get(e.id);if(!t)continue;t.classList.toggle(`dead`,!e.alive);let n=e.team===a.team||i.detection.isVisibleTo(a,e),r=t.querySelector(`.hpb > div`);r.style.width=`${n||!e.alive?e.hp/e.maxHp*100:0}%`,r.style.background=e.team===a.team?`#7be366`:`#ff5a4d`}this.minimap.draw(i,a,this.cam.yaw),this.scoreboardVisible&&this.renderScoreboard()}updateGunMarker(e,t,n){let r=this.player,i=this.world,a=this.els[`gun-marker`];if(!r.alive){a.style.display=`none`;return}a.style.display=`block`;let o=r.muzzlePosition(ym),s=r.gunDirection(bm),c=r.ammo,l=null,u=new G,d=new G,f=!1,p=0,m=Sm;qf(o,s,c,c.gravityScale>3?25:4,c.gravityScale>3?1/15:1/30,(e,t)=>{m.subVectors(t,e);let n=m.length();m.divideScalar(n);let a=n,o=i.terrain.raycast(e,m,n);o>=0&&(a=o);let s=i.statics.raycast(e,m,a,e=>e.blocksShell);s&&(a=s.t);for(let t of i.tanks){if(t===r||t.team!==r.team&&t.alive&&!i.detection.isVisibleTo(r,t)||t.position.distanceToSquared(e)>(n+15)**2)continue;let o=Wu(t,e,m,a);o>=0&&o<a&&(a=o,l=t,u=m.clone(),d=e.clone())}return p+=a,a<n||l?(xm.copy(e).addScaledVector(m,a),f=!0,!0):!1}),f||xm.copy(o).addScaledVector(s,600);let h=xm.clone().project(e);if(h.z>1){a.style.display=`none`;return}let g=(h.x+1)/2*t,_=(1-h.y)/2*n,v=Math.max(5,xm.distanceTo(e.position)),y=r.dispersion*Math.max(5,p||xm.distanceTo(o)),b=n/(2*Math.tan(e.fov*Math.PI/360)*v),x=Math.max(10,Math.min(n*.45,y*b));a.style.left=`${g}px`,a.style.top=`${_}px`,a.style.width=a.style.height=`${x*2}px`;let S=``,C=l;if(C&&C.team!==r.team&&C.alive){let e=c.velocity*Math.exp(-c.dragK*p),t=Ju(C,d,u,30,c,e);if(t.hit){if(t.ricochet)S=`pen-grey`;else if(c.kind===`HE`)S=t.penetration>=t.effective?`pen-green`:`pen-yellow`;else{let e=t.penetration/Math.max(1,t.effective);S=e>1.12?`pen-green`:e>.9?`pen-yellow`:`pen-red`}}}a.className=`gun-marker ${S}`;let w=a.querySelector(`.rl`);w.textContent=r.reloadTimer>0?`${r.reloadTimer.toFixed(1)} с`:r.gun.magazine?`${r.magazineLeft}/${r.gun.magazine.size}`:``;let T=this.els[`aim-info`],E=this.cam.aimTank;if(T.textContent=E&&E.team!==r.team?`${E.data.name} · ${Math.round(this.cam.aimDistance)} м`:`${Math.round(this.cam.aimDistance)} м`,this.cam.mode===`arty`){let e=this.artyReach??=Kf(c),t=Math.hypot(this.cam.aimPoint.x-r.position.x,this.cam.aimPoint.z-r.position.z);T.textContent+=t>e?` · ВНЕ ДОСЯГАЕМОСТИ`:` · полёт ≈${(t/Math.max(1,c.velocity*.75)).toFixed(1)} с`}}updateMarkers(e,t,n){let r=this.world,i=this.player,a=new Set;for(let o of r.tanks){if(o===i||!o.alive)continue;let s=o.team===i.team;if(!s&&!r.detection.isVisibleTo(i,o))continue;ym.set(o.position.x,o.position.y+o.layout.turretTop+1.8,o.position.z);let c=ym.distanceTo(e.position);if(c>800)continue;let l=ym.project(e);if(l.z>1||l.x<-1.1||l.x>1.1||l.y<-1.1||l.y>1.1)continue;a.add(o.id);let u=this.markers.get(o.id);u||(u=cm(`div`,`marker ${s?`ally`:`enemy`}`),u.innerHTML=`<div class="nm">${o.data.name}</div><div class="bar"><div></div></div><div class="tri"></div>`,this.markerLayer.appendChild(u),this.markers.set(o.id,u)),u.style.display=`block`,u.style.left=`${(l.x+1)/2*t}px`,u.style.top=`${(1-l.y)/2*n}px`,u.style.opacity=c>400?`0.7`:`1`;let d=u.firstElementChild.nextElementSibling.firstElementChild;d.style.width=`${o.hp/o.maxHp*100}%`,d.style.background=s?`#7be366`:`#ff5a4d`,u.firstElementChild.style.display=c<250?`block`:`none`}for(let[e,t]of this.markers)a.has(e)||(t.style.display=`none`)}dispose(){for(let e of this.unsubs)e();this.root.remove()}static formatCredits(e){return fl(e)}},wm={destroyed:`Все машины противника уничтожены`,capture:`База захвачена`,timeout:`Время боя истекло`,surrender:`Бой покинут`};function Tm(e,t,n,r,i,a){let o=cm(`div`,`modal-wrap`),s=i.outcome===`win`?`ПОБЕДА`:i.outcome===`loss`?`ПОРАЖЕНИЕ`:`НИЧЬЯ`,c=r.reason===`destroyed`&&r.winner!==n.team&&r.winner!==-1?`Все союзные машины уничтожены`:r.reason===`capture`&&r.winner!==n.team?`Противник захватил базу`:wm[r.reason],l=n.battle,u=e=>t.tanks.filter(t=>t.team===e).sort((e,t)=>t.battle.damageDealt-e.battle.damageDealt).map(e=>`<tr style="opacity:${e.alive?1:.55}${e===n?`;color:#f0c860`:``}"><td>${e.callsign}</td><td>${e.data.name} ${pl[e.data.tier]}</td><td>${e.battle.damageDealt}</td><td>${e.battle.kills}</td></tr>`).join(``);o.innerHTML=`
    <div class="modal panel">
      <div class="outcome ${i.outcome}">${s}</div>
      <div class="muted" style="margin-bottom:14px">${c} · ${t.map.data.name} · ${t.mode.data.name}</div>
      <div class="results-grid">
        <div>
          <h3>Личные результаты — ${n.data.name}</h3>
          <table class="reward-table">
            <tr><td>Нанесено урона</td><td>${l.damageDealt}</td></tr>
            <tr><td>Урон по вашей разведке</td><td>${l.assistDamage}</td></tr>
            <tr><td>Заблокировано бронёй</td><td>${l.damageBlocked}</td></tr>
            <tr><td>Уничтожено</td><td>${l.kills}</td></tr>
            <tr><td>Обнаружено</td><td>${l.spotted}</td></tr>
            <tr><td>Выстрелов / попаданий / пробитий</td><td>${l.shots} / ${l.hits} / ${l.penetrations}</td></tr>
            <tr><td>Очки захвата / защиты</td><td>${Math.round(l.capturePoints)} / ${Math.round(l.defensePoints)}</td></tr>
            <tr><td>Получено урона</td><td>${l.damageReceived}</td></tr>
          </table>
          <h3>Награда</h3>
          <table class="reward-table">
            <tr><td></td><td class="xp">Опыт</td><td class="cr">Кредиты</td></tr>
            ${i.lines.map(e=>`<tr><td>${e.label}</td><td>${e.xp?`+`+fl(e.xp):``}</td><td>${e.credits?`+`+fl(e.credits):``}</td></tr>`).join(``)}
            <tr><td>Ремонт</td><td></td><td style="color:#ff8b80">−${fl(i.repairCost)}</td></tr>
            <tr><td>Пополнение боекомплекта</td><td></td><td style="color:#ff8b80">−${fl(i.ammoCost)}</td></tr>
            <tr><td><b>Итого</b></td><td class="xp"><b>${fl(i.xp)}</b></td><td class="cr"><b>${i.creditsNet>=0?`+`:``}${fl(i.creditsNet)}</b></td></tr>
            <tr><td>Свободный опыт / опыт экипажа</td><td class="xp" colspan="2">+${fl(i.freeXp)} / +${fl(i.crewXp)}</td></tr>
          </table>
        </div>
        <div>
          <h3 style="color:#7be366">Ваша команда</h3>
          <table class="reward-table"><tr class="muted"><td>Игрок</td><td>Танк</td><td>Урон</td><td>Фраги</td></tr>${u(n.team)}</table>
          <h3 style="color:#ff5a4d">Противник</h3>
          <table class="reward-table"><tr class="muted"><td>Игрок</td><td>Танк</td><td>Урон</td><td>Фраги</td></tr>${u(1-n.team)}</table>
        </div>
      </div>
      <div class="footer"><button class="btn primary" data-close>В ангар</button></div>
    </div>`,e.appendChild(o),o.querySelector(`[data-close]`).addEventListener(`click`,()=>{o.remove(),a()})}var Em={forward:`Вперёд`,back:`Назад`,left:`Влево`,right:`Вправо`,brake:`Тормоз`,fire:`Выстрел`,sniper:`Снайперский режим`,lockTurret:`Свободный обзор (стоп башни)`,zoomIn:`Приблизить`,zoomOut:`Отдалить`,ammo1:`Снаряд 1`,ammo2:`Снаряд 2`,ammo3:`Снаряд 3`,repair:`Ремкомплект`,medkit:`Аптечка`,extinguisher:`Огнетушитель`,radioHelp:`Радио: помогите`,radioAttack:`Радио: в атаку`,radioRetreat:`Радио: отходим`,radioTarget:`Радио: атакую цель`,scoreboard:`Таблица команд`,pause:`Меню`},Dm=class{input;cb;root;s;waiting=null;constructor(e,t,n,r){this.input=n,this.cb=r,this.s=structuredClone(t),this.root=cm(`div`,`modal-wrap`),e.appendChild(this.root),this.render()}render(){let e=this.s,t=(t,n)=>`<select data-key="${t}">${n.map(([n,r])=>`<option value="${n}" ${String(e[t])===n?`selected`:``}>${r}</option>`).join(``)}</select>`,n=(t,n,r,i)=>`<input type="range" data-key="${t}" min="${n}" max="${r}" step="${i}" value="${e[t]}">`,r=t=>`<input type="checkbox" data-key="${t}" ${e[t]?`checked`:``}>`,i=(e,t)=>`<div class="setting"><span>${e}</span>${t}</div>`,a=Object.keys(Em).map(t=>i(Em[t],`<button class="btn small bind-btn" data-bind="${t}">${this.waiting===t?`…нажмите клавишу`:(e.bindings[t]??[]).map(Au).join(` / `)||`—`}</button>`)).join(``);this.root.innerHTML=`
      <div class="modal panel">
        <h2>Настройки</h2>
        <div class="settings-grid">
          <div>
            <div class="section-title">Графика</div>
            ${i(`Качество`,t(`graphics`,[[`low`,`Низкое`],[`medium`,`Среднее`],[`high`,`Высокое`],[`ultra`,`Ультра`]]))}
            ${i(`Масштаб рендера`,n(`renderScale`,.5,1.25,.05))}
            ${i(`Тени`,r(`shadows`))}
            ${i(`Поле зрения (FOV)`,n(`fov`,55,95,1))}
            ${i(`Показывать FPS`,r(`showFps`))}
            <div class="section-title">Звук</div>
            ${i(`Общая громкость`,n(`masterVolume`,0,1,.05))}
            ${i(`Эффекты`,n(`sfxVolume`,0,1,.05))}
            ${i(`Двигатель`,n(`engineVolume`,0,1,.05))}
            ${i(`Окружение`,n(`ambientVolume`,0,1,.05))}
            ${i(`Голосовые радиофразы`,r(`voice`))}
            <div class="section-title">Бой</div>
            ${i(`Размер команд`,t(`teamSize`,[[`5`,`5 × 5`],[`7`,`7 × 7`],[`10`,`10 × 10`],[`15`,`15 × 15`]]))}
            ${i(`Сложность ботов`,t(`difficulty`,Object.values(tp).map(e=>[e.id,e.name])))}
            ${i(`Сенсорное управление`,t(`touchControls`,[[`auto`,`Авто`],[`on`,`Вкл`],[`off`,`Выкл`]]))}
            <div class="section-title">Мышь и геймпад</div>
            ${i(`Чувствительность мыши`,n(`mouseSensitivity`,.2,3,.05))}
            ${i(`Чувствительность в прицеле`,n(`sniperSensitivity`,.1,2,.05))}
            ${i(`Чувствительность геймпада`,n(`gamepadSensitivity`,.2,3,.05))}
            ${i(`Инверсия оси Y`,r(`invertY`))}
            <div class="section-title">Сохранение</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <button class="btn small" data-export>Экспорт</button>
              <button class="btn small" data-import>Импорт</button>
              <button class="btn small danger" data-reset>Сбросить прогресс</button>
            </div>
            <textarea class="save-text" style="width:100%;height:60px;margin-top:6px;background:#111;color:#ccc;border:1px solid #333" placeholder="Строка сохранения"></textarea>
          </div>
          <div>
            <div class="section-title">Клавиши <button class="btn small" data-defaults>По умолчанию</button></div>
            ${a}
            <div class="muted" style="font-size:12px;margin-top:6px">Геймпад: левый стик — движение, правый — обзор, RT — огонь, LT — прицел, крестовина — снаряды/огнетушитель.</div>
          </div>
        </div>
        <div style="text-align:right;margin-top:14px;display:flex;gap:8px;justify-content:flex-end">
          <button class="btn" data-cancel>Отмена</button>
          <button class="btn primary" data-apply>Применить</button>
        </div>
      </div>`;let o=e=>[...this.root.querySelectorAll(e)];o(`[data-key]`).forEach(e=>e.addEventListener(`change`,()=>{let t=e.dataset.key,n=this.s[t],r;r=e instanceof HTMLInputElement&&e.type===`checkbox`?e.checked:typeof n==`number`?Number(e.value):e.value,this.s[t]=r})),o(`[data-bind]`).forEach(e=>e.addEventListener(`click`,()=>{let t=e.dataset.bind;this.waiting=t,this.render(),this.input.onRawKey=e=>{if(this.input.onRawKey=null,this.waiting=null,e!==`Escape`){for(let t of Object.keys(this.s.bindings))this.s.bindings[t]=this.s.bindings[t].filter(t=>t!==e);this.s.bindings[t]=[e,...(this.s.bindings[t]??[]).slice(0,1)]}this.render()}})),o(`[data-defaults]`).forEach(e=>e.addEventListener(`click`,()=>{this.s.bindings=structuredClone(_u),this.render()}));let s=this.root.querySelector(`.save-text`);o(`[data-export]`).forEach(e=>e.addEventListener(`click`,()=>{s.value=this.cb.onExport(),s.select(),um(`Сохранение экспортировано — скопируйте строку`)})),o(`[data-import]`).forEach(e=>e.addEventListener(`click`,()=>{this.cb.onImport(s.value)?um(`Сохранение загружено`):um(`Строка сохранения повреждена`,!0)})),o(`[data-reset]`).forEach(e=>e.addEventListener(`click`,()=>{confirm(`Сбросить весь прогресс?`)&&this.cb.onReset()})),o(`[data-cancel]`).forEach(e=>e.addEventListener(`click`,()=>this.close())),o(`[data-apply]`).forEach(e=>e.addEventListener(`click`,()=>{this.cb.onApply(this.s),this.close()}))}close(){this.input.onRawKey=null,this.root.remove(),this.cb.onClose()}},Om=196,km=118,Am=170,jm=92,Mm=class{prog;nation;cb;root;constructor(e,t,n,r){this.prog=t,this.nation=n,this.cb=r,this.root=cm(`div`,`overlay`),e.appendChild(this.root),this.render()}render(){let e=this.prog,t=Wl.tanksOfNation(this.nation),n=[...Wl.nations.values()],r=Math.max(...t.map(e=>e.treeRow))+1,i=1960,a=r*km,o=e=>{let t=Wl.getTank(e);return{x:(t.tier-1)*Om,y:t.treeRow*km}},s=``;for(let n of t)for(let t of n.parents){let r=o(t),i=o(n.id),a=r.x+Am,c=r.y+jm/2,l=i.x,u=i.y+jm/2,d=e.isResearched(n.id);s+=`<path d="M${a} ${c} C ${a+16} ${c}, ${l-16} ${u}, ${l} ${u}" stroke="${d?`#8fa3b0`:`#4a555d`}" stroke-width="2" fill="none"/>`}let c=t.map(t=>{let n=e.tankState(t.id),r=o(t.id),i=e.availableXpFor(t.id),a=``;a=n===`researchable`?`<button class="btn small" data-research="${t.id}" ${i.total>=t.researchXp?``:`disabled`}>Исследовать <span class="xp">★${fl(t.researchXp)}</span></button>`:n===`researched`?`<button class="btn small" data-buy="${t.id}" ${e.data.credits>=t.price?``:`disabled`}>Купить <span class="cr">${fl(t.price)}</span></button>`:n===`owned`?`<button class="btn small" data-select="${t.id}">В ангар</button>`:`<span class="muted">🔒 ★${fl(t.researchXp)}</span>`;let s=e.isResearched(t.id)?`<span class="xp">★ ${fl(e.progress(t.id).xp)}</span>`:``;return`<div class="tree-node ${n}" style="left:${r.x}px;top:${r.y+30}px" title="${Cl[t.cls].role}">
          <div><div class="tn-name">${dm[t.cls]}${t.name}</div><div class="muted">${Cl[t.cls].name}${t.premium?` · премиум`:``} ${s}</div></div>
          <div class="tn-actions">${a}</div>
        </div>`}).join(``);this.root.innerHTML=`
      <div class="overlay-head">
        <h2>Исследования</h2>
        <div class="nation-tabs">${n.map(e=>`<button data-nation="${e.id}" class="${e.id===this.nation?`active`:``}">${e.name}</button>`).join(``)}</div>
        <span style="margin-left:auto" class="cr">⛁ ${fl(e.data.credits)}</span>
        <span class="xp">★ ${fl(e.data.freeXp)} свободного</span>
        <button class="btn" data-close>Закрыть</button>
      </div>
      <div class="overlay-body">
        <div class="tree" style="width:${i}px;height:${a+40}px">
          <div class="tree-tiers">${pl.slice(1).map(e=>`<div>${e}</div>`).join(``)}</div>
          <svg width="${i}" height="${a+40}" style="top:30px">${s}</svg>
          ${c}
        </div>
      </div>`;let l=e=>[...this.root.querySelectorAll(e)];l(`[data-nation]`).forEach(e=>e.addEventListener(`click`,()=>{this.nation=e.dataset.nation,this.cb.sound(`click`),this.render()})),l(`[data-close]`).forEach(e=>e.addEventListener(`click`,()=>this.cb.onClose())),l(`[data-research]`).forEach(e=>e.addEventListener(`click`,()=>this.act(this.prog.research(e.dataset.research)))),l(`[data-buy]`).forEach(e=>e.addEventListener(`click`,()=>{let t=this.prog.buy(e.dataset.buy);t.ok&&(this.prog.data.selectedTank=e.dataset.buy),this.act(t)})),l(`[data-select]`).forEach(e=>e.addEventListener(`click`,()=>{this.cb.onSelect(e.dataset.select),this.cb.onClose()}))}act(e){um(e.message,!e.ok),this.cb.sound(e.ok?`buy`:`error`),e.ok&&this.cb.onChanged(),this.render()}dispose(){this.root.remove()}},Nm={help:`Нужна помощь в квадрате {sq}!`,attack:`В атаку! За мной!`,retreat:`Отходим! Перегруппировка!`,target:`Атакую цель в квадрате {sq}!`},Pm=class{tank;world;input;camera;settings;radioCooldown=0;allowMouseFire=!0;constructor(e,t,n,r,i){this.tank=e,this.world=t,this.input=n,this.camera=r,this.settings=i}setSettings(e){this.settings=e}frame(e){let t=this.input,n=this.camera,r=t.consumeLook(),i=n.mode===`sniper`?this.settings.sniperSensitivity*2:this.settings.mouseSensitivity,a=this.settings.gamepadSensitivity*900*e;n.look(r.dx*i+t.axes.lookX*a,r.dy*i+t.axes.lookY*a*.7,this.settings.invertY);let o=t.consumeWheel();t.pressed(`zoomIn`)&&!t.bindings.zoomIn.includes(`WheelUp`)&&(o+=1),t.pressed(`zoomOut`)&&!t.bindings.zoomOut.includes(`WheelDown`)&&--o,n.zoom(o,this.tank),t.pressed(`sniper`)&&n.toggleSniper(this.tank),n.setFreeLook(t.isDown(`lockTurret`)&&(t.pointerLocked||!t.bindings.lockTurret.includes(`Mouse2`)));let s=this.tank.input;t.pressed(`ammo1`)&&(s.ammoSlot=0),t.pressed(`ammo2`)&&(s.ammoSlot=1),t.pressed(`ammo3`)&&(s.ammoSlot=2),t.pressed(`repair`)&&(s.consumable=0),t.pressed(`medkit`)&&(s.consumable=1),t.pressed(`extinguisher`)&&(s.consumable=2),this.radioCooldown-=e;for(let[e,r]of[[`radioHelp`,`help`],[`radioAttack`,`attack`],[`radioRetreat`,`retreat`],[`radioTarget`,`target`]])if(t.pressed(e)&&this.radioCooldown<=0){this.radioCooldown=3;let e=Yf(this.world,r===`target`?n.aimPoint:this.tank.position),t=`${this.tank.callsign}: ${Nm[r].replace(`{sq}`,e)}`;this.world.events.emit(`radio`,{team:this.tank.team,from:this.tank,text:t,kind:r})}}update(){let e=this.input,t=this.tank.input,n=+!!e.isDown(`forward`)-!!e.isDown(`back`),r=+!!e.isDown(`right`)-!!e.isDown(`left`);Math.abs(e.axes.moveY)>.05&&(n=e.axes.moveY),Math.abs(e.axes.moveX)>.05&&(r=e.axes.moveX),t.throttle=Z(n,-1,1),t.steer=Z(r,-1,1),t.brake=e.isDown(`brake`),t.fire=e.isDown(`fire`)&&(this.allowMouseFire||!e.isRawDown(`Mouse0`)),t.lockTurret=this.camera.isFreeLook,t.aimPoint=this.camera.aimPoint.clone()}},Fm=[`Ставьте корпус под углом 25–35° к противнику — приведённая броня растёт, а снаряды чаще рикошетят.`,`Кусты маскируют, но после выстрела маскировка резко падает на несколько секунд.`,`Бейте в нижнюю бронедеталь и командирскую башенку — это слабые зоны большинства машин.`,`Кумулятивные снаряды теряют пробитие после экранов и гусениц.`,`Фугасы не рикошетят и наносят урон даже без пробития тонкой брони.`,`Повреждённый двигатель снижает мощность, сбитая гусеница обездвиживает танк — используйте ремкомплект (4).`,`Лёгкие танки сохраняют маскировку в движении — идеальные разведчики.`,`Тяжёлые танки могут таранить и сносить деревянные дома, заборы и деревья.`,`Shift — снайперский режим. У САУ Shift включает навесной (артиллерийский) прицел.`,`Индикатор прицела зелёный — пробитие вероятно, красный — броня скорее выдержит.`],Im=class{canvas;ui;renderer;audio=new ml;input;saves=new xu(new bu);prog;state=`garage`;garageScene;garageUI=null;overlay=null;battle=null;battleScene=null;hud=null;playerCtl=null;touch=null;accumulator=0;lastTime=0;saveTimer=0;paused=!1;pauseMenu=null;battleUnsubs=[];endTimer=-1;fastForward=!1;dragging=!1;lastLockError=-1e9;lastMouse={x:0,y:0};constructor(e,t){this.canvas=e,this.ui=t;let n=this.saves.load(Eu.newProfile);this.prog=new Eu(n.data),n.source===`backup`&&setTimeout(()=>um(`Основное сохранение повреждено — восстановлено из резервной копии`,!0),500);let r=this.settings;this.renderer=new zf(e,r.graphics),this.renderer.apply(r.graphics,r.renderScale,r.shadows),this.input=new ku(e,r.bindings),this.audio.setVolumes(r.masterVolume,r.sfxVolume,r.engineVolume,r.ambientVolume,r.voice),this.garageScene=new Cf(this.renderer.renderer),window.addEventListener(`resize`,()=>this.renderer.resize());let i=()=>this.audio.unlock();window.addEventListener(`pointerdown`,i),window.addEventListener(`keydown`,i),document.addEventListener(`pointerlockerror`,()=>{this.lastLockError=performance.now(),this.playerCtl&&(this.playerCtl.allowMouseFire=!0)}),document.addEventListener(`pointerlockchange`,()=>{this.state===`battle`&&!this.input.pointerLocked&&!this.paused&&!this.isTouchMode&&this.endTimer<0&&this.battle?.player?.alive&&this.openPauseMenu()}),e.addEventListener(`mousedown`,e=>{this.state===`battle`&&!this.paused&&!this.isTouchMode?this.input.pointerLocked||(this.playerCtl&&performance.now()-this.lastLockError>4e3&&(this.playerCtl.allowMouseFire=!1),this.input.requestPointerLock()):this.state===`garage`&&(this.dragging=!0,this.lastMouse={x:e.clientX,y:e.clientY})}),window.addEventListener(`mouseup`,()=>{this.dragging=!1,this.playerCtl&&(this.playerCtl.allowMouseFire=!0)}),window.addEventListener(`mousemove`,e=>{this.state===`garage`&&this.dragging&&(this.garageScene.drag(e.clientX-this.lastMouse.x,e.clientY-this.lastMouse.y),this.lastMouse={x:e.clientX,y:e.clientY})}),e.addEventListener(`wheel`,e=>{this.state===`garage`&&this.garageScene.wheel(e.deltaY)},{passive:!0}),e.addEventListener(`touchmove`,e=>{if(this.state!==`garage`||e.touches.length!==1)return;let t=e.touches[0];this.garageScene.drag(t.clientX-this.lastMouse.x,t.clientY-this.lastMouse.y),this.lastMouse={x:t.clientX,y:t.clientY}},{passive:!0}),e.addEventListener(`touchstart`,e=>{let t=e.touches[0];this.lastMouse={x:t.clientX,y:t.clientY}},{passive:!0}),window.addEventListener(`beforeunload`,()=>this.save()),document.addEventListener(`visibilitychange`,()=>{document.hidden&&this.save()})}get settings(){return this.prog.data.settings}get isTouchMode(){let e=this.settings.touchControls;return e===`on`||e===`auto`&&(`ontouchstart`in window||navigator.maxTouchPoints>0)&&!matchMedia(`(pointer: fine)`).matches}start(){this.enterGarage(),this.lastTime=performance.now();let e=t=>{let n=Math.min(.1,(t-this.lastTime)/1e3);this.lastTime=t,this.frame(n),requestAnimationFrame(e)};requestAnimationFrame(e)}save(){this.saves.save(this.prog.data)}markDirty(){this.saveTimer=1.5}enterGarage(){this.state=`garage`,this.input.exitPointerLock(),this.garageUI?.dispose(),this.garageUI=new pm(this.ui,this.prog,{onSelectTank:e=>{this.prog.isOwned(e)&&(this.prog.data.selectedTank=e,this.garageScene.showTank(e,this.prog.loadoutFor(e)),this.markDirty())},onBattle:(e,t)=>this.startBattle(e,t),onOpenTree:e=>this.openTree(e),onOpenSettings:()=>this.openSettings(),onChanged:()=>{this.markDirty(),this.garageScene.showTank(this.prog.data.selectedTank,this.prog.loadoutFor(this.prog.data.selectedTank))},sound:e=>this.audio.ui(e)}),this.garageScene.showTank(this.prog.data.selectedTank,this.prog.loadoutFor(this.prog.data.selectedTank))}openTree(e){this.overlay?.dispose();let t=new Mm(this.ui,this.prog,e,{onClose:()=>{t.dispose(),this.overlay=null,this.garageUI?.render(),this.garageScene.showTank(this.prog.data.selectedTank,this.prog.loadoutFor(this.prog.data.selectedTank))},onChanged:()=>this.markDirty(),onSelect:e=>{this.prog.data.selectedTank=e,this.markDirty()},sound:e=>this.audio.ui(e)});this.overlay=t}openSettings(e){new Dm(this.ui,this.settings,this.input,{onApply:e=>this.applySettings(e),onClose:()=>e?.(),onExport:()=>this.saves.exportString(this.prog.data),onImport:e=>{let t=this.saves.importString(e);return t?(this.replaceProfile(t),!0):!1},onReset:()=>{this.saves.reset(),this.replaceProfile(Eu.newProfile())}})}replaceProfile(e){this.saves.save(e),this.prog.data=this.saves.load(Eu.newProfile).data,this.applySettings(this.prog.data.settings),this.state===`garage`&&this.enterGarage()}applySettings(e){this.prog.data.settings=e,this.renderer.apply(e.graphics,e.renderScale,e.shadows),this.input.bindings=e.bindings,this.audio.setVolumes(e.masterVolume,e.sfxVolume,e.engineVolume,e.ambientVolume,e.voice),this.playerCtl?.setSettings(e),this.hud&&(this.hud.showFps=e.showFps),this.battleScene&&(this.battleScene.camera.fov=e.fov,this.battleScene.cameraCtl.baseFov=e.fov),this.save()}async startBattle(e,t){if(this.state!==`garage`)return;let n=this.prog.data.selectedTank;if(Object.values(this.prog.progress(n).ammo).reduce((e,t)=>e+t,0)<=0){um(`Загрузите боекомплект перед боем`,!0);return}this.prog.data.lastMode=e,this.prog.data.lastMap=t,this.save(),this.state=`loading`,this.garageUI?.dispose(),this.garageUI=null,this.overlay?.dispose(),this.overlay=null;let r=(Date.now()&2147483647)>>>0,i=new hl(r),a=t===`random`?i.pick(Hl):Wl.getMap(t),o=Wl.getMode(e),s=cm(`div`,`loading`);s.innerHTML=`<h1>${a.name}</h1><div class="muted">${o.name} · ${a.description}</div><div class="bar"><div></div></div><div class="stage muted"></div><div class="tip">${i.pick(Fm)}</div>`,this.ui.appendChild(s);let c=s.querySelector(`.bar > div`),l=s.querySelector(`.stage`),u=()=>new Promise(e=>requestAnimationFrame(()=>setTimeout(e,0))),d=new Ad(a),f=0;for(let e of d.steps())l.textContent=e,c.style.width=`${++f/9*100}%`,await u();let p=d.result();l.textContent=`Подготовка экипажей`;let m=sm({mapId:a.id,modeId:e,teamSize:this.settings.teamSize,difficulty:this.settings.difficulty,seed:r,player:{tankId:n,loadout:this.prog.loadoutFor(n),callsign:`Вы`}},p);c.style.width=`70%`,await u(),l.textContent=`Построение сцены`,await u();let h=new vf(this.renderer.renderer,m.world,m.player,this.renderer.quality,this.settings.fov);h.setAspect(this.renderer.aspect),c.style.width=`90%`,await u(),h.update(.016,1,this.renderer.height),this.renderer.renderer.compile(h.scene,h.camera),c.style.width=`100%`,await u(),s.remove(),this.battle=m,this.battleScene=h;let g=m.player;if(this.playerCtl=new Pm(g,m.world,this.input,h.cameraCtl,this.settings),m.world.controllers.unshift(this.playerCtl),this.hud=new Cm(this.ui,m.world,g,h.cameraCtl),this.hud.showFps=this.settings.showFps,this.isTouchMode){this.touch=new ju(this.ui,this.input);let e=[...this.hud.root.querySelectorAll(`.ammo-slot, .cons-slot`)];this.touch.bindSlots(e,[`ammo1`,`ammo2`,`ammo3`,`repair`,`medkit`,`extinguisher`])}this.bindBattleAudio(),this.audio.setAmbience(a.biome.ambience),this.accumulator=0,this.endTimer=-1,this.paused=!1,this.fastForward=!1,this.state=`battle`,this.isTouchMode||this.hud.notice(`Кликните по экрану, чтобы управлять мышью · Esc — меню`,6e3)}bindBattleAudio(){let e=this.battle.world,t=this.battle.player,n=()=>this.battleScene.camera.position,r=e=>e.distanceTo(n());this.battleUnsubs.push(e.events.on(`shot`,e=>this.audio.shot(e.pos,e.ammo.caliber,r(e.pos),e.tank===t)),e.events.on(`hit`,e=>{e.result.kind!==`miss`&&(this.audio.hit(e.result.point,e.result.kind,r(e.result.point),e.target===t||e.attacker===t),e.attacker===t&&e.result.kind===`penetration`&&this.audio.ui(`click`))}),e.events.on(`impact`,e=>{e.ammo.kind===`HE`||e.ammo.gravityScale>3?this.audio.explosion(e.pos,e.ammo.explosionRadius,r(e.pos)):this.audio.hit(e.pos,`ground`,r(e.pos),!1)}),e.events.on(`tankDestroyed`,e=>{this.audio.explosion(e.tank.position,e.ammoRack?3:1.5,r(e.tank.position))}),e.events.on(`moduleChanged`,e=>{e.tank===t&&!e.repaired&&this.audio.moduleDamage()}),e.events.on(`destructible`,e=>this.audio.destructible(e.pos,r(e.pos),e.collider.destructible?.kind??``)),e.events.on(`radio`,e=>{e.team===t.team&&this.audio.radio(e.text)}),e.events.on(`spotted`,e=>{e.byTeam===t.team&&e.first&&this.audio.ui(`spotted`)}),e.events.on(`battleEnd`,()=>{this.endTimer=this.fastForward?.01:3.5}))}battleFrame(e){let t=this.battle,n=t.world,r=this.battleScene,i=this.hud,a=t.player;if(this.fastForward){for(let e=0;e<900&&!n.mode.outcome;e++)n.step(tm);if(!n.mode.outcome)return}if(!this.paused){this.playerCtl.frame(e),this.input.pressed(`pause`)&&this.openPauseMenu(),i.setScoreboard(this.input.isDown(`scoreboard`)),this.accumulator+=e;let t=0;for(;this.accumulator>=.016666666666666666&&t<6;)n.step(tm),this.accumulator-=tm,t++;t===6&&(this.accumulator=0),a.reloadTimer===0&&this.lastReload>0&&this.audio.reload(),this.lastReload=a.reloadTimer}let o=this.accumulator/tm;r.update(e,o,this.renderer.height);let s=r.camera,c=this.canvas.clientWidth,l=this.canvas.clientHeight;i.update(e,s,c,l),n.frozen?i.setCenter(String(Math.ceil(n.countdown-n.time)),`${n.mode.data.name}: ${n.mode.data.description}`):n.battleTime<1.5?i.setCenter(`В БОЙ!`):n.mode.outcome||i.setCenter(``);let u=s.getWorldDirection(new G);this.audio.updateListener(s.position,u,s.up);let d=null,f=90;for(let e of n.tanks){if(e===a||!e.alive||Math.abs(e.speedLong)<.5)continue;let t=e.position.distanceTo(s.position);t<f&&(f=t,d=e)}if(this.audio.updateEngines(a,d,e),this.audio.updateAmbience(e),this.renderer.render(r.scene,s),n.mode.outcome){let t=n.mode.outcome,r=t.winner===-1?`НИЧЬЯ`:t.winner===a.team?`ПОБЕДА`:`ПОРАЖЕНИЕ`;i.setCenter(r,t.reason===`capture`?`База захвачена`:t.reason===`timeout`?`Время вышло`:`Все противники уничтожены`),this.endTimer>0&&(this.endTimer-=e,this.endTimer<=0&&this.finishBattle(t))}}lastReload=0;finishBattle(e){let t=this.battle,n=t.player,r=n.data.id,i=Gl(n,e,this.prog.restockCost(r,n.battle.shellsUsed));this.prog.applyBattleRewards(r,i,{damage:n.battle.damageDealt,kills:n.battle.kills,spotted:n.battle.spotted,shots:n.battle.shots,hits:n.battle.hits}),this.save(),this.input.exitPointerLock(),this.closePauseMenu(),Tm(this.ui,t.world,n,e,i,()=>{this.leaveBattle(),this.enterGarage()}),this.state=`loading`}leaveBattle(){for(let e of this.battleUnsubs)e();this.battleUnsubs=[],this.audio.stopBattle(),this.hud?.dispose(),this.hud=null,this.touch?.dispose(),this.touch=null,this.battleScene?.dispose(),this.battleScene=null;for(let e of this.battle?.brains??[])e.dispose();this.battle=null,this.playerCtl=null,this.closePauseMenu()}openPauseMenu(){if(this.pauseMenu||this.state!==`battle`)return;this.paused=!0,this.input.exitPointerLock();let e=cm(`div`,`modal-wrap`);e.innerHTML=`<div class="pause-menu panel"><h2 style="margin:0 0 8px">Пауза</h2>
      <button class="btn primary" data-resume>Продолжить бой</button>
      <button class="btn" data-settings>Настройки</button>
      <button class="btn danger" data-leave>Покинуть бой</button>
      <div class="muted" style="font-size:12px">WASD — движение, мышь — обзор, ЛКМ — огонь, Shift — прицел, 1-3 — снаряды, 4-6 — расходники, F2-F4/T — радио, Tab — счёт</div></div>`,this.ui.appendChild(e),this.pauseMenu=e,e.querySelector(`[data-resume]`).addEventListener(`click`,()=>this.resume()),e.querySelector(`[data-settings]`).addEventListener(`click`,()=>this.openSettings()),e.querySelector(`[data-leave]`).addEventListener(`click`,()=>{this.closePauseMenu();let e=this.battle.world;if(e.mode.outcome){this.finishBattle(e.mode.outcome);return}let t=this.battle.player;t.input.throttle=0,t.input.fire=!1,e.controllers.splice(e.controllers.indexOf(this.playerCtl),1),this.fastForward=!0,this.paused=!1,um(`Бой завершается без вас…`)})}resume(){this.closePauseMenu(),this.paused=!1,this.isTouchMode||this.input.requestPointerLock()}closePauseMenu(){this.pauseMenu?.remove(),this.pauseMenu=null}frame(e){this.input.poll(),this.saveTimer>0&&(this.saveTimer-=e,this.saveTimer<=0&&this.save()),this.state===`garage`?(this.garageScene.update(e,this.renderer.aspect),this.renderer.render(this.garageScene.scene,this.garageScene.camera)):this.state===`battle`&&this.battle?(this.battleScene.setAspect(this.renderer.aspect),this.battleFrame(e)):this.state===`loading`&&this.battleScene&&this.renderer.render(this.battleScene.scene,this.battleScene.camera),this.input.endFrame()}};function Lm(){let e=document.getElementById(`game-canvas`),t=document.getElementById(`ui-root`);if(!document.createElement(`canvas`).getContext(`webgl2`)){t.innerHTML=`<div class="loading"><h1>WebGL 2 недоступен</h1><div class="tip">Обновите браузер или включите аппаратное ускорение.</div></div>`;return}e.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),t.insertAdjacentHTML(`beforeend`,`<div class="loading"><h1>Графический контекст потерян</h1><div class="tip">Прогресс сохранён. Перезагрузите страницу.</div></div>`)});let n=new Im(e,t);n.start(),window.__app=n}Lm();