// Federfuchs: shared architecture and camera rules. Units: metres.
export const LEVELS=Object.freeze([-4.8,0,5.1]);
export const CEILINGS=Object.freeze([-.175,4.925,9.725]);
export function wallExtent(y,h){
 const bottom=y-h/2,top=y+h/2;
 const floor=LEVELS.findIndex(v=>bottom>=v-.002&&top<=v+4.5+.002);
 const end=floor>=0&&Math.abs(top-LEVELS[floor]-4.5)<.002?CEILINGS[floor]:top;
 return {bottom,top:end,y:(bottom+end)/2,h:end-bottom,floor};
}
export function slabExtent(w,d,x,z){
 let x0=x-w/2,x1=x+w/2,z0=z-d/2,z1=z+d/2;
 if(Math.abs(x0+9)<.002)x0=-9.175;if(Math.abs(x1-9)<.002)x1=9.175;
 if(Math.abs(z0+5.25)<.002)z0=-5.425;if(Math.abs(z1-5.25)<.002)z1=5.425;
 return {x0,x1,z0,z1};
}
export function cameraDistance(fov,aspect,radius){const v=fov*Math.PI/360,h=Math.atan(Math.tan(v)*Math.max(.28,aspect));return radius/Math.sin(Math.min(v,h))*1.045;}
export function seededRandom(seed=1729){let state=seed>>>0;return ()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296;};}
export function checkOpenings(openings,lo,hi,base,top){
 let end=lo;const failures=[];
 for(const o of [...openings].sort((a,b)=>a.center-b.center)){
 const a=o.center-o.w/2,b=o.center+o.w/2;
 if(a<end-1e-6||b>hi+1e-6||o.y-o.h/2<base-1e-6||o.y+o.h/2>top+1e-6)failures.push(o);
 end=Math.max(end,b);
 }return failures;
}
