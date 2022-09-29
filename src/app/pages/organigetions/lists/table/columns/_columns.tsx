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
import { SwitchButtonCell } from './org-switch-button'
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
    Header: (props) => <UserCustomHeader tableProps={props} title='Name'  />,
    id: 'name',
    accessor: 'organizationName',
  },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Role'  />,
  //   accessor: 'role',
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Switch'  />
    ),
    id: 'switch',
    Cell: ({...props}) => <SwitchButtonCell user={props.data[props.row.index]} />,
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Created At'  />
  //   ),
  //   id: 'created_at',
  //   accessor: 'createdAt'
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Updated At'  />
  //   ),
  //   id: 'updated_at',
  //   accessor: 'updatedAt',
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
  //   ),
  //   id: 'actions',
  //   Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  // },
]

export {usersColumns}
