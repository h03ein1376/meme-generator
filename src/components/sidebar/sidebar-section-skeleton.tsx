type SidebarSectionSkeletonProps = {
  itemsCount?: number;
};

export const SidebarSectionSkeleton = ({
  itemsCount = 6,
}: SidebarSectionSkeletonProps) => {
  return Array.from({ length: itemsCount }).map((_, index) => (
    <span key={index} className="skeleton rounded-lg w-full h-full" />
  ));
};
