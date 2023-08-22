import { ListViewProvider } from './core/ListViewProvider'
import { QueryRequestProvider, useQueryRequest } from './core/QueryRequestProvider'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { UsersListHeader } from './components/header/UsersListHeader'
import { UsersTable } from './table/UsersTable'
import ReportSummaryCard from './components/partials/report-summary-card'
import { Toolbar } from '../../../_metronic/layout/components/toolbar/Toolbar'
import { getDateRange, getPackage, getReferenceValue } from '../../modules/helpers/helper'
import { KTCard } from '../../../_metronic/helpers'
import { PageTitle } from '../../../_metronic/layout/core'
import DashboardChart from './components/partials/Chart'
import RevenueChart from './components/partials/RevenueChart'

const UsersList = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile:: 55px;'
  document.body.setAttribute('style', bodyStyles)

  const { state } = useQueryRequest()

  return (
    <>
      <PageTitle>Truecaller Transaction Summary</PageTitle>
      <Toolbar title={`Report Summary -- ${getDateRange(state?.filter)} ${getPackage(state?.filter)}  ${getReferenceValue(state?.filter)}`}>
        <UsersListHeader />
      </Toolbar>
      <KTCard>
        <ReportSummaryCard />
        <DashboardChart />
        {/* <RevenueChart /> */}
        <UsersTable />
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

export { DashboardWrapper }
