import { Provider as JotaiProvider } from "jotai";
import type { Metadata } from "next";
import { Toaster } from "sonner";
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
        <JotaiProvider>
          {children}
          <Toaster />
        </JotaiProvider>
      </body>
    </html>
  );
};

export default Layout;