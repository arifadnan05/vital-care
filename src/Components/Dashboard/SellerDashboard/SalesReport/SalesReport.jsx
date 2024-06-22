import DataTable from "react-data-table-component";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const SalesReport = () => {

  const axiosSecure = useAxiosSecure()
  const { data: salesReport = [] } = useQuery({
    queryKey: ['salesReport'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`)
      return res.data
    }
  })

  const columns = [
    {
      name: 'Medicine Name',
      selector: row => row.medicine_name,
    },
    {
      name: 'Seller Email',
      selector: row => row.seller_email,
    },
    {
      name: 'Buyer Email',
      selector: row => row.email,
    },
    {
      name: 'Date',
      selector: row => row.date,
    },
    {
      name: 'Payment Status',
      selector: row => row.status,
    },
    {
      name: 'Total Price',
      selector: row => `$${row.price}`,
    },

  ];



  return (
      <div className="overflow-x-auto mt-10">
        <DataTable
          columns={columns}
          data={salesReport}
        ></DataTable>
      </div>
  )
}

export default SalesReport
