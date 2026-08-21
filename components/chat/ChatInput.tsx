"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Send,
  Paperclip,
  Smile,
  Image as ImageIcon,
  Bold,
  Italic,
  Underline
} from "lucide-react"

export function ChatInput() {
  const [value, setValue] = useState("")

  return (
    <footer className="p-4 bg-white dark:bg-zinc-900 border-t border-slate-200/50 dark:border-zinc-800/80 flex-shrink-0">
      <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
        {/* Formatting/Actions Toolbar */}
        <div className="flex items-center justify-between border border-slate-200 dark:border-zinc-800 rounded-xl bg-slate-50 dark:bg-zinc-950 px-3 py-1.5 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all select-none">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 rounded-lg cursor-pointer transition-colors"
              title="Attach File"
            >
              <Paperclip className="w-4.5 h-4.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 rounded-lg cursor-pointer transition-colors"
              title="Insert Emoji"
            >
              <Smile className="w-4.5 h-4.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 rounded-lg cursor-pointer transition-colors"
              title="Insert Image"
            >
              <ImageIcon className="w-4.5 h-4.5" />
            </Button>

            <div className="w-px h-4 bg-slate-355 dark:bg-zinc-800 mx-1.5" />

            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="text-zinc-500 hover:text-zinc-705 rounded transition-colors cursor-pointer"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="text-zinc-500 hover:text-zinc-750 rounded transition-colors cursor-pointer"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="text-zinc-500 hover:text-zinc-750 rounded transition-colors cursor-pointer"
              title="Underline"
            >
              <Underline className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Input Text Box */}
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type your message here..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full pr-12 pl-4 py-3 bg-slate-100 dark:bg-zinc-800/80 text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 rounded-xl border border-transparent focus:bg-white dark:focus:bg-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm h-11"
            />

            {/* Embedded Send Button */}
            <button
              type="submit"
              disabled={!value.trim()}
              className={`absolute right-2.5 bottom-2 p-1.5 rounded-lg transition-all ${value.trim()
                  ? "bg-indigo-600 text-white hover:bg-indigo-550 shadow-md cursor-pointer"
                  : "text-slate-350 dark:text-zinc-650 cursor-not-allowed"
                }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </footer>
  )
}
