import { Form, Input, Space, Typography } from "antd";

const { Text } = Typography;

const CustomInputDosage = ({
    label,
    starLabel = true,
    required = false,
    rules = [],
    isDisabled = false,
    value1,
    value2,
    value3,
    value4,
    onChange1,
    onChange2,
    onChange3,
    onChange4,
}) => {
    const labelContent = (
        <div
            style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
                maxWidth: "100%",
            }}
        >
            <Text className="text-white">{label}</Text>
            {starLabel && <Text style={{ color: "#940808" }}>*</Text>}
        </div>
    );

    const inputClassName =
        "rounded-md border-grey-400 focus:border-primary-400 focus:border-0.5";

    return (
        <Form.Item
            label={starLabel ? labelContent : label}
            required={false}
            rules={[
                { required: required, message: `${label} harus diisi` },
                ...rules,
            ]}
            style={{
                fontWeight: 500,
                marginBottom: 20,
            }}
        >
            <Space.Compact size="large" style={{ width: "100%" }}>
                <Input
                    placeholder="Pagi"
                    className={inputClassName}
                    value={value1}
                    onChange={onChange1}
                    type="number"
                    style={{ width: "25%" }} // Tambahkan width untuk setiap input
                    disabled={isDisabled}
                />
                <Input
                    placeholder="Siang"
                    className={inputClassName}
                    value={value2}
                    onChange={onChange2}
                    type="number"
                    style={{ width: "25%" }}
                    disabled={isDisabled}
                />
                <Input
                    placeholder="Sore"
                    className={inputClassName}
                    value={value3}
                    onChange={onChange3}
                    type="number"
                    style={{ width: "25%" }}
                    disabled={isDisabled}
                />
                <Input
                    placeholder="Malam"
                    className={inputClassName}
                    value={value4}
                    onChange={onChange4}
                    type="number"
                    style={{ width: "25%" }}
                    disabled={isDisabled}
                />
            </Space.Compact>
        </Form.Item>
    );
};

export default CustomInputDosage;
