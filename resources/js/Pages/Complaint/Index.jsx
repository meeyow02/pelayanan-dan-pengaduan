import { Button, Flex, Input, Pagination, Table } from "antd";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, router, usePage } from "@inertiajs/react";
import { Card, message } from "antd";
import useTitleStore from "@/store/titleStore";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useTableHeight } from "@/hooks/useTableHeight";
import TableAction from "@/Components/TableAction";

const columns = [
    {
        title: "No.",
        dataIndex: "no",
        key: "no",
        width: 50,
        fixed: "left",
        render: (_, __, index) => index + 1, // otomatis nomor urut
    },
    {
        title: "Tanggal Aduan",
        dataIndex: "created_at",
        key: "created_at",
        render: (date) => {
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Makassar",
            };
            return new Date(date).toLocaleDateString("id-ID", options) + " WITA";
        },
    },
    {
        title: "Nomor Aduan",
        dataIndex: "complaint_number",
        key: "complaint_number",
    },
    {
        title: "Kategori",
        dataIndex: ["complaint_category", "name"],
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
    {
        title: "Aksi",
        className: "last-cell-p",
        dataIndex: "id",
        key: "id",
        align: "center",
        width: 90,
        fixed: "right",
        render: (id) => (
            <TableAction
                showDetail
                showEdit={false}
                onClickDetail={() =>
                    router.visit(route("complaint.detail", id))
                }
                handleDelete={() =>
                    router.delete(route("complaint.destroy", id))
                }
            />
        ),
    },
];

export default function Index() {
    // Hooks
    const { setTitle } = useTitleStore();
    const { flash, complaints, filters } = usePage().props;
    const tableHeight = useTableHeight(380);

    const { isMobile } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsDrawerOpen } = useSidebarStore();

    const [messageApi, contextHolder] = message.useMessage();
    const [page, setPage] = useState(complaints.current_page);
    const [limit, setLimit] = useState(complaints.per_page);
    const [keyword, setKeyword] = useState(filters?.search || "");

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

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route("complaint.index"),
                { search: keyword, page: 1, limit },
                { preserveScroll: true, preserveState: true, replace: true }
            );
        }, 500);
        return () => clearTimeout(timeout);
    }, [keyword]);

    const handleCreateComplaint = () => {
        router.visit(route("complaint.create"));
    };

    const handleChangePage = (newPage, newPageSize) => {
        setPage(newPage);
        setLimit(newPageSize);

        router.get(
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
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
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
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
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
                            paddingInline: 24,
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
