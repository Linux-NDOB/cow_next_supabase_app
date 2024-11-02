'use client'

import { ColumnDef } from "@tanstack/react-table";

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
    header: "Fecha pesado",
  },
];
