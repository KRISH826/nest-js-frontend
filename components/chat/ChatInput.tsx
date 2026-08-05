"use client"

import * as React from "react"
import { useState, useRef } from "react"
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
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed && !disabled) {
      onSendMessage(trimmed)
      setValue("")
      inputRef.current?.focus()
    }
  }

  return (
    <footer className="p-3 border-t border-zinc-200/50 dark:border-zinc-800/40 bg-white/30 dark:bg-zinc-950/20">
      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-zinc-405 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-850 cursor-pointer shrink-0"
          title="Add Attachment"
        >
          <Paperclip className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-zinc-405 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-850 cursor-pointer shrink-0"
          title="Insert Emoji"
        >
          <Smile className="w-4.5 h-4.5" />
        </Button>

        <Input
          ref={inputRef}
          type="text"
          placeholder="Type your message here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 bg-zinc-50/50 dark:bg-zinc-900/40 border-zinc-200/50 dark:border-zinc-800/40 focus-visible:ring-indigo-500/30 rounded-xl h-9.5 px-3 text-xs sm:text-sm"
          disabled={disabled}
        />

        <Button
          type="submit"
          disabled={!value.trim() || disabled}
          className="bg-indigo-650 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white rounded-xl h-9.5 px-3.5 font-semibold shadow-md shadow-indigo-500/10 cursor-pointer disabled:opacity-50 shrink-0"
        >
          <Send className="w-3.5 h-3.5 mr-1" />
          <span className="text-xs">Send</span>
        </Button>
      </form>
    </footer>
  )
}

