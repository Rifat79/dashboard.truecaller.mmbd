/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import swal from 'sweetalert'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import { GET_ORGANIZATION_LIST } from '../../../../../constants/api.constants'
import { getQueryRequest } from '../../../../../modules/helpers/api'
import { getOrgId } from '../../../../../modules/helpers/helper'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser, updateUser} from '../../core/_requests'

type Props = {
  id: ID
  user: any
}

const UserActionsCell: FC<Props> = ({id, user}) => {
  const {setItemIdForUpdate} = useListView()
  const {query, refetch} = useQueryResponse()
  const queryClient = useQueryClient()
 
  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = () => {
    setItemIdForUpdate(id)
  }

  const deleteItem = useMutation(() => deleteUser(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "The status of this field will be changed",
      icon: "warning",
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const callAPI = async() => {
          const res: any = await getQueryRequest(GET_ORGANIZATION_LIST); 
          console.log('res: ', res)
          const response: any = await updateUser({
            id: user?.id,
            airtelGrandShare: user?.airtelGrandShare,
            airtelShare: user?.airtelShare,
            ait: user?.ait,
            billingFee: user?.billingFee,
            blGrandShare: user?.blGrandShare,
            blShare: user?.blShare,
            btrcShare: user?.btrcShare,
            discrepancy: user?.discrepancy,
            gpGrandShare: user?.gpGrandShare,
            gpShare: user?.gpShare,
            organizationId: getOrgId(res?.data, user?.organization),
            partnerShare: user?.partnerShare,
            remarks: user?.remarks,
            robiGrandShare: user?.robiGrandShare,
            robiShare: user?.robiShare,
            status: user?.status ? 0 : 1,
            teletalkGrandShare: user?.teletalkGrandShare,
            teletalkShare: user?.teletalkShare,
            vat: user?.vat,
            startTime: user?.startTime,
            endTime: user?.endTime
          }); 
          if(response?.data?.success) {
            refetch();
          } else {
            swal(response?.data?.message, {
              icon: "error",
            });
          }
        };
        callAPI();
        
      }
    });
  }

  return (
    <>
      <a
        href='#'
        className='btn btn-light btn-active-light-primary btn-sm'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        Actions
        <KTSVG path='/media/icons/duotune/arrows/arr072.svg' className='svg-icon-5 m-0' />
      </a>
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a className='menu-link px-3' onClick={openEditModal}>
            <i className='bi bi-pen me-2'/>
            Edit
          </a>
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3 '
            data-kt-users-table-filter='delete_row'
            onClick={handleDelete}
          >
            {user?.status ? (
              <i className='bi bi-dash-circle-fill me-2'/>
            ) : (
              <i className="bi bi-check-lg me-2"></i>
            )}
            {user?.status ? (
              'Inactive'
            ) : (
              'Active'
            )}
          </a>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export {UserActionsCell}
