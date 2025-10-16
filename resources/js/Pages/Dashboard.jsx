import { Button, Col, Divider, Flex, Row, Typography } from 'antd';
import { useResponsive } from "@/hooks/useResponsive";
import MainLayout from "@/Layouts/MainLayout";
import useSidebarStore from "@/store/sidebarStore";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Card, Form, message } from "antd";
import useTitleStore from "@/store/titleStore";
import {
    useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from 'react';
import Admin from './Dashboard/Admin';
import User from './Dashboard/User';
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
            {contextHolder}
            <MainLayout
                isCollapsed={isCollapsed}
                isDrawerOpen={isDrawerOpen}
                isMobile={isMobile}
                setIsDrawerOpen={setIsDrawerOpen}
            >
                <Head title="Dashboard" />
                
                {auth.user.role == "admin" ? (
                    <Admin />

                ) : (
                    <User />
                )}
                
            </MainLayout>
        </>
    );
}
