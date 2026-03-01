/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import {
  Circle,
  Terminal,
  Shield,
  Cpu,
  Globe,
  Lock,
  ArrowRight,
  Mail,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  ExternalLink,
  ChevronRight,
  Database,
  Signal,
  Download,
  Award,
  BadgeCheck
} from "lucide-react";
import { useState, useRef } from "react";

const CERTIFICATIONS = [
  { name: "CCNA", org: "Cisco", image: "/img/CCNA.png", verificationUrl: "https://www.credly.com/org/fortinet/badge/nse-trainer-assessment-professional-level" },
  { name: "ITIL 4", org: "Axelos", image: "/img/ITIL4.png", verificationUrl: "https://www.credly.com/org/peoplecert/badge/itil-4-foundation" },
  { name: "Networking Basics", org: "Cisco", image: "/img/NB.png", verificationUrl: "https://www.credly.com/badges/83505ccb-6fc2-4422-aaa7-54a267e31acd/public_url" },
  { name: "Python Essentials 1", org: "Cisco", image: "/img/PE1.png", verificationUrl: "https://www.credly.com/badges/29d74b25-f6ec-437e-a487-61f3603dd7a2/public_url" },
  { name: "NSE", org: "Fortinet", image: "/img/NSE.png", verificationUrl: "https://www.credly.com/badges/ca77ebeb-fbd8-41b7-9188-0bae6593189b/public_url" },
  { name: "MTCNA", org: "MikroTik", image: "/img/MTCNA.png", verificationUrl: "https://mikrotik.com/training/certificates/c332718c0b17b4fa918a" },
  { name: "MTCSE", org: "MikroTik", image: "/img/MTCSE.png", verificationUrl: "https://mikrotik.com/training/certificates/c502221c7d93e66c3e97" },
  { name: "MTCRE", org: "MikroTik", image: "/img/MTCRE.png", verificationUrl: "https://mikrotik.com/training/certificates/c519992cbe74dee1b91f" },
  { name: "Junior Cybersecurity Analyst Career Path", org: "Cisco", image: "/img/JCACP.png", verificationUrl: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate.html" },
  { name: "ISC2 Candidate", org: "ISC2", image: "/img/ISC2.png", verificationUrl: "https://www.isc2.org/Certifications/CC" }
];

const PROJECTS = [
  {
    id: "01",
    title: "Machine Learning Algorithms for Filtering Data Acquired by Arduino",
    tags: ["[ESP32]", "[EDGE IMPULSE]"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    description: "Neutralizing large-scale distributed denial-of-service threats.",
    isLongTitle: true,
    publicationUrl: "https://link.springer.com/chapter/10.1007/978-3-031-70981-4_23"
  },
  {
    id: "02",
    title: "IoT-Based System for Detecting and Monitoring LPG Leaks in Residential Settings",
    tags: ["[IoT]", "[Real Time Monitoring]"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    description: "Modernizing corporate perimeter defense with identity-centric models.",
    isLongTitle: true,
    publicationUrl: "https://www.mdpi.com/2673-4591/115/1/9"
  }
];

const COURSES = [
  { title: "Campos de la IA aplicados en la industria", org: "IEEE Student Branch", date: "Jul 2021" },
  { title: "Seguridad en Redes “SEGRED”", org: "IEEE ComSoc", date: "Oct 2021" },
  { title: "Programación en ESP32 y aplicaciones IoT", org: "MMJ Smart Electronics", date: "Apr 2022" },
  { title: "Gestión Básica de Redes Informáticas", org: "M&T Ingeniería", date: "Sep 2022" },
  { title: "Ciberseguridad en Entornos Educativos", org: "Telefónica Movistar", date: "Oct 2022" },
  { title: "Python Essentials 1", org: "Cisco Networking Academy", date: "Oct 2022" },
  { title: "Curso Práctico de Redes y Antenas", org: "Inpronet CIA. LTDA.", date: "Jan 2023" },
  { title: "Redes FTTH - GPON y manejo de certificadores", org: "TCS y UTA EP", date: "Oct–Nov 2023" },
  { title: "Emerging Research Frontiers in Computer Science, Electronics and Industrial Engineering", org: "CSEI, Springer, Scopus", date: "Nov 2023" },
  { title: "Deep Learning with Python", org: "IEEE", date: "Jan 2024" },
  { title: "Nuevas utilidades y funciones destacadas de Netsupport Manager", org: "Netsupport", date: "May 2024" },
  { title: "MikroTik Certified Network Associate - MTCNA", org: "Mikrotik", date: "Aug 2024" },
  { title: "Seguridad Ofensiva", org: "Academy XPERTS", date: "Feb 2025" },
  { title: "Carrera Profesional de Analista Junior en Ciberseguridad", org: "Cisco", date: "Mar 2025" },
  { title: "Ingeniero Certificado en Seguridad - MTCSE", org: "Mikrotik", date: "Sep 2025" }
];

const NavItem = ({ href, label, active }: { href: string; label: string; active?: boolean }) => (
  <a
    href={href}
    className={`font-mono text-[9px] md:text-xs uppercase tracking-widest py-2 md:py-4 px-2 md:px-0 transition-all duration-300 hover:text-primary whitespace-nowrap ${active ? 'text-primary line-through' : 'text-zinc-500'}`}
  >
    {label}
  </a>
);

export default function App() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Intersection Observer to track active section
  useState(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Adjust margin to trigger when section is roughly in the middle
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // We need to wait for the component to mount to observe elements
    setTimeout(() => {
      ['hero', 'profile', 'credentials', 'work', 'projects', 'courses', 'certifications'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  });

  return (
    <div className="flex flex-col md:flex-row bg-void min-h-screen selection:bg-primary selection:text-black" ref={containerRef}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full h-16 md:h-screen md:w-28 border-b md:border-b-0 md:border-r border-border-dim z-50 flex flex-row md:flex-col items-center px-4 md:px-0 md:py-4 bg-void/95 backdrop-blur-md">
        <div className="flex-shrink-0 md:h-12 flex items-center md:items-start justify-center mr-4 md:mr-0 gap-2">
          <Circle className="text-primary animate-pulse w-3 h-3" />
          <span className="md:hidden font-mono text-[10px] text-primary uppercase tracking-widest font-bold">Mateo Llerena</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-col justify-between items-center gap-4 w-full flex-grow">
          <NavItem href="#hero" label="INICIO" active={activeSection === 'hero'} />
          <NavItem href="#profile" label="PERFIL" active={activeSection === 'profile'} />
          <NavItem href="#credentials" label="TRAYECTORIA" active={activeSection === 'credentials'} />
          <NavItem href="#work" label="PUBLICACIONES" active={activeSection === 'work'} />
          <NavItem href="#courses" label="CURSOS" active={activeSection === 'courses'} />
          <NavItem href="#certifications" label="INSIGNIAS" active={activeSection === 'certifications'} />
          <NavItem href="#projects" label="PROYECTOS" active={activeSection === 'projects'} />
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex-grow flex items-center justify-end">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col gap-1.5 p-2 hover:opacity-70 transition-opacity"
          >
            <div className={`w-5 h-0.5 bg-primary transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-0.5 bg-primary transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-primary transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-16 left-0 w-full bg-void/98 border-b border-border-dim flex flex-col"
          >
            <div className="flex flex-col gap-2 p-4">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="font-mono text-xs text-zinc-400 hover:text-primary py-2 px-2 transition-colors uppercase tracking-widest">INICIO</a>
              <a href="#profile" onClick={() => setMobileMenuOpen(false)} className="font-mono text-xs text-zinc-400 hover:text-primary py-2 px-2 transition-colors uppercase tracking-widest">PERFIL</a>
              <a href="#credentials" onClick={() => setMobileMenuOpen(false)} className="font-mono text-xs text-zinc-400 hover:text-primary py-2 px-2 transition-colors uppercase tracking-widest">TRAYECTORIA</a>
              <a href="#work" onClick={() => setMobileMenuOpen(false)} className="font-mono text-xs text-zinc-400 hover:text-primary py-2 px-2 transition-colors uppercase tracking-widest">PUBLICACIONES</a>
              <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="font-mono text-xs text-zinc-400 hover:text-primary py-2 px-2 transition-colors uppercase tracking-widest">CURSOS</a>
              <a href="#certifications" onClick={() => setMobileMenuOpen(false)} className="font-mono text-xs text-zinc-400 hover:text-primary py-2 px-2 transition-colors uppercase tracking-widest">INSIGNIAS</a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="font-mono text-xs text-zinc-400 hover:text-primary py-2 px-2 transition-colors uppercase tracking-widest">PROYECTOS</a>
            </div>
          </motion.div>
        )}

        <div className="hidden md:flex h-12 w-full flex-col items-center justify-end gap-1">
          <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-tighter">ACTIVO</span>
          <div className="w-1 h-1 rounded-full bg-primary shadow-[0_0_5px_#39FF14]" />
        </div>
      </nav>

      <main className="pt-16 md:pt-0 md:pl-28 w-full overflow-x-hidden">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen relative flex items-center justify-center border-b border-border-dim overflow-hidden">
          <div className="absolute top-8 right-8 flex items-center gap-2 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs text-primary tracking-widest uppercase">Servicio: ENCENDIDO</span>
          </div>

          <div className="w-full max-w-[90%] md:max-w-[85%] mx-auto z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col relative"
            >
              <h1 className="font-display font-bold text-5xl md:text-8xl lg:text-[140px] leading-[0.85] tracking-tighter uppercase mix-blend-difference">
                <span className="block hover:text-primary transition-colors duration-300">MATEO</span>
                <span className="block ml-4 md:ml-12 lg:ml-24 hover:text-primary transition-colors duration-300">LLERENA</span>
                <span className="block text-right hover:text-primary transition-colors duration-300">ORTEGA</span>
              </h1>

              <div className="mt-12 md:mt-16 ml-0 md:ml-12 max-w-md">
                <p className="font-sans text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
                  Conectando la infraestructura física con la defensa digital. Diseñando redes seguras para un futuro cada vez más inteligente y desafiante.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 border-t border-l border-border-dim opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-border-dim opacity-10 pointer-events-none" />
          <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        </section>

        {/* Profile Section */}
        <section id="profile" className="min-h-screen relative flex flex-col md:flex-row border-b border-border-dim">
          <div className="w-full md:w-[60%] p-8 md:p-20 flex flex-col justify-center border-r border-border-dim relative">
            <span className="absolute top-8 left-8 font-mono text-s text-zinc-600 uppercase tracking-widest">02 // PERFIL</span>

            <div className="max-w-xl mt-12 md:mt-0">
              <div className="space-y-8 font-sans text-lg md:text-xl font-light leading-relaxed text-zinc-300">
                <p>
                  Ingeniero en Telecomunicaciones, con sólida experiencia en administración de infraestructura tecnológica, redes y sistemas de monitoreo. He trabajado en la implementación de soluciones orientadas a la seguridad, disponibilidad y optimización de entornos empresariales.
                </p>
                <p>
                  Especializado en ciberseguridad, IoT y gestión de riesgos, con enfoque preventivo y estratégico para implementar soluciones seguras y eficientes. Actualmente curso una Maestría en Ciberseguridad, fortaleciendo mis competencias en protección de infraestructuras digitales.
                </p>
              </div>

              <div className="mt-16 pt-8 border-t border-border-dim">
                <ul className="font-mono text-xs md:text-sm text-zinc-500 space-y-4">
                  <li className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                    <span className="w-24 md:w-32 uppercase flex-shrink-0">INFRAESTRUCTURA IT</span>
                    <span className="text-white">SERVIDORES / VIRTUALIZACIÓN / ADMINISTRACIÓN DE SISTEMAS</span>
                  </li>
                  <li className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                    <span className="w-24 md:w-32 uppercase flex-shrink-0">Redes de Datos</span>
                    <span className="text-white">ENRUTAMIENTO / SWITCHING / FIREWALLS</span>
                  </li>
                  <li className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                    <span className="w-24 md:w-32 uppercase flex-shrink-0">CYBERSEGURIDAD </span>
                    <span className="text-white">SIEM / HARDENING / MANEJO DE LOGS / MITIGACIÓN DE AMENAZAS</span>
                  </li>
                  <li className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                    <span className="w-24 md:w-32 uppercase flex-shrink-0">AUTOMATIZACIÓN</span>
                    <span className="text-white">SCRIPTING / CI/CD / MONITOREO / INTEGRACIÓN DE SERVICIOS</span>
                  </li>
                </ul>
              </div>

              <div className="mt-12">
                <button className="flex items-center gap-2 bg-primary text-black font-mono text-[10px] font-bold px-6 py-3 hover:bg-white transition-colors uppercase tracking-widest shadow-[0_0_20px_rgba(57,255,20,0.2)]">
                  <Download size={14} />
                  Download CV
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[40%] bg-surface relative min-h-[50vh] md:min-h-auto overflow-hidden group">
            <img
              src="/img/MATEO.png"
              alt="Mateo Llerena"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-75 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-12 left-8 font-mono text-[10px] text-primary z-10 tracking-widest">
              // Mateo Llerena Ortega - Ingeniero en Telecomunicaciones - Especialista en Ciberseguridad
            </div>
            <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
          </div>
        </section>

        {/* Credentials Section */}
        <section id="credentials" className="min-h-[80vh] py-24 px-8 md:px-16 border-b border-border-dim relative">
          <span className="absolute top-8 left-8 font-mono text-s text-zinc-600 uppercase tracking-widest">03 // TRAYECTORIA ACADÉMICA</span>

          <div className="relative max-w-4xl mx-auto h-full mt-12">
            <div className="absolute left-4 md:left-1/3 top-0 bottom-0 w-px bg-border-dim" />

            <div className="space-y-24">
              {[
                { year: "2026", title: "Magister en Ciberseguridad", org: "Universidad Internacional del Ecuador", status: "EN CURSO" },
                { year: "2025", title: "Ingeniero en Telecomunicaciones", org: "Universidad Técnica de Ambato", id: "1010-2025-3175401" },
                { year: "2019", title: "Bachiller de la República del Ecuador", org: "Colegio Nacional Bolívar" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-8 relative">
                  <div className="md:w-1/3 md:text-right flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start px-8 md:px-12">
                    <span className="font-mono text-zinc-500 text-lg md:text-2xl font-bold">{item.year}</span>
                  </div>
                  <div className="absolute left-4 md:left-1/3 -translate-x-[4.5px] w-[10px] h-[10px] bg-white border-2 border-void" />
                  <div className="md:w-2/3 pl-12 md:pl-16">
                    <h4 className="font-display text-2xl mb-1 text-white uppercase tracking-tight">{item.title}</h4>
                    <p className="font-sans text-zinc-500 text-sm mb-4">{item.org}</p>
                    {item.status && (
                      <span className="inline-block border border-primary/30 px-2 py-0.5 font-mono text-[10px] text-primary uppercase">
                        {item.status}
                      </span>
                    )}
                    {item.id && (
                      <span className="inline-block border border-border-dim px-2 py-0.5 font-mono text-[10px] text-zinc-600 uppercase">
                        ID: {item.id}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="min-h-screen py-24 px-8 md:px-16 border-b border-border-dim bg-void relative">
          <span className="absolute top-8 left-8 font-mono text-s text-zinc-600 uppercase tracking-widest">04 // PUBLICACIONES DE INTERES CIENTÍFICO</span>

          <div className="max-w-[1400px] mx-auto mt-12">
            <div className="border-t border-border-dim">
              {PROJECTS.map((project) => (
                <motion.div
                  key={project.id}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="group block border-b border-border-dim py-12 hover:bg-white transition-all duration-300 relative"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 relative z-10 px-4">
                    <div className="flex items-baseline gap-8 md:gap-16">
                      <span className="font-mono text-zinc-600 group-hover:text-black">{project.id}</span>
                      <h3 className={`font-display ${project.isLongTitle ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-4xl md:text-6xl lg:text-7xl'} font-bold text-white group-hover:text-black uppercase tracking-tighter`}>
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex gap-4 font-mono text-[10px] text-zinc-500 group-hover:text-black self-end md:self-auto">
                        {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                      </div>
                      <div>
                        <a
                          href={project.publicationUrl ?? `#project-${project.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1 text-[12px] bg-transparent border border-border-dim hover:border-primary text-zinc-400 hover:text-primary font-mono uppercase tracking-wider transition-colors"
                        >
                          Revisar Publicación
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Hover Image Preview */}
                  {hoveredProject === project.id && (
                    <motion.div
                      layoutId="project-preview"
                      className="hidden lg:block absolute top-1/2 left-2/3 -translate-y-1/2 w-80 h-48 bg-void border border-primary z-20 overflow-hidden pointer-events-none mix-blend-difference"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-50 invert"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="min-h-screen py-24 px-8 md:px-16 border-b border-border-dim bg-void relative">
          <span className="absolute top-8 left-8 font-mono text-s text-zinc-600 uppercase tracking-widest">05 // CURSOS</span>

          <div className="max-w-[1400px] mx-auto mt-12">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {COURSES.map((course, idx) => (
                <div key={idx} className="group flex items-start gap-6 py-6 border-b border-border-dim/50 hover:border-primary transition-colors">
                  <span className="font-mono text-zinc-600 text-xs mt-1">{(idx + 1).toString().padStart(2, '0')}</span>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-display text-lg text-white group-hover:text-primary transition-colors uppercase tracking-tight">
                      {course.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="font-sans text-zinc-500 text-sm">{course.org}</span>
                      <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">{course.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="min-h-[60vh] py-24 px-8 md:px-16 border-b border-border-dim bg-surface/10 relative">
          <span className="absolute top-8 left-8 font-mono text-s text-zinc-600 uppercase tracking-widest">06 // INSIGNIAS Y CERTIFICACIONES</span>

          <div className="max-w-5xl mx-auto mt-12">
            <div className="flex flex-col gap-12">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {CERTIFICATIONS.map((cert) => (
                  <a
                    key={cert.name}
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border border-border-dim bg-void hover:border-primary transition-all duration-300 flex flex-col items-center text-center gap-3 relative overflow-hidden hover:shadow-[0_0_20px_rgba(57,255,20,0.1)]"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
                    
                    {/* Badge Image - show full badge centered */}
                    <div className="w-full h-32 md:h-36 flex items-center justify-center bg-surface p-3 relative">
                      <div className="w-full h-full flex items-center justify-center overflow-hidden">
                        <img
                          src={cert.image}
                          alt={cert.name}
                          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-void/50 pointer-events-none" />
                    </div>

                    {/* Certificate Info */}
                    <div className="flex flex-col gap-2 px-3 pb-3 flex-grow flex justify-end">
                      <div className="flex flex-col gap-1">
                        <span className="font-display text-white text-sm font-bold uppercase tracking-tight leading-tight">{cert.name}</span>
                        <span className="font-mono text-[10px] text-zinc-600 uppercase">{cert.org}</span>
                      </div>
                      
                      {/* Verification Link */}
                      <div className="flex items-center justify-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="font-mono text-[9px] uppercase">Verificar</span>
                        <ExternalLink size={12} />
                      </div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                      <Award size={80} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        
        {/* Projects Section (Featured) */}
        {/* <section id="projects" className="relative border-b border-border-dim bg-surface/30">
          <div className="absolute inset-0 z-0 opacity-5 pointer-events-none grid-pattern" />
          <span className="absolute top-8 left-8 font-mono text-s text-zinc-600 uppercase tracking-widest">06 // PROYECTOS</span>
          <div className="relative z-10 pt-24 pb-32 px-6 md:px-12 max-w-[1200px] mx-auto">
            <header className="flex flex-col gap-12 border-b border-border-dim pb-12 mb-24">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 border border-primary text-primary font-mono text-[10px] font-bold uppercase tracking-wider bg-primary/10">Project_01</span>
                  <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">ID: 5G-INFRA-HARDENING</span>
                </div>
                <h2 className="font-display font-bold text-5xl md:text-8xl leading-[0.9] tracking-tighter text-white uppercase">
                  Zero Trust<br />Implementation
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 border-t border-border-dim pt-6">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-zinc-600 text-[10px] uppercase">Role</span>
                  <span className="font-display text-white text-lg">Lead Architect</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-zinc-600 text-[10px] uppercase">Date</span>
                  <span className="font-display text-white text-lg">2023.09.12</span>
                </div>
                <div className="flex flex-col gap-1 md:col-span-2">
                  <span className="font-mono text-zinc-600 text-[10px] uppercase">Stack</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["Python", "Kubernetes", "Wireshark", "eBPF"].map(tech => (
                      <span key={tech} className="text-white border border-border-dim px-2 py-0.5 text-[10px] font-mono uppercase bg-void">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </header>

            <div className="max-w-[720px] mx-auto w-full flex flex-col gap-24">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-primary text-sm">01 //</span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold uppercase">The Breach</h3>
                </div>
                <div className="font-sans font-light text-lg leading-relaxed text-zinc-400 space-y-6">
                  <p>
                    During a routine stress test of the legacy LTE infrastructure, we identified a critical vulnerability in the lateral movement protocols. The existing perimeter defense was robust, but once inside, an attacker effectively had admin privileges across the entire node cluster.
                  </p>
                  <p>
                    The telemetry data revealed unexpected packet fragmentation, suggesting that internal traffic was being mirrored to an unauthorized endpoint. This wasn't just a configuration error; it was a fundamental architectural flaw in how the control plane verified node identity.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-primary text-sm">02 //</span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold uppercase">The Patch</h3>
                </div>
                <div className="font-sans font-light text-lg leading-relaxed text-zinc-400 space-y-6">
                  <p>
                    We implemented a Zero Trust Architecture (ZTA) using eBPF for granular observability at the kernel level. By shifting identity verification from the perimeter to the individual microservice level, we ensured that every packet request required explicit authorization.
                  </p>
                </div>

                <div className="bg-void border border-border-dim rounded-sm overflow-hidden my-6">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border-dim bg-zinc-900/50">
                    <span className="font-mono text-[10px] text-zinc-500">packet_inspector.py</span>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-zinc-700" />
                      <div className="w-2 h-2 rounded-full bg-zinc-700" />
                    </div>
                  </div>
                  <div className="p-6 overflow-x-auto">
                    <pre className="font-mono text-xs md:text-sm leading-6 text-zinc-300">
                      <code>
                        <span className="text-primary">def</span> <span className="text-blue-400">verify_packet_signature</span>(packet):{"\n"}
                        {"  "}<span className="text-zinc-500"># Validates cryptographic header against local keyring.</span>{"\n"}
                        {"  "}signature = packet.headers.get(<span className="text-emerald-400">'X-Sec-Auth'</span>){"\n"}
                        {"  "}{"\n"}
                        {"  "}<span className="text-primary">if not</span> signature:{"\n"}
                        {"    "}<span className="text-primary">raise</span> SecurityException(<span className="text-emerald-400">"No signature"</span>){"\n"}
                        {"  "}{"\n"}
                        {"  "}origin_key = keyring.fetch(packet.origin_id){"\n"}
                        {"  "}{"\n"}
                        {"  "}<span className="text-primary">if</span> crypto.verify(packet.payload, signature, origin_key):{"\n"}
                        {"    "}<span className="text-primary">return</span> <span className="text-emerald-400">True</span>{"\n"}
                        {"  "}{"\n"}
                        {"  "}logger.alert(<span className="text-emerald-400">f"BREACH ATTEMPT: {"{packet.origin_id}"}"</span>){"\n"}
                        {"  "}<span className="text-primary">return</span> <span className="text-emerald-400">False</span>
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-border-dim p-6 flex flex-col gap-2 bg-void hover:border-primary transition-colors">
                    <span className="font-mono text-[10px] text-zinc-600 uppercase">Threat Surface</span>
                    <span className="font-display text-4xl text-white font-bold">-90%</span>
                  </div>
                  <div className="border border-border-dim p-6 flex flex-col gap-2 bg-void hover:border-primary transition-colors">
                    <span className="font-mono text-[10px] text-zinc-600 uppercase">Latency</span>
                    <span className="font-display text-4xl text-white font-bold">-12%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>  */}

        {/* Footer */}
        <footer className="py-12 px-8 md:px-16 border-t border-border-dim bg-void">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">© 2026 Mateo Llerena</span>
              <span className="font-mono text-[10px] text-zinc-800 uppercase">Siempre en evolución</span>
            </div>

            <div className="flex gap-8">
              <a href="mailto:andrellere@hotmail.com" className="text-zinc-500 hover:text-primary transition-colors"><Mail size={18} /></a>
              <a href="https://www.facebook.com/mateolleren/" className="text-zinc-500 hover:text-primary transition-colors"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/mateo_llerena/" className="text-zinc-500 hover:text-primary transition-colors"><Instagram size={18} /></a>
              <a href="https://www.linkedin.com/in/mateo-llerena-114526334/" className="text-zinc-500 hover:text-primary transition-colors"><Linkedin size={18} /></a>
              <a href="https://github.com/Gulddin" className="text-zinc-500 hover:text-primary transition-colors"><Github size={18} /></a>
              <a href="https://sciprofiles.com/profile/4681650" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-primary transition-colors" title="SCI Profile"><Globe size={18} /></a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
