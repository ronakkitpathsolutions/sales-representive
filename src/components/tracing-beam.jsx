import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export const TracingBeam = ({ children, className }) => {
  const ref = useRef(null);
  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [beamPosition, setBeamPosition] = useState(50);
  const [beamEnd, setBeamEnd] = useState(50);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());

  console.log('scrollVelocity', scrollVelocity);

  // Calculate SVG height based on content
  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const start = rect.top + scrollY - windowHeight;
      const end = rect.top + scrollY + rect.height;
      const current = Math.max(
        0,
        Math.min(1, (scrollY - start) / (end - start))
      );

      setScrollProgress(current);

      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime;

      if (timeDiff > 0) {
        const rawVelocity = (Math.abs(scrollY - lastScrollY) / timeDiff) * 100;
        setScrollVelocity(prev => prev * 0.8 + rawVelocity * 0.2);
      }

      setLastScrollY(scrollY);
      setLastScrollTime(currentTime);

      const targetBeamPosition = 50 + (svgHeight - 100) * current;
      setBeamPosition(prev => prev + (targetBeamPosition - prev) * 0.1);

      const targetBeamEnd = 50 + (svgHeight - 250) * current;
      setBeamEnd(prev => prev + (targetBeamEnd - prev) * 0.05);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [svgHeight, lastScrollY, lastScrollTime]);

  return (
    <div
      ref={ref}
      className={cn('relative mx-auto h-full w-full max-w-6xl', className)}
    >
      <div className="absolute top-3 -left-4 md:-left-20">
        <div
          className={cn(
            'ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border border-neutral-200 shadow-sm',
            scrollProgress > 0
              ? 'shadow-none'
              : 'shadow-[rgba(0,0,0,0.24)_0px_3px_8px]'
          )}
        >
          <div
            className={cn(
              'h-2 w-2 rounded-full border',
              scrollProgress > 0
                ? 'border-white bg-white'
                : 'border-blue-600 bg-blue-500'
            )}
          />
        </div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          <path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
          />
          <path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
          />
          <defs>
            <linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={beamPosition}
              y2={beamEnd}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop stopColor="#18CCFC" />
              <stop offset="0.325" stopColor="#6344F5" />
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </div>
  );
};
