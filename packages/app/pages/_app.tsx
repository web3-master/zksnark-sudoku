import "../styles/globals.css";
import "antd/dist/reset.css";
import type { AppProps } from "next/app";
import { ConfigProvider, theme } from "antd";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        // algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#00b96b",
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
