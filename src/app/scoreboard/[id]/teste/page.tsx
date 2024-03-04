'use client'

import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

export default function TestePage({ params: { id } }) {
  const [socket, setSocket] = useState<Socket>()
  const [data, setData] = useState()

  useEffect(() => {
    const socket = io('http://localhost:3333')

    socket.on('on-' + id, (data) => {
      console.log(data)
      setData(data)
    })

    setSocket(socket)
  }, [setSocket, id])

  return <>{JSON.stringify(data)}</>
}
