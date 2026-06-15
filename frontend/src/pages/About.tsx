import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function About() {
  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-zinc-950 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container relative z-10 mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight"
          >
            Our <span className="text-primary">Story</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Built on a Foundation of Trust</h2>
              <div className="w-20 h-1 bg-primary" />
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Welcome to Ahmadi Hardware, your trusted destination for quality hardware, plywood, construction materials, and essential tools. Established in 2025, our company was founded with a commitment to providing durable products, reliable service, and complete customer satisfaction.
                </p>
                <p>
                  Ahmadi Hardware was founded by Sharik Ali and co-founded by Shimab Ali, two brothers who turned their shared vision and dedication into a growing business built on trust, quality, and strong customer relationships.
                </p>
                <p>
                  We offer a wide range of products, including plywood, doors, laminates, nails, hammers, hand tools, construction accessories, and various hardware essentials required for homes, workshops, and building projects. Every product we provide is carefully selected to ensure quality, durability, and value for money.
                </p>
                <p>
                   Our goal is to make quality hardware products easily accessible through both traditional and online channels, helping customers find everything they need in one place. We believe that trust, transparency, and consistent service are the foundation of long-term success.
                </p>
                <p>
                  As we continue to grow, our mission remains the same: to deliver dependable products, competitive prices, and exceptional customer support while building lasting relationships with customers across the region.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/5] bg-muted p-4"
            >
              <img 
                src="/images/about-team.png" 
                alt="Ahmadi Hardware Team" 
                className="w-full h-full object-cover grayscale-[20%] sepia-[10%] border-4 border-background shadow-xl relative z-10" 
              />
              <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-primary/10 -translate-y-4 translate-x-4 z-0" />
              <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-zinc-900/5 translate-y-4 -translate-x-4 z-0" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Our Core Values</h2>
            <p className="mt-4 text-muted-foreground text-lg">The principles that drive every transaction.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "No Compromise", desc: "If a tool isn't good enough for us to use, it's not good enough for our shelves." },
              { title: "Expertise First", desc: "Our staff undergoes rigorous training. We don't guess; we know." },
              { title: "Reliability", desc: "When we say we have it, we have it. When we say we'll deliver it, it arrives on time." }
            ].map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-border bg-background relative group"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-none mb-6">
                  <Check size={24} />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide mb-3">{val.title}</h3>
                <p className="text-muted-foreground">{val.desc}</p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
