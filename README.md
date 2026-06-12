# 🏡 StaySafe — Airbnb-Inspired Property Listing Platform

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-Template-yellow?style=flat-square)
![Deployed](https://img.shields.io/badge/Deployed-Render-46E3B7?style=flat-square&logo=render&logoColor=white)

> A full-stack web application inspired by Airbnb — built with Node.js, Express.js, MongoDB, and EJS following MVC architecture.

🔗 **Live Demo:** [major-project1-2yuh.onrender.com](https://major-project1-2yuh.onrender.com/)
💻 **GitHub:** [github.com/PrashantJ80/major-project1](https://github.com/PrashantJ80/major-project1)

---

## ✨ Features

- 🔐 User Authentication — Register, Login, Logout (Passport.js)
- 🏠 Full CRUD — Add, Edit, Delete property listings
- ⭐ Reviews & Ratings System
- 📸 Image Upload via Cloudinary
- 📍 Location-based listings with Maps integration
- 🛡️ Input validation & error handling middleware
- 📱 Fully Responsive Design
- 🌐 Deployed on Render

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Templating | EJS |
| Authentication | Passport.js + bcrypt |
| Image Upload | Cloudinary |
| Architecture | MVC |
| Deployment | Render |

---

## 📁 Project Structure

```
major-project1/
│
├── controllers/      # Route logic (listings, reviews, users)
├── models/           # Mongoose schemas (Listing, Review, User)
├── routes/           # Express route handlers
├── views/            # EJS templates (pages + partials)
├── public/           # Static files (CSS, JS, images)
├── utils/            # Helper functions & error classes
├── init/             # DB seed data
├── app.js            # Main Express app
├── middleware.js      # Custom middleware
├── cloudConfig.js    # Cloudinary configuration
└── schema.js         # Joi validation schemas
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/PrashantJ80/major-project1.git
cd major-project1

# 2. Install dependencies
npm install

# 3. Create .env file
touch .env
```

Add to `.env`:
```env
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SESSION_SECRET=your_session_secret
```

```bash
# 4. Run the server
npm start

# 5. Open in browser
http://localhost:3000
```

---

## 🔗 API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/listings` | View all listings |
| GET | `/listings/new` | New listing form |
| POST | `/listings` | Create listing |
| GET | `/listings/:id` | View single listing |
| PUT | `/listings/:id` | Update listing |
| DELETE | `/listings/:id` | Delete listing |
| POST | `/listings/:id/reviews` | Add review |
| DELETE | `/listings/:id/reviews/:rid` | Delete review |
| GET | `/signup` | Register form |
| POST | `/signup` | Register user |
| GET | `/login` | Login form |
| POST | `/login` | Login user |
| GET | `/logout` | Logout user |

---

## 🚀 Deployment

- **Platform:** [Render](https://render.com)
- **Database:** MongoDB Atlas
- **Images:** Cloudinary CDN
- **Live URL:** [major-project1-2yuh.onrender.com](https://major-project1-2yuh.onrender.com/)

---

## 🎯 Future Improvements

- [ ] Map Integration (Mapbox / Google Maps)
- [ ] Advanced Search & Filters
- [ ] Wishlist / Save Listings
- [ ] Real-time Chat
- [ ] Booking & Payment System
- [ ] Admin Dashboard

---

## 👨‍💻 Author

**Prashant Jadhav**
B.Tech — Artificial Intelligence & Data Science
K. K. Wagh Institute of Engineering Education & Research, Nashik

[![GitHub](https://img.shields.io/badge/GitHub-PrashantJ80-black?style=flat-square&logo=github)](https://github.com/PrashantJ80)

---

## 📄 License

This project is for educational purposes only.

---

> ⭐ If you found this helpful, give it a star!
