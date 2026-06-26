"use client";
import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lagged, setLagged] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if device supports hover (pointer: fine)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    // Track clickables to animate size/scale
    const addListeners = () => {
      const clickables = document.querySelectorAll(
        'a, button, select, input, textarea, [role="button"], [onClick], .cursor-pointer'
      );
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    addListeners();

    // Re-bind when DOM changes
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [visible]);

  useEffect(() => {
    const animate = () => {
      setLagged((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position]);

  if (!visible) return null;

  // Calculate tilt details for 3D effect
  const dx = position.x - lagged.x;
  const dy = position.y - lagged.y;
  
  // Limiting maximum tilt angle
  const maxTilt = 45; 
  const tiltX = Math.min(Math.max(dy * 0.8, -maxTilt), maxTilt);
  const tiltY = Math.min(Math.max(-dx * 0.8, -maxTilt), maxTilt);
  
  // Outer circle scale booster on speed
  const speed = Math.sqrt(dx * dx + dy * dy);
  const speedScale = Math.min(speed * 0.015, 0.4); 
  const scale = isHovered ? 1.6 : 1 + speedScale;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none">
      {/* 3D Aura Ring */}
      <div
        className="absolute w-8 h-8 rounded-full border border-primary-500 bg-primary-500/10 mix-blend-difference shadow-[0_0_12px_rgba(79,70,229,0.2)] flex items-center justify-center transition-all duration-75"
        style={{
          left: lagged.x - 16,
          top: lagged.y - 16,
          transform: `translate3d(0, 0, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`,
          transformStyle: "preserve-3d",
          perspective: 800,
        }}
      >
        {/* Sub-glowing ring for 3D depth */}
        <div
          className="absolute inset-0.5 rounded-full border border-indigo-400/40"
          style={{
            transform: "translateZ(3px)",
          }}
        />
      </div>

      {/* Center Dot */}
      <div
        className="absolute w-1.5 h-1.5 bg-primary-500 rounded-full mix-blend-difference"
        style={{
          left: position.x - 3,
          top: position.y - 3,
        }}
      />
    </div>
  );
}
