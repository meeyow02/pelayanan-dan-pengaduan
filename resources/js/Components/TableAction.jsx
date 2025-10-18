import { Icon } from "@iconify/react";
import { Button, Flex, Typography, Modal } from "antd";
import { useState } from "react";
import pallete from "../utils/pallete";

const { Text, Title } = Typography;

export default function TableAction({
    onClickEdit,
    handleDelete,
    deleteLoading,
    onClickDetail,
    showDelete = true,
    showEdit = true,
    showDetail = false,
}) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await handleDelete();
            setIsModalVisible(false);
        } catch (error) {
            console.error("Gagal menghapus data:", error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Flex gap={10} justify="end">
                {showDetail && (
                    <Icon
                        icon={"material-symbols:visibility"}
                        onClick={onClickDetail}
                        color={pallete.green[500]}
                        style={{
                            cursor: "pointer",
                            backgroundColor: pallete.green[100],
                            padding: "8px", // ✅ Adjust padding for better spacing
                            borderRadius: "6px", // ✅ Slightly rounded background
                            display: "flex", // ✅ Ensures proper alignment
                            alignItems: "center",
                            justifyContent: "center",
                            width: "32px", // ✅ Set explicit width
                            height: "32px", // ✅ Set explicit height
                            fontSize: "20px", // ✅ Adjust font size
                            transition: "all 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = pallete.green[300];
                            e.target.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = pallete.green[100];
                            e.target.style.transform = "scale(1)";
                        }}
                    />
                )}

                {showEdit && (
                    <Icon
                        icon="material-symbols:edit"
                        onClick={onClickEdit}
                        color={pallete.primary[500]}
                        style={{
                            cursor: "pointer",
                            backgroundColor: pallete.primary[100],
                            padding: "8px", // ✅ Adjust padding for better spacing
                            borderRadius: "6px", // ✅ Slightly rounded background
                            display: "flex", // ✅ Ensures proper alignment
                            alignItems: "center",
                            justifyContent: "center",
                            width: "32px", // ✅ Set explicit width
                            height: "32px", // ✅ Set explicit height
                            fontSize: "20px", // ✅ Adjust font size
                            transition: "all 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor =
                                pallete.primary[300];
                            e.target.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor =
                                pallete.primary[100];
                            e.target.style.transform = "scale(1)";
                        }}
                    />
                )}

                {showDelete && (
                    <Icon
                        icon={"material-symbols:delete"}
                        onClick={showModal}
                        color={pallete.danger.main}
                        style={{
                            cursor: "pointer",
                            backgroundColor: pallete.danger.lighter,
                            padding: "8px", // ✅ Adjust padding for better spacing
                            borderRadius: "6px", // ✅ Slightly rounded background
                            display: "flex", // ✅ Ensures proper alignment
                            alignItems: "center",
                            justifyContent: "center",
                            width: "32px", // ✅ Set explicit width
                            height: "32px", // ✅ Set explicit height
                            fontSize: "20px", // ✅ Adjust font size
                            transition: "all 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor =
                                pallete.danger.light;
                            e.target.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor =
                                pallete.danger.lighter;
                            e.target.style.transform = "scale(1)";
                        }}
                    />
                )}
            </Flex>

            <Modal
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                centered
                closable={false}
                style={{
                    textAlign: "center",
                    padding: "24px",
                    borderRadius: "16px",
                }}
            >
                <Flex justify="center" style={{ marginBottom: "16px" }}>
                    <Icon
                        icon="material-symbols:delete-forever"
                        width="60"
                        height="60"
                        color={pallete.danger.main}
                    />
                </Flex>
                <Title level={4} style={{ marginBottom: "8px" }}>
                    Apakah Anda yakin menghapus data ini?
                </Title>
                <Text style={{ color: "#7A7A7A" }}>
                    Data yang telah dihapus tidak dapat dibatalkan.
                </Text>
                <Flex justify="center" gap={10} style={{ marginTop: "24px" }}>
                    <Button
                        onClick={handleCancel}
                        style={{
                            border: `2px solid ${pallete.danger.main}`,
                            color: pallete.danger.main,
                            borderRadius: "100px",
                            fontWeight: "600",
                            padding: "24px 32px",
                        }}
                    >
                        Batal
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        loading={deleteLoading}
                        style={{
                            backgroundColor: pallete.danger.main,
                            color: pallete.background.white,
                            fontWeight: "600",
                            borderRadius: "100px",
                            padding: "24px 32px",
                        }}
                    >
                        Ya, Hapus
                    </Button>
                </Flex>
            </Modal>
        </>
    );
}
