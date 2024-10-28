import { IotTable, columns } from "./columns";
import { DataTable } from "./data-table";

const mockData: IotTable[] = [
  {
    cow_id: '1',
    cow_coordenate: 'cow1',
    cow_activity: 'cow_code_1',
    data_date: 'cow_breed',
  },
  {
    cow_id: '2',
    cow_coordenate: 'cow1',
    cow_activity: 'cow_code_1',
    data_date: 'cow_breed',
  },
  {
    cow_id: '3',
    cow_coordenate: 'cow1',
    cow_activity: 'cow_code_1',
    data_date: 'cow_breed',
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
