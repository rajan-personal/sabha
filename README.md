# Sabha - Modern Authentication Web App

A modern web application built with Next.js, Better Auth, and Drizzle ORM. Features Google OAuth authentication, protected routes, and a centralized design system.

## 🚀 Features

- **Modern Authentication**: Google OAuth integration with Better Auth
- **Protected Routes**: Secure dashboard and authentication middleware
- **Centralized Design System**: Consistent colors and spacing via CSS variables
- **VS Code Integration**: Full autocomplete and documentation for design tokens
- **TypeScript Support**: Full type safety with design system utilities
- **Responsive Design**: Mobile-friendly UI with modern aesthetics

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Authentication**: Better Auth with Google OAuth
- **Database**: Drizzle ORM (SQLite/PostgreSQL)
- **Styling**: CSS Variables, Tailwind CSS
- **Development**: VS Code integration with custom autocomplete

## 📦 Getting Started

1. **Clone the repository**:
```bash
git clone <repository-url>
cd sabha
```

2. **Install dependencies**:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**:
```bash
# Copy the example env file
cp .env.example .env.local

# Add your Google OAuth credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
BETTER_AUTH_SECRET=your_random_secret_key
```

4. **Run the development server**:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🎨 Design System

This project features a comprehensive design system with centralized color management:

### Key Features:
- **Centralized Colors**: All colors managed via CSS custom properties
- **VS Code Integration**: Full autocomplete and documentation
- **TypeScript Support**: Type-safe design system utilities
- **Consistent Spacing**: Standardized spacing and radius values
- **Semantic Colors**: Meaningful color names (primary, secondary, success, etc.)

### Usage Example:
```tsx
// Using CSS variables directly
<div style={{ 
  backgroundColor: 'var(--sabha-primary-600)', 
  color: 'var(--sabha-text-inverse)' 
}}>
  Content
</div>

// Using TypeScript utilities
import { sabhaColors, sabhaSpacing } from '@/styles/design-system.utils';

<div style={{ 
  backgroundColor: sabhaColors.primary[600], 
  padding: sabhaSpacing.lg 
}}>
  Content
</div>
```

### Design System Files:
- `src/styles/design-system.css` - Main color definitions
- `src/styles/design-system.types.ts` - TypeScript types
- `src/styles/design-system.utils.ts` - Utility functions
- `.vscode/css-custom-data.json` - VS Code autocomplete
- `docs/DESIGN_SYSTEM.md` - Complete documentation

## 🔐 Authentication

The app uses Better Auth with Google OAuth:

- **Google Sign-In**: Available on homepage - One-click OAuth authentication
- **Dashboard**: `/dashboard` - Protected route for authenticated users
- **Logout**: Available from dashboard header
- **Session Management**: Automatic session handling with middleware

## 📁 Project Structure

```
sabha/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/         # Protected dashboard
│   │   └── api/auth/          # Better Auth API routes
│   ├── components/            # React components
│   │   └── auth/             # Authentication components
│   ├── db/                   # Database schema and config
│   ├── lib/                  # Utility libraries
│   └── styles/               # Design system files
├── .vscode/                  # VS Code configuration
├── docs/                     # Documentation
└── middleware.ts             # Route protection
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 🔧 Configuration

### Environment Variables:
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `BETTER_AUTH_SECRET` - Secret key for Better Auth
- `DATABASE_URL` - Database connection string (if using PostgreSQL)

### VS Code Setup:
The project includes VS Code configuration for enhanced development experience:
- CSS variable autocomplete
- Design system documentation on hover
- Custom syntax highlighting for design tokens

## 📚 Documentation

- [Design System Documentation](docs/DESIGN_SYSTEM.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Better Auth Documentation](https://better-auth.com)
- [Drizzle ORM Documentation](https://orm.drizzle.team)

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Connect your GitHub repository
2. Add environment variables
3. Deploy!

For other platforms, run `npm run build` and deploy the `.next` folder.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please read our design system documentation before making changes to ensure consistency.

---

Built with ❤️ using Next.js, Better Auth, and Drizzle ORM.
