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
import { UserPermissionCell } from './UserPermissionCell'
import { UserSL } from './UserSL'
import { DetailsIconCell } from './DetailsIconCell'

const usersColumns: ReadonlyArray<Column<User>> = [
  // {
  //   Header: (props) => <UserSelectionHeader tableProps={props} />,
  //   id: 'selection',
  //   Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  // },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Name'  />,
  //   id: 'name',
  //   Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='SL'  />
    ),
    id: 'serial',
    Cell: ({...props}) => <UserSL sl={props.row.index} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Date'  />
    ),
    accessor: 'rdate',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Package'  />
    ),
    accessor: 'package_name',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='New Success Count'  />
    ),
    accessor: 'new_success_cnt',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='New Fail Count'  />
    ),
    accessor: 'new_fail_cnt',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='New Price'  />
    ),
    accessor: 'new_price',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Renew Success Count'  />
    ),
    accessor: 'renew_success_cnt',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Renew Fail Count'  />
    ),
    accessor: 'renew_fail_cnt',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Renew Price'  />
    ),
    accessor: 'renew_price',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Details' />
    ),
    id: 'id-details',
    Cell: ({ ...props }) => <DetailsIconCell data={props.data[props.row.index]} />,
  },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Role'  />,
  //   id: 'Role',
  //   Cell: ({...props}) => <UserLastLoginCell roleList={props.data[props.row.index].role} />,
  // },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Permission'  />,
  //   id: 'Permission',
  //   Cell: ({...props}) => <UserPermissionCell roleList={props.data[props.row.index].role} />,
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
  //     <UserCustomHeader tableProps={props} title='Mobile'  />
  //   ),
  //   accessor: 'mobile',
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Activation Time'  />
  //   ),
  //   id: "created_at",
  //   accessor: 'createdAt',
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
