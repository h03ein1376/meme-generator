import { SidebarSectionProvider } from "@/contaxts/sidebar-section-provider";
import { SIDEBAR_SECTIONS } from "@/utils/const";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Error } from "../error";
import { SidebarSectionSkeleton } from "../sidebar/sidebar-section-skeleton";
import { SidebarImageList } from "../sidebar/sidebar-image-list";

type MobilebarBottomSheetProps = {
  section?: string;
};

export default function MobilebarBottomSheet({
  section: sectionTitle,
}: MobilebarBottomSheetProps) {
  const section = SIDEBAR_SECTIONS.find(
    (section) => section.title === sectionTitle
  );

  if (!section) redirect("/");

  return (
    <>
      <Link href={"/"} className="fixed inset-0 bottom-[88px] z-40" />

      <div className={`fixed bottom-[88px] left-0 right-0 z-50 overflow-clip`}>
        <div className="flex flex-col gap-4 bg-base-200 rounded-t-2xl p-6">
          <div className="flex justify-between items-center">
            <h4 className="uppercase font-medium">{section?.title}</h4>
            <Link href={"/"} className="text-gray-500 text-xl">
              ✕
            </Link>
          </div>
          <div className="grid h-full grid-cols-3 auto-rows-[123px] gap-4 overflow-y-auto max-h-[30vh]">
            <SidebarSectionProvider value={section}>
              <ErrorBoundary
                fallback={
                  <div className="flex items-center justify-center col-span-3 row-span-3">
                    <Error />
                  </div>
                }
              >
                <Suspense
                  key={section.title}
                  fallback={<SidebarSectionSkeleton itemsCount={9} />}
                >
                  <SidebarImageList isHome={false} />
                </Suspense>
              </ErrorBoundary>
            </SidebarSectionProvider>
          </div>
        </div>
      </div>
    </>
  );
}
