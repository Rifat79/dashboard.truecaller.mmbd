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
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Id'  />,
  //   id: 'id',
  //   accessor: 'id',
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
    Header: (props) => <UserCustomHeader tableProps={props} title='Organization'  />,
    id: 'organization',
    accessor: 'organization',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Brand'  />,
    id: 'brand',
    accessor: 'brand',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Keyword'  />,
    id: 'keyword',
    accessor: 'keyword',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Sub Keyword'  />,
    id: 'subKeyword',
    accessor: 'subKeyword',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Device Type'  />,
    id: 'deviceType',
    accessor: 'deviceType',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Game Provider'  />,
    id: 'gameProvider',
    accessor: 'gameProvider',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Status'  />,
    id: 'status',
    accessor: 'status',
  },
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
    Cell: ({...props}) => <UserActionsCell id={{organizationId: props.data[props.row.index].organizationId, keyword: props.data[props.row.index].keyword}} />,
  },
]

export {usersColumns}
