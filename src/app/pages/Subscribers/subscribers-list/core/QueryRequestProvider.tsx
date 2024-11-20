import {FC, PropsWithChildren, createContext, useContext, useState} from 'react'
import {
  QueryRequestContextProps,
  QueryState,
  initialQueryRequest,
} from '../../../../../_metronic/helpers'

const QueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

interface ChildrenProps {
  children: any
}

const QueryRequestProvider: FC<PropsWithChildren<ChildrenProps>> = ({children}: any) => {
  const [state, setState] = useState<QueryState>(initialQueryRequest.state)

  const updateState = (updates: Partial<QueryState>) => {
    const updatedState = {...state, ...updates} as QueryState
    setState(updatedState)
  }

  return (
    <QueryRequestContext.Provider value={{state, updateState}}>
      {children}
    </QueryRequestContext.Provider>
  )
}

const useQueryRequest = () => useContext(QueryRequestContext)
export {QueryRequestProvider, useQueryRequest}
