import { z } from 'zod';
import { insertCategorySchema, insertMenuItemSchema, insertComboSchema, insertReviewSchema, categories, menuItems, combos, reviews } from './schema';

export const api = {
  categories: {
    list: {
      method: 'GET' as const,
      path: '/api/categories',
      responses: {
        200: z.array(z.custom<typeof categories.$inferSelect>()),
      },
    },
  },
  menuItems: {
    list: {
      method: 'GET' as const,
      path: '/api/menu-items',
      input: z.object({
        categoryId: z.coerce.number().optional(),
        isBestseller: z.coerce.boolean().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof menuItems.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/menu-items/:id',
      responses: {
        200: z.custom<typeof menuItems.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
  combos: {
    list: {
      method: 'GET' as const,
      path: '/api/combos',
      responses: {
        200: z.array(z.custom<typeof combos.$inferSelect>()),
      },
    },
  },
  reviews: {
    list: {
      method: 'GET' as const,
      path: '/api/reviews',
      responses: {
        200: z.array(z.custom<typeof reviews.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
