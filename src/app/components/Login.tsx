"use client ";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { loginData } from "../register/action";
import toast from "react-hot-toast";
import { useAuthUser } from "../context/Context";
import { useState } from "react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type schemaType = z.infer<typeof schema>;

export function LoginPage() {
  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setUser } = useAuthUser();
  const [open, setOpen] = useState(false);
  const submit = async (v: schemaType) => {
    const result = await loginData(v.email, v.password);

    if (!result) {
      setError("email", { message: "Incorrect credentials" });
      setError("password", { message: "Incorrect credentials" });
      toast.error("something wants wrong");
      return;
    }

    // console.log(result);

    setUser({
      id: result.id,
      email: result.email,
    });

    localStorage.setItem("user", JSON.stringify({ token: result?.token }));
    toast.success("Login Successfully");
    reset();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" type="button" className="cursor-pointer">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(submit)}>
          <DialogHeader>
            <DialogTitle className="md:ml-[40%] ">login page</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Controller
              control={control}
              name="email"
              render={({ field }) => {
                return (
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter a email"
                      {...field}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
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
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter a password"
                      {...field}
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                );
              }}
            />
          </div>

          <div className="flex md:flex-row flex-col gap-2.5  mt-5">
            <Button type="submit" className="cursor-pointer">
              Login
            </Button>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="cursor-pointer px-6 py-1 flex items-center justify-center text-md  rounded-xl border border-gray-400 hover:bg-gray-200 "
            >
              Register
            </Link>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
