import { DatatableSearchComponent } from './header/DatatableSearchComponent'
import { DatatableToolbar } from './toolber/DatatableToolbar'

const TableHeader = ({ initialState }: any) => {
  return (
    <>
      <DatatableSearchComponent />
      <div className='card-toolbar'>
        <DatatableToolbar initialState={initialState}/>
      </div>
    </>
  )
}

export { TableHeader }
