import "../styles/globals.css";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import { ConfigProvider, theme } from "antd";
import { purple } from "@ant-design/colors";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: purple.primary,
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
