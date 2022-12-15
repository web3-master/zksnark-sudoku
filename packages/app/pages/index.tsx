import { Inter } from "@next/font/google";
import { Col, Row } from "antd";
import Head from "next/head";
import PlayPannel from "../src/components/PlayPannel";
import VerifyPannel from "../src/components/VerifyPannel";
import { APP_DESCRIPTION, APP_NAME } from "../src/Constants";
import AppLayout from "../src/layout/AppLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <Row style={{ padding: 50 }} gutter={50}>
          <Col span={12}>
            <PlayPannel />
          </Col>
          <Col span={12}>
            <VerifyPannel />
          </Col>
        </Row>
      </AppLayout>
    </>
  );
}
