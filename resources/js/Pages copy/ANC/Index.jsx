import CustomButton from "@/Components/CustomButton";
import CustomInput from "@/Components/CustomInput";
import { useResponsive } from "@/hooks/useResponsive";
import dayjs from "dayjs";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { LoadingOutlined } from "@ant-design/icons";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    Card,
    Col,
    Divider,
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
import AncTable from "@/Components/ANCTable";
import ANCSelect from "@/Components/ANCSelect";
import { ancHistoryService } from "@/services/ancHistoryService";

const getTableColumns = (dataParams) => [
    {
        title: "No",
        render: (text, record, index) =>
            (dataParams.page - 1) * dataParams.limit + index + 1,
        key: "no",
        align: "center",
        width: 0.5,
        fixed: "left",
    },
    {
        title: "ANC ke-",
        dataIndex: "anc_type",
        key: "anc_type",
        width: 1,
        align: "center",
        render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
        title: "Trisemester",
        dataIndex: "trisemester",
        key: "trisemester",
        width: 2,
        align: "center",
        render: (text) => <div className="line-clamp-2">{text}</div>,
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
        title: "Faskes Pemeriksaan",
        dataIndex: ["user", "health_facility", "name"],
        key: "name",
        width: 1,
        render: (text) => <div className="line-clamp-2">{text || "-"}</div>,
    },
];

export default function ANCIndex() {
    // State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hpht, setHpht] = useState(null);
    const [selectedANC, setSelectedANC] = useState(null);
    const [isCounted, setIsCounted] = useState(false);
    const [dataParams, setDataParams] = useState({
        limit: 5,
        page: 1,
        search: null,
    });
    const [isCounting, setIsCounting] = useState(false);
    const [isCheckHistory, setIsCheckHistory] = useState(false);
    const [gestationalAge, setGestationalAge] = useState(null);

    // Hooks
    const [form] = Form.useForm();
    const { data, setData, post, processing } = useForm({
        card_number: "",
        visit_date: null,
        hpht_date: null,
        trisemester: null,
        anc_type: null,
    });
    const { setTitle } = useTitleStore();
    const { flash, auth } = usePage().props;
    const { isMobile, isTablet } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsCollapsed, setIsDrawerOpen } =
        useSidebarStore();
    const queryClient = useQueryClient();

    const [messageApi, contextHolder] = message.useMessage();

    const userRole = auth.user?.role;
    const isAdminOrFKTP = userRole === "admin" || userRole === "fktp";

    const {
        data: ancHistoryData,
        isLoading,
        isRefetching,
    } = useQuery({
        queryKey: ["anc-history", dataParams],
        queryFn: () => ancHistoryService.fetchAll(dataParams),
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
        setTitle("ANC");
    }, [setTitle]);

    useEffect(() => {
        setIsCounted(false);
    }, [hpht, selectedANC]);

    // Handlers
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
        submit();
    };

    const submit = async () => {
        try {
            setIsCounting(true);
            post(route("anc.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    queryClient.invalidateQueries("anc-history");

                    setDataParams((prev) => ({
                        ...prev,
                        search: data.card_number,
                    }));
                    setIsCounting(false);
                    setIsCounted(false);
                    // Reset data inertia
                    setData({
                        card_number: "",
                        visit_date: null,
                        hpht_date: null,
                        anc_type: null,
                        trisemester: null,
                    });

                    // Reset state React
                    setGestationalAge(null);
                    setSelectedANC(null);
                    setHpht(null);

                    // Reset form Ant Design biar input kosong
                    form.resetFields();
                    setIsCheckHistory(false);
                },
                onError: () => {
                    setIsCounting(false);
                },
            });
        } catch (error) {
            messageApi.error("Terjadi kesalahan, silakan coba lagi.");
        }
    };

    const handleCount = () => {
        setIsCounting(true);

        setTimeout(() => {
            setIsCounted(true);
            setIsCounting(false);
            messageApi.success("Hasil perhitungan selesai");
        }, 1500);
    };

    const handleHphtChange = (date, dateString) => {
        setData("hpht_date", dateString);
        setHpht(date);
    };

    const handleVisitDateChange = (date, dateString) => {
        setData("visit_date", dateString);

        if (date) {
            const weeks = date.diff(hpht, "day") / 7;
            setGestationalAge(Math.floor(weeks));
        } else {
            setGestationalAge(null);
        }
    };

    const whiteSpinner = (
        <LoadingOutlined style={{ fontSize: 40, color: "white" }} spin />
    );

    const disabledDate = (current) => {
        // Jika peran pengguna adalah BPJS, tidak ada tanggal yang dinonaktifkan
        if (userRole === "bpjs" || userRole === "admin") {
            return false;
        }
        // Jika bukan BPJS, terapkan batasan 7 hari
        return current && current < dayjs().subtract(7, "day").startOf("day");
    };

    // Table
    const columns = getTableColumns(dataParams);

    // Data hasil query (jika belum ada, gunakan array kosong)
    const dataItems = ancHistoryData?.data || [];

    return (
        <>
            {contextHolder}

            <Modal
                title="Berdasar Permenkes 21 Tahun 2021 pasal 13 ayat 10"
                open={isModalOpen}
                onOk={handleConfirmSubmit}
                onCancel={handleCancel}
                okText="Ya, Simpan"
                cancelText="Batal"
            >
                <p>
                    "Pelayanan Kesehatan Masa kehamilan harus dicatat dalam
                    kartu ibu/rekam medis, formulir pencatatan kohort ibu, dan
                    buku kesehatan ibu dan anak sesuai dengan ketentuan
                    peraturan perundang-undangan"
                </p>
                <br />
                <p className="font-semibold">
                    Apakah pelayanan ini telah anda catat sesuai regulasi?
                </p>
            </Modal>

            <MainLayout
                isCollapsed={isCollapsed}
                isDrawerOpen={isDrawerOpen}
                isMobile={isMobile}
                setIsDrawerOpen={setIsDrawerOpen}
            >
                <Head title="Insulin" />

                <Card
                    styles={{
                        body: {
                            padding: isMobile ? 0 : "inherit", // Hilangkan padding di mobile
                        },
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
                            span={isMobile ? 24 : 12}
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
                                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        zIndex: 10,
                                    }}
                                >
                                    <Spin indicator={whiteSpinner} />
                                </div>
                            )}
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={showModal}
                                requiredMark={false}
                                className="py-3 text-white"
                                style={{
                                    filter: isCounting ? "blur(3px)" : "none", // Blur form saat loading
                                    pointerEvents: isCounting ? "none" : "auto", // Nonaktifkan interaksi saat loading
                                    transition: "all 0.3s ease-in-out",
                                }}
                            >
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
                                        setIsCheckHistory(true);
                                    }}
                                    formInstance={form}
                                />

                                <CustomInput
                                    date
                                    label="Tanggal HPHT"
                                    name="hpht_date"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Tanggal HPHT harus diisi",
                                        },
                                    ]}
                                    style={{
                                        width: "100%",
                                        paddingTop: 8,
                                        paddingBottom: 8,
                                    }}
                                    value={data.visit_date}
                                    onChange={handleHphtChange}
                                    inputProps={{
                                        disabledDate: (current) =>
                                            current && current > dayjs(),
                                        placeholder: "Pilih tanggal HPHT",
                                    }}
                                    isDisabled={!isCheckHistory}
                                />

                                {gestationalAge !== null && (
                                    <div
                                        className="mb-3"
                                        style={{ marginTop: -8 }}
                                    >
                                        <Typography.Text
                                            style={{
                                                color: "white",
                                                fontSize: 12,
                                                fontWeight: 500,
                                            }}
                                        >
                                            Usia Kehamilan: {gestationalAge}{" "}
                                            minggu
                                        </Typography.Text>
                                    </div>
                                )}

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
                                    onChange={handleVisitDateChange}
                                    isDisabled={!isCheckHistory}
                                    inputProps={{
                                        disabledDate: disabledDate,
                                        placeholder: "Pilih tanggal kunjungan",
                                    }}
                                />

                                <ANCSelect
                                    value={selectedANC}
                                    onChange={(value) => {
                                        setSelectedANC(value);
                                        setData("anc_type", value);
                                        if (value === 1) {
                                            setData("trisemester", 1);
                                        } else if ([2, 3].includes(value)) {
                                            setData("trisemester", 2);
                                        } else if ([4, 5, 6].includes(value)) {
                                            setData("trisemester", 3);
                                        }
                                    }}
                                    isDisabled={!isCheckHistory}
                                />

                                <Flex
                                    justify="center"
                                    style={{ marginTop: 20 }}
                                    gap={16}
                                >
                                    <CustomButton
                                        loading={processing}
                                        disabled={
                                            !processing &&
                                            (!isCounted || !isAdminOrFKTP)
                                        }
                                        size="medium"
                                        htmlType="submit"
                                        variant={
                                            !processing &&
                                            (!isCounted || !isAdminOrFKTP)
                                                ? "disabled"
                                                : "success"
                                        }
                                    >
                                        Simpan
                                    </CustomButton>

                                    <CustomButton
                                        size="medium"
                                        variant={
                                            !selectedANC || !hpht
                                                ? "disabled"
                                                : "danger"
                                        }
                                        onClick={handleCount}
                                        disabled={!selectedANC || !hpht}
                                    >
                                        Hitung
                                    </CustomButton>
                                </Flex>
                            </Form>
                        </Col>

                        <Col span={isMobile ? 24 : 12} className="pb-3">
                            <Typography.Title
                                style={{
                                    marginTop: isMobile ? 20 : 0,
                                    color: "#fff",
                                    marginBottom: 0,
                                }}
                                level={5}
                                className="text-center bg-[#00A14C] "
                            >
                                Tabel Bantu Hitung ANC
                            </Typography.Title>

                            <AncTable
                                hpht={hpht}
                                selectedANC={selectedANC}
                                isCounted={isCounted}
                            />

                            <Divider
                                variant="solid"
                                style={{ backgroundColor: "#000" }}
                                className="my-4"
                            />

                            <Typography.Title
                                style={{
                                    marginTop: isMobile ? 20 : 0,
                                    color: "#fff",
                                }}
                                level={5}
                                className="text-center bg-[#00A14C] "
                            >
                                Riwayat ANC
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
                </Card>
            </MainLayout>
        </>
    );
}
