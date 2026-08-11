import { MapPin, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProfile } from "../actions/profile";
import Tabs from "../components/ui/Tabs";
const Profile = async () => {
  const profile = await getProfile();
  return (
    <div>
      <header className="bg-blue-200 h-52 relative">
        <div className="absolute bottom-0 left-6 translate-y-1/2">
          <div className="rounded-full h-32 w-32 bg-orange-200"></div>
        </div>
      </header>
      <div className="flex justify-end h-20">
        <Button>Edit Profile</Button>
      </div>
      <article>
        <div className="mb-3">
          <h1 className="text-xl font-bold leading-6">DearDavid</h1>
          <p className="leading-5 text-sm">@deardavidg</p>
        </div>
        <div className="flex gap-4 mb-2">
          <div className="flex items-center gap-1">
            <MapPin size="20" />
            <p>County</p>
          </div>
          <div className="flex gap-1 items-center">
            <CalendarDays size="20" />

            <p>Joined june 2024</p>
          </div>
        </div>

        <div className="flex gap-4 mb-2">
          <a>
            <strong>0</strong> Following
          </a>
          <a>
            <strong>9</strong> Followers
          </a>
        </div>
        <Tabs />
      </article>
    </div>
  );
};

export default Profile;
