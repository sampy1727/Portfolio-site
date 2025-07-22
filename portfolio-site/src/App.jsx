import React, { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, ExternalLink, Code, Brain, Sparkles, ArrowDown, Star, Zap } from "lucide-react";

const projects = [
  {
    title: "My Portfolio",
    desc: "Personal website built with React and Tailwind with modern animations and interactive elements.",
    link: "https://github.com/sampy1727/Portfolio-site",
    tech: ["React", "Tailwind", "Framer Motion"],
    gradient: "from-pink-500 to-violet-500"
  },
  {
    title: "GoRent",
    desc: "Web application for seamless property rental management. The platform enables users to browse, list, and manage rental properties with secure authentication and a user-friendly interface.",
    link: "https://github.com/sampy1727/GoRent",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    gradient: "from-emerald-500 to-cyan-500"
  },
  {
    title: "TaskMind",
    desc: " Taskmind  is  a  full-stack  productivity  and  task  management app which features  real-time  updates  and  collaborative  task management.  Designed  for  efficient,  organized,  and  secure team productivity. ",
    link: "https://github.com/sampy1727/TaskMind",
    tech: ["React", "Multer", "MongoDB","Express","Node.js"],
    gradient: "from-orange-500 to-red-500"
  }
];

const skills = ["React", "WebSocket", "Express", "Node.js", "Mysql", "MongoDB", "Git"];

const FloatingParticle = ({ delay = 0 }) => {
  const [position, setPosition] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    opacity: Math.random() * 0.6 + 0.2
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => ({
        x: (prev.x + (Math.random() - 0.5) * 30) % 100,
        y: (prev.y + (Math.random() - 0.5) * 30) % 100,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.6 + 0.2
      }));
    }, 3000 + delay * 200);

    return () => clearInterval(interval);
  }, [delay]);

  return (
    <div
      className="absolute rounded-full bg-gradient-to-br from-yellow-400/50 via-black-500/50 to-pink-500/50 blur-sm animate-pulse"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${position.size}px`,
        height: `${position.size}px`,
        opacity: position.opacity,
        transition: 'all 3s cubic-bezier(0.4, 0, 0.2, 1)',
        animationDelay: `${delay * 0.5}s`,
        animationDuration: `${2 + Math.random() * 2}s`
      }}
    />
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black-950/50 to-slate-900" />
      
      {/* Animated mesh overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      {/* Floating particles */}
      {[...Array(25)].map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.3} />
      ))}

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

const GradientText = ({ children, className = "", gradient = "from-yellow-400 via-purple-500 to-pink-500" }) => (
  <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent animate-gradient-x ${className}`}>
    {children}
  </span>
);

const TypewriterText = ({ text, speed = 100, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, delay]);

  return (
    <span className="relative">
      {displayText}
      <span className="animate-pulse text-yellow-400">|</span>
    </span>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsInView(true), index * 150);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 transition-all duration-700 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 ${
        isInView 
          ? 'opacity-100 translate-y-0 rotate-0' 
          : 'opacity-0 translate-y-16 rotate-3'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateZ(50px)' : 'translateZ(0)',
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      {/* Shine effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000`} />

      {/* Floating icons */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Star className={`w-4 h-4 text-yellow-400 transition-all duration-500 ${isHovered ? 'scale-125 animate-spin' : 'scale-0'}`} />
        <Zap className={`w-4 h-4 text-purple-400 transition-all duration-700 ${isHovered ? 'scale-125 animate-bounce' : 'scale-0'}`} />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-purple-500 transition-all duration-500">
            {project.title}
          </h3>
          <ExternalLink className={`w-6 h-6 text-white/70 transition-all duration-500 group-hover:text-yellow-400 ${isHovered ? 'scale-125 rotate-45' : ''}`} />
        </div>

        <p className="text-gray-300 mb-6 leading-relaxed text-lg">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {project.tech.map((tech, i) => (
            <span 
              key={i} 
              className={`px-4 py-2 text-sm bg-gradient-to-r from-white/10 to-white/5 text-white rounded-full border border-white/20 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:bg-gradient-to-r hover:from-yellow-400/20 hover:to-purple-500/20 hover:border-yellow-400/40 ${
                isHovered ? 'animate-pulse' : ''
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${project.gradient} text-white rounded-xl font-semibold transition-all duration-500 hover:shadow-2xl hover:scale-105 group/btn`}
        >
          <Github className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" />
          <span>View Project</span>
          <div className="w-0 group-hover/btn:w-6 overflow-hidden transition-all duration-300">
            <ExternalLink className="w-4 h-4 ml-2" />
          </div>
        </a>
      </div>
    </div>
  );
};

const SkillBubble = ({ skill, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 text-center font-semibold transition-all duration-700 hover:scale-110 hover:rotate-3 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        transform: isHovered ? 'translateZ(20px) rotateX(10deg)' : 'translateZ(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-purple-500/20 rounded-2xl opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`} />
      <span className="relative z-10 text-white">{skill}</span>
      
      {/* Floating particles on hover */}
      {isHovered && (
        <div className="absolute -top-2 -right-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    setTimeout(() => setIsVisible(true), 500);

   
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden font-inter selection:bg-yellow-400/20 selection:text-yellow-400">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Mouse follower effect */}
      <div
        className="fixed w-96 h-96 pointer-events-none z-10 opacity-30 transition-all duration-200 ease-out"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, rgba(147,51,234,0.1) 50%, transparent 70%)',
        }}
      />

      <div className="relative z-20">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 relative">
          <div 
            className={`transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="mb-8 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" />
              <h1 className="relative text-6xl md:text-8xl font-black mb-4 tracking-tight">
                <span className="text-white">Hi, I'm </span>
                <GradientText className="animate-gradient-x">Sameer</GradientText>
              </h1>
              
              <div className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-light text-white/90">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                <TypewriterText text="Building the Future" delay={1000} speed={80} />
                <Sparkles className="w-8 h-8 text-purple-400 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
              </div>
            </div>

            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              CSE Undergrad @ <span className="text-yellow-400 font-bold">NIT Warangal</span> | 
              Passionate about <GradientText>AI & Full-Stack Development</GradientText>
            </p>

            <div className="flex justify-center gap-8 mb-12">
              {[
                { Icon: Github, href: "https://github.com/yourusername", label: "GitHub", color: "hover:text-white" },
                { Icon: Linkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn", color: "hover:text-blue-400" },
                { Icon: Mail, href: "mailto:sameer@email.com", label: "Email", color: "hover:text-red-400" }
              ].map(({ Icon, href, label, color }, index) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group relative p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 transition-all duration-500 hover:scale-110 hover:rotate-12 hover:bg-white/20 hover:shadow-2xl ${color}`}
                  style={{ 
                    animationDelay: `${index * 200}ms`,
                    transform: `translateY(${Math.sin(Date.now() * 0.001 + index) * 5}px)`
                  }}
                >
                  <Icon className="w-8 h-8 transition-all duration-300 group-hover:scale-125" />
                  <span className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-sm bg-black/90 px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                    {label}
                  </span>
                  
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-purple-500/0 group-hover:from-yellow-400/20 group-hover:to-purple-500/20 rounded-2xl transition-all duration-500 -z-10 blur-xl" />
                </a>
              ))}
            </div>

            <div className="text-sm text-white/60 font-mono bg-black/20 px-6 py-3 rounded-full backdrop-blur-sm border border-white/10">
              <span className="animate-pulse text-green-400">●</span> Local Time: {currentTime.toLocaleTimeString()} | Warangal, India 🇮🇳
            </div>
          </div>

          {/* Enhanced scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="text-sm text-white/60 animate-pulse">Scroll to explore</div>
            <div className="relative">
              <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center overflow-hidden">
                <div className="w-2 h-3 bg-gradient-to-b from-yellow-400 to-purple-500 rounded-full mt-2 animate-bounce" />
              </div>
              <ArrowDown className="w-4 h-4 text-white/40 mt-2 animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6">
              About <GradientText>Me</GradientText>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <p className="text-xl text-white/80 leading-relaxed">
                I'm a passionate Computer Science student at NIT Warangal, driven by the intersection of
                <span className="text-yellow-400 font-bold"> artificial intelligence</span> and
                <span className="text-purple-400 font-bold"> full-stack development</span>.
              </p>
              <p className="text-xl text-white/80 leading-relaxed">
                My journey involves building scalable applications and exploring cutting-edge AI technologies
                to solve real-world problems that make a meaningful impact.
              </p>

              {[
                { Icon: Code, title: "Clean Code Advocate", desc: "Writing maintainable, scalable solutions", color: "yellow" },
                { Icon: Brain, title: "AI Enthusiast", desc: "Exploring machine learning & neural networks", color: "purple" }
              ].map(({ Icon, title, desc, color }, index) => (
                <div 
                  key={title}
                  className={`flex items-center gap-6 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 group`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`p-4 bg-gradient-to-br ${color === 'yellow' ? 'from-yellow-400/20 to-orange-500/20' : 'from-purple-400/20 to-pink-500/20'} rounded-xl`}>
                    <Icon className={`w-8 h-8 ${color === 'yellow' ? 'text-yellow-400' : 'text-purple-400'} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-xl ${color === 'yellow' ? 'text-yellow-400' : 'text-purple-400'}`}>{title}</h3>
                    <p className="text-white/70">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-center mb-8">
                <GradientText>Tech Stack</GradientText>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <SkillBubble 
                    key={skill}
                    skill={skill}
                    index={index}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6">
              Featured <GradientText>Projects</GradientText>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 mx-auto rounded-full mb-8" />
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Here are some of my recent projects that showcase my skills in web development and machine learning
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 px-6 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-6">
              Let's <GradientText>Connect</GradientText>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 mx-auto rounded-full mb-12" />

            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Always excited to collaborate on innovative projects or discuss the latest in tech.
              Let's build something amazing together!
            </p>

            <a
              href="mailto:sameerlucky1729@email.com"
              className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 text-white text-xl font-bold rounded-full transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Mail className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">Get In Touch</span>
              <Sparkles className="w-5 h-5 relative z-10 group-hover:animate-spin transition-transform duration-300" />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 text-center bg-black/20 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-white/70 mb-4 text-lg">
              © {new Date().getFullYear()} Sameer Lucky. Crafted with <span className="text-red-400 animate-pulse">❤️</span> and lots of <span className="text-yellow-400">☕</span>
            </p>
            <p className="text-white/50 italic">
              "Code is like humor. When you have to explain it, it's bad." - Cory House
            </p>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}