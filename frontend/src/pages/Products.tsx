import { PageTransition } from "@/components/PageTransition";
import { motion } from "framer-motion";
import {
  Zap, Hammer, Wrench, Droplet, ShieldCheck,
  Paintbrush, Box, Search, Loader2, ShoppingCart, SlidersHorizontal, X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/lib/api";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const categoryIcons: Record<string, any> = {
  Tools: Hammer,
  Electrical: Zap,
  Plumbing: Droplet,
  Safety: ShieldCheck,
  Paints: Paintbrush,
  Fasteners: Wrench,
  Other: Box,
};

const CATEGORIES = ["Tools", "Electrical", "Plumbing", "Safety", "Paints", "Fasteners", "Other"];

// ─── Product Card ─────────────────────────────────────
function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const Icon = categoryIcons[product.category] || Box;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border bg-background group hover:border-primary transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-muted overflow-hidden relative">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
            <Icon size={40} className="opacity-20" />
            <span className="text-xs opacity-40">No Image</span>
          </div>
        )}
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 uppercase tracking-wider">
          {product.category}
        </span>
        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <span className="font-black uppercase tracking-widest text-muted-foreground">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow gap-3">
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            {product.brand}
          </p>
          <h3 className="font-black uppercase tracking-tight text-foreground text-lg leading-tight mt-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-2xl font-black text-foreground">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <span className={`text-xs font-bold px-2 py-1 ${
            product.stock > 10
              ? 'bg-green-100 text-green-700'
              : product.stock > 0
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {product.stock > 10
              ? 'In Stock'
              : product.stock > 0
              ? `Sirf ${product.stock} bache`
              : 'Out of Stock'}
          </span>
        </div>

        <Button
          className="w-full rounded-none font-bold uppercase tracking-wider flex items-center gap-2"
          disabled={product.stock === 0}
          onClick={() => addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[0] || '',
            stock: product.stock,
            brand: product.brand,
          })}
        >
          <ShoppingCart size={16} />
          {product.stock > 0 ? 'Cart Mein Daalo' : 'Out of Stock'}
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Main Products Page ───────────────────────────────
export default function Products() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  // Hamesha fetch karo — search/filter optional
 const { data, isLoading, isError } = useQuery({
  queryKey: ["products", search, activeCategory, page],
  queryFn: () => productApi.getAll({
    search: search || undefined,
    category: activeCategory || undefined,
    page,
    limit: 12,
  }),
  // enabled nahi chahiye — hamesha fetch karo
});
  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;
  const hasFilters = !!(search || activeCategory);

  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleCategory = (cat: string) => {
    setActiveCategory(prev => prev === cat ? "" : cat);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setSearchInput("");
    setActiveCategory("");
    setPage(1);
  };

  return (
    <PageTransition>
      {/* Header */}
      <section className="bg-zinc-950 py-20 text-center">
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

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">

          {/* Search + Filter Bar */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            {/* Search */}
            <div className="flex flex-1 gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search tools, materials, brands..."
                  className="h-12 pl-12 rounded-none border-2 focus-visible:border-primary"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="h-12 px-6 rounded-none font-bold uppercase tracking-wider"
              >
                Search
              </Button>
            </div>

            {/* Filter Toggle (Mobile) */}
            <Button
              variant="outline"
              className="h-12 rounded-none font-bold uppercase tracking-wider flex items-center gap-2 md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={16} />
              Filters {activeCategory && `(1)`}
            </Button>
          </div>

          {/* Category Filters */}
          <div className={`flex flex-wrap gap-2 mb-8 ${showFilters || 'hidden md:flex'}`}>
            <button
              onClick={clearFilters}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-2 transition-colors ${
                !activeCategory
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:border-primary text-foreground'
              }`}
            >
              All
            </button>
            {CATEGORIES.map(cat => {
              const Icon = categoryIcons[cat];
              return (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-2 transition-colors flex items-center gap-1.5 ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border hover:border-primary text-foreground'
                  }`}
                >
                  <Icon size={14} />
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {isLoading ? 'Loading...' : (
                <>
                  <span className="font-bold text-foreground">{total}</span> products
                  {search && <span> for &quot;{search}&quot;</span>}
                  {activeCategory && <span> in {activeCategory}</span>}
                </>
              )}
            </p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 font-medium"
              >
                <X size={14} />
                Clear filters
              </button>
            )}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-32">
              <Loader2 className="animate-spin text-primary" size={48} />
            </div>
          ) : isError ? (
            <div className="text-center py-32">
              <p className="text-xl font-black uppercase text-muted-foreground">
                Backend se connect nahi ho pa raha
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Make sure server chal raha hai: localhost:5000
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-32">
              <Box size={64} className="text-muted-foreground opacity-20 mx-auto mb-4" />
              <p className="text-2xl font-black uppercase text-muted-foreground">
                Koi product nahi mila
              </p>
              {hasFilters && (
                <Button
                  variant="outline"
                  className="mt-6 rounded-none font-bold uppercase"
                  onClick={clearFilters}
                >
                  Sab Products Dekho
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product: any, idx: number) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-12">
                  <Button
                    variant="outline"
                    className="rounded-none font-bold uppercase"
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                  >
                    Pehle
                  </Button>
                  <span className="text-sm font-medium">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    className="rounded-none font-bold uppercase"
                    disabled={page === totalPages}
                    onClick={() => setPage(p => p + 1)}
                  >
                    Agle
                  </Button>
                </div>
              )}
            </>
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