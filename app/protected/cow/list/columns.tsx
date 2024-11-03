'use client'

import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";

export type CowTable = | {
  user_id? : string;
  cow_id : string;
  cow_name: string;
  cow_code: string;
  cow_breed: string;
  cow_age: number;
  cow_weight: number;
  cow_weight_date: string;
} | undefined;

export const columns: ColumnDef<CowTable | undefined>[] = [
  {
    accessorKey: "cow_id",
    header: "Id",
  },
  {
    accessorKey: "cow_name",
    header: "Nombre",
  },
  {
    accessorKey: "cow_code",
    header: "Hierro",
  },
  {
    accessorKey: "cow_breed",
    header: "Raza",
  },
  {
    accessorKey: "cow_age",
    header: "Edad",
  },
  {
    accessorKey: "cow_weight",
    header: "Peso(Kg)",
  },
  {
    accessorKey: "cow_weight_date",
    header: ({ column }) => (<Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
      Fecha de pesado
      <ArrowUpDown className="ml-2 h-4 w-4"></ArrowUpDown>
    </Button>),
  },
  {
    id: "actions",
    header: () => <div className="text-center">Opciones</div>,
    cell: ({ row }) => {
      const register = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <span className="sr-only">Menu de opciones</span>
              <Ellipsis className="h-4 w-4"></Ellipsis>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel>Opciones</DropdownMenuLabel>
            <DropdownMenuSeparator></DropdownMenuSeparator>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuSeparator></DropdownMenuSeparator>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
