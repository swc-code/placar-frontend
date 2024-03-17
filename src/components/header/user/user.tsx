'use client'

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarContent,
} from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'

export const User = () => {
  const { data: session } = useSession()

  return (
    <NavbarContent as="div" justify="end">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar as="button" name={session?.user.nameDs} />
        </DropdownTrigger>

        <DropdownMenu>
          <DropdownItem>
            <label className="font-bold">
              {session?.user.client?.clientDs}
            </label>
            <p>{session?.user.emailDs}</p>
          </DropdownItem>
          <DropdownItem key="settings">Minhas configurações</DropdownItem>
          <DropdownItem key="logout" onClick={() => signOut()}>
            Sair
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  )
}
