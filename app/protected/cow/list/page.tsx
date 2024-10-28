import { CowTable, columns } from "./columns";
import { DataTable } from "./data-table";

const mockData: CowTable[] = [
  {
    cow_id: '1',
    cow_name: 'cow1',
    cow_code: 'cow_code_1',
    cow_breed: 'cow_breed',
    cow_age: 5,
    cow_weight: 200,
    cow_weight_date: "2024-10-10",
  },
  {
    cow_id: '2',
    cow_name: 'cow2',
    cow_code: 'cow_code_2',
    cow_breed: 'cow_breed_2',
    cow_age: 9,
    cow_weight: 300,
    cow_weight_date: "2024-10-11",
  },

]

export default async function ListCow() {
  return (<>
    <div className="flex-1 flex flex-col p-4 mt-8">
      <section>
        <h2 className="text-black text-4xl font-bold">Listado de vacas</h2>
        <p className="mt-8 text-lg">Todas las vacas que hayan sido registradas se mostraran a continuacion en la siguiente tabla.</p>
      </section>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={mockData} />
      </div>

    </div>
  </>)
}
