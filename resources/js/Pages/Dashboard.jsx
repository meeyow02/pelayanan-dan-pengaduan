import { Col, Row, Typography } from "antd";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Card, Form, message } from "antd";
import useTitleStore from "@/store/titleStore";
import { useQueryClient } from "@tanstack/react-query";

export default function Dashboard() {
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

    return (
        <>
            {contextHolder}
            <MainLayout
                isCollapsed={isCollapsed}
                isDrawerOpen={isDrawerOpen}
                isMobile={isMobile}
                setIsDrawerOpen={setIsDrawerOpen}
            >
                <Head title="Dashboard" />
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={12}>
                        <Card
                            variant="borderless"
                            styles={{
                                body: {
                                    padding: "auto",
                                },
                            }}
                        >
                            <Row>
                                {isMobile ? (
                                    <Typography.Text
                                        style={{
                                            fontSize: ".8rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        Total Aduan Masyarakat
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Total Aduan Masyarakat
                                    </Typography.Text>
                                )}
                            </Row>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {isMobile ? (
                                    <Typography.Text
                                        style={{
                                            fontSize: "2.5rem",
                                        }}
                                    >
                                        100
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text
                                        style={{
                                            fontSize: "3rem",
                                        }}
                                    >
                                        100
                                    </Typography.Text>
                                )}
                            </div>
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card
                            variant="borderless"
                            styles={{
                                body: {
                                    padding: "auto",
                                },
                            }}
                        >
                            <Row>
                                {isMobile ? (
                                    <Typography.Text
                                        style={{
                                            fontSize: ".8rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        Total Pelayanan Administrasi
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Total Pelayanan Administrasi
                                    </Typography.Text>
                                )}
                            </Row>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {isMobile ? (
                                    <Typography.Text
                                        style={{
                                            fontSize: "2.5rem",
                                        }}
                                    >
                                        100
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text
                                        style={{
                                            fontSize: "3rem",
                                        }}
                                    >
                                        100
                                    </Typography.Text>
                                )}
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* ADUAN */}
                <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    style={{
                        marginTop: "1rem",
                    }}
                >
                    <Col span={8}>
                        <Card
                            variant="borderless"
                            styles={{
                                body: {
                                    padding: "1.1rem",
                                    borderRadius: ".3rem",
                                },
                            }}
                        >
                            <Row
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {isMobile ? (
                                    <Typography.Text
                                        style={{
                                            fontSize: ".8rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        Aduan Selesai
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Aduan Selesai
                                    </Typography.Text>
                                )}
                            </Row>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {isMobile ? (
                                    <Typography.Text
                                        style={{
                                            fontSize: "2rem",
                                        }}
                                    >
                                        50
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text
                                        style={{
                                            fontSize: "3rem",
                                        }}
                                    >
                                        50
                                    </Typography.Text>
                                )}
                            </div>
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card
                            styles={{
                                body: {
                                    padding: "1.1rem",
                                    borderRadius: ".3rem",
                                },
                            }}
                        >
                            <Row
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {isMobile ? (
                                    <Typography.Text
                                        style={{
                                            fontSize: ".8rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        Aduan Ditindaklanjuti
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Aduan Ditindaklanjuti
                                    </Typography.Text>
                                )}
                            </Row>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {isMobile ? (
                                    <Typography.Text
                                        style={{
                                            fontSize: "2rem",
                                        }}
                                    >
                                        25
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text
                                        style={{
                                            fontSize: "3rem",
                                        }}
                                    >
                                        25
                                    </Typography.Text>
                                )}
                            </div>
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card
                            variant="borderless"
                            styles={{
                                body: {
                                    padding: "1.1rem",
                                    borderRadius: ".3rem",
                                },
                            }}
                        >
                            <Row
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {isMobile ? (
                                    <Typography.Text
                                        style={{
                                            fontSize: ".8rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        Aduan yang Masuk
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Aduan yang Masuk
                                    </Typography.Text>
                                )}
                            </Row>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {isMobile ? (
                                    <Typography.Text
                                        style={{
                                            fontSize: "2rem",
                                        }}
                                    >
                                        25
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text
                                        style={{
                                            fontSize: "3rem",
                                        }}
                                    >
                                        25
                                    </Typography.Text>
                                )}
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* PELAYANAN */}
                <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    style={{
                        marginTop: "1rem",
                    }}
                >
                    <Col span={8}>
                        <Card
                            variant="borderless"
                            styles={{
                                body: {
                                    padding: "1.1rem",
                                    borderRadius: ".3rem",
                                },
                            }}
                        >
                            <Row
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {isMobile ? (
                                    <Typography.Text
                                        style={{
                                            fontSize: ".8rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        Pelayanan Selesai
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Pelayanan Selesai
                                    </Typography.Text>
                                )}
                            </Row>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {isMobile ? (
                                    <Typography.Text
                                        style={{
                                            fontSize: "2rem",
                                        }}
                                    >
                                        50
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text
                                        style={{
                                            fontSize: "3rem",
                                        }}
                                    >
                                        50
                                    </Typography.Text>
                                )}
                            </div>
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card
                            styles={{
                                body: {
                                    padding: "1.1rem",
                                    borderRadius: ".3rem",
                                },
                            }}
                        >
                            <Row
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {isMobile ? (
                                    <Typography.Text
                                        style={{
                                            fontSize: ".8rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        Pelayanan Ditindaklanjuti
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Pelayanan Ditindaklanjuti
                                    </Typography.Text>
                                )}
                            </Row>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {isMobile ? (
                                    <Typography.Text
                                        style={{
                                            fontSize: "2rem",
                                        }}
                                    >
                                        25
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text
                                        style={{
                                            fontSize: "3rem",
                                        }}
                                    >
                                        25
                                    </Typography.Text>
                                )}
                            </div>
                        </Card>
                    </Col>

                    <Col span={8}>
                        <Card
                            variant="borderless"
                            styles={{
                                body: {
                                    padding: "1.1rem",
                                    borderRadius: ".3rem",
                                },
                            }}
                        >
                            <Row
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {isMobile ? (
                                    <Typography.Text
                                        style={{
                                            fontSize: ".8rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        Pelayanan yang Masuk
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Pelayanan yang Masuk
                                    </Typography.Text>
                                )}
                            </Row>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {isMobile ? (
                                    <Typography.Text
                                        style={{
                                            fontSize: "2rem",
                                        }}
                                    >
                                        25
                                    </Typography.Text>
                                ) : (
                                    <Typography.Text
                                        style={{
                                            fontSize: "3rem",
                                        }}
                                    >
                                        25
                                    </Typography.Text>
                                )}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </MainLayout>
        </>
    );
}
