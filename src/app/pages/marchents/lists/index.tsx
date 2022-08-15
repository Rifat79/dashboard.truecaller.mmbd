import { ListViewProvider, useListView } from './core/ListViewProvider'
import { QueryRequestProvider } from './core/QueryRequestProvider'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { UsersTable } from './table/UsersTable'
import { UserEditModal } from './user-edit-modal/UserEditModal'
import { KTCard } from '../../../../_metronic/helpers'
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import { UsersListHeader } from './components/header/UsersListHeader'

const UsersList = () => {
  let bodyStyles = '';
  bodyStyles += '--kt-toolbar-height: 55px;';
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile:: 55px;';
  document.body.setAttribute('style', bodyStyles);

  const { itemIdForUpdate } = useListView()
  return (
    <>
      <KTCard>
        <UsersTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <UserEditModal />}
    </>
  )
}

const MerchantsWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <Toolbar>
          <UsersListHeader />
        </Toolbar>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { MerchantsWrapper }
