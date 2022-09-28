import { ListViewProvider, useListView } from './core/ListViewProvider'
import { QueryRequestProvider } from './core/QueryRequestProvider'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { UsersListHeader } from './components/header/UsersListHeader'
import { UsersTable } from './table/UsersTable'
import { UserEditModal } from './user-edit-modal/UserEditModal'
import { KTCard } from '../../../../_metronic/helpers'
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import {useState} from 'react'
import FullPageLoader from '../../../modules/partials/loader/loader'

const OrganizationList = () => {
  let bodyStyles = '';
  bodyStyles += '--kt-toolbar-height: 55px;';
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile:: 55px;';
  document.body.setAttribute('style', bodyStyles);

  const [loading, setLoading] = useState(true)

  const { itemIdForUpdate } = useListView()
  return (
    <>
      <Toolbar>
        <UsersListHeader />
      </Toolbar>
      <KTCard>
        <UsersTable />
        {/* <FullPageLoader loaded={!loading} setLoaded={setLoading}/> */}
      </KTCard>
      {itemIdForUpdate !== undefined && <UserEditModal />}
    </>
  )
}

const OrganizationWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <OrganizationList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { OrganizationWrapper }
