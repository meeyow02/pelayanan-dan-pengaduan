import { Button, Flex, Input, Space, Table, Tag } from "antd";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Card, Form, message } from "antd";
import useTitleStore from "@/store/titleStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useTableHeight } from "@/hooks/useTableHeight";

const columns = [
    {
        title: "No.",
        dataIndex: "no",
        key: "no",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Tanggal Aduan",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Nomor Aduan",
        dataIndex: "complaint_number",
        key: "complaint_number",
    },
    {
        title: "Kategori",
        key: "complaint_category_id",
        dataIndex: "complaint_category_id",
    },
    {
        title: "Aduan",
        key: "content",
        dataIndex: "content",
    },
    {
        title: "Status Aduan",
        key: "status",
        dataIndex: "status",
    },
    {
        title: "Bukti Aduan",
        key: "filename",
        dataIndex: "filename",
    },
];

// const data = [
//     {
//         key: '1',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//         tags: ['nice', 'developer'],
//     },
//     {
//         key: '2',
//         name: 'Jim Green',
//         age: 42,
//         address: 'London No. 1 Lake Park',
//         tags: ['loser'],
//     },
//     {
//         key: '3',
//         name: 'Joe Black',
//         age: 32,
//         address: 'Sydney No. 1 Lake Park',
//         tags: ['cool', 'teacher'],
//     },
// ];

export default function Index() {
    // Hooks
    const [form] = Form.useForm();
    const { setTitle } = useTitleStore();
    const { flash, auth, complaints } = usePage().props;
    const tableHeight = useTableHeight(420);

    const { isMobile, isTablet } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsCollapsed, setIsDrawerOpen } =
        useSidebarStore();
    const queryClient = useQueryClient();

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setTitle("Pengaduan");
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
                                    onClick={() => navigate("/karir/faq/tambah")}
                                    style={{ fontSize: "0.85em", fontWeight: "bold" }}
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
                                    onClick={() => navigate("/karir/faq/tambah")}
                                    style={{ fontSize: "0.85em", fontWeight: "bold" }}
                                >
                                    Buat Aduan
                                </Button>
                            </Flex>
                        </>
                    )}
                    

                    {/* Loading Indicator */}
                    {/* {(isLoading || isRefetching) && (
                        <div style={{ padding: "0 24px", marginBottom: 16 }}>
                            <div
                                style={{
                                    width: "100%",
                                    height: 3,
                                    backgroundColor: "#f0f0f0",
                                    overflow: "hidden",
                                    borderRadius: 4,
                                }}
                            >
                                <div
                                    style={{
                                        width: "30%",
                                        height: "100%",
                                        backgroundColor: "#1890ff",
                                        animation: "loading 1.5s infinite",
                                    }}
                                />
                            </div>
                            <style>{`
              @keyframes loading {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(400%); }
              }
            `}</style>
                        </div>
                    )} */}

                    {/* Table Data */}
                    <Table
                        columns={columns}
                        // dataSource={dataItems}
                        pagination={false}
                        size="small"
                        loading={false} // We're handling the loading state separately
                        rowKey={"id"}
                        scroll={{ y: tableHeight, x: 1000 }}
                    />

                    {/* <Pagination
                        style={{
                            marginInline: 24,
                            marginTop: 24,
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "flex-end",
                        }}
                        total={total}
                        showTotal={(total, range) =>
                            `${range[0]}-${range[1]} dari ${total} item`
                        }
                        current={dataParams.page}
                        pageSize={limit}
                        onChange={handleChangePage}
                        responsive
                        showSizeChanger={{
                            showSearch: false,
                        }}
                    /> */}
                </Card>
            </MainLayout>
        </>
    );
}
