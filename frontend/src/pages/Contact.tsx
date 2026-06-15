import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <PageTransition>
      <section className="bg-zinc-950 py-24 text-center">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight"
          >
            Get In <span className="text-primary">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            Quotes, inventory checks, or expert advice. We're here to help.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight mb-6">Store Location & Hours</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-none">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Address</h4>
                      <p className="text-muted-foreground mt-1">A-49 Timber Market, Kirti Nagar<br />New Delhi 110015</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-none">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Phone</h4>
                      <p className="text-muted-foreground mt-1">+91 9690607659</p>
                      <p className="text-sm text-primary mt-1 font-medium">+91 7668393492</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-none">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Email</h4>
                      <p className="text-muted-foreground mt-1">shimabali123@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-none">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Operating Hours</h4>
                      <table className="w-full text-muted-foreground mt-1 max-w-xs">
                        <tbody>
                          <tr><td className="py-1">Mon - Sat</td><td className="text-right font-medium text-foreground px-1">9:00 AM - 9:00 PM</td></tr>
                          <tr><td className="py-1">Sunday</td><td className="text-right font-medium text-foreground">9:00 AM - 5:00 PM</td></tr>
                          {/* <tr><td className="py-1">Sunday</td><td className="text-right font-medium text-foreground">Closed</td></tr> */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="w-full h-64 bg-muted border border-border flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10" />
                <div className="text-center relative z-10">
                  <MapPin size={32} className="mx-auto text-primary mb-2 opacity-50" />
                  <p className="font-bold text-muted-foreground uppercase tracking-widest text-sm">Interactive Map</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-card p-8 border border-border shadow-lg">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Send a Message</h2>
                <p className="text-muted-foreground mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-foreground">First Name</label>
                      <Input placeholder="John" className="rounded-none border-2 h-12 focus-visible:ring-0 focus-visible:border-primary" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-foreground">Last Name</label>
                      <Input placeholder="Doe" className="rounded-none border-2 h-12 focus-visible:ring-0 focus-visible:border-primary" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-foreground">Email</label>
                    <Input type="email" placeholder="john@example.com" className="rounded-none border-2 h-12 focus-visible:ring-0 focus-visible:border-primary" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-foreground">Phone</label>
                    <Input type="tel" placeholder="(555) 000-0000" className="rounded-none border-2 h-12 focus-visible:ring-0 focus-visible:border-primary" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-foreground">Message</label>
                    <Textarea 
                      placeholder="How can we help you?" 
                      className="rounded-none border-2 min-h-[150px] resize-y focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full rounded-none h-14 text-lg font-bold uppercase tracking-wider">
                    Submit Message
                  </Button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
}
