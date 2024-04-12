import SignInButton from "@/components/ui/SignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();

  if (session?.user) {
    return redirect("/dashboard");
  } else {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Card className="w-[300px">
          <CardHeader>
            <CardTitle>Welcome To CramKit</CardTitle>
            <CardDescription>
              CramKit is a flashcard app that helps you study and learn more
              effectively.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInButton text="Sign in with Google" />
          </CardContent>
        </Card>
      </div>
    );
  }
}
