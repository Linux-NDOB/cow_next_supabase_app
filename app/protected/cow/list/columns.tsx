'use client'

import { ColumnDef } from "@tanstack/react-table";

export type CowTable = {
  cow_id : string;
  cow_name: string;
  cow_code: string;
  cow_breed: string;
  cow_age: number;
  cow_weight: number;
  cow_weight_date: string;
}

export const columns : ColumnDef<CowTable>[] = [
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
    header: "Peso",
  },
  {
    accessorKey: "cow_weight_date",
    header: "Fecha pesado",

  },
]
