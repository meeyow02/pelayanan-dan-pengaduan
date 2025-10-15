import { Button, Col, Row, Typography, Tag, Divider } from "antd";
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
    const { flash, service } = usePage().props;

    const { isMobile } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsDrawerOpen } = useSidebarStore();

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setTitle("Detail Permohonan Pelayanan");
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
        router.visit(route("service.index"));
    };

    console.log(service);

    return (
        <>
            {contextHolder}
            <MainLayout
                isCollapsed={isCollapsed}
                isDrawerOpen={isDrawerOpen}
                isMobile={isMobile}
                setIsDrawerOpen={setIsDrawerOpen}
            >
                <Head title="Detail Permohonan Pelayanan" />

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
                            Detail Permohonan Pelayanan
                        </Typography.Title>
                    </div>

                    <Divider />

                    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                        <Col xs={24} sm={12}>
                            <Typography.Text strong style={{ fontSize: 16 }}>
                                Pemohon:
                            </Typography.Text>
                            <br />
                            <Typography.Text
                                style={{
                                    fontSize: 18,
                                    color: "#1890ff",
                                    fontWeight: 500,
                                }}
                            >
                                {service.user.name}
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
                            <Tag
                                color={getStatusColor(service.status)}
                                style={{
                                    fontSize: 16,
                                    padding: "4px 16px",
                                    marginTop: 4,
                                }}
                            >
                                {getStatusText(service.status)}
                            </Tag>
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
                                    Kategori Pelayanan:
                                </Typography.Text>
                            </Col>
                            <Col xs={24} md={18}>
                                <Typography.Text>
                                    {service.service_category.name || "-"}
                                </Typography.Text>
                            </Col>
                        </Row>

                        {/* Tanggal */}
                        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                            <Col xs={24} md={6}>
                                <Typography.Text strong>
                                    Tanggal Permohonan:
                                </Typography.Text>
                            </Col>
                            <Col xs={24} md={18}>
                                <Typography.Text>
                                    {formatDate(service.created_at)}
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
                            Deskripsi Pemohon
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
                                {service.description ?? "Tidak ada"}
                            </Typography.Paragraph>
                        </Card>
                    </div>

                    {/* Dokumen Pendukung */}
                    <div style={{ marginBottom: 24 }}>
                        <Typography.Title
                            level={5}
                            style={{ marginBottom: 12 }}
                        >
                            Dokumen Pendukung
                        </Typography.Title>

                        <Card
                            style={{
                                background: "#fff",
                                border: "1px solid #e8e8e8",
                            }}
                        >
                            {service.service_files &&
                            service.service_files.length > 0 ? (
                                <Row gutter={[16, 16]}>
                                    {service.service_files.map((file, index) => {
                                        const fileUrl = `/storage/service/${file.filename}`;
                                        const ext = file.filename
                                            .split(".")
                                            .pop()
                                            .toLowerCase();
                                        const isImage = [
                                            "jpg",
                                            "jpeg",
                                            "png",
                                            "gif",
                                            "webp",
                                        ].includes(ext);

                                        return (
                                            <Col
                                                xs={24}
                                                sm={12}
                                                md={8}
                                                lg={6}
                                                key={index}
                                            >
                                                <Card
                                                    hoverable
                                                    cover={
                                                        isImage ? (
                                                            <img
                                                                alt={`Bukti ${
                                                                    index + 1
                                                                }`}
                                                                src={fileUrl}
                                                                style={{
                                                                    width: "100%",
                                                                    height: 180,
                                                                    objectFit:
                                                                        "cover",
                                                                    borderRadius: 6,
                                                                }}
                                                            />
                                                        ) : (
                                                            <div
                                                                style={{
                                                                    height: 180,
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "center",
                                                                    background:
                                                                        "#fafafa",
                                                                    borderRadius: 6,
                                                                    fontSize: 16,
                                                                }}
                                                            >
                                                                📄{" "}
                                                                {ext.toUpperCase()}{" "}
                                                                File
                                                            </div>
                                                        )
                                                    }
                                                    actions={[
                                                        <a
                                                            href={fileUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Lihat / Unduh
                                                        </a>,
                                                    ]}
                                                    style={{ borderRadius: 8 }}
                                                >
                                                    <Typography.Text strong>
                                                        {file.original_name ||
                                                            `Dokumen ${index + 1}`}
                                                    </Typography.Text>
                                                </Card>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            ) : (
                                <Typography.Text>
                                    Tidak ada bukti pendukung.
                                </Typography.Text>
                            )}
                        </Card>
                    </div>
                </Card>
            </MainLayout>
        </>
    );
}
