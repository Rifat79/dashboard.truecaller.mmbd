import {useEffect, useMemo, useState} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {CustomHeaderColumn} from './columns/CustomHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import {usersColumns} from './columns/_columns'
import {User} from '../core/_models'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {UsersListPagination} from '../components/pagination/UsersListPagination'
import {initialQueryState, KTCardBody} from '../../../../../_metronic/helpers'
import {useQueryRequest} from '../core/QueryRequestProvider'
import {getQueryRequest} from '../../../../modules/helpers/api'
import {GET_ORGANIZATION_LIST} from '../../../../constants/api.constants'
import PartnerListSlider from './partner-list-slider'

const UsersTable = () => {
  const {updateState} = useQueryRequest()
  const [partners, setPartners] = useState([{}])
  const users = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => users, [users])
  const columns = useMemo(() => usersColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })



  useEffect(() => {
    const callAPI = async () => {
      const res = await getQueryRequest(GET_ORGANIZATION_LIST)
      if (res.success) {
        setPartners(res.data)
      }
    }
    callAPI()
  }, [])

  return (
    <div className='row'>
      <div className='card-body p-4 rounded-3'>
          <PartnerListSlider partners={partners}/>
      </div>

      <KTCardBody className='py-4'>
        <div className='table-responsive'>
          <table
            id='kt_table_users'
            className='table align-middle table-row-dashed fs-6 gy-2 dataTable no-footer'
            {...getTableProps()}
          >
            <thead>
              <tr className='text-start fw-bolder fs-7 text-uppercase gs-0'>
                {headers.map((column: ColumnInstance<User>) => (
                  <CustomHeaderColumn key={column.id} column={column} />
                ))}
              </tr>
            </thead>
            <tbody className='text-gray-600 ' {...getTableBodyProps()}>
              {rows.length > 0 ? (
                rows.map((row: Row<User>, i) => {
                  prepareRow(row)
                  return <CustomRow row={row} key={`row-${i}-${row.id}`} />
                })
              ) : (
                <tr>
                  <td colSpan={7}>
                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                      No matching records found
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <UsersListPagination />
        {isLoading && <UsersListLoading />}
      </KTCardBody>
    </div>
  )
}

export {UsersTable}
