import {Column} from 'react-table'
import {TableModal} from '../../core/_models'
import {CustomHeader} from './CustomHeader'
import {UserSL} from './UserSL'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='SL' />,
    id: 'serial',
    Cell: ({...props}) => <UserSL sl={props.row.index} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='DAte' />,
    accessor: 'date',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='payment channel' />,
    accessor: 'payment_channel',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Total Success Count' />,
    id: 'total_success',
    accessor: 'total_success',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Price' />,
    accessor: 'price_point',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Topline Revenue' />,
    accessor: 'topline_revenue',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Momagic Income' />,
    accessor: 'momagic_income',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Partner Share' />,
    accessor: 'partner_share',
  },
]

export {modalColumns}
