import { Layout, Drawer, Breadcrumb } from "antd";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "@/Components/Footer";
import { Icon } from "@iconify/react";

const { Content } = Layout;

const MainLayout = ({
    isMobile,
    isDrawerOpen,
    setIsDrawerOpen,
    isCollapsed,
    children,
}) => {
    const footerHeight = 70; // Match the footer height in pixels

    return (
        <Layout
            style={{
                minHeight: "100vh",
                height: "100vh",
                position: "fixed",
                width: "100%",
                top: 0,
                left: 0,
            }}
        >
            {isMobile ? (
                <Drawer
                    placement="left"
                    open={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    width={180}
                    maskClosable={true}
                    closeIcon={<Icon icon="material-symbols:close" />}
                    bodyStyle={{ padding: 0 }}
                >
                    <Sidebar collapsed={false} isMobile={true} />
                </Drawer>
            ) : (
                <Sidebar collapsed={isCollapsed} isMobile={false} />
            )}

            <Layout>
                <Header />
                <Content
                    style={{
                        padding: isMobile ? 12 : 24,
                        transition: "all 0.2s",
                        overflow: "auto",
                        height: `calc(100% - ${footerHeight}px)`,
                    }}
                >
                    {children}
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
};

export default MainLayout;
