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

export interface IStorage {
  getCategories(): Promise<Category[]>;
  getMenuItems(categoryId?: number, isBestseller?: boolean): Promise<MenuItem[]>;
  getMenuItem(id: number): Promise<MenuItem | undefined>;
  getCombos(): Promise<Combo[]>;
  getReviews(): Promise<Review[]>;
}

export class MemStorage implements IStorage {
  private categories: Category[];
  private menuItems: MenuItem[];
  private combos: Combo[];
  private reviews: Review[];

  constructor() {
    // Categories
    this.categories = [
      { id: 1, name: "Starters", slug: "starters" },
      { id: 2, name: "Main Course", slug: "main-course" },
      { id: 3, name: "Breads", slug: "breads" },
      { id: 4, name: "Beverages", slug: "beverages" },
      { id: 5, name: "Desserts", slug: "desserts" },
      { id: 6, name: "Biryanis", slug: "biryanis" },
      { id: 7, name: "Rice Bowls", slug: "rice-bowls" },
    ];

    const starterId = 1;
    const mainId = 2;
    const breadId = 3;
    const bevId = 4;
    const dessertId = 5;
    const biryaniId = 6;
    const riceBowlId = 7;

    // Menu Items
    this.menuItems = [
      {
        id: 1,
        categoryId: starterId,
        name: "Veg Spring Rolls",
        description: "Crispy rolls filled with fresh garden vegetables.",
        price: 199,
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        isVegetarian: true,
        isBestseller: false,
        spicyLevel: 1,
        ingredients: [],
        nutritionalInfo: null,
      },
      {
        id: 2,
        categoryId: biryaniId,
        name: "Hyderabadi Chicken Biryani",
        description: "Long grain basmati rice cooked with aromatic spices and tender chicken.",
        price: 449,
        imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=800&q=80",
        isVegetarian: false,
        isBestseller: true,
        spicyLevel: 2,
        ingredients: [],
        nutritionalInfo: null,
      },
      {
        id: 3,
        categoryId: riceBowlId,
        name: "Paneer Over Rice",
        description: "Spiced paneer cubes served over a bed of fragrant jeera rice.",
        price: 329,
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
        isVegetarian: true,
        isBestseller: false,
        spicyLevel: 1,
        ingredients: [],
        nutritionalInfo: null,
      },
      {
        id: 4,
        categoryId: starterId,
        name: "Tandoori Chicken Wings",
        description: "Spicy, charred perfection from the clay oven.",
        price: 349,
        imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80",
        isVegetarian: false,
        isBestseller: true,
        spicyLevel: 2,
        ingredients: [],
        nutritionalInfo: null,
      },
      {
        id: 5,
        categoryId: starterId,
        name: "Paneer Tikka",
        description: "Cottage cheese marinated in yogurt and spices.",
        price: 299,
        imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80",
        isVegetarian: true,
        isBestseller: false,
        spicyLevel: 1,
        ingredients: [],
        nutritionalInfo: null,
      },
      {
        id: 6,
        categoryId: mainId,
        name: "Butter Chicken",
        description: "Classic Delhi-style rich tomato gravy with tender chicken.",
        price: 499,
        imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80",
        isVegetarian: false,
        isBestseller: true,
        spicyLevel: 1,
        ingredients: [],
        nutritionalInfo: null,
      },
      {
        id: 7,
        categoryId: mainId,
        name: "Dal Makhani",
        description: "Black lentils simmered overnight with cream and butter.",
        price: 399,
        imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
        isVegetarian: true,
        isBestseller: true,
        spicyLevel: 0,
        ingredients: [],
        nutritionalInfo: null,
      },
      {
        id: 8,
        categoryId: breadId,
        name: "Garlic Naan",
        description: "Soft leavened bread topped with garlic and cilantro.",
        price: 60,
        imageUrl: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&q=80",
        isVegetarian: true,
        isBestseller: false,
        spicyLevel: 0,
        ingredients: [],
        nutritionalInfo: null,
      },
      {
        id: 9,
        categoryId: bevId,
        name: "Mango Lassi",
        description: "Thick, creamy yogurt drink with sweet mango pulp.",
        price: 149,
        imageUrl: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&q=80",
        isVegetarian: true,
        isBestseller: false,
        spicyLevel: 0,
        ingredients: [],
        nutritionalInfo: null,
      },
    ];

    // Combos
    this.combos = [
      {
        id: 1,
        name: "Family Feast",
        description: "Perfect for 3-4 people. Includes Butter Chicken, Dal Makhani, 4 Naans, and Rice.",
        price: 1299,
        originalPrice: 1599,
        imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80",
        items: ["Butter Chicken", "Dal Makhani", "4 Garlic Naans", "Jeera Rice"],
        servesCount: 4,
      },
      {
        id: 2,
        name: "Couple's Delight",
        description: "Dinner date sorted. 1 Starter, 1 Main, 2 Breads, 2 Drinks.",
        price: 899,
        originalPrice: 1100,
        imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80",
        items: ["Paneer Tikka", "Dal Makhani", "2 Butter Naans", "2 Cokes"],
        servesCount: 2,
      },
    ];

    // Reviews
    this.reviews = [
      {
        id: 1,
        customerName: "Priya M.",
        rating: 5,
        comment: "Authentic flavors, exactly as described in the video! The biryani lived up to the hype.",
        location: "South Delhi",
        source: "Zomato",
      },
      {
        id: 2,
        customerName: "Rahul K.",
        rating: 5,
        comment: "Best butter chicken in Delhi. The 30min delivery promise is real!",
        location: "Gurgaon",
        source: "Google",
      },
      {
        id: 3,
        customerName: "Sneha R.",
        rating: 4,
        comment: "Loved the packaging and the hygiene. Food was hot and fresh.",
        location: "Noida",
        source: "Swiggy",
      },
    ];
  }

  async getCategories(): Promise<Category[]> {
    return this.categories;
  }

  async getMenuItems(categoryId?: number, isBestseller?: boolean): Promise<MenuItem[]> {
    let items = this.menuItems;
    if (categoryId) {
      items = items.filter(i => i.categoryId === categoryId);
    }
    if (isBestseller) {
      items = items.filter(i => i.isBestseller);
    }
    return items;
  }

  async getMenuItem(id: number): Promise<MenuItem | undefined> {
    return this.menuItems.find(i => i.id === id);
  }

  async getCombos(): Promise<Combo[]> {
    return this.combos;
  }

  async getReviews(): Promise<Review[]> {
    return this.reviews;
  }
}

export const storage = new MemStorage();
