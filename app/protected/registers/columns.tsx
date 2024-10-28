'use client'

import { ColumnDef } from "@tanstack/react-table";

export type IotTable = {
  cow_id : string;
  cow_coordenate: string;
  cow_activity: string;
  data_date: string;
  }

export const columns : ColumnDef<IotTable>[] = [
  {
    accessorKey: "cow_coordenate",
    header: "Coordenada",
  },
  {
    accessorKey: "cow_activity",
    header: "Actividad",
  },
  {
    accessorKey: "data_date",
    header: "Fecha toma",
  },
  ]
