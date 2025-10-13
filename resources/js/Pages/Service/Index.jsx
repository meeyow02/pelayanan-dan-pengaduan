import { Button, Space, Table, Tag } from "antd";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Card, Form, message } from "antd";
import useTitleStore from "@/store/titleStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const columns = [
    {
        title: 'No.',
        dataIndex: 'no',
        key: 'no',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Tanggal Inputan',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Kategori',
        key: 'service_category_id',
        dataIndex: 'service_category_id',
    },
    {
        title: 'Deskripsi',
        key: 'description',
        dataIndex: 'description',
    },
    {
        title: 'Status Aduan',
        key: 'status',
        dataIndex: 'status',
    },
    {
        title: 'Dokumen',
        key: 'filename',
        dataIndex: 'filename',
    },
];

export default function Index() {
    // Hooks
    const [form] = Form.useForm();
    const { setTitle } = useTitleStore();
    const { flash, auth, complaints } = usePage().props;
    const { isMobile, isTablet } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsCollapsed, setIsDrawerOpen } =
        useSidebarStore();
    const queryClient = useQueryClient();

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setTitle("Pelayanan");
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
                <Head title="Pelayanan" />

                <Button type="primary" style={{ marginBottom: 16 }}>
                    Tambah Permohonan Layanan 
                </Button>

                <Table Table columns={columns}  />
                
            </MainLayout>
        </>
    );
}
