import SearchInput from "@/Components/SearchInput";
import TableAction from "@/Components/TableAction";
import useDebounce from "@/hooks/useDebounce";
import { useResponsive } from "@/hooks/useResponsive";
import { useTableHeight } from "@/hooks/useTableHeight";
import MainLayout from "@/Layouts/MainLayout";
import { dentalTreatmentHistoryService } from "@/services/dentalTreatmentService";
import { insulinPenHistoryService } from "@/services/insulinPenHistoryService";
import useSidebarStore from "@/store/sidebarStore";
import useTitleStore from "@/store/titleStore";
import { Head } from "@inertiajs/react";
import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { Card, Divider, message, Pagination, Table } from "antd";
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
        title: "Nomor Kartu",
        dataIndex: ["patient", "card_number"], // ✅ Access nested patient.card_number
        key: "card_number",
        width: 150,
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
        align: "center",
        render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
        title: "Tujuan Rujukan",
        dataIndex: ["health_facility", "name"],
        key: "health_facility",
        width: 150,
        align: "center",
        render: (text, record) => (
            <div className="line-clamp-2">
                {record.health_facility?.name || "-"}
            </div>
        ),
    },
    {
        title: "Nomor SEP",
        dataIndex: "sep_number",
        key: "sep_number",
        width: 180,
        align: "center",
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
                    window.location.href = `/riwayat/gigi/${record.uuid}/edit`;
                }}
                onClickDetail={() => {
                    window.location.href = `/riwayat/gigi/${record.uuid}`;
                }}
                handleDelete={() => handleDelete(record.id)}
                deleteLoading={deleteLoading}
                showDetail
            />
        ),
    },
];

export default function DentalTreatmentHistoryIndex() {
    const [keyword, setKeyword] = useState("");
    const [dataParams, setDataParams] = useState({
        limit: 10,
        page: 1,
        filter: {},
    });

    // Hooks
    const { isMobile, isTablet } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsCollapsed, setIsDrawerOpen } =
        useSidebarStore();
    const tableHeight = useTableHeight(450);
    const { setTitle } = useTitleStore();
    const debouncedKeyword = useDebounce(keyword, 500);
    const [messageApi, contextHolder] = message.useMessage();

    const queryClient = useQueryClient();

    const {
        data: dentalTreatmentHistoryData,
        isLoading,
        isRefetching,
    } = useQuery({
        queryKey: ["dental-treatment-history", dataParams],
        queryFn: () => dentalTreatmentHistoryService.fetchAll(dataParams),
        placeholderData: keepPreviousData,
    });

    const { mutate: handleDelete, isPending: deleteLoading } = useMutation({
        mutationFn: (uuid) => dentalTreatmentHistoryService.delete(uuid),
        onSuccess: () => {
            queryClient.invalidateQueries("dental-treatment-history");
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
        setTitle("Riwayat Perawatan Gigi");
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
    const columns = getTableColumns(dataParams, handleDelete, deleteLoading);

    // Data hasil query (jika belum ada, gunakan array kosong)
    const dataItems = dentalTreatmentHistoryData?.data || [];

    // Total data dan limit, ambil dari response atau fallback ke dataParams
    const total = dentalTreatmentHistoryData?.pagination?.total || 0;
    const limit =
        dentalTreatmentHistoryData?.pagination?.limit || dataParams.limit;

    return (
        <>
            {contextHolder}
            <MainLayout
                isCollapsed={isCollapsed}
                isDrawerOpen={isDrawerOpen}
                isMobile={isMobile}
                setIsDrawerOpen={setIsDrawerOpen}
            >
                <Head title="Riwayat Perawatan Gigi" />

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
                    <SearchInput
                        keyword={keyword}
                        setKeyword={(e) => setKeyword(e.target.value)}
                        placeholder={"Cari nomor kartu"}
                    />

                    <Divider />

                    <Table
                        columns={columns}
                        dataSource={dataItems}
                        pagination={false}
                        size="small"
                        loading={isLoading || isRefetching}
                        rowKey={"id"}
                        scroll={{ y: tableHeight, x: 1000 }}
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
