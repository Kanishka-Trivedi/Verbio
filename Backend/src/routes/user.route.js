import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMyFriends, getRecommendedUsers, sendFreindRequest, acceptFreindRequest, getFriendRequests, getOutgoingFriendRequests} from "../controllers/user.controller.js"

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFreindRequest);
router.put("/friend-request/:id/accept", acceptFreindRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendRequests);

export default router;