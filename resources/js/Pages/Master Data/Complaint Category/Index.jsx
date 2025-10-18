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
        render: (_, __, index) => index + 1,
    },
    {
        title: "Kategori Aduan",
        dataIndex: "name",
        key: "name",
        width: 200,
        render: (text) => text || "-",
    },
    {
        title: "Deskripsi",
        dataIndex: "description",
        key: "description",
        ellipsis: true,
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
                onClickEdit={() =>
                    router.visit(route("complaint-category.edit", id))
                }
                handleDelete={() =>
                    router.delete(route("complaint-category.destroy", id))
                }
            />
        ),
    },
];

export default function Index() {
    // Hooks
    const { setTitle } = useTitleStore();
    const { flash, complaintCategories, filters = {} } = usePage().props;
    const tableHeight = useTableHeight(420);

    const { isMobile } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsDrawerOpen } = useSidebarStore();

    const [messageApi, contextHolder] = message.useMessage();
    const [page, setPage] = useState(complaintCategories.current_page);
    const [limit, setLimit] = useState(complaintCategories.per_page);
    const [keyword, setKeyword] = useState(filters?.search || "");

    useEffect(() => {
        setTitle("Kategori Aduan");
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
                route("complaint-category.index"),
                { search: keyword, page: 1, limit },
                { preserveScroll: true, preserveState: true, replace: true }
            );
        }, 500);
        return () => clearTimeout(timeout);
    }, [keyword]);

    const handleCreateComplaintCategory = () => {
        router.visit(route("complaint-category.create"));
    };

    const handleChangePage = (newPage, newPageSize) => {
        setPage(newPage);
        setLimit(newPageSize);

        Inertia.get(
            route("complaint-category.index"),
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
                <Head title="Master Data" />

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
                                    onChange={(e) => setKeyword(e.target.value)}
                                    value={keyword}
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
                                    onClick={handleCreateComplaintCategory}
                                    style={{
                                        fontSize: "0.85em",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Buat Kategori Aduan
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
                                    onChange={(e) => setKeyword(e.target.value)}
                                    value={keyword}
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
                                    href="/master_data/kategori_aduan/buat_kategori_aduan"
                                    onClick={handleCreateComplaintCategory}
                                    style={{
                                        fontSize: "0.85em",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Buat Kategori Aduan
                                </Button>
                            </Flex>
                        </>
                    )}

                    {/* Table Data */}
                    <Table
                        columns={columns}
                        dataSource={complaintCategories.data}
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
                        total={complaintCategories.total}
                        showTotal={(total, range) =>
                            `${range[0]}-${range[1]} dari ${total} item`
                        }
                        current={complaintCategories.current_page}
                        pageSize={complaintCategories.per_page}
                        onChange={handleChangePage}
                        responsive
                        showSizeChanger
                    />
                </Card>
            </MainLayout>
        </>
    );
}
