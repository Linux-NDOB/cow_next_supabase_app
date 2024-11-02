'use client';

import { CowTable, columns } from "./columns";
import { DataTable } from "./data-table";
import { useState, useEffect } from "react";
import { useUser } from "@/app/context/user";
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

export default function ListCow() {
  // UID from supabase
  const userData = useUser();
  const userId = userData!.id;

  const [ cowListData, setCowListData ] = useState<CowTable[] | undefined>();
  const [ isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(()=> {
    const fetchCowList = async() => {
      try {
        const request = await fetch("/api/cow/id/select", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clientId: userId }),
        });

        const response = await request.json();
        const { cowList } = response;

        console.log(cowList);

        setCowListData(cowList);
        setIsLoading(false);

      } catch (error) {
        console.log(error);
        
      }
    }

    fetchCowList();

  },[])

  return (
    <>
      <div className="flex-1 flex flex-col p-4 mt-8">
        <section>
          <h2 className="text-black text-4xl font-bold">Listado de vacas</h2>
          <p className="mt-8 text-lg">
            Todas las vacas que hayan sido registradas se mostraran a
            continuacion en la siguiente tabla.
          </p>
        </section>
        <div className="container mx-auto py-10">
          {isLoading ? (
            <Skeleton className="h-16 w-full" />
          ) : (
            <DataTable columns={columns} data={cowListData} />
          )}
        </div>
      </div>
    </>
  );
}
