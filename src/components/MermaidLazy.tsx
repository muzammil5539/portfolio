"use client";
import dynamic from "next/dynamic";

// mermaid is a large client-only library; load it only when a post actually renders a diagram.
export default dynamic(() => import("./Mermaid"), {
  ssr: false,
  loading: () => <div className="my-8 h-40 w-full animate-pulse rounded-xl bg-surface" />,
});
