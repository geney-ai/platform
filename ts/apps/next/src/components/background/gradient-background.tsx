export default function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Animated gradient orbs with dynamic movement - BRIGHT TEAL ONLY */}
      <div className="absolute inset-0">
        {/* Primary orb - Bright Teal - Moving in circles */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px]">
          <div className="w-full h-full bg-accent/60 rounded-full blur-[80px] animate-blob" />
        </div>

        {/* Secondary orb - Bright Teal - Reverse movement */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px]">
          <div className="w-full h-full bg-accent/50 rounded-full blur-[80px] animate-blob-reverse animation-delay-2000" />
        </div>

        {/* Tertiary orb - Pure Teal - Drifting */}
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px]">
          <div className="w-full h-full bg-accent/45 rounded-full blur-[100px] animate-drift" />
        </div>

        {/* Floating orb - Bright Teal */}
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -ml-[200px] -mt-[200px]">
          <div className="w-full h-full bg-accent/40 rounded-full blur-[60px] animate-float" />
        </div>

        {/* Orbiting orb - Light Teal */}
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -ml-[150px] -mt-[150px]">
          <div className="w-full h-full bg-accent/35 rounded-full blur-[80px] animate-orbit" />
        </div>

        {/* Small fast-moving orb - Bright Teal */}
        <div className="absolute bottom-1/3 right-1/3 w-[350px] h-[350px]">
          <div className="w-full h-full bg-accent/50 rounded-full blur-[60px] animate-blob animation-delay-2000" />
        </div>

        {/* Teal mesh gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      </div>

      {/* Very light overlay to maintain some readability */}
      <div className="absolute inset-0 bg-background/20" />

      {/* Noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
