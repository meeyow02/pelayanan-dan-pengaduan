import CustomButton from "@/Components/CustomButton";
import CustomInput from "@/Components/CustomInput";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { LoadingOutlined } from "@ant-design/icons";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Card, Col, Flex, Form, message, Row, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import useTitleStore from "@/store/titleStore";
import SearchableDropdown from "@/Components/SearchableDropdown";

const regionOptions = [
    { value: "KAB. BURU", label: "KAB. BURU" },
    { value: "KAB. BURU SELATAN", label: "KAB. BURU SELATAN" },
    { value: "KAB. KEPULAUAN ARU", label: "KAB. KEPULAUAN ARU" },
    { value: "KAB. MALUKU TENGAH", label: "KAB. MALUKU TENGAH" },
    { value: "KAB. MALUKU BARAT DAYA", label: "KAB. MALUKU BARAT DAYA" },
    { value: "KAB. MALUKU TENGGARA", label: "KAB. MALUKU TENGGARA" },
    { value: "KAB. SERAM BAGIAN BARAT", label: "KAB. SERAM BAGIAN BARAT" },
    { value: "KAB. SERAM BAGIAN TIMUR", label: "KAB. SERAM BAGIAN TIMUR" },
    { value: "KAB. MALUKU TENGGARA BARAT", label: "KAB. MALUKU TENGGARA BARAT" },
    { value: "KOTA AMBON", label: "KOTA AMBON" },
    { value: "KOTA TUAL", label: "KOTA TUAL" },
];

export default function HealthFacilityForm() {
    // State
    const [formKey, setFormKey] = useState(Date.now());

    // Hooks
    const [form] = Form.useForm();
    const { data, setData, post, processing, reset, errors } = useForm({
        code: null,
        name: null,
        region: null,
    });
    const { setTitle } = useTitleStore();
    const { flash, healthFacility } = usePage().props;
    const { isMobile, isTablet } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsCollapsed, setIsDrawerOpen } =
        useSidebarStore();

    const [messageApi, contextHolder] = message.useMessage();

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
        if (healthFacility) {
            setTitle("Edit Data Fasilitas Kesehatan");
        } else {
            setTitle("Tambah Data Fasilitas Kesehatan");
        }
    }, [setTitle, healthFacility]);

    useEffect(() => {
        if (healthFacility) {
            form.setFieldsValue(healthFacility);
            setData("code", healthFacility.code);
            setData("name", healthFacility.name);
            setData("region", healthFacility.region);
        }
    }, [healthFacility]);

    // Handlers
    const submit = async () => {
        const url = healthFacility
            ? route("health-facility-management.update", { id: healthFacility.id })
            : route("health-facility-management.store");

        try {
            post(url, {
                preserveScroll: true,
                onSuccess: (response) => {
                    messageApi.success(
                        response?.props?.message || "Berhasil menyimpan data"
                    );
                },
                onError: (errors) => {
                    const firstError = Object.values(errors)[0];
                    messageApi.error(
                        firstError || "Terjadi kesalahan validasi."
                    );
                },
            });
        } catch (error) {
            console.log(error);
            messageApi.error("Terjadi kesalahan, silakan coba lagi.");
        }
    };

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
                <Head title="Fasilitas Kesehatan" />

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
                            span={24}
                            className="bg-primary-500"
                            id="custom-card"
                            style={{
                                position: "relative",
                            }}
                        >
                            {processing && (
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
                                    filter: processing ? "blur(3px)" : "none", // Blur form saat loading
                                    pointerEvents: processing ? "none" : "auto", // Nonaktifkan interaksi saat loading
                                    transition: "all 0.3s ease-in-out",
                                }}
                            >
                                <CustomInput
                                    label="Kode Faskes"
                                    name="code"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Kode Faskes harus diisi",
                                        },
                                    ]}
                                    value={data.code}
                                    onChange={(e) =>
                                        setData("code", e.target.value)
                                    }
                                    error={errors.code}
                                />

                                <CustomInput
                                    label="Nama Faskes"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Nama Faskes harus diisi",
                                        },
                                    ]}
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    error={errors.name}
                                />

                                <SearchableDropdown
                                    label={"Wilayah"}
                                    value={data.region}
                                    options={regionOptions}
                                    onChange={(value) =>
                                        setData("region", value)
                                    }
                                />

                                <Flex justify="center" gap={16}>
                                    <CustomButton
                                        loading={processing}
                                        disabled={processing}
                                        size="medium"
                                        htmlType="submit"
                                        variant={
                                            processing ? "disabled" : "success"
                                        }
                                    >
                                        Simpan
                                    </CustomButton>
                                </Flex>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </MainLayout>
        </>
    );
}
