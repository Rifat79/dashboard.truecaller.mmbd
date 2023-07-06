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
import { DownloadIconCell } from './DownloadIconCell'

const usersColumns: ReadonlyArray<Column<User>> = [
  // {
  //   Header: (props) => <UserSelectionHeader tableProps={props} />,
  //   id: 'selection',
  //   Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  // },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Start Date'  />
    ),
    id: "startDate",
    accessor: 'startAt',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='End Date'  />
    ),
    id: "endDate",
    accessor: 'endAt',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Title'  />
    ),
    id: "title",
    accessor: 'title',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Request Time'  />
    ),
    id: "requestTime",
    accessor: 'requestAt',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='User'  />
    ),
    id: "user",
    accessor: 'createdBy',
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Download'  />,
    id: 'Role',
    Cell: ({...props}) => <DownloadIconCell user={props.data[props.row.index]}/>,
  },
]

export {usersColumns}
