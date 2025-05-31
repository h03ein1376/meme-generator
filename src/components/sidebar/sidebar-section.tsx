import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SidebarSectionSkeleton } from "./sidebar-section-skeleton";
import { SidebarSectionProvider } from "@/contaxts/sidebar-item-provider";
import { SidebarImageList } from "./sidebar-image-list";
import { StickerType, TemplateType } from "@/hooks/use-memes";
import { Error } from "../error";
import { SidebarSectionWrapper } from "./sidebar-section-wrapper";
import { SidebrSectionType } from "@/types/sidebar-section";

export default function SidebarSection(props: SidebrSectionType) {
  return (
    <SidebarSectionProvider value={props}>
      <ErrorBoundary
        fallback={
          <SidebarSectionWrapper disabled={true}>
            <Error className="col-start-1 col-end-3 row-start-1 row-end-4 xl:col-start-1 xl:col-end-4 xl:row-start-1 xl:row-end-3" />
          </SidebarSectionWrapper>
        }
      >
        <Suspense
          fallback={
            <SidebarSectionWrapper disabled={true}>
              <SidebarSectionSkeleton />
            </SidebarSectionWrapper>
          }
        >
          <SidebarSectionWrapper>
            <SidebarImageList />
          </SidebarSectionWrapper>
        </Suspense>
      </ErrorBoundary>
    </SidebarSectionProvider>
  );
}
