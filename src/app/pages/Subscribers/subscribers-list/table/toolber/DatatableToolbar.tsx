import {DatatableFilter} from './DatatableFilter'

const DatatableToolbar = ({initialState}: any) => {
  return (
    <div className='d-flex justify-content-end'>
      <div data-kt-user-table-toolbar='base'>
        <DatatableFilter initialState={initialState} />
      </div>
    </div>
  )
}

export {DatatableToolbar}
