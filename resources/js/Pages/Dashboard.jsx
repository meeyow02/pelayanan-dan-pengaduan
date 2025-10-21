import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, usePage } from "@inertiajs/react";
import { message } from "antd";
import useTitleStore from "@/store/titleStore";
import { useEffect } from "react";
import Admin from "./Dashboard/Admin";
import User from "./Dashboard/User";

export default function Dashboard() {
    // Hooks
    const { setTitle } = useTitleStore();
    const { auth } = usePage().props;
    const { isMobile } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsDrawerOpen } = useSidebarStore();

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setTitle("Dashboard");
    }, [setTitle]);

    return (
        <>
            {contextHolder}
            <MainLayout
                isCollapsed={isCollapsed}
                isDrawerOpen={isDrawerOpen}
                isMobile={isMobile}
                setIsDrawerOpen={setIsDrawerOpen}
            >
                <Head title="Dashboard" />

                {auth.user.role == "admin" ? <Admin /> : <User />}
            </MainLayout>
        </>
    );
}
