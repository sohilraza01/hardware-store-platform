import { PageTransition } from "@/components/PageTransition";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, Hammer, ShieldCheck, Zap, Droplet, Paintbrush, HardHat, Box } from "lucide-react";
import { Link } from "wouter";
import { useRef, useEffect, useState } from "react";

// --- Data ---
const categories = [
  { id: "power-tools", name: "Power Tools", icon: Zap, img: "/images/power-tools.png", items: "Drills, Saws, Grinders" },
  { id: "hand-tools", name: "Hand Tools", icon: Hammer, img: "/images/hand-tools.png", items: "Hammers, Wrenches" },
  { id: "fasteners", name: "Fasteners & Hardware", icon: Wrench, img: "/images/fasteners.png", items: "Bolts, Nuts, Anchors" },
  { id: "electrical", name: "Electrical Supplies", icon: Zap, img: "/images/electrical.png", items: "Wiring, Outlets" },
  { id: "plumbing", name: "Plumbing", icon: Droplet, img: "/images/plumbing.png", items: "Pipes, Fittings" },
  { id: "safety", name: "Safety Equipment", icon: ShieldCheck, img: "/images/safety.png", items: "Gloves, Helmets" },
  { id: "paint", name: "Paint & Supplies", icon: Paintbrush, img: "/images/paint.png", items: "Paints, Brushes" },
  { id: "materials", name: "Building Materials", icon: Box, img: "/images/materials.png", items: "Lumber, Cement" },
];

const stats = [
  { label: "Years in Business", value: 2, suffix: "+" },
  { label: "Products", value: 1000, suffix: "+" },
  { label: "Happy Customers", value: 500, suffix: "+" },
  { label: "Top Brands", value: 150, suffix: "+" },
];

const testimonials = [
  { text: "Ahmadi Hardware has been supplying our construction firm for over a decade. They never miss a delivery and their quality is unmatched.", author: "James T.", role: "General Contractor" },
  { text: "When I need specific fasteners that big box stores don't carry, Ahmadi always has them in stock. The staff actually knows what they're talking about.", author: "Sarah M.", role: "Custom Fabricator" },
  { text: "Their power tool selection and warranty support keeps my crew running. Downtime is expensive, and Ahmadi gets that.", author: "Marcus R.", role: "Site Supervisor" },
];

// --- Components ---

function Counter({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    
    let startTime: number;
    let animationFrame: number;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(from + (to - from) * easeProgress);
      
      if (nodeRef.current) {
        nodeRef.current.textContent = currentVal.toLocaleString();
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationFrame);
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{from}</span>;
}

export default function Home() {
  return (
    <PageTransition>
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img src="/images/hero-bg.png" alt="Hardware Store" className="w-full h-full object-cover object-center opacity-70" />
          </motion.div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6 py-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight uppercase">
                Industrial Strength. <br />
                <span className="text-primary">Modern Precision.</span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 text-xl md:text-2xl text-zinc-300 max-w-2xl leading-relaxed"
            >
              The trusted supply partner for professional contractors and dedicated builders since 1999.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="rounded-none h-14 px-8 text-lg font-bold uppercase tracking-wider overflow-hidden relative group">
                <Link href="/products">
                  <span className="relative z-10 flex items-center gap-2">
                    Shop Catalog <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none h-14 px-8 text-lg font-bold uppercase tracking-wider border-2 border-white text-white hover:bg-white hover:text-zinc-950 bg-transparent">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-2"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
                  <Counter to={stat.value} />
                  {stat.suffix}
                </div>
                <p className="text-sm md:text-base font-medium uppercase tracking-widest text-primary-foreground/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-black uppercase tracking-tight"
              >
                Professional Grade <br />
                <span className="text-muted-foreground">Equipment</span>
              </motion.h2>
              <p className="mt-4 text-lg text-muted-foreground">Everything you need from foundation to finish.</p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Button asChild variant="ghost" className="mt-6 md:mt-0 font-bold uppercase tracking-wider group">
                <Link href="/products">
                  View All Products <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <Link href={`/products#${cat.id}`} className="block group relative h-72 overflow-hidden bg-muted flex flex-col justify-end">
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={cat.img} 
                          alt={cat.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                      </div>
                      
                      <div className="relative z-10 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="w-12 h-12 rounded-none bg-primary flex items-center justify-center text-primary-foreground mb-4">
                          <Icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white uppercase tracking-wide">{cat.name}</h3>
                        <p className="text-zinc-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{cat.items}</p>
                      </div>
                      
                      {/* Accent line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[600px] bg-muted"
            >
              <img src="/images/hand-tools.png" alt="Quality Tools" className="w-full h-full object-cover" />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary p-8 hidden md:flex flex-col justify-center text-primary-foreground">
                <ShieldCheck size={48} className="mb-4" />
                <h4 className="text-2xl font-black uppercase">Built for Builders</h4>
                <p className="mt-2 text-primary-foreground/80 text-sm">Industrial grade materials that won't quit.</p>
              </div>
            </motion.div>

            <div className="space-y-10">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-5xl font-black uppercase tracking-tight"
                >
                  The Ahmadi <br />
                  <span className="text-primary">Advantage</span>
                </motion.h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  We don't just sell hardware. We provide the backbone for your projects. Our team consists of former tradesmen who understand exactly what you need on the job site.
                </p>
              </div>

              <ul className="space-y-8">
                {[
                  { title: "Uncompromising Quality", desc: "We stock only the brands that have proven themselves in the field." },
                  { title: "Expert Knowledge", desc: "Not sure what fastener to use? Our counter staff has the real-world experience to guide you." },
                  { title: "Bulk Availability", desc: "Contractor quantities ready to roll out immediately. No waiting weeks for a pallet." }
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{item.title}</h4>
                      <p className="text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">Word on the Site</h2>
            <div className="h-1 w-20 bg-primary mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border p-8 relative group hover:border-primary/50 transition-colors"
              >
                <div className="text-primary text-6xl font-serif absolute top-4 left-4 opacity-10">"</div>
                <p className="relative z-10 text-lg italic text-muted-foreground mb-8 leading-relaxed">"{test.text}"</p>
                <div>
                  <p className="font-bold text-foreground uppercase tracking-wide">{test.author}</p>
                  <p className="text-sm text-primary">{test.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-32 overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform origin-top" />
        
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight"
          >
            Ready to Build?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-xl text-zinc-300 mb-10"
          >
            Get a custom quote for your next major project or open a contractor account today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button asChild size="lg" className="h-16 px-10 rounded-none text-xl font-bold uppercase tracking-wider relative overflow-hidden group">
              <Link href="/contact">
                <span className="relative z-10 flex items-center gap-2">Contact Us <ArrowRight className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
