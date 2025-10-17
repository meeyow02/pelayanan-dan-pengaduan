import { Button, Col, Input, Row, Select, Typography, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, router, usePage } from "@inertiajs/react";
import { Card, Form, message } from "antd";
import useTitleStore from "@/store/titleStore";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import pallete from "@/utils/pallete";

export default function Create() {
    // Hooks
    const [form] = Form.useForm();
    const { setTitle } = useTitleStore();
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const { flash, complaintCategories } = usePage().props;

    const { isMobile } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsDrawerOpen } = useSidebarStore();

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setTitle("Buat Kategori Aduan");
    }, [setTitle]);

    useEffect(() => {
        if (flash?.success) {
            messageApi.success(flash.success);
        }
        if (flash?.error) {
            messageApi.error(flash.error);
        }
    }, [flash, messageApi]);

    // const handleSubmit = (values) => {
    //     setUploading(true);

    //     const formData = new FormData();
    //     formData.append("complaint_category_id", values.complaint_category_id);
    //     formData.append("content", values.content);

    //     // Append file jika ada
    //     if (fileList.length > 0) {
    //         formData.append("filename", fileList[0]);
    //     }

    //     router.post(route("complaint.store"), formData, {
    //         forceFormData: true,
    //         onFinish: () => {
    //             setUploading(false);
    //         },
    //     });
    // };

    // const handleBack = () => {
    //     router.visit(route("complaint.index"));
    // };

    // const uploadProps = {
    //     beforeUpload: (file) => {
    //         // Validasi file (opsional)
    //         const isValidType =
    //             file.type === "image/jpeg" ||
    //             file.type === "image/png" ||
    //             file.type === "application/pdf";

    //         if (!isValidType) {
    //             messageApi.error(
    //                 "Hanya dapat mengunggah file JPG, PNG, atau PDF!"
    //             );
    //             return Upload.LIST_IGNORE;
    //         }

    //         const isLt5M = file.size / 1024 / 1024 < 5;
    //         if (!isLt5M) {
    //             messageApi.error("File harus lebih kecil dari 5MB!");
    //             return Upload.LIST_IGNORE;
    //         }

    //         setFileList([file]);
    //         return false; // Prevent auto upload
    //     },
    //     onRemove: () => {
    //         setFileList([]);
    //     },
    //     fileList: fileList,
    //     maxCount: 1,
    // };

    return (
        <>
            {contextHolder}
            <MainLayout
                isCollapsed={isCollapsed}
                isDrawerOpen={isDrawerOpen}
                isMobile={isMobile}
                setIsDrawerOpen={setIsDrawerOpen}
            >
                <Head title="Buat Pengaduan" />

                <Card
                    styles={{
                        body: {
                            paddingLeft: 0,
                            paddingRight: 0,
                        },
                    }}
                >
                    <Typography.Title
                        level={isMobile ? 4 : 2}
                        style={{
                            textAlign: "center",
                            marginBottom: 32,
                        }}
                    >
                        Form Pengisian Kategori Aduan
                    </Typography.Title>

                    <Form
                        form={form}
                        // onFinish={handleSubmit}
                        layout="vertical"
                        style={{
                            padding: isMobile ? "1rem" : "1.1rem",
                            margin: isMobile ? "0" : "auto 2rem",
                        }}
                    >
                        {isMobile ? (
                            <>
                                <Form.Item
                                    label={
                                        <Typography.Text strong>
                                            Kategori Aduan{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Typography.Text>
                                    }
                                    // name="complaint_category_id"
                                    
                                    rules={[
                                        {
                                            required: true,
                                            message: "Tambahkan kategori aduan!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Masukkan Kategori Aduan" 
                                        style={{ 
                                            borderRadius: ".5rem",
                                            borderColor: pallete.grey[300]
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label= {
                                        <Typography.Text strong>
                                            Deskripsi{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Typography.Text>
                                    }
                                    // name="content"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Isi deskripsi kategori aduan tidak boleh kosong!",
                                        },
                                        {
                                            min: 10,
                                            message:
                                                "Isi deskripsi kategori aduan minimal 10 karakter!",
                                        },
                                    ]}
                                >
                                    <TextArea
                                        rows={7}
                                        placeholder="Tulis deskripsi kategori aduan ..."
                                        showCount
                                        maxLength={1000}
                                    />
                                </Form.Item>

                                <Form.Item
                                    style={{
                                        marginBottom: 0,
                                        textAlign: "center",
                                    }}
                                >
                                    <Button
                                        // onClick={handleBack}
                                        disabled={uploading}
                                        style={{ marginRight: 8 }}
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
                                </Form.Item>
                            </>
                        ) : (
                            <>
                                <Row gutter={16}>
                                    <Col span={5}>
                                        <Typography.Text strong>
                                            Kategori Aduan{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Typography.Text>
                                    </Col>
                                    <Col span={19}>
                                        <Form.Item
                                            // name="complaint_category_id"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Masukkan kategori aduan!",
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Masukkan Kategori Aduan" 
                                                style={{ 
                                                    borderRadius: ".3rem",
                                                    borderColor: pallete.grey[300]
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
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
                                            // name="content"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Isi deskripsi kategori aduan tidak boleh kosong!",
                                                },
                                                {
                                                    min: 10,
                                                    message:
                                                        "Isi deskripsi kategori aduan minimal 10 karakter!",
                                                },
                                            ]}
                                        >
                                            <TextArea
                                                rows={7}
                                                placeholder="Tulis deskripsi kategori aduan ..."
                                                showCount
                                                maxLength={1000}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item
                                    style={{
                                        marginBottom: 0,
                                        textAlign: "center",
                                        marginTop: 24,
                                    }}
                                >
                                    <Button
                                        // onClick={handleBack}
                                        // disabled={uploading}
                                        style={{ marginRight: 8 }}
                                    >
                                        Kembali
                                    </Button>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        // loading={uploading}
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form>
                </Card>
            </MainLayout>
        </>
    );
}