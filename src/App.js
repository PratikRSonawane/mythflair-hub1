import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Scroll, Feather, Info, ArrowRight, Menu, X, 
  PlayCircle, Sun, Moon, Users, Sparkles 
} from 'lucide-react';

// --- ASSETS ---
// Ensure these files are in your 'public' folder
const bannerImage = "1.png"; 
const heroVideo = "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1610-large.mp4";
const circularLogo = "c.png";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');
          
          /* --- CSS VARIABLES --- */
          :root {
            /* --- Core Colors --- */
            --primary: #c4b5fd;
            --primary-dark: #7c3aed;
            
            /* --- Dark Mode Defaults --- */
            --bg-main: #020617; 
            --bg-card: rgba(30, 41, 59, 0.7);
            --text-main: #e5e7eb;
            --text-muted: #9ca3af;
            --glass: rgba(15, 23, 42, 0.85);
            --glass-border: rgba(255, 255, 255, 0.1);
            --shadow: 0 20px 40px rgba(0,0,0,0.4);
            --feature-bg: #0f172a;
            
            /* --- Hero Specifics (Dark) --- */
            --hero-title-gradient: linear-gradient(to right, #e9d5ff, #c4b5fd);
            --hero-subtitle: #cbd5e1;
            --hero-content-bg: transparent; 
            --hero-overlay-gradient: linear-gradient(to top, var(--bg-main) 5%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%);
            --hero-shadow: none;
          }

          /* --- Light Mode Overrides --- */
          .App[data-theme='light'] {
            --primary: #7c3aed;
            --primary-dark: #5b21b6;
            
            --bg-main: #f8fafc;
            --bg-card: rgba(255, 255, 255, 0.9);
            --text-main: #1e293b;
            --text-muted: #64748b;
            --glass: rgba(255, 255, 255, 0.85);
            --glass-border: rgba(0, 0, 0, 0.1);
            --shadow: 0 20px 40px rgba(0,0,0,0.1);
            --feature-bg: #e2e8f0;

            /* --- Hero Specifics (Light) --- */
            --hero-title-gradient: linear-gradient(to right, #4c1d95, #7c3aed); 
            --hero-subtitle: #334155; 
            --hero-content-bg: rgba(255, 255, 255, 0.65); 
            --hero-overlay-gradient: linear-gradient(to top, var(--bg-main) 5%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%);
            --hero-shadow: 0 10px 40px rgba(0,0,0,0.1);
          }

          body, html { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; overflow-x: hidden; }

          /* Main App Wrapper */
          .App {
            background-color: var(--bg-main);
            color: var(--text-main);
            min-height: 100vh;
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          /* --- UTILITIES --- */
          .desktop-only { display: flex; }
          .mobile-only { display: none; }

          /* --- NAVBAR --- */
          .navbar {
            position: fixed; top: 0; left: 0; right: 0; z-index: 100;
            padding: 0.75rem 2rem; /* Reduced padding from 1.5rem */
            transition: all 0.3s ease;
            display: flex; justify-content: center;
          }
          .navbar.scrolled {
            background: var(--glass);
            backdrop-filter: blur(12px);
            padding: 0.5rem 2rem; /* Reduced scrolled padding */
            border-bottom: 1px solid var(--glass-border);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }
          .nav-content { width: 100%; max-width: 1200px; display: flex; justify-content: space-between; align-items: center; }
          .nav-links { display: flex; gap: 2rem; align-items: center; }
          .nav-link { color: var(--text-muted); text-decoration: none; font-weight: 500; transition: color 0.2s; }
          .nav-link:hover { color: var(--text-main); }
          .nav-btn {
            background: var(--primary-dark); color: white; padding: 0.5rem 1.25rem;
            border-radius: 99px; text-decoration: none; font-weight: 600;
            transition: all 0.2s;
            box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
          }
          .nav-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
          
          .theme-toggle {
            background: transparent; border: 1px solid var(--glass-border); 
            cursor: pointer; color: var(--text-main);
            padding: 0.5rem; border-radius: 50%; transition: all 0.2s;
            display: flex; align-items: center; justify-content: center;
          }
          .theme-toggle:hover { background: var(--glass-border); transform: rotate(15deg); }

          /* --- HERO SECTION (VIDEO) --- */
          .hero-section {
            position: relative; height: 85vh; width: 100%;
            display: flex; align-items: center; justify-content: center;
            overflow: hidden; margin-bottom: -6rem; 
          }
          .hero-bg { position: absolute; inset: 0; z-index: 0; }
          .hero-bg video { width: 100%; height: 100%; object-fit: cover; opacity: 0.7; }
          .hero-overlay {
            position: absolute; inset: 0;
            background: var(--hero-overlay-gradient);
            z-index: 1;
          }
          .hero-content {
            position: relative; z-index: 10; text-align: center; 
            padding: 2rem 3rem; margin-top: -4rem;
            animation: fadeUp 1s ease-out forwards;
            background: var(--hero-content-bg);
            border-radius: 24px;
            backdrop-filter: blur(8px);
            box-shadow: var(--hero-shadow);
          }
          @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

          .hero-title {
            font-family: 'Playfair Display', serif;
            font-size: clamp(3.5rem, 10vw, 6rem); margin: 0;
            background: var(--hero-title-gradient); 
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(139, 92, 246, 0.5); line-height: 1.1;
          }
          .hero-subtitle {
            font-size: clamp(1.1rem, 4vw, 1.3rem); 
            color: var(--hero-subtitle); 
            margin-top: 1rem; font-weight: 400; 
            text-shadow: 0 2px 4px rgba(0,0,0,0.1); 
          }

          /* --- GRID & CARDS --- */
          .content-wrapper { position: relative; z-index: 20; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem 4rem 1.5rem; }
          
          .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }

          .glass-card {
            background: var(--bg-card); 
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border); border-radius: 24px; padding: 2rem;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: relative; overflow: hidden; display: flex; flex-direction: column;
            text-decoration: none; color: inherit; 
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.2);
          }
          .glass-card:hover {
            transform: translateY(-8px); 
            box-shadow: var(--shadow);
            border-color: var(--primary);
          }
          .card-icon-wrapper {
            width: 48px; height: 48px; 
            background: rgba(139, 92, 246, 0.15);
            border-radius: 14px; display: flex; align-items: center; justify-content: center;
            margin-bottom: 1.5rem; color: var(--primary);
          }
          .tag {
            font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
            padding: 0.3rem 0.8rem; border-radius: 99px; margin-top: auto; display: inline-block;
          }
          .tag-muted { background: var(--glass-border); color: var(--text-muted); }
          .tag-accent { background: rgba(139, 92, 246, 0.1); color: var(--primary); border: 1px solid rgba(139, 92, 246, 0.2); }

          /* --- ABOUT SECTION --- */
          .about-section {
            margin-top: 6rem; padding: 4rem 2rem;
            background: var(--glass); border-radius: 32px;
            border: 1px solid var(--glass-border);
            display: flex; flex-direction: column; align-items: center; text-align: center;
            backdrop-filter: blur(10px);
          }
          .about-text { max-width: 700px; color: var(--text-muted); line-height: 1.8; margin-bottom: 2rem; font-size: 1.1rem; }

          /* --- BANNER (Moved After About) --- */
          .image-banner {
            margin-top: 4rem;
            width: 100%; height: 400px;
            border-radius: 32px; overflow: hidden; position: relative;
            border: 1px solid var(--glass-border); box-shadow: var(--shadow);
          }
          .image-banner img {
            width: 100%; height: 100%; object-fit: cover;
            transition: transform 1s ease;
          }
          .image-banner:hover img { transform: scale(1.05); }
          .banner-overlay {
            position: absolute; bottom: 0; left: 0; right: 0; padding: 3rem;
            background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
            color: white;
          }

          /* --- STAY TUNED BOX --- */
          .info-box {
            background: linear-gradient(135deg, var(--primary-dark), #4f46e5);
            border-radius: 24px; padding: 4rem 2rem; text-align: center;
            color: white; margin-top: 4rem; position: relative; overflow: hidden;
            box-shadow: 0 20px 40px -10px rgba(79, 70, 229, 0.4);
          }

          /* --- FEATURE SECTION (Bottom) --- */
          .feature-section {
            border-top: 1px solid var(--glass-border);
            padding: 6rem 1.5rem;
            background: var(--feature-bg);
            margin-top: 4rem;
          }
          .feature-container {
            max-width: 1100px; margin: 0 auto;
            display: flex; gap: 4rem; align-items: center;
          }
          .video-preview {
            flex: 1; aspect-ratio: 16/9;
            background: #000; border-radius: 20px;
            display: flex; align-items: center; justify-content: center;
            border: 1px solid var(--glass-border);
            position: relative; overflow: hidden; cursor: pointer;
            box-shadow: 0 20px 50px rgba(0,0,0,0.3);
            transition: transform 0.3s ease;
          }
          .video-preview:hover { transform: scale(1.02); }
          .video-bg {
            position: absolute; inset: 0; background-size: cover; opacity: 0.6;
            transition: transform 0.5s;
          }
          .video-preview:hover .video-bg { transform: scale(1.1); }

          /* --- FOOTER --- */
          .footer {
            text-align: center; padding: 4rem 2rem; 
            color: var(--text-muted); fontSize: 0.9rem; 
            background: var(--bg-main); 
            border-top: 1px solid var(--glass-border);
          }

          /* --- MOBILE MENU --- */
          .mobile-menu-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: var(--bg-main); z-index: 99;
            padding: 6rem 2rem;
            display: flex; flex-direction: column; gap: 2rem;
            transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .mobile-menu-overlay.open { transform: translateX(0); }
          .mobile-link { font-size: 1.8rem; font-weight: 700; color: var(--text-main); text-decoration: none; }

          /* --- RESPONSIVE ADJUSTMENTS --- */
          @media (max-width: 768px) {
            .desktop-only { display: none; }
            .mobile-only { display: flex; }
            
            .navbar { padding: 0.8rem 1.5rem; } /* Reduced mobile navbar padding */
            .hero-title { font-size: 3.5rem; }
            .hero-section { height: 80vh; }
            
            .feature-container { flex-direction: column; gap: 2rem; }
            .image-banner { height: 250px; border-radius: 20px; margin-top: 3rem; }
            
            /* Two Column Grid for Mobile */
            .grid { 
              grid-template-columns: 1fr 1fr; 
              gap: 1rem; 
            }
            .grid-item-full { grid-column: 1 / -1; }
            
            .glass-card { padding: 1.5rem; border-radius: 20px; }
            .card-icon-wrapper { width: 40px; height: 40px; margin-bottom: 1rem; border-radius: 10px; }
            .glass-card h2 { font-size: 1.2rem !important; }
            .glass-card p { font-size: 0.85rem !important; line-height: 1.5; }
            
            .about-section { padding: 2rem 1.5rem; margin-top: 4rem; }
            .info-box { padding: 3rem 1.5rem; }
          }
        `}
      </style>

      {/* Main Wrapper with data-theme attribute */}
      <div className="App" data-theme={theme}>
        
        {/* --- NAVIGATION --- */}
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
          <div className="nav-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <img src={circularLogo} alt="MythFlair Logo" style={{ width: '65px', height: '65px', borderRadius: '50%', objectFit: 'cover' }} />
              <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-main)' }}>MythFlair</span>
            </div>

            {/* Desktop Menu */}
            <div className="nav-links desktop-only">
              <a href="#updates" className="nav-link">Latest</a>
              <a href="#wiki" className="nav-link">Wiki</a>
              <a href="#about" className="nav-link">About</a>
              <a href="https://blog.mythflair.com" className="nav-link">Blog</a>
              
              <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <a href="#join" className="nav-btn">Join Universe</a>
            </div>

            {/* Mobile Menu Controls */}
            <div className="mobile-only" style={{ gap: '1rem', alignItems: 'center' }}>
               <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
               </button>
               {/* Toggle Button handles both open and close states */}
               <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}>
                 {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
               </button>
            </div>
          </div>
        </nav>

        {/* --- MOBILE MENU OVERLAY --- */}
        <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
          <a href="#updates" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Latest Updates</a>
          <a href="#wiki" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Wiki</a>
          <a href="#about" className="mobile-link" onClick={() => setIsMenuOpen(false)}>About Us</a>
          <a href="https://blog.mythflair.com" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Dev Blog</a>
        </div>

        {/* --- HERO SECTION (Video) --- */}
        <header className="hero-section">
          <div className="hero-bg">
            <video autoPlay loop muted playsInline>
              <source src={heroVideo} type="video/mp4" />
            </video>
          </div>
          <div className="hero-overlay"></div>
          
          <div className="hero-content">
            <h1 className="hero-title">MythFlair</h1>
            <p className="hero-subtitle">
              One home for all your worlds.<br/>
              <span style={{ color: 'var(--primary)' }}>Web novels. Deep Lore. Endless Adventure.</span>
            </p>
          </div>
        </header>

        {/* --- MAIN CONTENT --- */}
        <div className="content-wrapper">
          
          {/* Grid Cards */}
          <div className="grid">
            {/* Card 1 */}
            <div className="glass-card">
              <div className="card-icon-wrapper">
                <BookOpen size={22} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Web Novels</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1 }}>
                Dive into original, serialized stories.
              </p>
              <span className="tag tag-muted">Coming Soon</span>
            </div>

            {/* Card 2 */}
            <div className="glass-card">
              <div className="card-icon-wrapper">
                <Scroll size={22} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Wiki</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1 }}>
                 Explore characters, worlds, and secrets.
              </p>
              <span className="tag tag-muted">Planned</span>
            </div>

            {/* Card 3 - Full Width on Mobile */}
            <a href="https://blog.mythflair.com" className="glass-card grid-item-full" style={{ borderColor: 'rgba(139, 92, 246, 0.4)' }}>
              <div className="card-icon-wrapper" style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#f472b6' }}>
                <Feather size={22} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Dev Blog & Updates</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1 }}>
                Read updates, universe details, and important announcements.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                Read Now <ArrowRight size={16} />
              </div>
            </a>
          </div>

          {/* --- ABOUT US SECTION --- */}
          <div id="about" className="about-section">
             <div style={{ padding: '1rem', background: 'var(--glass-border)', borderRadius: '50%', marginBottom: '1.5rem' }}>
                <Users size={32} color="var(--primary)" />
             </div>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>About Mythflair</h2>
             <p className="about-text">
               Mythflair is a passion project dedicated to weaving interconnected narratives. 
               Our goal is to create a sanctuary for fans of blogs, anime, manga, and more, 
               where web novels aren't just read—they are explored.
             </p>
             <button className="nav-btn" style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}>
               Read Our Manifesto
             </button>
          </div>

          {/* --- BANNER IMAGE SECTION --- */}
          <div className="image-banner">
             <img src={bannerImage} alt="Mythflair Landscape" />
             <div className="banner-overlay">
                <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>A Universe Awaits</h3>
                <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>Discover the crystals of eternity.</p>
             </div>
          </div>

          {/* --- STAY TUNED (Replaced Newsletter) --- */}
          <div className="info-box">
             <div style={{ position: 'absolute', top: '-20px', left: '-20px' }}><Sparkles size={100} opacity={0.2} /></div>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Stay Tuned</h2>
             <p style={{ marginBottom: '2rem', opacity: 0.9, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                New chapters, blog posts, and anime discussions are posted regularly. 
                Check the Dev Blog for the latest updates.
             </p>
             <a href="https://blog.mythflair.com" target="_blank" rel="noopener noreferrer" className="nav-btn" style={{ background: 'white', color: 'var(--primary-dark)', padding: '1rem 2.5rem', display: 'inline-block' }}>
               Visit Dev Blog
             </a>
          </div>

        </div>

        {/* --- FEATURE / TRAILER SECTION --- */}
        <section className="feature-section">
          <div className="feature-container">
            <div className="video-preview">
               <div className="video-bg" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2868&auto=format&fit=crop')` }}></div>
               <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }}></div>
               <PlayCircle size={64} color="white" style={{ position: 'relative', zIndex: 2, opacity: 0.9 }} />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
                A New Era of <span style={{ color: 'var(--primary)' }}>Storytelling</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Mythflair isn't just a reading platform. It's a living archive. Discover interconnected stories where every detail matters.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Immersive Reader Mode', 'Cross-Device Sync', 'Community Contributions'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }}></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <footer className="footer">
          © {new Date().getFullYear()} Mythflair. All rights reserved.
        </footer>

      </div>
    </>
  );
}

export default App;
