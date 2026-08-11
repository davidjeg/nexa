interface Props {
  label?: string;
  icon: React.ElementType;
  onClick: () => Promise<void>;
  active?: boolean;
  count?: number;
}
const PostActionButton = ({
  label,
  icon: Icon,
  onClick,
  active,
  count,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer group   rounded-full flex items-center text-zinc-600"
    >
      <div
        className="p-2 flex items-center justify-center rounded-full
            transition group-hover:text-zinc-200 group-hover:bg-zinc-900 "
      >
        <Icon
          className={active ? "text-red-500" : "text-zinc-600"}
          size={20}
          fill={active ? "currentColor" : "none"}
        />
      </div>

      {count !== undefined && (
        <span className="text-sm -ml-1 group-hover:text-zinc-200 transition">
          {count}
        </span>
      )}
    </button>
  );
};

export default PostActionButton;
