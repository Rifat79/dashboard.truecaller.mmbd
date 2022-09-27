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

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Id' className='min-w-125px' />,
  //   id: 'id',
  //   accessor: 'id',
  // },
  // {
  //   Header: (props) => <UserCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
  //   id: 'name',
  //   Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  // },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Organization' className='min-w-125px' />,
    id: 'organization',
    accessor: 'organization',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Brand' className='min-w-125px' />,
    id: 'brand',
    accessor: 'brand',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Keyword' className='min-w-125px' />,
    id: 'keyword',
    accessor: 'keyword',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Sub Keyword' className='min-w-125px' />,
    id: 'subKeyword',
    accessor: 'subKeyword',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Device Type' className='min-w-125px' />,
    id: 'deviceType',
    accessor: 'deviceType',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Game Provider' className='min-w-125px' />,
    id: 'gameProvider',
    accessor: 'gameProvider',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Status' className='min-w-125px' />,
    id: 'status',
    accessor: 'status',
  },
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
    Cell: ({...props}) => <UserActionsCell id={{organizationId: props.data[props.row.index].organizationId, keyword: props.data[props.row.index].keyword}} />,
  },
]

export {usersColumns}