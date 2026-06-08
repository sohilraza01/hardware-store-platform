import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Zap, Hammer, Wrench, Droplet, ShieldCheck, Paintbrush, Box, Check, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const productsData = [
  { id: "power-tools", name: "Power Tools", icon: Zap, img: "/images/power-tools.png", 
    desc: "Professional grade drills, saws, and grinders built for demanding sites.",
    features: ["Cordless & Corded", "Heavy-Duty Motors", "Extended Warranties"]
  },
  { id: "hand-tools", name: "Hand Tools", icon: Hammer, img: "/images/hand-tools.png", 
    desc: "Precision crafted hand tools that feel right and last a lifetime.",
    features: ["Forged Steel", "Ergonomic Grips", "Lifetime Guarantee"]
  },
  { id: "fasteners", name: "Fasteners & Hardware", icon: Wrench, img: "/images/fasteners.png", 
    desc: "Every bolt, nut, and anchor you need, available in bulk quantities.",
    features: ["Galvanized & Stainless", "Structural Grade", "Bulk Bins"]
  },
  { id: "electrical", name: "Electrical Supplies", icon: Zap, img: "/images/electrical.png", 
    desc: "Safe, reliable electrical components for residential and commercial.",
    features: ["Romex & Conduit", "Industrial Breakers", "Smart Home Ready"]
  },
  { id: "plumbing", name: "Plumbing", icon: Droplet, img: "/images/plumbing.png", 
    desc: "Pipes, fittings, and fixtures built to handle pressure.",
    features: ["PEX, Copper, PVC", "Industrial Valves", "Sump Pumps"]
  },
  { id: "safety", name: "Safety Equipment", icon: ShieldCheck, img: "/images/safety.png", 
    desc: "OSHA-compliant safety gear to protect you and your crew.",
    features: ["Hard Hats & Harnesses", "Respirators", "High-Vis Apparel"]
  },
  { id: "paint", name: "Paint & Supplies", icon: Paintbrush, img: "/images/paint.png", 
    desc: "Premium coatings, brushes, and masking supplies for a perfect finish.",
    features: ["Industrial Coatings", "Pro Sprayers", "Epoxy Floor Systems"]
  },
  { id: "materials", name: "Building Materials", icon: Box, img: "/images/materials.png", 
    desc: "The raw materials that form the foundation of your build.",
    features: ["Premium Lumber", "Drywall & Mud", "Portland Cement"]
  },
];

export default function Products() {
  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-zinc-950 py-24 text-center">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight"
          >
            Product <span className="text-primary">Catalog</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            Everything you need for the job site, stocked deep and ready to move.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Search Bar - Visual only */}
          <div className="max-w-xl mx-auto mb-16 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input 
              type="text" 
              placeholder="Search for tools, materials, or brands..." 
              className="h-14 pl-12 rounded-none border-2 border-border focus-visible:border-primary text-lg"
            />
          </div>

          <div className="space-y-24">
            {productsData.map((category, idx) => (
              <div 
                key={category.id} 
                id={category.id} 
                className="scroll-mt-32"
              >
                <div className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}>
                  
                  {/* Image Side */}
                  <motion.div 
                    initial={{ opacity: 0, x: idx % 2 !== 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full md:w-1/2"
                  >
                    <div className="relative aspect-video md:aspect-[4/3] bg-muted overflow-hidden border border-border group">
                      <img 
                        src={category.img} 
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 border-4 border-transparent group-hover:border-primary/20 transition-colors duration-300" />
                    </div>
                  </motion.div>

                  {/* Content Side */}
                  <motion.div 
                    initial={{ opacity: 0, x: idx % 2 !== 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full md:w-1/2 space-y-6"
                  >
                    <div className="flex items-center gap-4 text-primary">
                      <category.icon size={32} />
                      <div className="h-px bg-primary/30 flex-grow" />
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">
                      {category.name}
                    </h2>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {category.desc}
                    </p>
                    
                    <ul className="space-y-3 pt-4">
                      {category.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-3 text-foreground font-medium">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check size={14} className="text-primary" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="pt-6">
                      <Button variant="outline" className="rounded-none border-2 uppercase font-bold tracking-wider hover:bg-primary hover:text-primary-foreground hover:border-primary">
                        View Inventory
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      
      {/* Brands Banner */}
      <section className="py-16 bg-muted border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">Stocking the industry's best brands</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Visual placeholders for brands */}
            <div className="text-2xl font-black tracking-tighter">DEWALT</div>
            <div className="text-2xl font-black tracking-tighter">MILWAUKEE</div>
            <div className="text-2xl font-black tracking-tighter">MAKITA</div>
            <div className="text-2xl font-black tracking-tighter">BOSCH</div>
            <div className="text-2xl font-black tracking-tighter">KLEIN</div>
          </div>
        </div>
      </section>

    </PageTransition>
  );
}
