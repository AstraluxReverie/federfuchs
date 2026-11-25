// Original decorative geometry; all dimensions in metres.
import {seededRandom} from './world-utils.js';
export function streetDetails(){const r=seededRandom(276),result=[];for(const side of [-1,1]){for(let i=0;i<8;i++){const x=side*(9.55+i*.65);result.push({kind:'bollard',x,z:5.9,h:.58+r()*.12});}for(let i=0;i<6;i++)result.push({kind:'paving_edge',x:side*(9.65+i*.65),z:6.42,h:.10});}return result;}
export const BOOK_WORLD=Object.freeze({id:'fox-forest',title:'Der Wald des weißen Fuchses',bookId:2,origin:[0,0,6],bounds:[-14,14,-16,10],returnTo:'previous-visit',status:'concept',sceneModule:'separate',lighting:'moonlight',assets:['forest_ground','birch_tree','fern','stone_path','white_fox'],navigation:'pending'});
export function photoDimensions(w,h,max=2048){if(!Number.isFinite(w)||!Number.isFinite(h)||w<=0||h<=0)throw Error('Ungültiges Bildformat');const f=Math.min(1,max/Math.max(w,h));return [Math.max(1,Math.round(w*f)),Math.max(1,Math.round(h*f))];}
