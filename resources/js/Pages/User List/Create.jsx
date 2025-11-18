import { Button, Col, Input, Row, Select, Typography, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, router, usePage } from "@inertiajs/react";
import { Card, Form, message } from "antd";
import useTitleStore from "@/store/titleStore";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import CustomInput from "@/Components/CustomInput";

export default function Create() {
    // Hooks
    const [form] = Form.useForm();
    const { setTitle } = useTitleStore();
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const { flash } = usePage().props;

    const { isMobile } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsDrawerOpen } = useSidebarStore();

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setTitle("Tambah User");
    }, [setTitle]);

    useEffect(() => {
        if (flash?.success) {
            messageApi.success(flash.success);
        }
        if (flash?.error) {
            messageApi.error(flash.error);
        }
    }, [flash, messageApi]);

    const handleSubmit = (values) => {
        setUploading(true);

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("username", values.username);
        formData.append("phone_number", values.phone_number);
        formData.append("password", values.password);
        formData.append("password_confirmation", values.password_confirmation);
        formData.append("role", values.role);

        router.post(route("user-list.store"), formData, {
            forceFormData: true,
            onFinish: () => {
                setUploading(false);
            },
        });
    };

    const handleBack = () => {
        router.visit(route("user-list.index"));
    };

    return (
        <>
            {contextHolder}
            <MainLayout
                isCollapsed={isCollapsed}
                isDrawerOpen={isDrawerOpen}
                isMobile={isMobile}
                setIsDrawerOpen={setIsDrawerOpen}
            >
                <Head title="Tambah User" />

                <Card
                    styles={{
                        body: {
                            paddingLeft: 0,
                            paddingRight: 0,
                        },
                    }}
                >
                    <Typography.Title
                        level={isMobile ? 4 : 2}
                        style={{
                            textAlign: "center",
                            marginBottom: 32,
                        }}
                    >
                        Form Pengisian Tambah User
                    </Typography.Title>

                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        layout="vertical"
                        style={{
                            padding: isMobile ? "1rem" : "1.1rem",
                            margin: isMobile ? "0" : "auto 2rem",
                        }}
                    >
                        {isMobile ? (
                            <>
                                <Form.Item
                                    blackLabel
                                    label="Nama"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Nama Lengkap harus diisi",
                                        },
                                    ]}
                                >
                                    <Input 
                                        placeholder="Masukkan Nama Lengkap"
                                        className="rounded-md border-grey-400 focus:border-primary-400 focus:border-0"
                                    />
                                </Form.Item>

                                <Form.Item
                                    blackLabel
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Email harus diisi",
                                        },
                                    ]}
                                >
                                    <Input 
                                        placeholder="Masukkan Email"
                                        className="rounded-md border-grey-400 focus:border-primary-400 focus:border-0"
                                    />
                                </Form.Item>

                                <Form.Item
                                    blackLabel
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Username harus diisi",
                                        },
                                    ]}
                                >
                                    <Input 
                                        placeholder="Masukkan Username"
                                        className="rounded-md border-grey-400 focus:border-primary-400 focus:border-0"
                                    />
                                </Form.Item>

                                <Form.Item
                                    blackLabel
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Password harus diisi",
                                        },
                                    ]}
                                >
                                    <Input 
                                        placeholder="Masukkan password"
                                        type="password"
                                        className="rounded-md border-grey-400 focus:border-primary-400 focus:border-0"
                                    />
                                </Form.Item>

                                <Form.Item
                                    blackLabel
                                    label="Konfirmasi Password"
                                    name="password_confirmation"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Konfirmasi password harus diisi",
                                        },
                                    ]}
                                >
                                    <Input 
                                        placeholder="Konfirmasi password"
                                        type="password"
                                        className="rounded-md border-grey-400 focus:border-primary-400 focus:border-0"
                                    />
                                </Form.Item>

                                
                                
                                <Form.Item
                                    blackLabel
                                    label="Nomor Telepon"
                                    name="phone_number"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Nomor Telepon harus diisi",
                                        },
                                    ]}
                                >
                                    <Input 
                                        placeholder="Masukkan Nomor Telepon"
                                        className="rounded-md border-grey-400 focus:border-primary-400 focus:border-0"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Role"
                                    name="role"
                                    rules={[{ required: true, message: "Role harus dipilih" }]}
                                >
                                    <Select
                                        placeholder="Pilih role"
                                        options={[
                                            { value: "admin", label: "Admin" },
                                            { value: "user", label: "User" }
                                        ]}
                                    />
                                </Form.Item>
                                
                                <Form.Item
                                    style={{
                                        marginTop: "2rem",
                                        marginBottom: 0,
                                        textAlign: "center",
                                    }}
                                >
                                    <Button
                                        onClick={handleBack}
                                        disabled={uploading}
                                        style={{ marginRight: 8 }}
                                    >
                                        Kembali
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={uploading}
                                    >
                                        Tambah User
                                    </Button>
                                </Form.Item>
                            </>
                        ) : (
                            <>
                                <Row gutter={16}>
                                    <Col span={5}>
                                        <Typography.Text strong>
                                            Nama{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Typography.Text>
                                    </Col>
                                    <Col span={19}>
                                        <Form.Item
                                            blackLabel
                                            name="name"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Nama Lengkap harus diisi",
                                                },
                                            ]}
                                        >
                                            <Input 
                                                placeholder="Masukkan Nama Lengkap"
                                                className="rounded-md border-grey-400 focus:border-primary-400 focus:border-0"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={5}>
                                        <Typography.Text strong>
                                            Email{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Typography.Text>
                                    </Col>
                                    <Col span={19}>
                                        <Form.Item
                                            blackLabel
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Email harus diisi",
                                                },
                                            ]}
                                        >
                                            <Input 
                                                placeholder="Masukkan Email"
                                                className="rounded-md border-grey-400 focus:border-primary-400 focus:border-0"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={5}>
                                        <Typography.Text strong>
                                            Username{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Typography.Text>
                                    </Col>
                                    <Col span={19}>
                                        <Form.Item
                                            blackLabel
                                            name="username"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Username harus diisi",
                                                },
                                            ]}
                                        >
                                            <Input 
                                                placeholder="Masukkan Username"
                                                className="rounded-md border-grey-400 focus:border-primary-400 focus:border-0"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={5}>
                                        <Typography.Text strong>
                                            Password{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Typography.Text>
                                    </Col>
                                    <Col span={19}>
                                        <Form.Item
                                            blackLabel
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Password harus diisi",
                                                },
                                            ]}
                                        >
                                            <Input 
                                                placeholder="Masukkan Password"
                                                type="password"
                                                className="rounded-md border-grey-400 focus:border-primary-400 focus:border-0"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={5}>
                                        <Typography.Text strong>
                                            Konfirmasi Password{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Typography.Text>
                                    </Col>
                                    <Col span={19}>
                                        <Form.Item
                                            blackLabel
                                            name="password_confirmation"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Konfirmasi password harus diisi",
                                                },
                                            ]}
                                        >
                                            <Input 
                                                placeholder="Konfirmasi Password"
                                                type="password"
                                                className="rounded-md border-grey-400 focus:border-primary-400 focus:border-0"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={5}>
                                        <Typography.Text strong>
                                            Nomor Telepon{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Typography.Text>
                                    </Col>
                                    <Col span={19}>
                                        <Form.Item
                                            blackLabel
                                            name="phone_number"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Nomor Telepon harus diisi",
                                                },
                                            ]}
                                        >
                                            <Input 
                                                placeholder="Masukkan Nomor Telepon"
                                                className="rounded-md border-grey-400 focus:border-primary-400 focus:border-0"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={5}>
                                        <Typography.Text strong>
                                            Role{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Typography.Text>
                                    </Col>
                                    <Col span={19}>
                                        <Form.Item
                                            blackLabel
                                            name="role"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Role harus diisi",
                                                },
                                            ]}
                                        >
                                            <Select
                                                placeholder="Pilih role"
                                                options={[
                                                    { value: "admin", label: "Admin" },
                                                    { value: "user", label: "User" }
                                                ]}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                

                                <Form.Item
                                    style={{
                                        marginBottom: 0,
                                        textAlign: "center",
                                        marginTop: 24,
                                    }}
                                >
                                    <Button
                                        onClick={handleBack}
                                        disabled={uploading}
                                        style={{ marginRight: 8 }}
                                    >
                                        Kembali
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={uploading}
                                    >
                                        Tambah User
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form>
                </Card>
            </MainLayout>
        </>
    );
}
