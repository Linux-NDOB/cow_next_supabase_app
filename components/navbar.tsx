import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import { ThemeSwitcher } from "./theme-switcher";
import { LogOut } from "lucide-react";
import  AuthButton from "@/components/header-auth"

export default async function NavbarComponent() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  
  return user ? (
    <nav className="w-[90%] flex flex-row flex-nowrap items-center justify-between py-4 border-b-2">
      <div className="">
        <h1 className="text-black font-black text-2xl">Vex</h1>
      </div>
      <div className="flex items-center gap-4">
        <form action={signOutAction}>
          <Button type="submit" variant={"default"} className="text-sm">
            Salir
            <LogOut></LogOut>
          </Button>
        </form>
      </div>
    </nav>
  ) : (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"} className="text-2xl font-black">
            Vex
          </Link>
        </div>
        <div className="flex gap-2">
          <Button asChild size="sm" variant={"outline"}>
            <Link href="/sign-in">Entrar</Link>
          </Button>
          <Button asChild size="sm" variant={"default"}>
            <Link href="/sign-up">Registrarse</Link>
          </Button>
          <ThemeSwitcher></ThemeSwitcher>
        </div>
      </div>
    </nav>
  );
}
