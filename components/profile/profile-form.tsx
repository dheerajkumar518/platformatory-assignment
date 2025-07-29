"use client";

import type React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tables } from "@/database.types";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

interface ProfileFormProps {
  initialData: Tables<"profiles">;
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<Tables<"profiles">>({
    defaultValues: initialData,
  });

  const notBlank = (value: string | null) =>
    value && value.trim().length > 0
      ? true
      : "This field cannot be blank or spaces only";

  const onSubmit = async (data: Tables<"profiles">) => {
    try {
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, id: initialData.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast("Profile updated successfully:", {
        description: "Your profile has been updated.",
        style: {
          backgroundColor: "green",
        },
      });
    } catch (error) {
      toast("Error updating profile:", {
        description:
          (error as Error).message || "An unexpected error occurred.",
        style: {
          backgroundColor: "red",
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="first_name">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="first_name"
            control={control}
            rules={{
              required: "First name is required",
              validate: notBlank,
            }}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value || ""}
                id="first_name"
                placeholder="Enter your first name"
                required
              />
            )}
          />
          {errors.first_name && (
            <span className="text-red-500 text-sm">
              {errors.first_name.message as string}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">
            Last Name <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="last_name"
            control={control}
            rules={{
              required: "Last name is required",
              validate: notBlank,
            }}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value || ""}
                id="last_name"
                placeholder="Enter your last name"
                required
              />
            )}
          />
          {errors.last_name && (
            <span className="text-red-500 text-sm">
              {errors.last_name.message as string}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone_number">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="phone_number"
            control={control}
            rules={{
              required: "Phone number is required",
              validate: notBlank,
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Enter a valid phone number",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value || ""}
                id="phone_number"
                placeholder="Enter your phone number"
                type="tel"
              />
            )}
          />
          {errors.phone_number && (
            <span className="text-red-500 text-sm">
              {errors.phone_number.message as string}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">
            City <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="city"
            control={control}
            rules={{
              required: "City is required",
              validate: notBlank,
            }}
            render={({ field }) => (
              <Input
                {...field}
                id="city"
                placeholder="Enter your city"
                value={field.value ?? ""}
              />
            )}
          />
          {errors.city && (
            <span className="text-red-500 text-sm">
              {errors.city.message as string}
            </span>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="pincode">
            Pincode <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="pincode"
            control={control}
            rules={{
              required: "Pincode is required",
              validate: notBlank,
              pattern: {
                value: /^[0-9]{4,10}$/,
                message: "Enter a valid pincode",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value ?? ""}
                id="pincode"
                placeholder="Enter your pincode"
                className="max-w-xs"
              />
            )}
          />
          {errors.pincode && (
            <span className="text-red-500 text-sm">
              {errors.pincode.message as string}
            </span>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating Profile...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Update Profile
          </>
        )}
      </Button>
    </form>
  );
}
