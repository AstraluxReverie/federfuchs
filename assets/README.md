# Federfuchs asset integration

Place self-contained glTF 2.0 binary models in this directory. Register an entry in `manifest.json` only after the corresponding file exists. Example (not active):

```json
{"slot":"reading_sofa","file":"reading-sofa.glb","author":"Original asset","license":"All rights reserved"}
```

Available slots (metres, width × height × depth):
- reading_sofa: 2.72 × 1.35 × 1.20
- reading_chair: 0.90 × 1.16 × 0.90
- counter: 2.60 × 1.20 × 1.06 (retain existing tabletop props)
- writing_desk: 1.90 × 0.86 × 0.85 (retain existing tabletop props)
- mantel_clock: 0.30 × 0.37 × 0.16
- tea_set: 0.72 × 0.30 × 0.42
- vase: 0.18 × 0.30 × 0.18

Y up; front +Z, origin centered at base. Use metres and embedded textures. No compression extensions requiring additional decoders, no cameras/lights, no external resource URLs. A model must pass validation, dimensional and wall checks before replacing fallback meshes. Model authorship and license are recorded in manifest. Do not publish user-owned assets without permission.
