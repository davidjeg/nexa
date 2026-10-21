import Link from "next/link";
interface Props {
  tabs: Array<{
    label: string;
  }>;
}
const Tabs = ({ tabs }: Props) => {
  return (
    <nav className="flex">
      {tabs.map((item) => (
        <Link
          className="py-4 flex-1 hover:bg-zinc-900 text-center hover:text-zinc-200 transition-all"
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
