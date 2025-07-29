"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userRegister } from "./action";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type schemaType = z.infer<typeof schema>;

function SignupForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = async (v: schemaType) => {
    console.log(v);

    await userRegister(v.email, v.password);
    toast.success("Register Successfully");
    reset();
  };

  return (
    <form method="post" onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col gap-4 max-w-xl w-full mx-auto bg-white p-10 rounded-2xl shadow-2xl border-2 mt-10">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold">Register</h1>
        </div>
        <Controller
          control={control}
          name="email"
          render={({ field }) => {
            return (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Email"
                  className="text-muted-foreground font-semibold"
                >
                  Email
                </label>
                <input
                  id="Email"
                  className="border-2 rounded-md p-2 px-4"
                  placeholder="Enter your email"
                  type="text"
                  {...field}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
            );
          }}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => {
            return (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Password"
                  className="text-muted-foreground font-semibold"
                >
                  Password
                </label>
                <input
                  id="Password"
                  className="border-2 rounded-md p-2 px-4"
                  placeholder="Enter your password"
                  type="password"
                  {...field}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            );
          }}
        />
        <button
          type="submit"
          className="bg-blue-700 px-6 py-2 text-white rounded-sm hover:bg-blue-600"
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
