## 2025-03-01 - 3D Float32Array Initialization Bottleneck
**Learning:** Initializing Float32Arrays inside React render functions, particularly when generating 3D buffer attributes using Array.from().flat(), is a severe performance bottleneck. It triggers heavy garbage collection and recalculation on every re-render.
**Action:** Use useMemo and a pre-allocated Float32Array with a direct loop for initializing static 3D attributes.
