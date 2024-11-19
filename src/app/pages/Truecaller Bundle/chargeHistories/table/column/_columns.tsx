import { Column } from 'react-table'
import { dateUnixReadable } from '../../../../../modules/helpers/misc';
import { TableModal } from '../../core/_models'
import { BadgeCell } from './BadgeCell'
import { CustomHeader } from './CustomHeader'
import { UserSL } from './UserSL';

const modalColumns: ReadonlyArray<Column<TableModal>> = [

  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='SL' />
    ),
    id: 'serial',
    Cell: ({ ...props }) => <UserSL sl={props.row.index} />,
  }, 
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Reference' />
    ),
    accessor: 'reference',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Mobile' />,
    id: 'msisdn',
    accessor: 'msisdn',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Purchase Type' />,
    accessor: 'request_type',
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Package' />
    ),
    accessor: 'name',
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Price' />,
    accessor: 'price',
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Status' />
    ),
    accessor: 'payment_status',
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Subscription Time' />
    ),
    accessor: 'created_at',
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Next Renewal' />
    ),
    accessor: 'next_renew_date',
  },
]

export { modalColumns }
