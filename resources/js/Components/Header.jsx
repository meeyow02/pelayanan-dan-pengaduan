import { Avatar, Button, Dropdown, Flex, Layout, Typography } from "antd";
import pallete from "../utils/pallete";
import { Icon } from "@iconify/react";
import useTitleStore from "../store/titleStore";
import { useResponsive } from "../hooks/useResponsive";
import useSidebarStore from "../store/sidebarStore";
import { router, usePage } from "@inertiajs/react";

export default function Header() {
    // const user = usePage().props.auth.user;
    const { title } = useTitleStore();
    const { isMobile } = useResponsive();
    const { toggleDrawer, toggleCollapsed, isCollapsed } = useSidebarStore();
    const maleAvatar = "/man.png";
    const femaleAvatar = "/woman.png";

    const handleLogout = () => {
        router.post(route("logout"));
    };

    const menuItems = [
        // ...(user.role === "admin"
        //     ? [
        //           {
        //               key: "users",
        //               label: "Kelola User",
        //               icon: (
        //                   <Icon
        //                       icon="material-symbols:group"
        //                       style={{
        //                           color: pallete.grey[600],
        //                           width: 14,
        //                           height: 14,
        //                       }}
        //                   />
        //               ),
        //               onClick: () => {
        //                   router.visit("/kelola-user");
        //               },
        //           },
        //           { type: "divider" },
        //           {
        //               key: "health_facilities",
        //               label: "Fasilitas Kesehatan",
        //               icon: (
        //                   <Icon
        //                       icon="material-symbols:home-health"
        //                       style={{
        //                           color: pallete.grey[600],
        //                           width: 14,
        //                           height: 14,
        //                       }}
        //                   />
        //               ),
        //               onClick: () => {
        //                   router.visit("/kelola-faskes");
        //               },
        //           },
        //           { type: "divider" },
        //       ]
        //     : []),
        // {
        //     key: "change-password",
        //     label: "Ubah Password",
        //     icon: <Icon icon="material-symbols:key" width="14" height="14" />,
        //     onClick: () => {
        //         router.visit("/ubah-password");
        //     },
        // },
        // { type: "divider" },
        {
            key: "logout",
            label: "Logout",
            icon: (
                <Icon icon="material-symbols:logout" width="18" height="18" />
            ),
            danger: true,
            onClick: handleLogout,
        },
    ];

    return (
        <Layout.Header
            style={{
                borderBottom: "1px solid " + pallete.grey[200],
                height: "auto",
                lineHeight: "normal",
                padding: "12px 12px",
            }}
            className="bg-blue-300"
        >
            <Flex
                align="center"
                justify="space-between"
                style={{ width: "100%" }}
            >
                <Flex align="center" gap={12}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            height: "32px",
                        }}
                    >
                        {isMobile ? (
                            <Button
                                type="text"
                                icon={
                                    <Icon
                                        icon={
                                            isCollapsed
                                                ? "material-symbols:menu-rounded"
                                                : "material-symbols:menu-open-rounded"
                                        }
                                        width="24"
                                        height="24"
                                    />
                                }
                                onClick={toggleDrawer}
                                style={{ height: "32px" }}
                            />
                        ) : (
                            <Button
                                type="text"
                                icon={
                                    <Icon
                                        icon={
                                            isCollapsed
                                                ? "material-symbols:menu-rounded"
                                                : "material-symbols:menu-open-rounded"
                                        }
                                        width="24"
                                        height="24"
                                    />
                                }
                                onClick={toggleCollapsed}
                                style={{ padding: "4px 8px", height: "32px" }}
                            />
                        )}
                    </div>
                    <Typography.Title
                        level={3}
                        style={{
                            marginBottom: 0,
                            fontSize: isMobile ? "18px" : "24px",
                            lineHeight: "32px",
                            marginTop: 0,
                        }}
                    >
                        {title}
                    </Typography.Title>
                </Flex>

                <Flex align="center" gap={12}>
                    <Dropdown
                        menu={{
                            items: menuItems,
                        }}
                    >
                        <Flex
                            align="center"
                            gap={8}
                            style={{ cursor: "pointer" }}
                        >
                            {/* <Avatar
                                shape="circle"
                                style={{
                                    backgroundColor: pallete.primary[50],
                                    color: pallete.primary[600],
                                }}
                                src={
                                    user.gender === "male"
                                        ? maleAvatar
                                        : femaleAvatar
                                }
                            >
                                {!user.gender && (user.name?.[0] || "A")}
                            </Avatar> */}
                            {!isMobile && (
                                <Flex vertical>
                                    <Typography.Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                        }}
                                    >
                                        Anonymous
                                    </Typography.Text>
                                    <Typography.Text
                                        style={{
                                            fontSize: 11,
                                            fontWeight: 500,
                                            color: pallete.grey[600],
                                        }}
                                    >
                                        anonym@example.com
                                    </Typography.Text>
                                </Flex>
                            )}
                        </Flex>
                    </Dropdown>
                </Flex>
            </Flex>
        </Layout.Header>
    );
}
