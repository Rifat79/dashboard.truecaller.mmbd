import {KTSVG} from '../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'

const UserEditModalHeader = () => {
  const {setItemIdForUpdate} = useListView()

  return (
    <div className="modal-header py-2">
      <h2 className="fw-bolder">Create New Role</h2>
      <div
        className=" btn btn-icon btn-sm btn-active-light-primary"
        data-bs-dismiss="modal"
        aria-label="Close"
        onClick={() => setItemIdForUpdate(undefined)}
        style={{cursor: 'pointer'}}
      >
        <span className="fas fa-times fs-5" />
      </div>
    </div>
  )
}

export {UserEditModalHeader}
