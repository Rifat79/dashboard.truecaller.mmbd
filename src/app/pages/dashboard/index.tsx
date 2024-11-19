import {KTCard} from '../../../_metronic/helpers'
import {Toolbar} from '../../../_metronic/layout/components/toolbar/Toolbar'
import {PageTitle} from '../../../_metronic/layout/core'
import {Can} from '../../../_metronic/redux/ability'
import {getDateRange, getPackage, getReferenceValue} from '../../modules/helpers/helper'
import {UsersListHeader} from './components/header/UsersListHeader'
import DashboardChart from './components/partials/Chart'
import ReportSummaryCard from './components/partials/report-summary-card'
import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider, useQueryRequest} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {UsersTable} from './table/UsersTable'

const UsersList = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile:: 55px;'
  document.body.setAttribute('style', bodyStyles)

  const {state} = useQueryRequest()

  return (
    <>
      <PageTitle>Transaction Summary</PageTitle>
      <Toolbar
        title={`Report Summary -- ${getDateRange(state?.filter)} ${getPackage(
          state?.filter
        )}  ${getReferenceValue(state?.filter)}`}
      >
        <UsersListHeader />
      </Toolbar>
      <KTCard>
        <Can access={'Truecaller Summary'} group={'dashboard'}>
          <ReportSummaryCard />
          <DashboardChart />
          {/* <RevenueChart /> */}
          <UsersTable />
        </Can>
      </KTCard>
    </>
  )
}

const DashboardWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {DashboardWrapper}
