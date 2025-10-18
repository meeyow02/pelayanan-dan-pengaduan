import { Button, Input, Typography, Form, Card, message } from "antd";
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, router, usePage } from "@inertiajs/react";
import useTitleStore from "@/store/titleStore";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import pallete from "@/utils/pallete";

export default function ComplaintCategoryForm() {
    const [form] = Form.useForm();
    const { setTitle } = useTitleStore();
    const { flash, complaintCategory } = usePage().props;

    const { isMobile } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsDrawerOpen } = useSidebarStore();

    const [messageApi, contextHolder] = message.useMessage();
    const [isEditMode, setIsEditMode] = useState(!!complaintCategory);

    // Set title sesuai mode
    useEffect(() => {
        setTitle(isEditMode ? "Edit Kategori Aduan" : "Buat Kategori Aduan");
    }, [setTitle, isEditMode]);

    // Prefill data form jika edit
    useEffect(() => {
        if (isEditMode && complaintCategory) {
            form.setFieldsValue({
                name: complaintCategory.name,
                description: complaintCategory.description,
            });
        }
    }, [isEditMode, complaintCategory, form]);

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
                route("complaint-category.update", complaintCategory.id),
                formData,
                {
                    forceFormData: true,
                    preserveScroll: true,
                    onError: (errors) => {
                        console.error("❌ Validation errors:", errors);
                        messageApi.error("Gagal memperbarui kategori!");
                    },
                }
            );
        } else {
            router.post(route("complaint-category.store"), formData, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    messageApi.success("Kategori aduan berhasil dibuat!");
                    router.visit(route("complaint-category.index"));
                },
            });
        }
    };

    const handleBack = () => {
        router.visit(route("complaint-category.index"));
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
                            ? "Edit Kategori Aduan"
                            : "Buat Kategori Aduan"
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
                            ? "Edit Kategori Aduan"
                            : "Form Pengisian Kategori Aduan"}
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
                                    Kategori Aduan{" "}
                                    <span style={{ color: "red" }}>*</span>
                                </Typography.Text>
                            }
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Masukkan kategori aduan!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Masukkan Kategori Aduan"
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
