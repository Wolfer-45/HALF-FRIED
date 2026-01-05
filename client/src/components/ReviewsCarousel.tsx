import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { type Review } from "@shared/schema";

interface ReviewsCarouselProps {
  reviews: Review[];
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const nextReview = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (!reviews.length) return null;

  const currentReview = reviews[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto px-12 min-h-[300px] flex items-center justify-center">
      <button 
        onClick={prevReview}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-primary hover:text-black transition-colors text-white z-10"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="w-full overflow-hidden relative min-h-[250px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full text-center flex flex-col items-center"
          >
            <Quote size={48} className="text-primary/30 mb-6" />
            
            <p className="text-xl md:text-2xl font-light italic text-white/90 mb-8 leading-relaxed">
              "{currentReview.comment}"
            </p>

            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < currentReview.rating ? "fill-primary text-primary" : "text-gray-600"}
                />
              ))}
            </div>

            <h4 className="font-display font-bold text-lg text-white">
              {currentReview.customerName}
            </h4>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              {currentReview.source} Review
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <button 
        onClick={nextReview}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-primary hover:text-black transition-colors text-white z-10"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
