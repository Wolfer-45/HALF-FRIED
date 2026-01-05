import { motion } from "framer-motion";
import { Plus, Flame, Leaf } from "lucide-react";
import { type MenuItem } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface MenuItemCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export function MenuItemCard({ item, onAdd }: MenuItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group relative bg-white/5 border rounded-2xl overflow-hidden transition-all duration-300 ${
        item.isBestseller 
          ? "border-primary/40 shadow-[0_0_20px_rgba(212,175,55,0.15)] ring-1 ring-primary/20 scale-[1.02]" 
          : "border-white/10 hover:border-primary/50"
      }`}
    >
      {item.isBestseller && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent z-10" />
      )}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.isVegetarian ? (
            <div className="bg-white/90 backdrop-blur-sm p-1 rounded border border-green-600 flex items-center gap-1.5 px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-tight">Veg</span>
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-sm p-1 rounded border border-red-600 flex items-center gap-1.5 px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
              <span className="text-[10px] font-bold text-red-700 uppercase tracking-tight">Non-Veg</span>
            </div>
          )}
        </div>

        <div className="absolute top-3 right-3 flex gap-2">
          {item.spicyLevel && item.spicyLevel > 0 && (
            <span className="bg-orange-500/90 p-1.5 rounded-full backdrop-blur-sm flex items-center gap-0.5" title="Spicy">
              <Flame size={14} className="text-white" />
              <span className="text-[10px] font-bold text-white">{item.spicyLevel}</span>
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <span className="font-bold text-primary text-lg">₹{item.price}</span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 h-10">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          {item.isBestseller && (
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
              Bestseller
            </span>
          )}
          
          <Button
            size="sm"
            onClick={() => onAdd(item)}
            className="ml-auto bg-white/10 hover:bg-primary hover:text-black text-white rounded-full w-10 h-10 p-0 flex items-center justify-center transition-all"
          >
            <Plus size={20} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
