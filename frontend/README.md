# HashHaven Ltd - Frontend

Modern, elegant React application for HashHaven Ltd - Building Systems for Land, Life & Digital Resilience.

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom color palette
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Maps**: Leaflet & React Leaflet

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update VITE_API_URL in .env to point to your backend
```

### Development

```bash
npm run dev
```

The app will run on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ScrollToTop.jsx
│   └── LoadingSpinner.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── LandLab.jsx
│   ├── DigitalForge.jsx
│   ├── FieldNotes.jsx
│   ├── BlogPost.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── services/        # API services
│   └── api.js
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables:
   - `VITE_API_URL`: Your backend API URL
4. Deploy!

The `netlify.toml` file is already configured for proper routing.

## Key Features

- **Responsive Design**: Mobile-first approach with beautiful layouts
- **Smooth Animations**: Framer Motion for fluid transitions
- **Custom Color Palette**: Earth-toned colors representing the brand
- **API Integration**: Connected to Express/MongoDB backend
- **SEO Ready**: Meta tags and proper semantic HTML
- **Performance Optimized**: Code splitting and lazy loading

## Color Palette

- **Earth Tones**: Warm, grounding colors
- **Sage**: Natural, calming greens
- **Terracotta**: Energetic, warm accents
- **Sky**: Cool, professional blues

## Browser Support

Modern browsers with ES6+ support:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
