// Private rear courtyard. Ground level is continuous with the shop.
export const GARDEN=Object.freeze({xmin:-8.8,xmax:8.8,zmin:-16.5,zmax:-5.425,y:.175,doorX:0,doorHalf:.66,spawn:[0,.175+1.65,-7.2]});
export const GARDEN_BEDS=Object.freeze([{x:-5.7,z:-9.5,w:2.1,d:1.35},{x:-5.7,z:-12,w:2.1,d:1.35},{x:-2.65,z:-12,w:2.1,d:1.35},{x:-2.65,z:-14.3,w:2.1,d:1.35}]);
export function gardenDomain(x,z,r=.19){return x>GARDEN.xmin+r+.15&&x<GARDEN.xmax-r-.15&&z>GARDEN.zmin+r+.15&&z<=GARDEN.zmax+.55;}
export function shopDomain(x,z,r=.19){return (x>=-8.63&&x<=8.63&&z>=-4.94&&z<=4.94)||(Math.abs(x)<GARDEN.doorHalf-r&&z<=-4.94&&z>=-5.78)||gardenDomain(x,z,r)&&z<GARDEN.zmax-r;}
export function gardenObstacles(){const rows=GARDEN_BEDS.map(b=>({x:b.x,z:b.z,w:b.w,d:b.d}));
 return [...rows,...Array.from({length:4},(_,i)=>({x:-7.6+i*.55,z:-6.03,w:.46,d:.46})),{x:4.5,z:-8.5,w:1.15,d:.85},{x:3.48,z:-8.5,w:.48,d:.55},{x:5.52,z:-8.5,w:.48,d:.55},{x:0,z:-12.5,w:1.15,d:1.15},{x:6.75,z:-14.7,w:3.1,d:2.5},{x:-7.65,z:-15.15,w:1.2,d:1.1},{x:7.3,z:-11.7,w:1.5,d:.85},...[-1,1].flatMap(i=>[-10.1,-6.65].map(z=>({x:4.5+i*1.95,z,w:.18,d:.18})))];}
export function gardenBlocked(x,z,r=.19){return gardenObstacles().some(b=>Math.abs(x-b.x)<b.w/2+r&&Math.abs(z-b.z)<b.d/2+r);}
