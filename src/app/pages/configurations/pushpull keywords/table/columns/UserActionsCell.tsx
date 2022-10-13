/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import swal from 'sweetalert'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser} from '../../core/_requests'

type Props = {
  id: ID
}

const UserActionsCell: FC<Props> = ({id}) => {
  const {setItemIdForUpdate, itemIdForUpdate} = useListView()
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
    console.log('id: ', id)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const callAPI = async() => {
          const response: any = await deleteUser(id);
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
        {/* <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={handleDelete}
          >
            <i className='bi bi-trash me-2'/>
            Delete
          </a>
        </div> */}
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export {UserActionsCell}
