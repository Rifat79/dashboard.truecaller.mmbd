import {KTCard} from '../../../_metronic/helpers'
import PageToolbar from '../../../_metronic/layout/components/toolbar/PageToolbar'
import {PUBLIC_KEY_DOWNLOAD} from '../../constants/api.constants'
import {getAuth} from '../../modules/auth'
import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {ProdutDataTable} from './table/DataTable'
import {TableHeader} from './table/TableHeader'
import {UserEditModal} from './user-edit-modal/UserEditModal'

const profileBreadCrumbs = []

const CustomerList = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 55px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 105px;'
  document.body.setAttribute('style', bodyStyles)
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <PageToolbar breadcrumbs={profileBreadCrumbs}>
        <TableHeader />
      </PageToolbar>
      <KTCard>
        <ProdutDataTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <UserEditModal />}
    </>
  )
}

const CustomerWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <CustomerList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

const DeveloperPageWrapper = () => {
  let bodyStyles = ''
  bodyStyles += '--kt-toolbar-height: 5px;'
  bodyStyles += '--kt-toolbar-height-tablet-and-mobile: 5px;'
  document.body.setAttribute('style', bodyStyles)

  const {user} = getAuth()

  return (
    <div>
      <div className='row mt-4'>
        <div className='col-lg-12'>
          <KTCard>
            <div className='card-header me-2'>
              <div className='card-title'>Public Key</div>
            </div>
            <button
              className='btn btn-primary'
              style={{width: '350px', display: 'inline-block'}}
              type='button'
              onClick={() => {
                const partnerId = user?.partner_id
                window.location.href = `${PUBLIC_KEY_DOWNLOAD}/${partnerId}`
              }}
            >
              <i className='bi bi-download fs-4 me-2'></i> Download Public Key
            </button>
          </KTCard>
          <KTCard>
            <div className='card-header me-2'>
              <div className='card-title'>Documentation</div>
            </div>
            <button
              className='btn btn-primary'
              style={{width: '350px', display: 'inline-block'}}
              type='button'
              onClick={() => {
                const filePath = '/files/MoMagic Truecaller Bundle APIs.pdf'
                window.location.href = filePath
              }}
            >
              <i className='bi bi-share fs-4 me-2'></i> View Documentation
            </button>
          </KTCard>
          <KTCard>
            <div className='card-header me-2'>
              <div className='card-title'>Sample Script</div>
            </div>
            <button
              className='btn btn-primary'
              style={{width: '350px', display: 'inline-block'}}
              type='button'
              onClick={() => {
                const filePath = '/files/sample_script.php'
                window.location.href = filePath
              }}
            >
              <i className='bi bi-file-earmark-arrow-down fs-4 me-2'></i> View PHP Script
            </button>
          </KTCard>
        </div>
      </div>
    </div>
  )
}

export {CustomerWrapper, DeveloperPageWrapper}
