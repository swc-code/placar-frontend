'use client'

import { ChevronDown, Home } from 'lucide-react'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { User } from './user/user'

export const Header = () => {
  const router = useRouter()

  const icons = {
    chevron: <ChevronDown size={16} />,
  }

  const menu = [
    {
      title: 'Partidas',
      url: '/matches',
    },
    {
      title: 'Quadras',
      url: '/courts',
    },
  ]

  const handleRouting = (url: string) => {
    router.push(url)
  }

  return (
    <Navbar className="bg-success bg-opacity-50 flex items-center">
      <NavbarContent>
        <NavbarItem className="flex h-full items-center">
          <button onClick={() => router.push('/')}>
            <Home size={20} />
          </button>
        </NavbarItem>
        <Dropdown className="left-0">
          <NavbarItem>
            <DropdownTrigger>
              <Button disableRipple variant="light" endContent={icons.chevron}>
                Virtual Arena
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <NavbarItem>
            <DropdownMenu>
              {menu.map((item) => (
                <DropdownItem
                  key={item.url}
                  onClick={() => handleRouting(item.url)}
                >
                  {item.title}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </NavbarItem>
        </Dropdown>
      </NavbarContent>

      <User />
    </Navbar>
  )
}
