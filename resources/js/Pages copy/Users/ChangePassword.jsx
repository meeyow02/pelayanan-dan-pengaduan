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

export default function ChangePasswordIndex() {
    // State
    const [formKey, setFormKey] = useState(Date.now());

    // Hooks
    const [form] = Form.useForm();
    const { data, setData, put, processing, reset, errors } = useForm({
        password: null,
        password_confirmation: null,
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
        setTitle("Ubah Password");
    }, [setTitle]);

    // Handlers
    const submit = async () => {
        const url = route("user-management.change-password.update");

        try {
            put(url, {
                preserveScroll: true,
                onSuccess: (response) => {
                    messageApi.success(
                        response?.props?.message || "Berhasil mengubah password"
                    );
                },
                onError: (errors) => {
                    const firstError = Object.values(errors)[0];
                    messageApi.error(firstError || "Terjadi kesalahan.");
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
                                    label="Password Baru"
                                    name="password"
                                    type="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Password harus diisi",
                                        },
                                        {
                                            pattern:
                                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/,
                                            message:
                                                "Password minimal 8 karakter, harus mengandung huruf besar, huruf kecil, angka, dan simbol.",
                                        },
                                    ]}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    password
                                    error={errors.password}
                                />

                                <CustomInput
                                    label="Konfirmasi Password"
                                    name="password_confirmation"
                                    type="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Konfirmasi password harus diisi",
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (
                                                    !value ||
                                                    value === data.password
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        "Konfirmasi password tidak cocok"
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    error={errors.password_confirmation}
                                    password
                                />

                                <Flex
                                    justify="center"
                                    gap={16}
                                    className="mt-10"
                                >
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
