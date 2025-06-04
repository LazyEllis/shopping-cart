# Shopzilla 🛒

A modern, responsive shopping cart web app built with React, Vite, and React Router. Browse products, search, filter by category, and manage your shopping bag with a clean, accessible UI.

## Features

- **Product Catalog:** Browse products fetched from [Fake Store API](https://fakestoreapi.com/).
- **Category Filtering:** View products by category.
- **Search:** Find products instantly with live suggestions.
- **Product Details:** View detailed information for each product.
- **Shopping Bag:** Add, remove, and update product quantities.
- **Responsive Design:** Optimized for desktop and mobile.
- **Accessible UI:** Keyboard and screen reader friendly.
- **Fast & Modern:** Built with React 19, Vite, and CSS Modules.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/LazyEllis/shopping-cart.git
cd shopping-cart
npm install
```

### Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Running Tests

```bash
npm test
```

## Project Structure

```
src/
  components/      # Reusable UI components
  routes/          # Route components (pages)
  styles/          # CSS Modules for styling
  utils/           # Utility functions and hooks
  __fixtures__/    # Test fixtures and mock data
  main.jsx         # App entry point
  routes.jsx       # Route definitions
```

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Vitest](https://vitest.dev/) & [Testing Library](https://testing-library.com/)
- [Lucide Icons](https://lucide.dev/)

## License

This project is licensed under the [MIT License](LICENSE).

---

**Live Demo:** [Shopzilla](https://shopping-cart-14k.pages.dev/)

**Author:** [LazyEllis](https://github.com/LazyEllis/)

---

_Feel free to fork and adapt for your own projects!_
