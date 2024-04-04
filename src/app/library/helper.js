import {getLocal} from '../modules/helpers/misc'

export const Can = ({children, access, group}) => {
  if (access === 'false' || group === 'false') {
    return children
  }

  const userPermission = getLocal('permissions') || []

  let groupData = []

  if (group && userPermission && userPermission.length > 0) {
    groupData = userPermission.find((f) => f.group_route.includes(group.toLowerCase()))
  }

  if (groupData) {
    if (groupData?.permissions && groupData?.permissions.length > 0) {
      const permission = groupData?.permissions.find(
        (f) => f.name.includes(access) || f.route.includes(access)
      )
      if (permission) {
        return <>{children}</>
      }
    }
  }
  return <></>
}
