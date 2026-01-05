# Tushar's Cloud Kitchen - Comprehensive Management Guide

This website is a one-page premium experience. All content is managed via the database and site configuration.

## 1. Updating Restaurant Details
Open `client/src/pages/Home.tsx` to update:
- **Location:** Find the `<iframe>` in the footer (around line 530) to update your Google Map.
- **Address:** Update the address text just below the map.
- **Order Links:** Find the Zomato/Swiggy buttons at the bottom of the Menu section to update your restaurant URLs.

## 2. Managing Menu Sections (Categories)
Menu sections are managed in `server/storage.ts` within the `seedData()` function.
1. Locate the `db.insert(categories)` block.
2. **To add a section:** Add a new entry like `{ name: "New Section", slug: "new-section" }`.
3. **Internal Reference:** Below the insert block, assign the new ID to a variable: `const newSectionId = cats[7].id;` (use the correct index).

## 3. Managing Menu Items & Dietary Classification
Items are added in the `db.insert(menuItems)` block in `server/storage.ts`.

### Classification: Veg vs Non-Veg
When adding or editing an item, the `isVegetarian` field controls its classification:
- `isVegetarian: true` → Item is **Veg**. It will appear under "Veg Only" and have a green indicator.
- `isVegetarian: false` → Item is **Non-Veg**. It will appear under "Non-Veg" and have a red indicator.

### How Filtering Works
- The **Veg/Non-Veg toggle** on the website automatically filters the items across ALL sections.
- If a user selects "Veg Only", they will only see items where `isVegetarian` is `true`.

### Adding an Item
```typescript
{
  categoryId: mainId,          // Link to the correct section ID
  name: "Dish Name",
  description: "Delicious description...",
  price: 499,
  imageUrl: "...",             // Link to your photo
  isVegetarian: true,          // true = Veg, false = Non-Veg
  isBestseller: true,          // Highlights with a gold border
  spicyLevel: 2,               // 0-3 scale
}
```

## 4. Resetting Data to See Changes
Because the system "seeds" data once:
1. Make your changes in `server/storage.ts`.
2. Ask me to "Reset the database to reflect my new menu items and categories". I will then clear the existing tables so the new data can be loaded.
