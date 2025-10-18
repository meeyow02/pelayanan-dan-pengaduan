import { Button, Input, Typography, Form, Card, message } from "antd";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, router, usePage } from "@inertiajs/react";
import useTitleStore from "@/store/titleStore";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import pallete from "@/utils/pallete";

export default function ServiceCategoryForm() {
    const [form] = Form.useForm();
    const { setTitle } = useTitleStore();
    const { flash, serviceCategory } = usePage().props;

    const { isMobile } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsDrawerOpen } = useSidebarStore();

    const [messageApi, contextHolder] = message.useMessage();
    const [isEditMode, setIsEditMode] = useState(!!serviceCategory);

    // Set title sesuai mode
    useEffect(() => {
        setTitle(
            isEditMode ? "Edit Kategori Pelayanan" : "Buat Kategori Pelayanan"
        );
    }, [setTitle, isEditMode]);

    // Prefill data form jika edit
    useEffect(() => {
        if (isEditMode && serviceCategory) {
            form.setFieldsValue({
                name: serviceCategory.name,
                description: serviceCategory.description,
            });
        }
    }, [isEditMode, serviceCategory, form]);

    // Flash message
    useEffect(() => {
        if (flash?.success) messageApi.success(flash.success);
        if (flash?.error) messageApi.error(flash.error);
    }, [flash, messageApi]);

    // Submit handler
    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);

        if (isEditMode) {
            formData.append("_method", "put");

            router.post(
                route("service-category.update", serviceCategory.id),
                formData,
                {
                    forceFormData: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        messageApi.success(
                            "Kategori Pelayanan berhasil diperbarui!"
                        );
                        router.visit(route("service-category.index"));
                    },
                    onError: (errors) => {
                        console.error("❌ Validation errors:", errors);
                        messageApi.error("Gagal memperbarui kategori!");
                    },
                }
            );
        } else {
            router.post(route("service-category.store"), formData, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    messageApi.success("Kategori Pelayanan berhasil dibuat!");
                    router.visit(route("service-category.index"));
                },
            });
        }
    };

    const handleBack = () => {
        router.visit(route("service-category.index"));
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
                <Head
                    title={
                        isEditMode
                            ? "Edit Kategori Pelayanan"
                            : "Buat Kategori Pelayanan"
                    }
                />

                <Card
                    styles={{
                        body: { paddingLeft: 0, paddingRight: 0 },
                    }}
                >
                    <Typography.Title
                        level={isMobile ? 4 : 2}
                        style={{ textAlign: "center", marginBottom: 32 }}
                    >
                        {isEditMode
                            ? "Edit Kategori Pelayanan"
                            : "Form Pengisian Kategori Pelayanan"}
                    </Typography.Title>

                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        layout="vertical"
                        style={{
                            padding: isMobile ? "1rem" : "1.1rem",
                            margin: isMobile ? "0" : "auto 2rem",
                        }}
                    >
                        {/* Nama Kategori */}
                        <Form.Item
                            label={
                                <Typography.Text strong>
                                    Kategori Pelayanan{" "}
                                    <span style={{ color: "red" }}>*</span>
                                </Typography.Text>
                            }
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Masukkan kategori Pelayanan!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Masukkan Kategori Pelayanan"
                                style={{
                                    borderRadius: ".5rem",
                                    borderColor: pallete.grey[300],
                                }}
                            />
                        </Form.Item>

                        {/* Deskripsi */}
                        <Form.Item
                            label={
                                <Typography.Text strong>
                                    Deskripsi{" "}
                                    <span style={{ color: "red" }}>*</span>
                                </Typography.Text>
                            }
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Isi deskripsi kategori Pelayanan tidak boleh kosong!",
                                },
                                {
                                    min: 10,
                                    message:
                                        "Isi deskripsi kategori Pelayanan minimal 10 karakter!",
                                },
                            ]}
                        >
                            <TextArea
                                rows={7}
                                placeholder="Tulis deskripsi kategori Pelayanan ..."
                                showCount
                                maxLength={1000}
                            />
                        </Form.Item>

                        {/* Tombol Aksi */}
                        <Form.Item
                            style={{ textAlign: "center", marginBottom: 0 }}
                        >
                            <Button
                                onClick={handleBack}
                                style={{ marginRight: 8 }}
                            >
                                Kembali
                            </Button>
                            <Button type="primary" htmlType="submit">
                                {isEditMode ? "Update" : "Submit"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </MainLayout>
        </>
    );
}
