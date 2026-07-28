import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
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
          - PROMO: We are running a Winter Special! 25% OFF until August.
          - Setup Options & Pricing (Rates shown include the 25% discount, minimum 4 hours):
            * Backyard Budget (2.5m H x 3.1m W x 5.0m D): R3,000 for 4 hours (Additional hours: R600/hr)
            * Outdoor Enclosure (3.3m H x 4.6m W x 5.3m D): R4,725 for 4 hours (Additional hours: R1,050/hr)
            * Corporate Indoor (2.6m H x 3.5m W x 5.0m D): Custom Quote (Available for Half or Full Day)
          - Travel Policy: First 20km from Somerset West Country Club is FREE. Thereafter, R5 per km (round trip).
          - Weather Policy: Max wind is 30 km/h (sustained or gusts). Rain is a no-go, but we offer rescheduling.
          - What's Included: Full mobile simulator setup (Rapsodo MLM2PRO + Awesome Golf), driving range, games, course play, shot tracking, professional on-site technician/caddy, and setup/pack-down.
          - Requirements: Access to a standard power outlet. We provide a 30m industrial extension lead.
          
          Respond professionally and charm the customer. Mention the 25% Winter special enthusiastically. Be specific about the ZAR pricing, the 20km travel rule, and the necessary space requirements if asked. If they want to book or get a custom corporate quote, suggest they can call or WhatsApp us at ${CONTACT_PHONE}. User: ${userMessage}` }] }
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
        Winter Special: 25% OFF Till August!
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
        <span className="text-sm font-black uppercase tracking-[0.4em] text-gold">Winter Special: 25% OFF Till August</span>
      </div>
      
      {/* UPDATED SEO-FRIENDLY H1 */}
      <h1 className="hero-text text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tighter leading-tight animate-fadeInUp delay-100 drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)]">
        Mobile Golf <br className="hidden md:block" />
        Simulator Hire <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-gold animate-shimmer bg-[length:200%_auto] font-black italic drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]">
          In The Western Cape.
        </span>
      </h1>
      
      {/* UPDATED PARAGRAPH FOR LOCAL SEO */}
      <p className="text-xl md:text-2xl mb-12 font-medium tracking-wide text-white/95 max-w-3xl animate-fadeInUp delay-200 leading-relaxed drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
        Experience Sim2U. We bring the ultimate virtual golf experience, the course, and the fun directly to your next corporate event or private party.
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


const EXPERIENCE_IMAGES = [
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222588/IMG_7758_vlrusn.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222584/20260516_134338_z0tkiu.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222587/20260725_134627_kce6ve.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222588/IMG_7660_ghaaja.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222590/04d620e0-bfa9-4eda-b973-6be047204a2a_bfm54u.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222593/StandDuringEvent_4_drdmsy.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222598/GolfSwing_5_elkcim.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222589/IMG_7735_nt2s0x.heic",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222588/IMG-20260420-WA0006_rf4bnz.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222586/20260516_134653_fgqave.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222582/99c19f3d-cfe6-4642-8c51-c0d674d6c1a9_hnby1c.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222584/IMG_0174_ieuzas.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222588/IMG_7757_hnz0nx.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222586/IMG_7581_hyo7n4.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222589/Stand_9_aozx7t.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222591/14bc34d1-eb70-4c95-8f87-3ea98b35621c_thwydl.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222587/IMG_7648_mzejac.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222591/Stand_8_vel0b3.jpg",
  "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785222583/57302338-eb85-467d-af77-6f2a99d3d9a4_e6dqro.jpg"
];

// --- Extracted Testimonials Data ---
// Easily add or remove items here; the carousel will automatically update.
const TESTIMONIALS = [
  {
    quote: "What an amazing team! I can definitely vouch for them - if you want to add a truely fun adventure at your event, @Sim2U is the answer! @Medipost Pharmacy will secure your services again⛳️",
    author: "Rentia M.",
    role: "Medipost",
    location: "Corporate Event",
    photo: "https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785231127/Medipost_Stand_Ladies._1_fwwzwr.jpg"
  },
  {
    quote: "I got it for my son 14th birthday, it was the best ever the boys loved it, I will highly recommend it.",
    author: "Marelise De B.",
    role: "Private Host",
    location: "14th Birthday Party"
  },
   {
    quote: "Babyshower well spent! Father to be and gents had a great time! Dylan and his team were very professional and seemed almost part of the group!",
    author: "Jaco L.",
    role: "Private Host",
    location: "Baby Shower"
  },
   {
    quote: "I can recommend Dylan anytime, it was a awesome experience and he did everything so professionally. Do yourself a favor and book.",
    author: "Vincent De B.",
    role: "Private Host",
    location: "14th Birthday Party"
  },
  {
    quote: "Fabulous team ensuring our event ran seamlessly and smoothly! Definite recommendation!!",
    author: "Donovan M.",
    role: "Medipost",
    location: "Corporate Event"
  },
  {
    quote: "Amazing service and very friendly team! Really enjoyed what they did for us. 100% recommend.",
    author: "Shain N.",
    role: "Event Guest"
  },
  {
    quote: "Great service , they kept it professional and fun. Setup was neat and precise had no problem with any technology would definitely recommend.",
    author: "Arno L.",
    role: "Event Guest"
  },
  {
    quote: "Great experience. Definitely will recommend for all types of events.",
    author: "Keano H.",
    role: "Event Guest"
  },
   {
    quote: "Service was fantastic, had a blast. These guys were very professional and had a great impact on the vibe of the event. I would recommend them for any function.",
    author: "Andre van N.",
    role: "Event Guest"
  },
  {
    quote: "Great product with amazing service would recommend 10/10 any day great for parties and services!",
    author: "Riaan E.",
    role: "Event Guest"
  },
  {
    quote: "Had a nice day and loads of fun!!",
    author: "Twane E.",
    role: "Event Guest"
  }
];

const ExperienceSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const testimonialScrollRef = useRef<HTMLDivElement>(null);

  // --- Image Slide Helpers ---
  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % EXPERIENCE_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev - 1 + EXPERIENCE_IMAGES.length) % EXPERIENCE_IMAGES.length);
  };

  // --- Testimonial Scroll Helper ---
  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (testimonialScrollRef.current) {
      const { current } = testimonialScrollRef;
      // Scroll by the current visible width of the container
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // --- Image Auto-Play Timer ---
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); 
    return () => clearInterval(timer);
  }, [currentIdx]);

  // --- Testimonial Auto-Play Timer ---
  useEffect(() => {
    const timer = setInterval(() => {
      if (testimonialScrollRef.current) {
        const { current } = testimonialScrollRef;
        // If scrolled to the very end, snap back to the start; otherwise, scroll right
        if (current.scrollLeft + current.clientWidth >= current.scrollWidth - 10) {
          current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          current.scrollBy({ left: current.offsetWidth, behavior: 'smooth' });
        }
      }
    }, 8000); // 8000ms = 8 seconds per page shift
    return () => clearInterval(timer);
  }, []);

  return (
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
                Hire one of our private golf bays and play full courses, skill challenges, and longest-drive battles with real ball feedback. Powered by the Rapsodo MLM2PRO and Awesome Golf, every shot feels smooth, accurate, and fun — whether you’re a low handicapper or picking up a club for the first time. We arrive, set up fast, run the experience, and keep your guests rotating through effortlessly.
              </p>
            </div>
          </div>

          {/* Right Column: Carousel Image Showcase */}
          <div className="lg:w-[58%] relative order-1 lg:order-2 w-full">
            <div className="relative z-10 group">
              <div className="relative rounded-[50px] overflow-hidden border-[1px] border-mountainGreen/5 p-4 bg-white shadow-[0_50px_100px_-20px_rgba(33,54,49,0.15)] transition-all duration-700 group-hover:shadow-[0_60px_120px_-20px_rgba(33,54,49,0.25)]">
                
                {/* Fixed height aspect ratio container */}
                <div className="rounded-[40px] overflow-hidden aspect-video lg:aspect-[4/3] relative bg-gray-100">
                  
                  {/* Optimized Mapped Images */}
                  {EXPERIENCE_IMAGES.map((src, idx) => {
                    const isCurrent = idx === currentIdx;
                    const isNext = idx === (currentIdx + 1) % EXPERIENCE_IMAGES.length;
                    const isPrev = idx === (currentIdx - 1 + EXPERIENCE_IMAGES.length) % EXPERIENCE_IMAGES.length;
                    const shouldLoad = isCurrent || isNext || isPrev;

                    return (
                      <img 
                        key={idx}
                        src={shouldLoad ? src : undefined} 
                        alt={`Sim2U Setup Gallery ${idx + 1}`} 
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-750 ease-in-out ${isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                      />
                    );
                  })}

                  {/* Navigation Arrows */}
                  <button 
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-mountainGreen p-3 rounded-full shadow-lg transition-all hover:scale-110 z-20"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button 
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-mountainGreen p-3 rounded-full shadow-lg transition-all hover:scale-110 z-20"
                    aria-label="Next Slide"
                  >
                    <ChevronRight size={22} />
                  </button>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-20 flex-wrap justify-center w-[90%]">
                    {EXPERIENCE_IMAGES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          idx === currentIdx ? 'bg-gold w-6 shadow-md' : 'bg-white/65 hover:bg-white w-2.5'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                </div>
              </div>
              
              {/* Decorative Frame Accents */}
              <div className="absolute -inset-6 border-[1px] border-gold/20 rounded-[60px] -z-10 group-hover:scale-[1.02] transition-transform duration-700"></div>
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-20"></div>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel Section */}
        <div className="relative mb-24 group">
          
          {/* Testimonial Header & Controls */}
          <div className="flex justify-between items-end mb-8 px-2">
            <h3 className="text-3xl font-serif text-mountainGreen">What our clients say</h3>
            <div className="flex gap-3">
              <button 
                onClick={() => scrollTestimonials('left')} 
                className="bg-white hover:bg-gold text-mountainGreen p-3 rounded-full shadow-sm hover:shadow-md transition-all border border-mountainGreen/5 hover:text-white"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scrollTestimonials('right')} 
                className="bg-white hover:bg-gold text-mountainGreen p-3 rounded-full shadow-sm hover:shadow-md transition-all border border-mountainGreen/5 hover:text-white"
                aria-label="Next Testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Scrollable Flex Container */}
          <div 
            ref={testimonialScrollRef}
            // Tailwind CSS scroll snap combined with utility classes to hide scrollbars cleanly
            className="flex overflow-x-auto snap-x snap-mandatory gap-8 lg:gap-12 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {TESTIMONIALS.map((t, idx) => (
              <div 
                key={idx} 
                // Width math handles responsive layout: 1 item (mobile), 2 items (tablet), 3 items (desktop)
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)] flex-shrink-0 snap-start"
              >
                {/* H-full ensures all cards match heights within the flex grid */}
                <div className="relative h-full flex flex-col justify-between p-10 bg-white rounded-[32px] border border-mountainGreen/[0.03] shadow-[0_15px_30px_-10px_rgba(33,54,49,0.03)] hover:shadow-[0_30px_60px_-15px_rgba(197,160,89,0.1)] transition-all duration-500 hover:-translate-y-2">
                  
                  {/* Huge stylized quote mark */}
                  <span className="absolute top-4 left-6 text-8xl font-serif text-gold/15 select-none pointer-events-none">“</span>
                  
                  <div className="relative z-10 space-y-6">
                    {/* 5 Stars */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-gold text-lg">★</span>
                      ))}
                    </div>
                    
                    <p className="text-gray-600 italic text-base leading-relaxed font-medium">
                      "{t.quote}"
                    </p>
                  </div>

                  {/* --- UPDATED AUTHOR DETAILS WITH PHOTO SUPPORT --- */}
                  <div className="mt-8 pt-6 border-t border-mountainGreen/5 flex items-center gap-4">
                    
                    {/* Conditionally render the photo if it exists */}
                    {t.photo && (
                      <div className="flex-shrink-0">
                        <img 
                          src={t.photo} 
                          alt={`${t.author} profile`} 
                          className="w-12 h-12 rounded-full object-cover border-[2px] border-gold/30 shadow-sm"
                        />
                      </div>
                    )}

                    {/* Author Text */}
                    <div className="flex flex-col">
                      <span className="text-mountainGreen font-black uppercase tracking-wider text-sm">
                        {t.author}
                      </span>
                      <span className="text-xs text-gray-400 font-semibold">
                        {t.role} {t.location ? `— ${t.location}` : ''}
                      </span>
                    </div>
                    
                  </div>
                  {/* --- END UPDATED AUTHOR DETAILS --- */}

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16">
          <a href="#contact" className="group relative inline-flex items-center justify-center gap-6 bg-mountainGreen text-white px-16 py-7 rounded-[28px] font-black uppercase tracking-[0.25em] text-sm hover:bg-gold hover:text-mountainGreen transition-all shadow-[0_30px_60px_-15px_rgba(33,54,49,0.3)] hover:scale-105 active:scale-95">
            Get a Quote
            <ChevronRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};

const OccasionsSection: React.FC = () => {
  const occasions: Occasion[] = [
    {
      title: "Wedding Weekend",
      description: "Unique wedding entertainment for your cocktail hour or reception. The perfect guest activity for an unforgettable weekend.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
      icon: <Heart size={20} />
    },
    {
      title: "Corporate Events",
      description: "The standout entertainment for your next corporate function, year-end party, or team building.",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
      icon: <Briefcase size={20} />
    },
    {
      title: "Practice Session",
      description: "Rent a professional launch monitor for a private range session. Get visual feedback, real metrics, and swing recordings.",
      image: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&q=80&w=800",
      icon: <Target size={20} />
    },
    {
      title: "Birthday Parties",
      description: "The ultimate party entertainment. Bring everyone together with game modes designed for all ages — no golf experience required.",
      image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800",
      icon: <Cake size={20} />
    },
    {
      title: "Braai & Relax",
      description: "Upgrade your social gathering. Fire up the braai while we deliver a full private golf simulator experience to your home.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
      icon: <Flame size={20} />
    },
    {
      title: "School Events",
      description: "A safe, interactive attraction for school fundraisers and sports days. Encourages movement and teamwork with no experience required.",
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
                desc: "Our professional 'caddies' arrive at your venue to deploy the full simulator suite.",
                icon: <Truck size={24} />
              },
              { 
                step: "03", 
                title: "You Play", 
                desc: "Worried about running the event? No need! We run, entertain and manage the entire event for you.",
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
                      We offer 3 different enclosure sizes, please refer to the package section for further information:
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-white/10 rounded-xl">
                        <p className="text-gold font-bold text-xs">Xm</p>
                        <p className="text-[8px] text-white/40 uppercase font-black">Height</p>
                      </div>
                      <div className="text-center p-3 bg-white/10 rounded-xl">
                        <p className="text-gold font-bold text-xs">Xm</p>
                        <p className="text-[8px] text-white/40 uppercase font-black">Width</p>
                      </div>
                      <div className="text-center p-3 bg-white/10 rounded-xl">
                        <p className="text-gold font-bold text-xs">Xm</p>
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
    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-gold/10 transition-colors" />
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

// --- NEW ENCLOSURES SECTION (Replaces old PackageCard) ---
const EnclosuresSection: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [activeDuration, setActiveDuration] = React.useState<number>(3); // Set default to 3 for the initial backyard tab

  const enclosures = [
    {
      id: 'backyard',
      name: 'Backyard Budget',
      tagline: 'Perfect for casual braais and intimate home gatherings.',
      image: '/Backyard Setup.png',
      specs: { h: '2.5m', w: '3.1m', d: '5.0m' }, 
      isCustomQuote: false,
      basePrice: 4200,
      hourlyRate: 800, 
    },
    {
      id: 'outdoor',
      name: 'Outdoor Enclosure',
      tagline: 'The premium setup for wine estates, weddings, and large events.',
      image: '/social-preview.png',
      specs: { h: '3.3m', w: '4.6m', d: '5.3m' }, 
      isCustomQuote: false,
      basePrice: 6000,
      hourlyRate: 1000, 
    },
    {
      id: 'corporate',
      name: 'Corporate Indoor',
      tagline: 'Sleek, professional footprint tailored for conferences and brand activations.',
      image: '/Indoor Setup.png',
      specs: { h: '2.6m', w: '3.5m', d: '5.0m' }, 
      isCustomQuote: true,
      basePrice: 0,
      hourlyRate: 0,
    }
  ];

  const currentEnclosure = enclosures[activeTab];

  const calculatePrice = () => {
    if (currentEnclosure.isCustomQuote) {
      return { original: null, discounted: 'Quote' };
    }
    
    let total;
    if (currentEnclosure.id === 'backyard' && activeDuration === 3) {
      total = 3500;
    } else {
      total = currentEnclosure.basePrice + ((activeDuration - 4) * currentEnclosure.hourlyRate);
    }

    const discountedTotal = total * 0.75; 
    
    return {
      original: `R ${total.toLocaleString()}`,
      discounted: `R ${discountedTotal.toLocaleString()}`
    };
  };

  const durationOptions = currentEnclosure.isCustomQuote 
    ? [4, 8] 
    : currentEnclosure.id === 'backyard' 
      ? [3, 4, 5, 6, 7, 8] 
      : [4, 5, 6, 7, 8];
      
  const { original, discounted } = calculatePrice();

  return (
    <section id="pricing" className="py-32 px-6 bg-cream/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 px-4">
          <div className="mb-6 inline-flex items-center gap-3 bg-white px-6 py-2 rounded-full border border-gold/40 shadow-sm">
            <Tag size={16} className="text-maroon animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-maroon">Winter Special: 25% OFF Till August</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight text-mountainGreen">Choose Your Setup.</h2>
          <div className="w-32 h-1.5 bg-gold mx-auto mb-8 rounded-full" />
          <p className="max-w-2xl text-lg md:text-xl font-light leading-relaxed text-gray-600 mx-auto">
            Three tailored enclosures to fit your venue. Most bookings require a minimum of 4 hours, with a special 3-hour option available for backyard setups.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {enclosures.map((enc, idx) => (
            <button
              key={enc.id}
              onClick={() => {
                setActiveTab(idx);
                setActiveDuration(enc.id === 'backyard' ? 3 : 4); 
              }}
              className={`px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all duration-300 ${
                activeTab === idx
                  ? 'bg-mountainGreen text-white shadow-xl shadow-mountainGreen/20 scale-105'
                  : 'bg-white text-gray-400 hover:bg-gold/10 hover:text-mountainGreen border border-gray-200'
              }`}
            >
              {enc.name}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-mountainGreen/5 flex flex-col lg:flex-row animate-fadeIn">
          <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[500px] bg-gray-100">
            <img 
              src={currentEnclosure.image} 
              alt={currentEnclosure.name} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
            <h3 className="absolute bottom-6 left-6 text-3xl font-serif text-white lg:hidden">
              {currentEnclosure.name}
            </h3>
          </div>

          <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-between">
            <div>
              <h3 className="hidden lg:block text-4xl font-serif text-mountainGreen mb-4">{currentEnclosure.name}</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">
                {currentEnclosure.tagline}
              </p>

              <div className="bg-cream/50 p-6 rounded-2xl border border-gold/20 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Maximize size={18} className="text-gold" />
                  <span className="font-bold text-mountainGreen text-sm uppercase tracking-widest">Space Required</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-mountainGreen font-black text-lg">{currentEnclosure.specs.h}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Height</p>
                  </div>
                  <div>
                    <p className="text-mountainGreen font-black text-lg">{currentEnclosure.specs.w}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Width</p>
                  </div>
                  <div>
                    <p className="text-mountainGreen font-black text-lg">{currentEnclosure.specs.d}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Depth</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-gold" />
                <span className="font-bold text-mountainGreen text-sm uppercase tracking-widest">Select Duration</span>
              </div>
              
              <div className="flex gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
                {durationOptions.map((hours) => (
                  <button
                    key={hours}
                    onClick={() => setActiveDuration(hours)}
                    className={`flex-1 py-3 px-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all min-w-[60px] ${
                      activeDuration === hours
                        ? 'bg-gold text-mountainGreen shadow-md border-2 border-gold'
                        : 'bg-white text-gray-400 border-2 border-gray-100 hover:border-gold/40'
                    }`}
                  >
                    {currentEnclosure.isCustomQuote 
                      ? (hours === 4 ? 'Half Day' : 'Full Day') 
                      : `${hours} Hrs`}
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                      {currentEnclosure.isCustomQuote ? 'Custom Rate' : 'Total Investment'}
                    </p>
                    {!currentEnclosure.isCustomQuote && (
                      <div className="bg-maroon/10 text-maroon text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
                        25% OFF
                      </div>
                    )}
                  </div>
                  
                  {!currentEnclosure.isCustomQuote && (
                    <div className="text-sm font-bold text-maroon line-through opacity-50 mb-1">
                      {original}
                    </div>
                  )}
                  
                  <div className="text-3xl md:text-4xl font-black text-mountainGreen">
                    {discounted}
                  </div>
                </div>
                
                <a 
                  href="#contact" 
                  className="bg-mountainGreen text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-[0.1em] hover:bg-maroon hover:scale-105 transition-all shadow-xl shadow-mountainGreen/20 flex items-center gap-2"
                >
                  Book <ChevronRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- END NEW ENCLOSURES SECTION ---

const App: React.FC = () => {
  const [enclosureType, setEnclosureType] = useState('Backyard Budget');

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
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold via-transparent to-transparent opacity-20 blur-[120px]" />
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
      <EnclosuresSection />

      {/* Logistics & Safety Section (Unified Wrapper) */}
      <section className="pb-32 px-6 bg-cream/50">
        <div className="container mx-auto max-w-7xl">
          
          {/* Travel & Logistics Card */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-mountainGreen rounded-[40px] p-10 md:p-16 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div className="bg-gold p-6 rounded-3xl text-mountainGreen shadow-xl">
                  <Truck size={48} />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-serif text-white mb-4">Travel & Logistics</h3>
                  <p className="text-white/80 text-lg leading-relaxed mb-6 font-light">
                    We deliver across the Western Cape. Our pricing is simple and transparent so you can plan your event without surprises. 
                    Distance from Somerset West Country Club.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                      <p className="text-gold font-black uppercase tracking-widest text-[10px] mb-2">First 20km</p>
                      <p className="text-white font-bold text-xl">100% FREE</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                      <p className="text-gold font-black uppercase tracking-widest text-[10px] mb-2">Additional Distance</p>
                      <p className="text-white font-bold text-xl">{"R 5 / km"}</p>
                      <p className="text-white/40 text-[10px] mt-1 font-bold italic uppercase">Round Trip Applied</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weather & Safety Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-mountainGreen rounded-[40px] p-10 md:p-16 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              
              <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div className="bg-gold p-6 rounded-3xl text-mountainGreen shadow-xl">
                  <Wind size={48} />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-serif text-white mb-4">Weather & Safety</h3>
                  <p className="text-white/80 text-lg leading-relaxed mb-6 font-light">
                    Our simulators use high-end electronics. To ensure safety and equipment integrity in the Western Cape, we monitor conditions closely.
                    <br />
                    <a href="/terms.html" className="text-gold font-medium hover:text-white transition-colors inline-flex items-center gap-2 mt-2">
                      View full weather policy 
                      <ChevronRight size={16} />
                    </a>
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                      <p className="text-gold font-black uppercase tracking-widest text-[10px] mb-2">Max Wind</p>
                      <p className="text-white font-bold text-xl uppercase italic">30 KM / H</p>
                      <p className="text-white/40 text-[10px] mt-1 font-bold italic uppercase">Sustained or Gusts</p>
                    </div>
                    
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                      <p className="text-gold font-black uppercase tracking-widest text-[10px] mb-2">Rain Policy</p>
                      <p className="text-white font-bold text-xl uppercase italic">No-Go</p>
                      <p className="text-white/40 text-[10px] mt-1 font-bold italic uppercase">Reschedule Available</p>
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
                        <a href="mailto:info@sim2umobilegolf.co.za" className="text-xl text-white/60 hover:text-white transition-colors">
                        info@sim2umobilegolf.co.za
                    </a>
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
              <form action="https://formspree.io/f/mwvoapnp" method="POST" className="bg-white p-12 md:p-16 rounded-[60px] space-y-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-mountainGreen/5 rounded-full -mr-16 -mt-16 blur-3xl transition-all duration-500 group-hover:bg-gold/10"></div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                   <input type="text" name="name" placeholder="John Player" className="w-full bg-cream border-2 border-transparent focus:border-gold/30 p-5 rounded-2xl focus:ring-0 outline-none transition-all placeholder:text-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email</label>
                    <input type="email" name="email" placeholder="john@events.co.za" className="w-full bg-cream border-2 border-transparent focus:border-gold/30 p-5 rounded-2xl focus:ring-0 outline-none transition-all placeholder:text-gray-300" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Phone Number</label>
                  <input type="tel" name="phone" placeholder="082 123 4567" className="w-full bg-cream border-2 border-transparent focus:border-gold/30 p-5 rounded-2xl focus:ring-0 outline-none transition-all placeholder:text-gray-300" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Event Date & Location</label>
                  <input type="text" name="event_details" placeholder="Somerset West / Stellenbosch - Nov 20th" className="w-full bg-cream border-2 border-transparent focus:border-gold/30 p-5 rounded-2xl focus:ring-0 outline-none transition-all placeholder:text-gray-300" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Enclosure Type</label>
                    <select 
                      name="enclosure_type" 
                      value={enclosureType}
                      onChange={(e) => setEnclosureType(e.target.value)}
                      className="w-full bg-cream border-2 border-transparent focus:border-gold/30 p-5 rounded-2xl focus:ring-0 outline-none transition-all text-gray-500"
                    >
                      <option value="Backyard Budget">Backyard Budget</option>
                      <option value="Outdoor Enclosure">Outdoor Enclosure</option>
                      <option value="Corporate Indoor">Corporate Indoor</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Duration</label>
                    <select 
                      name="duration" 
                      className="w-full bg-cream border-2 border-transparent focus:border-gold/30 p-5 rounded-2xl focus:ring-0 outline-none transition-all text-gray-500"
                    >
                      {enclosureType === 'Corporate Indoor' ? (
                        <>
                          <option value="Half Day">Half Day</option>
                          <option value="Full Day">Full Day</option>
                        </>
                      ) : (
                        <>
                          <option value="4 Hours">4 Hours (Minimum)</option>
                          <option value="5 Hours">5 Hours</option>
                          <option value="6 Hours">6 Hours</option>
                          <option value="7+ Hours">7+ Hours</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
                <button className="w-full bg-mountainGreen text-white font-black py-6 rounded-2xl hover:bg-maroon transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.3em] flex items-center justify-center gap-4 mt-4">
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
            <div className="flex gap-4">
  <a href="/privacy.html" className="text-gray-400 hover:text-gold text-sm transition-colors">Privacy Policy</a>
  <a href="/terms.html" className="text-gray-400 hover:text-gold text-sm transition-colors">Booking Terms</a>
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
