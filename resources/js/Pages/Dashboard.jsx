import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Card, Form, message } from "antd";
import useTitleStore from "@/store/titleStore";
import {
    useQueryClient,
} from "@tanstack/react-query";

export default function Dashboard() {
    // Hooks
    const [form] = Form.useForm();
    const { data, setData, post, processing, reset } = useForm({
        card_number: "",
        pen_given: 0,
        date_given: null,
        day_dose: null,
        afternoon_dose: null,
        evening_dose: null,
        night_dose: null,
    });
    const { setTitle } = useTitleStore();
    const { flash, auth } = usePage().props;
    const { isMobile, isTablet } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsCollapsed, setIsDrawerOpen } =
        useSidebarStore();
    const queryClient = useQueryClient();

    const [messageApi, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}
            <MainLayout
                isCollapsed={isCollapsed}
                isDrawerOpen={isDrawerOpen}
                isMobile={isMobile}
                setIsDrawerOpen={setIsDrawerOpen}
            >
                <Head title="Insulin" />

                <Card
                    styles={{
                        body: {
                            padding: 0,
                        },
                    }}
                ></Card>
            </MainLayout>
        </>
    );
}
