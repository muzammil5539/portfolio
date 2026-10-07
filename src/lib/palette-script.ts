export const PALETTE_KEY = "palette";

/** Inline script (runs before first paint): applies ?theme= or the saved palette to <html>. */
export const paletteInitScript = (ids: string[]) =>
  `(function(){try{var ids=${JSON.stringify(ids)};var q=new URLSearchParams(location.search).get("theme");var p=ids.indexOf(q)>-1?q:localStorage.getItem("${PALETTE_KEY}");if(ids.indexOf(p)>-1){document.documentElement.setAttribute("data-palette",p);if(q===p)localStorage.setItem("${PALETTE_KEY}",p)}}catch(e){}})()`;
