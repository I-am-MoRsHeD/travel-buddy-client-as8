'use client';
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { registerUser } from "@/services/auth/registerUser";
import Link from "next/link";
import { useActionState } from "react";


const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerUser, null);


    return (
        <form action={formAction}>
            <FieldGroup>
                <div className="grid grid-cols-1 gap-4">
                    {/* name */}
                    <Field>
                        <FieldLabel htmlFor="fullName">
                            Full Name
                        </FieldLabel>
                        <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Evil Rabbit"
                        />
                        <InputFieldError field="fullName" state={state} />
                    </Field>

                    {/* email */}
                    <Field>
                        <FieldLabel htmlFor="email">
                            Email
                        </FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="evil@gmail.com"
                        />
                        <InputFieldError field="email" state={state} />
                    </Field>
                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">
                            Password
                        </FieldLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="********"
                        />
                        <InputFieldError field="password" state={state} />
                    </Field>
                    {/* Confirm password */}
                    <Field>
                        <FieldLabel htmlFor="confirm-password">
                            Confirm Password
                        </FieldLabel>
                        <Input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            placeholder="********"
                        />
                        <InputFieldError field="confirm-password" state={state} />
                    </Field>
                </div>
                <FieldGroup>
                    <Field>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Creating account..." : "Create Account"}
                        </Button>
                        <FieldDescription className="px-6 text-center">
                            Already have an account? {" "}
                            <Link href="/login" className="text-blue-600 hover:underline">
                                Sign in
                            </Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default RegisterForm;