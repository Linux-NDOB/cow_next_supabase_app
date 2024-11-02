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

  // Hooks cannot be conditional rendered
  const formSchema = z.object({
    cow_name: z.string().min(2).max(50),
    cow_code: z.string().min(2).max(50),
    cow_breed: z.string().min(2).max(50),
    cow_age: z.preprocess((val) => parseInt(val as string), z.number()),
    cow_weight: z.preprocess((val) => parseInt(val as string), z.number()),
    cow_weight_date: z.date(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cow_name: "",
      cow_code: "",
      cow_breed: "",
      cow_age: 0,
      cow_weight: 0,
      cow_weight_date: new Date(),
    },
  });

  
  async function onSubmit(values: z.infer<typeof formSchema>) { 
    const user_id = userId;
    const requestData = { user_id, ...values };
    try {
      const request = await fetch('/api/cow/id/insert', {
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify(requestData),
      });

      toast({
        title: "Informacion registrada con exito!",
        description: ("Porfavor dirijase al listado de bovinos para revisar los cambios realizados"),
      });

      form.reset()
    } catch (error) {
      toast({
        title: "Error!",
        description:
          "Ha ocurrido un error al registrar la informacion",
      });  
    }
  }

  return (
    <div className="w-full flex justify-center my-16">
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
                        <Input placeholder="Edad" type="number" {...field} />
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
                        <Input placeholder="Peso" type="number" {...field} />
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
