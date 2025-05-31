import { SidebarSectionProvider } from "@/contaxts/sidebar-item-provider";
import { SIDEBAR_SECTIONS } from "@/utils/const";
import Link from "next/link";
import { ErrorBoundary } from "react-error-boundary";
import { SidebarSectionWrapper } from "./sidebar-section-wrapper";
import { Suspense } from "react";
import { SidebarSectionSkeleton } from "./sidebar-section-skeleton";
import { SidebarImageList } from "./sidebar-image-list";
import { Error } from "../error";
import { redirect } from "next/navigation";

type SidebarDetailsProps = {
  section: string;
};

export const SidebarDetils = ({
  section: sectionTitle,
}: SidebarDetailsProps) => {
  const section = SIDEBAR_SECTIONS.find(
    (section) => section.title === sectionTitle
  );

  if (!section) redirect("/");
  return (
    <>
      <Link
        href="/"
        className="flex justify-start items-center gap-2 cursor-pointer "
      >
        <span className="icon-[iconoir--arrow-left]" />
        <h4 className="uppercase font-medium">{section?.title}</h4>
      </Link>
      <div className="grid grid-cols-[186px_186px] auto-rows-[123px] gap-4">
        <SidebarSectionProvider value={section}>
          <ErrorBoundary
            fallback={
              <div className="flex items-center justify-center col-span-2 row-span-2">
                <Error />
              </div>
            }
          >
            <Suspense fallback={<SidebarSectionSkeleton itemsCount={10} />}>
              <SidebarImageList isHome={false} />
            </Suspense>
          </ErrorBoundary>
        </SidebarSectionProvider>
      </div>
    </>
  );
};
