"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: (
          <CircleCheckIcon className="size-4 text-emerald-600 shrink-0" />
        ),
        info: (
          <InfoIcon className="size-4 text-sky-600 shrink-0" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4 text-amber-600 shrink-0" />
        ),
        error: (
          <OctagonXIcon className="size-4 text-rose-600 shrink-0" />
        ),
        loading: (
          <Loader2Icon className="size-4 text-slate-600 animate-spin shrink-0" />
        ),
      }}
      toastOptions={{
        classNames: {
          toast: "font-sans border rounded-md shadow-md text-xs font-semibold p-4 flex items-center gap-3 min-w-[280px]",
          success: "!bg-emerald-50 !text-emerald-600 !border-emerald-200 [&_svg]:!text-emerald-600",
          error: "!bg-rose-50 !text-rose-600 !border-rose-200 [&_svg]:!text-rose-600",
          warning: "!bg-amber-50 !text-amber-600 !border-amber-200 [&_svg]:!text-amber-600",
          info: "!bg-sky-50 !text-sky-600 !border-sky-200 [&_svg]:!text-sky-600",
          loading: "!bg-slate-50 !text-slate-600 !border-slate-200 [&_svg]:!text-slate-600",
          description: "!text-slate-500 text-[11px]",
          actionButton: "!bg-slate-900 !text-white",
          cancelButton: "!bg-slate-100 !text-slate-600",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
