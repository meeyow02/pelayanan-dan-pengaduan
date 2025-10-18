import { Button, Col, Row, Typography, Tag, Divider, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, router, usePage } from "@inertiajs/react";
import { Card, message } from "antd";
import useTitleStore from "@/store/titleStore";
import { useEffect } from "react";

export default function Show() {
    const { setTitle } = useTitleStore();
    const { flash, complaint, auth } = usePage().props;

    const { isMobile } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsDrawerOpen } = useSidebarStore();

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setTitle("Detail Pengaduan");
    }, [setTitle]);

    useEffect(() => {
        if (flash?.success) {
            messageApi.success(flash.success);
        }
        if (flash?.error) {
            messageApi.error(flash.error);
        }
    }, [flash, messageApi]);

    // Format tanggal
    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    // Status color mapping
    const getStatusColor = (status) => {
        const statusColors = {
            pending: "orange",
            on_progress: "blue",
            completed: "green",
            cancel: "red",
        };
        return statusColors[status] || "default";
    };

    // Status text mapping
    const getStatusText = (status) => {
        const statusTexts = {
            pending: "Menunggu Persetujuan",
            on_progress: "Diproses",
            completed: "Selesai",
            cancel: "Dibatalkan",
        };
        return statusTexts[status] || status;
    };

    const handleBack = () => {
        router.visit(route("complaint.index"));
    };

    const handleStatusChange = (value) => {
        router.put(
            route("complaint.update-status", complaint.id),
            { status: value },
            {
                preserveScroll: true,
                onError: () => messageApi.error("Gagal mengubah status"),
            }
        );
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
                <Head title="Detail Pengaduan" />

                <Card
                    style={{
                        borderRadius: 8,
                    }}
                    styles={{
                        body: {
                            paddingLeft: isMobile ? 16 : 24,
                            paddingRight: isMobile ? 16 : 24,
                        },
                    }}
                >
                    {/* Header */}
                    <div style={{ marginBottom: 24 }}>
                        <Button
                            icon={<ArrowLeftOutlined />}
                            onClick={handleBack}
                            style={{ marginBottom: 16 }}
                        >
                            Kembali
                        </Button>

                        <Typography.Title
                            level={isMobile ? 4 : 2}
                            style={{ margin: 0, textAlign: "center" }}
                        >
                            Detail Aduan
                        </Typography.Title>
                    </div>

                    <Divider />

                    {/* Complaint Number & Status */}
                    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                        <Col xs={24} sm={12}>
                            <Typography.Text strong style={{ fontSize: 16 }}>
                                Nomor Aduan:
                            </Typography.Text>
                            <br />
                            <Typography.Text
                                style={{
                                    fontSize: 18,
                                    color: "#1890ff",
                                    fontWeight: 500,
                                }}
                            >
                                {complaint.complaint_number}
                            </Typography.Text>
                        </Col>
                        <Col
                            xs={24}
                            sm={12}
                            style={{ textAlign: isMobile ? "left" : "right" }}
                        >
                            <Typography.Text strong style={{ fontSize: 16 }}>
                                Status:
                            </Typography.Text>
                            <br />

                            {auth?.user?.role === "admin" ? (
                                <Select
                                    defaultValue={complaint.status}
                                    style={{ width: 200 }}
                                    onChange={handleStatusChange}
                                    options={[
                                        {
                                            value: "pending",
                                            label: "Menunggu Persetujuan",
                                        },
                                        {
                                            value: "on_progress",
                                            label: "Diproses",
                                        },
                                        {
                                            value: "completed",
                                            label: "Selesai",
                                        },
                                        {
                                            value: "cancel",
                                            label: "Dibatalkan",
                                        },
                                    ]}
                                />
                            ) : (
                                <Tag
                                    color={getStatusColor(complaint.status)}
                                    style={{
                                        fontSize: 16,
                                        padding: "4px 16px",
                                        marginTop: 4,
                                    }}
                                >
                                    {getStatusText(complaint.status)}
                                </Tag>
                            )}
                        </Col>
                    </Row>

                    {/* Detail Information */}
                    <div
                        style={{
                            background: "#fafafa",
                            padding: isMobile ? "16px" : "24px",
                            borderRadius: 8,
                            marginBottom: 24,
                        }}
                    >
                        {/* Kategori */}
                        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                            <Col xs={24} md={6}>
                                <Typography.Text strong>
                                    Kategori Aduan:
                                </Typography.Text>
                            </Col>
                            <Col xs={24} md={18}>
                                <Typography.Text>
                                    {complaint.complaint_category.name || "-"}
                                </Typography.Text>
                            </Col>
                        </Row>

                        {/* Tanggal */}
                        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                            <Col xs={24} md={6}>
                                <Typography.Text strong>
                                    Tanggal Dibuat:
                                </Typography.Text>
                            </Col>
                            <Col xs={24} md={18}>
                                <Typography.Text>
                                    {formatDate(complaint.created_at)}
                                </Typography.Text>
                            </Col>
                        </Row>

                        {/* Bukti Aduan */}
                        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                            <Col xs={24} md={6}>
                                <Typography.Text strong>
                                    Bukti Aduan:
                                </Typography.Text>
                            </Col>
                            <Col xs={24} md={18}>
                                <Typography.Text>
                                    {complaint.filename ? (
                                        <a
                                            href={`/storage/complaint/${complaint.filename}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Lihat Bukti
                                        </a>
                                    ) : (
                                        "-"
                                    )}
                                </Typography.Text>
                            </Col>
                        </Row>
                    </div>

                    {/* Content */}
                    <div style={{ marginBottom: 24 }}>
                        <Typography.Title
                            level={5}
                            style={{ marginBottom: 12 }}
                        >
                            Isi Aduan
                        </Typography.Title>
                        <Card
                            style={{
                                background: "#fff",
                                border: "1px solid #e8e8e8",
                            }}
                        >
                            <Typography.Paragraph
                                style={{
                                    fontSize: 15,
                                    lineHeight: 1.8,
                                    margin: 0,
                                    whiteSpace: "pre-wrap",
                                }}
                            >
                                {complaint.content}
                            </Typography.Paragraph>
                        </Card>
                    </div>
                </Card>
            </MainLayout>
        </>
    );
}
