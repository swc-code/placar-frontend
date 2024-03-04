'use client'

import { Button } from '@/components/button/button'
import { TextInput } from '@/components/input/text-input'
import { Api } from '@/lib/axios'
import { Court } from '@/types'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

export default function NewCourtPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const [data, setData] = useState<Court>({
    courtId: '',
    courtDs: '',
  })

  const handleEdit = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setData({ ...data, [name]: e.target.value })
  }

  const handleSave = async () => {
    const { courtDs } = data
    try {
      const { data } = await Api.post<{ data: Court }>(
        'courts',
        {
          courtDs,
        },
        { headers: { Authorization: 'Bearer ' + session!.user.accessToken } },
      )

      router.push(data.data.courtId)
    } catch (error) {}
  }

  return (
    <main className="h-full w-full flex flex-col items-center justify-center">
      <Card className="w-[25rem]">
        <CardHeader>Adicionar novo local</CardHeader>
        <CardBody className="gap-3">
          <TextInput
            data={data.courtDs}
            label="Descrição"
            name="courtDs"
            setData={handleEdit}
            type="text"
          />
          <Button description="Salvar" handleClick={handleSave} />
        </CardBody>
      </Card>
    </main>
  )
}
