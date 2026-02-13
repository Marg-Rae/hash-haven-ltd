# HashHaven Ltd

**Building Systems for Land, Life & Digital Resilience**

A modern, full-stack MERN application representing regenerative land systems, modern homesteading, digital innovation, GIS mapping, and sustainable living.

![Tech Stack](https://img.shields.io/badge/React-18-blue)
![Tech Stack](https://img.shields.io/badge/Node.js-18-green)
![Tech Stack](https://img.shields.io/badge/MongoDB-6-brightgreen)
![Tech Stack](https://img.shields.io/badge/Tailwind-3-blue)

## 🌱 About

HashHaven Ltd is a full-stack web application showcasing an integrated approach to:
- **Land Lab**: Regenerative agriculture, geology, GIS mapping, and sustainable land management
- **Digital Forge**: Modern web applications and digital tools
- **Homestead Systems**: Modern homesteading and self-reliance
- **Field Notes**: Blog and knowledge sharing

## 🚀 Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS (custom color palette)
- Framer Motion (animations)
- React Router v6
- Axios
- React Icons
- Leaflet for maps

### Backend
- Node.js with Express
- MongoDB with Mongoose
- CORS enabled
- RESTful API architecture
- Environment-based configuration

## 📁 Project Structure

```
hash-haven-ltd/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── server.js       # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   └── App.jsx
│   ├── public/
│   └── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Git

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI
# MONGODB_URI=your_mongodb_connection_string

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Update .env with your backend URL
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🌐 API Endpoints

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:slug` - Get post by slug
- `POST /api/posts` - Create new post
- `PUT /api/posts/id/:id` - Update post
- `DELETE /api/posts/id/:id` - Delete post

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Contact
- `GET /api/contact` - Get all contacts (admin)
- `POST /api/contact` - Submit contact form
- `GET /api/contact/:id` - Get contact by ID
- `PUT /api/contact/:id` - Update contact
- `DELETE /api/contact/:id` - Delete contact

## 🎨 Design Philosophy

- **Elegant & Grounded**: Earth-toned color palette
- **Modern & Clean**: Smooth animations and generous spacing
- **Professional**: Investor-friendly but not corporate
- **Feminine Power**: Balanced strength and grace
- **Responsive**: Mobile-first design approach

## Color Palette

```css
Earth Tones: #b08d5d, #9a7549, #7f5e3e
Sage Green: #687959, #526145, #424e38
Terracotta: #d0764f, #bc5d33, #9f4927
Sky Blue: #5088a3, #416d89, #375970
```

## 📦 Deployment

### Frontend (Netlify)
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variable: `VITE_API_URL`

### Backend (Render)
1. Create new Web Service
2. Build command: `npm install`
3. Start command: `npm start`
4. Add environment variables:
   - `MONGODB_URI`
   - `NODE_ENV=production`
   - `FRONTEND_URL`

## 🧪 Features

- ✅ Full-stack MERN architecture
- ✅ RESTful API with Express
- ✅ MongoDB database with Mongoose ODM
- ✅ React SPA with React Router
- ✅ Tailwind CSS with custom design system
- ✅ Framer Motion animations
- ✅ Responsive design (mobile-first)
- ✅ Contact form with backend integration
- ✅ Blog system with categories and tags
- ✅ Project portfolio with filtering
- ✅ SEO-friendly meta tags
- ✅ Loading states and error handling
- ✅ Clean code architecture

## 📝 License

MIT License - feel free to use this project for learning or as a template.

## 🤝 Contributing

This is a portfolio/demonstration project, but suggestions and feedback are welcome!

## 📧 Contact

Built with passion for sustainable systems and digital innovation.

---

**HashHaven Ltd** - Building Systems for Land, Life & Digital Resilience

