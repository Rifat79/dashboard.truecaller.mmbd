import {FC} from 'react'

type Props = {
  roleList?: []
}

const UserLastLoginCell: FC<Props> = ({roleList = []}: any) => {
  let roles = []; 
  for(let i = 0; i < roleList.length; i++) {
    roles.push(roleList[i].roleName);
  }
  return (
    <>
      {/* {roles?.map((item, indx) => ( */}
        <div className='badge badge-light fw-bolder' >{roleList.roleName}</div>
      {/* ))} */}
    </>
  )
}

export {UserLastLoginCell}
