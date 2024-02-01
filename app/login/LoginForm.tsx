"use client"

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";
import Heading from "../components/heading/Heading";
import Button from "../components/button/Button";
import Input from "../components/inputs/input";
import Link from "next/link";


const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data);
    }

    return (
        <>
            <Heading title="Log in to E-Shop" />
            <Button outline label="Log in with Google" onClick={() => { }} icon={AiOutlineGoogle} />
            <hr className="bg-slate-300 w-full h-1px" />
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password" />
            <Button label={isLoading ? "Loading..." : "Log in"} onClick={handleSubmit(onSubmit)} />
            <p className="text-sm">Don't have an account?{"  "}
                <Link href={'/register'} className="underline">Sign up</Link>
            </p>
        </>
    )
}

export default LoginForm