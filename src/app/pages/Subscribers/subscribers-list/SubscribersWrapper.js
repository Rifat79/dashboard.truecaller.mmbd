import {KTCard} from '../../../../_metronic/helpers'
import {Toolbar} from '../../../../_metronic/layout/components/toolbar/Toolbar'
import {pageBreadCrumbs} from '../helper'
import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {DataTable} from './table/DataTable'
import {TableHeader} from './table/TableHeader'

const OrderList = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)

  const search = window.location.search
  const date = new URLSearchParams(search).get('date')
  const ref = new URLSearchParams(search).get('ref')

  return (
    <>
      <Toolbar breadcrumbs={pageBreadCrumbs('order')} title={``}>
        <TableHeader initialState={{date: date, ref: ref}} />
      </Toolbar>
      <KTCard>
        <DataTable />
      </KTCard>
    </>
  )
}

const SubscribersWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <OrderList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {SubscribersWrapper}
