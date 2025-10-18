import { Col, Divider, Dropdown, Flex, Image, Layout, Menu, Space, Typography } from "antd";
import { Link, usePage } from "@inertiajs/react";
import pallete from "../utils/pallete";
import PropTypes from "prop-types";
import useSidebarStore from "../store/sidebarStore";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { DownOutlined } from '@ant-design/icons';

function Sidebar({ collapsed, isMobile = false }) {
    const { url } = usePage();
    const { setIsDrawerOpen } = useSidebarStore();
    const [openKeys, setOpenKeys] = useState([]);
    const { auth } = usePage().props;

    const dentalTreatmentChildKeys = [];
    const historyChildKeys = [];
    const masterDataChildKeys = ["master_data_complaint", "master_data_service"];

    const handleLinkClick = () => {
        if (isMobile) {
            setIsDrawerOpen(false);
        }
    };

    const getSelectedKeys = () => {
        const pathname = url;

        if (pathname.startsWith("/dental-treatment/fkrtl")) return ["fkrtl"];
        if (pathname.startsWith("/pengaduan")) return ['pengaduan'];
        if (pathname.startsWith("/pelayanan")) return ['pelayanan'];
        if (pathname.startsWith("/master_data/kategori_aduan")) return ["master_data_complaint"];
        if (pathname.startsWith("/master_data/kategori_pelayanan")) return ["master_data_service"];

        switch (true) {
            case pathname === "/":
                return ["dashboard"];
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
                style={{ height: 32, marginBottom: collapsed ? "1rem" : "2rem" }}
            >
                <Link href="/" >
                    <Col span={24}>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>
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
                            style={{ color: "#E9961C", fontSize: ".7rem", textAlign: "center", display: "block", fontWeight: "bold" }}
                        >
                            Si Cerdas Gantarang
                        </Typography.Text>
                    )}
                </Link>
            </Flex>
            <Divider style={{ marginBottom: ".5rem", borderTop: ".1rem solid #DFE3E8" }}/> 

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
                        {
                            key: "master_data",
                            icon: isParentActive("master_data", []) ? (
                                <Icon icon="material-symbols:database" className="scale-110" />
                            ) : (
                                <Icon color={defaultIconColor} icon="material-symbols:database" className="scale-110" />
                            ),
                            label: "Master Data",
                            children: [
                                {
                                    key: "master_data_complaint",
                                    style: { paddingLeft: 16 },
                                    // icon: getDotIcon("master_data", "master_data_complaint"),
                                    label: (
                                        <Link href="/master_data/kategori_aduan" onClick={handleLinkClick}>
                                            Kategori Aduan
                                        </Link>
                                    ),
                                },
                                {
                                    key: "master_data_service",
                                    style: { paddingLeft: 16 },
                                    // icon: getDotIcon("master_data", "master_data_service"),
                                    label: (
                                        <Link href="/master_data/kategori_pelayanan" onClick={handleLinkClick}>
                                            Kategori Pelayanan
                                        </Link>
                                    ),
                                },
                            ],
                        },

                        
                        // {
                        //     key: "master_data",
                        //     icon: isParentActive("master_data", []) ? (
                        //         <Icon
                        //             icon="material-symbols:database"
                        //             className="scale-110"
                        //         />
                        //     ) : (
                        //         <Icon
                        //             color={defaultIconColor}
                        //             icon="material-symbols:database"
                        //             className="scale-110"
                        //         />
                        //     ),
                        //     label: (
                        //         <div style={{ position: "relative", width: "100%" }}>
                        //             <Dropdown
                        //                 menu={{ items: masterDataItems }}
                        //                 trigger={['click']}
                        //                 placement="bottomRight"
                        //             >
                        //                 <a
                        //                 onClick={(e) => e.preventDefault()}
                        //                 style={{
                        //                     display: "flex",
                        //                     justifyContent: "space-between",
                        //                     alignItems: "center",
                        //                     width: "100%",
                        //                 }}
                        //                 >
                        //                     <span>Master Data</span>
                        //                     <DownOutlined style={{ fontSize: 10 }} />
                        //                 </a>
                        //             </Dropdown>
                        //         </div>
                        //     ),
                        // },
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
