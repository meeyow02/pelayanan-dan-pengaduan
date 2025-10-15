import { Button, Flex, Input, Pagination, Space, Table, Tag } from "antd";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, router, usePage } from "@inertiajs/react";
import { Card, message } from "antd";
import useTitleStore from "@/store/titleStore";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useTableHeight } from "@/hooks/useTableHeight";
import dayjs from "dayjs";

const columns = [
    {
        title: "No.",
        dataIndex: "no",
        key: "no",
        render: (_, __, index) => index + 1, // otomatis nomor urut
    },
    {
        title: "Tanggal Aduan",
        dataIndex: "created_at",
        key: "created_at",
        render: (date) => dayjs(date).format("DD-MM-YYYY"),
    },
    {
        title: "Nomor Aduan",
        dataIndex: "complaint_number",
        key: "complaint_number",
    },
    {
        title: "Kategori",
        dataIndex: ["complaint_category", "name"], // ambil dari relasi
        key: "complaint_category",
        render: (text) => text || "-",
    },
    {
        title: "Aduan",
        dataIndex: "content",
        key: "content",
        ellipsis: true,
    },
    {
        title: "Status Aduan",
        dataIndex: "status",
        key: "status",
        render: (status) => {
            const statusColor = {
                pending: "orange",
                on_progress: "blue",
                completed: "green",
                cancel: "red",
            };
            const statusLabel = {
                pending: "Menunggu Persetujuan",
                on_progress: "Diproses",
                completed: "Selesai",
                cancel: "Ditolak",
            };
            return (
                <span style={{ color: statusColor[status] || "gray" }}>
                    {statusLabel[status] || status}
                </span>
            );
        },
    },
    {
        title: "Bukti Aduan",
        dataIndex: "filename",
        key: "filename",
        render: (filename) =>
            filename ? (
                <a
                    href={`/storage/complaint/${filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Lihat Bukti
                </a>
            ) : (
                "-"
            ),
    },
];

export default function Index() {
    // Hooks
    const { setTitle } = useTitleStore();
    const { flash, auth, complaints } = usePage().props;
    const tableHeight = useTableHeight(420);

    const { isMobile, isTablet } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsCollapsed, setIsDrawerOpen } =
        useSidebarStore();

    const [messageApi, contextHolder] = message.useMessage();
    const [page, setPage] = useState(complaints.current_page);
    const [limit, setLimit] = useState(complaints.per_page);

    useEffect(() => {
        setTitle("Pengaduan");
    }, [setTitle]);

    useEffect(() => {
        if (flash?.success) {
            messageApi.success(flash.success);
        }
        if (flash?.error) {
            messageApi.error(flash.error);
        }
    }, [flash, messageApi]);

    const handleCreateComplaint = () => {
        router.visit(route("complaint.create"));
    };

    const handleChangePage = (newPage, newPageSize) => {
        setPage(newPage);
        setLimit(newPageSize);

        Inertia.get(
            route("complaint.index"),
            { page: newPage, limit: newPageSize },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    return (
        <>
            {contextHolder}
            <MainLayout
                isCollapsed={isCollapsed}
                isDrawerOpen={isDrawerOpen}
                isMobile={isMobile}
                setIsDrawerOpen={setIsDrawerOpen}
            >
                <Head title="Pengaduan" />

                <Card
                    styles={{
                        body: {
                            paddingLeft: 0,
                            paddingRight: 0,
                        },
                    }}
                >
                    {isMobile ? (
                        <>
                            <Flex
                                justify="space-between"
                                direction="row"
                                style={{
                                    paddingInline: 24,
                                    marginBottom: 24,
                                    flexWrap: "wrap",
                                    gap: "12px",
                                }}
                            >
                                <Input
                                    // onChange={(e) => setKeyword(e.target.value)}
                                    // value={keyword}
                                    style={{ width: 320 }}
                                    placeholder="Cari"
                                    prefix={
                                        <Icon
                                            icon="hugeicons:search-01"
                                            width={16}
                                            height={16}
                                        />
                                    }
                                />
                                <Button
                                    variant="solid"
                                    color="primary"
                                    icon={
                                        <Icon
                                            icon={"hugeicons:plus-sign"}
                                            width={16}
                                            height={16}
                                        />
                                    }
                                    onClick={handleCreateComplaint}
                                    style={{
                                        fontSize: "0.85em",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Buat Aduan
                                </Button>
                            </Flex>
                        </>
                    ) : (
                        <>
                            <Flex
                                justify="space-between"
                                direction="row"
                                style={{
                                    paddingInline: 24,
                                    marginBottom: 24,
                                    flexWrap: "wrap",
                                    gap: "12px",
                                }}
                            >
                                <Input
                                    // onChange={(e) => setKeyword(e.target.value)}
                                    // value={keyword}
                                    style={{ width: 320 }}
                                    placeholder="Cari"
                                    prefix={
                                        <Icon
                                            icon="hugeicons:search-01"
                                            width={16}
                                            height={16}
                                        />
                                    }
                                />
                                <Button
                                    variant="solid"
                                    color="primary"
                                    icon={
                                        <Icon
                                            icon={"hugeicons:plus-sign"}
                                            width={16}
                                            height={16}
                                        />
                                    }
                                    onClick={handleCreateComplaint}
                                    style={{
                                        fontSize: "0.85em",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Buat Aduan
                                </Button>
                            </Flex>
                        </>
                    )}

                    {/* Table Data */}
                    <Table
                        columns={columns}
                        dataSource={complaints.data}
                        pagination={false}
                        size="small"
                        loading={false}
                        rowKey={"id"}
                        scroll={{ y: tableHeight, x: 1000 }}
                        style={{
                            paddingInline: 24
                        }}
                    />

                    <Pagination
                        style={{
                            marginInline: 24,
                            marginTop: 24,
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "flex-end",
                        }}
                        total={complaints.total}
                        showTotal={(total, range) =>
                            `${range[0]}-${range[1]} dari ${total} item`
                        }
                        current={complaints.current_page}
                        pageSize={complaints.per_page}
                        onChange={handleChangePage}
                        responsive
                        showSizeChanger
                    />
                </Card>
            </MainLayout>
        </>
    );
}
