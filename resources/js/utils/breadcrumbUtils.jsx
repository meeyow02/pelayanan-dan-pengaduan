import { Link, usePage } from "@inertiajs/react";
import pallete from "./pallete";

export const breadcrumbMap = {
    "/": { title: "Insulin" },
    "/insulin-pen-history": { title: "Riwayat Pen Insulin" },
};

export const generateBreadcrumbItems = () => {
    const { url } = usePage();
    const pathSegments = url.split("/").filter(Boolean);

    // Jika hanya root (/), langsung tampilkan "Insulin"
    if (pathSegments.length === 0) {
        return [
            {
                key: "/",
                title: (
                    <span style={{ color: pallete.primary[600] }}>Insulin</span>
                ),
            },
        ];
    }

    // Membentuk breadcrumb berdasarkan segment URL
    const breadcrumbItems = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const config = breadcrumbMap[path] || { title: segment };

        return {
            key: path,
            title:
                index === pathSegments.length - 1 ? (
                    <span style={{ color: pallete.primary[600] }}>
                        {config.title}
                    </span>
                ) : (
                    <Link href={path}>{config.title}</Link>
                ),
        };
    });

    return [...breadcrumbItems];
};
