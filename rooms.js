// Spatial semantics for the existing Federfuchs floor plan. Metres, not new geometry.
export const ROOMS=Object.freeze([
 {id:'archive',name:'Historisches Archiv',floor:0,bounds:[-8.8,-3.0,-5.05,5.05],focus:[-5.6,-2.5,-.5],camera:[-2.7,1.0,8.1],radius:5.7,light:.88,rain:.20,fire:.08},
 {id:'cellarhall',name:'Kellertreppenhaus',floor:0,bounds:[-3,2.9,-5.05,5.05],focus:[0,-2.4,0],camera:[6,2,11],radius:5,light:.90,rain:.22,fire:.08},
 {id:'workshop',name:'Buchbinderei',floor:0,bounds:[2.9,6.62,-5.05,5.05],focus:[4.8,-2.6,-1],camera:[-1,1.5,7],radius:4.7,light:1.02,rain:.17,fire:.08},
 {id:'storage',name:'Lager und Katakombenzugang',floor:0,bounds:[6.62,8.8,-5.05,5.05],focus:[7.7,-2.5,1],camera:[1.3,1.5,7.2],radius:4,light:.84,rain:.12,fire:.04},
 {id:'shop',name:'Antiquariat',floor:1,bounds:[-8.8,8.8,-5.05,5.05],focus:[-.3,2.15,0],camera:[12,9,15],radius:10.2,light:1,rain:.8,fire:.16},
 {id:'bedroom',name:'Schlafzimmer',floor:2,bounds:[-8.8,-3,-5.05,.8],focus:[-6.0,7,-2.4],camera:[-1,11.8,4],radius:4.6,light:.93,rain:.8,fire:.12},
 {id:'living',name:'Wohnzimmer',floor:2,bounds:[-8.8,-6.15,.8,5.05],focus:[-7.4,7.2,3.0],camera:[-1,10.7,9],radius:3.7,light:1.0,rain:.8,fire:.23},
 {id:'kitchen',name:'Küche und Essbereich',floor:2,bounds:[-6.15,-3,.8,5.05],focus:[-4.6,7.1,2.9],camera:[1.0,10.5,9.0],radius:3.8,light:1.06,rain:.8,fire:.12},
 {id:'landing',name:'Privates Treppenhaus',floor:2,bounds:[-3,2.9,-5.05,5.05],focus:[0,7.1,0],camera:[6,12,12],radius:5.6,light:.96,rain:.35,fire:.1},
 {id:'writing',name:'Schreibstube',floor:2,bounds:[2.9,8.8,-5.05,-1.5],focus:[5.8,7.1,-2.9],camera:[.1,10.9,4],radius:4.2,light:1.04,rain:.9,fire:.16},
 {id:'bath',name:'Badezimmer',floor:2,bounds:[2.9,5.45,-1.5,3.5],focus:[4.2,7.1,1.2],camera:[-1,11,7],radius:3.4,light:1.08,rain:.4,fire:.06},
 {id:'wc',name:'Separates WC',floor:2,bounds:[2.9,5.45,3.5,5.05],focus:[4.2,7.1,4.2],camera:[.1,10.5,10],radius:2.5,light:1.05,rain:.35,fire:.03},
 {id:'nook',name:'Geheime Lesehöhle',floor:2,bounds:[5.45,8.8,-1.5,5.05],focus:[7.0,7.15,2.4],camera:[12,10.6,9.5],radius:4.1,light:.91,rain:1,fire:1}
]);
export const TOUR=Object.freeze(['shop','archive','workshop','bedroom','living','writing','nook']);
export function roomAt(floor,x,z){return ROOMS.find(r=>r.floor===floor&&x>=r.bounds[0]&&x<=r.bounds[1]&&z>=r.bounds[2]&&z<=r.bounds[3])||null;}
export function naturalMood(hour){return hour>=7&&hour<17?'day':hour>=17&&hour<22?'evening':'night';}
export function validateVisit(v){
 if(!v||v.version!==1||![-1,0,1,2].includes(v.floor)||!['full','auto','half','off'].includes(v.mode)||!['single','stack'].includes(v.scope))return null;
 const vec=x=>Array.isArray(x)&&x.length===3&&x.every(n=>Number.isFinite(n)&&Math.abs(n)<=150);
 if(!vec(v.camera)||!vec(v.target)||Math.hypot(...v.camera.map((n,i)=>n-v.target[i]))<.5)return null;
 return {...v,roof:!!v.roof,mood:['day','evening','night'].includes(v.mood)?v.mood:'evening'};
}
