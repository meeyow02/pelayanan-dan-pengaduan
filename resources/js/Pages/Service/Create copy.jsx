import { Button, Col, Flex, Input, Row, Select, Space, Table, Tag, Typography, Upload } from "antd";
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Card, Form, message } from "antd";
import useTitleStore from "@/store/titleStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useTableHeight } from "@/hooks/useTableHeight";
import TextArea from "antd/es/input/TextArea";


export default function Index() {
    // Hooks
    const [form] = Form.useForm();
    const { setTitle } = useTitleStore();
    const { flash, auth, complaints } = usePage().props;
    const tableHeight = useTableHeight(420);

    const { isMobile, isTablet } = useResponsive();
    const { isCollapsed, isDrawerOpen, setIsCollapsed, setIsDrawerOpen } =
        useSidebarStore();
    const queryClient = useQueryClient();

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setTitle("Pelayanan");
    }, [setTitle]);

    return (
        <>
            {contextHolder}
            <MainLayout
                isCollapsed={isCollapsed}
                isDrawerOpen={isDrawerOpen}
                isMobile={isMobile}
                setIsDrawerOpen={setIsDrawerOpen}
            >
                <Head title="Pengaduan" />

                <Card
                    styles={{
                        body: {
                            paddingLeft: 0,
                            paddingRight: 0,
                        },
                    }}
                >
                    <Typography.Title
                        style={{ 
                            fontSize: "2rem",
                            textAlign: "center"
                        }}
                    >
                        Form Pengisian Aduan
                    </Typography.Title>
                    <Form 
                        // labelCol={{ span: 4 }}
                        // wrapperCol={{ span: 14 }}
                        // layout="horizontal"
                        form={form}
                        style={{ 
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            padding: "1.1rem",
                            margin: "auto 2rem"
                        }}
                    >   
                        <Row>
                            <Col span={5}>
                                <Typography.Text>Kategori Aduan</Typography.Text>
                            </Col>
                            <Col span={19}>
                                <Form.Item>
                                    <Select>
                                        <Select.Option value="security">Keamanan & Ketertiban</Select.Option>
                                        <Select.Option value="environment">Kebersihan & Lingkungan</Select.Option>
                                        <Select.Option value="infrastructure">Infrastruktur & Fasilitas Umum</Select.Option>
                                        <Select.Option value="service">Pelayanan Publik</Select.Option>
                                        <Select.Option value="social">Sosial & Kesejahteraan</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={5}>
                                <Typography.Text>Isi Aduan</Typography.Text>
                            </Col>
                            <Col span={19}>
                                <Form.Item>
                                    <TextArea rows={7} />
                                </Form.Item>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col span={5}>
                                <Typography.Text>Unggah Dokumen Pendukung</Typography.Text>
                            </Col>
                            <Col span={19}>
                                <Form.Item>
                                    <Form.Item name="filename" valuePropName="filename" noStyle>
                                        <Upload.Dragger name="filename" action="/upload.do">
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                            </p>
                                            <p className="ant-upload-text">Klik atau unggah file ke area ini</p>
                                            <p className="ant-upload-hint">Dapat mengunggah satu atau beberapa file sekaligus.</p>
                                        </Upload.Dragger>
                                    </Form.Item>    
                                </Form.Item>
                            </Col>
                        </Row>


                        <Form.Item
                            style={{ 
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "1rem"
                            }}
                        >
                                <Space>
                                    <Button>Kembali</Button>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Space>
                        </Form.Item>
                        
                    </Form>
                </Card>
            </MainLayout>
        </>
    );
}
