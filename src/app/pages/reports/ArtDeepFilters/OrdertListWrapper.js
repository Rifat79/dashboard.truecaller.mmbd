import {useEffect} from 'react'
import {KTCard, initialQueryState} from '../../../../_metronic/helpers'
import {Toolbar} from '../../../../_metronic/layout/components/toolbar/Toolbar'
import {
  getDateRange,
  getPackage,
  getPaymentStatus,
  getPurchaseType,
  getReferenceValue,
} from '../../../modules/helpers/helper'
import {pageBreadCrumbs} from '../helper'
import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider, useQueryRequest} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {DataTable} from './table/DataTable'
import {TableHeader} from './table/TableHeader'

const OrderList = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)

  const {state, updateState} = useQueryRequest()
  const search = window.location.search
  const date = new URLSearchParams(search).get('date')
  const ref = new URLSearchParams(search).get('ref')

  useEffect(() => {
    if (date || ref)
      updateState({
        filter: date
          ? {
              start_date: `${date} 00:00:00`,
              end_date: `${date} 23:59:59`,
              reference: ref,
            }
          : {
              reference: ref,
            },
        ...initialQueryState,
      })
  }, [])

  return (
    <>
      <Toolbar
        breadcrumbs={pageBreadCrumbs('order')}
        title={`Report -- ${getDateRange(state?.filter)} ${getPackage(
          state?.filter
        )} ${getPurchaseType(state?.filter)} ${getPaymentStatus(state?.filter)} ${getReferenceValue(
          state?.filter
        )}`}
      >
        <TableHeader initialState={{date: date, ref: ref}} />
      </Toolbar>
      <KTCard>
        <DataTable />
      </KTCard>
    </>
  )
}

const ADFReport = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <OrderList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {ADFReport}
