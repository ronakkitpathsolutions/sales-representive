import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function PageNotFound() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 80; i++) {
        particlesRef.current.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(161, 161, 170, ${particle.opacity})`;
        ctx.fill();

        // Draw connections to nearby particles
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(161, 161, 170, ${0.1 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const [glitchText, setGlitchText] = useState('404');

  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const originalText = '404';

    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        const glitched = originalText
          .split('')
          .map(char =>
            Math.random() < 0.3
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char
          )
          .join('');

        setGlitchText(glitched);

        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, 200);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 relative overflow-hidden flex items-center justify-center">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'transparent' }}
      />

      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Subtle Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-zinc-300/5 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* 404 Text with Glitch Effect */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-zinc-100 font-mono tracking-wider">
            {glitchText}
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-zinc-400/20 blur-sm font-mono tracking-wider">
            404
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-zinc-200 mb-4 font-mono">
            PAGE_NOT_FOUND
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            The requested resource could not be located on this server. Please
            verify the URL or navigate back to a known location.
          </p>
        </div>

        {/* Terminal-style Divider */}
        <div className="flex items-center justify-center mb-8 font-mono text-zinc-600">
          <span>{'>'}</span>
          <div className="mx-2 h-px bg-zinc-600 flex-1 max-w-xs" />
          <span className="animate-pulse">_</span>
          <div className="mx-2 h-px bg-zinc-600 flex-1 max-w-xs" />
          <span>{'<'}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* <Link href="/"> */}
          <Button
            size="lg"
            // className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-0 px-8 py-3 text-lg font-semibold transition-all duration-300 font-mono"
          >
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Button>
          {/* </Link> */}
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            // className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500 px-8 py-3 text-lg font-semibold transition-all duration-300 font-mono"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>

        {/* Status Display */}
        {/* <div className="mt-12 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded border border-zinc-700 bg-zinc-900/50 text-zinc-400 text-sm font-mono">
            <div className="w-2 h-2 bg-zinc-500 rounded-full mr-2 animate-pulse" />
            STATUS: 404 | ERROR_CODE: NOT_FOUND
          </div>
        </div> */}

        {/* Terminal Cursor */}
        {/* <div className="mt-8 text-left max-w-md mx-auto">
          <div className="bg-zinc-900/50 border border-zinc-700 rounded p-4 font-mono text-sm">
            <div className="text-zinc-500">$ locate page</div>
            <div className="text-zinc-400">locate: page not found</div>
            <div className="text-zinc-500 flex items-center">
              $ <span className="ml-2 animate-pulse">_</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
