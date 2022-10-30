import {useQuery} from 'react-query'
import {UserEditModalForm} from './UserEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getUserById} from '../core/_requests'
import { BASE_URL } from '../../../../constants/api.constants'
import { ModalSpinner } from '../../../../modules/partials/modal-spinner/ModalSpinner'

const UserEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: user,
    error,
  } = useQuery(
    `${BASE_URL}/api/user/get?id=${itemIdForUpdate}`,
    () => {
      return getUserById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  );


  if (!itemIdForUpdate) {
    return <UserEditModalForm isUserLoading={isLoading} user={{id: undefined}} />
  }
  if(isLoading) {
    return <ModalSpinner height={750} width={500}/>
  }
  if (!isLoading && !error && user) {
    return <UserEditModalForm isUserLoading={isLoading} user={user} />
  }

  return null
}

export {UserEditModalFormWrapper}
