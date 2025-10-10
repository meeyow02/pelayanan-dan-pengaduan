import CustomButton from "@/Components/CustomButton";
import CustomInput from "@/Components/CustomInput";
import { useResponsive } from "@/hooks/useResponsive";
import dayjs from "dayjs";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { LoadingOutlined } from "@ant-design/icons";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import {
    Card,
    Col,
    Flex,
    Form,
    message,
    Row,
    Spin,
    Table,
    Typography,
} from "antd";
import { useEffect, useState } from "react";
import useTitleStore from "@/store/titleStore";
import {
    keepPreviousData,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { useTableHeight } from "@/hooks/useTableHeight";
import CustomSelect from "@/Components/CustomSelect";
import SearchableDropdown from "@/Components/SearchableDropdown";
import ChildTeethSelect from "@/Components/ChildTeethSelect";
import AdultTeethSelect from "@/Components/AdultTeethSelect";
import { dentalTreatmentHistoryService } from "@/services/dentalTreatmentService";

const getTableColumns = (dataParams) => [
    {
        title: "No",
        render: (text, record, index) =>
            (dataParams.page - 1) * dataParams.limit + index + 1,
        key: "no",
        align: "center",
        width: 0.8,
        fixed: "left",
    },
    {
        title: "Nomor Kartu",
        dataIndex: ["patient", "card_number"],
        key: "card_number",
        width: 2,
        render: (text, record) => (
            <div className="line-clamp-2">
                {record.patient?.card_number || "-"}
            </div>
        ),
    },
    {
        title: "No. Gigi",
        dataIndex: ["tooth_numbers", "numbers"],
        key: "tooth_numbers",
        width: 2,
        align: "center",
        render: (text) => (
            <div className="line-clamp-2">
                {text && text.length > 0 ? text.join(", ") : "-"}
            </div>
        ),
    },
    {
        title: "Tanggal Kunjungan",
        dataIndex: "visit_date",
        key: "visit_date",
        width: 2,
        align: "center",
        render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
        title: "Kondisi",
        dataIndex: "isRefer",
        key: "isRefer",
        width: 1.4,
        align: "center",
        render: (isRefer) => (
            <div className="line-clamp-2">
                {isRefer ? "Rujuk" : "Tidak Rujuk"}
            </div>
        ),
    },
    {
        title: "Tujuan Rujukan",
        dataIndex: ["health_facility", "name"],
        key: "health_facility",
        width: 2,
        align: "center",
        render: (text, record) => (
            <div className="line-clamp-2">
                {record.health_facility?.name || "-"}
            </div>
        ),
    },
];

export default function DentalTreatmentIndex() {
    // State
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [condition, setCondition] = useState(null);
    const [category, setCategory] = useState(null);
    const [dataParams, setDataParams] = useState({
        limit: 5,
        page: 1,
        search: null,
    });
    const [isCounting, setIsCounting] = useState(false);
    const [teethSelection, setTeethSelection] = useState({
        perawatan: [],
        ekstraksi: [],
    });

    // Hooks
    const [form] = Form.useForm();
    const { data, setData, post, processing } = useForm({
        card_number: "",
        visit_date: null,
        condition: null,
        category: null,
        health_facility_id: null,
        action: null,
        teeth_numbers: null,
    });
    const { healthFacilities } = usePage().props;
    const { setTitle } = useTitleStore();
    const { flash } = usePage().props;
    const { isMobile, isTablet } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsCollapsed, setIsDrawerOpen } =
        useSidebarStore();
    const queryClient = useQueryClient();

    const [messageApi, contextHolder] = message.useMessage();    

    const facilityOptions = healthFacilities.map((f) => ({
        label: f.name,
        value: f.id,
    }));

    const {
        data: dentalTreatmentHistoryData,
        isLoading,
        isRefetching,
    } = useQuery({
        queryKey: ["dental-treatment-history", dataParams],
        queryFn: () => dentalTreatmentHistoryService.fetchAll(dataParams),
        enabled: !!dataParams.search,
        placeholderData: keepPreviousData,
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
        if (flash.success) {
            messageApi.success(flash.success);
        }
        if (flash.error) {
            messageApi.error(flash.error);
        }
    }, [flash]);

    useEffect(() => {
        setTitle("Gigi - FKTP");
    }, [setTitle]);

    // Handlers
    const submit = async () => {
        try {
            setIsCounting(true);
            router.post(
                route("tooth.fktp.store"),
                {
                    ...data,
                    category: category,
                    condition: condition,
                    health_facility_id: selectedFacility,
                    action:
                        teethSelection.ekstraksi.length > 0
                            ? "ekstraksi"
                            : "perawatan",
                    teeth_numbers:
                        teethSelection.ekstraksi.length > 0
                            ? teethSelection.ekstraksi
                            : teethSelection.perawatan,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        queryClient.invalidateQueries(
                            "dental-treatment-history"
                        );

                        setDataParams((prev) => ({
                            ...prev,
                            search: data.card_number,
                        }));
                        setIsCounting(false);
                    },
                    onError: () => {
                        setIsCounting(false);
                    },
                }
            );
        } catch (error) {
            messageApi.error("Terjadi kesalahan, silakan coba lagi.");
        }
    };

    const handleCount = () => {
        setIsCounting(true);

        setTimeout(() => {
            setIsCounting(false);
            messageApi.success("Hasil perhitungan selesai");
        }, 1500);
    };

    const whiteSpinner = (
        <LoadingOutlined style={{ fontSize: 40, color: "white" }} spin />
    );

    // Table
    const columns = getTableColumns(dataParams);

    // Data hasil query (jika belum ada, gunakan array kosong)
    const dataItems = dentalTreatmentHistoryData?.data || [];

    return (
        <>
            {contextHolder}

            <MainLayout
                isCollapsed={isCollapsed}
                isDrawerOpen={isDrawerOpen}
                isMobile={isMobile}
                setIsDrawerOpen={setIsDrawerOpen}
            >
                <Head title="Gigi" />

                <Card
                    styles={{
                        body: {
                            padding: isMobile ? 0 : "inherit", // Hilangkan padding di mobile
                        },
                    }}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={submit}
                        requiredMark={false}
                        className="py-3 text-white"
                        style={{
                            filter: isCounting ? "blur(3px)" : "none", // Blur form saat loading
                            pointerEvents: isCounting ? "none" : "auto", // Nonaktifkan interaksi saat loading
                            transition: "all 0.3s ease-in-out",
                        }}
                    >
                        <Row
                            gutter={isMobile ? 0 : 16} // Hilangkan gutter di mobile
                            style={{
                                flexDirection: isMobile ? "column" : "row",
                                marginLeft: isMobile ? 0 : "inherit", // Pastikan tidak ada margin negatif
                                marginRight: isMobile ? 0 : "inherit",
                            }}
                        >
                            <Col
                                span={isMobile ? 24 : 14}
                                style={{
                                    padding: isMobile ? 16 : 8, // Tambahkan padding di mobile
                                    position: "relative",
                                    overflow: "hidden", // Pastikan konten tidak overflow
                                }}
                                className="bg-primary-500"
                                id="left-col-insulin"
                            >
                                {isCounting && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor:
                                                "rgba(0, 0, 0, 0.6)",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            zIndex: 10,
                                        }}
                                    >
                                        <Spin indicator={whiteSpinner} />
                                    </div>
                                )}

                                <CustomInput
                                    label="Nomor Kartu"
                                    name="card_number"
                                    value={data.card_number}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            card_number: e.target.value,
                                        })
                                    }
                                    rules={[
                                        {
                                            required: true,
                                            message: "Nomor Kartu harus diisi",
                                        },
                                        {
                                            pattern: /^\d{13}$/,
                                            message:
                                                "Nomor Kartu harus 13 digit angka",
                                        },
                                    ]}
                                    inputProps={{ autoComplete: "off" }}
                                    placeholder={"Masukkan nomor kartu"}
                                    button
                                    onclickButton={() => {
                                        setDataParams((prev) => ({
                                            ...prev,
                                            search: data.card_number,
                                        }));
                                    }}
                                    formInstance={form}
                                />

                                <CustomInput
                                    date
                                    label="Tanggal kunjungan"
                                    name="visit_date"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Tanggal kunjungan harus diisi",
                                        },
                                    ]}
                                    style={{
                                        width: "100%",
                                        paddingTop: 8,
                                        paddingBottom: 8,
                                    }}
                                    value={data.visit_date}
                                    onChange={(date, dateString) =>
                                        setData("visit_date", dateString)
                                    }
                                    inputProps={{
                                        disabledDate: (current) =>
                                            current &&
                                            current <
                                                dayjs()
                                                    .subtract(7, "day")
                                                    .startOf("day"),
                                        placeholder: "Pilih tanggal kunjungan",
                                    }}
                                />

                                <CustomSelect
                                    label="Kondisi"
                                    placeholder="Pilih kondisi"
                                    value={condition}
                                    onChange={(value) => setCondition(value)}
                                    options={[
                                        { value: true, label: "Rujuk" },
                                        { value: false, label: "Tidak Rujuk" },
                                    ]}
                                />

                                {condition && (
                                    <SearchableDropdown
                                        label="Faskes Rujukan"
                                        options={facilityOptions}
                                        value={selectedFacility}
                                        onChange={setSelectedFacility}
                                        placeholder="Cari fasilitas kesehatan"
                                    />
                                )}

                                <CustomSelect
                                    label="Kategori Gigi"
                                    placeholder="Pilih kategori gigi"
                                    value={category}
                                    onChange={(value) => setCategory(value)}
                                    options={[
                                        { value: "child", label: "Anak-Anak" },
                                        { value: "adult", label: "Dewasa" },
                                    ]}
                                />
                            </Col>

                            <Col span={isMobile ? 24 : 10} className="pb-3">
                                <Typography.Title
                                    style={{
                                        marginTop: isMobile ? 20 : 0,
                                        color: "#fff",
                                        marginBottom: 0,
                                    }}
                                    level={5}
                                    className="text-center bg-[#00A14C] "
                                >
                                    Riwayat Perawatan Gigi
                                </Typography.Title>

                                <Table
                                    columns={columns}
                                    dataSource={dataItems}
                                    pagination={false}
                                    size="small"
                                    loading={isLoading || isRefetching}
                                    rowKey={"id"}
                                    tableLayout="fixed"
                                    style={{ marginTop: 20 }}
                                />
                            </Col>
                        </Row>

                        <div className="mt-8">
                            {category && (
                                <Flex justify="center">
                                    <img
                                        src={`/gigi/${category}.jpg`}
                                        alt={`Gigi ${
                                            category === "child"
                                                ? "anak-anak"
                                                : "dewasa"
                                        }`}
                                        style={{
                                            width: "40em",
                                            height: "auto",
                                            borderRadius: 8,
                                        }}
                                    />
                                </Flex>
                            )}

                            {category === "child" && (
                                <ChildTeethSelect
                                    teethSelection={teethSelection}
                                    setTeethSelection={setTeethSelection}
                                />
                            )}

                            {category === "adult" && (
                                <AdultTeethSelect
                                    teethSelection={teethSelection}
                                    setTeethSelection={setTeethSelection}
                                />
                            )}

                            <Flex
                                justify="center"
                                style={{ marginTop: 20 }}
                                gap={16}
                            >
                                <CustomButton
                                    loading={processing}
                                    disabled={processing}
                                    size="medium"
                                    htmlType="submit"
                                    variant="success"
                                >
                                    Simpan
                                </CustomButton>
                            </Flex>
                        </div>
                    </Form>
                </Card>
            </MainLayout>
        </>
    );
}
