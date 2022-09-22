import {FC} from 'react'
import { useNavigate } from 'react-router-dom';
import { getDateRangeByMonth } from '../../../../../../modules/helpers/helper'
import { useQueryRequest } from '../../../summary/core/QueryRequestProvider';

const DetailsIconCell: FC<any> = ({month = ''}: any) => {
  const navigate = useNavigate();
  const dateRange = getDateRangeByMonth(month);
  
  const filterData = () => {
    navigate(`/pushpull/reports/details?start_date=${dateRange?.start_date}&end_date=${dateRange?.end_date}`)
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
