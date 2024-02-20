'use client'

import { NextUIProvider as Provider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

export const NextUIProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </Provider>
  )
}
