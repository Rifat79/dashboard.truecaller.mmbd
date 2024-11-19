import {Column} from 'react-table'
import {TableModal} from '../../core/_models'
import {ActionsCell} from './actionsCell'
import {BadgeCell} from './BadgeCell'
import {CustomHeader} from './CustomHeader'
import {UserSL} from './UserSL'

const modalColumns: ReadonlyArray<Column<TableModal>> = [
  {
    Header: (props) => <CustomHeader tableProps={props} title='SL' />,
    id: 'serial',
    Cell: ({...props}) => <UserSL sl={props.row.index} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Mobile' />,
    accessor: 'msisdn',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Operator' />,
    id: 'operator',
    accessor: 'operator',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Service' />,
    id: 'service',
    accessor: 'service',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Status' className='' />,
    id: 'status',
    Cell: ({...props}) => <BadgeCell badge={props.data[props.row.index].subscription_status} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Price' />,
    accessor: 'price',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Subscription Time' />,
    accessor: 'subscribed_at',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Next Renewal' />,
    accessor: 'next_renew_date',
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end w-45px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell item={props.data[props.row.index]} />,
  },
]

export {modalColumns}
