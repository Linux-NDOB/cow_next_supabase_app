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
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  interface Functions {
    id: number;
    title: string;
    content: string;
    action: string;
  }

  const functions: Functions[] = [
    {
      id: 1,
      title: "Perfil",
      content:
        "Con esta funcion podras rellenar informacion valiosa para nosotros, como el NIT o cedula, numero de telefono, entre otros",
      action: "/protected/profile",
    },
    {
      id: 2,
      title: "Listado de bovinos",
      content:
        "Con esta funcion podras rellenar informacion valiosa para nosotros, como el NIT o cedula, numero de telefono, entre otros",
      action: "/protected/cow/list",
    },
    {
      id: 3,
      title: "Registrar bovinos",
      content:
        "Con esta funcion podras rellenar informacion valiosa para nosotros, como el NIT o cedula, numero de telefono, entre otros",
      action: "/protected/cow/register",
    },
    {
      id: 4,
      title: "Registro de actividad",
      content:
        "Con esta funcion podras rellenar informacion valiosa para nosotros, como el NIT o cedula, numero de telefono, entre otros",
      action: "/protected/registers",
    },
  ];

  return (
    <div className="my-16  flex-1 w-[90%] flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-5xl my-4">Bienvenido de nuevo</h2>
        <p className="w-[80%] text-lg">
          Estimado usuario, en esta seccion queremos mostrarte todas las
          funciones de nuestra aplicacion y la utilidad de cada una de ellas.
          Por favor lee cuidadosamente los datos mostrados a continuacion.
        </p>
        {/* <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre> */}
      </div>
      <div>
        <h2 className="font-bold text-4xl my-4">Funcionalidades</h2>
        <p className="text-lg">
          Cada apartado que se encuentra en la parte izquierda del panel de
          control sera explicado aqui.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-2">
          {functions.map((f) => (
            <Card key={f.id}>
              <CardHeader>
                <CardTitle>{f.title}</CardTitle>
                <CardDescription>Funcion destacada</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{f.content}</p>
              </CardContent>
              <CardFooter>
                <Link
                  href={f.action}
                  className={buttonVariants({ variant: "default" })}
                >
                  {f.title}
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
