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
        setTitle("Detail Riwayat Perawatan Gigi");
    }, [setTitle]);

    return (
        <MainLayout
            isCollapsed={isCollapsed}
            isDrawerOpen={isDrawerOpen}
            isMobile={isMobile}
            setIsDrawerOpen={setIsDrawerOpen}
        >
            <Head title="Detail Riwayat Perawatan Gigi" />

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
                    Detail Riwayat Perawatan Gigi
                </Typography.Title>

                <Divider style={{ margin: "16px 0" }} />

                <Descriptions
                    bordered
                    column={1}
                    size="small"
                    className="custom-description"
                >
                    <Descriptions.Item label="ID">
                        {data.data.id}
                    </Descriptions.Item>
                    <Descriptions.Item label="UUID">
                        {data.data.uuid}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nomor kartu">
                        {data.data.patient.card_number}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tanggal Kunjungan">
                        {data.data.visit_date}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nomor SEP">
                        {data.data.sep_number ? data.data.sep_number : "-"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Jenis Gigi">
                        {data.data.tooth_type == "child"
                            ? "Anak-Anak"
                            : "Dewasa"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Fasilitas Kesehatan">
                        {data.data.health_facility
                            ? data.data.health_facility.name
                            : "-"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nomor Gigi">
                        {data.data.tooth_numbers
                            ? data.data.tooth_numbers.numbers &&
                              data.data.tooth_numbers.numbers.join(", ")
                            : "-"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Waktu Diperbarui">
                        {data.data.updated_at}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </MainLayout>
    );
}
