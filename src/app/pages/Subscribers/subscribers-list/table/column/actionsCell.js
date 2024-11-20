/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import swal from 'sweetalert'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {ORDER_LIST} from '../../../../../constants/api.constants'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {cancelSubscription} from '../../core/_requests'

const ActionsCell = ({item}) => {
  const {query, refetch} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [query])

  const unsubscription = useMutation(() => cancelSubscription(item), {
    onSuccess: () => {
      queryClient.invalidateQueries([`${ORDER_LIST}-${query}`])
    },
  })

  const unsubscribe = async () => {
    swal({
      title: 'Are you sure, you want to cancel this subscription?',
      text: '',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const res = await unsubscription.mutateAsync()

        if (res?.success) {
          toast.success('Subscription has been canceled!')
          refetch()
        } else {
          toast.error(res?.message || 'Could not cancel the subscription!')
        }
      }
    })
  }

  return (
    <>
      <button
        disabled={false}
        type='button'
        className='btn-action rounded fw-bold bg-transparent border-transparent mx-3 min-w-25px'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <i className='fas fa-ellipsis-vertical text-black' />
      </button>
      {['Active', 'Parking'].includes(item?.subscription_status) ? (
        <div className='menu menu-sub text-start menu-sub-dropdown w-175px p-2' data-kt-menu='true'>
          <button className='text-start btn btn-sm btn-light' onClick={unsubscribe}>
            <span className='text-danger'>
              <i className='la la-stop-circle  fs-3 text-danger'></i> Cancel Subscription
            </span>
          </button>
        </div>
      ) : (
        ''
      )}
      <ToastContainer
        position='top-right' // Positions: top-right, top-center, bottom-right, etc.
        autoClose={3000} // Close toast after 3 seconds
        hideProgressBar={false} // Show the progress bar
        newestOnTop={true} // Newer notifications stack on top
        closeOnClick={true} // Close notification on click
        rtl={false} // Support for Right-to-Left (RTL) layout
        pauseOnFocusLoss={true} // Pause timer when the browser window loses focus
        draggable={true} // Allow drag to dismiss
        pauseOnHover={true} // Pause timer when hovered
        theme='light' // Options: light, dark, colored
        limit={3} // Maximum number of toasts visible at once
      />
    </>
  )
}

export {ActionsCell}
