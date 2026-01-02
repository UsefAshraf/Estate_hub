// src/types/pages.ts
export type Page = "signup" | "signin" | "forgot" | "otp" | "renew" | "success";

export const PagePaths: Record<Page, string> = {
  signup: "/signup",
  signin: "/signin",
  forgot: "/forgot",
  otp: "/otp",
  renew: "/renew",
  success: "/success",
};
