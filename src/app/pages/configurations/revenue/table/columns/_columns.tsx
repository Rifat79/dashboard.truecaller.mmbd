// @ts-nocheck
import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserLastLoginCell} from './UserLastLoginCell'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import { UserSL } from './UserSL'

const usersColumns: ReadonlyArray<Column<User>> = [
  // {
  //   Header: (props) => <UserSelectionHeader tableProps={props} />,
  //   id: 'selection',
  //   Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='SL' className='min-w-125px' />
    ),
    id: 'serial',
    Cell: ({...props}) => <UserSL sl={props.row.index} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Organization' className='min-w-125px' />,
    id: 'organization',
    accessor: 'organization',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='BTRC Share' className='min-w-125px' />,
    id: 'btrcShare',
    accessor: 'btrcShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='GP Share' className='min-w-125px' />,
    id: 'gpShare',
    accessor: 'gpShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Airtel Share' className='min-w-125px' />,
    id: 'airtelShare',
    accessor: 'airtelShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Robi Share' className='min-w-125px' />,
    id: 'robiShare',
    accessor: 'robiShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='BL Share' className='min-w-125px' />,
    id: 'blShare',
    accessor: 'blShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Teletalk Share' className='min-w-125px' />,
    id: 'teletalkShare',
    accessor: 'teletalkShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='DISCREPANCY' className='min-w-125px' />,
    id: 'discrepancy',
    accessor: 'discrepancy',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='AIT' className='min-w-125px' />,
    id: 'ait',
    accessor: 'ait',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Billing Fee' className='min-w-125px' />,
    id: 'billingFee',
    accessor: 'billingFee',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Partner Share' className='min-w-125px' />,
    id: 'partnerShare',
    accessor: 'partnerShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='VAT' className='min-w-125px' />,
    id: 'vat',
    accessor: 'vat',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='GP Grand Share' className='min-w-125px' />,
    id: 'gpGrandShare',
    accessor: 'gpGrandShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Airtel Grand Share' className='min-w-125px' />,
    id: 'airtelGrandShare',
    accessor: 'airtelGrandShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Robi Grand Share' className='min-w-125px' />,
    id: 'robiGrandShare',
    accessor: 'robiGrandShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='BL Grand Share' className='min-w-125px' />,
    id: 'blGrandShare',
    accessor: 'blGrandShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Teletalk Grand Share' className='min-w-125px' />,
    id: 'teletalkGrandShare',
    accessor: 'teletalkGrandShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Remark' className='min-w-125px' />,
    id: 'remarks',
    accessor: 'remarks',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Start Date' className='min-w-125px' />,
    id: 'startTime',
    accessor: 'startTime',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='End Date' className='min-w-125px' />,
    id: 'endTime',
    accessor: 'endTime',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Status' className='min-w-125px' />,
    id: 'status',
    accessor: 'status',
  },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Method' className='min-w-125px' />,
  //   id: 'method',
  //   accessor: 'method',
  // },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='HTTP PATH' className='min-w-125px' />,
  //   id: 'module_url',
  //   accessor: 'moduleUrl',
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Last login' className='min-w-125px' />
  //   ),
  //   id: 'last_login',
  //   Cell: ({...props}) => <UserLastLoginCell last_login={props.data[props.row.index].last_login} />,
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Two steps' className='min-w-125px' />
  //   ),
  //   id: 'two_steps',
  //   Cell: ({...props}) => <UserTwoStepsCell two_steps={props.data[props.row.index].two_steps} />,
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Joined day' className='min-w-125px' />
  //   ),
  //   accessor: 'joined_day',
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Created At' className='min-w-125px' />
    ),
    id: "created_at",
    accessor: 'createdAt',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Updated At' className='min-w-125px' />
    ),
    id: "updated_at",
    accessor: 'updatedAt',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
