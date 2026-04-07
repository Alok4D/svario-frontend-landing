"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { cn } from "@/lib/utils";
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
import { EyeIcon, EyeOffIcon } from "lucide-react";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (values: SignupValues) => {
    try {
      const { confirmPassword, terms, ...signupData } = values;
      // const response = await createUser(signupData).unwrap();

      // if (response.success) {
      //   toast.success(response.message || "Account created successfully!");
      //   router.push("/login"); // Redirect to login after successful signup
      // }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string }, message?: string };
      toast.error(error?.data?.message || error?.message || "An error occurred during sign up");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="self-stretch flex flex-col gap-4 w-full">

        {/* Full Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-sm font-medium text-gray-700 mb-1.5 pl-1 block">Name</FormLabel>
              <FormControl>
                <div className="relative h-12 bg-white rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <Input
                    placeholder="Fernando Torres"
                    className="h-full bg-transparent border-none text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 text-sm placeholder:text-gray-400"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-brand text-xs pl-1" />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-sm font-medium text-gray-700 mb-1.5 pl-1 block">Email</FormLabel>
              <FormControl>
                <div className="relative h-12 bg-white rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <Input
                    placeholder="example@xyz.com"
                    className="h-full bg-transparent border-none text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 text-sm placeholder:text-gray-400"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-brand text-xs pl-1" />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-sm font-medium text-gray-700 mb-1.5 pl-1 block">Phone Number</FormLabel>
              <FormControl>
                <div className="relative h-12 bg-white rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <Input
                    placeholder="+1 (555) 000-0000"
                    className="h-full bg-transparent border-none text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 text-sm placeholder:text-gray-400"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-brand text-xs pl-1" />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-sm font-medium text-gray-700 mb-1.5 pl-1 block">Password</FormLabel>
              <FormControl>
                <div className="relative h-12 bg-white rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-full bg-transparent border-none text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 pl-4 pr-12 text-sm placeholder:text-gray-400"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-brand text-xs pl-1" />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel className="text-sm font-medium text-gray-700 mb-1.5 pl-1 block">Confirm password</FormLabel>
              <FormControl>
                <div className="relative h-12 bg-white rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-full bg-transparent border-none text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 pl-4 pr-12 text-sm placeholder:text-gray-400"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-brand text-xs pl-1" />
            </FormItem>
          )}
        />

        {/* Terms and Conditions Section */}
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <div
                className="flex justify-start items-center gap-3 py-1 group cursor-pointer"
                onClick={() => field.onChange(!field.value)}
              >
                <FormControl>
                  <div className="w-6 h-6 relative flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("transition-all duration-300", field.value ? "text-blue-500 scale-110" : "text-gray-300")}>
                      <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                      {field.value && (
                        <path d="M7.5 12L10.5 15L16.5 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      )}
                    </svg>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={field.value}
                      onChange={() => { }}
                    />
                  </div>
                </FormControl>
                <span className="text-gray-600 text-sm font-normal underline leading-5 hover:text-blue-500 transition-colors">
                  Terms and Conditions
                </span>
              </div>
              <FormMessage className="text-red-500 text-xs pl-2 pt-1" />
            </FormItem>
          )}
        />

        {/* Sign Up Button */}
        <Button
          type="submit"
          className="self-stretch h-12 bg-blue-500 hover:bg-blue-600 text-white text-base font-semibold rounded-xl shadow-lg shadow-blue-100 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-2"
        >
          Sign up
        </Button>

        {/* OR Divider */}
        <div className="self-stretch flex items-center gap-4 py-2">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">or</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={() => window.location.href = "http://206.162.244.134:8888/api/v1/auth/google"}
          className="self-stretch h-12 px-6 rounded-xl border border-gray-200 flex justify-center items-center gap-3 hover:bg-gray-50 transition-all text-gray-700 font-medium text-sm"
        >
          <div className="w-5 h-5">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          </div>
          Sign up with Google
        </button>

        {/* Footer */}
        <div className="text-center mt-2">
          <span className="text-gray-500 text-sm">Already have an account? </span>
          <Link href="/login">
            <span className="text-blue-500 font-semibold hover:underline">Log in</span>
          </Link>
        </div>
      </form>
    </Form>
  );
}
