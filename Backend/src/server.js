// import express from 'express';
// import "dotenv/config";
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import authRoutes from './routes/auth.route.js';
// import userRoutes from './routes/user.route.js';
// import chatRoutes from './routes/chat.route.js';

// import {connectDB} from './lib/db.js'; 

// const app = express();
// const PORT = process.env.PORT 

// // app.use(cors({
// //     origin: ["http://localhost:5173", "https://verbio-1.onrender.com"],
// //     credentials: true, 
// // })
// // );

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://verbio-1.onrender.com",
//   "https://verbio.netlify.app"
// ];

// app.use(cookieParser());
// // app.use(cors({
// //   origin: (origin, callback) => {
// //     if (!origin || allowedOrigins.includes(origin)) {
// //       callback(null, true);
// //     } else {
// //       callback(new Error("CORS not allowed for this origin"));
// //     }
// //   },
// //   credentials: true,
// // }));


// app.use(cors({
//   origin: allowedOrigins, // Set allowed origins directly
//   credentials: true,      // Crucial: Allows the browser to send cookies
//   methods: ["GET", "POST", "PUT", "DELETE"], // Good practice to explicitly list allowed methods
// }));

// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/chat", chatRoutes);


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     connectDB(); 
// });





import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = [
  "http://localhost:5173",
  "https://verbio-1.onrender.com",
  "https://verbio.netlify.app"
];

// ✅ CORS (SAFE version)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ✅ Handle preflight
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
