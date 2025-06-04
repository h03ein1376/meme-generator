import clsx from "clsx";
type ActionBtnPropsType = {
  icon: string;
};
export const ActionBtn = ({ icon }: ActionBtnPropsType) => {
  return (
    <button className="btn btn-ghost btn-circle">
      <span
        className={clsx(icon, "w-6 h-6 text-secondary dark:text-base-content")}
      />
    </button>
  );
};
