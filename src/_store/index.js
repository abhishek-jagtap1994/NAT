import { configureStore } from '@reduxjs/toolkit'

import { alertReducer } from './alert.slice'
import { authReducer } from './auth.slice'
import { usersReducer } from './users.slice'
 import { rolesReducer } from './roles.slice'
export * from './alert.slice'
export * from './auth.slice'
export * from './users.slice'
export * from './roles.slice'

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    users: usersReducer,
    roles: rolesReducer
  },
})
