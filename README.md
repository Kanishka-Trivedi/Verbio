# 🌐 Verbio  

<p align="center">
  <img src="screenshots/assets/Screenshot 2026-01-05 133808.png" width="260" />
  <img src="screenshots/assets/Screenshot 2026-01-05 133832.png" width="260" />
  <img src="screenshots/assets/Screenshot 2026-01-05 134201.png" width="260" />
  <img src="screenshots/assets/Screenshot 2026-01-05 134219.png" width="260" />
  <img src="screenshots/assets/Screenshot 2026-01-05 142312.png" width="260" />
  <img src="screenshots/assets/Screenshot 2026-01-06 134052.png" width="260" />
  <img src="screenshots/assets/Screenshot 2026-01-06 134133.png" width="260" />
  <img src="screenshots/assets/Screenshot 2026-01-06 134310.png" width="260" />
  <img src="screenshots/assets/Screenshot 2026-01-06 134317.png" width="260" />
</p>

### AI-Powered Language Exchange & Social Hub

Verbio is a high-performance, full-stack **language exchange platform** built on the **MERN stack**.  
It enables real-time global connections through intelligent user recommendations, secure authentication, and integrated video & chat capabilities.

---

## 🚀 Core Features

- **Intelligent Onboarding**  
  Multi-step onboarding to capture native and learning languages.

- **Smart Recommendations**  
  Backend algorithm suggests language partners based on native/target language matching, excluding existing friends.

- **Social Orchestration**  
  Complete Friend Request lifecycle (Send → Pending → Accept/Reject) with persistent state handling.

- **Real-time Communication**  
  Integrated **Stream Chat & Video SDK** for low-latency messaging and video calls.

- **Security First**  
  Role-based access control using JWT stored in **HTTP-only cookies**, enforced via protected middleware routes.

---

## 🛠️ Tech Stack

| Layer        | Technologies |
|-------------|--------------|
| **Frontend** | React 19, Vite, Tailwind CSS 4, DaisyUI, Zustand |
| **Backend**  | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Real-time** | GetStream.io (Chat & Video SDK) |
| **Security** | JWT, Bcrypt, Cookie-Parser, CORS |

---

## 📂 Project Structure

```plaintext
VERBIO/
├── Backend/                 # Express.js Server
│   ├── src/
│   │   ├── controllers/     # Request handlers (Auth, Chat, User)
│   │   ├── lib/             # Database & third-party service configs
│   │   ├── middleware/      # JWT authentication & route protection
│   │   ├── models/          # Mongoose schemas (User, FriendRequest)
│   │   ├── routes/          # API endpoint definitions
│   │   └── server.js        # Application entry point
│
├── Frontend/                # React (Vite) Application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom hooks (Auth, Login, SignUp)
│   │   ├── lib/             # Axios instance & API utilities
│   │   ├── pages/           # Page-level components
│   │   └── store/           # Zustand global state management
│
└── package.json
```


## 🗺️ Logical Workflow Map

### 🔐 Auth Gate
- `server.js` routes authentication via `auth.route.js`
- Passwords are salted and hashed using **bcrypt**

---

### 🧠 State Management
- `useAuthUser.js` maintains the global user session
- Authenticated users are redirected from `/login` → `/`

---

### 🔍 Discovery
- `getRecommendedUsers` filters MongoDB users by:
  - `isOnboarded: true`
  - Excludes existing friends and pending requests

---

### 🤝 Interaction
- `sendFriendRequest` creates a record in the `FriendRequest` model
- Requests are fetched using `getFriendRequests`

---

### 🔄 Synchronization
- `acceptFriendRequest` uses MongoDB `$addToSet`
- Atomically updates both users’ `friends` lists

---

## 📡 API Reference

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/signup` | Create new account |
| POST | `/login` | Authenticate & set JWT cookie |
| GET  | `/me` | Get current user context |
| POST | `/onboarding` | Finalize profile details |

---

### 👥 User & Social (`/api/users`)

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/` | Fetch recommended partners |
| GET | `/friends` | List all current friends |
| POST | `/friend-request/:id` | Send friend request |
| PUT | `/friend-request/:id/accept` | Accept pending request |
| PUT | `/profile` | Update profile metadata |

---

### 💬 Chat Service (`/api/chat`)

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/token` | Retrieve Stream.io auth token |

---

## ⚙️ Environment Configuration

Create a `.env` file inside the **Backend** directory:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_random_secret_string
STREAM_API_KEY=your_getstream_key
STREAM_API_SECRET=your_getstream_secret
```

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/verbio.git
cd verbio
```

### 2️⃣ Backend Setup
```bash
cd Backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd Frontend/app
npm install
npm run dev
```

## 🛡️ Security Implementation

### 🔒 CORS Policy
- Configured to allow only trusted origins:
  - Localhost
  - Render
  - Netlify

---

### 🛑 XSS Protection
- JWT tokens are stored in **HTTP-only cookies**
- Prevents access from client-side scripts

---

### 🚧 Route Guards
- `protectRoute` middleware validates JWT integrity
- Blocks unauthorized access to protected routes

---

## 📌 Status

- 🚧 Actively developed  
- ✅ Core features implemented  
- 🔜 Performance optimizations & scalability improvements planned

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.  
Feel free to open a pull request or raise an issue.

