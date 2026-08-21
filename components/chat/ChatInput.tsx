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
    <footer className="p-4 bg-white dark:bg-zinc-950 border-t border-slate-200/40 dark:border-zinc-800/60 flex-shrink-0">
      <form 
        onSubmit={(e) => {
          e.preventDefault()
          setValue("")
        }}
        className="border border-slate-200 dark:border-zinc-800 rounded-xl bg-slate-50/70 dark:bg-zinc-900/30 flex flex-col focus-within:bg-white dark:focus-within:bg-zinc-900 focus-within:border-zinc-300 dark:focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-300 dark:focus-within:ring-zinc-700 transition-all overflow-hidden"
      >
        {/* Type Area */}
        <input
          type="text"
          placeholder="Send a message to Design System..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-4 pt-3.5 pb-2 bg-transparent text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-550 border-none outline-none focus:ring-0 text-xs sm:text-sm"
        />

        {/* Toolbar & Send Actions */}
        <div className="flex items-center justify-between px-3 py-1.5 border-t border-slate-200/30 dark:border-zinc-800/20 select-none">
          <div className="flex items-center gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-400 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 rounded-md cursor-pointer transition-colors"
              title="Attach File"
            >
              <Paperclip className="w-3.5 h-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-400 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 rounded-md cursor-pointer transition-colors"
              title="Insert Emoji"
            >
              <Smile className="w-3.5 h-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-400 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 rounded-md cursor-pointer transition-colors"
              title="Insert Image"
            >
              <ImageIcon className="w-3.5 h-3.5" />
            </Button>
            
            <div className="w-px h-3.5 bg-slate-200 dark:bg-zinc-800 mx-1.5" />
            
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 rounded transition-colors cursor-pointer"
              title="Bold"
            >
              <Bold className="w-3 h-3" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 rounded transition-colors cursor-pointer"
              title="Italic"
            >
              <Italic className="w-3 h-3" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 rounded transition-colors cursor-pointer"
              title="Underline"
            >
              <Underline className="w-3 h-3" />
            </Button>
          </div>

          <Button
            type="submit"
            disabled={!value.trim()}
            className={`h-7 px-3.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              value.trim()
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                : "bg-slate-200 text-slate-400 dark:bg-zinc-800 dark:text-zinc-500 cursor-not-allowed"
            }`}
          >
            <Send className="w-3 h-3 mr-1.5 inline" />
            Send
          </Button>
        </div>
      </form>
    </footer>
  )
}
