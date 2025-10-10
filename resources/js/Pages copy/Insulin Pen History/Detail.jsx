import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import useTitleStore from "@/store/titleStore";
import { Head, usePage } from "@inertiajs/react";
import { Card, Descriptions, Divider, Typography } from "antd";
import { useEffect } from "react";

export default function DetailInsulinPenHistory() {
    // Hooks
    const { data } = usePage().props;
    const { setTitle } = useTitleStore();
    const { isMobile, isTablet } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsCollapsed, setIsDrawerOpen } =
        useSidebarStore();

    // Handle responsive states
    useEffect(() => {
        setIsCollapsed(isTablet);
    }, [isTablet, setIsCollapsed]);

    useEffect(() => {
        if (!isMobile) {
            setIsDrawerOpen(false);
        }
    }, [isMobile, setIsDrawerOpen]);

    useEffect(() => {
        setTitle("Detail Riwayat Pen Insulin");
    }, [setTitle]);

    return (
        <MainLayout
            isCollapsed={isCollapsed}
            isDrawerOpen={isDrawerOpen}
            isMobile={isMobile}
            setIsDrawerOpen={setIsDrawerOpen}
        >
            <Head title="Detail Riwayat Pen Insulin" />

            <Card
                styles={{
                    body: {
                        paddingLeft: 0,
                        paddingRight: 0,
                    },
                }}
                style={{ padding: "0 24px" }}
            >
                <Typography.Title level={4}>
                    Detail Riwayat Pen Insulin
                </Typography.Title>

                <Divider style={{ margin: "16px 0" }} />

                <Descriptions
                    bordered
                    column={1}
                    size="small"
                    className="custom-description"
                >
                    <Descriptions.Item label="Nomor kartu">
                        {data.data.patient.card_number}
                    </Descriptions.Item>
                    <Descriptions.Item label="Pen yang diberikan">
                        {data.data.total_pen}
                    </Descriptions.Item>
                    <Descriptions.Item label="Dosis harian">
                        {data.data.daily_dose}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sisa pen bulan berikutnya">
                        {data.data.remaining_pen_next_month}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tanggal Pemberian">
                        {data.data.given_date}
                    </Descriptions.Item>
                    <Descriptions.Item label="Diinput oleh">
                        {data.data.user.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Faskes layanan">
                        {data.data.user.health_facility == null ? "-" : data.data.user.health_facility.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Waktu Diperbarui">
                        {data.data.updated_at}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </MainLayout>
    );
}
