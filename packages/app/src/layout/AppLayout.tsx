import { purple } from "@ant-design/colors";
import {
  GithubOutlined,
  GoogleOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { Col, Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { ReactNode } from "react";
import { APP_NAME, GITHUB, GMAIL, LINKEDIN } from "../Constants";
import logo from "../images/sudoku.png";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Row>
      <Col span={24}>
        <Layout style={{ minHeight: "100vh" }}>
          <Header
            style={{
              position: "fixed",
              zIndex: 1,
              width: "100%",
              background: purple.primary,
            }}
          >
            <Row align="stretch" gutter={20}>
              <Col>
                <img src={logo.src} width={40} height={40} alt="logo" />
              </Col>
              <Col>
                <h1 style={{ color: "white" }}>{APP_NAME}</h1>
              </Col>
            </Row>
          </Header>
          <Content style={{ marginTop: 60 }}>{children}</Content>
          <Footer
            style={{
              position: "sticky",
              bottom: 0,
              textAlign: "center",
            }}
          >
            © 2022 All rights reserved by Web3-Master.
            <a href={GMAIL} rel="noopener noreferrer">
              <GoogleOutlined style={{ fontSize: 16, marginLeft: 20 }} />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined style={{ fontSize: 16, marginLeft: 10 }} />
            </a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">
              <GithubOutlined style={{ fontSize: 16, marginLeft: 10 }} />
            </a>
          </Footer>
        </Layout>
      </Col>
    </Row>
  );
}
