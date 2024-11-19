import { Link } from "react-router-dom";


const Invoice = ({id, invoice_id}: {id: number; invoice_id: string}) => {
  return (
    <>
        <Link to={`/orders/edit/${id}/${invoice_id}`}>{invoice_id}</Link>
      
    </>
  )
}

export default Invoice
