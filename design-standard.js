// Binding visual direction supplied by the owners of Zum träumenden Federfuchs.
export const DESIGN=Object.freeze({
 version:'federfuchs-original-v1',
 palette:Object.freeze({walnut:0x59402d,brass:0xa98a51,burgundy:0x603038,midnight:0x283c57,ivy:0x354c3d,amber:0xffc278,gold:0xc7a46e,stone:0x998b76,parchment:0xe6d5b4}),
 motifs:Object.freeze(['fox','feather','star','crescent','filigree']),
 materials:Object.freeze(['aged dark wood','patinated brass','worn leather','natural stone']),
 architecture:'Organic historical architecture, heavy timber, curved forms, believable construction',
 lighting:'Warm candlelight, fireplace, natural light through mullioned windows',
 atmosphere:'Enchanted, secretive, sheltered, literary; realistic, never cartoonish'
});
export const WALL_MODES=Object.freeze(['full','auto','half','off']);
export function wallMode(mode,side,cameraX,cameraZ,walk){
 if(walk)return 'full';
 if(mode!=='auto')return WALL_MODES.includes(mode)?mode:'full';
 // Auto cutaway removes near exterior walls, never turns normal interior walls into half walls.
 if(side==='front'&&cameraZ>1||side==='back'&&cameraZ< -1||side==='left'&&cameraX< -1||side==='right'&&cameraX>1)return 'off';
 return 'full';
}
export function motifPath(c,name,x,y,r){
 c.save();c.translate(x,y);c.scale(r,r);c.beginPath();
 if(name==='star'){for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,d=i%2?.37:1;const x=Math.cos(a)*d,y=Math.sin(a)*d;i?c.lineTo(x,y):c.moveTo(x,y);}c.closePath();}
 else if(name==='crescent'){c.arc(0,0,.92,-Math.PI*.70,Math.PI*.70,true);c.quadraticCurveTo(-.10,0,-.54,-.74);c.closePath();}
 else if(name==='feather'){c.moveTo(-.55,.85);c.quadraticCurveTo(-.8,-.05,.63,-.94);c.quadraticCurveTo(.88,.05,-.55,.85);c.closePath();}
 else if(name==='fox'){c.moveTo(-.94,-.92);c.lineTo(-.28,-.49);c.lineTo(0,-.64);c.lineTo(.28,-.49);c.lineTo(.94,-.92);c.lineTo(.73,.31);c.lineTo(0,.93);c.lineTo(-.73,.31);c.closePath();}
 else{c.moveTo(-.95,0);c.bezierCurveTo(-.56,-1,-.1,.9,0,0);c.bezierCurveTo(.1,-.9,.56,1,.95,0);}
 c.restore();
}
export function sealArtwork(c,w,h,motif='fox'){
 const r=Math.min(w,h)/2;
 c.clearRect(0,0,w,h);c.fillStyle='#332820';c.beginPath();c.arc(w/2,h/2,r*.95,0,Math.PI*2);c.fill();
 c.strokeStyle='#b49a69';c.lineWidth=r*.035;
 for(const a of [.88,.73]){c.beginPath();c.arc(w/2,h/2,r*a,0,Math.PI*2);c.stroke();}
 c.fillStyle='#c7a46e';motifPath(c,motif,w/2,h/2,r*.54);c.fill();
 if(motif==='fox'){c.fillStyle='#332820';for(const k of [-1,1]){c.beginPath();c.ellipse(w/2+k*r*.17,h/2+r*.055,r*.065,r*.025,k*.2,0,Math.PI*2);c.fill();}}
 if(motif==='feather'){c.strokeStyle='#332820';c.lineWidth=r*.025;c.beginPath();c.moveTo(w/2-r*.27,h/2+r*.45);c.lineTo(w/2+r*.24,h/2-r*.43);c.stroke();}
}
