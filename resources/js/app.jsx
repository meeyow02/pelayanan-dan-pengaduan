import '../css/app.css';
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { ConfigProvider } from "antd";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import idID from "antd/locale/id_ID";
import pallete from "./utils/pallete";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const appName = import.meta.env.VITE_APP_NAME || "HIP";
const queryClient = new QueryClient();

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ConfigProvider
                locale={idID}
                theme={{
                    token: {
                        fontFamily: "'Poppins', sans-serif",
                        colorPrimary: pallete.primary[500],
                        colorSuccess: pallete.success.main,
                        colorWarning: pallete.warning.main,
                        colorError: pallete.danger.main,
                    },
                    components: {
                        Layout: {
                            siderBg: pallete.background.white,
                            headerBg: pallete.background.white,
                        },
                        Table: {
                            headerSplitColor: "",
                            headerBorderRadius: 0,
                        },
                        Form: {
                            itemMarginBottom: 14,
                            verticalLabelMargin: "0 0 -3px 0",
                            labelFontSize: 13,
                            labelColor: pallete.grey[700],
                        },
                    },
                }}
            >
                <QueryClientProvider client={queryClient}>
                    <App {...props} />
                </QueryClientProvider>
            </ConfigProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
