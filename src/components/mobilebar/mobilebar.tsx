import { SIDEBAR_SECTIONS } from "@/utils/const";
import Link from "next/link";
import MobilebarBottomSheet from "./mobilebar-bottom-sheet";

type MobilebarProps = {
  section?: string;
};
export const Mobilebar = ({ section }: MobilebarProps) => {
  return (
    <div className="fixed lg:hidden bottom-0 w-full z-30 flex flex-col ">
      {section && <MobilebarBottomSheet key={section} section={section} />}

      <div className="collapse  rounded-none bg-[#DFDEDF] dark:bg-[#c3c1c85e]">
        <input
          defaultChecked={!!section}
          type="checkbox"
          className="peer !p-0"
        />

        <div className="collapse-title flex flex-col items-center justify-center p-0 peer-checked:rotate-180 transition-all duration-500">
          <span className="collapse-arrow icon-[iconoir--nav-arrow-up] h-6 w-6 text-secondary dark:text-base-content" />
        </div>
        <div className="collapse-content bg-base-100 dark:bg-base-200 flex items-center justify-between sm:justify-center gap-1 overflow-x-auto peer-checked:!p-6 z-50 ">
          {SIDEBAR_SECTIONS.map((section, index) => (
            <Link
              href={`?section=${section.title}`}
              className="btn min-w-fit uppercase font-medium text-sm rounded-lg"
              key={index}
            >
              {section.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
