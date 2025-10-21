import { Col, Divider, Row, Typography, Card, Form, message } from "antd";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, useForm, usePage } from "@inertiajs/react";
import useTitleStore from "@/store/titleStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Admin() {
    const { setTitle } = useTitleStore();
    const { flash, auth, data } = usePage().props;
    const { isMobile, isTablet } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsCollapsed, setIsDrawerOpen } =
        useSidebarStore();

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setTitle("Dashboard");
    }, [setTitle]);

    return (
        <>
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
                                    {data.total_complaint}
                                </Typography.Text>
                            ) : (
                                <Typography.Text
                                    style={{
                                        fontSize: "3rem",
                                    }}
                                >
                                    {data.total_complaint}
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
                                    {data.total_service}
                                </Typography.Text>
                            ) : (
                                <Typography.Text
                                    style={{
                                        fontSize: "3rem",
                                    }}
                                >
                                    {data.total_service}
                                </Typography.Text>
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* ADUAN */}
            {isMobile ? (
                <Divider
                    orientation="center"
                    style={{
                        marginTop: "1.5rem",
                    }}
                >
                    Aduan Masyarakat
                </Divider>
            ) : (
                <Divider
                    orientation="left"
                    style={{
                        marginTop: "1.5rem",
                    }}
                >
                    Aduan Masyarakat
                </Divider>
            )}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {isMobile ? (
                    <>
                        <Col span={12}>
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
                                            {data.total_completed_complaint}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "3rem",
                                            }}
                                        >
                                            {data.total_completed_complaint}
                                        </Typography.Text>
                                    )}
                                </div>
                            </Card>
                        </Col>

                        <Col span={12}>
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
                                            {data.total_on_progress_complaint}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "3rem",
                                            }}
                                        >
                                            {data.total_on_progress_complaint}
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
                                        padding: "1.1rem",
                                        borderRadius: ".3rem",
                                        marginTop: "1rem",
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
                                            Aduan Pending
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "1rem",
                                            }}
                                        >
                                            Aduan Pending
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
                                            {data.total_pending_complaint}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "3rem",
                                            }}
                                        >
                                            {data.total_pending_complaint}
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
                                        padding: "1.1rem",
                                        borderRadius: ".3rem",
                                        marginTop: "1rem",
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
                                            Aduan Dibatalkan
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
                                            {data.total_cancel_complaint}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "3rem",
                                            }}
                                        >
                                            {data.total_cancel_complaint}
                                        </Typography.Text>
                                    )}
                                </div>
                            </Card>
                        </Col>
                    </>
                ) : (
                    <>
                        <Col span={6}>
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
                                    <Typography.Text
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Aduan Selesai
                                    </Typography.Text>
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
                                            {data.total_completed_complaint}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "3rem",
                                            }}
                                        >
                                            {data.total_completed_complaint}
                                        </Typography.Text>
                                    )}
                                </div>
                            </Card>
                        </Col>

                        <Col span={6}>
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
                                    <Typography.Text
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Aduan Ditindaklanjuti
                                    </Typography.Text>
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
                                            {data.total_on_progress_complaint}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "3rem",
                                            }}
                                        >
                                            {data.total_on_progress_complaint}
                                        </Typography.Text>
                                    )}
                                </div>
                            </Card>
                        </Col>

                        <Col span={6}>
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
                                    <Typography.Text
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Aduan Pending
                                    </Typography.Text>
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
                                            {data.total_pending_complaint}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "3rem",
                                            }}
                                        >
                                            {data.total_pending_complaint}
                                        </Typography.Text>
                                    )}
                                </div>
                            </Card>
                        </Col>

                        <Col span={6}>
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
                                    <Typography.Text
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Aduan Dibatalkan
                                    </Typography.Text>
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
                                            {data.total_cancel_complaint}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "3rem",
                                            }}
                                        >
                                            {data.total_cancel_complaint}
                                        </Typography.Text>
                                    )}
                                </div>
                            </Card>
                        </Col>
                    </>
                )}
            </Row>

            {/* PELAYANAN */}
            {isMobile ? (
                <Divider
                    orientation="center"
                    style={{
                        marginTop: "1.5rem",
                    }}
                >
                    Pelayanan Administrasi
                </Divider>
            ) : (
                <Divider
                    orientation="left"
                    style={{
                        marginTop: "1.5rem",
                    }}
                >
                    Pelayanan Administrasi
                </Divider>
            )}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {isMobile ? (
                    <>
                        <Col span={12}>
                            <Card
                                variant="borderless"
                                styles={{
                                    body: {
                                        padding: "1.8rem",
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
                                            {data.total_completed_service}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "3rem",
                                            }}
                                        >
                                            {data.total_completed_service}
                                        </Typography.Text>
                                    )}
                                </div>
                            </Card>
                        </Col>

                        <Col span={12}>
                            <Card
                                styles={{
                                    body: {
                                        padding: "1.2rem",
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
                                            {data.total_on_progress_service}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "3rem",
                                            }}
                                        >
                                            {data.total_on_progress_service}
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
                                        padding: "1.1rem",
                                        borderRadius: ".3rem",
                                        marginTop: "1rem",
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
                                            Pelayanan Pending
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "1rem",
                                            }}
                                        >
                                            Pelayanan Pending
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
                                            {data.total_pending_service}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "3rem",
                                            }}
                                        >
                                            {data.total_pending_service}
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
                                        padding: "1.1rem",
                                        borderRadius: ".3rem",
                                        marginTop: "1rem",
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
                                            Pelayanan Dibatalkan
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
                                            {data.total_cancel_service}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "3rem",
                                            }}
                                        >
                                            {data.total_cancel_service}
                                        </Typography.Text>
                                    )}
                                </div>
                            </Card>
                        </Col>
                    </>
                ) : (
                    <>
                        <Col span={6}>
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
                                    <Typography.Text
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Pelayanan Selesai
                                    </Typography.Text>
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
                                            {data.total_completed_service}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "3rem",
                                            }}
                                        >
                                            {data.total_completed_service}
                                        </Typography.Text>
                                    )}
                                </div>
                            </Card>
                        </Col>

                        <Col span={6}>
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
                                    <Typography.Text
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Pelayanan Ditindaklanjuti
                                    </Typography.Text>
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
                                            {data.total_on_progress_service}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "3rem",
                                            }}
                                        >
                                            {data.total_on_progress_service}
                                        </Typography.Text>
                                    )}
                                </div>
                            </Card>
                        </Col>

                        <Col span={6}>
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
                                    <Typography.Text
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Pelayanan Pending
                                    </Typography.Text>
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
                                            {data.total_pending_service}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "3rem",
                                            }}
                                        >
                                            {data.total_pending_service}
                                        </Typography.Text>
                                    )}
                                </div>
                            </Card>
                        </Col>

                        <Col span={6}>
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
                                    <Typography.Text
                                        style={{
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Pelayanan Dibatalkan
                                    </Typography.Text>
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
                                            {data.total_cancel_service}
                                        </Typography.Text>
                                    ) : (
                                        <Typography.Text
                                            style={{
                                                fontSize: "3rem",
                                            }}
                                        >
                                            {data.total_cancel_service}
                                        </Typography.Text>
                                    )}
                                </div>
                            </Card>
                        </Col>
                    </>
                )}
            </Row>
        </>
    );
}
