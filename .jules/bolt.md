## 2026-08-27 - Optimize NeuralNetworkDiagram

**Learning:** SVG animations driven by `useEffect` and raw DOM `.querySelectorAll` methods frequently lead to large main-thread delays, unneeded double renders, and SSR mismatches. Furthermore, calculating visual lengths via `.getAttribute` within `useEffect` halts static generation. We avoided this anti-pattern by doing the math within `useMemo` in `src/components/NeuralNetworkDiagram.tsx`.

**Action:** Replace imperative element manipulations inside `useEffect` with declarative React rendering, computing variables (like distance/dash array limits) upfront using `useMemo` so Next.js can resolve them statically during server rendering or build without forcing extra client cycles.
