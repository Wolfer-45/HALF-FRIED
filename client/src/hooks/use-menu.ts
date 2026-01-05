import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// Categories
export function useCategories() {
  return useQuery({
    queryKey: [api.categories.list.path],
    queryFn: async () => {
      const res = await fetch(api.categories.list.path);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return api.categories.list.responses[200].parse(await res.json());
    },
  });
}

// Menu Items
export function useMenuItems(categoryId?: number, isBestseller?: boolean) {
  return useQuery({
    queryKey: [api.menuItems.list.path, categoryId, isBestseller],
    queryFn: async () => {
      const url = new URL(window.location.origin + api.menuItems.list.path);
      if (categoryId) url.searchParams.append("categoryId", categoryId.toString());
      if (isBestseller) url.searchParams.append("isBestseller", isBestseller.toString());
      
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch menu items");
      return api.menuItems.list.responses[200].parse(await res.json());
    },
  });
}

export function useMenuItem(id: number) {
  return useQuery({
    queryKey: [api.menuItems.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.menuItems.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch menu item");
      return api.menuItems.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// Combos
export function useCombos() {
  return useQuery({
    queryKey: [api.combos.list.path],
    queryFn: async () => {
      const res = await fetch(api.combos.list.path);
      if (!res.ok) throw new Error("Failed to fetch combos");
      return api.combos.list.responses[200].parse(await res.json());
    },
  });
}

// Reviews
export function useReviews() {
  return useQuery({
    queryKey: [api.reviews.list.path],
    queryFn: async () => {
      const res = await fetch(api.reviews.list.path);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return api.reviews.list.responses[200].parse(await res.json());
    },
  });
}
