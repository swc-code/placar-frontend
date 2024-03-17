import { Button } from '@/components/button/button'
import { TextInput } from '@/components/input/text-input'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { Eye, EyeOff } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useSnackbar } from 'notistack'
import { ChangeEvent, MouseEvent, useState } from 'react'

export const LoginCard = () => {
  const [data, setData] = useState({
    emailDs: '',
    passwordDs: '',
  })

  const [isVisible, setIsVisible] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const toggleVisibility = () => setIsVisible(!isVisible)

  const handleEdit = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    e.preventDefault()

    setData({ ...data, [name]: e.target.value })
  }

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      email: data.emailDs,
      password: data.passwordDs,
      redirect: true,
      callbackUrl: '/management',
    })

    if (result?.error)
      enqueueSnackbar(result.status, {
        variant: 'error',
        autoHideDuration: 3000,
      })
    else
      enqueueSnackbar('Sucesso!', {
        variant: 'success',
        autoHideDuration: 3000,
      })
  }

  return (
    <Card className="w-[500px]">
      <CardHeader>Fazer Login</CardHeader>
      <CardBody className="gap-4">
        <TextInput
          data={data.emailDs}
          label="Email"
          name="emailDs"
          setData={handleEdit}
          type="text"
        />
        <TextInput
          data={data.passwordDs}
          label="Senha"
          name="passwordDs"
          setData={handleEdit}
          type={isVisible ? 'text' : 'password'}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? <Eye size={22} /> : <EyeOff size={22} />}
            </button>
          }
        />
      </CardBody>
      <CardFooter className="w-full flex justify-center">
        <Button description="Entrar" handleClick={handleLogin} />
      </CardFooter>
    </Card>
  )
}
