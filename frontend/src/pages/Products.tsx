import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import { Zap, Hammer, Wrench, Droplet, ShieldCheck, Paintbrush, Box, Check, Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/lib/api";
import { useState } from "react";
import { useCart } from '@/context/CartContext';

// Category icons map
const categoryIcons: Record<string, any> = {
  Tools: Hammer,
  Electrical: Zap,
  Plumbing: Droplet,
  Safety: ShieldCheck,
  Paints: Paintbrush,
  Fasteners: Wrench,
  Other: Box,
};

// Static categories — jab backend mein products na hon tab bhi page khali na lage
const staticCategories = [
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

// Single product card component
function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const Icon = categoryIcons[product.category] || Box;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border bg-background group hover:border-primary transition-colors duration-300"
    >
      {/* Image */}
      <div className="aspect-video bg-muted overflow-hidden">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Icon size={48} className="opacity-20" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {product.category}
          </span>
          <span className={`text-xs font-medium px-2 py-1 ${
            product.stock > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
            {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
          </span>
        </div>

        <h3 className="text-xl font-black uppercase tracking-tight text-foreground">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-black text-foreground">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <span className="text-sm text-muted-foreground font-medium">
            {product.brand}
          </span>
        </div>

        <Button
          className="w-full rounded-none font-bold uppercase tracking-wider mt-2"
          disabled={product.stock === 0}
          onClick={() => addToCart({              // ← ye add karo
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '',
      stock: product.stock,
      brand: product.brand,
    })}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  // TanStack Query se backend se products fetch karo
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", search, activeCategory],
    queryFn: () => productApi.getAll({
      search: search || undefined,
      category: activeCategory || undefined,
    }),
    // Sirf tab fetch karo jab search ya category active ho
    enabled: !!(search || activeCategory),
  });

  const backendProducts = data?.products || [];
  const isSearching = !!(search || activeCategory);

  const handleSearch = () => {
    setSearch(searchInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(prev => prev === category ? "" : category);
    setSearch("");
    setSearchInput("");
  };

  const clearFilters = () => {
    setSearch("");
    setSearchInput("");
    setActiveCategory("");
  };

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

          {/* Search Bar — ab actually kaam karega! */}
          <div className="max-w-xl mx-auto mb-8 flex gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for tools, materials, or brands..."
                className="h-14 pl-12 rounded-none border-2 border-border focus-visible:border-primary text-lg"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="h-14 px-6 rounded-none font-bold uppercase tracking-wider"
            >
              Search
            </Button>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {["Tools", "Electrical", "Plumbing", "Safety", "Paints", "Fasteners", "Other"].map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryFilter(cat)}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-2 transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
            {isSearching && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-bold uppercase tracking-wider border-2 border-red-300 text-red-500 hover:bg-red-50 transition-colors"
              >
                ✕ Clear
              </button>
            )}
          </div>

          {/* ─── Backend Products (search/filter active hone par) ─── */}
          {isSearching && (
            <div className="mb-20">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="animate-spin text-primary" size={40} />
                </div>
              ) : isError ? (
                <div className="text-center py-20 text-muted-foreground">
                  <p className="text-lg">Backend se connect nahi ho pa raha.</p>
                  <p className="text-sm mt-2">Make sure server chal raha hai: localhost:5000</p>
                </div>
              ) : backendProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-2xl font-black uppercase text-muted-foreground">
                    Koi product nahi mila
                  </p>
                  <p className="text-muted-foreground mt-2">
                    "{search || activeCategory}" ke liye koi result nahi
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6 rounded-none"
                    onClick={clearFilters}
                  >
                    Sab Products Dekho
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-6">
                    {data?.total} products mile
                    {search && ` for "${search}"`}
                    {activeCategory && ` in ${activeCategory}`}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {backendProducts.map((product: any) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ─── Static Categories (default view) ─── */}
          {!isSearching && (
            <div className="space-y-24">
              {staticCategories.map((category, idx) => (
                <div key={category.id} id={category.id} className="scroll-mt-32">
                  <div className={`flex flex-col ${idx % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-16 items-center`}>

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
                        <Button
                          variant="outline"
                          className="rounded-none border-2 uppercase font-bold tracking-wider hover:bg-primary hover:text-primary-foreground hover:border-primary"
                          onClick={() => handleCategoryFilter(
                            category.name.split(" ")[0] === "Building" ? "Other" :
                            category.name.split(" ")[0] === "Hand" ? "Tools" :
                            category.name.split(" ")[0] === "Power" ? "Tools" :
                            category.name.split(" ")[0]
                          )}
                        >
                          View Inventory
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brands Banner */}
      <section className="py-16 bg-muted border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
            Stocking the industry's best brands
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
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