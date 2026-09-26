## $(date +%Y-%m-%d) - Prevent layout thrashing on SVG animations
**Learning:** Parsing visual lengths using DOM calls (.querySelectorAll, .getAttribute) within a useEffect triggers layout thrashing and prevents static rendering/SSR on Next.js.
**Action:** Use useMemo to precalculate coordinate distances mathematically during the render phase and pass them declaratively via CSS variables to animations.
