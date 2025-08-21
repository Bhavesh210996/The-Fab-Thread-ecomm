import React, { useRef, useEffect } from "react";

const EcommerceBackground = () => {
  const canvasRef = useRef(null);
  let particles = [];
  const icons = ["🛒", "💳", "📦", "⭐", "👕", "👗", "🛍️"];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas to parent container instead of window
    function resizeCanvas() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.color = `hsla(${Math.random() * 60 + 200}, 100%, 70%, 0.5)`;
        this.isIcon = Math.random() < 0.3;
        if (this.isIcon) {
          this.icon = icons[Math.floor(Math.random() * icons.length)];
          this.fontSize = Math.random() * 16 + 14;
        }
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        if (this.isIcon) {
          ctx.font = `${this.fontSize}px Arial`;
          ctx.fillStyle = "rgba(255,255,255,0.9)";
          ctx.fillText(this.icon, this.x, this.y);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = this.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(10, 10, 10, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="hero-wrapper">
      <canvas ref={canvasRef} className="hero-canvas" />
    </div>
  );
};

export default EcommerceBackground;
