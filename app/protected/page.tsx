import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="flex-1 p-4 flex flex-col">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-4xl my-4">Bienvenido de nuevo</h2>
        <p className="w-[80%]">
          Estimado usuario, en esta seccion queremos mostrarte todas las
          funciones de nuestra aplicacion y la utilidad de cada una de ellas.
          Pofavor lee cuidadosamente los datos mostrados a continuacion.
        </p>

        <h2 className="font-bold text-4xl my-4">Funcionalidades</h2>
        <p>
          Cada apartado que se encuentra en la parte izquierda del panel de
          control sera explicado aqui.
        </p>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>

        {/* <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre> */}
      </div>
    </div>
  );
}
