// Original GLB validation for the mobile-first Federfuchs asset pipeline.
export function validateManifest(value){
 if(value?.version!==1||!Array.isArray(value.models))throw Error('Ungültige Assetliste');
 const seen=new Set();return value.models.map(item=>{
 if(!item||!/^([a-z0-9_]+)$/.test(item.slot)||!/^([a-z0-9][a-z0-9_-]*\.glb)$/.test(item.file)||seen.has(item.slot))throw Error('Ungültiger oder doppelter Asset-Eintrag');
 seen.add(item.slot);return item;
 });
}
export function validateGLB(buffer){
 if(!(buffer instanceof ArrayBuffer)||buffer.byteLength<20||buffer.byteLength>20*1024*1024)throw Error('GLB-Dateigröße ungültig (max. 20 MB)');
 const view=new DataView(buffer);if(view.getUint32(0,true)!==0x46546c67||view.getUint32(4,true)!==2||view.getUint32(8,true)!==buffer.byteLength)throw Error('Kein gültiges GLB 2.0');
 const len=view.getUint32(12,true);if(view.getUint32(16,true)!==0x4e4f534a||20+len>buffer.byteLength)throw Error('GLB-JSON fehlt');
 const json=JSON.parse(new TextDecoder().decode(new Uint8Array(buffer,20,len)).trim());
 if(json.asset?.version!=='2.0')throw Error('glTF 2.0 erforderlich');
 if([...(json.buffers||[]),...(json.images||[])].some(x=>x.uri&&!x.uri.startsWith('data:')))throw Error('Externe Dateien sind nicht erlaubt');
 if((json.extensionsRequired||[]).some(x=>['KHR_draco_mesh_compression','EXT_meshopt_compression','KHR_texture_basisu'].includes(x)))throw Error('Modell benötigt noch nicht eingerichtete Decoder');
 if((json.cameras||[]).length||json.extensions?.KHR_lights_punctual?.lights?.length)throw Error('Modell enthält Kamera oder Licht');
 return json;
}
export function dimensionsFit(size,max,minRatio=.65,tolerance=.035){
 return size.length===3&&max.length===3&&size.every((n,i)=>Number.isFinite(n)&&n>0&&n<=max[i]+tolerance&&n>=max[i]*minRatio);
}
