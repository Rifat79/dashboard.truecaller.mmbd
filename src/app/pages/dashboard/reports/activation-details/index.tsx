import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider, useQueryRequest} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {UsersListHeader} from './components/header/UsersListHeader'
import {UsersTable} from './table/UsersTable'
import {UserEditModal} from './user-edit-modal/UserEditModal'
import {initialQueryState, KTCard} from '../../../../../_metronic/helpers'
import {PageTitle} from '../../../../../_metronic/layout/core'
import {Toolbar} from '../../../../../_metronic/layout/components/toolbar/Toolbar'
import {useEffect} from 'react'
import moment from 'moment'
import ReportSummaryCard from './components/partials/report-summary-card'
import { getDateRange, getFilterModel, getPackage, getPaymentStatus } from '../../../../modules/helpers/helper'

const UsersList = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile:: 55px;'
  document.body.setAttribute('style', bodyStyles)

  const {itemIdForUpdate} = useListView()
  const {updateState, state} = useQueryRequest()

  useEffect(() => {
    const endDate = moment().format('MM-DD-YYYY')
    const startDate = moment()
      .subtract(30, 'days')
      .format('MM-DD-YYYY')
    const search = window.location.search
    const model = new URLSearchParams(search).get('model')
    updateState({
      filter: {
        model: model,
      },
      ...initialQueryState,
    })
  }, [])

  return (
    <>
      <Toolbar title={`Report -- ${getDateRange(state?.filter)} ${getFilterModel(state?.filter)} ${getPackage(state?.filter)} ${getPaymentStatus(state?.filter)}`}>
        <UsersListHeader />
      </Toolbar>
      <KTCard>
        {/* <ReportSummaryCard /> */}
        <UsersTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <UserEditModal />}
    </>
  )
}

const ActivationDetailsWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {ActivationDetailsWrapper}