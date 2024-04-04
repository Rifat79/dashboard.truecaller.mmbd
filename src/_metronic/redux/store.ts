import {ConfigureStoreOptions, combineReducers, configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {apiSlice} from './slices/apiSlice'

import {useDispatch} from 'react-redux'
import {
  productFormErrorsReducer,
  productFormErrorsReducerPath,
} from '../../app/pages/products/redux-slices'
import {marketingToolsReducer} from './marketingTools/marketingToolsReducer'

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  marketingTools: marketingToolsReducer,
  [productFormErrorsReducerPath]: productFormErrorsReducer,
})

export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    ...options,
  })
export const store = createStore()

setupListeners(createStore().dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
