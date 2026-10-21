import Tabs from "@/app/components/ui/Tabs";
const exploreTabs = [{ label: "For your" }, { label: "Trending" }];

const page = () => {
  return (
    <div>
      <Tabs tabs={exploreTabs} />
    </div>
  );
};

export default page;
