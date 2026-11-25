// Procedural lighting artwork; no photographic/HDR source claimed.
import {seededRandom} from './world-utils.js';
export const MOODS=Object.freeze({
 day:{sky:0xc7d8e2,ground:0x766553,hemi:1.02,sun:1.25,fill:.32,exposure:1.18,window:3.2,lamp:.65,env:.55,fog:0x637582},
 evening:{sky:0x829dbb,ground:0x5a4432,hemi:.59,sun:.64,fill:.22,exposure:1.30,window:1.75,lamp:1,env:.46,fog:0x273749},
 night:{sky:0x607895,ground:0x483628,hemi:.34,sun:.19,fill:.10,exposure:1.25,window:.48,lamp:1.16,env:.30,fog:0x141c28}
});
export function reflectionArtwork(c,w,h){
 const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#4d5a6b');g.addColorStop(.36,'#708499');g.addColorStop(.50,'#9a8d78');g.addColorStop(.69,'#544232');g.addColorStop(1,'#282621');c.fillStyle=g;c.fillRect(0,0,w,h);
 for(const [x,y,b,hg] of [[.13,.23,.12,.38],[.53,.24,.14,.36],[.83,.25,.09,.30]]){
  const xx=x*w,yy=y*h,bw=b*w,bh=hg*h;const halo=c.createRadialGradient(xx+bw/2,yy+bh/2,2,xx+bw/2,yy+bh/2,bw*1.4);halo.addColorStop(0,'#d6e8f3');halo.addColorStop(1,'#8cacc000');c.fillStyle=halo;c.fillRect(xx-bw,yy-bh,bw*3,bh*3);
  c.fillStyle='#e0edf0';c.fillRect(xx,yy,bw,bh);c.fillStyle='#62645d';c.fillRect(xx+bw*.47,yy,bw*.06,bh);c.fillRect(xx,yy+bh*.48,bw,bh*.05);
 }
 for(const x of [.31,.69]){const glow=c.createRadialGradient(x*w,.51*h,1,x*w,.51*h,.12*w);glow.addColorStop(0,'#fff2cd');glow.addColorStop(.18,'#eeb36c');glow.addColorStop(1,'#a6602400');c.fillStyle=glow;c.fillRect((x-.13)*w,.24*h,.26*w,.54*h);}
}
export function roughnessArtwork(c,w,h,base,variation,seed,grain=false){
 const r=seededRandom(seed);c.fillStyle='rgb('+base+','+base+','+base+')';c.fillRect(0,0,w,h);
 for(let i=0;i<2400;i++){const v=Math.max(0,Math.min(255,Math.round(base+(r()-.5)*variation*2)));c.fillStyle='rgba('+v+','+v+','+v+',.55)';c.fillRect(r()*w,r()*h,grain?12+r()*68:2+r()*9,1+r()*4);}
}
export function contactArtwork(c,w,h){const g=c.createRadialGradient(w/2,h/2,0,w/2,h/2,w*.49);g.addColorStop(0,'rgba(19,15,12,.52)');g.addColorStop(.43,'rgba(19,15,12,.38)');g.addColorStop(.75,'rgba(19,15,12,.13)');g.addColorStop(1,'rgba(19,15,12,0)');c.fillStyle=g;c.fillRect(0,0,w,h);}
export function moodFor(id){return MOODS[id]||MOODS.evening;}
