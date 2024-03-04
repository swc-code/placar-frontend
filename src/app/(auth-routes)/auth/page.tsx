'use client'

import { Tab, Tabs } from '@nextui-org/react'
import { LoginCard } from './components/login-card'
import { RegisterCard } from './components/register-card'

export default function AuthPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Tabs>
        <Tab key="login" title="Login">
          <LoginCard />
        </Tab>
        <Tab key="register" title="Registrar-se">
          <RegisterCard />
        </Tab>
      </Tabs>
    </div>
  )
}
