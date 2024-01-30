"use client"

import { useState } from "react"
import Heading from "../components/heading/Heading"
import Input from "../components/inputs/input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../components/button/Button"

const RegisterForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
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
            <Heading title="Sign up for E-Shop" />
            <hr className="bg-slate-300 w-full h-1px" />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password" />
            <Button label={isLoading ? "Loading..." : "Sign up"} onClick={handleSubmit(onSubmit)} />
        </>
    )
}

export default RegisterForm