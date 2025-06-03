import SidebarSection from "./sidebar-section";
import { SidebarDetils } from "./sidebar-details";
import { SIDEBAR_SECTIONS } from "@/utils/const";
type SidebarProps = {
  section?: string;
};
export const Sidebar = ({ section }: SidebarProps) => {
  return (
    <aside className="py-6 px-5 text-base-content bg-base-200 max-w-max min-w-max hidden lg:flex flex-col gap-6 w-full h-[calc(100vh-80px)] overflow-y-auto ">
      {section ? (
        <SidebarDetils section={section} />
      ) : (
        SIDEBAR_SECTIONS.map((section, index) => (
          <SidebarSection key={index} {...section} />
        ))
      )}
    </aside>
  );
};
