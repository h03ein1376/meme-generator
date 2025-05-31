"use client";

import clsx from "clsx";
import { useErrorBoundary } from "react-error-boundary";

type ErrorPropsType = {
  className?: string;
};

export const Error = ({ className }: ErrorPropsType) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center p-4 text-center ",
        className
      )}
    >
      <p>Error in get data</p>
      <button className="btn btn-error mt-2" onClick={resetBoundary}>
        Retry
      </button>
    </div>
  );
};
