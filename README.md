
# TaskFlow Frontend

A modern, beautiful, and intuitive to-do application frontend built with Next.js, TypeScript, and Radix UI. This app connects to the TaskFlow backend for authentication and task management.

## 🚀 Features

- User authentication (login, signup, logout) with secure cookies
- Task CRUD: create, update, delete, mark complete
- Priority and deadline management
- Responsive design with dark mode support
- Dashboard, side panel, and top navigation
- API integration with backend

## 🛠️ Technology Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **UI**: Radix UI, Tailwind CSS
- **State**: React hooks
- **Auth**: JWT via HTTP-only cookies
- **Linting**: ESLint

## 📋 Prerequisites

- Node.js (v18 or higher)
- Backend API running (see backend README)

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-flow
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment (Optional)

You can set environment variables in `.env.local` for custom backend URL, etc.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🐳 Docker Setup (Optional)

You can run the frontend in Docker. Example Dockerfile:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t taskflow-frontend .
docker run -p 3000:3000 taskflow-frontend
```

## 📁 Project Structure

```
task-flow/
├── app/                # Next.js app directory
│   ├── page.tsx        # Main page
│   ├── layout.tsx      # Root layout
│   └── ...             # Other pages and API routes
├── components/         # Reusable React components
│   ├── dashboard.tsx   # Dashboard UI
│   ├── login.tsx       # Login form
│   ├── user-dropdown.tsx # Profile dropdown
│   └── ...
├── lib/                # API config and helpers
├── public/             # Static assets
├── styles/             # Global styles
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript config
├── .env.local          # Local environment variables
├── README.md           # Project documentation
└── ...
```

## 🔌 API Integration

- Connects to backend API at `http://localhost:8000`
- Uses `credentials: 'include'` for cookie-based auth
- Endpoints: `/auth/login`, `/auth/auth-verify`, `/tasks`, etc.

## 🧑‍💻 Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 👥 Contributors

Rishav Raj

## 📞 Support

For issues and questions, please open an issue in the repository.
