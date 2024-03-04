'use client'

import { ReactNode } from 'react'
import { SnackbarProvider as Provider } from 'notistack'

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>
}
