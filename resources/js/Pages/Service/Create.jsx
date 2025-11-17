import {
    Button,
    Col,
    Row,
    Select,
    Space,
    Typography,
    Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, router, usePage } from "@inertiajs/react";
import { Card, Form, message } from "antd";
import useTitleStore from "@/store/titleStore";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";

export default function Index() {
    // Hooks
    const [form] = Form.useForm();
    const { setTitle } = useTitleStore();
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const { flash, auth, serviceCategories } = usePage().props;

    const { isMobile } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsDrawerOpen } =
        useSidebarStore();

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setTitle("Pelayanan");
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
        formData.append("service_category_id", values.service_category_id);
        formData.append("description", values.description);

        // Append file jika ada
        if (fileList.length > 0) {
            fileList.forEach((file) => {
                formData.append("files[]", file);
            });
        }

        router.post(route("service.store"), formData, {
            forceFormData: true,
            onFinish: () => {
                setUploading(false);
            },
        });
    };

    const handleBack = () => {
        router.visit(route("service.index"));
    };

    const uploadProps = {
        beforeUpload: (file) => {
            // Validasi tipe file
            const isValidType =
                file.type === "image/jpeg" ||
                file.type === "image/png" ||
                file.type === "application/pdf";

            if (!isValidType) {
                messageApi.error(
                    "Hanya dapat mengunggah file JPG, PNG, atau PDF!"
                );
                return Upload.LIST_IGNORE;
            }

            // Validasi ukuran file (< 5 MB)
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                messageApi.error("File harus lebih kecil dari 5MB!");
                return Upload.LIST_IGNORE;
            }

            setFileList((prevList) => [...prevList, file]);

            return false;
        },
        onRemove: (file) => {
            setFileList((prevList) =>
                prevList.filter((item) => item.uid !== file.uid)
            );
        },
        fileList: fileList,
        multiple: true,
        maxCount: 10,
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
                <Head title="Pelayanan" />

                <Card
                    styles={{
                        body: {
                            paddingLeft: 0,
                            paddingRight: 0,
                        },
                    }}
                >
                    {isMobile ? (
                        <Typography.Title
                            style={{
                                fontSize: "1rem",
                                textAlign: "center",
                            }}
                        >
                            Form Pengisian Permohonan Layanan
                        </Typography.Title>
                    ) : (
                        <Typography.Title
                            style={{
                                fontSize: "2rem",
                                textAlign: "center",
                            }}
                        >
                            Form Pengisian Permohonan Layanan
                        </Typography.Title>
                    )}
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            padding: "1.1rem",
                            margin: "auto 2rem",
                        }}
                    >
                        {isMobile ? (
                            <>
                                <div>
                                    <Typography.Text strong>
                                        Kategori Pelayanan{" "}
                                        <span style={{ color: "red" }}>
                                            *
                                        </span>
                                    </Typography.Text>
                                    <Col span={24}>
                                        <Form.Item
                                            name="service_category_id"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Pilih kategori permohonan layanan!",
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Pilih kategori">
                                                {serviceCategories?.data.map(
                                                    (category) => (
                                                        <Select.Option
                                                            key={category.id}
                                                            value={category.id}
                                                        >
                                                            {category.name}
                                                        </Select.Option>
                                                    )
                                                )}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </div>

                                <div>
                                    <Typography.Text strong>
                                        Deskripsi{" "}
                                        <span style={{ color: "red" }}>
                                            *
                                        </span>
                                    </Typography.Text>
                                    <Col span={24}>
                                        <Form.Item
                                            name="description"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Isi deskription tidak boleh kosong!",
                                                },
                                            ]}
                                        >
                                            <TextArea
                                                rows={5}
                                                placeholder="Tulis permohonan yang ingin anda ajukan"
                                                showCount
                                                maxLength={1000}
                                            />
                                        </Form.Item>
                                    </Col>
                                </div>

                                <div style={{ marginTop: "1rem" }}>
                                    <Typography.Text strong>
                                        Unggah Dokumen{" "}
                                        <span style={{ color: "red" }}>
                                            *
                                        </span>
                                    </Typography.Text>
                                    <Col span={24}>
                                        <Form.Item>
                                            <Form.Item name="files[]">
                                                <Upload.Dragger
                                                    {...uploadProps}
                                                >
                                                    <p className="ant-upload-drag-icon">
                                                        <InboxOutlined />
                                                    </p>
                                                    <p className="ant-upload-text">
                                                        Klik atau unggah file ke
                                                        area ini
                                                    </p>
                                                    <p className="ant-upload-hint">
                                                        Dapat mengunggah satu
                                                        atau beberapa file
                                                        sekaligus.
                                                    </p>
                                                </Upload.Dragger>
                                            </Form.Item>
                                        </Form.Item>
                                    </Col>
                                </div>

                                <Form.Item
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "1rem",
                                    }}
                                >
                                    <Space>
                                        <Button
                                            onClick={handleBack}
                                            disabled={uploading}
                                        >
                                            Kembali
                                        </Button>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={uploading}
                                        >
                                            Submit
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </>
                        ) : (
                            <>
                                <Row>
                                    <Col span={5}>
                                        <Typography.Text strong>
                                            Kategori Pelayanan{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Typography.Text>
                                    </Col>
                                    <Col span={19}>
                                        <Form.Item
                                            name="service_category_id"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Pilih kategori permohonan layanan!",
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Pilih kategori">
                                                {serviceCategories?.data.map(
                                                    (category) => (
                                                        <Select.Option
                                                            key={category.id}
                                                            value={category.id}
                                                        >
                                                            {category.name}
                                                        </Select.Option>
                                                    )
                                                )}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={5}>
                                        <Typography.Text strong>
                                            Deskripsi{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Typography.Text>
                                    </Col>
                                    <Col span={19}>
                                        <Form.Item
                                            name="description"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Isi deskripsi tidak boleh kosong!",
                                                }
                                            ]}
                                        >
                                            <TextArea
                                                name="description"
                                                rows={5}
                                                placeholder="Tulis permohonan yang ingin anda ajukan"
                                                showCount
                                                maxLength={1000}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "2rem" }}>
                                    <Col span={5}>
                                        <Typography.Text strong>
                                            Unggah Dokumen{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Typography.Text>
                                    </Col>
                                    <Col span={19}>
                                        <Form.Item>
                                            <Form.Item name="files[]">
                                                <Upload.Dragger
                                                    {...uploadProps}
                                                >
                                                    <p className="ant-upload-drag-icon">
                                                        <InboxOutlined />
                                                    </p>
                                                    <p className="ant-upload-text">
                                                        Klik atau unggah file ke
                                                        area ini
                                                    </p>
                                                    <p className="ant-upload-hint">
                                                        Dapat mengunggah satu
                                                        atau beberapa file
                                                        sekaligus.
                                                    </p>
                                                </Upload.Dragger>
                                            </Form.Item>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "1rem",
                                    }}
                                >
                                    <Space>
                                        <Button
                                            onClick={handleBack}
                                            disabled={uploading}
                                        >
                                            Kembali
                                        </Button>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            loading={uploading}
                                        >
                                            Submit
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </>
                        )}
                    </Form>
                </Card>
            </MainLayout>
        </>
    );
}
