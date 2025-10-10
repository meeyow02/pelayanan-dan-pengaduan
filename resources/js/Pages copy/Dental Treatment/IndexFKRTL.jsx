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
    Modal,
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
import CustomSelect from "@/Components/CustomSelect";
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
        title: "Nomor SEP",
        dataIndex: "sep_number",
        key: "sep_number",
        width: 2,
        render: (text) => <div className="line-clamp-2">{text || "-"}</div>,
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAllowed, setIsAllowed] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState(true);

    // Hooks
    const [form] = Form.useForm();
    const { data, setData, post, processing } = useForm({
        card_number: "",
        dental_treatment_id: null,
        visit_date: null,
        category: null,
        sep_number: null,
        action: null,
        teeth_numbers: null,
    });
    const { setTitle } = useTitleStore();
    const { flash } = usePage().props;
    const { isMobile, isTablet } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsCollapsed, setIsDrawerOpen } =
        useSidebarStore();
    const queryClient = useQueryClient();

    const [messageApi, contextHolder] = message.useMessage();

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
        const item = dentalTreatmentHistoryData?.data?.[0]; // Ambil data pertama dari riwayat
        if (item) {
            setIsInputDisabled(false);
            if (item.isRefer) {
                setData({
                    ...data,
                    dental_treatment_id: item.id,
                    category: item.tooth_type || null,
                    teeth_numbers: item.tooth_numbers.numbers.map(Number) || [],
                });

                setCategory(item.tooth_type || null);

                setTeethSelection((prev) => ({
                    ...prev,
                    perawatan:
                        item.tooth_numbers.action === "perawatan"
                            ? item.tooth_numbers.numbers.map(Number) // pastikan angka
                            : [],
                    ekstraksi:
                        item.tooth_numbers.action === "ekstraksi"
                            ? item.tooth_numbers.numbers.map(Number)
                            : [],
                }));
            } else {
                showModal();
            }
        }
    }, [dentalTreatmentHistoryData]);

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
        setTitle("Gigi - FKRTL");
    }, [setTitle]);

    // Handlers
    const submit = async () => {
        try {
            setIsCounting(true);
            router.post(
                route("tooth.fkrtl.store"),
                {
                    ...data,
                    sep_number: data.sep_number,
                    visit_date: data.visit_date,
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
        const visitDate = dayjs(
            dentalTreatmentHistoryData?.data?.[0]?.visit_date
        );
        const now = dayjs(data.visit_date);

        setIsCounting(true);

        setTimeout(() => {
            if (visitDate.isBefore(now.subtract(1, "month"))) {
                setIsAllowed(false);
                setIsCounting(false);
                messageApi.error(
                    "Rujukan sudah tidak berlaku (lebih dari 1 bulan)"
                );
                return;
            } else {
                setIsCounting(false);
                setIsAllowed(true);
                messageApi.success("Rujukan masih berlaku");
            }
        }, 1500);
    };

    const whiteSpinner = (
        <LoadingOutlined style={{ fontSize: 40, color: "white" }} spin />
    );

    // Table
    const columns = getTableColumns(dataParams);

    // Data hasil query (jika belum ada, gunakan array kosong)
    const dataItems = dentalTreatmentHistoryData?.data || [];

    // Function untuk membuka modal konfirmasi
    const showModal = () => {
        setIsModalOpen(true);
    };

    // Function untuk menutup modal
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Function untuk submit setelah konfirmasi
    const handleConfirmSubmit = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {contextHolder}

            <Modal
                title="Info"
                open={isModalOpen}
                onOk={handleConfirmSubmit}
                onCancel={handleCancel}
                okText="OK"
                cancelText="Batal"
            >
                <p>Nomor Kartu ini tidak memiliki rujukan dari puskesmas.</p>
            </Modal>

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
                                    label="Nomor SEP"
                                    name="sep_number"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Nomor SEP harus diisi",
                                        },
                                        {
                                            pattern: /^[A-Za-z0-9]{19}$/,
                                            message:
                                                "Nomor Kartu harus 19 digit angka dan huruf",
                                        },
                                    ]}
                                    style={{
                                        width: "100%",
                                        paddingTop: 8,
                                        paddingBottom: 8,
                                    }}
                                    value={data.sep_number}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            sep_number: e.target.value,
                                        })
                                    }
                                    inputProps={{
                                        placeholder: "Masukkan nomor SEP",
                                    }}
                                    isDisabled={isInputDisabled}
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
                                    isDisabled={isInputDisabled}
                                />

                                <CustomSelect
                                    label="Kategori Gigi"
                                    placeholder="Pilih kategori gigi"
                                    value={category}
                                    onChange={(value) => setCategory(value)}
                                    options={[
                                        { value: "child", label: "Anak-Anak" },
                                        { value: "adult", label: "Dewasa" },
                                    ]}
                                    isDisabled
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
                                    isDisabled
                                />
                            )}

                            {category === "adult" && (
                                <AdultTeethSelect
                                    teethSelection={teethSelection}
                                    setTeethSelection={setTeethSelection}
                                    isDisabled
                                />
                            )}

                            <Flex
                                justify="center"
                                style={{ marginTop: 20 }}
                                gap={16}
                            >
                                <CustomButton
                                    loading={processing}
                                    disabled={!processing && !isAllowed}
                                    size="medium"
                                    htmlType="submit"
                                    variant={
                                        !processing && !isAllowed
                                            ? "disabled"
                                            : "primary"
                                    }
                                >
                                    Simpan
                                </CustomButton>

                                <CustomButton
                                    size="medium"
                                    variant={
                                        data.visit_date ? "danger" : "disabled"
                                    }
                                    onClick={handleCount}
                                    disabled={data.visit_date ? false : true}
                                >
                                    Hitung
                                </CustomButton>
                            </Flex>
                        </div>
                    </Form>
                </Card>
            </MainLayout>
        </>
    );
}
