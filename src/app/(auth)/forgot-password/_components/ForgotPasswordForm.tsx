"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const router = useRouter();
  const [isSent, setIsSent] = useState(false);


  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const emailValue = useWatch({ control: form.control, name: "email" });

  const onSubmit = async (values: ForgotPasswordValues) => {
    try {
      const response = await forgotPassword(values).unwrap();
      
      if (response.success) {
        setIsSent(true);
        toast.success(response.message || "Reset link sent!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to send reset link");
    }
  };

  if (isSent) {
    return (
      <>
        <div className="self-stretch flex flex-col justify-start items-center gap-4">
          <div className="flex justify-center items-center w-24 h-24 mb-2">
            <AuthLogo className="w-20 h-20" />
          </div>
          <h2 className="text-center text-white text-[32px] font-bold tracking-tight leading-tight">Forgot password</h2>
          <div className="text-center text-white/60 text-base font-normal font-sans leading-relaxed">
            Password reset link has been sent to your email
          </div>
        </div>
        
        <Button 
          onClick={() => router.push("/login")}
          className="self-stretch h-14 bg-[#A80B74] hover:bg-[#A80B74]/90 text-white text-base font-medium font-sans leading-6 rounded-[32px] shadow-[0px_8px_30px_0px_rgba(168,11,116,0.20)] transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Go back to login page
        </Button>
      </>
    );
  }

  return (
    <>
      {/* Header Section */}
      <div className="self-stretch flex flex-col justify-start items-center gap-4">
        <div className="flex justify-center items-center w-24 h-24 mb-2">
          <AuthLogo className="w-20 h-20" />
        </div>
        <h2 className="text-center text-white text-[32px] font-bold tracking-tight leading-tight">Forgot password</h2>
        <div className="text-center text-white/60 text-base font-normal font-sans leading-relaxed">
          Enter your email to receive a reset link
        </div>
      </div>

      {/* Form Section */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="self-stretch flex flex-col gap-6 w-full">
          
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-white/90 text-sm font-semibold pl-1 mb-3 block">Email</FormLabel>
                <FormControl>
                  <div className="relative group h-14 bg-dark rounded-xl shadow-[inset_0px_2px_8px_0px_rgba(0,0,0,0.50)] outline outline-[#A80B74]/30 hover:outline-[#A80B74]/60 transition-all">
                    <Input
                      placeholder="example@xyz.com"
                      className="h-full bg-transparent border-none text-white focus-visible:ring-0 focus-visible:ring-offset-0 px-5 text-base placeholder:text-white/10"
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-[#A80B74] text-xs pl-1" />
              </FormItem>
            )}
          />

          {/* Send Link Button */}
          <Button
            type="submit"
            disabled={isLoading || !emailValue}
            className="self-stretch h-14 bg-[#A80B74] hover:bg-[#A80B74]/90 text-white text-base font-medium font-sans leading-6 rounded-[32px] shadow-[0px_8px_30px_0px_rgba(168,11,116,0.20)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
          >
            {isLoading ? "Sending..." : "Sent link"}
          </Button>

          {/* Login Link */}
          <div className="text-center pt-2">
            <span className="text-white/60 text-sm font-medium font-sans">Remember your password? </span>
            <Link href="/login">
              <span className="text-[#A80B74] text-base font-bold font-sans hover:underline">Log in</span>
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
