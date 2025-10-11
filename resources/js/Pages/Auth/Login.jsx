import { Form, Layout, message, Typography } from "antd";
import { useResponsive } from "../../hooks/useResponsive";
import pallete from "../../utils/pallete";
import { Head, Link, useForm } from "@inertiajs/react";
import CustomInput from "@/Components/CustomInput";
import CustomButton from "@/Components/CustomButton";

export default function Login() {
    const { data, setData, post, processing } = useForm({
        email: "",
        password: "",
    });
    const [messageApi, contextHolder] = message.useMessage();
    const { isMobile } = useResponsive();

    const submit = async () => {
        try {
            post(route("login"), {
                onError: (errors) => {
                    if (errors.email) {
                        messageApi.error(errors.email);
                    } else if (errors.password) {
                        messageApi.error(errors.password);
                    } else {
                        messageApi.error("Login gagal, silakan coba lagi.");
                    }
                },
            });
        } catch (error) {
            messageApi.error("Terjadi kesalahan, silakan coba lagi.");
        }
    };

    return (
        <>
            <Head title="Login" />
            {contextHolder}
            <Layout
                style={{
                    minHeight: "100vh",
                    height: "100vh",
                    width: "100%",
                    top: 0,
                    left: 0,
                    backgroundColor: pallete.background.white,
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: 400,
                        margin: "auto auto",
                        padding: "20px",
                    }}
                >
                    <div style={{ textAlign: "center", marginBottom: 20 }}>
                        <Typography.Title
                            level={3}
                            style={{
                                margin: 0,
                                marginBottom: 10,
                                textAlign: "center",
                                fontSize: "2rem",
                                fontWeight: "bold",
                            }}
                        >
                            Login
                        </Typography.Title>
                        <Typography.Text
                            style={{
                                fontWeight: 500,
                                fontSize: 14,
                                color: pallete.grey[600],
                            }}
                        >
                            Silahkan masukkan email dan password Anda
                        </Typography.Text>
                    </div>

                    <Form
                        layout="vertical"
                        requiredMark={false}
                        onFinish={submit}
                        style={{ width: "100%" }}
                    >
                        <CustomInput
                            blackLabel
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Email harus diisi",
                                },
                            ]}
                            placeholder="Masukkan Email"
                            value={data.email}
                            onChange={(e) => {
                                setData("email", e.target.value);
                            }}
                        />

                        <CustomInput
                            blackLabel
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Password harus diisi",
                                },
                            ]}
                            placeholder="Masukkan password"
                            type="password"
                            value={data.password}
                            onChange={(e) => {
                                setData("password", e.target.value);
                            }}
                            password
                        />

                        <CustomButton
                            loading={processing}
                            disabled={processing}
                            className="mt-5"
                            variant="primary"
                            htmlType="submit"
                            block
                        >
                            LOGIN
                        </CustomButton>
                    </Form>

                    <div className="mt-3 text-center">
                        Belum punya akun? <Link href="/register">Register</Link>
                    </div>

                    {isMobile && (
                        <Typography.Text
                            style={{
                                display: "block",
                                textAlign: "center",
                                marginTop: 40,
                                color: pallete.grey[600],
                            }}
                        >
                            © Copyright 2025. Sistem Pelayanan dan Pengaduan
                            Masyarakat.
                        </Typography.Text>
                    )}
                </div>
            </Layout>
        </>
    );
}
