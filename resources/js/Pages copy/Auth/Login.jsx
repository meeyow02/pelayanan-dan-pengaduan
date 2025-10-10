import { Col, Flex, Form, Layout, message, Row, Typography, Image } from "antd";
import { useResponsive } from "../../hooks/useResponsive";
import loginBg from "../../../../public/background.png";
import logo from "../../../../public/logo-vpro.svg";
import pallete from "../../utils/pallete";
import { Head, useForm } from "@inertiajs/react";
import CustomInput from "@/Components/CustomInput";
import CustomButton from "@/Components/CustomButton";

export default function Login() {
    const { data, setData, post, processing } = useForm({
        username: "",
        password: "",
    });
    const [messageApi, contextHolder] = message.useMessage();
    const { isMobile } = useResponsive();

    const submit = async () => {
        try {
            post(route("login"), {
                onError: (errors) => {
                    if (errors.username) {
                        messageApi.error(errors.username);
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
                    position: "fixed",
                    width: "100%",
                    top: 0,
                    left: 0,
                    backgroundColor: pallete.background.white,
                }}
            >
                <Row
                    style={{
                        height: "100%",
                        overflow: "hidden",
                    }}
                >
                    {/* Left Column - Background Image */}
                    {!isMobile && (
                        <Col
                            flex={5}
                            style={{
                                backgroundImage: `url(${loginBg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                height: "100%",
                                overflow: "hidden",
                                position: "relative",
                            }}
                        >
                            <Flex
                                vertical
                                justify="space-between"
                                style={{
                                    height: "100%",
                                    padding: "30px",
                                    position: "relative",
                                    zIndex: 1,
                                    color: pallete.background.white,
                                }}
                            >
                                <div /> {/* Empty div for spacing */}
                                <div style={{ textAlign: "center" }}>
                                    <Typography.Title
                                        level={2}
                                        style={{
                                            color: pallete.curiousBlue[500],
                                            marginBottom: 0,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Selamat Datang di
                                    </Typography.Title>
                                    <Typography.Title
                                        level={2}
                                        style={{
                                            color: pallete.curiousBlue[500],
                                            margin: 0,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        APLIKASI V-PRO
                                    </Typography.Title>
                                </div>
                                <Typography.Text
                                    style={{
                                        textAlign: "center",
                                        color: pallete.background.white,
                                    }}
                                >
                                    © Copyright 2025. BPJS Kesehatan KC Ambon -
                                    All Rights Reserved.
                                </Typography.Text>
                            </Flex>
                        </Col>
                    )}

                    {/* Right Column - Login Form */}
                    <Col
                        flex={isMobile ? 1 : 5}
                        style={{
                            height: "100%",
                            overflow: "auto",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            padding: "30px",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                maxWidth: 400,
                                margin: "0 auto",
                                padding: "20px",
                            }}
                        >
                            <div
                                style={{ textAlign: "start", marginBottom: 20 }}
                            >
                                <Flex align="center" justify="center">
                                    <Image
                                        src={logo}
                                        alt=" KC Ambon"
                                        preview={false}
                                        style={{
                                            width: 250,
                                            marginBottom: 40,
                                        }}
                                    />
                                </Flex>
                                <Typography.Title
                                    level={3}
                                    style={{
                                        margin: 0,
                                        marginBottom: 10,
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

                            {isMobile && (
                                <Typography.Text
                                    style={{
                                        display: "block",
                                        textAlign: "center",
                                        marginTop: 40,
                                        color: pallete.grey[600],
                                    }}
                                >
                                    © Copyright 2025. BPJS Kesehatan KC Ambon.
                                </Typography.Text>
                            )}
                        </div>
                    </Col>
                </Row>
            </Layout>
        </>
    );
}
