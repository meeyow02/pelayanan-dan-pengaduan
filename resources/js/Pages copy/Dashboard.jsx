import CustomButton from "@/Components/CustomButton";
import CustomInput from "@/Components/CustomInput";
import CustomInputDosage from "@/Components/CustomInputDosage";
import { useResponsive } from "@/hooks/useResponsive";
import dayjs from "dayjs";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { LoadingOutlined } from "@ant-design/icons";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    Card,
    Col,
    Descriptions,
    Divider,
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
import { insulinPenHistoryService } from "@/services/insulinPenHistoryService";

const getTableColumns = (dataParams) => [
    {
        title: "No",
        render: (text, record, index) =>
            (dataParams.page - 1) * dataParams.limit + index + 1,
        key: "no",
        align: "center",
        width: 1.5,
        fixed: "left",
    },
    {
        title: "Nomor Kartu",
        dataIndex: ["patient", "card_number"],
        key: "card_number",
        width: 3,
        render: (text, record) => (
            <div className="line-clamp-2">
                {record.patient?.card_number || "-"}
            </div>
        ),
    },
    {
        title: "Tanggal",
        dataIndex: "given_date",
        key: "given_date",
        width: 3,
        render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
        title: "Pen yang Diberikan",
        dataIndex: "total_pen",
        key: "total_pen",
        width: 4,
        render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
        title: "Sisa Pen",
        dataIndex: "remaining_pen_next_month",
        key: "remaining_pen_next_month",
        width: 2,
        render: (text) => <div className="line-clamp-2">{text}</div>,
    },
    {
        title: "Faskes Pengambilan",
        dataIndex: ["user", "health_facility", "name"],
        key: "name",
        width: 4,
        render: (text) => <div className="line-clamp-2">{text || "-"}</div>,
    },
];

export default function Dashboard() {
    // State
    const [formKey, setFormKey] = useState(Date.now());
    const [calculatedData, setCalculatedData] = useState({
        pen_monthly: 0,
        point_one_pen: 0,
        one_pen_days: 0,
        point_one_pen_days: 0,
        point_one_pen_hours: 0,
        dosage_next_month: 0,
    });
    const [dataParams, setDataParams] = useState({
        limit: 5,
        page: 1,
        search: null,
    });
    const [isCounting, setIsCounting] = useState(false);
    const [isCounted, setIsCounted] = useState(false);
    const [isCheckHistory, setIsCheckHistory] = useState(false);

    // Hooks
    const [form] = Form.useForm();
    const { data, setData, post, processing, reset } = useForm({
        card_number: "",
        pen_given: 0,
        date_given: null,
        day_dose: null,
        afternoon_dose: null,
        evening_dose: null,
        night_dose: null,
    });
    const { setTitle } = useTitleStore();
    const { flash, auth } = usePage().props;
    const { isMobile, isTablet } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsCollapsed, setIsDrawerOpen } =
        useSidebarStore();
    const queryClient = useQueryClient();

    const [messageApi, contextHolder] = message.useMessage();

    const userRole = auth?.user?.role;
    const isAdminOrApotek = userRole === "admin" || userRole === "apotek";

    const {
        data: insulinPenHistoryData,
        isLoading,
        isRefetching,
    } = useQuery({
        queryKey: ["insulin-pen-history", dataParams],
        queryFn: () => insulinPenHistoryService.fetchAll(dataParams),
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
        setTitle("Insulin");
    }, [setTitle]);

    // Handlers
    const submit = async () => {
        try {
            setIsCounting(true);
            post(route("dashboard"), {
                preserveScroll: true,

                onSuccess: () => {
                    queryClient.invalidateQueries("insulin-pen-history");

                    setDataParams((prev) => ({
                        ...prev,
                        search: data.card_number,
                    }));
                    setIsCounting(false);
                    setIsCounted(false);
                },
                onError: () => {
                    setIsCounting(false);
                },
            });
        } catch (error) {
            messageApi.error("Terjadi kesalahan, silakan coba lagi.");
        }
    };

    const calculatePenResult = (data) => {
        setIsCounting(true);
        setIsCounted(true);

        setTimeout(() => {
            const dayDose = data.day_dose ? parseInt(data.day_dose) : 0;
            const afternoonDose = data.afternoon_dose
                ? parseInt(data.afternoon_dose)
                : 0;
            const eveningDose = data.evening_dose
                ? parseInt(data.evening_dose)
                : 0;
            const nightDose = data.night_dose ? parseInt(data.night_dose) : 0;
            const daily_dose = (
                dayDose +
                afternoonDose +
                eveningDose +
                nightDose
            ).toFixed(1);

            const one_pen_days = (300 / daily_dose).toFixed(1);
            const point_one_pen = ((one_pen_days / 10) * 24).toFixed(1);
            const pen_monthly = ((daily_dose * 30) / 300).toFixed(1);
            const point_one_pen_days = Math.floor(point_one_pen / 24);
            const point_one_pen_hours = (point_one_pen % 24).toFixed(1);
            const dosage_next_month = (data.pen_given - pen_monthly).toFixed(1);

            setCalculatedData({
                one_pen_days,
                point_one_pen,
                pen_monthly,
                point_one_pen_days,
                point_one_pen_hours,
                dosage_next_month,
            });
            setIsCounting(false);
            messageApi.success("Hasil perhitungan selesai");
        }, 1500);
    };

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

    const resetCalculation = () => {
        setCalculatedData({
            pen_monthly: 0,
            point_one_pen: 0,
            one_pen_days: 0,
            point_one_pen_days: 0,
            point_one_pen_hours: 0,
            dosage_next_month: 0,
        });
    };

    // Data hasil query (jika belum ada, gunakan array kosong)
    const dataItems = insulinPenHistoryData?.data || [];

    const whiteSpinner = (
        <LoadingOutlined style={{ fontSize: 40, color: "white" }} spin />
    );

    return (
        <>
            {contextHolder}
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
                            padding: 0,
                        },
                    }}
                >
                    <Row
                        gutter={16}
                        style={{
                            flexDirection: isMobile ? "column" : "row",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Col
                            span={isMobile ? 24 : 14}
                            className="bg-primary-500"
                            id="left-col-insulin"
                            style={{
                                position: "relative",
                            }}
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
                                key={formKey}
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

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <CustomInput
                                            label="Jumlah pen yang diberikan"
                                            name="pen_given"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Jumlah pen harus diisi",
                                                },
                                            ]}
                                            type="number"
                                            value={data.pen_given}
                                            onChange={(e) =>
                                                setData(
                                                    "pen_given",
                                                    e.target.value
                                                )
                                            }
                                            isDisabled={!isCheckHistory}
                                            inputProps={{ min: 0 }}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <CustomInput
                                            date
                                            label="Tanggal pemberian"
                                            name="date_given"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Tanggal pemberian harus diisi",
                                                },
                                            ]}
                                            style={{
                                                width: "100%",
                                                paddingTop: 8,
                                                paddingBottom: 8,
                                            }}
                                            value={data.date_given}
                                            onChange={(date, dateString) =>
                                                setData(
                                                    "date_given",
                                                    dateString
                                                )
                                            }
                                            isDisabled={!isCheckHistory}
                                            inputProps={{
                                                disabledDate: disabledDate,
                                                placeholder: "",
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <CustomInputDosage
                                    label="Jumlah dosis harian (unit)"
                                    value1={data.day_dose}
                                    onChange1={(e) =>
                                        setData("day_dose", e.target.value)
                                    }
                                    value2={data.afternoon_dose}
                                    onChange2={(e) =>
                                        setData(
                                            "afternoon_dose",
                                            e.target.value
                                        )
                                    }
                                    value3={data.evening_dose}
                                    onChange3={(e) =>
                                        setData("evening_dose", e.target.value)
                                    }
                                    value4={data.night_dose}
                                    onChange4={(e) =>
                                        setData("night_dose", e.target.value)
                                    }
                                    isDisabled={!isCheckHistory}
                                />

                                <Flex
                                    justify="center"
                                    gap={16}
                                    style={{ marginTop: 32 }}
                                >
                                    <CustomButton
                                        loading={processing}
                                        disabled={
                                            !processing &&
                                            (!isCounted || !isAdminOrApotek)
                                        }
                                        size="medium"
                                        htmlType="submit"
                                        variant={
                                            !processing &&
                                            (!isCounted || !isAdminOrApotek)
                                                ? "disabled"
                                                : "success"
                                        }
                                    >
                                        Simpan
                                    </CustomButton>

                                    <CustomButton
                                        size="medium"
                                        variant={
                                            !data.pen_given ||
                                            (!data.day_dose &&
                                                !data.afternoon_dose &&
                                                !data.evening_dose &&
                                                !data.night_dose)
                                                ? "disabled"
                                                : "danger"
                                        }
                                        disabled={
                                            !data.pen_given ||
                                            (!data.day_dose &&
                                                !data.afternoon_dose &&
                                                !data.evening_dose &&
                                                !data.night_dose)
                                        }
                                        onClick={() => calculatePenResult(data)}
                                    >
                                        Hitung
                                    </CustomButton>
                                </Flex>

                                <Divider
                                    variant="solid"
                                    style={{ backgroundColor: "#fff" }}
                                    className="mb-0"
                                />

                                <Flex
                                    justify="space-between"
                                    align="center"
                                    className="mt-5"
                                >
                                    <span className="m-0 text-base font-semibold">
                                        Hasil Perhitungan
                                    </span>

                                    <CustomButton
                                        size="medium"
                                        htmlType="submit"
                                        variant="white"
                                        className="mt-0"
                                        onClick={resetCalculation}
                                    >
                                        Reset
                                    </CustomButton>
                                </Flex>
                                <Descriptions
                                    column={{
                                        xxl: 2,
                                        xl: 2,
                                        lg: 2,
                                        md: 1,
                                        sm: 1,
                                        xs: 1,
                                    }}
                                    bordered
                                    size="small"
                                    style={{ marginTop: 20 }}
                                    className="custom-description"
                                >
                                    <Descriptions.Item label="Jumlah penggunaan pen dalam sebulan">
                                        <span className="font-bold text-nowrap">
                                            {calculatedData.pen_monthly} pen
                                        </span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Waktu penggunaan 0.1 pen (hari & jam)">
                                        <span className="font-bold text-nowrap">
                                            {calculatedData.point_one_pen_days}{" "}
                                            hari{" "}
                                            {calculatedData.point_one_pen_hours}{" "}
                                            jam
                                        </span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Waktu penggunaan 1 pen">
                                        <span className="font-bold text-nowrap">
                                            {Math.round(
                                                calculatedData.one_pen_days
                                            )}{" "}
                                            hari
                                        </span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Sisa pen untuk bulan depan">
                                        <span className="font-bold text-red-500 text-nowrap">
                                            {calculatedData.dosage_next_month}{" "}
                                            pen
                                        </span>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Form>
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
                                Riwayat Pen Insulin
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
