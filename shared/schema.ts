import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // stored in rupees
  imageUrl: text("image_url").notNull(),
  isVegetarian: boolean("is_vegetarian").default(true),
  isBestseller: boolean("is_bestseller").default(false),
  spicyLevel: integer("spicy_level").default(0), // 0-3
  ingredients: text("ingredients").array(),
  nutritionalInfo: text("nutritional_info"),
});

export const combos = pgTable("combos", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  originalPrice: integer("original_price").notNull(),
  imageUrl: text("image_url").notNull(),
  items: text("items").array(), // List of item names included
  servesCount: integer("serves_count").default(1),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment").notNull(),
  source: text("source").default("Google"), // Google, Zomato, etc
  location: text("location"),
});

// Schemas
export const insertCategorySchema = createInsertSchema(categories);
export const insertMenuItemSchema = createInsertSchema(menuItems);
export const insertComboSchema = createInsertSchema(combos);
export const insertReviewSchema = createInsertSchema(reviews);

export type Category = typeof categories.$inferSelect;
export type MenuItem = typeof menuItems.$inferSelect;
export type Combo = typeof combos.$inferSelect;
export type Review = typeof reviews.$inferSelect;
