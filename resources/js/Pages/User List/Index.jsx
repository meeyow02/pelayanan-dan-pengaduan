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
        title: "Nama",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Username",
        dataIndex: "username",
        key: "username",
    },
    {
        title: "Nomor Telepon",
        dataIndex: "phone_number",
        key: "phone_number",
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
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
                    router.visit(route("user-list.edit", id))
                }
                handleDelete={() => router.delete(route("user-list.destroy", id))}
            />
        ),
    },
];

export default function Index() {
    // Hooks
    const { setTitle } = useTitleStore();
    const { flash, filters, userList = {} } = usePage().props;
    const tableHeight = useTableHeight(420);

    const { isMobile } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsDrawerOpen } = useSidebarStore();

    const [messageApi, contextHolder] = message.useMessage();
    const [page, setPage] = useState(userList.current_page);
    const [limit, setLimit] = useState(userList.per_page);
    const [keyword, setKeyword] = useState(filters?.search || "");

    useEffect(() => {
        setTitle("Daftar User");
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
                route("user-list.index"),
                { search: keyword, page: 1, limit },
                { preserveScroll: true, preserveState: true, replace: true }
            );
        }, 500);
        return () => clearTimeout(timeout);
    }, [keyword]);

    const handleCreateUserList = () => {
        router.visit(route("user-list.create"));
    };

    const handleChangePage = (newPage, newPageSize) => {
        setPage(newPage);
        setLimit(newPageSize);

        Inertia.get(
            route("user-list.index"),
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
                <Head title="Daftar User" />
            
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
                                        onClick={handleCreateUserList}
                                        style={{
                                            fontSize: "0.85em",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Tambah User
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
                                        onClick={handleCreateUserList}
                                        style={{
                                            fontSize: "0.85em",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Tambah User
                                    </Button>
                                </Flex>
                            </>
                        )}
    
                        {/* Table Data */}
                        <Table
                            columns={columns}
                            dataSource={userList.data}
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
                            total={userList.total}
                            showTotal={(total, range) =>
                                `${range[0]}-${range[1]} dari ${total} item`
                            }
                            current={userList.current_page}
                            pageSize={userList.per_page}
                            onChange={handleChangePage}
                            responsive
                            showSizeChanger
                        />
                    </Card>
            
            </MainLayout>
        </>
    );
}
