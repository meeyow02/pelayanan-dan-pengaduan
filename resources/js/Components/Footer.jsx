import pallete from "@/utils/pallete";
import { Layout } from "antd";

export default function Footer() {
    return (
        <Layout.Footer
            style={{
                background: pallete.background.white,
                height: 60,
                padding: "20px 28px",
                color: pallete.grey[600],
            }}
        >
            © Copyright 2025. Si Cerdas Gantarang.
        </Layout.Footer>
    );
}
