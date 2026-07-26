"use client"

import * as React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Send,
  Paperclip,
  Smile,
} from "lucide-react"

interface ChatInputProps {
  onSendMessage: (content: string) => void
  disabled: boolean
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [value, setValue] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed && !disabled) {
      onSendMessage(trimmed)
      setValue("")
    }
  }

  return (
    <footer className="p-4 border-t border-zinc-200/50 dark:border-zinc-800/40 bg-white/30 dark:bg-zinc-950/20">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800"
          title="Add Attachment"
        >
          <Paperclip className="w-4 h-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800"
          title="Insert Emoji"
        >
          <Smile className="w-4.5 h-4.5" />
        </Button>

        <Input
          type="text"
          placeholder="Type your message here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200/60 dark:border-zinc-800/60 focus-visible:ring-indigo-500/30 rounded-xl h-10 px-4"
          disabled={disabled}
        />

        <Button
          type="submit"
          disabled={!value.trim() || disabled}
          className="bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white rounded-xl h-10 px-4 font-semibold shadow-md shadow-indigo-500/10 cursor-pointer disabled:opacity-50"
        >
          <Send className="w-4 h-4 mr-1.5" />
          <span>Send</span>
        </Button>
      </form>
    </footer>
  )
}
