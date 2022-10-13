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
import { ImageCell } from './ImageCell'
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
    id: 'id',
    Cell: ({...props}) => <UserSL sl={props.row.index} />
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Name'  />,
    id: 'name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Address'  />
    ),
    accessor: 'organizationAddress',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Logo'  />
    ),
    id: 'organizationLogo',
    Cell: ({...props}) => <ImageCell user={props.data[props.row.index]} />,
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Two steps'  />
  //   ),
  //   id: 'two_steps',
  //   Cell: ({...props}) => <UserTwoStepsCell two_steps={props.data[props.row.index].two_steps} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Mobile'  />
    ),
    accessor: 'organizationMobile',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Created At'  />
    ),
    id: "created_at",
    accessor: 'createdAt',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Updated At'  />
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
