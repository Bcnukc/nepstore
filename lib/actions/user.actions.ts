"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signIn, signOut } from "@/auth";
import { signInFormSchema, signUpFromSchema } from "../validator";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "../prisma";
import { formatError } from "../utils";

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

export async function signUp(prevState: unknown, formData: FormData) {
  try {
    //1. Validate the form data
    const user = signUpFromSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    //2.Hash the password
    const plainPassword = user.password;
    const hashedPassword = hashSync(plainPassword, 10);

    //3. create user in the database

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    //4.Sign in the new user
    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
      redirectTo: "/", //Redirect to home page after sign in
    });

    //This part might not be reached due to redirect,but is good for non-redirect cases

    return { success: true, message: "User created successfully" };
  } catch (error) {
    //Handle specific redirect errors from Next.js
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: formatError(error),
    };
  }
}
