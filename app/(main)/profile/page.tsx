import { MapPin, CalendarDays } from "lucide-react";
import EditProfileModal from "@/app/components/ui/EditProfileModal";
import { getProfile } from "../../actions/profile";
import Tabs from "../../components/ui/Tabs";
import ChangeBanner from "@/app/components/profile/ChangeBanner";
import ChangeProfileImg from "@/app/components/profile/ChangeProfileImg";
const profileTabs = [
  { label: "Posts" },
  { label: "Replies" },
  { label: "Likes" },
  { label: "Media" },
];
const Profile = async () => {
  const profile = await getProfile();
  return (
    <div className="border border-gray-500">
      <header className="h-52 relative">
        <div
          className="h-52 bg-cover bg-center"
          style={{
            backgroundImage: profile.banner
              ? `url(${profile.banner})`
              : undefined,
          }}
        ></div>
        <div className="absolute bottom-0 left-6 translate-y-1/2">
          <ChangeProfileImg />
          <ChangeBanner />
        </div>
      </header>
      <div className="flex justify-end h-20">
        <EditProfileModal />
      </div>

      <article className=" px-4">
        <div className="mb-3">
          <h1 className="text-xl font-bold leading-6">{profile.username}</h1>
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
      </article>
      <Tabs tabs={profileTabs} />
    </div>
  );
};

export default Profile;
