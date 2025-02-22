import type { Metadata } from "next";
import "./globals.css";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Comicopy",
  description: "第三方拷贝漫画",
};

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <html lang="zh">
      <body>
        {children}
      </body>
    </html>
  );
};

export default Layout;