# 🌎 Travel Diary Frontend

Welcome to the **Travel Diary** web app — an interactive platform where travelers can create itineraries, post photos and notes about their trips, and explore inspiration from others around the world.  
This frontend connects to our Java Spring Boot backend and brings the social travel experience to life! 🌍✨

🔗 **Live App**: [Travel Diary on Netlify](https://your-netlify-link.netlify.app)

---

## 🚀 Features

- 🗺️ **3D Interactive Globe** (powered by Three.js) to visualise travel destinations
- 📝 **Create itineraries, notes, and photo posts** from your trips
- 🔒 **User login system** to keep personal trips private
- 📸 **Cloud-based photo uploads** integrated with our backend
- 🌐 **Responsive design** so it works beautifully on mobile & desktop

---

## 🛠️ Tech Stack

| Technology  | Purpose                      |
|-------------|-------------------------------|
| **React**   | Frontend framework (SPA)       |
| **Three.js**| 3D interactive globe rendering |
| **Bootstrap**| Styling and responsive layout  |
| **Node.js** | Utility functions & tooling    |
| **Axios**   | API calls to the backend        |

---

## 🧪 Test Login Credentials

You can log in and try out the app using our **demo user account**:

- 👤 **Username**: `wanderer_joe`
- 🔒 **Password**: `password123`

This account is safe to use for testing the responsiveness and basic features of the app!

---

## 🌐 Live Demo

Try it now!  
👉 [Travel Diary App (Hosted on Netlify)](https://thetraveldiary-spiceboys.netlify.app/)

---

## 📚 Why This Tech Stack?

We carefully selected our stack to combine rich visual interactivity with solid performance:

- **React** offers a smooth Single Page Application (SPA) experience, ideal for dynamic user interactions.
- **Three.js** powers the stunning **3D globe** where users can plot their travel destinations — making exploration fun and visual.
- **Bootstrap** ensures the app is fully **responsive** across all devices with minimal custom CSS.
- **Node.js** helps us with utility functions (e.g. date formatting) and modern JS tooling.
- **Axios** lets us easily call the backend REST API and handle authentication tokens.

---

## 📂 How It Connects to the Backend

- **Frontend (this repo)**: React app making API calls to the backend.
- **Backend**: Java Spring Boot API with endpoints for users, photos, itineraries, activities and notes.
- **Image uploads**: Photos are uploaded from the frontend, passed to the backend, which stores them in **Cloudinary**.

Example flow:
1. User logs in → gets authenticated via backend.
2. User uploads an itinerary → frontend sends data to the backend → backend stores it as new itinerary for logged in user → user are able to edit, delete and add to their own itineraries 

---

## 🔧 Getting Started (for Developers)

### 1. Clone the Repo

```bash
  git clone https://github.com/The-Spice-Boys/Travel-Diary---FE.git
```

### 2. Install Dependencies
```bash
  npm install
```

### 3. Start the Development Server
```bash
  npm run dev
