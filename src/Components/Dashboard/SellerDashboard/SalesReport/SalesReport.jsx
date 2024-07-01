import DataTable from "react-data-table-component";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";

const SalesReport = () => {

  const axiosSecure = useAxiosSecure()
  const { data: salesReport = [] } = useQuery({
    queryKey: ['salesReport'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`)
      return res.data
    }
  })

  const pdfRef = useRef()
  const handleGeneratePdf = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: "appliedJob",
    onAfterPrint: () => {
      Swal.fire({
        title: "Congratulations!",
        text: "Download Successfully",
        icon: "success"
      });
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
    <div>
      <div ref={pdfRef} className="overflow-x-auto mt-10">
        <DataTable
          columns={columns}
          data={salesReport}
        ></DataTable>
      </div>
      <div className="flex justify-center mt-7">
        <button onClick={handleGeneratePdf} className="btn btn-neutral">Download PDF</button>
      </div>
    </div>
  )
}

export default SalesReport
