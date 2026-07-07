# Atlas - School District Instrument Management System

A modern web application for managing musical instruments across school districts, enabling schools and administrators to track, allocate, and maintain instruments efficiently.

**Live Demo:** [atlas-amber.vercel.app](https://atlas-amber.vercel.app)

---

## 🎯 Overview

Atlas is a full-stack web application that streamlines instrument management for school music programs. It provides a centralized platform for districts to manage multiple schools, track instrument inventory, assign instruments to students, and monitor rental status across their network.

---

## ✨ Key Features

- **District & School Management** - Organize multiple schools within districts
- **Instrument Inventory Tracking** - Track instruments by classification, brand, serial number, and rental status
- **Student Assignments** - Assign instruments to students and manage allocations
- **User Authentication** - Secure auth with NextAuth.js supporting OAuth and WebAuthn
- **Role-Based Access** - Support for different user roles (administrators, teachers, staff)
- **Responsive UI** - Modern, accessible interface built with HeroUI and Tailwind CSS
- **Email Notifications** - Send updates and confirmations via Resend

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **TailwindCSS 4** - Utility-first styling
- **HeroUI** - Modern component library
- **Framer Motion** - Animation library
- **Redux Toolkit** - State management

### Backend & Database
- **MongoDB** - NoSQL database with Prisma ORM
- **Prisma** - Type-safe database access
- **NextAuth.js** - Authentication framework

### Additional Tools
- **Jest** - Testing framework
- **ESLint** - Code quality
- **Resend** - Email service
- **React Email** - Email templates

---

## 📊 Database Schema

The application manages complex relationships between:

```
District
  ├── Schools
  │   ├── Instruments
  │   └── Students
  │       └── InstrumentAssignments
  └── Users (with Profiles & Roles)
```

**Key Models:**
- **User** - Authentication with NextAuth
- **Profile** - User profile with role and district association
- **District** - School district entity
- **School** - Individual school within a district
- **Student** - Student records with ID numbers
- **Instrument** - Musical instruments with rental status tracking
- **InstrumentAssignment** - Many-to-one relationships between students and instruments

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB instance

### Installation

```bash
# Clone the repository
git clone https://github.com/rpdavila/atlas.git
cd atlas

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Update .env.local with your configuration

# Generate Prisma client
npx prisma generate

# Run migrations (if applicable)
npx prisma db push
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

The app will auto-reload as you make changes.

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

**Deployment:** This project is configured for deployment on Vercel with zero configuration needed.

---

## 📁 Project Structure

```
atlas/
├── src/                  # Application source code
├── prisma/
│   └── schema.prisma    # Database schema
├── public/              # Static assets
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

---

## 🔐 Authentication

The application uses **NextAuth.js** with:
- OAuth provider support
- WebAuthn for passwordless authentication
- Prisma adapter for MongoDB
- Session management with Redis support (via redux-persist)

---

## 🧪 Code Quality

- **TypeScript** - Full type safety
- **Strict Mode** - Enforced strict TypeScript checking
- **ESLint** - Code linting with security plugin
- **Jest** - Unit and integration testing

---

## 📈 Performance & Scalability

- **Incremental Static Regeneration (ISR)** - Optimized page generation
- **Font Optimization** - Automatic font loading with next/font
- **MongoDB Indexing** - Optimized queries via Prisma
- **Vercel CDN** - Global content delivery

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 Development Notes

### Environment Setup
Required environment variables:
```
NEXTAUTH_SECRET=<your-secret>
NEXTAUTH_URL=<your-url>
TEST_DATABASE_URL=<mongodb-connection-string>
RESEND_API_KEY=<resend-api-key>
```

### Code Standards
- Use TypeScript for all new code
- Follow existing naming conventions
- Write tests for new features
- Use ESLint for code formatting

---

## 📄 License

This project is private and proprietary.

---

## 👤 Author

Created by [rpdavila](https://github.com/rpdavila)

---

## 📞 Support

For issues and questions, please open a GitHub issue on the [project repository](https://github.com/rpdavila/atlas/issues).

---

**Built with ❤️ using modern web technologies**
