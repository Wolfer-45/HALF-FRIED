# Tushar's Cloud Kitchen - Management Guide

This website is a one-page premium experience. All content is managed directly in the code for easy hosting without a database.

## 1. Updating Restaurant Details
Open `client/src/pages/Home.tsx` to update:
- **Location:** Find the `<iframe>` in the footer (around line 530) to update your Google Map.
- **Address:** Update the address text just below the map.
- **Order Links:** Find the Zomato/Swiggy buttons at the bottom of the Menu section to update your restaurant URLs.

## 2. Managing Menu items
Since there is no database, you manage all categories and items in `server/storage.ts`.

1. Open `server/storage.ts`.
2. Find the `constructor()` function inside `MemStorage`.
3. To **Add/Edit/Delete** sections: Update the `this.categories` array.
4. To **Add/Edit/Delete** items: Update the `this.menuItems` array.

### Classification: Veg vs Non-Veg
In the `this.menuItems` array, each item has an `isVegetarian` field:
- `isVegetarian: true` → Item is **Veg** (appears under "Veg Only" and has a green indicator).
- `isVegetarian: false` → Item is **Non-Veg** (appears under "Non-Veg" and has a red indicator).

### Highlights
- `isBestseller: true` → Highlights the item with a gold border and "Bestseller" tag.
- `spicyLevel: 0-3` → Shows a flame icon with the spice level.

## 3. Deployment
This website is now a standalone Node.js application. You can host it on any platform that supports Node.js (like Replit, Heroku, Vercel, etc.) without needing any external database add-ons.
