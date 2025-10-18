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
        title: "Kategori Pelayanan Administrasi",
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
                    router.visit(route("service-category.edit", id))
                }
                handleDelete={() => router.delete(route("service-category.destroy", id))}
            />
        ),
    },
];

export default function Index() {
    // Hooks
    const { setTitle } = useTitleStore();
    const { flash, serviceCategories, filters = {} } = usePage().props;
    const tableHeight = useTableHeight(420);

    const { isMobile } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsDrawerOpen } = useSidebarStore();

    const [messageApi, contextHolder] = message.useMessage();
    const [page, setPage] = useState(serviceCategories.current_page);
    const [limit, setLimit] = useState(serviceCategories.per_page);
    const [keyword, setKeyword] = useState(filters?.search || "");

    useEffect(() => {
        setTitle("Kategori Pelayanan Administrasi");
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
                route("service-category.index"),
                { search: keyword, page: 1, limit },
                { preserveScroll: true, preserveState: true, replace: true }
            );
        }, 500);
        return () => clearTimeout(timeout);
    }, [keyword]);

    const handleCreateServiceCategory = () => {
        router.visit(route("service-category.create"));
    };

    const handleChangePage = (newPage, newPageSize) => {
        setPage(newPage);
        setLimit(newPageSize);

        Inertia.get(
            route("service-category.index"),
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
                <Head title="Kategori Pelayanan Administrasi" />

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
                                    onClick={handleCreateServiceCategory}
                                    style={{
                                        fontSize: "0.85em",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Buat Kategori Pelayanan Administrasi
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
                                    href="/master_data/kategori_pelayanan/buat_kategori_pelayanan"
                                    onClick={handleCreateServiceCategory}
                                    style={{
                                        fontSize: "0.85em",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Buat Kategori Pelayanan Administrasi
                                </Button>
                            </Flex>
                        </>
                    )}

                    {/* Table Data */}
                    <Table
                        columns={columns}
                        dataSource={serviceCategories.data}
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
                        total={serviceCategories.total}
                        showTotal={(total, range) =>
                            `${range[0]}-${range[1]} dari ${total} item`
                        }
                        current={serviceCategories.current_page}
                        pageSize={serviceCategories.per_page}
                        onChange={handleChangePage}
                        responsive
                        showSizeChanger
                    />
                </Card>
            </MainLayout>
        </>
    );
}
