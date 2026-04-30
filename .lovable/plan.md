

# GlobeStay — Hotel Reservation Website

## Overview
A bright, colorful hotel reservation website with 12-15 predefined dummy hotels, user authentication via Firebase, and a simple booking confirmation flow.

## Pages & Features

### 1. Homepage / Landing
- Hero section with a bold travel-themed banner, tagline "Explore. Stay. Enjoy.", and a search/filter bar (by location or price range)
- Grid of 12-15 hotel cards showing: name, photo (placeholder images), location, price per night, and star rating
- Bright, travel-inspired color palette with vibrant accent colors

### 2. Hotel Detail Page
- Larger hotel photo, full name, location, price, and rating
- Date picker to select check-in and check-out dates
- "Book Now" button — if not logged in, redirects to login page; if logged in, proceeds to booking

### 3. Login / Sign Up Page
- Email & password authentication using Firebase Auth
- Sign up and login forms on the same page (tabbed)
- Firebase API key hardcoded directly in the code as requested

### 4. Booking Confirmation
- After booking, show a success modal/page with:
  - Hotel name, dates selected, total price
  - A "Back to Hotels" button
- Booking details saved to Firebase Realtime Database or Firestore under the user's account

### 5. Navigation Bar
- GlobeStay logo/brand name
- Links: Home, Hotels
- Login/Logout button with user avatar when logged in

## Data
- 12-15 hardcoded dummy hotels spanning various destinations (Paris, Tokyo, New York, Bali, etc.)
- Each hotel: name, city/country, price per night, rating (1-5 stars), placeholder image

## Tech Approach
- Firebase Auth for login/signup (API key hardcoded as requested)
- Firebase Firestore for storing booking records
- All hotel data is static/hardcoded in the frontend
- Bright, colorful Tailwind theme with travel-inspired gradients

