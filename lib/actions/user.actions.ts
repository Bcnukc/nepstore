"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signIn, signOut } from "@/auth";
import { signInFormSchema } from "../validator";

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    //!. Validate input
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    //@. Call NextAuth signIn
    await signIn("credentials", user);

    //3. Return Success
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    //Let Next.js handle any internal redirect fro NextAuth
    if (isRedirectError(error)) throw error;

    //Otherwise return failure message

    return { success: false, message: "Invalid email or password" };
  }
}
//Sign the user out
export async function signOutUsers() {
  await signOut();
}
