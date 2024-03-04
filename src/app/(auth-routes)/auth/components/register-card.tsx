import { Button } from '@/components/button/button'
import { TextInput } from '@/components/input/text-input'
import { Api } from '@/lib/axios'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import { AxiosError } from 'axios'
import { useSnackbar } from 'notistack'
import { ChangeEvent, MouseEvent, useState } from 'react'

export const RegisterCard = () => {
  const defaultData = { nameDs: '', emailDs: '', passwordDs: '', clientId: '' }

  const [data, setData] = useState(defaultData)

  const { enqueueSnackbar } = useSnackbar()

  const handleEdit = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    e.preventDefault()

    setData({ ...data, [name]: e.target.value })
  }

  const clearData = () => {
    setData({ ...defaultData })
  }

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const authData = data
    try {
      const { data } = await Api.post<{ message: string }>('/users', {
        ...authData,
      })

      enqueueSnackbar(data.message, {
        variant: 'success',
        autoHideDuration: 2000,
      })
      clearData()
    } catch (error) {
      if (!(error instanceof AxiosError)) return

      const errorMessages = error.response!.data.errors.details

      if (Array.isArray(errorMessages)) {
        const messages = errorMessages.map((error) => error.message).join(', ')
        enqueueSnackbar(messages, {
          variant: 'error',
          autoHideDuration: 2000,
        })
      } else {
        enqueueSnackbar(error.response!.data.message, {
          variant: 'error',
          autoHideDuration: 2000,
        })
      }
    }
  }

  return (
    <Card className="w-[500px]">
      <CardHeader>Fazer Login</CardHeader>
      <CardBody className="gap-4">
        <TextInput
          data={data.nameDs}
          label="Nome Completo"
          name="nameDs"
          setData={handleEdit}
          type="text"
        />
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
          type="text"
        />
        <TextInput
          data={data.clientId}
          label="Código da Empresa"
          name="clientId"
          setData={handleEdit}
          type="text"
        />
      </CardBody>
      <CardFooter className="w-full flex justify-center">
        <Button description="Entrar" handleClick={handleLogin} />
      </CardFooter>
    </Card>
  )
}
