import type { ReactNode } from "react";
import "@/styles/story.css";

type AboutLayoutProps = {
  children: ReactNode;
};

export default function AboutLayout({ children }: AboutLayoutProps) {
  return children;
}
