import Link from "next/link";

const profileItems = [
  { label: "Posts" },
  { label: "Replies" },
  { label: "Highlights" },
  { label: "Media" },
  { label: "Likes" },
];
interface Props {
  items: [];
}
const Tabs = () => {
  return (
    <nav className="flex">
      {profileItems.map((item) => (
        <Link
          className="py-4 flex-1 hover:bg-orange-200 text-center"
          key={item.label}
          href={""}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Tabs;
