import {FC} from 'react'



const UserSL: FC<any> = ({sl = 0}: any) => {
  return (
    <>
      {/* {roles?.map((item, indx) => ( */}
        <div >{sl + 1}</div>
      {/* ))} */}
    </>
  )
}

export {UserSL}
