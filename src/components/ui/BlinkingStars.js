import React, { useEffect, useRef } from "react";

const BlinkingStars = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["white", "#FFD700", "#87CEEB", "#FF69B4"];
    const stars = Array.from({ length: 1000 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1 + 0.5,
      opacity: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.opacity += star.speed;
        if (star.opacity >= 1 || star.opacity <= 0) {
          star.speed *= -1;
        }
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block", background: "black" }} />;
};

export default BlinkingStars;