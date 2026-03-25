"use client";

export const ScrollVideo = ({ src, alt }) => {
  const ref = React.useRef(null);
  const [hasPlayed, setHasPlayed] = React.useState(false);

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

  return (
    <video
      ref={ref}
      muted
      playsInline
      preload="auto"
      aria-label={alt}
      style={{
        width: "100%",
        borderRadius: 10,
        marginTop: 8,
        marginBottom: 8,
        display: "block",
      }}
    >
      <source src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
    </video>
  );
};
