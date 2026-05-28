import "katex/dist/katex.min.css";
import "@/styles/blog.css";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
