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
import { UserSL } from '../../../../../device-activation/reports/model-wise/table/columns/UserSL'

const usersColumns: ReadonlyArray<Column<User>> = [
  // {
  //   Header: (props) => <UserSelectionHeader tableProps={props} />,
  //   id: 'selection',
  //   Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  // },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
  //   id: 'name',
  //   Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='SL' className='min-w-125px' />
    ),
    id: 'id',
    Cell: ({...props}) => <UserSL sl={props.row.index} />
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Key Word' className='min-w-125px' />
    ),
    accessor: 'keyword',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Mo' className='min-w-125px' />
    ),
    accessor: 'moId',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='MSISDN' className='min-w-125px' />
    ),
    accessor: 'msisdn',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Operator' className='min-w-125px' />
    ),
    accessor: 'operator',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Organizaion' className='min-w-125px' />
    ),
    accessor: 'organization',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Revenue' className='min-w-125px' />
    ),
    accessor: 'revenue',
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Thana' className='min-w-125px' />
  //   ),
  //   accessor: 'thana',
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='District' className='min-w-125px' />
  //   ),
  //   accessor: 'district',
  // },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Division' className='min-w-125px' />
  //   ),
  //   accessor: 'division',
  // },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Role' className='min-w-125px' />,
  //   id: 'Role',
  //   Cell: ({...props}) => <UserLastLoginCell roleList={props.data[props.row.index].role} />,
  // },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Permission' className='min-w-125px' />,
  //   id: 'Permission',
  //   Cell: ({...props}) => <UserPermissionCell roleList={props.data[props.row.index].role} />,
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
  //     <UserCustomHeader tableProps={props} title='Mobile' className='min-w-125px' />
  //   ),
  //   accessor: 'mobile',
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Created At' className='min-w-125px' />
    ),
    id: "created_at",
    accessor: 'createdAt',
  },
  // {
  //   Header: (props) => (
  //     <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
  //   ),
  //   id: 'actions',
  //   Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  // },
]

export {usersColumns}
