// import { Link } from "react-router";
// import { LANGUAGE_TO_FLAG } from "../constants";

// const FriendCard = ({ friend }) => {
//   return (
//     <div className="card bg-base-200 hover:shadow-md transition-shadow">
//       <div className="card-body p-4">
//         {/* USER INFO */}
//         <div className="flex items-center gap-3 mb-3">
//           <div className="avatar size-12">
//             <img src={friend.profilePic} alt={friend.fullName} />
//           </div>
//           <h3 className="font-semibold truncate">{friend.fullName}</h3>
//         </div>

//         <div className="flex flex-wrap gap-1.5 mb-3">
//           <span className="badge badge-secondary text-xs">
//             {getLanguageFlag(friend.nativeLanguage)}
//             Native: {friend.nativeLanguage}
//           </span>
//           <span className="badge badge-outline text-xs">
//             {getLanguageFlag(friend.learningLanguage)}
//             Learning: {friend.learningLanguage}
//           </span>
//         </div>

//         <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
//           Message
//         </Link>
//       </div>
//     </div>
//   );
// };
// export default FriendCard;

// export function getLanguageFlag(language) {
//   if (!language) return null;

//   const langLower = language.toLowerCase();
//   const countryCode = LANGUAGE_TO_FLAG[langLower];

//   if (countryCode) {
//     return (
//       <img
//         src={`https://flagcdn.com/24x18/${countryCode}.png`}
//         alt={`${langLower} flag`}
//         className="h-3 mr-1 inline-block"
//       />
//     );
//   }
//   return null;
// }






import { Link } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../constants";

/**
 * FriendCard Component
 * Displays a single friend card safely
 */
const FriendCard = ({ friend }) => {
  // 🔐 Guard against undefined friend (VERY IMPORTANT)
  if (!friend) return null;

  const {
    _id,
    fullName,
    profilePic,
    nativeLanguage,
    learningLanguage,
  } = friend;

  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12 rounded-full overflow-hidden">
            <img
              src={profilePic || "/avatar-placeholder.png"}
              alt={fullName || "User"}
            />
          </div>

          <h3 className="font-semibold truncate">
            {fullName || "Unknown User"}
          </h3>
        </div>

        {/* LANGUAGE BADGES */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {nativeLanguage && (
            <span className="badge badge-secondary text-xs">
              {getLanguageFlag(nativeLanguage)}
              Native: {nativeLanguage}
            </span>
          )}

          {learningLanguage && (
            <span className="badge badge-outline text-xs">
              {getLanguageFlag(learningLanguage)}
              Learning: {learningLanguage}
            </span>
          )}
        </div>

        {/* ACTION */}
        {_id && (
          <Link to={`/chat/${_id}`} className="btn btn-outline w-full">
            Message
          </Link>
        )}
      </div>
    </div>
  );
};

export default FriendCard;

/**
 * Returns country flag based on language
 */
export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (!countryCode) return null;

  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt={`${language} flag`}
      className="h-3 mr-1 inline-block"
      loading="lazy"
    />
  );
}
