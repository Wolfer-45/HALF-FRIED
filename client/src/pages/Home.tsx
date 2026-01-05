import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ChefHat, 
  Award, 
  Clock, 
  Leaf, 
  Youtube, 
  Instagram, 
  MapPin, 
  Phone, 
  Mail,
  ArrowRight
} from "lucide-react";

// Components
import { Navigation } from "@/components/Navigation";
import { MenuItemCard } from "@/components/MenuItemCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Hooks
import { useCategories, useMenuItems, useCombos, useReviews } from "@/hooks/use-menu";
import { MenuItem } from "@shared/schema";

// Assets (Using Unsplash placeholders as requested)
const HERO_BG = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop";
const DISH_HERO = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop";
const CHEF_IMG = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1000&auto=format&fit=crop";

export default function Home() {
  const { data: categories } = useCategories();
  const { data: reviews } = useReviews();
  const { data: combos } = useCombos();
  
  // State for menu filtering
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // We'll fetch all items and filter client side for smooth tab transitions 
  // (In a huge app, you'd fetch per tab, but for a restaurant menu this is faster UX)
  const { data: allMenuItems, isLoading: isLoadingMenu } = useMenuItems();
  
  const filteredItems = selectedCategory === "all" 
    ? allMenuItems 
    : allMenuItems?.filter(item => item.categoryId.toString() === selectedCategory);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleAddToCart = (item: MenuItem) => {
    // In a real app, this would add to a cart context
    console.log("Added to cart:", item.name);
  };

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      <Navigation />

      {/* === HERO SECTION === */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Parallax */}
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_BG} 
            alt="Restaurant Ambience" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </div>

        <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center px-4">
          <motion.div 
            style={{ y: y1, opacity }}
            className="text-center md:text-left pt-20 md:pt-0"
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block py-1 px-3 rounded-full border border-primary/30 text-primary text-sm font-bold tracking-widest uppercase mb-6 bg-primary/5"
            >
              Premium Cloud Kitchen
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] text-white mb-6"
            >
              Taste the <br />
              <span className="text-gradient-gold italic">Extraordinary</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto md:mx-0 font-light"
            >
              Experience culinary masterpieces crafted by our YouTube-famous chef. 
              Authentic flavors, premium ingredients, delivered to your doorstep.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 h-14 rounded-full font-semibold"
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Menu
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/20 text-white hover:bg-white/10 text-lg px-8 h-14 rounded-full"
                onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Our Story
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating 3D Dish Image */}
          <motion.div 
            style={{ y: y2 }}
            className="hidden md:flex justify-center items-center relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]"
            >
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6,
                  ease: "easeInOut" 
                }}
                className="w-full h-full"
              >
                {/* Glow effect behind dish */}
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
                <img 
                  src={DISH_HERO}
                  alt="Signature Dish" 
                  className="w-full h-full object-contain drop-shadow-2xl relative z-10"
                />
              </motion.div>
              
              {/* Floating Ingredient Elements */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Award className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">Rating</p>
                    <p className="font-bold text-white">4.9/5.0</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* === QUICK STATS === */}
      <section className="py-10 border-y border-white/5 bg-charcoal-light relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Orders Delivered", value: "50k+" },
              { label: "Youtube Subs", value: "100k+" },
              { label: "Menu Items", value: "85+" },
              { label: "Happy Clients", value: "45k+" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-1 font-display">{stat.value}</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === USP SECTION === */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Why Choose Us?" 
            subtitle="The Difference" 
          />
          
          <div className="grid md:grid-cols-4 gap-6 mt-16">
            {[
              { icon: Leaf, title: "100% Fresh", text: "Locally sourced organic ingredients delivered daily." },
              { icon: Youtube, title: "YouTube Famous", text: "Recipes loved by millions online, now on your plate." },
              { icon: ChefHat, title: "Master Chefs", text: "Prepared by experts with passion and precision." },
              { icon: Clock, title: "Express Delivery", text: "Hot and fresh at your doorstep in under 45 mins." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/5 p-8 rounded-2xl text-center group hover:bg-white/10 transition-colors"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === MENU SECTION === */}
      <section id="menu" className="py-24 bg-charcoal-light relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading 
            title="Explore Our Menu" 
            subtitle="Culinary Delights" 
          />

          <Tabs 
            defaultValue="all" 
            className="w-full mt-12"
            onValueChange={setSelectedCategory}
          >
            <div className="flex justify-center mb-12 overflow-x-auto pb-4">
              <TabsList className="bg-white/5 border border-white/10 p-1 h-auto rounded-full">
                <TabsTrigger 
                  value="all"
                  className="rounded-full px-6 py-3 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-black text-white/70"
                >
                  All Items
                </TabsTrigger>
                {categories?.map((cat) => (
                  <TabsTrigger 
                    key={cat.id} 
                    value={cat.id.toString()}
                    className="rounded-full px-6 py-3 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-black text-white/70"
                  >
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={selectedCategory} className="mt-0">
              {isLoadingMenu ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white/5 rounded-2xl h-[400px] animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredItems?.map((item) => (
                    <MenuItemCard 
                      key={item.id} 
                      item={item} 
                      onAdd={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-16">
            <Button variant="outline" size="lg" className="rounded-full border-primary/50 text-primary hover:bg-primary hover:text-black">
              View Full Menu <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* === COMBOS SECTION === */}
      <section id="combos" className="py-24 bg-background border-t border-white/5">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Value Combos" 
            subtitle="Perfectly Paired" 
            align="left"
          />

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {combos?.map((combo, i) => (
              <motion.div
                key={combo.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative h-[300px] rounded-2xl overflow-hidden cursor-pointer"
              >
                <img 
                  src={combo.imageUrl} 
                  alt={combo.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent p-8 flex flex-col justify-center">
                  <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2">
                    Serves {combo.servesCount}
                  </span>
                  <h3 className="text-3xl font-display font-bold text-white mb-2">{combo.name}</h3>
                  <p className="text-white/80 max-w-sm mb-6 line-clamp-2">{combo.description}</p>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-primary">₹{combo.price}</span>
                    <span className="text-lg text-muted-foreground line-through">₹{combo.originalPrice}</span>
                    <Button size="sm" className="ml-4 rounded-full bg-white text-black hover:bg-primary">
                      Order Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === STORY / YOUTUBE SECTION === */}
      <section id="story" className="py-0 bg-charcoal-light overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[600px]">
          <div className="relative h-[400px] md:h-full">
            <img 
              src={CHEF_IMG} 
              alt="Chef Cooking" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 cursor-pointer hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1" />
              </div>
            </div>
          </div>
          
          <div className="p-12 md:p-24 flex flex-col justify-center">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4">The Journey</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
              From YouTube to <br />
              <span className="text-primary">Your Table</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              What started as a passion for sharing recipes online grew into a culinary movement. 
              With over 100k subscribers following our flavor journey, we decided to bring 
              the taste directly to you.
            </p>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Every dish on our menu has been tested, refined, and loved by our community before making it to the final cut.
            </p>
            
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">2018</span>
                <span className="text-sm text-muted-foreground">Channel Started</span>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">5M+</span>
                <span className="text-sm text-muted-foreground">Views</span>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">2024</span>
                <span className="text-sm text-muted-foreground">Restaurant Opened</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === REVIEWS SECTION === */}
      <section id="reviews" className="py-24 bg-background relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-burgundy/10 rounded-full blur-[128px]" />

        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading 
            title="What People Say" 
            subtitle="Testimonials" 
          />
          
          <div className="mt-16">
            {reviews && <ReviewsCarousel reviews={reviews} />}
          </div>
        </div>
      </section>

      {/* === OUTLET VIDEOS === */}
      <section className="py-24 bg-charcoal-light border-y border-white/5">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="Outlet Highlights" 
            subtitle="Behind the Scenes" 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop"
            ].map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img src={video} alt={`Outlet Highlight ${i+1}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <div className="w-12 h-12 bg-primary/80 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[12px] border-l-black border-b-[6px] border-b-transparent ml-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="bg-charcoal-light pt-20 pb-10 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <span className="text-2xl font-bold font-display text-white tracking-wider mb-6 block">
                CHEF<span className="text-primary">TABLE</span>
              </span>
              <p className="text-muted-foreground mb-6">
                Premium cloud kitchen bringing gourmet flavors to your doorstep.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors">
                  <Youtube size={18} />
                </a>
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <a 
                  href="https://www.zomato.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#E23744] hover:bg-[#E23744]/90 text-white px-4 py-2 rounded-lg transition-colors w-fit"
                >
                  <span className="font-bold">Zomato</span>
                </a>
                <a 
                  href="https://www.swiggy.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#FC8019] hover:bg-[#FC8019]/90 text-white px-4 py-2 rounded-lg transition-colors w-fit"
                >
                  <span className="font-bold">Swiggy</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#menu" className="text-muted-foreground hover:text-primary transition-colors">Menu</a></li>
                <li><a href="#combos" className="text-muted-foreground hover:text-primary transition-colors">Combos</a></li>
                <li><a href="#story" className="text-muted-foreground hover:text-primary transition-colors">Our Story</a></li>
                <li><a href="#reviews" className="text-muted-foreground hover:text-primary transition-colors">Reviews</a></li>
              </ul>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Find Us</h4>
              <div className="rounded-2xl overflow-hidden h-48 border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114827188432!2d77.206584!3d28.612849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5d347ec393%3A0x407156118273a30!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <ul className="space-y-4 mt-6">
                <li className="flex items-center gap-3 text-muted-foreground">
                  <MapPin size={18} className="text-primary" />
                  <span>123 Culinary Ave, New Delhi, 110001</span>
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="bg-white/5 mb-8" />
          
          <div className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ChefTable. All rights reserved. Designed with passion.
          </div>
        </div>
      </footer>
    </div>
  );
}
