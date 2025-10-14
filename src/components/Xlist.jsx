import { useEffect, useRef } from "react";

export default function Xlist({
  listId = "1977888287458045976",
  height = 380, // small "thumbnail" card
  theme = "light", // use light for readability
  title = "Current Market News",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const scriptId = "twitter-wjs";
    const load = () => window.twttr?.widgets?.load(ref.current);

    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.async = true;
      s.src = "https://platform.twitter.com/widgets.js";
      s.onload = () => setTimeout(load, 0); 
      document.body.appendChild(s);
    } else {
        const t = setTimeout(load, 0);
        return () => clearTimeout(t);
      load();
    }
  }, [listId]);

  return (
    <div
      ref={ref}
      style={{
        background: "#ffffff",
        color: "#0B1220",
        border: "1px solid #dbe2f1",
        borderRadius: 16,
        padding: 12,
        width: 420,
        boxShadow: "0 8px 24px rgba(15,23,42,0.12)",
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
        {title}
      </div>

      {/* The script transforms this into the embedded timeline */}
      <a
        className="twitter-timeline"
        data-theme={theme}
        data-height={String(height)}
        data-chrome="noheader nofooter noborders transparent"
        data-tweet-limit="1"
        href={`https://twitter.com/i/lists/${listId}`}
      >
        Click to view latest news
      </a>
    </div>
  );
}
