# Modern Portfolio Website

A sleek and interactive portfolio website built with React, TypeScript, and Tailwind CSS, featuring smooth animations, dark/light theme, and responsive design.

## 🌟 Features

- **Modern Design**: Clean and professional UI with cosmic-themed gradients
- **Responsive Layout**: Fully responsive design that works on all devices
- **Dark/Light Theme**: Dynamic theme switching with system preference detection
- **Smooth Animations**: Page transitions and scroll effects
- **Interactive Sections**:
  - Hero section with 3D background
  - About section with skills
  - Experience timeline
  - Projects showcase
  - Blog section
  - Contact form
- **Three.js Integration**: Beautiful 3D animated background
- **Mouse Effects**: Interactive ripple effects on mouse movement
- **TypeScript**: Type-safe code throughout the application
- **Tailwind CSS**: Modern, utility-first CSS framework
- **React Router**: Smooth navigation between pages

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🛠️ Built With

- [React](https://reactjs.org/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Three.js](https://threejs.org/) - 3D Graphics
- [React Router](https://reactrouter.com/) - Routing
- [Lucide Icons](https://lucide.dev/) - Icons

## 📁 Project Structure

```
/
├── public/           # Static files
├── src/
│   ├── assets/      # Images and other assets
│   ├── components/  # React components
│   ├── data/       # Static data files
│   ├── hooks/      # Custom React hooks
│   ├── lib/        # Utility functions
│   ├── pages/      # Page components
│   └── types/      # TypeScript types
└── ...config files
```

## 🎨 Customization

1. **Theme**: Edit `tailwind.config.ts` to modify colors and other theme values
2. **Content**: Update content in the `src/data/` directory
3. **Styling**: Modify component styles in their respective files using Tailwind classes
4. **Components**: Add or modify components in the `src/components/` directory

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- Mobile devices
- Tablets
- Desktop
- Large screens

## 🌓 Theme Switching

- Automatically detects system theme preference
- Allows manual toggle between light and dark themes
- Persists theme choice in localStorage

## 🔑 Performance Optimization

- Code splitting with React.lazy()
- Image optimization
- Efficient animations
- Lazy loading of components
- Optimized asset loading

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
