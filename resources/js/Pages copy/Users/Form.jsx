import CustomButton from "@/Components/CustomButton";
import CustomInput from "@/Components/CustomInput";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { LoadingOutlined } from "@ant-design/icons";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Card, Col, Flex, Form, message, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import useTitleStore from "@/store/titleStore";
import CustomSelect from "@/Components/CustomSelect";
import SearchableDropdown from "@/Components/SearchableDropdown";

const genderOptions = [
    { value: "male", label: "Laki-laki" },
    { value: "female", label: "Perempuan" },
];

const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "bpjs", label: "BPJS" },
    { value: "fkrtl", label: "FKRTL" },
    { value: "fktp", label: "FKTP" },
    { value: "apotek", label: "Apotek" },
];

export default function UserForm() {
    // State
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [formKey, setFormKey] = useState(Date.now());

    // Hooks
    const [form] = Form.useForm();
    const { data, setData, post, processing, reset, errors } = useForm({
        name: null,
        gender: null,
        health_facility_id: null,
        email: null,
        role: null,
        username: null,
        division: null,
    });
    const { setTitle } = useTitleStore();
    const { flash, healthFacilities, user } = usePage().props;
    const { isMobile, isTablet } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsCollapsed, setIsDrawerOpen } =
        useSidebarStore();

    const [messageApi, contextHolder] = message.useMessage();

    const facilityOptions = healthFacilities.map((f) => ({
        label: f.name,
        value: f.id,
    }));

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
        if (user) {
            setTitle("Edit Data User");
        } else {
            setTitle("Tambah Data User");
        }
    }, [setTitle, user]);

    useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
            setData("name", user.name);
            setData("gender", user.gender);
            setData("health_facility_id", user.health_facility_id);
            setData("email", user.email);
            setData("role", user.role);
            setData("username", user.username);
            setData("division", user.division);
        }
    }, [user]);

    // Handlers
    const submit = async () => {
        const url = user
            ? route("user-management.update", { id: user.id })
            : route("user-management.store");

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
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <CustomInput
                                            label="Nama"
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Nama harus diisi",
                                                },
                                            ]}
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            error={errors.name}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <CustomSelect
                                            label={"Jenis Kelamin"}
                                            value={data.gender}
                                            options={genderOptions}
                                            onChange={(value) =>
                                                setData("gender", value)
                                            }
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <CustomInput
                                            label="Username"
                                            name="username"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Username harus diisi",
                                                },
                                            ]}
                                            value={data.username}
                                            onChange={(e) =>
                                                setData(
                                                    "username",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <CustomInput
                                            label="Email"
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "email harus diisi",
                                                },
                                                {
                                                    type: "email",
                                                    message:
                                                        "Format email tidak valid",
                                                },
                                            ]}
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            error={errors.email}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <CustomSelect
                                            label={"Role"}
                                            value={data.role}
                                            options={roleOptions}
                                            onChange={(value) =>
                                                setData("role", value)
                                            }
                                        />
                                    </Col>
                                </Row>

                                <SearchableDropdown
                                    label="Fasilitas Kesehatan"
                                    options={facilityOptions}
                                    value={data.health_facility_id}
                                    onChange={(value) => {
                                        setSelectedFacility(value);
                                        setData("health_facility_id", value); // ← ini penting
                                    }}
                                    placeholder="Cari fasilitas kesehatan"
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
