// Federfuchs: lightweight procedural atmosphere, not photographic or volumetric ray tracing.
import {seededRandom} from './world-utils.js';
export function flameArtwork(c,w,h,t){
 c.fillStyle='#100d0c';c.fillRect(0,0,w,h);
 const r=seededRandom(151),bed=c.createRadialGradient(w*.5,h*.91,1,w*.5,h*.91,w*.53);
 bed.addColorStop(0,'#f3a04c');bed.addColorStop(.32,'#912c13');bed.addColorStop(1,'#100b09');c.fillStyle=bed;c.fillRect(0,h*.47,w,h*.53);
 for(let i=0;i<9;i++){
  const x=w*(.12+i*.095),base=h*.86,ph=t*(1.9+i*.17)+i*1.83,ht=h*(.23+.12*Math.sin(ph)+.09*Math.sin(t*4.1+i)),sway=w*.07*Math.sin(ph*.75);
  const g=c.createLinearGradient(x,base,x+sway,base-ht);g.addColorStop(0,'#fff4c3');g.addColorStop(.27,'#ffd46d');g.addColorStop(.57,'#f88225');g.addColorStop(1,'#c6381400');
  c.fillStyle=g;c.beginPath();c.moveTo(x-w*.068,base);c.bezierCurveTo(x-w*.11,base-ht*.40,x+sway+w*.03,base-ht*.62,x+sway,base-ht);c.bezierCurveTo(x+sway+w*.13,base-ht*.43,x+w*.085,base-ht*.20,x+w*.065,base);c.closePath();c.fill();
 }
 for(let j=0;j<3;j++){c.save();c.translate(w*(.32+j*.18),h*(.88+j%2*.04));c.rotate((j-1)*.22);c.fillStyle='#302019';c.fillRect(-w*.22,-h*.045,w*.44,h*.075);for(let k=0;k<14;k++){c.fillStyle=k%3?'#682e1d':'#c45624';c.fillRect(-w*.20+r()*w*.39,-h*.04+r()*h*.07,2+r()*9,1+r()*3);}c.restore();}
 for(let i=0;i<38;i++){const x=r()*w,y=h*(.83+r()*.15),alpha=.2+.65*(.5+.5*Math.sin(t*4+i*2.7));c.fillStyle='rgba(255,143,43,'+alpha+')';c.fillRect(x,y,1+r()*3,1+r()*2);}
 for(let i=0;i<12;i++){const a=(t*(.21+r()*.18)+r())%1,x=w*(.22+r()*.56)+Math.sin(t+i)*a*12,y=h*(.84-a*.72);c.fillStyle='rgba(255,170,70,'+((1-a)*.65)+')';c.fillRect(x,y,1.3,1.3);}
}
export function shaftArtwork(c,w,h){
 const across=c.createLinearGradient(0,0,w,0);across.addColorStop(0,'#ffffff00');across.addColorStop(.18,'#ffffff38');across.addColorStop(.48,'#ffffffa0');across.addColorStop(.82,'#ffffff38');across.addColorStop(1,'#ffffff00');c.fillStyle=across;c.fillRect(0,0,w,h);
 c.globalCompositeOperation='destination-in';const length=c.createLinearGradient(0,0,0,h);length.addColorStop(0,'#ffffff00');length.addColorStop(.10,'#ffffffff');length.addColorStop(.65,'#ffffff85');length.addColorStop(1,'#ffffff00');c.fillStyle=length;c.fillRect(0,0,w,h);c.globalCompositeOperation='source-over';
}
export const ROOM_FINISH=Object.freeze({archive:0x958a78,workshop:0xb4a18a,storage:0x9a8d7b,shop:0xe1cbb0,bedroom:0xb9b6a4,living:0xb1bdad,kitchen:0xe1d8bd,writing:0xc5b8a2,bath:0xd4dcd6,wc:0xd2d9d3,nook:0xa9b6bd,landing:0xcfc3b0});
export function acousticImpulse(ctx,seconds,seed){
 const len=Math.ceil(ctx.sampleRate*seconds),buffer=ctx.createBuffer(2,len,ctx.sampleRate),r=seededRandom(seed);
 for(let ch=0;ch<2;ch++){const a=buffer.getChannelData(ch);for(let i=0;i<len;i++){const t=i/len;a[i]=(r()*2-1)*Math.pow(1-t,3.5)*.24;}}
 return buffer;
}
export function reverbFor(room){return ['archive','cellarhall','storage','workshop'].includes(room)?.23:['bath','wc'].includes(room)?.18:room==='nook'||room==='bedroom'?.065:.11;}
