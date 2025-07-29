import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { Tables } from "@/database.types";
import ProfileForm from "@/components/profile/profile-form";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/login");
  }

  // Get user profile from database
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  console.log({ profile, profileError });
  const profileData = (profile || {
    first_name: user.user_metadata?.full_name?.split(" ")[0] || "",
    last_name: user.user_metadata?.full_name?.split(" ")[1] || "",
    phone_number: "",
    city: "",
    pincode: "",
    id: user.id,
  }) as Tables<"profiles">;

  const signOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={user.user_metadata?.avatar_url || "/placeholder.svg"}
                />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">Welcome back!</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </div>
            <form action={signOut}>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </CardHeader>
        </Card>

        {/* Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal information. Changes are processed through
              Temporal workflows.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm initialData={profileData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
