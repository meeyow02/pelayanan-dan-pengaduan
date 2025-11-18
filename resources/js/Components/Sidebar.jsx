import { Col, Divider, Flex, Image, Layout, Menu, Typography } from "antd";
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
    const { auth } = usePage().props;

    const masterDataChildKeys = [
        "master_data_complaint",
        "master_data_service",
    ];

    const handleLinkClick = () => {
        if (isMobile) {
            setIsDrawerOpen(false);
        }
    };

    const getSelectedKeys = () => {
        const pathname = url;

        if (pathname.startsWith("/dental-treatment/fkrtl")) return ["fkrtl"];
        if (pathname.startsWith("/pengaduan")) return ["pengaduan"];
        if (pathname.startsWith("/pelayanan")) return ["pelayanan"];
        if (pathname.startsWith("/daftar_user")) return ["daftar_user"];
        if (pathname.startsWith("/master_data/kategori_aduan"))
            return ["master_data_complaint"];
        if (pathname.startsWith("/master_data/kategori_pelayanan"))
            return ["master_data_service"];

        switch (true) {
            case pathname === "/":
                return ["dashboard"];
            case pathname.startsWith("/master_data"):
                return ["master_data"];
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
                        masterDataChildKeys.includes(key)
                    )
                ) {
                    keys.push("master_data");
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
                style={{
                    height: 32,
                    marginBottom: collapsed ? "1rem" : "2rem",
                }}
            >
                <Link href="/">
                    <Col span={24}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "1.5rem",
                            }}
                        >
                            <Image
                                alt="Si Cerdas Gantarang"
                                src="/logo si cerdas gantarang.png"
                                width={collapsed ? 30 : 40}
                                preview={false}
                            />
                        </div>
                    </Col>
                    {!collapsed && (
                        <Typography.Text
                            style={{
                                color: "#E9961C",
                                fontSize: ".7rem",
                                textAlign: "center",
                                display: "block",
                                fontWeight: "bold",
                            }}
                        >
                            Si Cerdas Gantarang
                        </Typography.Text>
                    )}
                </Link>
            </Flex>
            <Divider
                style={{
                    marginBottom: ".5rem",
                    borderTop: ".1rem solid #DFE3E8",
                }}
            />

            {auth.user.role == "admin" ? (
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
                                <Link
                                    href="/pengaduan"
                                    onClick={handleLinkClick}
                                >
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
                                <Link
                                    href="/pelayanan"
                                    onClick={handleLinkClick}
                                >
                                    Pelayanan
                                </Link>
                            ),
                        },
                        {
                            key: "daftar_user",
                            icon: isParentActive("daftar_user", []) ? (
                                <Icon
                                    icon="material-symbols:person-add-rounded"
                                    className="scale-110"
                                />
                            ) : (
                                <Icon
                                    color={defaultIconColor}
                                    icon="material-symbols:person-add-rounded"
                                    className="scale-110"
                                />
                            ),
                            label: (
                                <Link
                                    href="/daftar_user"
                                    onClick={handleLinkClick}
                                >
                                    Daftar User
                                </Link>
                            ),
                        },
                        {
                            key: "master_data",
                            icon: isParentActive("master_data", []) ? (
                                <Icon
                                    icon="material-symbols:database"
                                    className="scale-110"
                                />
                            ) : (
                                <Icon
                                    color={defaultIconColor}
                                    icon="material-symbols:database"
                                    className="scale-110"
                                />
                            ),
                            label: "Master Data",
                            children: [
                                {
                                    key: "master_data_complaint",
                                    style: { paddingLeft: 32 },
                                    icon: getDotIcon(
                                        "master_data",
                                        "master_data_complaint"
                                    ),
                                    label: (
                                        <Link
                                            href="/master_data/kategori_aduan"
                                            onClick={handleLinkClick}
                                        >
                                            Kategori Aduan
                                        </Link>
                                    ),
                                },
                                {
                                    key: "master_data_service",
                                    style: { paddingLeft: 32 },
                                    icon: getDotIcon(
                                        "master_data",
                                        "master_data_service"
                                    ),
                                    label: (
                                        <Link
                                            href="/master_data/kategori_pelayanan"
                                            onClick={handleLinkClick}
                                        >
                                            Kategori Pelayanan
                                        </Link>
                                    ),
                                },
                            ],
                        },
                    ]}
                    style={{ borderRight: "none" }}
                    selectedKeys={selectedKeys}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    openKeys={collapsed ? undefined : openKeys}
                    onOpenChange={onOpenChange}
                />
            ) : (
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
                                <Link
                                    href="/pengaduan"
                                    onClick={handleLinkClick}
                                >
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
                                <Link
                                    href="/pelayanan"
                                    onClick={handleLinkClick}
                                >
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
            )}
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
