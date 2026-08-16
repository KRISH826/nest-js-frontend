import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "./LoginForm"


const LoginPage = () => {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden bg-slate-50 p-6 md:p-10">
            {/* Light Mode Ambient Blurred Round Lighting Effects */}
            <div className="absolute -top-24 -left-24 h-[400px] w-[400px] rounded-full bg-sky-300/50 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-[400px] w-[400px] rounded-full bg-purple-300/50 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-indigo-200/50 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium text-slate-900">
                    <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Acme Inc.
                </a>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage