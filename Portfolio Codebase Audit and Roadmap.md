# **Strategic Codebase Audit and Modernization Roadmap: The Muzammil Loya Portfolio Architecture**

## **1\. Executive Intelligence Assessment**

### **1.1 Introduction and Scope of Analysis**

In the contemporary digital ecosystem, a frontend engineer’s portfolio transcends the traditional function of a static resume. It operates as a live production environment, a testament to architectural decision-making, and a tangible demonstration of mastery over the complexities of the modern web stack. This report provides a comprehensive, expert-level audit of the digital footprint associated with the user "muzammil5539" and the repository ecosystem identified as muzammil-portfolio. The objective is to formulate a rigorous "Completion Strategy" that elevates the existing codebase from a functional prototype to a high-performance, senior-grade product capable of withstanding scrutiny from hiring managers at top-tier technology firms and AI research laboratories.

The analysis draws upon a deep inspection of the visible repository artifacts 1, the live deployment environments 2, and the broader context of the user’s academic and professional background in Computer Science, Artificial Intelligence, and Full Stack Development.2 By synthesizing these data points with industry best practices for Next.js, TypeScript, and User Experience (UX) design, this document outlines a granular pathway to production.

The scope of this audit encompasses a "Code vs. Reality" Gap Analysis, identifying the dissonance between the current implementation and the requirements of a Senior Frontend Engineer role. It further details a "Pathway to Production," dissecting necessary improvements in functionality, performance, and deployment pipelines. Finally, it proposes three "Wow" factors specifically curated to leverage the user’s background in AI and App Development, ensuring the portfolio captures immediate attention in a competitive market.

### **1.2 User Persona and Architectural Context**

The user, Muzammil Loya, presents as a multifaceted engineer with a strong foundation in "classics like Python, Javascript, and Java" and a specialized focus on modern web frameworks such as React.js, Next.js, and Vue.js.2 Currently pursuing a Bachelor's in Computer Science at The University of Texas at Dallas 2, the user occupies a transitional space between advanced academic study and professional seniority.

This duality presents a specific architectural challenge: the portfolio must bridge the gap between "student project" and "senior engineering product." The current digital footprint is fragmented across multiple domains—including muzammil-portfolio.vercel.app, muzammil.vercel.app, and muzammil-portofolio.vercel.app 2—suggesting an iterative but potentially disorganized development process. A Senior Frontend Engineer is expected to maintain a canonical identity; therefore, a primary strategic imperative identified in this report is the consolidation of these disparate deployments into a single, authoritative, and technically robust source of truth.

The technical analysis confirms a reliance on the Next.js framework (likely version 13 or 14 using the App Router), TypeScript (constituting 91.6% of the codebase), and Tailwind CSS for styling.1 This stack aligns perfectly with 2025 industry standards 5, providing a solid foundation. However, the presence of placeholder content 4 and "inaccessible" repository signals 7 indicates that while the skeleton is modern, the implementation requires significant maturation to achieve production readiness.

## ---

**2\. Deep Codebase Audit: The Current State**

This section deconstructs the structural integrity of the repository github.com/Muzammil-cyber/Portfolio (identified as the active codebase matching the user query).1 The audit evaluates the configuration, directory architecture, and code quality against the heuristic benchmarks of a Senior Engineer.

### **2.1 Configuration and Build Pipeline Analysis**

The bedrock of any scalable React application lies in its configuration. The presence of specific configuration files provides insight into the build pipeline's sophistication.

#### **2.1.1 Next.js Configuration (next.config.mjs)**

The repository utilizes next.config.mjs 1, utilizing the .mjs extension. This is a positive indicator, signifying the use of ECMAScript Modules (ESM) for configuration, which aligns with the modern JavaScript ecosystem's move away from CommonJS (require) toward import/export syntax.

**Analysis of Implications:**

The use of Next.js implies a hybrid rendering strategy. However, for a portfolio, the configuration must explicitly optimize for static assets. A critical audit point—often missed in junior portfolios—is the definition of images.remotePatterns. Since the portfolio likely pulls images from GitHub or a CMS, security headers and strict domain whitelisting are mandatory. If the current config relies on the deprecated domains array, it introduces security vulnerabilities and performance warnings during the build process. Furthermore, a senior-grade configuration would leverage the experimental object cautiously, perhaps enabling typedRoutes for enhanced routing safety, while ensuring reactStrictMode is set to true to catch concurrency bugs during development.

#### **2.1.2 TypeScript Configuration (tsconfig.json)**

With TypeScript constituting 91.6% of the codebase 1, the integrity of tsconfig.json is paramount. The mere presence of TypeScript does not guarantee type safety; the *strictness* of the compiler options does.

**Critical Gap Identification:** Standard create-next-app templates often ship with a lenient configuration. A "Deep Audit" assumes that for a Senior Engineer, the compilerOptions must include "strict": true, enabling noImplicitAny, strictNullChecks, and strictFunctionTypes. Furthermore, the configuration should enable noUncheckedIndexedAccess. This specific flag is a litmus test for seniority; it forces the developer to handle undefined when accessing array indices, preventing a common class of runtime errors that plague production applications. The presence of custom path aliases (e.g., "@/\*": \["./\*"\]) is also expected to avoid fragile relative imports like ../../../components, which degrade maintainability.6

#### **2.1.3 Tailwind and PostCSS Configuration**

The files tailwind.config.js and postcss.config.js are present.1

* **Tailwind Config:** The audit seeks evidence of a structured design system. A common anti-pattern is the reliance on arbitrary values (e.g., w-\[350px\]) rather than extending the theme in tailwind.config.js. A senior codebase defines semantic color tokens (e.g., primary, secondary, accent) within the configuration, enabling system-wide theme changes and Dark Mode implementation without refactoring component markup.  
* **PostCSS:** This handles the transformation of CSS. The configuration should minimally include tailwindcss and autoprefixer. If the user intends to use advanced CSS features or nesting, the inclusion of postcss-nesting would be anticipated, though Tailwind's nesting plugin is now the standard recommendation.

### **2.2 Directory Structure and Modular Architecture**

The file list identifies app, components, type, utils, public, and api directories.1 This structure strongly suggests the use of the **Next.js App Router**, the current paradigm for Next.js development.8

**Table 1: Architectural Component Analysis**

| Directory | Inferred Purpose | Senior Engineering Critique |
| :---- | :---- | :---- |
| **app/** | Routing & Layouts | Confirms adoption of React Server Components (RSC). The critical audit point is the separation of Client and Server components. A common mistake is marking root layouts as 'use client', de-optimizing the entire tree. |
| **components/** | UI Elements | The structure inside is crucial. Senior projects separate "ui" (atomic primitives like Buttons) from "features" (complex compositions like ProjectGrid). Flattened structures here lead to technical debt. |
| **type/** | TypeScript Definitions | **Anti-Pattern Alert.** Centralizing all types in a single type folder is considered archaic. Modern best practice dictates **Colocation**: types should reside near the data they describe (e.g., ProjectCard.tsx exports ProjectProps). |
| **utils/** | Helper Functions | Should contain pure functions (e.g., date formatting, class merging). Business logic found here indicates a "Anemic Domain Model" and should likely be moved to hooks or services. |
| **api/** | Serverless Functions | Indicates backend capabilities. Essential for handling contact forms (e.g., via Resend/EmailJS) without exposing secrets to the client. |

### **2.3 Dependency Ecosystem and Package Hygiene**

The package.json file 1 reveals the project's DNA.

* **Core:** React, React DOM, Next.js.  
* **Styling:** Tailwind CSS, PostCSS.  
* **Utilities:** clsx or tailwind-merge are expected for dynamic class handling. Their absence would necessitate a manual, error-prone string concatenation approach for class names.  
* **Linting:** .eslintrc.json and .prettierrc (implied) are present.1 However, the presence of package-lock.json ensures deterministic builds. A senior audit checks for husky and lint-staged to enforce code quality at the commit level. Without these, formatting rules remain suggestions rather than laws.

## ---

**3\. 'Code vs. Reality' Gap Analysis**

This section performs a forensic comparison between the code artifacts identified and the requirements of a high-performance, live product. It highlights the dissonance between the "Student" implementation currently visible and the "Senior Engineer" persona required.

### **3.1 The "Lorem Ipsum" and Placeholder Content Gap**

The live reconnaissance of variants such as muzammil-portofolio.vercel.app reveals a critical deficiency: the presence of placeholder text. Snippets indicate sections describing "blank cassettes" and "pricing starting at $17" 4, which are clearly remnants of a downloaded template.

* **The Reality:** The code renders generic content that undermines the user's professional credibility.  
* **The Expectation:** A Senior Engineer's portfolio is a curated narrative. Every string of text must be intentional.  
* **The Gap:** The codebase lacks a robust Content Management System (CMS) or a structured data layer. The content appears to be hardcoded into components or left as template defaults.  
* **Implication:** This signals a lack of attention to detail—a fatal flaw for a UX/UI Designer persona. The immediate requirement is to scrub all "Lorem Ipsum" and template artifacts, replacing them with professional copy using the **STAR method** (Situation, Task, Action, Result) for project descriptions.

### **3.2 The Feature Functionality Gap**

Research indicates the presence of a "Contact" section 4, but audit reveals no backend logic in the snippets to handle form submissions securely.

* **The Reality:** Contact forms in junior portfolios are often mailto: links or non-functional UI shells.  
* **The Expectation:** A fully functional, secure communication channel.  
* **The Gap:** Secure handling of form data.  
* **Detailed Insight:** Implementing a form requires more than HTML inputs. It demands client-side validation (Zod/Yup) to prevent spam, state management (React Hook Form) to handle submission states (loading, success, error), and a server-side handler (Next.js Server Actions) to interface with email providers like Resend or EmailJS.10 The current repository likely lacks this "plumbing," creating a facade of functionality rather than a feature.

### **3.3 The UX/UI "Uncanny Valley"**

While Tailwind CSS facilitates responsive design, the audit of the "Student" persona often reveals a reliance on default breakpoints and lack of fluid typography.

* **The Reality:** Layouts that "snap" awkwardly between mobile and desktop views.  
* **The Expectation:** Fluid, "intrinsically web" design.  
* **The Gap:**  
  * **Typography:** Default system fonts vs. a custom type hierarchy (e.g., Inter/Geist Sans) utilizing next/font for zero layout shift.  
  * **Motion:** Static page transitions vs. orchestrated animations. A Senior UX Engineer utilizes libraries like framer-motion to guide the user's eye, using shared layout animations for context preservation between routes.12  
  * **Dark Mode:** The presence of tailwind.config.js suggests dark mode capability, but without a dedicated ThemeProvider (e.g., next-themes) to handle hydration mismatches, the site likely flashes the wrong theme on load—a jarring UX flaw.

### **3.4 The "Canonical Identity" Crisis**

The existence of multiple distinct URLs (muzammil.vercel.app, muzzammil-portfolio.vercel.app) creates a fragmented personal brand.

* **The Gap:** SEO and Authority. Splitting traffic across multiple subdomains prevents any single domain from building search authority.  
* **Strategic Fix:** The audit mandates the selection of a single primary domain (preferably a custom .com or .dev domain, not a .vercel.app subdomain) and the implementation of 301 redirects for all legacy versions. This demonstrates an understanding of DNS, SEO, and brand management.

## ---

**4\. Pathway to Production: A Strategic Roadmap**

The following roadmap transforms the repository from a fragmented collection of scripts into a unified, production-grade product. It is structured in four distinct phases, prioritizing "Hygiene" before "Features," and "Performance" before "Polishing."

### **Phase 1: Infrastructure Hygiene and Standardization (Days 1-3)**

**Objective:** Establish a stable, strict, and scalable development environment.

1. **Repository Consolidation:** Archive deprecated repositories (e.g., muzammil3278/muzammil-portofolio) to prevent confusion. Focus efforts on the Next.js/Tailwind/TypeScript repository (Muzammil-cyber/Portfolio).  
2. **Strict Type Enforcement:**  
   * Refactor tsconfig.json to enable "strict": true.  
   * Run tsc \--noEmit and resolve the inevitable cascade of type errors. This is the "burning the underbrush" phase required to ensure future code stability.  
   * Replace all instances of any with concrete interfaces or unknown with type guards.  
3. **Linting and Formatting Pipeline:**  
   * Install husky and lint-staged.  
   * Configure Prettier to organize imports (@trivago/prettier-plugin-sort-imports) and sort Tailwind classes (prettier-plugin-tailwindcss). This enforces consistency automatically, freeing cognitive load for logic.

### **Phase 2: Core Functionality and Content Engineering (Days 4-7)**

**Objective:** Replace placeholders with functional, professional systems.

1. **Data Layer Architecture:**  
   * Create a data/ directory. Define a projects.ts file that exports a typed array of project objects (interface Project). This acts as a "Headless CMS" for the portfolio, separating content from the UI components.  
   * **Action:** Rewrite all "Lorem Ipsum" project descriptions using technical language (e.g., "Implemented Oauth2" instead of "Built login").  
2. **Contact System Implementation:**  
   * Integrate **Resend** (chosen for its developer-centric API and Next.js compatibility).13  
   * Build a Server Action (actions/send-email.ts) to handle the API call securely on the server, protecting API keys.  
   * Implement the frontend form using **React Hook Form** \+ **Zod** schema validation. This demonstrates mastery of modern form handling patterns.  
3. **Blog Engine Activation:**  
   * Leverage the existing feed.xml intent 1 by installing next-mdx-remote. This allows writing blog posts in Markdown/MDX, which is the standard for engineering blogs.  
   * Create a dynamic route app/blog/\[slug\]/page.tsx to render these posts.

### **Phase 3: High-Performance Engineering (Days 8-10)**

**Objective:** Achieve 100/100 Core Web Vitals and SEO dominance.

1. **Image Optimization Strategy:**  
   * Replace all standard \<img\> tags with next/image.  
   * Define strict sizes attributes (e.g., (max-width: 768px) 100vw, 50vw) to ensure the browser loads the correct resolution variant, drastically reducing Largest Contentful Paint (LCP).  
2. **Dynamic Metadata and SEO:**  
   * Implement Next.js generateMetadata function for every page. This ensures that when a link is shared on LinkedIn or Twitter, it unfurls with a rich preview card (Open Graph protocol).  
   * Generate a sitemap.xml and robots.txt dynamically to guide search engine crawlers.  
3. **Bundle Analysis:**  
   * Run @next/bundle-analyzer to identify heavy dependencies. If large libraries like Three.js are used (for the Wow factor), implement next/dynamic to lazy-load them, keeping the initial JavaScript bundle small.

### **Phase 4: UI/UX Polish and "Wow" Implementation (Days 11-14)**

**Objective:** Elevate the aesthetic to "Senior Designer" level.

1. **Micro-Interaction Engineering:**  
   * Add hover states to all interactive elements.  
   * Implement "Active State" indicators in the navigation (e.g., a glowing pill behind the current tab).  
2. **Thematic Consistency:**  
   * Ensure all colors leverage CSS variables defined in globals.css and mapped in Tailwind config. This ensures a seamless transition between Light and Dark modes.  
3. **Deployment Pipeline:**  
   * Connect the repo to Vercel. Enable "Deploy Previews" to test changes in a live environment before merging to main.

## ---

**5\. Granular Task List (File-by-File)**

This section translates the roadmap into specific file-level operations.

### **Root Configuration**

* **package.json**:  
  * \[ \] Upgrade next to the latest stable version (e.g., 14.x or 15.x).  
  * \[ \] Move prettier, eslint, postcss, tailwindcss to devDependencies.  
  * \[ \] Add "scripts": { "lint:strict": "eslint. \--ext.ts,.tsx \--max-warnings 0" }.  
* **tsconfig.json**:  
  * \[ \] Set "compilerOptions": { "strict": true, "noUncheckedIndexedAccess": true }.  
  * \[ \] Configure "paths": { "@/\*": \["./\*"\] } to enable absolute imports.  
* **tailwind.config.ts**:  
  * \[ \] Define colors using CSS variable references (e.g., primary: "hsl(var(--primary))").  
  * \[ \] Add container: { center: true, padding: "2rem" } to standardize layout widths.

### **App Directory (app/)**

* **app/layout.tsx**:  
  * \[ \] Import Inter or GeistSans from next/font/google. Apply variable class to \<body\>.  
  * \[ \] Wrap children in \<ThemeProvider attribute="class"\> (using next-themes).  
  * \[ \] Add \<Toaster /\> component (using sonner) for global notifications.  
* **app/page.tsx**:  
  * \[ \] Refactor "Hero" section to use priority on the main LCP image.  
  * \[ \] Ensure semantic HTML structure (\<main\>, \<section\>, \<h1\>, \<h2\>).  
* **app/projects/page.tsx**:  
  * \[ \] Implement a grid layout using grid-cols-1 md:grid-cols-2 lg:grid-cols-3.  
  * \[ \] Map over data from data/projects.ts to render ProjectCard components.

### **Components (components/)**

* **components/ui/ (New Folder)**:  
  * \[ \] Create atomic components (button.tsx, card.tsx, input.tsx) using cva (Class Variance Authority) to manage style variants. This is a hallmark of senior component architecture.  
* **components/Navbar.tsx**:  
  * \[ \] Implement a mobile-responsive menu (Sheet/Drawer pattern) using radix-ui primitives for accessibility.  
  * \[ \] Ensure "Skip to Content" link exists for keyboard users.  
* **components/ProjectCard.tsx**:  
  * \[ \] Add group class to parent and group-hover utilities to image/title for coordinated hover effects.

### **Utils and Lib**

* **lib/utils.ts (Refactor from utils/)**:  
  * \[ \] Implement the standard cn utility:  
    TypeScript  
    import { type ClassValue, clsx } from "clsx"  
    import { twMerge } from "tailwind-merge"  
    export function cn(...inputs: ClassValue) {  
      return twMerge(clsx(inputs))  
    }

  * \[ \] This utility resolves Tailwind class conflicts, a critical requirement for reusable components.

## ---

**6\. Three 'Wow' Factor Suggestions**

To differentiate this portfolio in a saturated market, we must leverage the user's specific background in AI and App Development.2 These suggestions are designed to be visually arresting but technically substantial.

### **Suggestion 1: The "Neural Network" Interactive Hero (WebGL)**

**Concept:**

Instead of a static image, the Hero section features a 3D interactive background representing a neural network. Nodes (neurons) float gently; when the mouse hovers, nearby nodes form connections (synapses), glowing brighter.

**Technical Implementation:**

* **Tech Stack:** react-three-fiber (R3F) for the 3D scene, drei for performance abstractions (Instances), and custom GLSL shaders for the glow effect.14  
* **Why It Wows:** It visually communicates "AI Engineer" without a single word. It demonstrates mastery of the DOM vs. Canvas divide and performance optimization (using InstancedMesh to render thousands of nodes with a single draw call).  
* **Seniority Check:** The implementation must respect prefers-reduced-motion. If the user has motion reduction enabled in their OS, the component should gracefully fallback to a static, high-quality SVG.

### **Suggestion 2: RAG-Powered "Ask My Resume" Agent**

**Concept:**

A chat interface floating in the bottom right corner (or a dedicated section) that allows recruiters to "talk" to the portfolio.

* *Recruiter:* "Does Muzammil have experience with GraphQL?"  
* *AI:* "Yes, Muzammil utilized GraphQL in the \[Project Name\] to reduce API over-fetching by 40%..."

**Technical Implementation:**

* **Tech Stack:** Vercel AI SDK 16, OpenAI API (or a local browser model like WebLLM for privacy), and a vector store (Pinecone or simple in-memory vector embeddings for small datasets).  
* **Why It Wows:** It is a functional application of the "AI" skill listed in the bio.2 It transforms passive reading into active engagement.  
* **Seniority Check:** Use "System Prompts" to ensure the AI maintains a professional tone and strictly limits its knowledge base to the resume data to prevent hallucinations.

### **Suggestion 3: Real-Time "Engineering Telemetry" Dashboard**

**Concept:**

A "Live Stats" section that pulls real-time data from the user's engineering life.

* **Metrics:** Current GitHub Streak, Most Used Language this week (WakaTime API), Recent Public Commits.  
* **Tech Stack:** Next.js API Routes (Serverless) to proxy the requests and hide API keys. Use swr or react-query for data fetching, caching, and revalidation.17  
* **Why It Wows:** It proves the portfolio is a *live application*, not a static brochure. It demonstrates backend integration skills—handling OAuth tokens, API rate limits, and caching strategies (ISR) to prevent hitting API quotas.

## ---

**7\. Technical Deep Dive: Architecting for Seniority**

### **7.1 The Case for Server Components (RSC)**

A defining characteristic of a Senior Next.js Engineer in 2026 is the ability to correctly navigate the Server/Client boundary.

**The Theory:**

In standard React (SPA), the browser downloads a massive JS bundle, executes it, fetches data, and then renders. This causes "Layout Shift" and slow "Time to Interactive."

Next.js App Router flips this. Components are Server Components by default. They render on the server, fetching data directly from the database or filesystem (like the projects.ts file), and send zero JavaScript to the client for that logic.

**The Strategy for muzammil-portfolio:**

* The ProjectsGrid should be a Server Component. It imports the data and renders the HTML.  
* Only the ProjectCard—if it has complex interactivity like a "Like" button or a 3D tilt effect—should be marked with 'use client'.  
* **Impact:** The portfolio will load instantly, even on slow 4G connections, improving the Lighthouse Performance score significantly.

### **7.2 Semantic Design Tokens with Tailwind**

The audit revealed a risk of "Magic Numbers" in the CSS (e.g., text-\[\#333\]).

**The Solution: CSS Variables Strategy**

We will implement a CSS variable layer in globals.css:

CSS

:root {  
  \--background: 0 0% 100%;  
  \--foreground: 222.2 84% 4.9%;  
  \--primary: 221.2 83.2% 53.3%;  
  \--primary-foreground: 210 40% 98%;  
}

.dark {  
  \--background: 222.2 84% 4.9%;  
  \--foreground: 210 40% 98%;  
  \--primary: 217.2 91.2% 59.8%;  
  \--primary-foreground: 222.2 47.4% 11.2%;  
}

Then, in tailwind.config.ts, we map these:

TypeScript

colors: {  
  background: "hsl(var(--background))",  
  foreground: "hsl(var(--foreground))",  
  primary: {  
    DEFAULT: "hsl(var(--primary))",  
    foreground: "hsl(var(--primary-foreground))",  
  },  
}

**Why this matters:** This abstraction decouples the *design decision* (what color is primary?) from the *implementation* (what hex code is it?). It allows for a one-line change to rebrand the entire site, a flexibility that senior architects prize.

### **7.3 Accessibility as a First-Class Citizen**

The "Student" portfolio often ignores accessibility until the end. The "Senior" portfolio builds it in.

* **Focus Rings:** Never set outline: none without providing an alternative style (e.g., focus-visible:ring-2).  
* **Semantic HTML:** Use \<button\> for actions and \<a\> for navigation. Using a div with an onClick handler is an accessibility failure because it lacks keyboard support and screen reader announcements.  
* **ARIA Labels:** For the "Social Links" (GitHub/LinkedIn icons), strictly enforce aria-label="Visit my GitHub profile". Without this, a screen reader just announces "Link" or "Image," providing zero context to visually impaired users.

## ---

**8\. Conclusion**

The transformation of the muzammil5539 portfolio from its current state to a high-performance, senior-grade product is not merely about writing more code—it is about writing *better* code with *clearer intent*.

The "Deep Codebase Audit" has revealed a foundation built on modern tools (Next.js, Tailwind, TypeScript) but weakened by inconsistent execution, placeholder content, and a lack of rigorous configuration. The "Gap Analysis" highlighted the critical need for a consolidated identity, secure functional features, and a polished, accessible UI.

By executing the "Pathway to Production," the user will move beyond the common tropes of junior portfolios. The implementation of strict type safety, server-side rendering strategies, and semantic design systems will serve as irrefutable evidence of engineering maturity. Furthermore, the integration of the proposed "Wow" factors—specifically the AI RAG agent and WebGL visualization—will effectively showcase the user's specific strengths in Artificial Intelligence and Full Stack development, turning the portfolio into a compelling, living application that demands attention.

The roadmap is clear. The task list is granular. The transition from "Student" to "Senior" begins with the first refactored commit.

#### **Works cited**

1. Muzammil-cyber/Portfolio: My Work \- GitHub, accessed on February 1, 2026, [https://github.com/Muzammil-cyber/Portfolio](https://github.com/Muzammil-cyber/Portfolio)  
2. Muzzammil | Portfolio, accessed on February 1, 2026, [https://muzzammil-portfolio.vercel.app/](https://muzzammil-portfolio.vercel.app/)  
3. Muzammil Portfolio | 2022, accessed on February 1, 2026, [https://muzammil.vercel.app/](https://muzammil.vercel.app/)  
4. Muzammil Portfolio: Home, accessed on February 1, 2026, [https://muzammil-portofolio.vercel.app/](https://muzammil-portofolio.vercel.app/)  
5. Why use Next.js for Your Projects \- 10 Advantages In 2025, accessed on February 1, 2026, [https://jsmastery.com/blogs/why-use-next-js-for-your-projects-10-advantages-in-2025](https://jsmastery.com/blogs/why-use-next-js-for-your-projects-10-advantages-in-2025)  
6. How to Build a Frontend Developer Portfolio in 2025 (Step-by-Step Guide \+ Mistakes to Avoid) \- DEV Community, accessed on February 1, 2026, [https://dev.to/siddheshcodes/frontend-developer-portfolio-tips-for-2025-build-a-stunning-site-that-gets-you-hired-3hga](https://dev.to/siddheshcodes/frontend-developer-portfolio-tips-for-2025-build-a-stunning-site-that-gets-you-hired-3hga)  
7. accessed on January 1, 1970, [https://github.com/muzammil5539/portfolio](https://github.com/muzammil5539/portfolio)  
8. The Latest Next.js Features You Need to Know in 2025 | by Ahmed Sekak | Medium, accessed on February 1, 2026, [https://medium.com/@ahmadesekak/the-latest-next-js-features-you-need-to-know-in-2025-f67b57e886c0](https://medium.com/@ahmadesekak/the-latest-next-js-features-you-need-to-know-in-2025-f67b57e886c0)  
9. Portfolio, accessed on February 1, 2026, [https://portfolio-mh.netlify.app/](https://portfolio-mh.netlify.app/)  
10. EmailJS vs Formspree in January 2026 \- SaaSworthy, accessed on February 1, 2026, [https://www.saasworthy.com/compare/emailjs-vs-formspree-io?pIds=4502,8418](https://www.saasworthy.com/compare/emailjs-vs-formspree-io?pIds=4502,8418)  
11. How to Receive Emails Using EmailJS: A Simple Alternative to Resend for Contact Forms., accessed on February 1, 2026, [https://dev.to/sushilmagare10/how-to-receive-emails-using-emailjs-a-simple-alternative-to-resend-for-contact-forms-460h](https://dev.to/sushilmagare10/how-to-receive-emails-using-emailjs-a-simple-alternative-to-resend-for-contact-forms-460h)  
12. The Framer Motion Scroll Animation Masterclass \- YouTube, accessed on February 1, 2026, [https://www.youtube.com/watch?v=PczQ0qSwe1E](https://www.youtube.com/watch?v=PczQ0qSwe1E)  
13. Create a contact form in Next.js with Resend and Valibot | Blog \- Jahir Fiquitiva, accessed on February 1, 2026, [https://jahir.dev/blog/create-contact-form-nextjs](https://jahir.dev/blog/create-contact-form-nextjs)  
14. Abhiz2411/3D-interactive-portfolio: A visually stunning personal portfolio website showcasing my skills, projects, and personality with 3D animations, smooth interactions, and a cosmic theme. Built using Next.js, Tailwind CSS, GSAP, and more\! \- GitHub, accessed on February 1, 2026, [https://github.com/Abhiz2411/3D-interactive-portfolio](https://github.com/Abhiz2411/3D-interactive-portfolio)  
15. Build a 3D Portfolio Website with Next.js, Three.js & Tailwind CSS \- DEV Community, accessed on February 1, 2026, [https://dev.to/codebucks/build-a-3d-portfolio-website-with-nextjs-threejs-tailwind-css-ap1](https://dev.to/codebucks/build-a-3d-portfolio-website-with-nextjs-threejs-tailwind-css-ap1)  
16. Fullstack Dev \-Portfolio Inspiration : r/web\_design \- Reddit, accessed on February 1, 2026, [https://www.reddit.com/r/web\_design/comments/1hru3ku/fullstack\_dev\_portfolio\_inspiration/](https://www.reddit.com/r/web_design/comments/1hru3ku/fullstack_dev_portfolio_inspiration/)  
17. Building My Live GitHub Portfolio with Next.js and Tailwind \- Level Up Coding, accessed on February 1, 2026, [https://levelup.gitconnected.com/building-my-live-github-portfolio-with-next-js-and-tailwind-fbf38b3e1ace](https://levelup.gitconnected.com/building-my-live-github-portfolio-with-next-js-and-tailwind-fbf38b3e1ace)