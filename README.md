# 🏡 Estate Hub - Real Estate Platform

A modern, full-featured real estate platform built with React, TypeScript, and Vite. Estate Hub provides a comprehensive solution for buyers, sellers, and administrators to manage property listings, searches, and transactions.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Application Routes](#-application-routes)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)

## ✨ Features

### For Buyers

- 🏠 Browse and search property listings
- ❤️ Save favorite properties
- 🔍 Advanced search with filters
- 💳 Secure payment processing
- 📅 Schedule property visits
- 👤 User profile management
- 📧 Contact property sellers

### For Sellers

- ➕ Create and manage property listings
- 📊 View property analytics
- 📝 Edit property details
- 👥 Manage buyer inquiries
- 📅 Track scheduled visits

### For Administrators

- 👥 User management
- 🏢 Property management and moderation
- 📊 System analytics
- 🏗️ Department management
- 🔧 Platform configuration

### General Features

- 🔐 Secure authentication (Sign up, Sign in, Password reset)
- 🌓 Dark/Light theme support
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast performance with Vite
- 🔄 State management with Redux Toolkit

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.0
- **Language:** TypeScript
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS 4.1.17
- **UI Components:**
  - Flowbite React
  - Radix UI
  - Lucide React (Icons)
- **State Management:** Redux Toolkit 2.11.0
- **Routing:** React Router DOM 7.9.6
- **Form Handling:** React Hook Form 7.66.1 + Zod validation
- **Animations:** Framer Motion 12.23.24
- **Maps:** OpenLayers 10.7.0
- **Notifications:** SweetAlert2

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/estate_hub.git
cd estate_hub
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🗺️ Application Routes

### Authentication Routes

All authentication routes use the `AuthLayout` component.

| Route      | Component          | Description          |
| ---------- | ------------------ | -------------------- |
| `/signup`  | SignUpPage         | User registration    |
| `/signin`  | SignInPage         | User login           |
| `/forgot`  | ForgotPasswordPage | Password recovery    |
| `/otp`     | OTPPage            | OTP verification     |
| `/renew`   | RenewPasswordPage  | Reset password       |
| `/success` | SuccessPage        | Success confirmation |

### Buyer Routes

All buyer routes use the `BuyerLayout` component with buyer-specific navigation.

| Route                  | Component           | Description                           |
| ---------------------- | ------------------- | ------------------------------------- |
| `/homeBuyer`           | HomeBuyerPage       | Buyer dashboard and property listings |
| `/searchBuyer`         | SearchResultsPage   | Property search results               |
| `/propertydetailBuyer` | PropertyDetail      | Detailed property information         |
| `/favoritesBuyer`      | FavouritesBuyerPage | Saved favorite properties             |
| `/paymentBuyer`        | PaymentPage         | Payment processing                    |
| `/confirmPayment`      | PaymentSuccessPage  | Payment confirmation                  |
| `/profileBuyer`        | Profile             | Buyer profile management              |
| `/visitsBuyer`         | VisitsPage          | Scheduled property visits             |
| `/aboutBuyer`          | About               | About us page                         |
| `/contactBuyer`        | Contact             | Contact form                          |

### Seller Routes

All seller routes use the `SellerLayout` component with seller-specific navigation.

| Route               | Component        | Description                 |
| ------------------- | ---------------- | --------------------------- |
| `/homeSeller`       | HomeSellerPage   | Seller dashboard            |
| `/createProperty`   | CreateProperty   | Create new property listing |
| `/sellerProperties` | SellerProperties | Manage property listings    |
| `/profileSeller`    | Profile          | Seller profile management   |
| `/visitsSeller`     | VisitsPage       | Scheduled property visits   |
| `/aboutSeller`      | About            | About us page               |
| `/contactSeller`    | Contact          | Contact form                |

### Admin Routes

All admin routes use the `AdminLayout` component with admin-specific navigation.

| Route                  | Component           | Description               |
| ---------------------- | ------------------- | ------------------------- |
| `/users`               | UserManagement      | Manage platform users     |
| `/properties`          | AdminPropertiesPage | Manage all properties     |
| `/admincreateProperty` | CreateProperty      | Create property as admin  |
| `/departments`         | HomeSellerPage      | Department management     |
| `/visitsAdmin`         | VisitsPage          | View all scheduled visits |
| `/profileAdmin`        | Profile             | Admin profile management  |

### Special Routes

| Route | Description               |
| ----- | ------------------------- |
| `/`   | Redirects to `/homeBuyer` |
| `*`   | 404 Not Found page        |

## 📁 Project Structure

```
realEstate_project/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable components
│   │   ├── Footer/      # Footer component
│   │   ├── Navbar/      # Navigation components
│   │   └── Theme/       # Theme switcher
│   ├── hooks/           # Custom React hooks
│   ├── Layouts/         # Layout components
│   │   ├── AuthLayout.tsx
│   │   ├── BuyerLayout.tsx
│   │   ├── SellerLayout.tsx
│   │   └── AdminLayout.tsx
│   ├── pages/           # Page components
│   │   ├── admin/       # Admin pages
│   │   ├── auth/        # Authentication pages
│   │   ├── buyer/       # Buyer pages
│   │   ├── general/     # Shared pages
│   │   ├── search/      # Search pages
│   │   └── seller/      # Seller pages
│   ├── redux/           # Redux store and slices
│   │   ├── slices/      # Redux slices
│   │   └── store/       # Store configuration
│   ├── routes/          # Route definitions
│   │   └── AppRoutes.tsx
│   ├── services/        # API services
│   ├── store/           # Additional store utilities
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 📜 Available Scripts

### Development

```bash
npm run dev          # Start development server
```

### Production

```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality

```bash
npm run lint         # Run ESLint
```

## 🎨 Styling

The project uses **Tailwind CSS** for styling with custom configurations. The theme system supports both light and dark modes, managed through Redux state.

### Theme Configuration

- Theme state is managed in `src/store/slices/ThemeSlice`
- Theme is persisted in localStorage
- Automatic theme loading on app initialization

## 🔐 Authentication Flow

1. **Sign Up** → Email verification → Success
2. **Sign In** → Dashboard (role-based redirect)
3. **Forgot Password** → OTP verification → Reset password → Success

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Yousef Ashraf** - _Initial work_

## 🙏 Acknowledgments

- React Team for the amazing framework
- Vite Team for the blazing fast build tool
- Tailwind CSS for the utility-first CSS framework
- All contributors and supporters of this project

---

**Note:** This is the frontend application. For backend API documentation, please refer to the Backend_EstateHub repository.
