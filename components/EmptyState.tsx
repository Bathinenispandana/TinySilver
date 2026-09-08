import Link from "next/link";
import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      {icon && (
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#c5c6cc]/30 text-[#827e9c]">
          {icon}
        </div>
      )}
      <h3 className="text-lg sm:text-xl font-semibold text-[#0f172a]">
        {title}
      </h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-[#827e9c]">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#0f172a] text-white text-sm font-medium px-6 py-3 hover:bg-[#827e9c] transition-all duration-300"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
