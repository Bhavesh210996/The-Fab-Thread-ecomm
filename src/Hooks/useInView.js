import { useEffect, useRef, useState } from "react";

export default function useInView(options = {}) {
  const ref = useRef();
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenInView) {
          setHasBeenInView(true);
        }
    },
      options
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options, hasBeenInView]);

  return [ref, hasBeenInView];
}