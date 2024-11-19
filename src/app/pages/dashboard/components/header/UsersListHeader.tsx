import {Can} from '../../../../../_metronic/redux/ability'
import {useListView} from '../../core/ListViewProvider'
import {UsersListToolbar} from './UserListToolbar'
import {UsersListGrouping} from './UsersListGrouping'

const UsersListHeader = () => {
  const {selected} = useListView()
  return (
    <Can access='Truecaller Summary' group='/dashboard'>
      <div className='card-toolbar'>
        {selected.length > 0 ? <UsersListGrouping /> : <UsersListToolbar />}
      </div>
    </Can>
  )
}

export {UsersListHeader}
