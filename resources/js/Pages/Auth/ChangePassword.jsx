import {
    Button,
    Card,
    Col,
    Divider,
    Flex,
    Form,
    Input,
    Row,
    Typography,
} from "antd";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, usePage, router } from "@inertiajs/react";
import { message } from "antd";
import useTitleStore from "@/store/titleStore";
import { useEffect } from "react";

const { Title } = Typography;

export default function ChangePassword() {
    // Hooks
    const { setTitle } = useTitleStore();
    const { flash, auth } = usePage().props;
    const { isMobile } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsDrawerOpen } = useSidebarStore();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    // Set page title
    useEffect(() => {
        setTitle("Ubah Password");
    }, [setTitle]);

    // Show flash messages
    useEffect(() => {
        if (flash.success) {
            messageApi.success(flash.success);
            form.resetFields();
        }
        if (flash.error) {
            messageApi.error(flash.error);
        }
    }, [flash, messageApi, form]);

    // Handle form submission
    const onFinish = (values) => {
        router.put(route("password.update"), values, {
            onSuccess: () => {
                messageApi.success("Password berhasil diubah!");
                form.resetFields();
            },
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    form.setFields([
                        {
                            name: key,
                            errors: [errors[key]],
                        },
                    ]);
                });
            },
        });
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
                <Head title="Ubah Password" />

                <Card>
                    <Title level={3}>Ubah Password</Title>
                    <Divider />

                    <Row justify="center">
                        <Col xs={24} sm={16} md={24} lg={24}>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="current_password"
                                    label="Password Lama"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Masukkan password lama!",
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Masukkan password lama" />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Password Baru"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Masukkan password baru!",
                                        },
                                        {
                                            min: 8,
                                            message:
                                                "Password minimal 8 karakter!",
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Masukkan password baru" />
                                </Form.Item>

                                <Form.Item
                                    name="password_confirmation"
                                    label="Konfirmasi Password"
                                    dependencies={["password"]}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Konfirmasi password baru!",
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue(
                                                        "password"
                                                    ) === value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        "Password konfirmasi tidak sesuai!"
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder="Konfirmasi password baru" />
                                </Form.Item>

                                <Form.Item>
                                    <Flex justify="end">
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            Simpan
                                        </Button>
                                    </Flex>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </MainLayout>
        </>
    );
}
