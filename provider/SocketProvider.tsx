"use client"

import { useEffect } from "react"
import { socket } from "@/lib/socket/ws"

export function SocketProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected:", socket.id)
        })

        socket.on("roomNotice", (data: { username: string; message: string }) => {
            console.log(data.message)
        })
        socket.on("chatMessage", (data: { username: string; message: string }) => {
            console.log(data.message)
        })

        socket.on("disconnect", () => {
            console.log("Disconnected")
        })

        socket.connect()

        return () => {
            socket.off("connect")
            socket.off("roomNotice")
            socket.off("disconnect")
            socket.disconnect()
        }
    }, [])

    return <>{children}</>
}