# 🎬 Netflix Clone

A full-stack Netflix clone built with modern web technologies, featuring user authentication, movie browsing, favorites, watch later functionality, and more.

![Netflix Clone](https://img.shields.io/badge/Netflix-Clone-red?style=for-the-badge&logo=netflix)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-10-red?style=for-the-badge&logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)

## ✨ Features

### 🔐 Authentication & User Management
- **User Registration & Login** with JWT authentication
- **Password Management** (change password, forgot password, reset password)
- **Protected Routes** with JWT middleware
- **User Profile** management with avatar support

### 🎥 Movie Features
- **Browse Popular Movies** from TMDb API
- **Trending Movies** section
- **Movie Search** functionality
- **Movie Details** with ratings and release dates
- **Responsive Movie Cards** with hover effects

### 📚 Personal Lists
- **Favorites** - Add/remove movies to your personal favorites list
- **Watch Later** - Save movies to watch later
- **My Lists** - View all your saved movies in organized sections

### 🎨 UI/UX
- **Netflix-inspired Design** with dark theme
- **Fully Responsive** design for all devices
- **Smooth Animations** and hover effects
- **Tailwind CSS** for modern styling
- **Loading States** and error handling

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Beautiful icons
- **Axios** - HTTP client for API calls

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe server-side development
- **PostgreSQL** - Relational database
- **Prisma** - Modern database ORM
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Passport** - Authentication middleware

### External APIs
- **TMDb API** - Movie data and images

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 15+
- TMDb API Key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/Furqan-Tariq/netflix-clone.git
cd netflix-clone
\`\`\`

2. **Install Backend Dependencies**
\`\`\`bash
cd server
npm install
\`\`\`

3. **Install Frontend Dependencies**
\`\`\`bash
cd ../client
npm install
\`\`\`

4. **Database Setup**
\`\`\`bash
# Create PostgreSQL database
createdb netflix_clone

# Go back to server directory
cd ../server

# Generate Prisma client and push schema
npx prisma generate
npx prisma db push
\`\`\`

5. **Environment Variables**

Create \`server/.env\`:
\`\`\`env
DATABASE_URL="postgresql://postgres:password@localhost:5432/netflix_clone"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT=5000
TMDB_API_KEY="your-tmdb-api-key"
TMDB_BASE_URL="https://api.themoviedb.org/3"
\`\`\`

Create \`client/.env.local\`:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
\`\`\`

6. **Start the Development Servers**

Backend:
\`\`\`bash
cd server
npm run start:dev
\`\`\`

Frontend (in a new terminal):
\`\`\`bash
cd client
npm run dev
\`\`\`

7. **Open your browser**
Navigate to \`http://localhost:3000\`

## 📁 Project Structure

\`\`\`
netflix-clone/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   │   ├── favorites/
│   │   │   ├── watch-later/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── profile/
│   │   │   ├── change-password/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── components/    # Reusable components
│   │   │   ├── MovieCard.tsx
│   │   │   └── Navbar.tsx
│   │   ├── services/      # API services
│   │   │   └── api.ts
│   │   └── types/         # TypeScript types
│   │       └── index.ts
│   ├── .env.local
│   └── package.json
├── server/                # NestJS Backend
│   ├── src/
│   │   ├── auth/         # Authentication module
│   │   ├── users/        # User management
│   │   ├── movies/       # Movie API integration
│   │   ├── favorites/    # Favorites functionality
│   │   ├── watch-later/  # Watch later functionality
│   │   └── prisma/       # Database service
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   ├── .env
│   └── package.json
└── README.md
\`\`\`

## 🔌 API Endpoints

### Authentication
- \`POST /auth/register\` - User registration
- \`POST /auth/login\` - User login
- \`GET /auth/me\` - Get current user
- \`POST /auth/change-password\` - Change password
- \`POST /auth/forgot-password\` - Request password reset
- \`POST /auth/reset-password\` - Reset password with token

### Movies
- \`GET /movies/popular\` - Get popular movies
- \`GET /movies/trending\` - Get trending movies
- \`GET /movies/search\` - Search movies
- \`GET /movies/:id\` - Get movie details

### Favorites
- \`POST /favorites/add\` - Add to favorites
- \`GET /favorites\` - Get user favorites
- \`DELETE /favorites/remove/:movieId\` - Remove from favorites

### Watch Later
- \`POST /watch-later/add\` - Add to watch later
- \`GET /watch-later\` - Get watch later list
- \`DELETE /watch-later/remove/:movieId\` - Remove from watch later

### Users
- \`GET /users/profile\` - Get user profile
- \`PUT /users/update\` - Update user profile

## 🧪 Testing with Postman

Import the API endpoints into Postman and test with these examples:

### Register User
\`\`\`json
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
\`\`\`

### Add to Favorites
\`\`\`json
POST /favorites/add
Headers: Authorization: Bearer YOUR_JWT_TOKEN
{
  "movieId": 550,
  "title": "Fight Club",
  "poster": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
}
\`\`\`

## 🎨 Screenshots

### Home Page
![Home Page](./assets/homepage.png)


### User Profile
![User Profile](./assets/profile.png)

## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcrypt
- **Protected Routes** on both frontend and backend
- **Input Validation** with class-validator
- **CORS Configuration** for secure cross-origin requests
- **Environment Variables** for sensitive data

## 🚀 Deployment

### Backend Deployment (Railway/Heroku)
1. Set environment variables in your hosting platform
2. Update \`DATABASE_URL\` to your production database
3. Deploy the \`server\` directory

### Frontend Deployment (Vercel/Netlify)
1. Set \`NEXT_PUBLIC_API_URL\` to your backend URL
2. Deploy the \`client\` directory

### Database (Railway/Supabase)
1. Create a PostgreSQL database
2. Run \`npx prisma db push\` to create tables
3. Update connection string in backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDb](https://www.themoviedb.org/) for providing the movie API
- [Netflix](https://netflix.com) for design inspiration
- [Next.js](https://nextjs.org/) and [NestJS](https://nestjs.com/) teams for amazing frameworks

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or contact me at furqant.ft@gmail.com

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by [Furqan Tariq](https://github.com/Furqan-Tariq)
