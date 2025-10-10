import { Col, Flex, Form, Layout, message, Row, Typography, Image } from "antd";
import { useResponsive } from "../../hooks/useResponsive";
import pallete from "../../utils/pallete";
import { Head, Link, useForm } from "@inertiajs/react";
import CustomInput from "@/Components/CustomInput";
import CustomButton from "@/Components/CustomButton";

export default function Register() {
    const { data, setData, post, processing } = useForm({
        username: "",
        password: "",
    });
    const [messageApi, contextHolder] = message.useMessage();
    const { isMobile } = useResponsive();

    const submit = async () => {
        try {
            // post(route("register"), {
            //     onError: (errors) => {
            //         if (errors.username) {
            //             messageApi.error(errors.username);
            //         } else if (errors.password) {
            //             messageApi.error(errors.password);
            //         } else {
            //             messageApi.error("Login gagal, silakan coba lagi.");
            //         }
            //     },
            // });
        } catch (error) {
            messageApi.error("Terjadi kesalahan, silakan coba lagi.");
        }
    };

    return (
        <>
            <Head title="Register" />
            {contextHolder}
            <Layout
                style={{
                    minHeight: "100vh",
                    height: "100vh",
                    position: "fixed",
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
                    <div
                        style={{ textAlign: "start", marginBottom: 20 }}
                    >
                        <Typography.Title
                            level={3}
                            style={{
                                margin: 0,
                                marginBottom: 10,
                                textAlign: "center",
                                fontSize: "2rem",
                                fontWeight: "bold"
                            }}
                        >
                            Registrasi Akun
                        </Typography.Title>
                        <Typography.Text
                            style={{
                                fontWeight: 500,
                                fontSize: 14,
                                color: pallete.grey[600],
                            }}
                        >
                            Silahkan masukkan username dan password Anda
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
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Username harus diisi",
                                },
                            ]}
                            placeholder="Masukkan username"
                            value={data.username}
                            onChange={(e) => {
                                setData("username", e.target.value);
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

                        <CustomInput
                            blackLabel
                            label="Konfirmasi Password"
                            name="confirmpassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Password harus diisi",
                                },
                            ]}
                            placeholder="Konfirmasi password"
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
                            className="mt-2"
                            variant="primary"
                                    htmlType="submit"
                                    block
                                >
                                    <Link href="/login">DAFTAR</Link>
                                </CustomButton>
                            </Form>

                            {isMobile && (
                                <Typography.Text
                                    style={{
                                        display: "block",
                                        textAlign: "center",
                                        marginTop: 40,
                                        color: pallete.grey[600],
                                    }}
                                >
                                    © Copyright 2025. 
                                    Sistem Pelayanan dan Pengaduan Masyarakat.
                                </Typography.Text>
                            )}
                        </div>
            </Layout>
        </>
    );
}
