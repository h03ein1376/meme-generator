import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SidebarSectionSkeleton } from "./sidebar-section-skeleton";
import {
  SidebarSectionContextType,
  SidebarSectionProvider,
} from "@/contaxts/sidebar-item-provider";
import { SidebarImageList } from "./sidebar-image-list";
import { StickerType, TemplateType } from "@/hooks/use-memes";
import { Error } from "../error";
import { SidebarSectionWrapper } from "./sidebar-section-wrapper";

export default function SidebarSection(props: SidebarSectionContextType) {
  return (
    <SidebarSectionProvider value={props}>
      <ErrorBoundary
        fallback={
          <SidebarSectionWrapper disabled={true}>
            <Error className="col-start-1 col-end-4 row-start-1 row-end-3" />
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
          <SidebarImageList />
        </Suspense>
      </ErrorBoundary>
    </SidebarSectionProvider>
  );
}
