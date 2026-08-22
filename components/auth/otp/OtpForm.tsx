"use client"

import { cn } from "@/lib/tailwind/utils"
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
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { ArrowLeft, Loader2 } from "lucide-react"
import { useVerifyOtpMutation } from "@/lib/api/auth/authApi"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { verifyOtpSchema, VerifyOtpRequest } from "@/schema/user.schema"
import { useSearchParams } from "next/navigation"

export function OtpForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [verifyOtp, { isLoading: isLoadingVerifyOtp }] = useVerifyOtpMutation();
    const searchParams = useSearchParams()
    const email = searchParams.get("email") || "";

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<VerifyOtpRequest>({
        resolver: zodResolver(verifyOtpSchema),
        defaultValues: {
            email,
            otp: "",
        },
        mode: "onBlur",
    })

    const onSubmit = async (data: VerifyOtpRequest) => {
        try {
            await verifyOtp(data).unwrap();
        } catch (error) {
            console.error("Failed to verify OTP:", error);
        }
    }

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="otp" className="sr-only">One-Time Password</FieldLabel>
                                <div className="flex justify-center w-full">
                                    <Controller
                                        control={control}
                                        name="otp"
                                        render={({ field }) => (
                                            <InputOTP maxLength={6} id="otp" value={field.value} onChange={field.onChange}>
                                                <InputOTPGroup className="gap-2">
                                                    <InputOTPSlot index={0} className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg border rounded-md shadow-sm" />
                                                    <InputOTPSlot index={1} className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg border rounded-md shadow-sm" />
                                                    <InputOTPSlot index={2} className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg border rounded-md shadow-sm" />
                                                    <InputOTPSlot index={3} className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg border rounded-md shadow-sm" />
                                                    <InputOTPSlot index={4} className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg border rounded-md shadow-sm" />
                                                    <InputOTPSlot index={5} className="w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg border rounded-md shadow-sm" />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        )}
                                    />
                                </div>
                                {errors.otp && (
                                    <FieldDescription className="text-center text-red-500">
                                        {errors.otp.message}
                                    </FieldDescription>
                                )}
                            </Field>
                            <Field>
                                <Button type="submit" className="w-full" disabled={isLoadingVerifyOtp}>
                                    {isLoadingVerifyOtp ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
                                        </>
                                    ) : (
                                        "Verify Account"
                                    )}
                                </Button>
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
