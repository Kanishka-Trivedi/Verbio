🌐 Verbio: AI-Powered Language Exchange & Social HubVerbio is a high-performance, full-stack language exchange platform built on the MERN stack. It facilitates real-time global connections through intelligent user recommendations, secure authentication, and integrated video/chat capabilities.🚀 Core FeaturesIntelligent Onboarding: Multi-step onboarding to capture native and learning languages.Smart Recommendations: Backend algorithm that suggests language partners based on native/target language matching, excluding existing friends.Social Orchestration: Complete Friend Request lifecycle (Send → Pending → Accept/Reject) with state persistence.Real-time Communication: Integrated Stream-Chat and Video SDK for low-latency communication.Security First: Role-based access control via JWT stored in HTTP-only cookies and protected middleware routes.🛠️ Tech StackLayerTechnologiesFrontendReact 19, Vite, Tailwind CSS 4, DaisyUI, ZustandBackendNode.js, Express.jsDatabaseMongoDB (Mongoose ODM)Real-timeGetStream.io (Chat & Video SDK)SecurityJWT, Bcrypt, Cookie-Parser, CORS📂 Project StructurePlaintextVERBIO/
├── Backend/                 # Express.js Server
│   ├── src/
│   │   ├── controllers/    # Request handlers (Auth, Chat, User)
│   │   ├── lib/            # Database & Third-party service configs
│   │   ├── middleware/     # JWT Auth protection
│   │   ├── models/         # Mongoose Schemas (User, FriendRequest)
│   │   ├── routes/         # API Endpoint definitions
│   │   └── server.js       # App entry point
├── Frontend/                # React Vite Application
│   ├── src/
│   │   ├── components/     # UI Building blocks
│   │   ├── hooks/          # Custom logic (Auth, Login, SignUp)
│   │   ├── lib/            # Axios instance & API utilities
│   │   ├── pages/          # View components
│   │   └── store/          # Zustand state management
└── package.json
🗺️ Logical Workflow MapAuth Gate: server.js uses auth.route.js to handle signup. Passwords are salted/hashed via bcrypt.State Management: useAuthUser.js hook maintains the global user session. If authenticated, the user is redirected from /login to /.Discovery: user.controller.js triggers getRecommendedUsers, filtering the MongoDB User collection by isOnboarded: true and current friend status.Interaction: sendFriendRequest creates a record in the FriendRequest model. The recipient sees this in getFriendRequests.Synchronization: Upon acceptFriendRequest, a MongoDB $addToSet operation updates both users' friends arrays atomically.📡 API Reference (Postman/Insomnia)All private routes require a valid JWT token in the cookies.Authentication (/api/auth)MethodEndpointDescriptionPOST/signupCreate new accountPOST/loginAuthenticate & set cookieGET/meGet current user contextPOST/onboardingFinalize profile detailsUser & Social (/api/users)MethodEndpointDescriptionGET/Fetch recommended partnersGET/friendsList all current friendsPOST/friend-request/:idSend request to user IDPUT/friend-request/:id/acceptAccept pending requestPUT/profileUpdate profile metadataChat Service (/api/chat)MethodEndpointDescriptionGET/tokenRetrieve Stream.io Auth Token⚙️ Environment ConfigurationEnsure you create a .env file in the Backend folder:Code snippetPORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_random_secret_string
STREAM_API_KEY=your_getstream_key
STREAM_API_SECRET=your_getstream_secret
🛠️ Installation & SetupClone the repoSetup Backend:Bashcd Backend
npm install
npm run dev
Setup Frontend:Bashcd Frontend/app
npm install
npm run dev
🛡️ Security ImplementationCORS Policy: Configured to only allow trusted origins (Localhost, Render, Netlify).XSS Protection: JWT is delivered via httpOnly cookies to prevent client-side script access.Route Guards: protectRoute middleware verifies token integrity before allowing access to user data.
