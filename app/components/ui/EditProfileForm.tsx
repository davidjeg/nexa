"use client";

import { useState } from "react";
import ChangeBanner from "../profile/ChangeBanner";
import { updateProfile } from "@/app/actions/profile";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FieldGroup, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  profile: {
    username: string | null;
    bio: string | null;
    location: string | null;
    website: string | null;
    banner: string | null;
  };
}

export default function EditProfileForm({ profile }: Props) {
  const [username, setUsername] = useState(profile.username ?? "");
  const [bio, setBio] = useState(profile.bio ?? "");
  const [location, setLocation] = useState(profile.location ?? "");
  const [website, setWebsite] = useState(profile.website ?? "");

  return (
    <form action={updateProfile}>
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <ChangeBanner bannerDb={profile.banner} />
      </DialogHeader>

      <FieldGroup>
        <Field>
          <Label htmlFor="username">Name</Label>
          <Input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Field>

        <Field>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="resize-none"
            placeholder="Bio"
          />
        </Field>

        <Field>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Field>

        <Field>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </Field>
      </FieldGroup>

      <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );
}
