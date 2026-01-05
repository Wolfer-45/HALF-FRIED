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
1. **Using the Code:** Open `server/storage.ts`.
2. Inside the `seedData()` function, you'll see blocks like `await db.insert(menuItems).values([...])`.
3. To **Add** an item: Add a new object to the array with `name`, `description`, `price`, and `imageUrl`.
4. To **Edit** an item: Modify the values in an existing object.
5. To **Delete** an item: Remove the object from the array.
6. After making changes, the server will restart and update the database (Note: the current setup only seeds if the table is empty, so for permanent changes, you would typically use a database management tool or update the `seedData` logic to sync).

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
