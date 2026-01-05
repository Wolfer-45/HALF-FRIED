import { db } from "./db";
import {
  categories,
  menuItems,
  combos,
  reviews,
  type Category,
  type MenuItem,
  type Combo,
  type Review
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getCategories(): Promise<Category[]>;
  getMenuItems(categoryId?: number, isBestseller?: boolean): Promise<MenuItem[]>;
  getMenuItem(id: number): Promise<MenuItem | undefined>;
  getCombos(): Promise<Combo[]>;
  getReviews(): Promise<Review[]>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getMenuItems(categoryId?: number, isBestseller?: boolean): Promise<MenuItem[]> {
    let query = db.select().from(menuItems);
    
    if (categoryId) {
      query = query.where(eq(menuItems.categoryId, categoryId)) as any;
    }
    
    if (isBestseller) {
      query = query.where(eq(menuItems.isBestseller, true)) as any;
    }
    
    return await query;
  }

  async getMenuItem(id: number): Promise<MenuItem | undefined> {
    const [item] = await db.select().from(menuItems).where(eq(menuItems.id, id));
    return item;
  }

  async getCombos(): Promise<Combo[]> {
    return await db.select().from(combos);
  }

  async getReviews(): Promise<Review[]> {
    return await db.select().from(reviews);
  }

  async seedData(): Promise<void> {
    const existingCats = await this.getCategories();
    if (existingCats.length === 0) {
      // Categories
      const cats = await db.insert(categories).values([
        { name: "Starters", slug: "starters" },
        { name: "Main Course", slug: "main-course" },
        { name: "Breads", slug: "breads" },
        { name: "Beverages", slug: "beverages" },
        { name: "Desserts", slug: "desserts" },
        { name: "Biryanis", slug: "biryanis" },
        { name: "Rice Bowls", slug: "rice-bowls" },
      ]).returning();

      const starterId = cats[0].id;
      const mainId = cats[1].id;
      const breadId = cats[2].id;
      const bevId = cats[3].id;
      const dessertId = cats[4].id;
      const biryaniId = cats[5].id;
      const riceBowlId = cats[6].id;

      // Menu Items
      await db.insert(menuItems).values([
        {
          categoryId: starterId,
          name: "Veg Spring Rolls",
          description: "Crispy rolls filled with fresh garden vegetables.",
          price: 199,
          imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
          isVegetarian: true,
          isBestseller: false,
          spicyLevel: 1,
        },
        {
          categoryId: biryaniId,
          name: "Hyderabadi Chicken Biryani",
          description: "Long grain basmati rice cooked with aromatic spices and tender chicken.",
          price: 449,
          imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=800&q=80",
          isVegetarian: false,
          isBestseller: true,
          spicyLevel: 2,
        },
        {
          categoryId: riceBowlId,
          name: "Paneer Over Rice",
          description: "Spiced paneer cubes served over a bed of fragrant jeera rice.",
          price: 329,
          imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
          isVegetarian: true,
          isBestseller: false,
          spicyLevel: 1,
        },
        {
          categoryId: starterId,
          name: "Tandoori Chicken Wings",
          description: "Spicy, charred perfection from the clay oven.",
          price: 349,
          imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80",
          isVegetarian: false,
          isBestseller: true,
          spicyLevel: 2,
        },
        {
          categoryId: starterId,
          name: "Paneer Tikka",
          description: "Cottage cheese marinated in yogurt and spices.",
          price: 299,
          imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80",
          isVegetarian: true,
          isBestseller: false,
          spicyLevel: 1,
        },
        {
          categoryId: mainId,
          name: "Butter Chicken",
          description: "Classic Delhi-style rich tomato gravy with tender chicken.",
          price: 499,
          imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80",
          isVegetarian: false,
          isBestseller: true,
          spicyLevel: 1,
        },
        {
          categoryId: mainId,
          name: "Dal Makhani",
          description: "Black lentils simmered overnight with cream and butter.",
          price: 399,
          imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
          isVegetarian: true,
          isBestseller: true,
          spicyLevel: 0,
        },
         {
          categoryId: breadId,
          name: "Garlic Naan",
          description: "Soft leavened bread topped with garlic and cilantro.",
          price: 60,
          imageUrl: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&q=80",
          isVegetarian: true,
          isBestseller: false,
        },
        {
          categoryId: bevId,
          name: "Mango Lassi",
          description: "Thick, creamy yogurt drink with sweet mango pulp.",
          price: 149,
          imageUrl: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&q=80",
          isVegetarian: true,
        },
      ]);

      // Combos
      await db.insert(combos).values([
        {
          name: "Family Feast",
          description: "Perfect for 3-4 people. Includes Butter Chicken, Dal Makhani, 4 Naans, and Rice.",
          price: 1299,
          originalPrice: 1599,
          imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
          items: ["Butter Chicken", "Dal Makhani", "4 Garlic Naans", "Jeera Rice"],
          servesCount: 4,
        },
        {
          name: "Couple's Delight",
          description: "Dinner date sorted. 1 Starter, 1 Main, 2 Breads, 2 Drinks.",
          price: 899,
          originalPrice: 1100,
          imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80",
          items: ["Paneer Tikka", "Dal Makhani", "2 Butter Naans", "2 Cokes"],
          servesCount: 2,
        },
      ]);

      // Reviews
      await db.insert(reviews).values([
        {
          customerName: "Priya M.",
          rating: 5,
          comment: "Authentic flavors, exactly as described in the video! The biryani lived up to the hype.",
          location: "South Delhi",
          source: "Zomato",
        },
        {
          customerName: "Rahul K.",
          rating: 5,
          comment: "Best butter chicken in Delhi. The 30min delivery promise is real!",
          location: "Gurgaon",
          source: "Google",
        },
        {
          customerName: "Sneha R.",
          rating: 4,
          comment: "Loved the packaging and the hygiene. Food was hot and fresh.",
          location: "Noida",
          source: "Swiggy",
        },
      ]);
    }
  }
}

export const storage = new DatabaseStorage();
