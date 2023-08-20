import { KTCard } from '../../../../_metronic/helpers'
import { Toolbar } from '../../../../_metronic/layout/components/toolbar/Toolbar'
import { getDateRange, getFilterModel, getPackage, getPaymentStatus, getPurchaseType, getReferenceValue } from '../../../modules/helpers/helper'
import { pageBreadCrumbs } from '../helper'
import { ListViewProvider } from './core/ListViewProvider'
import { QueryRequestProvider, useQueryRequest } from './core/QueryRequestProvider'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { DataTable } from './table/DataTable'
import { TableHeader } from './table/TableHeader'

const OrderList = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)

  const { state } = useQueryRequest()

  return (
    <>
      <Toolbar breadcrumbs={pageBreadCrumbs('order')} title={`Report -- ${getDateRange(state?.filter)} ${getPackage(state?.filter)} ${getPurchaseType(state?.filter)} ${getPaymentStatus(state?.filter)} ${getReferenceValue(state?.filter)}`}>
        <TableHeader />
      </Toolbar>
      <KTCard>
        <DataTable />
      </KTCard>
    </>
  )
}

const OrdertListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <OrderList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { OrdertListWrapper }
