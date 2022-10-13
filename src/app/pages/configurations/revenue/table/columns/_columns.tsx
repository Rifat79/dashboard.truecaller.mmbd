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
      <UserCustomHeader tableProps={props} title='SL'  />
    ),
    id: 'serial',
    Cell: ({...props}) => <UserSL sl={props.row.index} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Organization'  />,
    id: 'organization',
    accessor: 'organization',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Start Date'  />,
    id: 'startTime',
    accessor: 'startTime',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='End Date'  />,
    id: 'endTime',
    accessor: 'endTime',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Billing Fee'  />,
    id: 'billingFee',
    accessor: 'billingFee',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='DISCREPANCY'  />,
    id: 'discrepancy',
    accessor: 'discrepancy',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Partner Share'  />,
    id: 'partnerShare',
    accessor: 'partnerShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='AIT'  />,
    id: 'ait',
    accessor: 'ait',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='TDS'  />,
    id: 'vat',
    accessor: 'vat',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='GP Grand Share'  />,
    id: 'gpGrandShare',
    accessor: 'gpGrandShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Airtel Grand Share'  />,
    id: 'airtelGrandShare',
    accessor: 'airtelGrandShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Robi Grand Share'  />,
    id: 'robiGrandShare',
    accessor: 'robiGrandShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='BL Grand Share'  />,
    id: 'blGrandShare',
    accessor: 'blGrandShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Teletalk Grand Share'  />,
    id: 'teletalkGrandShare',
    accessor: 'teletalkGrandShare',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Remark'  />,
    id: 'remarks',
    accessor: 'remarks',
  },
  
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Status'  />,
    id: 'status',
    accessor: 'status',
  },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Method'  />,
  //   id: 'method',
  //   accessor: 'method',
  // },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='HTTP PATH'  />,
  //   id: 'module_url',
  //   accessor: 'moduleUrl',
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Last login'  />
  //   ),
  //   id: 'last_login',
  //   Cell: ({...props}) => <UserLastLoginCell last_login={props.data[props.row.index].last_login} />,
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Two steps'  />
  //   ),
  //   id: 'two_steps',
  //   Cell: ({...props}) => <UserTwoStepsCell two_steps={props.data[props.row.index].two_steps} />,
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Joined day'  />
  //   ),
  //   accessor: 'joined_day',
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} user={props.data[props.row.index]}/>,
  },
]

export {usersColumns}
