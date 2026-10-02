import React, { useEffect, useRef, useMemo } from 'react';

/**
 * AtmosphericBackground Component
 * Dynamically computes ambient atmospheric environment from live weather telemetry:
 * - CLEAR (Day): Warm off-white with very subtle green/gray atmosphere
 * - CLEAR (Night): Dark atmospheric effect ONLY when actual night state is required
 * - CLOUDY: Muted blue-gray overcast atmosphere with drifting cloud layers
 * - RAIN: Dark moody storm-gray with subtle procedural rain streaks
 * - STORM: Deep dramatic charcoal clouds with subtle distant atmospheric flash
 * - SUNSET: Warm amber-indigo atmospheric twilight gradient
 * - FOG: Soft low-contrast misty haze
 *
 * Built with procedural CSS gradients + HTML5 Canvas particle layer.
 * Fully respects prefers-reduced-motion.
 */
export default function AtmosphericBackground({ weather, condition = 'Clear Sky', weatherCode = 0, sunrise, sunset }) {
  const canvasRef = useRef(null);

  // Determine current atmospheric category
  const atmosphericState = useMemo(() => {
    const code = Number(weatherCode) || 0;
    const now = new Date();
    const currentHour = now.getHours();

    // Check if it's nighttime or sunset
    let isNight = currentHour < 6 || currentHour >= 19;
    let isSunset = (currentHour >= 17 && currentHour < 19);

    if (sunrise && sunset) {
      try {
        const riseDate = new Date(sunrise);
        const setDate = new Date(sunset);
        const sunsetBuffer = new Date(setDate.getTime() - 45 * 60 * 1000);
        const duskBuffer = new Date(setDate.getTime() + 45 * 60 * 1000);

        if (now >= sunsetBuffer && now <= duskBuffer) {
          isSunset = true;
          isNight = false;
        } else if (now < riseDate || now > duskBuffer) {
          isNight = true;
          isSunset = false;
        } else {
          isNight = false;
          isSunset = false;
        }
      } catch (e) {
        // fallback to hour-based calculation
      }
    }

    // Map WMO codes
    if ([95, 96, 99].includes(code)) return 'storm';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'rain';
    if ([71, 73, 75, 85, 86].includes(code)) return 'snow';
    if ([45, 48].includes(code)) return 'fog';
    if ([2, 3].includes(code)) return 'cloudy';

    if (isSunset) return 'sunset';
    if (isNight) return 'night';
    return 'clear';
  }, [weatherCode, sunrise, sunset]);

  // Particle Canvas for Rain, Stars, Snow, or Fog
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return () => window.removeEventListener('resize', handleResize);
    }

    // Initialize particles depending on atmospheric category
    const particles = [];
    const count = atmosphericState === 'rain' ? 65 :
                  atmosphericState === 'storm' ? 90 :
                  atmosphericState === 'snow' ? 50 :
                  atmosphericState === 'night' ? 70 :
                  atmosphericState === 'fog' ? 25 : 30;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: atmosphericState === 'rain' ? 12 + Math.random() * 8 :
               atmosphericState === 'storm' ? 18 + Math.random() * 10 :
               atmosphericState === 'snow' ? 1 + Math.random() * 1.5 :
               atmosphericState === 'fog' ? 0.3 + Math.random() * 0.4 :
               0.2 + Math.random() * 0.5,
        length: atmosphericState === 'rain' || atmosphericState === 'storm' ? 15 + Math.random() * 15 : 2,
        radius: atmosphericState === 'night' ? Math.random() * 1.6 :
                atmosphericState === 'snow' ? 2 + Math.random() * 2 :
                atmosphericState === 'fog' ? 40 + Math.random() * 60 : 1.5,
        opacity: Math.random() * 0.7 + 0.2,
        twinkleSpeed: 0.015 + Math.random() * 0.02
      });
    }

    let lightningTimer = 0;
    let isFlashing = false;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Distant subtle storm flash
      if (atmosphericState === 'storm') {
        lightningTimer++;
        if (lightningTimer > 320 && Math.random() < 0.015) {
          isFlashing = true;
          lightningTimer = 0;
          setTimeout(() => { isFlashing = false; }, 120);
        }
        if (isFlashing) {
          ctx.fillStyle = 'rgba(186, 230, 253, 0.06)';
          ctx.fillRect(0, 0, width, height);
        }
      }

      particles.forEach((p) => {
        if (atmosphericState === 'rain' || atmosphericState === 'storm') {
          ctx.strokeStyle = `rgba(100, 116, 139, ${p.opacity * 0.4})`;
          ctx.lineWidth = atmosphericState === 'storm' ? 1.4 : 1.0;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 2, p.y + p.length);
          ctx.stroke();

          p.y += p.speed;
          p.x -= 1.2;
          if (p.y > height) {
            p.y = -p.length;
            p.x = Math.random() * width;
          }
        } else if (atmosphericState === 'snow') {
          ctx.fillStyle = `rgba(225, 229, 225, ${p.opacity * 0.7})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          p.y += p.speed;
          p.x += Math.sin(p.y * 0.02) * 0.5;
          if (p.y > height) {
            p.y = -5;
            p.x = Math.random() * width;
          }
        } else if (atmosphericState === 'night') {
          p.opacity += p.twinkleSpeed;
          if (p.opacity > 0.7 || p.opacity < 0.15) {
            p.twinkleSpeed = -p.twinkleSpeed;
          }
          ctx.fillStyle = `rgba(104, 113, 107, ${Math.max(0.1, p.opacity * 0.5)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (atmosphericState === 'fog') {
          ctx.fillStyle = `rgba(225, 229, 225, ${p.opacity * 0.06})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          p.x += p.speed;
          if (p.x - p.radius > width) {
            p.x = -p.radius;
            p.y = Math.random() * height;
          }
        } else {
          // Clear / Sunset ambient floating subtle particles
          ctx.fillStyle = atmosphericState === 'sunset'
            ? `rgba(181, 138, 69, ${p.opacity * 0.18})`
            : `rgba(96, 125, 104, ${p.opacity * 0.15})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          p.y -= p.speed;
          if (p.y < 0) {
            p.y = height;
            p.x = Math.random() * width;
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [atmosphericState]);

  return (
    <div className={`atmospheric-backdrop atmospheric-${atmosphericState}`}>
      {/* Dynamic layered atmospheric color gradients */}
      <div className="atmospheric-layer sky-gradient" />
      <div className="atmospheric-layer ambient-glow" />
      <div className="atmospheric-layer cloud-parallax" />
      
      {/* Procedural Canvas Particles */}
      <canvas ref={canvasRef} className="atmospheric-canvas" />

      {/* Subtle Cinematic Film Grain & Vignette */}
      <div className="atmospheric-layer film-grain" />
      <div className="atmospheric-layer soft-vignette" />
    </div>
  );
}
