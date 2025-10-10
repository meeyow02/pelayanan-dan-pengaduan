import CustomButton from "@/Components/CustomButton";
import SearchInput from "@/Components/SearchInput";
import TableAction from "@/Components/TableAction";
import useDebounce from "@/hooks/useDebounce";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import { userService } from "@/services/userService";
import useSidebarStore from "@/store/sidebarStore";
import useTitleStore from "@/store/titleStore";
import { Head, usePage } from "@inertiajs/react";
import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { Card, Divider, Flex, message, Pagination, Table } from "antd";
import { useEffect, useState } from "react";

const getTableColumns = (dataParams, handleDelete, deleteLoading) => [
    {
        title: "No",
        render: (text, record, index) =>
            (dataParams.page - 1) * dataParams.limit + index + 1,
        key: "no",
        align: "center",
        width: 20,
        fixed: "left",
    },
    {
        title: "Nama",
        dataIndex: "name",
        key: "name",
        width: 200,
        render: (text) => <div className="line-clamp-2">{text || "-"}</div>,
    },
    {
        title: "Username",
        dataIndex: "username",
        key: "username",
        width: 150,
        render: (text) => <div className="line-clamp-2">{text || "-"}</div>,
    },
    {
        title: "Role",
        dataIndex: "role",
        key: "role",
        width: 150,
        render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
        title: "Aksi",
        className: "last-cell-p",
        dataIndex: ["id", "uuid"],
        key: "uuid",
        align: "right",
        width: 70,
        fixed: "right",
        render: (_, record) => (
            <TableAction
                onClickEdit={() => {
                    window.location.href = `/kelola-user/edit/${record.uuid}`;
                }}
                handleDelete={() => handleDelete(record.id)}
                deleteLoading={deleteLoading}
            />
        ),
    },
];

export default function UserIndex() {
    const [keyword, setKeyword] = useState("");
    const [dataParams, setDataParams] = useState({
        limit: 10,
        page: 1,
        filter: {},
    });

    // Hooks
    const { props } = usePage();
    const success = props.flash.success;
    const { isMobile, isTablet } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsCollapsed, setIsDrawerOpen } =
        useSidebarStore();
    const { setTitle } = useTitleStore();
    const debouncedKeyword = useDebounce(keyword, 500);
    const [messageApi, contextHolder] = message.useMessage();

    const queryClient = useQueryClient();

    const {
        data: usersData,
        isLoading,
        isRefetching,
    } = useQuery({
        queryKey: ["users", dataParams],
        queryFn: () => userService.fetchAll(dataParams),
        placeholderData: keepPreviousData,
    });

    const { mutate: handleDelete, isPending: deleteLoading } = useMutation({
        mutationFn: (uuid) => userService.delete(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries("users");
            messageApi.success("Data berhasil dihapus");
        },
        onError: (error) => {
            messageApi.error("Gagal menghapus data: " + error.message);
        },
    });

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
        setTitle("Kelola User");
    }, [setTitle]);

    useEffect(() => {
        if (success) {
            messageApi.success(success);
        }
    }, [success]);

    // Search
    useEffect(() => {
        setDataParams((prev) => ({
            ...prev,
            search: debouncedKeyword,
        }));
    }, [debouncedKeyword]);

    // Handlers
    const handleChangePage = (page, pageSize) => {
        setDataParams({
            ...dataParams,
            limit: pageSize,
            page,
        });
    };

    // Table
    const columns = getTableColumns(dataParams, handleDelete, deleteLoading);

    // Data hasil query (jika belum ada, gunakan array kosong)
    const dataItems = usersData?.data || [];

    // Total data dan limit, ambil dari response atau fallback ke dataParams
    const total = usersData?.pagination?.total || 0;
    const limit = usersData?.pagination?.limit || dataParams.limit;

    return (
        <>
            {contextHolder}
            <MainLayout
                isCollapsed={isCollapsed}
                isDrawerOpen={isDrawerOpen}
                isMobile={isMobile}
                setIsDrawerOpen={setIsDrawerOpen}
            >
                <Head title="Kelola User" />

                <Card
                    styles={{
                        body: {
                            paddingLeft: 0,
                            paddingRight: 0,
                        },
                    }}
                    style={{
                        padding: "0 24px",
                    }}
                >
                    <Flex justify="space-between" align="center">
                        <SearchInput
                            keyword={keyword}
                            setKeyword={(e) => setKeyword(e.target.value)}
                            placeholder={"Cari nama user"}
                        />
                        <CustomButton
                            variant="primary"
                            size="medium"
                            onClick={() => {
                                window.location.href = "/kelola-user/tambah";
                            }}
                        >
                            Tambah User
                        </CustomButton>
                    </Flex>

                    <Divider />

                    <Table
                        columns={columns}
                        dataSource={dataItems}
                        pagination={false}
                        size="small"
                        loading={isLoading || isRefetching}
                        rowKey={"id"}
                    />

                    <Pagination
                        style={{ marginInline: 24, marginTop: 24 }}
                        total={total}
                        showTotal={(total, range) =>
                            `${range[0]}-${range[1]} dari ${total} item`
                        }
                        current={dataParams.page}
                        pageSize={limit}
                        align="end"
                        onChange={handleChangePage}
                    />
                </Card>
            </MainLayout>
        </>
    );
}
