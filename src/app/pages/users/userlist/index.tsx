import { ListViewProvider, useListView } from './core/ListViewProvider'
import { QueryRequestProvider } from './core/QueryRequestProvider'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { UsersListHeader } from './components/header/UsersListHeader'
import { UsersTable } from './table/UsersTable'
import { UserEditModal } from './user-edit-modal/UserEditModal'
import { KTCard } from '../../../../_metronic/helpers'
import { PageTitle } from '../../../../_metronic/layout/core'
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import { UserPasswordChngModal } from './password-change-modal/UserEditModal'

const UsersList = () => {
  let bodyStyles = '';
  bodyStyles += '--kt-toolbar-height: 55px;';
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile:: 55px;';
  document.body.setAttribute('style', bodyStyles);

  const { itemIdForUpdate } = useListView()
  return (
    <>
      <Toolbar>
        <UsersListHeader />
      </Toolbar>
      <KTCard>
        <UsersTable />
      </KTCard>
      {itemIdForUpdate !== undefined && typeof(itemIdForUpdate) != 'object' && <UserEditModal />}
      {itemIdForUpdate !== undefined && typeof(itemIdForUpdate) == 'object' && <UserPasswordChngModal />}
    </>
  )
}

const UsersWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { UsersWrapper }
