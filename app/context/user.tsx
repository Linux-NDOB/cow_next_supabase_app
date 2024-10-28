"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface UserCredential {
  id: string | null;
}

const UserContext = createContext<UserCredential | null>(null);
export const useUser = () => useContext(UserContext);

export function UserProvider({ children } : { children: React.ReactNode}) {
  const [userData, setUserData] = useState<UserCredential | null>(null);
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
    };
    fetchUser();
  }, [router]);

  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
}
