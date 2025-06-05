import clsx from "clsx";
type ActionBtnProps = {
  title: string;
  icon: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};
export const ActionBtn = ({
  title,
  icon,
  onClick,
  className,
  disabled = false,
}: ActionBtnProps) => {
  return (
    <div className="sm:tooltip sm:tooltip-bottom" data-tip={title}>
      <button
        disabled={disabled}
        onClick={onClick}
        className="btn btn-ghost btn-circle disabled:opacity-50"
      >
        <span
          className={clsx(
            icon,
            className,
            "w-6 h-6 text-secondary dark:text-base-content "
          )}
        />
      </button>
    </div>
  );
};
