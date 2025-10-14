import { Button, Col, Row, Select, Space, Typography, Upload } from "antd";
import { UploadOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, usePage } from "@inertiajs/react";
import { Card, Form, message  } from "antd";
import useTitleStore from "@/store/titleStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useTableHeight } from "@/hooks/useTableHeight";
import TextArea from "antd/es/input/TextArea";
import pallete from "@/utils/pallete";


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

    const props = {
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange({ file, fileList }) {
            if (file.status !== 'uploading') {
            console.log(file, fileList);
            }
        },
        defaultFileList: [
            {
            uid: '1',
            name: 'xxx.png',
            size: 1234567,
            status: 'done',
            url: 'http://www.baidu.com/xxx.png',
            },
            {
            uid: '2',
            name: 'yyy.png',
            size: 1234567,
            status: 'done',
            url: 'http://www.baidu.com/yyy.png',
            },
        ],
        showUploadList: {
            extra: ({ size = 0 }) => (
                <span style={{ color: '#cccccc' }}>({(size / 1024 / 1024).toFixed(2)}MB)</span>
            ),
            showDownloadIcon: true,            
            downloadIcon: <DownloadOutlined style={{ color: pallete.curiousBlue[500] }} onClick={e => console.log(e, 'custom removeIcon event')} />,
            showRemoveIcon: true,
            removeIcon: <DeleteOutlined style={{ color: pallete.danger.main }} onClick={e => console.log(e, 'custom removeIcon event')} />,
        },
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
                    <Typography.Title
                        style={{ 
                            fontSize: "2rem",
                            textAlign: "center",
                        }}
                    >
                        Detail Permohonan Layanan
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
                                <Typography.Text>Kategori Pelayanan Administrasi</Typography.Text>
                            </Col>
                            <Col span={19}>
                                <Form.Item>
                                    <Select>
                                        <Select.Option value="certification">Surat Keterangan & Dokumen</Select.Option>
                                        <Select.Option value="licensing">Perizinan & Rekomendasi</Select.Option>
                                        <Select.Option value="population">Administrasi Kependudukan</Select.Option>
                                        <Select.Option value="land">Pertanahan & Bangunan</Select.Option>
                                        <Select.Option value="community">Kegiatan Sosial & Kemasyarakatan</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col span={5}>
                                <Typography.Text>Dokumen Yang Diperlukan</Typography.Text>
                            </Col>
                            <Col span={8}>
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                                
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
                            </Space>
                        </Form.Item>
                        
                    </Form>
                </Card>
            </MainLayout>
        </>
    );
}