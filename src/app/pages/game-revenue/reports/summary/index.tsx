import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider, useQueryRequest} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {UsersListHeader} from './components/header/UsersListHeader'
import {UsersTable} from './table/UsersTable'
import {UserEditModal} from './user-edit-modal/UserEditModal'
import {initialQueryState, KTCard} from '../../../../../_metronic/helpers'
import {PageTitle} from '../../../../../_metronic/layout/core'
import {Toolbar} from '../../../../../_metronic/layout/components/toolbar/Toolbar'
import { getDateRangeByMonth } from '../../../../modules/helpers/helper'
import { useEffect } from 'react'
import ReportSummaryCard from './components/partials/report-summary-card'

const UsersList = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile:: 55px;'
  document.body.setAttribute('style', bodyStyles)

  const {itemIdForUpdate} = useListView()
  const { updateState } = useQueryRequest()

  useEffect(() => {
    const search = window.location.search;
    const startDate = new URLSearchParams(search).get("start_date");
    const endDate = new URLSearchParams(search).get("end_date");
    const game = new URLSearchParams(search).get("game");
    updateState({
      filter: { 
        start_date: `${startDate} 00:00:00`,
        end_date: `${endDate} 23:59:59`,
        game: game
      },
      ...initialQueryState,
    });
  }, []);
  
  
  
  return (
    <>
      <Toolbar>
        <UsersListHeader />
      </Toolbar>
      <KTCard>
        <ReportSummaryCard />
        <UsersTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <UserEditModal />}
    </>
  )
}

const ReportDetails = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {ReportDetails}
