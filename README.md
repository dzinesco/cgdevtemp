# CrispyGoat Development Template

A modern, professional web development template powered by Astro, TypeScript, and Tailwind CSS. Built for agencies and developers who want to deliver consistent, high-quality websites and applications quickly.

## 🚀 Quick Start

Create a new project in seconds:

```bash
npm create crispygoat-app my-awesome-project
```

The interactive setup wizard will guide you through:
- Project configuration
- Tech stack selection  
- Theme customization (Coolors.com integration)
- Feature selection
- Deployment setup

## ✨ Features

### 🎨 **Professional Design System**
- Apple Human Interface Guidelines compliant
- Mobile-first responsive design
- Coolors.com theme integration
- Custom Tailwind CSS utilities
- Smooth animations and transitions

### ⚡ **Modern Tech Stack**
- **Astro** - Ultra-fast static site generation
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React** - Interactive components
- **Drizzle ORM** - Type-safe database queries
- **PostgreSQL** - Robust relational database

### 📝 **Content Management**
- **Strapi CMS** - WordPress-like admin interface
- REST and GraphQL APIs
- Media library with optimization
- User roles and permissions

### 📖 **Auto-Documentation**
- **TypeDoc** - Automatic API documentation
- JSDoc comment enforcement
- Real-time doc updates
- GitHub Pages deployment

### 🔧 **Developer Experience**
- Interactive setup wizard
- Locked dependency versions
- ESLint + Prettier configuration
- Pre-commit hooks
- Comprehensive testing setup

## 📁 Project Structure

```
your-project/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── layout/         # Header, Footer, Navigation
│   │   └── sections/       # Hero, Features, CTA
│   ├── pages/              # Astro pages
│   ├── layouts/            # Page layouts
│   └── styles/             # Global styles
├── cms/                    # Strapi CMS configuration
├── docs/                   # Project documentation
│   ├── copybank.md         # Content repository
│   ├── roadmap.md          # Project roadmap
│   ├── techspecs.md        # Technical specifications
│   └── claude-resources.md # AI prompts and resources
├── scripts/                # Setup and utility scripts
└── templates/              # Reusable templates
```

## 🎯 Built-in Pages

All projects include professional boilerplate pages:

- **Homepage** - Modern hero, features, and CTA sections
- **About** - Company story, team, and values
- **Services** - Detailed service offerings and process
- **Contact** - Contact form, business info, and FAQ
- **Privacy Policy** - GDPR compliant privacy policy
- **Terms of Service** - Comprehensive legal terms

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate documentation
npm run docs:build
npm run docs:serve

# Start CMS admin
npm run cms:dev

# Lint and format code
npm run lint
npm run typecheck
```

## 🎨 Theme Customization

1. Visit [Coolors.co](https://coolors.co) to generate a 5-color palette
2. The setup wizard will prompt for your colors:
   - Primary color (main brand color)
   - Secondary color (accent/supporting color)  
   - Accent color (highlights and CTAs)
   - Background color (page backgrounds)
   - Text color (main text content)

Colors are automatically converted to Tailwind CSS variants (50-950) and integrated throughout the design system.

## 🚀 Deployment

### Recommended Stack
- **Hosting**: Vercel (automatic deployments)
- **Database**: Supabase (managed PostgreSQL)
- **CMS**: Self-hosted Strapi or Strapi Cloud
- **Domain**: Your preferred registrar

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dzinesco/cgdevtemp)

### Manual Deployment

1. **Vercel**:
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Netlify**:
   ```bash
   npm run build
   # Upload dist/ folder to Netlify
   ```

3. **AWS/Docker**: See deployment guides in `docs/`

## 📚 Documentation

- **Getting Started**: `/docs/getting-started.md`
- **Component Library**: `/docs/components.md`
- **CMS Setup**: `/docs/cms-setup.md`
- **Deployment Guide**: `/docs/deployment.md`
- **Claude Resources**: `/docs/claude-resources.md`

## 🤝 For Development Teams

### Junior Developer Friendly
- Foolproof setup wizard prevents configuration errors
- Clear documentation and examples
- Enforced code standards with linting
- Auto-generated documentation

### Team Collaboration
- Shared component library for consistency
- Git workflow templates
- Code review guidelines
- Project planning templates

## 🔒 Security & Best Practices

- ✅ HTTPS enforcement
- ✅ CSRF protection
- ✅ XSS prevention
- ✅ Secure headers
- ✅ Input validation
- ✅ Rate limiting
- ✅ Dependency scanning

## 🆘 Support

### Documentation
- Check `/docs/` folder for comprehensive guides
- API documentation at `/docs/api/`
- Component examples at `/docs/components/`

### Community
- **Issues**: [GitHub Issues](https://github.com/dzinesco/cgdevtemp/issues)
- **Discussions**: [GitHub Discussions](https://github.com/dzinesco/cgdevtemp/discussions)
- **Website**: [crispygoat.com](https://crispygoat.com)

### Professional Support
For custom development, training, or consulting:
- **Email**: hello@crispygoat.com
- **Website**: [crispygoat.com/contact](https://crispygoat.com/contact)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

**Built with ❤️ by the CrispyGoat team**

Ready to build something amazing? Start with:
```bash
npm create crispygoat-app my-next-project
```