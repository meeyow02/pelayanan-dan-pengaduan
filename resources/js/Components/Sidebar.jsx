import { Flex, Image, Layout, Menu, Typography } from "antd";
import { Link, usePage } from "@inertiajs/react";
import pallete from "../utils/pallete";
import PropTypes from "prop-types";
import useSidebarStore from "../store/sidebarStore";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

function Sidebar({ collapsed, isMobile = false }) {
    const { url } = usePage();
    const { setIsDrawerOpen } = useSidebarStore();
    const [openKeys, setOpenKeys] = useState([]);

    const dentalTreatmentChildKeys = [];
    const historyChildKeys = [];

    const handleLinkClick = () => {
        if (isMobile) {
            setIsDrawerOpen(false);
        }
    };

    const getSelectedKeys = () => {
        const pathname = url;

        if (pathname.startsWith("/dental-treatment/fkrtl")) return ["fkrtl"];

        switch (true) {
            case pathname === "/":
                return ["dashboard"];
            case pathname === "/pengaduan":
                return ["pengaduan"];
            case pathname === "/pengaduan/buat_aduan":
                return ["pengaduan"];
            case pathname === "/pengaduan/detail_aduan":
                return ["pengaduan"];
            case pathname === "/pelayanan":
                return ["pelayanan"];
            case pathname === "/pelayanan/buat_permohonan_layanan":
                return ["pelayanan"];
            case pathname === "/pelayanan/detail_permohonan_layanan":
                return ["pelayanan"];
            default:
                return [];
        }
    };

    const selectedKeys = getSelectedKeys();

    useEffect(() => {
        if (!collapsed) {
            const determineOpenKeys = () => {
                const keys = [];
                if (
                    selectedKeys.some((key) =>
                        dentalTreatmentChildKeys.includes(key)
                    )
                ) {
                    keys.push("dental-treatment");
                } else if (
                    selectedKeys.some((key) => historyChildKeys.includes(key))
                ) {
                    keys.push("history");
                }
                return keys;
            };

            setOpenKeys(determineOpenKeys());
        }
    }, [url, collapsed]);

    const onOpenChange = (keys) => {
        setOpenKeys(keys);
    };

    const defaultIconColor = "#919EAB";
    const primaryColor = pallete.primary[500];

    const isParentActive = (parentKey, childKeys) => {
        if (selectedKeys.includes(parentKey)) return true;
        return childKeys.some((key) => selectedKeys.includes(key));
    };

    const getDotIcon = (parentKey, itemKey) => {
        const isParentSelected = selectedKeys.includes(parentKey);
        const isItemSelected = selectedKeys.includes(itemKey);
        const color =
            isItemSelected || (isParentSelected && itemKey === selectedKeys[0])
                ? primaryColor
                : defaultIconColor;

        return (
            <Icon
                icon="material-symbols:circle"
                style={{
                    fontSize: "8px",
                    color,
                    marginBottom: collapsed ? 3 : -1,
                    marginLeft: collapsed ? -3 : -8,
                    marginRight: 0,
                }}
            />
        );
    };

    const renderContent = () => (
        <>
            <Flex
                justify="center"
                align="center"
                style={{ height: 32, marginBottom: 16 }}
            >
                <Typography.Text>SiDUKMA</Typography.Text>
            </Flex>
            <Menu
                items={[
                    {
                        key: "dashboard",
                        icon: isParentActive("dashboard", []) ? (
                            <Icon
                                icon="material-symbols:dashboard"
                                className="scale-110"
                            />
                        ) : (
                            <Icon
                                color={defaultIconColor}
                                icon="material-symbols:dashboard"
                                className="scale-110"
                            />
                        ),
                        label: (
                            <Link href="/" onClick={handleLinkClick}>
                                Dashboard
                            </Link>
                        ),
                    },
                    {
                        key: "pengaduan",
                        icon: isParentActive("pengaduan", []) ? (
                            <Icon
                                icon="material-symbols:note-stack-sharp"
                                className="scale-110"
                            />
                        ) : (
                            <Icon
                                color={defaultIconColor}
                                icon="material-symbols:note-stack-sharp"
                                className="scale-110"
                            />
                        ),
                        label: (
                            <Link href="/pengaduan" onClick={handleLinkClick}>
                                Pengaduan
                            </Link>
                        ),
                    },
                    {
                        key: "pelayanan",
                        icon: isParentActive("pelayanan", []) ? (
                            <Icon
                                icon="material-symbols:folder-open"
                                className="scale-110"
                            />
                        ) : (
                            <Icon
                                color={defaultIconColor}
                                icon="material-symbols:folder-open"
                                className="scale-110"
                            />
                        ),
                        label: (
                            <Link href="/pelayanan" onClick={handleLinkClick}>
                                Pelayanan
                            </Link>
                        ),
                    },
                ]}
                style={{ borderRight: "none" }}
                selectedKeys={selectedKeys}
                mode="inline"
                inlineCollapsed={collapsed}
                openKeys={collapsed ? undefined : openKeys}
                onOpenChange={onOpenChange}
            />
        </>
    );

    return isMobile ? (
        <div
            style={{
                paddingTop: 12,
                paddingLeft: 4,
                paddingRight: 4,
                height: "100%",
                overflowY: "auto",
            }}
        >
            {renderContent()}
        </div>
    ) : (
        <Layout.Sider
            collapsed={collapsed}
            collapsible
            trigger={null}
            style={{
                paddingTop: 12,
                paddingLeft: 8,
                paddingRight: 8,
                transition: "all 0.2s",
                height: "100vh",
                position: "sticky",
                top: 0,
                left: 0,
            }}
        >
            {renderContent()}
        </Layout.Sider>
    );
}

Sidebar.propTypes = {
    collapsed: PropTypes.bool,
    isMobile: PropTypes.bool,
};

export default Sidebar;
