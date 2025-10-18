import { Button, Col, Divider, Flex, Row, Typography, Image } from 'antd';
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Card, Form, message } from "antd";
import useTitleStore from "@/store/titleStore";
import { Icon } from "@iconify/react";
import {
    useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from 'react';
import pallete from '@/utils/pallete';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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

    const getName = auth.user.name;
    const name = capitalizeFirstLetter(getName);

    useEffect(() => {
            setTitle("Dashboard");
        }, [setTitle]);

    return (
        <>
            {isMobile ? (
                <> 
                    <Row>
                        <Card variant='borderless' style={{ 
                            background: pallete.info.darker, 
                            width: "100%",
                            height: "45vh",
                        }}>
                            <div style={{ marginLeft: ".6rem" }}>
                                <Row gutter={16}>
                                    <Image 
                                        alt="Si Cerdas Gantarang"
                                        src="/Bulukumba_Regency_Logo.png"
                                        width={40}
                                        preview={false}
                                    />
                                    <Col span={12}>
                                        <Image 
                                            alt="Si Cerdas Gantarang"
                                            src="/logo si cerdas gantarang with text.png"
                                            width={60}
                                            preview={false}
                                        />
                                    </Col>
                                </Row>
                            </div>
                            
                            <Typography.Title style={{ color: "#fff", fontSize: "1.5rem" }}>Selamat Datang, {name}!</Typography.Title>

                            <Row>
                                <Col span={24}>
                                    <Typography.Text style={{ color: pallete.grey[200] }}>Terima kasih telah menggunakan <Typography.Text strong style={{ color: pallete.grey[200] }}>Si Cerdas Gantarang</Typography.Text>.</Typography.Text>
                                </Col>
                                <Col span={24}>
                                    <Typography.Text style={{ color: pallete.grey[200] }}>Silakan ajukan aduan atau permohonan administrasi Anda melalui menu di bawah ini.</Typography.Text>
                                </Col>
                            </Row>

                            <Col span={24}>
                                <Row justify={'space-between'} style={{ marginTop: "1rem" }}>
                                    <Link href='/pengaduan'>
                                        <Col>
                                            <Button className='shadow-md'>
                                                Pengaduan
                                            </Button>
                                        </Col>
                                    </Link>
                                    <Link href='/pelayanan'>
                                        <Col>
                                            <Button className='shadow-md'>
                                                Pelayanan Administrasi
                                            </Button>
                                        </Col>
                                    </Link>
                                </Row>

                            </Col>

                        </Card>
                    </Row>

                    <Divider orientation='left' style={{ color: pallete.grey[900], marginTop: "2rem" }}>
                        Si Cerdas Gantarang
                    </Divider>
                    <Row style={{ color: pallete.grey[900], gap: ".1rem", padding: "0 .5rem" }}>
                        <Col span={24} style={{ color: pallete.grey[900] }}>
                            <Typography.Text>Butuh bantuan? Hubungi kami melalui:</Typography.Text>
                        </Col>

                        <Col span={24}>
                            <Row style={{ gap: ".5rem" }}>
                                <Icon icon={"material-symbols:call"} />
                                <Typography.Text style={{ color: pallete.grey[900] }}>Telepon: (021) 1234-5678</Typography.Text>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Row style={{ gap: ".5rem" }}>
                                <Icon icon={"material-symbols:phone-android-rounded"} />
                                <Typography.Text style={{ color: pallete.grey[900] }}>WhatsApp: 0812-3456-7890</Typography.Text>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Row style={{ gap: ".5rem" }}>
                                <Icon icon={"material-symbols:stacked-email-outline-rounded"} />
                                <Typography.Text style={{ color: pallete.grey[900] }}>Email: cs@sicerdasgantarang.go.id</Typography.Text>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Row style={{ gap: ".5rem" }}>
                                <Icon icon={"material-symbols:pin-drop-rounded"} />
                                <Typography.Text style={{ color: pallete.grey[900] }}>Alamat: Kantor Camat Gantarang Bulukumba</Typography.Text>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Row style={{ gap: ".5rem" }}>
                                <Icon icon={"material-symbols:nest-clock-farsight-analog-outline-rounded"} />
                                <Typography.Text style={{ color: pallete.grey[900] }}>Jam Layanan: Senin–Jumat, 08.00–16.00 WITA</Typography.Text>
                            </Row>
                        </Col>
                        
                    </Row>
                    
                </>
            ) : (
                <> 
                    <Row>
                        <Card variant='borderless' style={{ 
                            background: pallete.info.darker, 
                            width: "100%",
                            height: "37vh",
                        }}>
                            <div style={{ marginLeft: ".6rem" }}>
                                <Row gutter={16}>
                                    <Image 
                                        alt="Si Cerdas Gantarang"
                                        src="/Bulukumba_Regency_Logo.png"
                                        width={50}
                                        preview={false}
                                    />
                                    <Col span={12}>
                                        <Image 
                                            alt="Si Cerdas Gantarang"
                                            src="/logo si cerdas gantarang with text.png"
                                            width={70}
                                            preview={false}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        
                            <Typography.Title style={{ color: "#fff" }}>Selamat Datang, {name}!</Typography.Title>

                            <Row>
                                <Col span={24}>
                                    <Typography.Text style={{ color: pallete.grey[200] }}>Terima kasih telah menggunakan <Typography.Text strong style={{ color: pallete.grey[200] }}>Si Cerdas Gantarang</Typography.Text>.</Typography.Text>
                                </Col>
                                <Col span={24}>
                                    <Typography.Text style={{ color: pallete.grey[200] }}>Silakan ajukan aduan atau permohonan administrasi Anda melalui menu di bawah ini.</Typography.Text>
                                </Col>
                            </Row>

                            <Col span={6}>
                                <Row justify={'space-around'} style={{ marginTop: "1rem" }}>
                                    <Link href='/pengaduan'>
                                        <Col>
                                            <Button className='shadow-md'>
                                                Pengaduan
                                            </Button>
                                        </Col>
                                    </Link>
                                    <Link href='/pelayanan'>
                                        <Col>
                                            <Button className='shadow-md'>
                                                Pelayanan Administrasi
                                            </Button>
                                        </Col>
                                    </Link>
                                </Row>
                            </Col>
                        </Card>
                    </Row>

                    <Divider orientation='left' style={{ color: pallete.grey[900], marginTop: "2rem" }}>
                        {/* Si Cerdas Gantarang */}
                    </Divider>
                    <Row style={{ color: pallete.grey[900], gap: ".5rem" }}>
                        <Col span={24} style={{ color: pallete.grey[900] }}>
                            <Typography.Text>Butuh bantuan? Hubungi kami melalui:</Typography.Text>
                        </Col>

                        <Col span={24}>
                            <Row style={{ gap: ".5rem" }}>
                                <Icon icon={"material-symbols:call"} />
                                <Typography.Text style={{ color: pallete.grey[900] }}>Telepon: (021) 1234-5678</Typography.Text>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Row style={{ gap: ".5rem" }}>
                                <Icon icon={"material-symbols:phone-android-rounded"} />
                                <Typography.Text style={{ color: pallete.grey[900] }}>WhatsApp: 0812-3456-7890</Typography.Text>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Row style={{ gap: ".5rem" }}>
                                <Icon icon={"material-symbols:stacked-email-outline-rounded"} />
                                <Typography.Text style={{ color: pallete.grey[900] }}>Email: cs@sicerdasgantarang.go.id</Typography.Text>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Row style={{ gap: ".5rem" }}>
                                <Icon icon={"material-symbols:pin-drop-rounded"} />
                                <Typography.Text style={{ color: pallete.grey[900] }}>Alamat: Kantor Camat Gantarang Bulukumba</Typography.Text>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <Row style={{ gap: ".5rem" }}>
                                <Icon icon={"material-symbols:nest-clock-farsight-analog-outline-rounded"} />
                                <Typography.Text style={{ color: pallete.grey[900] }}>Jam Layanan: Senin–Jumat, 08.00–16.00 WITA</Typography.Text>
                            </Row>
                        </Col>
                        
                    </Row>
                </>
            )}
        </>
    );
}
