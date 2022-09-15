import {useListView} from '../../core/ListViewProvider'
import {UsersListGrouping} from './UsersListGrouping'
import {UsersListSearchComponent} from './UsersListSearchComponent'

const UsersListHeader = () => {
  const {selected} = useListView()
  return (
    <>
      <UsersListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <UsersListGrouping /> : <></>}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </>
  )
}

export {UsersListHeader}
