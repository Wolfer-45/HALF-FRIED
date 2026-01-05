# Tushar's Cloud Kitchen - Management Guide

Welcome to your website management guide! This project is built using a modern stack (React, Node.js, and a PostgreSQL database). Here’s how you can manage your website content.

## 1. Changing Your Location & Contact Info
To update the address, phone number, or email displayed in the footer:
1. Open the file `client/src/pages/Home.tsx`.
2. Scroll to the `footer` section (around line 500).
3. Find the `<span>` tags containing the address and phone number and edit the text directly.
4. For the Google Map, find the `<iframe>` tag and replace the `src` URL with your own Google Maps embed link.

## 2. Managing Menu Items (Add/Edit/Delete)
Currently, your menu is seeded from the backend. To manage items:

### Adding a New Section (Category)
1. Open `server/storage.ts`.
2. Find the `cats = await db.insert(categories).values([...])` block.
3. Add your new section name and a unique slug (e.g., `{ name: "Rice Bowls", slug: "rice-bowls" }`).
4. Below that, assign it to a variable (e.g., `const riceBowlId = cats[6].id;`) by counting its position in the list (starting from 0).

### Adding/Classifying Items (Veg vs Non-Veg)
1. In `server/storage.ts`, find the `await db.insert(menuItems).values([...])` block.
2. To **Add** an item:
   - `categoryId`: Use the ID variable you defined for that section.
   - `isVegetarian`: Set to `true` for **Veg** (green indicator) or `false` for **Non-Veg** (red indicator).
   - `isBestseller`: Set to `true` to highlight the item with a gold border.
3. To **Delete** an item: Remove the object from the array.

### Important: Syncing Changes
Since the database only "seeds" once when empty, to see new changes you might need to:
1. Delete the existing data (for advanced users) OR
2. Ask me to "Reset the database seed with new categories and items".

## 3. Changing Images
All images are sourced from URLs. To change an image:
1. Find the `imageUrl` field in `server/storage.ts` or the constant at the top of `client/src/pages/Home.tsx`.
2. Replace the existing Unsplash URL with your own direct image link (e.g., from an image hosting service).

## 4. Social Media & Ordering Links
1. Open `client/src/pages/Home.tsx`.
2. Look for the Zomato and Swiggy buttons (now located in the Menu section).
3. Update the `href="https://www.zomato.com"` part with your actual restaurant link.

---
*Note: For a non-technical way to manage this in the future, we can implement an Admin Dashboard.*
