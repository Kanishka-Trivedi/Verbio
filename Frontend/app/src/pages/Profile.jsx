// import React, { useState } from "react";
// import useAuthUser from "../hooks/useAuthUser";
// import { CameraIcon } from "lucide-react";
// import { useQuery, useMutation } from '@tanstack/react-query';
// import axios from "axios";

// // Example API hook for profile update
// const useUpdateProfile = () => {
//   return useMutation(async (data) => {
//     const response = await axios.put("/api/user/profile", data, {
//       withCredentials: true,
//     });
//     return response.data;
//   });
// };

// // Example API hook for profile picture upload
// const useUploadProfilePic = () => {
//   return useMutation(async (formData) => {
//     const response = await axios.post("/api/user/profile-pic", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//       withCredentials: true,
//     });
//     return response.data;
//   });
// };

// export default function Profile() {
//   const { authUser, refetch } = useAuthUser();
//   const [formData, setFormData] = useState({
//     fullName: authUser?.fullName || "",
//     nativeLanguage: authUser?.nativeLanguage || "",
//     learningLanguage: authUser?.learningLanguage || "",
//     location: authUser?.location || "",
//     bio: authUser?.bio || "",
//   });

//   const [selectedImage, setSelectedImage] = useState(null);

//   const updateProfile = useUpdateProfile();
//   const uploadPic = useUploadProfilePic();

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleProfileSave = async () => {
//     try {
//       await updateProfile.mutateAsync(formData);
//       refetch();
//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Update failed", error);
//       alert("Update failed");
//     }
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setSelectedImage(URL.createObjectURL(file));

//     const formData = new FormData();
//     formData.append("profilePic", file);

//     try {
//       await uploadPic.mutateAsync(formData);
//       refetch();
//       alert("Profile picture updated!");
//     } catch (err) {
//       console.error("Image upload failed", err);
//       alert("Image upload failed");
//     }
//   };

//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   React.useEffect(() => {
//     const updateStatus = () => setIsOnline(navigator.onLine);
//     window.addEventListener("online", updateStatus);
//     window.addEventListener("offline", updateStatus);

//     return () => {
//       window.removeEventListener("online", updateStatus);
//       window.removeEventListener("offline", updateStatus);
//     };
//   }, []);

//   return (
//     <div className="max-w-3xl mx-auto px-6 py-10">
//       <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>

//       {/* Avatar section */}
//       <div className="flex justify-center mb-6 relative group">
//         <label htmlFor="profile-pic" className="cursor-pointer group-hover:opacity-90 transition">
//           <div className="avatar">
//             <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hover:scale-105 transition">
//               <img
//                 src={selectedImage || authUser?.profilePic || "/default.png"}
//                 alt="Profile"
//               />
//             </div>
//             <input
//               type="file"
//               id="profile-pic"
//               className="hidden"
//               accept="image/*"
//               onChange={handleImageUpload}
//             />
//           </div>
//           <div className="absolute bottom-2 right-[38%] bg-white p-1.5 rounded-full shadow">
//             <CameraIcon className="h-5 w-5 text-primary" />
//           </div>
//         </label>
//       </div>

//       {/* Status & Friend Count */}
//       <div className="text-center mb-6">
//         <p className="text-sm text-gray-500">
//           Status:{" "}
//           <span
//             className={`font-semibold ${isOnline ? "text-green-600" : "text-red-500"
//               }`}
//           >
//             {isOnline ? "Online" : "Offline"}
//           </span>
//         </p>

//         <div className="flex justify-center mt-2">
//           <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm shadow-sm">
//             <span className="inline-flex items-center gap-1">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M17 20h5v-2a4 4 0 00-5-4M9 20H4v-2a4 4 0 015-4m8-4a4 4 0 11-8 0 4 4 0 018 0z"
//                 />
//               </svg>
//               Friends:
//             </span>
//             <span className="bg-primary text-white rounded-full px-2 py-0.5 text-xs font-semibold">
//               {authUser?.friends?.length || 0}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Editable Fields */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//         <div>
//           <label className="block text-sm font-medium">Full Name</label>
//           <input
//             type="text"
//             name="fullName"
//             className="input input-bordered w-full"
//             value={formData.fullName}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Native Language</label>
//           <input
//             type="text"
//             name="nativeLanguage"
//             className="input input-bordered w-full"
//             value={formData.nativeLanguage}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Learning Language</label>
//           <input
//             type="text"
//             name="learningLanguage"
//             className="input input-bordered w-full"
//             value={formData.learningLanguage}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Location</label>
//           <input
//             type="text"
//             name="location"
//             className="input input-bordered w-full"
//             value={formData.location}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="sm:col-span-2">
//           <label className="block text-sm font-medium">Bio</label>
//           <textarea
//             name="bio"
//             rows="4"
//             className="textarea textarea-bordered w-full"
//             value={formData.bio}
//             onChange={handleChange}
//             placeholder="Write something about yourself..."
//           />
//         </div>

//       </div>

//       {/* Save Button */}
//       <div className="text-center mt-8">
//         <button
//           className={`btn btn-primary ${updateProfile.isLoading && "loading"}`}
//           onClick={handleProfileSave}
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// }









import React, { useState, useEffect } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { CameraIcon, UserPlus2 } from "lucide-react";
import { useMutation } from '@tanstack/react-query';
import axios from "axios";


// Hook: Update profile
const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.put("https://verbio-vygl.onrender.com/api/users/profile", data, {
        withCredentials: true,
      });
      return response.data;
    },
  });
};


// Hook: Upload profile pic
const useUploadProfilePic = () =>
  useMutation(async (formData) => {
    const response = await axios.post("https://verbio-vygl.onrender.com/api/users/profile-pic", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
    return response.data;
  });

export default function Profile() {
  const { authUser, refetch } = useAuthUser();
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    bio: authUser?.bio || "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const updateProfile = useUpdateProfile();
  const uploadPic = useUploadProfilePic();

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileSave = async () => {
    try {
      await updateProfile.mutateAsync(formData);
      refetch();
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      alert("Update failed");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      await uploadPic.mutateAsync(formData);
      refetch();
      alert("Profile picture updated!");
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Image upload failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">My Profile</h2>

      {/* Avatar Section */}
      <div className="flex justify-center mb-6 relative group">
        <label htmlFor="profile-pic" className="cursor-pointer">
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hover:scale-105 transition">
              <img
                src={selectedImage || authUser?.profilePic || "/default.png"}
                alt="Profile"
              />
            </div>
            <input
              type="file"
              id="profile-pic"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div className="absolute bottom-2 right-[38%] bg-white p-1.5 rounded-full shadow">
            <CameraIcon className="h-5 w-5 text-primary" />
          </div>
        </label>
      </div>

      {/* Status & Friends */}
      <div className="flex justify-center gap-4 mb-8 text-sm">
        <div className={`px-4 py-1 rounded-full shadow-sm bg-base-200 text-${isOnline ? 'green-600' : 'red-500'} font-semibold`}>
          Status: {isOnline ? "Online" : "Offline"}
        </div>
        <div className="flex items-center gap-2 px-4 py-1 bg-primary/10 text-primary rounded-full shadow-sm font-medium">
          <UserPlus2 className="w-4 h-4" />
          Friends:
          <span className="bg-primary text-white rounded-full px-2 py-0.5 text-xs font-semibold">
            {authUser?.friends?.length || 0}
          </span>
        </div>
      </div>

      {/* Editable Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[
          { label: "Full Name", name: "fullName" },
          { label: "Native Language", name: "nativeLanguage" },
          { label: "Learning Language", name: "learningLanguage" },
          { label: "Location", name: "location" }
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type="text"
              name={name}
              className="input input-bordered w-full"
              value={formData[name]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            rows="4"
            className="textarea textarea-bordered w-full"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write something about yourself..."
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="text-center mt-10">
        <button
          className={`btn btn-primary px-8 text-white transition duration-300 hover:scale-105 ${updateProfile.isLoading && "loading"}`}
          onClick={handleProfileSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
