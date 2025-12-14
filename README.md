🍰 Sweet Shop Management System – Frontend

A modern, responsive frontend application for the Sweet Shop Management System, built using React + Vite, styled with Tailwind CSS, and integrated with a secure Spring Boot backend using JWT-based authentication.
The Sweet Shop Management System Frontend provides a user-friendly interface for browsing sweets, managing inventory, authenticating users, and accessing admin dashboards. It supports secure login, role-based access, real-time UI updates, and seamless communication with a cloud-hosted backend.

The application is deployed on Netlify and communicates with a production backend hosted on Render.

🌍 Live Application
🔗 Frontend (Netlify)
```
https://sweet-management.netlify.app/
```
🔗 Backend (Render)
```
https://sweet-shop-management-system-rfpg.onrender.com
```

🚀 Tech Stack
```
React (Vite)
JavaScript (ES6+)
Tailwind CSS
Axios
React Router DOM
JWT Authentication
Netlify (Deployment)
```
🎯 Core Features

User Registration & Login

```
JWT Authentication with Refresh Token Handling
Role-based UI (Admin / User)
Sweet Listing & Search
Admin Dashboard Access
Inventory Purchase Flow
Responsive Navbar & Mobile Menu
Protected Routes
Automatic Token Refresh via Axios Interceptors
```

🔐 Authentication Flow

Access token stored in localStorage
Refresh token handled automatically via Axios interceptors
On token expiration:
Refresh token API is called
New access token is stored
Failed requests are retried
Automatic logout on refresh failure

⚙️ Environment Configuration

The frontend uses Vite environment variables.

Required Environment Variable (Production)
```
VITE_API_BASE_URL=https://sweet-shop-management-system-rfpg.onrender.com
```
Local Development (.env)
```
VITE_API_BASE_URL=http://localhost:8081
```
🧪 Running Locally
```
npm install
npm run dev

```
Build for production:
```
npm run build

```

📸 Screenshots & UI Preview

🏠 Home Page

<img width="1902" height="908" alt="homepage" src="https://github.com/user-attachments/assets/83d4e0cc-4993-449d-a36c-a1855b489881" />

🔐 Login & Register

<img width="1902" height="915" alt="login" src="https://github.com/user-attachments/assets/b5171fbe-b99f-49ae-8f34-fe4576954ebb" />
<img width="1897" height="912" alt="Register" src="https://github.com/user-attachments/assets/2e4ca654-ac19-4d2e-bc17-e2a9edb27e72" />


📊 Admin & User Dashboard

<img width="1912" height="966" alt="userdash" src="https://github.com/user-attachments/assets/ac8ae72f-e37b-4a7a-9e92-ce4d4aa9c5cc" />


<img width="1896" height="957" alt="admindash" src="https://github.com/user-attachments/assets/664122ec-8d3a-4308-99f7-ce3357eebef5" />

🍬 Sweet Management

<img width="1900" height="965" alt="addsweet" src="https://github.com/user-attachments/assets/d2f2adb8-829c-4a2e-a80b-049dfee9761f" />













📁 Project Structure
```
src/
├── api/
│   └── axios.js
│
├── components/
│   ├── admin/
│   │   └── (admin-specific components)
│   │
│   ├── auth/
│   │   └── (login, register, auth-related UI)
│   │
│   ├── dashboard/
│   │   └── (dashboard widgets and stats)
│   │
│   ├── home/
│   │   └── (landing page sections)
│   │
│   ├── layout/
│   │   └── navbar/
│   │       ├── Navbar.jsx
│   │       ├── DesktopLinks.jsx
│   │       └── MobileMenu.jsx
│   │
│   ├── modals/
│   │   └── (modal components)
│   │
│   ├── sweets/
│   │   └── (sweet listing, cards, forms)
│   │
│   └── ui/
│       └── (reusable UI components)
│
├── hooks/
│   └── useAuth.js
│
├── pages/
│   └── (route-level pages)
│
├── routes/
│   └── ProtectedRoutes.jsx
│
├── App.jsx
└── main.jsx


```
🤖 My AI Usage
AI Tools Used

Claude
How I Used AI
```
I used Claude as a development assistant to:

Design Axios interceptors for token refresh

Debug authentication and CORS-related issues

Improve component structure and naming

Validate Netlify deployment configuration

Refine README documentation and commit messages

Design beautiful tailwind templates

All generated suggestions were reviewed, modified, and implemented manually.
```

Reflection on AI Impact

```
AI helped speed up development and reduce debugging time, especially for authentication flows and deployment issues. However, I ensured that I fully understood and controlled all logic, treating AI as a supporting tool rather than a replacement for problem-solving.
```

📌 Future Enhancements
```
HTTP-only cookie authentication

Pagination & filters

Skeleton loaders

Dark mode

Improved accessibility (ARIA)
```





