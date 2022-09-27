import {useListView} from '../../core/ListViewProvider'
import {UsersListToolbar} from './UserListToolbar'
import {UsersListGrouping} from './UsersListGrouping'
import {UsersListSearchComponent} from './UsersListSearchComponent'

const UsersListHeader = ({state, setState}: any) => {
  const {selected} = useListView()
  return (
    <>
    
      {/* <UsersListSearchComponent /> */}
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <UsersListGrouping /> : <UsersListToolbar state={state} setState={setState}/>}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </>
  )
}

export {UsersListHeader}
