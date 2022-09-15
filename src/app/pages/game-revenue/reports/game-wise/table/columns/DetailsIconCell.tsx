import {FC} from 'react'
import { useNavigate } from 'react-router-dom';

const DetailsIconCell: FC<any> = ({game=''}: any) => {
  const navigate = useNavigate();
  
  const filterData = () => {
    navigate(`/revenue/reports/details?game=${game}`)
  };
  return (
    <>
      <a
        href='#'
        className='btn btn-icon btn-light-primary btn-active-light-pribtn-light-primary w-30px h-30px'
        data-kt-docs-table-filter='edit_row'
        onClick={filterData}
      >
        <i className='fas fa-eye fs-6' />
      </a>
    </>
  )
}

export {DetailsIconCell}
