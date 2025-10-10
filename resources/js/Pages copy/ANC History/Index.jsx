import CustomButton from "@/Components/CustomButton";
import SearchInput from "@/Components/SearchInput";
import TableAction from "@/Components/TableAction";
import useDebounce from "@/hooks/useDebounce";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import { ancHistoryService } from "@/services/ancHistoryService";
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

const getTableColumns = (
    dataParams,
    handleDelete,
    deleteLoading,
    showDelete
) => [
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
        title: "Tanggal Kunjungan",
        dataIndex: "visit_date",
        key: "visit_date",
        width: 150,
        render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
        title: "ANC ke-",
        dataIndex: "anc_type",
        key: "anc_type",
        width: 80,
        render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
        title: "Faskes Pemeriksaan",
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
                    window.location.href = `/riwayat/anc/${record.uuid}/edit`;
                }}
                showEdit={false}
                onClickDetail={() => {
                    window.location.href = `/riwayat/anc/${record.uuid}`;
                }}
                handleDelete={() => handleDelete(record.id)}
                deleteLoading={deleteLoading}
                showDetail
                showDelete={showDelete}
            />
        ),
    },
];

export default function ANCHistoryIndex() {
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
        data: ancHistoryData,
        isLoading,
        isRefetching,
    } = useQuery({
        queryKey: ["anc-history", dataParams],
        queryFn: () => ancHistoryService.fetchAll(dataParams),
        placeholderData: keepPreviousData,
    });

    const { mutate: handleDelete, isPending: deleteLoading } = useMutation({
        mutationFn: (uuid) => ancHistoryService.delete(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries("anc-history");
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
        setTitle("Riwayat ANC");
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
    const dataItems = ancHistoryData?.data || [];

    // Total data dan limit, ambil dari response atau fallback ke dataParams
    const total = ancHistoryData?.pagination?.total || 0;
    const limit = ancHistoryData?.pagination?.limit || dataParams.limit;

    return (
        <>
            {contextHolder}
            <MainLayout
                isCollapsed={isCollapsed}
                isDrawerOpen={isDrawerOpen}
                isMobile={isMobile}
                setIsDrawerOpen={setIsDrawerOpen}
            >
                <Head title="Riwayat ANC" />

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
                                    route("anc-history.export"),
                                    "_blank"
                                )
                            }
                        >
                            Export Data ANC
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
