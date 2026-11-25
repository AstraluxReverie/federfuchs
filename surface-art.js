// Original procedural surface artwork; no external image dependency.
import {seededRandom} from './world-utils.js';
export function timber(c,w,h){
 const r=seededRandom(864),g=c.createLinearGradient(0,0,0,h);
 g.addColorStop(0,'#735236');g.addColorStop(.5,'#8d663f');g.addColorStop(1,'#735236');c.fillStyle=g;c.fillRect(0,0,w,h);
 const knots=Array.from({length:5},()=>[r()*w,r()*h,30+r()*80]);
 for(let i=0;i<780;i++){
 const y=r()*h,shade=r();c.strokeStyle=shade>.55?'rgba(222,178,116,.12)':'rgba(42,25,14,.17)';c.lineWidth=.3+r()*1.7;c.beginPath();
 for(let x=0;x<=w;x+=8){let yy=y+Math.sin(x*.013+i*.15)*2.8+Math.sin(x*.039+y*.09)*.9;
 for(const [kx,ky,rad] of knots){const dx=x-kx,dy=y-ky;yy+=Math.exp(-(dx*dx/(rad*rad*3)+dy*dy/(rad*rad*.08)))*Math.sign(dy||1)*rad*.13;}
 if(x===0)c.moveTo(x,yy);else c.lineTo(x,yy);}
 c.stroke();}
 for(const [x,y,rad] of knots){for(let i=0;i<5;i++){c.strokeStyle='rgba(47,25,12,.19)';c.lineWidth=1.2;c.beginPath();c.ellipse(x,y,rad*(.12+i*.12),rad*(.025+i*.025),.03,0,Math.PI*2);c.stroke();}}
 for(let i=0;i<5500;i++){c.fillStyle=i%2?'#eed3a511':'#2c1e1517';c.fillRect(r()*w,r()*h,1+r()*4,.5+r());}
}
export function cobbles(c,w,h,height=false){
 const r=seededRandom(981);c.fillStyle=height?'#333':'#49484a';c.fillRect(0,0,w,h);
 const bh=h/9,bw=w/7;
 for(let j=0;j<9;j++)for(let i=-1;i<8;i++){
 const x=(i+(j%2)*.5)*bw,y=j*bh,v=87+Math.floor(r()*43),inset=3+r()*2;
 c.beginPath();c.moveTo(x+inset+9,y+inset);c.lineTo(x+bw-inset-7,y+inset+1);c.quadraticCurveTo(x+bw-inset,y+inset+1,x+bw-inset,y+inset+12);c.lineTo(x+bw-inset-1,y+bh-inset-8);c.quadraticCurveTo(x+bw-inset-2,y+bh-inset,x+bw-inset-12,y+bh-inset);c.lineTo(x+inset+8,y+bh-inset);c.quadraticCurveTo(x+inset,y+bh-inset,x+inset,y+bh-inset-10);c.lineTo(x+inset,y+inset+10);c.quadraticCurveTo(x+inset,y+inset,x+inset+9,y+inset);c.closePath();
 c.fillStyle=height?'#bcbcbc':'rgb('+v+','+(v+1)+','+(v+3)+')';c.fill();c.strokeStyle=height?'#777':'#333237';c.lineWidth=2;c.stroke();
 for(let k=0;k<55;k++){c.fillStyle=height?(k%2?'#ffffff15':'#00000015'):(k%2?'#dae0e220':'#23252b25');c.fillRect(x+10+r()*(bw-20),y+9+r()*(bh-18),1+r()*5,1+r()*3);}
 }
}
export function wallpaper(c,w,h){
 c.fillStyle='#b8b39b';c.fillRect(0,0,w,h);c.fillStyle='#a3a58d';c.fillRect(w*.02,0,w*.07,h);c.fillRect(w*.91,0,w*.07,h);
 c.strokeStyle='#737e67';c.lineWidth=2;
 for(let j=-1;j<4;j++){const y=j*h/3+h/6;c.beginPath();c.moveTo(w/2,y-h/6);c.bezierCurveTo(w*.16,y-h*.12,w*.84,y+h*.12,w/2,y+h/6);c.stroke();
 for(const sign of [-1,1]){c.fillStyle='#7f8a70';c.beginPath();c.moveTo(w/2,y);c.quadraticCurveTo(w/2+sign*w*.36,y-h*.13,w/2+sign*w*.29,y-h*.02);c.quadraticCurveTo(w/2+sign*w*.19,y+h*.02,w/2,y);c.fill();}
 c.fillStyle='#a77d68';c.beginPath();c.ellipse(w/2,y-h*.115,9,6,0,0,Math.PI*2);c.fill();}
 const r=seededRandom(78);for(let i=0;i<1800;i++){c.fillStyle=i%2?'#fff3c817':'#353c2910';c.fillRect(r()*w,r()*h,1,2);}
}
