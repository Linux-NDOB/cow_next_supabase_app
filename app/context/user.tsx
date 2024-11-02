"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import  Loader  from "./loading"


type UserCredential = {
  id: string | null;
};

const UserContext = createContext<UserCredential | null>(null);
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserCredential | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/sign-in");
      } else {
        setUserData({ id: user.id });
      }

      setIsLoading(false);
    };

    fetchUser();
  }, [router]);

  if (isLoading) return (<Loader className="animate-spin" />
)  
  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  
}
