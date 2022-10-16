import {FC} from 'react'
import { useQueryRequest } from '../../core/QueryRequestProvider'



const CustomValueCell: FC<any> = ({val}: any) => {
  
  return (
    <>
      {/* {roles?.map((item, indx) => ( */}
        <div >{val}</div>
      {/* ))} */}
    </>
  )
}

export {CustomValueCell}
