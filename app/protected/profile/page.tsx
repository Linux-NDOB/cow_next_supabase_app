"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@/app/context/user";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Interface not redered on each rerender
interface Profile {
  user_id: string;
  user_nit: string;
  user_name: string;
  user_lastname: string;
  date_of_birth: Date;
  phone_number: string;
}

const Profile = () => {
  // UID from supabase
  const userData = useUser();
  const userId = userData?.id;

  // User data from drizzle and loading state
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  // Hooks cannot be conditional rendered
  const form_schema = z.object({
    user_nit: z.string().min(5).max(100),
    user_name: z.string().min(2).max(50),
    user_lastname: z.string().min(2).max(50),
    date_of_birth: z.date({ required_error: "Campo requerido." }),
    phone_number: z.string().min(10).max(10),
  });

  const form = useForm<z.infer<typeof form_schema>>({
    resolver: zodResolver(form_schema),
    defaultValues: {
      user_nit: "",
      user_name: "",
      user_lastname: "",
      date_of_birth: new Date(),
      phone_number: "",
    },
  });

  // To print data sent by the user(DEV MODE)
  function onSubmit(values: z.infer<typeof form_schema>) {
    toast({
      title: "Information sent",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  // Is there nor user theres nothing to render
  //   if (!userData) return <p>Loading</p>;

  useEffect(() => {
    const select_user = async () => {
      try {
        const response = await fetch(
          `/api/user/${userId}`
        );
        const data: Profile = await response.json();
        // Excludes user_id bc form doesnt use it
        const { user_id, ...filtered_data } = data;
        setUser(data);
        form.reset(filtered_data);
      } catch {
        console.log("Hubo un error");
      } finally {
        setLoading(false);
      }
    };
    if (userId){
        select_user();
    }
  }, [userId, form]);

  return (
    <div className="w-full flex justify-center">
      <Card className="w-[70%]">
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>Manten tus datos al dia.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
              <FormField
                control={form.control}
                name="user_nit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIT</FormLabel>
                    <FormControl>
                      <Input placeholder="NIT" {...field} />
                    </FormControl>
                    <FormDescription>Tu NIT o Cedula</FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="user_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre" {...field} />
                      </FormControl>
                      <FormDescription>
                        Tu nombre personal o de empresa
                      </FormDescription>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="user_lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="Apellido" {...field} />
                      </FormControl>
                      <FormDescription>Apellido(opcional)</FormDescription>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Seleccione la fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormDescription>Fecha de nacimiento</FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numero de telefono</FormLabel>
                    <FormControl>
                      <Input placeholder="Numero telefonico" {...field} />
                    </FormControl>
                    <FormDescription>Numero de contacto</FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <Button type="submit">Guardar</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
