import CustomButton from "@/Components/CustomButton";
import SearchInput from "@/Components/SearchInput";
import TableAction from "@/Components/TableAction";
import useDebounce from "@/hooks/useDebounce";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import { insulinPenHistoryService } from "@/services/insulinPenHistoryService";
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

const getTableColumns = (dataParams, handleDelete, deleteLoading, showDelete) => [
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
        title: "Nomor Kartu",
        dataIndex: ["patient", "card_number"],
        key: "card_number",
        width: 200,
        render: (text, record) => (
            <div className="line-clamp-2">
                {record.patient?.card_number || "-"}
            </div>
        ),
    },
    {
        title: "Tanggal Pengambilan",
        dataIndex: "given_date",
        key: "given_date",
        width: 150,
        render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
        title: "Faskes Pengambilan",
        dataIndex: ["user", "health_facility", "name"],
        key: "name",
        width: 150,
        render: (text) => <div className="line-clamp-2">{text || "-"}</div>,
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
                    window.location.href = `/riwayat/insulin/${record.uuid}/edit`;
                }}
                onClickDetail={() => {
                    window.location.href = `/riwayat/insulin/${record.uuid}`;
                }}
                showEdit={false}
                handleDelete={() => handleDelete(record.id)}
                showDelete={showDelete}
                deleteLoading={deleteLoading}
                showDetail
            />
        ),
    },
];

export default function InsulinPenHistoryIndex() {
    const user = usePage().props.auth.user;
    const [keyword, setKeyword] = useState("");
    const [dataParams, setDataParams] = useState({
        limit: 10,
        page: 1,
        filter: {},
    });
    const isAdmin = user.role === "admin";

    // Hooks
    const { isMobile, isTablet } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsCollapsed, setIsDrawerOpen } =
        useSidebarStore();
    const { setTitle } = useTitleStore();
    const debouncedKeyword = useDebounce(keyword, 500);
    const [messageApi, contextHolder] = message.useMessage();

    const queryClient = useQueryClient();

    const {
        data: insulinPenHistoryData,
        isLoading,
        isRefetching,
    } = useQuery({
        queryKey: ["insulin-pen-history", dataParams],
        queryFn: () => insulinPenHistoryService.fetchAll(dataParams),
        placeholderData: keepPreviousData,
    });

    const { mutate: handleDelete, isPending: deleteLoading } = useMutation({
        mutationFn: (uuid) => insulinPenHistoryService.delete(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries("insulin-pen-history");
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
        setTitle("Riwayat Pen Insulin");
    }, [setTitle]);

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
    const columns = getTableColumns(dataParams, handleDelete, deleteLoading, isAdmin);

    // Data hasil query (jika belum ada, gunakan array kosong)
    const dataItems = insulinPenHistoryData?.data || [];

    // Total data dan limit, ambil dari response atau fallback ke dataParams
    const total = insulinPenHistoryData?.pagination?.total || 0;
    const limit = insulinPenHistoryData?.pagination?.limit || dataParams.limit;

    return (
        <>
            {contextHolder}
            <MainLayout
                isCollapsed={isCollapsed}
                isDrawerOpen={isDrawerOpen}
                isMobile={isMobile}
                setIsDrawerOpen={setIsDrawerOpen}
            >
                <Head title="Riwayat Pen Insulin" />

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
                    <Flex align="center" justify="space-between">
                        <SearchInput
                            keyword={keyword}
                            setKeyword={(e) => setKeyword(e.target.value)}
                            placeholder={"Cari nomor kartu"}
                        />
                        <CustomButton
                            variant="primary"
                            size="middle"
                            onClick={() =>
                                window.open(
                                    route("insulin-pen-history.export"),
                                    "_blank"
                                )
                            }
                        >
                            Export Data Insulin
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
