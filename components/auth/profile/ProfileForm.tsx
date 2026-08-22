"use client"

import React, { useState, useEffect, useRef } from 'react'
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
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Loader2, CheckCircle2, Upload } from "lucide-react"
import { useGetProfileQuery, useUpdateProfileMutation } from "@/lib/api/auth/authApi"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfileSchema, UpdateProfileRequest } from "@/schema/user.schema"

export default function ProfileForm({ className, ...props }: React.ComponentProps<"div">) {
    const { data: profileResponse, isLoading: isLoadingProfile } = useGetProfileQuery()
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()

    const user = profileResponse?.data

    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const fileInputRef = useRef<HTMLInputElement>(null)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<UpdateProfileRequest>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            fname: '',
            lname: '',
            bio: '',
        },
        mode: "onBlur",
    })

    const watchFname = watch("fname")
    const watchLname = watch("lname")

    useEffect(() => {
        if (user) {
            reset({
                fname: user.fname || '',
                lname: user.lname || '',
                bio: (user as unknown as { bio?: string })?.bio || '',
            })
            if (user.avatar?.url) {
                setAvatarPreview(user.avatar.url)
            }
        }
    }, [user, reset])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAvatarFile(file)
            setValue('avatar', file)
            setAvatarPreview(URL.createObjectURL(file))
        }
    }

    const onSubmit = async (data: UpdateProfileRequest) => {
        setSuccessMessage('')
        setErrorMessage('')

        try {
            const payload: Record<string, unknown> = {
                fname: data.fname,
                lname: data.lname,
                bio: data.bio,
            }
            if (avatarFile) {
                payload.avatar = avatarFile
            }

            await updateProfile(payload as Parameters<typeof updateProfile>[0]).unwrap()
            setSuccessMessage('Profile updated successfully!')
            setTimeout(() => setSuccessMessage(''), 3000)
        } catch (err: unknown) {
            const errorObj = err as { data?: { message?: string } }
            setErrorMessage(errorObj?.data?.message || 'Failed to update profile. Please try again.')
        }
    }

    const getInitials = () => {
        const f = watchFname?.[0] || user?.fname?.[0] || ''
        const l = watchLname?.[0] || user?.lname?.[0] || ''
        return (f + l).toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Your Profile</CardTitle>
                    <CardDescription>
                        Upload your picture and update your personal details
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-5">
                            {/* Avatar Upload Section */}
                            <div className="flex flex-col items-center justify-center gap-2 py-2">
                                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                    <Avatar className="size-24 ring-4 ring-background shadow-md transition-transform duration-200 group-hover:scale-105">
                                        <AvatarImage src={avatarPreview || user?.avatar?.url} alt="Profile picture" />
                                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                                            {getInitials()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <Camera className="w-6 h-6 text-white" />
                                    </div>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="gap-1.5 text-xs mt-1"
                                >
                                    <Upload className="w-3.5 h-3.5" />
                                    <span>{avatarPreview ? 'Change picture' : 'Upload picture'}</span>
                                </Button>
                            </div>

                            {/* First Name Field */}
                            <Field>
                                <FieldLabel htmlFor="fname">First Name</FieldLabel>
                                <Input
                                    id="fname"
                                    type="text"
                                    placeholder="John"
                                    {...register("fname")}
                                />
                                {errors.fname && (
                                    <p className="text-xs font-medium text-destructive mt-1">
                                        {errors.fname.message}
                                    </p>
                                )}
                            </Field>

                            {/* Last Name Field */}
                            <Field>
                                <FieldLabel htmlFor="lname">Last Name</FieldLabel>
                                <Input
                                    id="lname"
                                    type="text"
                                    placeholder="Doe"
                                    {...register("lname")}
                                />
                                {errors.lname && (
                                    <p className="text-xs font-medium text-destructive mt-1">
                                        {errors.lname.message}
                                    </p>
                                )}
                            </Field>

                            {/* Bio Field */}
                            <Field>
                                <FieldLabel htmlFor="bio">Bio</FieldLabel>
                                <Textarea
                                    id="bio"
                                    placeholder="Tell us a little bit about yourself..."
                                    rows={3}
                                    {...register("bio")}
                                />
                                {errors.bio && (
                                    <p className="text-xs font-medium text-destructive mt-1">
                                        {errors.bio.message}
                                    </p>
                                )}
                            </Field>

                            {/* Feedback Messages */}
                            {successMessage && (
                                <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                                    <span>{successMessage}</span>
                                </div>
                            )}

                            {errorMessage && (
                                <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                                    {errorMessage}
                                </div>
                            )}

                            {/* Submit Button */}
                            <Field>
                                <Button type="submit" className="w-full" disabled={isUpdating || isLoadingProfile || isSubmitting}>
                                    {isUpdating || isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving changes...
                                        </>
                                    ) : (
                                        "Save Profile"
                                    )}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

