"use client";

export const ScrollVideo = ({ src, alt }) => {
  const ref = React.useRef(null);
  const [hasPlayed, setHasPlayed] = React.useState(false);
  const [isLight, setIsLight] = React.useState(false);

  React.useEffect(() => {
    const html = document.documentElement;
    const check = () => setIsLight(html.style.colorScheme !== 'dark');
    check();
    const obs = new MutationObserver(check);
    obs.observe(html, { attributes: true, attributeFilter: ['style'] });
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          video.currentTime = 0;
          video.play().catch(() => {});
          setHasPlayed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [hasPlayed]);

  const base = src.replace(/\.[^.]+$/, '');

  return (
    // Note: we use NO background here because we want the video to be transparent and blend in with the background.
    <div style={{ borderRadius: 10, overflow: 'hidden', marginTop: 8, marginBottom: 8 }}>  
      <video
        ref={ref}
        muted
        playsInline
        preload="auto"
        aria-label={alt}
        style={{
          width: "100%",
          display: "block",
          filter: isLight ? "invert(1) hue-rotate(180deg) contrast(1) saturate(1)" : "none",
        }}
      >
        <source src={`${base}.webm`} type="video/webm" />
      </video>
    </div>
  );
};
