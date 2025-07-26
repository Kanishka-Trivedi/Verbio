// import React from 'react'
// import { useQuery } from '@tanstack/react-query';
// import { getAuthUser } from '../lib/api.js';

// const useAuthUser = () => {
//   const authUser = useQuery({
//     queryKey: ["authUser"],
//     queryFn: getAuthUser,
//     retry: false,
//   });

//   return { isLoading: authUser.isLoading, authUser: authUser.data?.user };
// }
// export default useAuthUser;






import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAuthUser } from '../lib/api.js';
import { useEffect } from 'react';

const useAuthUser = () => {
  const queryClient = useQueryClient();

  // Load from localStorage (only runs once)
  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      queryClient.setQueryData(["authUser"], { user: JSON.parse(savedUser) });
    }
  }, [queryClient]);

  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const data = await getAuthUser();
      if (data?.user) {
        localStorage.setItem("authUser", JSON.stringify(data.user));
      } else {
        localStorage.removeItem("authUser");
      }
      return data;
    },
    retry: false,
  });

  return { isLoading: authUser.isLoading, authUser: authUser.data?.user };
};

export default useAuthUser;
