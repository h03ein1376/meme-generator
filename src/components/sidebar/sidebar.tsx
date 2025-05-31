import SidebarSection from "./sidebar-section";
import { END_POINTS } from "@/utils/end-points";

export const Sidebar = () => {
  return (
    <aside className="py-6 px-5 text-base-content bg-base-200  max-w-max h-[calc(100vh-80px)] overflow-y-auto flex flex-col gap-6 ">
      <SidebarSection type="template" url={END_POINTS.MEMES} title="memes" />
      <SidebarSection
        type="template"
        url={END_POINTS.BANNERS}
        title="banners"
      />
      <SidebarSection
        type="template"
        url={END_POINTS.WALLPAPERS}
        title="wallpapers"
      />
      <SidebarSection type="sticker" url={END_POINTS.SPARKY} title="sparky" />
      <SidebarSection type="sticker" url={END_POINTS.VOID} title="void" />
      <SidebarSection type="sticker" url={END_POINTS.TRUMP} title="trump" />
      <SidebarSection
        type="sticker"
        url={END_POINTS.BILLY_CAT}
        title="billy cat"
      />
    </aside>
  );
};
