import type { ReactNode } from "react";

type Props = {
  tone?: "neutral" | "success" | "warning";
  children: ReactNode;
};

const tones = {
  neutral: "bg-gray-100 text-gray-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-800",
};

export function Badge({ tone = "neutral", children }: Props) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}