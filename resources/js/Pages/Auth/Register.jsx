import { Form, Layout, message, Typography } from "antd";
import { useResponsive } from "../../hooks/useResponsive";
import pallete from "../../utils/pallete";
import { Head, Link, useForm } from "@inertiajs/react";
import CustomInput from "@/Components/CustomInput";
import CustomButton from "@/Components/CustomButton";

export default function Register() {
    const { data, setData, post, processing } = useForm({
        name: "",
        email: "",
        username: "",
        phone_number: "",
        password: "",
        password_confirmation: "",
    });
    const [messageApi, contextHolder] = message.useMessage();
    const { isMobile } = useResponsive();

    const submit = async () => {
        try {
            console.log(data.name);
            
            post(route("register"));
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
                            Registrasi Akun
                        </Typography.Title>
                        <Typography.Text
                            style={{
                                fontWeight: 500,
                                fontSize: 14,
                                color: pallete.grey[600],
                            }}
                        >
                            Silahkan masukkan data yang diperlukan untuk
                            melakukan pembuatan akun
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
                            label="Nama Lengkap"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Nama Lengkap harus diisi",
                                },
                            ]}
                            placeholder="Masukkan Nama Lengkap"
                            value={data.name}
                            onChange={(e) => {
                                setData("name", e.target.value);
                            }}
                        />

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
                            placeholder="Masukkan Username"
                            value={data.username}
                            onChange={(e) => {
                                setData("username", e.target.value);
                            }}
                        />

                        <CustomInput
                            blackLabel
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Email harus diisi",
                                },
                                {
                                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Format email tidak valid",
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
                            label="Nomor Telepon"
                            name="phone_number"
                            rules={[
                                {
                                    required: true,
                                    message: "Nomor Telepon harus diisi",
                                },
                                {
                                    pattern: /^(?:\+62|0)[0-9]{9,13}$/,
                                    message:
                                        "Nomor telepon tidak valid (contoh: 081234567890 atau +6281234567890)",
                                },
                            ]}
                            placeholder="Masukkan Nomor Telepon"
                            value={data.phone_number}
                            onChange={(e) => {
                                setData("phone_number", e.target.value);
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
                                {
                                    min: 8,
                                    message: "Masukkan password minimal 8 karakter",
                                }
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
                            name="password_confirmation"
                            rules={[
                                {
                                    required: true,
                                    message: "Konfirmasi Password harus diisi",
                                },
                            ]}
                            placeholder="Konfirmasi password"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => {
                                setData(
                                    "password_confirmation",
                                    e.target.value
                                );
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
                            DAFTAR
                        </CustomButton>
                    </Form>

                    <div className="mt-3 text-center">
                        Sudah punya akun? <Link href="/login">Login</Link>
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
