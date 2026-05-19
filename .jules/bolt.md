## 2025-03-09 - React-Three-Fiber Float32Array Optimization
**Learning:** `new Float32Array(Array.from({length}).map(...).flat())` inside a React-Three-Fiber render function is a severe anti-pattern. It causes continuous array allocations, massive garbage collection overhead, and potentially forces the GPU to re-upload geometry buffers on every render. Furthermore, calling `Math.random()` inline without memoization causes severe visual jitter whenever the component updates (e.g., on hover).
**Action:** Always pre-allocate `Float32Array` buffers with the exact size, populate them using a direct `for` loop, and strictly wrap the entire block in a `useMemo` hook with an empty dependency array.

## 2025-03-09 - ESLint Build Artifact Collision
**Learning:** Running `npm run lint:strict` immediately after `npm run build` will fail with thousands of incomprehensible errors (like `Expected an assignment or function call and instead saw an expression`) because ESLint attempts to parse the minified, compiled files in the generated `out/` and `.next/` directories.
**Action:** Always clean build artifacts (`rm -rf .next out`) before running strict linting checks.
