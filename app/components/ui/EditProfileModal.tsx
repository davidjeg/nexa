import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { getCurrentUser } from "@/app/lib/auth/getCurrentUser";
import EditProfileForm from "./EditProfileForm";
const EditProfileModal = async () => {
  const { user, supabase } = await getCurrentUser();
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  if (error) throw new Error("No se pudo obtener el perfil");

  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant={"default"}>Edit Profile</Button>}
      />
      <DialogContent>
        <EditProfileForm profile={profile} />
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
