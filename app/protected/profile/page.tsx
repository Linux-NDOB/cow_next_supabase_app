"use client";

//useForm
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// fns
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Shadcn
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { toast } from "@/hooks/use-toast";

// Types
import { ServerResponse, RequestedData } from "./types";

// Zod schema and onsubmit method
import { form_schema } from "./formtypes";

// Next
import { useEffect, useState } from "react";
import Loading from "./loading";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";

//SWR
const fetcher = (url: string, id: string | null | undefined) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ clientId: id }),
  }).then((res) => res.json());

const skeleton = <Skeleton className="w-full h-8" />

const Profile = () => {
  // UID from supabase
  const userData = useUser();
  const userId = userData!.id;

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
  async function onSubmit(values: z.infer<typeof form_schema>) {
    const clientRequestData = { user_id: userId, ...values };
    console.log(clientRequestData);

    try {
      const request = await fetch("/api/user/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(clientRequestData),
      });

      const response = await request.json();
      console.log(response);

      toast({
        title: "Perfil actualizado con exito!",
        description: ("Los datos se actualizaran en breve."),
      });

    } catch (error) {
      console.log(error);
    }
  }

  const [clientProfileData, setClientProfileData] = useState(null);
  const [isClientProfileData, setIsClientProfileData] = useState(false);

  const { data, error, isLoading } = useSWR(
    ["/api/user/profile/select/", userId],
    ([url, userId]) => fetcher(url, userId)
  );

  useEffect(() => {
    if (data?.success && data.userProfileData) {
      const { userProfileData: [profile] } = data;
      const { user_id, ...formProfileData } = profile;
      setClientProfileData(formProfileData);
    }
    // Asegúrate de no incluir `form` en las dependencias si no cambia durante la vida del componente
  }, [data]);


  useEffect(() => {
    if (clientProfileData) {
      form.reset(clientProfileData);
      setIsClientProfileData(true);
    }
  }, [clientProfileData, form]);


  //if (isLoading) return <Loading />;

  if (error) return <h2>Error while loading</h2>;

  //// const serverResponse: ServerResponse = await response.json();
  //const {
  //  success,
  //  userProfileData: [profile],
  //} = data;
  //// // Excludes user_id bc form doesnt use it
  //const { profile: user_id, ...filtered_data } = profile;
  //
  //setClientProfileData(filtered_data);

  return (
    <>
      <div className="flex-1 w-full flex justify-center my-16">
        <Card className="w-[70%]">
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Manten tus datos al dia.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-8"
              >
                <FormField
                  control={form.control}
                  name="user_nit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIT</FormLabel>
                      {!isClientProfileData ? <Skeleton className="w-full h-8" /> : <FormControl>
                        <Input placeholder="NIT" {...field} />
                      </FormControl>
                      }
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
                        {!isClientProfileData ? <Skeleton className="h-8 w-full" /> : <FormControl>
                          <Input placeholder="Nombre" {...field} />
                        </FormControl>
                        }
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
                        {!isClientProfileData ? <Skeleton className="h-8 w-full" /> : <FormControl>
                          <Input placeholder="Apellido" {...field} />
                        </FormControl>}
                        <FormDescription>
                          Apellido(opcional)
                        </FormDescription>
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
                      {!isClientProfileData ? skeleton : <Popover>
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
                                format(new Date(field.value), "PPP", { locale: es })
                              ) : (
                                <span>Seleccione la fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() ||
                              date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      }
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
                      {!isClientProfileData ? skeleton : <FormControl>
                        <Input placeholder="Numero telefonico" {...field} />
                      </FormControl>
                      }
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
    </>
  );
};

export default Profile;
