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
interface RegisterCow {
  user_id: string;
  cow_name: string;
  cow_code: string;
  cow_breed: string;
  cow_age: number;
  cow_weight: number;
  cow_weight_date: Date;
}

export default function RegisterCow() {
  // UID from supabase
  const userData = useUser();
  const userId = userData?.id;

  // User data from drizzle and loading state
  const [user, setUser] = useState<RegisterCow | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  // Hooks cannot be conditional rendered
  const formSchema = z.object({
    user_id: z.string().min(5).max(100),
    cow_name: z.string().min(2).max(50),
    cow_code: z.string().min(2).max(50),
    cow_breed: z.string().min(2).max(50),
    cow_age: z.number(),
    cow_weight: z.number(),
    cow_weight_date: z.date(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: "",
      cow_name: "",
      cow_code: "",
      cow_breed: "",
      cow_age: 0,
      cow_weight: 0,
      cow_weight_date: new Date(),
    },
  });

  // To print data sent by the user(DEV MODE)
  function onSubmit(values: z.infer<typeof formSchema>) {
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
        console.log("mounted");
        // form.reset({});
      } catch {
        console.log("Hubo un error");
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      select_user();
    }
  }, [userId, form]);

  return (
    <div className="w-full flex justify-center">
      <Card className="w-[70%]">
        <CardHeader>
          <CardTitle>Registrar bovinos</CardTitle>
          <CardDescription>Agrega una nueva vaca a los registros.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
              <FormField
                control={form.control}
                name="cow_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Codigo / Hierro</FormLabel>
                    <FormControl>
                      <Input placeholder="Codigo" {...field} />
                    </FormControl>
                    <FormDescription>Tu NIT o Cedula</FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="cow_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la vaca</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre" {...field} />
                      </FormControl>
                      <FormDescription>
                        Si la vaca tiene un nombre ponlo aqui
                      </FormDescription>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cow_breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Raza de la vaca</FormLabel>
                      <FormControl>
                        <Input placeholder="Raza" {...field} />
                      </FormControl>
                      <FormDescription>Raza del bovino</FormDescription>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="cow_age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Edad</FormLabel>
                      <FormControl>
                        <Input placeholder="Edad" {...field} />
                      </FormControl>
                      <FormDescription>
                        Edad en anios de la vaca
                      </FormDescription>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cow_weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso</FormLabel>
                      <FormControl>
                        <Input placeholder="Peso" {...field} />
                      </FormControl>
                      <FormDescription>Peso de la vaca</FormDescription>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="cow_weight_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de pesado</FormLabel>
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

                    <FormDescription>Cuando se peso la vaca por ultima vez</FormDescription>
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
}
