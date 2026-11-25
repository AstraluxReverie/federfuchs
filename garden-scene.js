// Procedural garden models. No external textures or GLB required.
import {GARDEN,GARDEN_BEDS} from './garden-plan.js';
import {seededRandom} from './world-utils.js';
export function buildGarden(T,materials){
 const group=new T.Group(),r=seededRandom(300),y=GARDEN.y;
 const mat=(color,roughness=.9)=>new T.MeshStandardMaterial({color,roughness});
 const grass=mat(0x78805a),soil=mat(0x453021),leaf=mat(0x466d37),leafLight=mat(0x6c873b),berry=mat(0xa92a2c,.5),flower=mat(0xe9ddba),pot=mat(0x965d43),water= new T.MeshPhysicalMaterial({color:0x739b9b,roughness:.22,metalness:.12,clearcoat:.7,transparent:true,opacity:.85}),wood=materials.wood,stone=materials.stone,iron=materials.iron,paving=materials.paving;
 const mesh=(geo,m,x,yy,z,parent=group)=>{const o=new T.Mesh(geo,m);o.position.set(x,yy,z);o.castShadow=false;o.receiveShadow=true;parent.add(o);return o;};
 const box=(w,h,d,m,x,yy,z,parent=group)=>mesh(new T.BoxGeometry(w,h,d),m,x,yy,z,parent);
 const cyl=(rt,rb,h,m,x,yy,z,parent=group,n=16)=>mesh(new T.CylinderGeometry(rt,rb,h,n),m,x,yy,z,parent);
 // Local surface artwork, intentionally procedural.
 const canvasMap=(draw,w=512,h=512)=>{const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;return t;};
 const lawnMap=canvasMap((c,w,h)=>{const rr=seededRandom(882);c.fillStyle='#68794d';c.fillRect(0,0,w,h);for(let i=0;i<16000;i++){c.fillStyle=['#42553355','#9fa86d77','#7d905455','#b2a17433'][i%4];c.fillRect(rr()*w,rr()*h,1+rr()*3,2+rr()*8);}});
 grass.map=lawnMap;grass.color.setHex(0xffffff);lawnMap.repeat.set(9,6);
 const terraceTex=canvasMap((c,w,h)=>{const rr=seededRandom(166);c.fillStyle='#7c7467';c.fillRect(0,0,w,h);for(let j=0;j<6;j++)for(let i=-1;i<5;i++){const x=(i+(j%2)*.5)*128,z=j*h/6,v=145+Math.floor(rr()*35);c.fillStyle='rgb('+v+','+(v-9)+','+(v-22)+')';c.fillRect(x+2,z+2,124,h/6-4);for(let k=0;k<140;k++){c.fillStyle=k%2?'#fbebc515':'#50473b20';c.fillRect(x+4+rr()*120,z+4+rr()*(h/6-8),1+rr()*6,1+rr()*3);}}});
 const terrace=mat(0xffffff,.81);terrace.map=terraceTex;terrace.bumpMap=terraceTex;terrace.bumpScale=.014;
 function path(w,d,x,z){const o=box(w,.035,d,terrace,x,y+.012,z);const p=o.geometry.attributes.position,uv=o.geometry.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,(p.getX(i)+x)/2.4,(p.getZ(i)+z)/2.1);return o;}
 // Continuous garden substrate and non-overlapping paving sections.
 box(17.6,.26,11.075,grass,0,y-.13,-10.9625);
 path(17.6,3,0,-6.925);path(1.65,7.8,0,-12.325);path(4.8,2.225,4.5,-9.5375);path(5.0,1.05,4.05,-13.05);
 // Thick privacy wall with coping and a permanently closed garden gate.
 for(const side of [-1,1]){
  box(.30,2.0,11.075,stone,side*8.8,y+1,-10.9625);
  box(.46,.13,11.16,stone,side*8.8,y+2.06,-10.9625);
  box(7.78,2,.30,stone,side*4.91,y+1,-16.5);
  box(7.88,.13,.46,stone,side*4.91,y+2.06,-16.5);
  box(.42,2.25,.48,stone,side*.95,y+1.125,-16.5);
 }
 for(let i=0;i<11;i++){const x=-.78+i*.156;cyl(.018,.018,1.8,iron,x,y+.96,-16.5,group,8);const fin=cyl(0,.049,.14,iron,x,y+1.93,-16.5,group,6);}
 for(const yy of [.25,1.65])box(1.74,.045,.075,iron,0,y+yy,-16.5);
 // Pergola and terrace seating.
 for(const x of [2.55,6.45])for(const z of [-6.65,-10.1])box(.18,2.65,.18,wood,x,y+1.325,z);
 for(const x of [2.55,6.45])box(.20,.20,3.85,wood,x,y+2.65,-8.375);
 for(let i=0;i<8;i++)box(4.15,.14,.12,wood,4.5,y+2.79,-6.6-i*.50);
 cyl(.57,.57,.095,wood,4.5,y+.78,-8.5);cyl(.055,.10,.74,iron,4.5,y+.37,-8.5);
 for(const x of [3.48,5.52]){box(.46,.08,.48,wood,x,y+.46,-8.5);for(const dx of [-.17,.17])for(const dz of [-.18,.18])cyl(.022,.025,.46,iron,x+dx,y+.23,-8.5+dz,group,8);box(.045,.47,.46,iron,x+(x<4.5?-.22:.22),y+.72,-8.5);}
 for(const x of [4.33,4.68]){cyl(.055,.045,.09,mat(0xe2d8c6),x,y+.88,-8.5,group,12);const handle=mesh(new T.TorusGeometry(.031,.008,6,12),mat(0xe2d8c6),x+.065,y+.88,-8.5);}
 // Raised strawberry beds, herbs and small plant labels.
 const plants=[],fruit=[],blossoms=[],ivy=[];
 for(let k=0;k<GARDEN_BEDS.length;k++){const b=GARDEN_BEDS[k];
  box(b.w,.34,b.d,wood,b.x,y+.17,b.z);box(b.w-.13,.025,b.d-.13,soil,b.x,y+.35,b.z);
  for(const s of [-1,1]){box(b.w+.04,.06,.095,wood,b.x,y+.36,b.z+s*b.d/2);box(.095,.06,b.d,wood,b.x+s*b.w/2,y+.36,b.z);}
  for(let j=0;j<15;j++){const x=b.x+(j%5-2)*.36,z=b.z+(Math.floor(j/5)-1)*.36;
   for(let n=0;n<5;n++){const a=n*1.257+r()*.3;plants.push({x:x+Math.cos(a)*.115,y:y+.46+r()*.07,z:z+Math.sin(a)*.115,a,s:.085+r()*.04});}
   if(k<3){fruit.push({x:x+.09,y:y+.405,z:z+.07,a:r()*6.28,s:.045+r()*.016});if(j%3===0)blossoms.push({x:x-.04,y:y+.56,z:z-.06,a:r()*6.28,s:.039});}
  }
  const label=box(.38,.18,.035,wood,b.x-b.w*.35,y+.64,b.z+b.d*.46);box(.035,.32,.035,wood,label.position.x,y+.46,label.position.z);
  const canvas=document.createElement('canvas');canvas.width=256;canvas.height=128;const c=canvas.getContext('2d');c.fillStyle='#e5d3a8';c.fillRect(0,0,256,128);c.strokeStyle='#70583a';c.strokeRect(6,6,244,116);c.fillStyle='#49372a';c.font='bold 26px Georgia';c.textAlign='center';c.fillText(k<3?'Erdbeeren':'Kräuter',128,55);c.font='20px Georgia';c.fillText(k<3?'Danzelots Beet '+(k+1):'Minze · Melisse',128,91);const tex=new T.CanvasTexture(canvas);tex.colorSpace=T.SRGBColorSpace;mesh(new T.PlaneGeometry(.35,.15),new T.MeshStandardMaterial({map:tex,roughness:.9}),label.position.x,label.position.y,label.position.z+.019);
 }
 // Herb pots beside the kitchen-side terrace; tucked against the wall.
 for(let i=0;i<4;i++){const x=-7.6+i*.55,z=-6.03;cyl(.23,.17,.32,pot,x,y+.16,z);cyl(.205,.205,.02,soil,x,y+.32,z);for(let j=0;j<7;j++)plants.push({x:x+(r()-.5)*.25,y:y+.40+r()*.19,z:z+(r()-.5)*.25,a:r()*6.28,s:.085});}
 // Fountain, with shallow basin and animated concentric water rings.
 cyl(.55,.60,.24,stone,0,y+.12,-12.5);cyl(.52,.52,.06,water,0,y+.25,-12.5);
 cyl(.10,.16,.57,stone,0,y+.49,-12.5);cyl(.24,.10,.12,stone,0,y+.79,-12.5);
 const rings=[];for(let i=0;i<3;i++){const m=new T.MeshBasicMaterial({color:0xc5d7cb,transparent:true,opacity:.26,depthWrite:false});const o=mesh(new T.TorusGeometry(1,.015,6,32),m,0,y+.288,-12.5);o.rotation.x=-Math.PI/2;rings.push(o);}
 const stream=mesh(new T.CylinderGeometry(.023,.035,.36,10),water,0,y+1.01,-12.5);
 const dropletPositions=new Float32Array(72*3),dropGeo=new T.BufferGeometry();dropGeo.setAttribute('position',new T.BufferAttribute(dropletPositions,3));const drops=new T.Points(dropGeo,new T.PointsMaterial({color:0xaed8dc,size:.026,transparent:true,opacity:.75,depthWrite:false}));drops.frustumCulled=false;group.add(drops);
 // Walk-in timber shed with true doorway and interior storage.
 for(const x of [5.27,8.23])box(.14,2.15,2.5,wood,x,y+1.075,-14.7);
 box(3.1,2.15,.14,wood,6.75,y+1.075,-15.88);
 for(const x of [5.645,7.855])box(.89,2.15,.14,wood,x,y+1.075,-13.45);
 box(1.32,.19,.14,wood,6.75,y+2.055,-13.45);
 box(2.82,.025,2.22,wood,6.75,y+.014,-14.7);
 const shedHinge=new T.Group();shedHinge.position.set(6.13,y,-13.45);group.add(shedHinge);
 const shedLeaf=box(1.24,1.94,.085,wood,.62,.97,0,shedHinge);
 for(const z of [-.05,.05]){for(const yy of [.22,1.70])box(1.17,.085,.035,iron,.62,yy,z,shedHinge);mesh(new T.SphereGeometry(.045,10,8),iron,1.08,1.0,z*2,shedHinge);}
 const shedDoor={g:shedHinge,leaf:shedLeaf,x:6.75,z:-13.45,floor:y-.175,open:false,axis:'z',secret:false};
 for(const yy of [.55,1.18,1.80]){box(2.45,.075,.48,wood,6.75,y+yy,-15.47);for(const x of [5.65,7.85])box(.065,.65,.42,wood,x,y+yy-.32,-15.47);}
 for(let i=0;i<4;i++){cyl(.17,.12,.23,pot,5.95+i*.44,y+.70,-15.47);cyl(.15,.15,.02,soil,5.95+i*.44,y+.82,-15.47);}
 for(let i=0;i<3;i++)box(.40,.26,.32,wood,6.25+i*.48,y+1.35,-15.47);
 box(.43,.65,.80,wood,7.95,y+.325,-14.55);for(const z of [-14.75,-14.37]){const tool=cyl(.025,.025,1.35,wood,8.02,y+.85,z,group,8);tool.rotation.z=.14;box(.18,.25,.04,iron,8.1,y+.24,z);}
 const shedLamp=mesh(new T.SphereGeometry(.065,10,8),new T.MeshBasicMaterial({color:0xffd5a4}),6.75,y+1.93,-14.7);
 const shedLight=new T.PointLight(0xffcf91,1.6,3.5,2);shedLight.position.copy(shedLamp.position);group.add(shedLight);
 const roof=new T.Shape();roof.moveTo(-1.68,0);roof.lineTo(0,.65);roof.lineTo(1.68,0);roof.closePath();const rg=new T.ExtrudeGeometry(roof,{depth:2.73,bevelEnabled:false});rg.translate(0,0,-1.365);mesh(rg,materials.roof,6.75,y+2.15,-14.7);
 for(const x of [6.06,7.44])box(.08,2.02,.19,wood,x,y+1.01,-13.45);box(1.46,.085,.19,wood,6.75,y+2.01,-13.45);
 box(1.2,.62,1.1,wood,-7.65,y+.31,-15.15);box(.60,.42,.03,mat(0x282321),-7.65,y+.23,-14.58);box(1.38,.09,1.28,materials.roof,-7.65,y+.66,-15.15);
 box(1.5,.12,.85,wood,7.3,y+.06,-11.7);box(1.40,.13,.75,mat(0x817657),7.3,y+.185,-11.7);
 // Dense but cheap greenery on the pergola and privacy walls.
 for(let i=0;i<125;i++){const x=2.55+r()*3.9,z=-6.65-r()*3.45;ivy.push({x,y:y+2.83+r()*.11,z,a:r()*6.28,s:.14+r()*.09});}
 for(const side of [-1,1])for(let i=0;i<90;i++){ivy.push({x:side*(8.55+r()*.10),y:y+.20+r()*1.85,z:-5.7-r()*10.45,a:r()*6.28,s:.12+r()*.10});}
 const dummy=new T.Object3D(),batch=(geo,m,arr,scale)=>{const o=new T.InstancedMesh(geo,m,arr.length);arr.forEach((p,i)=>{dummy.position.set(p.x,p.y,p.z);dummy.rotation.set(0,p.a,0);dummy.scale.set(p.s*scale[0],p.s*scale[1],p.s*scale[2]);dummy.updateMatrix();o.setMatrixAt(i,dummy.matrix);});o.instanceMatrix.needsUpdate=true;o.receiveShadow=true;group.add(o);return o;};
 batch(new T.SphereGeometry(1,7,5),leaf,plants,[1.6,.33,.8]);batch(new T.SphereGeometry(1,8,6),berry,fruit,[.82,1.13,.82]);batch(new T.SphereGeometry(1,6,4),flower,blossoms,[1,.25,1]);batch(new T.SphereGeometry(1,6,5),leafLight,ivy,[1.25,.6,1]);
 const lights=[];for(const x of [2.55,6.45]){const bulb=mesh(new T.SphereGeometry(.075,10,8),new T.MeshBasicMaterial({color:0xffc788}),x,y+2.45,-8.35);const l=new T.PointLight(0xffc788,2.0,4,2);l.position.copy(bulb.position);group.add(l);lights.push(l);}
 function update(t,mood){for(let i=0;i<rings.length;i++){const a=(t*.35+i/3)%1;rings[i].scale.set(.12+a*.37,.12+a*.37,1);rings[i].material.opacity=.25*(1-a);}stream.scale.x=1+.08*Math.sin(t*9);for(let i=0;i<72;i++){const u=(t*.8+i/72)%1,a=i*2.39996,rad=.03+.43*u;dropletPositions[i*3]=Math.cos(a)*rad;dropletPositions[i*3+1]=y+.28+Math.sin(Math.PI*u)*.66;dropletPositions[i*3+2]=-12.5+Math.sin(a)*rad;}dropGeo.attributes.position.needsUpdate=true;shedLight.intensity=mood==='day'?.7:1.6;for(const l of lights)l.intensity=mood==='day'?.3:2.0;}
 return {group,update,shedDoor,stats:{beds:GARDEN_BEDS.length,plants:plants.length,berries:fruit.length,blossoms:blossoms.length,ivy:ivy.length}};
}
