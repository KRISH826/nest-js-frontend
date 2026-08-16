import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { ArrowLeft } from "lucide-react"

export function OtpForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Verify your email</CardTitle>
                    <CardDescription>
                        We have sent a verification code to your email address.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="otp" className="sr-only">One-Time Password</FieldLabel>
                                <div className="flex justify-center w-full">
                                    <InputOTP maxLength={6} id="otp">
                                        <InputOTPGroup className="gap-2">
                                            <InputOTPSlot index={0} className="w-10 h-12 sm:w-12 sm:h-14 text-base sm:text-lg border rounded-md shadow-sm" />
                                            <InputOTPSlot index={1} className="w-10 h-12 sm:w-12 sm:h-14 text-base sm:text-lg border rounded-md shadow-sm" />
                                            <InputOTPSlot index={2} className="w-10 h-12 sm:w-12 sm:h-14 text-base sm:text-lg border rounded-md shadow-sm" />
                                            <InputOTPSlot index={3} className="w-10 h-12 sm:w-12 sm:h-14 text-base sm:text-lg border rounded-md shadow-sm" />
                                            <InputOTPSlot index={4} className="w-10 h-12 sm:w-12 sm:h-14 text-base sm:text-lg border rounded-md shadow-sm" />
                                            <InputOTPSlot index={5} className="w-10 h-12 sm:w-12 sm:h-14 text-base sm:text-lg border rounded-md shadow-sm" />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                            </Field>
                            <Field>
                                <Button type="submit" className="w-full">Verify Account</Button>
                                <Button variant="outline" type="button" asChild className="w-full">
                                    <a href="/login" className="flex items-center justify-center gap-2">
                                        <ArrowLeft className="size-4" /> Back to Login Account
                                    </a>
                                </Button>
                                <FieldDescription className="text-center">
                                    Didn&apos;t receive the code? <a href="#">Resend</a>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By verifying your account, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    )
}
