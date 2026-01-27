import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Truck, 
  Trophy, 
  Users, 
  Video, 
  Target, 
  Layout, 
  Plug, 
  ChevronRight, 
  Menu, 
  X,
  MapPin,
  Clock,
  CheckCircle2,
  Activity,
  UserPlus,
  Send,
  Loader2,
  Sparkles,
  Info,
  Zap,
  Maximize,
  ClipboardCheck,
  PlayCircle,
  Tag,
  MessageCircle,
  Wind,
  ShieldCheck,
  Cpu,
  Heart,
  Briefcase,
  Cake,
  Flame,
  GraduationCap,
  Star,
  Globe,
  Settings,
  Projector,
  Layers
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---

interface Package {
  name: string;
  duration: string;
  originalPrice: string;
  discountedPrice: string;
  details?: string;
  popular?: boolean;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface Occasion {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

// --- Constants ---
const CONTACT_PHONE = "083 318 2565";
const CONTACT_EMAIL = "info@sim2umobilegolf.co.za";
const WHATSAPP_URL = "https://wa.me/27833182565";
const LOGO_URL = "https://lh3.googleusercontent.com/d/1eXL8Q1M62yc2ztffpDIsa0hvm1_cONml";
const PRODUCT_IMAGE_URL = "https://lh3.googleusercontent.com/d/1mHvfuuuVpt7biH8nTiQ0DbMMjvoAjz3W";

// --- AI Concierge Component ---

const AiConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to Sim2U! I\'m your virtual caddy. How can I help you bring a professional golf experience to your event in the Western Cape today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: (process.env.API_KEY as string) });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: `You are the Sim2U AI Concierge for a mobile golf simulator business in the Western Cape, South Africa.
          Business Info:
          - Contact Phone: ${CONTACT_PHONE}
          - Contact Email: ${CONTACT_EMAIL}
          - WhatsApp: Available at the same number.
          - PROMO: We are running an Early Bird Special! 50% OFF all packages while we test the setup.
          - Packages & Pricing (After 50% Discount):
            * Birdie Package (4 Hours): Now R3,150 (Was R6,300)
            * Eagle Package (6 Hours): Now R4,500 (Was R9,000)
            * Full Day Package (8 Hours): Now R6,000 (Was R12,000)
          - Travel Policy: First 20km from base is FREE. Thereafter, R9 per km (round trip).
          - Setup: We use a professional Sim2U branded inflatable booth that works beautifully outdoors at wine estates and luxury venues.
          - What's Included: Full setup (Rapsodo MLM2PRO + Awesome Golf), driving range, games, course play, shot tracking, setup/pack-down.
          - Requirements: We need access to a standard power outlet. We provide a 30m extension lead. 
          - Space Req: 3.3m height, 4.6m width, 5.25m length.
          
          Respond professionally and charm the customer. Mention the 50% Early Bird special enthusiastically. Be specific about the ZAR pricing and the 20km travel rule. If they want to book, suggest they can call or WhatsApp us at ${CONTACT_PHONE}. User: ${userMessage}` }] }
        ],
        config: {
          temperature: 0.7,
        }
      });

      const aiText = response.text || `I'm having a slight hitch on the green. Could you please try again or call/WhatsApp us at ${CONTACT_PHONE}?`;
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: `Sorry, I lost my connection to the clubhouse. Please try again later or call/WhatsApp us on ${CONTACT_PHONE}!` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {isOpen ? (
        <div className="bg-white w-[350px] md:w-[400px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-mountainGreen/10 animate-slideUp">
          <div className="bg-mountainGreen p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-1">
                <img src={LOGO_URL} alt="Sim2U Logo" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <p className="font-bold text-sm">Sim2U Concierge</p>
                <p className="text-[10px] text-gold uppercase tracking-widest font-bold">Western Cape Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' 
                  ? 'bg-mountainGreen text-white rounded-br-none shadow-md' 
                  : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-mountainGreen/5'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-mountainGreen/5 flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-gold" />
                  <span className="text-xs text-gray-400">Consulting the leaderboard...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about travel or packages..." 
                className="flex-1 bg-cream/50 px-4 py-2 rounded-full text-sm focus:ring-2 focus:ring-gold outline-none border border-transparent focus:border-gold/30"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="bg-mountainGreen text-white p-2 rounded-full hover:bg-maroon transition-colors disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-mountainGreen hover:bg-maroon text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-3 group"
        >
          <span className="max-w-0 overflow-hidden group-hover:max-w-[180px] transition-all duration-500 whitespace-nowrap font-bold text-sm">Quote Assistant</span>
          <MessageSquare size={24} />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full border-2 border-white animate-pulse"></div>
        </button>
      )}
    </div>
  );
};

// --- Main Components ---

const SectionHeading: React.FC<{ title: string; subtitle?: string; dark?: boolean; left?: boolean }> = ({ title, subtitle, dark, left }) => (
  <div className={`${left ? 'text-left' : 'text-center'} mb-16 px-4`}>
    <h2 className={`text-4xl md:text-6xl font-serif mb-6 leading-tight ${dark ? 'text-white' : 'text-mountainGreen'}`}>{title}</h2>
    <div className={`w-32 h-1.5 bg-gold mb-8 rounded-full ${left ? 'ml-0' : 'mx-auto'}`}></div>
    {subtitle && <p className={`max-w-2xl text-lg md:text-xl font-light leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'} ${left ? 'ml-0' : 'mx-auto'}`}>{subtitle}</p>}
  </div>
);

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Occasions', href: '#occasions' },
    { name: 'Packages', href: '#pricing' },
    { name: 'Tech', href: '#tech' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <div className="bg-maroon text-gold text-center py-2 px-4 text-[10px] font-black uppercase tracking-[0.3em] fixed w-full z-[60] top-0 flex items-center justify-center gap-3">
        <Tag size={12} className="animate-pulse" />
        Early Bird Special: 50% OFF All Packages while we test the setup!
      </div>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-mountainGreen/95 backdrop-blur-md py-3 shadow-2xl' : 'bg-transparent py-8 mt-6'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center p-0 group-hover:rotate-6 transition-transform overflow-hidden">
               <img src={LOGO_URL} alt="Sim2U Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-2xl font-serif font-black text-white tracking-tighter italic">Sim2U</span>
              <span className="text-[10px] text-gold font-bold uppercase tracking-[0.3em]">Mobile Golf</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-white/80 hover:text-gold transition-all font-semibold text-sm uppercase tracking-widest border-b-2 border-transparent hover:border-gold py-1">
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-gold hover:bg-white hover:text-mountainGreen text-mountainGreen p-3 rounded-full transition-all shadow-xl group">
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="bg-maroon hover:bg-white hover:text-mountainGreen text-white px-8 py-3 rounded-full font-bold flex items-center gap-3 transition-all shadow-xl group">
                <Phone size={18} className="group-hover:animate-bounce" />
                <span>{CONTACT_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-mountainGreen fixed inset-0 z-[60] flex flex-col p-12 animate-fadeIn">
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center space-x-3">
                <img src={LOGO_URL} alt="Sim2U Logo" className="w-14 h-14 object-contain rounded-lg" />
                <span className="text-4xl font-serif font-bold text-white tracking-tighter italic">Sim2U</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white"><X size={40} /></button>
            </div>
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-4xl font-serif text-white/60 hover:text-gold transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-auto space-y-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full bg-white text-mountainGreen py-6 rounded-2xl font-black text-center text-2xl flex items-center justify-center gap-4">
                <MessageCircle size={28} />
                WHATSAPP US
              </a>
              <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="w-full bg-gold text-mountainGreen py-6 rounded-2xl font-black text-center text-2xl flex items-center justify-center gap-4">
                <Phone size={28} />
                CALL NOW
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

const Hero: React.FC = () => (
  <header id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-tr from-mountainGreen/95 via-mountainGreen/75 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-black/40 z-[11]"></div>
      <img 
        src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=2000" 
        alt="Golf Course Background" 
        className="w-full h-full object-cover scale-105 animate-slowZoom"
      />
    </div>
    
    <div className="container mx-auto px-6 relative z-20 text-center md:text-left text-white max-w-7xl flex flex-col items-center md:items-start">
      <div className="mb-6 inline-flex items-center gap-3 bg-mountainGreen/90 backdrop-blur-xl px-8 py-3 rounded-full border border-gold/40 animate-fadeInUp shadow-[0_0_25px_rgba(197,160,89,0.4)]">
        <Tag size={18} className="text-gold" />
        <span className="text-sm font-black uppercase tracking-[0.4em] text-gold">Early Bird: 50% OFF Limited Time</span>
      </div>
      
      <h1 className="hero-text text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-tight animate-fadeInUp delay-100 drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)]">
  Mobile Golf <br />
  Simulator Hire <br />
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-shimmer bg-[length:200%_auto] font-black italic drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]">
    Delivered.
  </span>
</h1>
      
      <p className="text-xl md:text-3xl mb-12 font-medium tracking-wide text-white/95 max-w-2xl animate-fadeInUp delay-200 leading-snug drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
  Looking for <strong>golf for hire</strong> in the Western Cape? We bring the range, the course, and the fun to your next <strong>event</strong> or <strong>party</strong>.
</p>
      
      <div className="flex flex-col md:flex-row items-center gap-6 animate-fadeInUp delay-300 w-full md:w-auto">
        <a href="#pricing" className="group w-full md:w-auto bg-gold text-mountainGreen px-14 py-6 rounded-2xl text-lg font-black hover:bg-white transition-all shadow-2xl hover:shadow-gold/60 flex items-center justify-center gap-4 tracking-[0.1em] overflow-hidden relative">
          <span className="relative z-10 uppercase">VIEW PACKAGES</span>
          <ChevronRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform" />
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-white/10 backdrop-blur-md border-2 border-white/40 text-white px-14 py-6 rounded-2xl text-lg font-black hover:bg-white hover:text-mountainGreen transition-all uppercase tracking-[0.1em] flex items-center justify-center gap-3">
          <MessageCircle size={22} />
          WHATSAPP US
        </a>
      </div>
    </div>
    
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-80 z-20">
      <span className="text-[10px] text-gold uppercase tracking-[0.5em] font-black">Explore The Green</span>
      <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center py-2">
        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
      </div>
    </div>
  </header>
);

const ExperienceSection: React.FC = () => (
  <section id="experience" className="py-24 lg:py-48 bg-cream relative overflow-hidden">
    {/* Subtle Premium Background Texture */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#213631_1px,transparent_1px)] [background-size:40px_40px]"></div>
    </div>

    <div className="container mx-auto px-6 max-w-7xl relative z-10">
      {/* Premium Header Layout */}
      <div className="flex flex-col lg:flex-row gap-20 lg:gap-24 items-start lg:items-center mb-24">
        
        {/* Left Column: Narrative Copy */}
        <div className="lg:w-[42%] space-y-8 order-2 lg:order-1">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-gold/50"></div>
              <span className="text-gold font-black uppercase tracking-[0.6em] text-[11px]">THE EXPERIENCE</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif text-mountainGreen leading-[1.1] tracking-tighter">
              The fairway, <br/>
              <span className="text-gold italic font-light">on your doorstep.</span>
            </h2>
            <p className="text-mountainGreen font-bold text-lg md:text-xl leading-snug tracking-tight max-w-md">
              Experience elite-level virtual fairways delivered directly to your venue, winery, or private event across the Western Cape.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gold/20 rounded-full"></div>
            <p className="text-mountainGreen/80 text-lg md:text-xl leading-relaxed font-medium pl-4">
              Step inside a private inflatable golf bay and play full courses, skill challenges, and longest-drive battles with real ball feedback. Powered by the Rapsodo MLM2PRO and Awesome Golf, every shot feels smooth, accurate, and fun — whether you’re a low handicapper or picking up a club for the first time. We arrive, set up fast, run the experience, and keep your guests rotating through effortlessly.
            </p>
          </div>
        </div>

        {/* Right Column: Larger Framed Image Showcase */}
        <div className="lg:w-[58%] relative order-1 lg:order-2">
          <div className="relative z-10 group">
            <div className="relative rounded-[50px] overflow-hidden border-[1px] border-mountainGreen/5 p-4 bg-white shadow-[0_50px_100px_-20px_rgba(33,54,49,0.15)] transition-all duration-700 group-hover:shadow-[0_60px_120px_-20px_rgba(33,54,49,0.25)]">
              <div className="rounded-[40px] overflow-hidden aspect-video lg:aspect-[4/3]">
                <img 
                  src={PRODUCT_IMAGE_URL} 
                  alt="Sim2U Pro Mobile Golf Simulator Setup" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
            
            {/* Background Decorative Frame Accent */}
            <div className="absolute -inset-6 border-[1px] border-gold/20 rounded-[60px] -z-10 group-hover:scale-[1.02] transition-transform duration-700"></div>
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-20"></div>
          </div>
        </div>
      </div>

      {/* Feature Benefit Grid */}
      <div className="grid md:grid-cols-3 gap-8 lg:gap-16 mb-24">
        {[
          {
            tag: "✅ Built for Events",
            desc: "A clean, premium setup that looks great and keeps guests engaged from the first swing.",
            icon: <Users className="text-gold" size={28} />
          },
          {
            tag: "✅ Real Shot Tracking",
            desc: "See distance, ball flight, shot shape, and accuracy instantly with MLM2PRO + Awesome Golf.",
            icon: <Activity className="text-gold" size={28} />
          },
          {
            tag: "✅ Quick Setup, Big Impact",
            desc: "We arrive, inflate, calibrate, and get you playing — with a smooth guest flow all night.",
            icon: <Zap className="text-gold" size={28} />
          }
        ].map((item, idx) => (
          <div key={idx} className="group flex flex-col items-start p-10 bg-white rounded-[40px] border border-mountainGreen/[0.03] shadow-[0_20px_40px_-10px_rgba(33,54,49,0.05)] transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(197,160,89,0.15)] hover:-translate-y-3">
            <div className="w-14 h-14 bg-cream rounded-xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-6">
              {item.icon}
            </div>
            <h4 className="text-2xl font-serif text-mountainGreen mb-4 tracking-tight italic font-bold">
              {item.tag}
            </h4>
            <div className="h-[1px] w-full bg-mountainGreen/[0.05] mb-6"></div>
            <p className="text-gray-500 text-base leading-relaxed font-medium">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Moved CTA Button to bottom of section - centered and high impact */}
      <div className="flex justify-center mt-16">
        <a href="#contact" className="group relative inline-flex items-center justify-center gap-6 bg-mountainGreen text-white px-16 py-7 rounded-[28px] font-black uppercase tracking-[0.25em] text-sm hover:bg-gold hover:text-mountainGreen transition-all shadow-[0_30px_60px_-15px_rgba(33,54,49,0.3)] hover:scale-105 active:scale-95">
          Get a Quote
          <ChevronRight size={22} className="group-hover:translate-x-2 transition-transform" />
        </a>
      </div>

    </div>
  </section>
);

const OccasionsSection: React.FC = () => {
  const occasions: Occasion[] = [
    {
      title: "Wedding Weekend",
      description: "The perfect way to entertain your guests, stress free, for an unforgettable weekend.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
      icon: <Heart size={20} />
    },
    {
      title: "Corporate Events",
      description: "The standout activity that turns meetings and mixers into new experiences.",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
      icon: <Briefcase size={20} />
    },
    {
      title: "Practice Session",
      description: "Practice with purpose — visual feedback, real metrics, swing and impact recordings.",
      image: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&q=80&w=800",
      icon: <Target size={20} />
    },
    {
      title: "Birthday Parties",
      description: "Bring everyone together with game modes designed for all ages and skill levels — no golf experience required.",
      image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800",
      icon: <Cake size={20} />
    },
    {
      title: "Braai & Relax",
      description: "Fire up the braai, relax with friends, and enjoy an at home round of golf.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
      icon: <Flame size={20} />
    },
    {
      title: "School Events",
      description: "A safe, interactive activity that encourages movement, teamwork, and confidence — no golf experience required.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
      icon: <GraduationCap size={20} />
    }
  ];

  return (
    <section id="occasions" className="py-24 md:py-32 bg-white px-6">
      <div className="container mx-auto max-w-7xl">
        <SectionHeading 
          title="Perfect Occasions" 
          subtitle="From milestone celebrations to professional development, we bring a unique edge to every gathering."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 mt-16">
          {occasions.map((occ, idx) => (
            <div key={idx} className="group text-center">
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-8 shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <img 
                  src={occ.image} 
                  alt={occ.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mountainGreen/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Subtle Icon Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl text-mountainGreen shadow-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  {occ.icon}
                </div>
              </div>
              
              {/* Text Content */}
              <h3 className="text-3xl font-serif text-mountainGreen mb-4 tracking-tight group-hover:text-gold transition-colors italic">
                {occ.title}
              </h3>
              <p className="text-gray-500 text-base leading-relaxed max-w-[280px] mx-auto font-medium">
                {occ.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection: React.FC = () => (
  <section id="process" className="py-24 md:py-32 px-6 bg-cream/50 relative overflow-hidden">
    <div className="container mx-auto max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
        {/* Left: How It Works */}
        <div className="lg:w-1/2 space-y-12">
          <div>
            <p className="text-maroon font-black uppercase tracking-[0.4em] text-xs mb-4">Seamless Logistics</p>
            <h2 className="text-4xl md:text-6xl font-serif text-mountainGreen leading-tight">How It Works.</h2>
          </div>

          <div className="space-y-12 relative">
            <div className="absolute left-6 top-4 bottom-4 w-px bg-gold/30 hidden md:block"></div>
            
            {[
              { 
                step: "01", 
                title: "You Book It", 
                desc: "Choose your package and secure your date through our online concierge, phone call, or WhatsApp message.",
                icon: <ClipboardCheck size={24} />
              },
              { 
                step: "02", 
                title: "We Deliver & Setup", 
                desc: "Our professional 'caddies' arrive at your venue to deploy the full simulator suite in under an hour.",
                icon: <Truck size={24} />
              },
              { 
                step: "03", 
                title: "You Play", 
                desc: "Tee off on global courses or challenge friends to mini-games while we manage the tech in the background.",
                icon: <PlayCircle size={24} />
              }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-8 relative z-10 group">
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center text-gold shadow-xl group-hover:bg-gold group-hover:text-white transition-all duration-500 font-bold border border-gold/20">
                  {item.icon}
                </div>
                <div className="pt-2">
                  <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em] block mb-1">Step {item.step}</span>
                  <h4 className="text-2xl font-serif text-mountainGreen mb-3">{item.title}</h4>
                  <p className="text-gray-500 text-sm md:text-base max-w-md leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Site Requirements */}
        <div className="lg:w-1/2">
          <div className="bg-mountainGreen rounded-[60px] p-12 md:p-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            
            <div className="relative z-10 space-y-12">
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">Site Requirements</h3>
                <p className="text-white/60 text-sm font-medium uppercase tracking-widest">Ensuring the perfect flight path</p>
              </div>

              <div className="grid gap-8">
                <div className="flex items-start gap-6 bg-white/5 p-8 rounded-[32px] border border-white/10 group-hover:border-gold transition-colors">
                  <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center text-mountainGreen shadow-lg">
                    <Maximize size={24} />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-white font-bold text-lg mb-2">Space Needed</h5>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      We require a flat, stable surface with the following minimum clearances:
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-white/10 rounded-xl">
                        <p className="text-gold font-bold text-xs">3.3m</p>
                        <p className="text-[8px] text-white/40 uppercase font-black">Height</p>
                      </div>
                      <div className="text-center p-3 bg-white/10 rounded-xl">
                        <p className="text-gold font-bold text-xs">4.6m</p>
                        <p className="text-[8px] text-white/40 uppercase font-black">Width</p>
                      </div>
                      <div className="text-center p-3 bg-white/10 rounded-xl">
                        <p className="text-gold font-bold text-xs">5.25m</p>
                        <p className="text-[8px] text-white/40 uppercase font-black">Depth</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-6 bg-white/5 p-8 rounded-[32px] border border-white/10 group-hover:border-gold transition-colors">
                  <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center text-mountainGreen shadow-lg">
                    <Plug size={24} />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-lg mb-2">Power Access</h5>
                    <p className="text-white/70 text-sm leading-relaxed">
                      All we need is access to a standard power outlet. We bring a <span className="text-gold font-bold">30m industrial extension lead</span> to allow for flexible positioning indoors or outdoors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; items: string[] }> = ({ icon, title, items }) => (
  <div className="bg-white/5 p-10 rounded-[32px] border border-white/10 hover:border-gold transition-all duration-500 group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-gold/10 transition-colors"></div>
    <div className="text-gold mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-transform relative">{icon}</div>
    <h3 className="text-3xl font-serif text-white mb-6 relative">{title}</h3>
    <ul className="space-y-4 relative">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
          <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 mr-3 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const PackageCard: React.FC<{ pkg: Package }> = ({ pkg }) => (
  <div className={`group relative p-10 rounded-[40px] transition-all duration-700 hover:-translate-y-4 flex flex-col ${pkg.popular ? 'bg-mountainGreen text-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] scale-105 z-10 border-2 border-gold' : 'bg-white text-mountainGreen shadow-xl border border-mountainGreen/5'}`}>
    {pkg.popular && (
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-maroon text-gold px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl border border-gold/30">
        Best Value
      </div>
    )}
    <h3 className={`text-3xl font-serif mb-2 tracking-tight ${pkg.popular ? 'text-gold' : 'text-mountainGreen'}`}>{pkg.name}</h3>
    
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-bold text-maroon line-through opacity-50">{pkg.originalPrice}</span>
        <div className="bg-maroon/10 text-maroon text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">50% OFF</div>
      </div>
      <div className="flex items-baseline">
        <span className="text-5xl font-black">{pkg.discountedPrice}</span>
        <span className="ml-2 text-sm opacity-60 font-bold uppercase tracking-widest">/ {pkg.duration}</span>
      </div>
    </div>
    
    <div className="flex-grow">
      <div className={`w-full h-px mb-8 ${pkg.popular ? 'bg-white/10' : 'bg-mountainGreen/10'}`}></div>
      <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${pkg.popular ? 'text-gold/60' : 'text-gray-400'}`}>Premium Event Package</p>
      {pkg.details && <p className="text-[10px] opacity-60 uppercase font-bold tracking-widest leading-relaxed mb-6 italic">{pkg.details}</p>}
    </div>

    <button className={`w-full py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 ${pkg.popular ? 'bg-gold text-mountainGreen hover:bg-white hover:scale-105 shadow-xl shadow-gold/20' : 'bg-mountainGreen text-white hover:bg-maroon hover:scale-105 shadow-xl shadow-mountainGreen/20'}`}>
      Check Availability
    </button>
  </div>
);

const App: React.FC = () => {
  const packages: Package[] = [
    { name: 'Birdie Package', duration: '4 Hours', originalPrice: 'R 6,300', discountedPrice: 'R 3,150', popular: true },
    { name: 'Eagle Package', duration: '6 Hours', originalPrice: 'R 9,000', discountedPrice: 'R 4,500' },
    { name: 'Full Day Package', duration: 'Up to 8 Hours', originalPrice: 'R 12,000', discountedPrice: 'R 6,000', details: '*Longer events can be custom quoted' },
  ];

  return (
    <div className="bg-cream selection:bg-gold selection:text-mountainGreen overflow-x-hidden pt-10 md:pt-6">
      <Nav />
      <Hero />
      
      {/* Experience Section - Optimized with larger image and cleaner branding */}
      <ExperienceSection />

      {/* Occasions Section */}
      <OccasionsSection />

      {/* Process & Requirements Section */}
      <ProcessSection />

      {/* Tech / Features Grid */}
      <section id="tech" className="bg-mountainGreen py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent opacity-20 blur-[120px]"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <SectionHeading 
            title="Professional Tech" 
            subtitle="Precision-engineered simulation that tracks every yard, spin, and launch angle with tour-level accuracy."
            dark
          />
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Activity size={50} />}
              title="Launch Precision"
              items={['Rapsodo MLM2PRO Tracking', 'Dual Optical Vision', 'Shot Tracing & Data', 'Pro-Level Calibration']}
            />
            <FeatureCard 
              icon={<Video size={50} />}
              title="Global Play"
              items={['Awesome Golf Engine', '30,000+ Courses', 'High-Gain Impact Screen', 'Ultra-Low Latency Rendering']}
            />
            <FeatureCard 
              icon={<Trophy size={50} />}
              title="Live Analytics"
              items={['Real-Time Spin Data', 'Carry & Total Yards', 'Launch Angle Precision', 'Club Path Insights']}
            />
            <FeatureCard 
              icon={<Layout size={50} />}
              title="Interactive Fun"
              items={['Multiplayer Games', 'Driving Range Modes', 'Course Management', 'Skill Challenges']}
            />
          </div>
        </div>
      </section>

      {/* Unified Inclusions Section */}
      <section className="py-24 bg-white px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-cream rounded-[60px] p-12 md:p-20 shadow-xl border border-mountainGreen/5">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-serif text-mountainGreen mb-4">Every Package Includes</h3>
              <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">The Sim2U Standard Excellence</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                'Full mobile simulator setup (Rapsodo MLM2PRO + Awesome Golf)',
                'Driving range mode, games, and course play',
                'Shot tracking stats and fun challenges',
                'Closest-to-the-pin & Longest Drive competitions',
                'Professional setup, calibration, and pack-down',
                'Professional on-site technician/caddy'
              ].map((inclusion, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-mountainGreen/5 group hover:border-gold transition-colors">
                  <CheckCircle2 className="text-gold flex-shrink-0" size={24} />
                  <span className="text-mountainGreen font-medium text-sm md:text-base">{inclusion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-cream/50">
        <div className="container mx-auto max-w-7xl">
          <SectionHeading 
            title="Early Bird Pricing" 
            subtitle="Take advantage of our 50% discount while we test the setup. Professional mobile golf at an unbeatable rate." 
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, idx) => (
              <PackageCard key={idx} pkg={pkg} />
            ))}
          </div>

          {/* Travel & Logistics Block */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="bg-mountainGreen rounded-[40px] p-10 md:p-16 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div className="bg-gold p-6 rounded-3xl text-mountainGreen shadow-xl">
                  <Truck size={48} />
                </div>
                <div>
                  <h3 className="text-3xl font-serif text-white mb-4">Travel & Logistics</h3>
                  <p className="text-white/80 text-lg leading-relaxed mb-6 font-light">
                    We deliver across the Western Cape. Our pricing is simple and transparent so you can plan your event without surprises.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                      <p className="text-gold font-black uppercase tracking-widest text-[10px] mb-2">First 20km</p>
                      <p className="text-white font-bold text-xl">100% FREE</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                      <p className="text-gold font-black uppercase tracking-widest text-[10px] mb-2">Additional Distance</p>
                      <p className="text-white font-bold text-xl">R 9 / km</p>
                      <p className="text-white/40 text-[10px] mt-1 font-bold italic uppercase">Round Trip Applied</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000" 
            alt="Nature Background" 
            className="w-full h-full object-cover brightness-[15%]"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading title="Check Availability" dark subtitle="Western Cape dates fill up quickly. Secure your slot for your next premium event now." />
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-10">
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center text-mountainGreen group-hover:scale-110 transition-transform shadow-xl shadow-gold/20 p-2">
                    <Phone size={30} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Inquiries</h4>
                    <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="text-3xl text-gold font-serif hover:underline tracking-tight">{CONTACT_PHONE}</a>
                  </div>
                </div>
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center text-mountainGreen group-hover:scale-110 transition-transform shadow-xl shadow-gold/20 p-2">
                    <MessageCircle size={30} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">WhatsApp</h4>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-3xl text-white/60 hover:text-white transition-colors font-serif">Message Us</a>
                  </div>
                </div>
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center text-mountainGreen group-hover:scale-110 transition-transform shadow-xl shadow-gold/20 p-2">
                    <Mail size={30} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Email Support</h4>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-xl text-white/60 hover:text-white transition-colors">{CONTACT_EMAIL}</a>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-10 rounded-[40px] border border-white/10">
                <img src={LOGO_URL} alt="Sim2U Logo" className="w-20 h-20 mb-6 object-contain" />
                <p className="text-white text-2xl font-serif italic leading-relaxed">
                  "Delivering the perfect blend of sport, technology, and celebration to the most stunning venues across the Western Cape."
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <form className="bg-white p-12 md:p-16 rounded-[60px] space-y-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-mountainGreen/5 rounded-full -mr-16 -mt-16 blur-3xl transition-all duration-500 group-hover:bg-gold/10"></div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                    <input type="text" placeholder="John Player" className="w-full bg-cream border-2 border-transparent focus:border-gold/30 p-5 rounded-2xl focus:ring-0 outline-none transition-all placeholder:text-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email</label>
                    <input type="email" placeholder="john@events.co.za" className="w-full bg-cream border-2 border-transparent focus:border-gold/30 p-5 rounded-2xl focus:ring-0 outline-none transition-all placeholder:text-gray-300" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Event Date & Location</label>
                  <input type="text" placeholder="Stellenbosch - Nov 20th" className="w-full bg-cream border-2 border-transparent focus:border-gold/30 p-5 rounded-2xl focus:ring-0 outline-none transition-all placeholder:text-gray-300" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Desired Package</label>
                  <select className="w-full bg-cream border-2 border-transparent focus:border-gold/30 p-5 rounded-2xl focus:ring-0 outline-none transition-all text-gray-500">
                    <option>Birdie Package (4hr)</option>
                    <option>Eagle Package (6hr)</option>
                    <option>Full Day Package (8hr)</option>
                  </select>
                </div>
                <button className="w-full bg-mountainGreen text-white font-black py-6 rounded-2xl hover:bg-maroon transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.3em] flex items-center justify-center gap-4">
                  Request a Quote
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-mountainGreen py-20 px-6 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 pb-16 border-b border-white/10">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 flex items-center justify-center p-0 shadow-xl shadow-black/20 overflow-hidden">
                <img src={LOGO_URL} alt="Sim2U Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-4xl font-serif font-black text-white tracking-tighter italic">Sim2U</span>
                <span className="text-xs text-gold font-bold uppercase tracking-[0.4em]">Western Cape's Finest</span>
              </div>
            </div>
            <div className="flex gap-10">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-gold transition-colors"><MessageCircle size={24} /></a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors"><Trophy size={24} /></a>
              <a href="#" className="text-white/40 hover:text-gold transition-colors"><MessageSquare size={24} /></a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-16 text-center md:text-left">
            <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em]">
              © 2024 Sim2U Mobile Golf. Operating across the Western Cape, South Africa.
            </p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/30">
              <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gold transition-colors">Booking Terms</a>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      </footer>

      {/* WhatsApp Floating Button (Left) */}
      <div className="fixed bottom-6 left-6 z-[100]">
        <a 
          href={WHATSAPP_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-3 group relative"
        >
          <MessageCircle size={24} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-[180px] transition-all duration-500 whitespace-nowrap font-bold text-sm">WhatsApp Us</span>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-[#25D366] animate-pulse"></div>
        </a>
      </div>

      {/* AI Assistant (Right) */}
      <AiConcierge />

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slowZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-shimmer { animation: shimmer 5s linear infinite; }
        .animate-slideUp { animation: slideUp 0.5s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-slowZoom { animation: slowZoom 30s infinite ease-in-out; }
        .animate-bounce-slow { animation: bounceSlow 3s ease-in-out infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
};

export default App;
