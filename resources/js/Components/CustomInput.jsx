import React, { useState, useEffect } from "react";
import { Input, Form, Typography, DatePicker, Space, Button } from "antd";
import pallete from "@/utils/pallete";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

const { Text } = Typography;

const CustomInput = ({
    label,
    name,
    rules = [],
    placeholder,
    password = false,
    style = {},
    required = false,
    starLabel = true,
    type = "text",
    value,
    onChange,
    blackLabel = false,
    date = false,
    button = false,
    onclickButton,
    error,
    inputProps,
    isDisabled = false,
    formInstance, // Tambahkan prop ini untuk akses form instance
}) => {
    const [hover, setHover] = useState(false);
    const [isValid, setIsValid] = useState(false);

    let baseStyle = {
        transition: "all 0.3s ease-in-out",
        transform: hover ? "scale(1.05)" : "scale(1)",
    };

    const InputComponent = date ? DatePicker : Input;

    const className = blackLabel ? "text-black" : "text-white";
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
            <Text className={className}>{label}</Text>
            {starLabel && <Text style={{ color: "#940808" }}>*</Text>}
        </div>
    );

    // Gunakan useEffect untuk mengecek validasi
    useEffect(() => {
        if (formInstance) {
            formInstance
                .validateFields([name])
                .then(() => setIsValid(true))
                .catch(() => setIsValid(false));
        }
    }, [value, formInstance, name]);

    return (
        <Form.Item
            label={starLabel ? labelContent : label}
            name={name}
            required={false}
            rules={[
                { required: required, message: `${label} harus diisi` },
                ...rules,
            ]}
            style={{ fontWeight: 500 }}
            help={error}
            validateStatus={error ? "error" : ""}
        >
            {button ? (
                <Space.Compact style={{ width: "100%" }}>
                    {password ? (
                        <Input.Password
                            size="large"
                            placeholder={placeholder}
                            className="rounded-md border-grey-400 focus:border-primary-400 focus:border-0"
                            style={style}
                            value={value}
                            onChange={onChange}
                            iconRender={(visible) =>
                                visible ? (
                                    <EyeTwoTone />
                                ) : (
                                    <EyeInvisibleOutlined />
                                )
                            }
                            {...inputProps}
                        />
                    ) : (
                        <InputComponent
                            size="large"
                            placeholder={placeholder}
                            className="rounded-md border-grey-400 focus:border-primary-400 focus:border-0"
                            style={style}
                            value={value}
                            onChange={onChange}
                            type={type}
                            {...inputProps}
                        />
                    )}
                    <Button
                        onClick={onclickButton}
                        type="primary"
                        disabled={!isValid}
                        style={{
                            ...baseStyle,
                            padding: 10,
                            height: "100%",
                            backgroundColor: isValid
                                ? pallete.success.dark
                                : "#ccc",
                            fontWeight: 600,
                            cursor: isValid ? "pointer" : "not-allowed",
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        Cek Riwayat
                    </Button>
                </Space.Compact>
            ) : password ? (
                <Input.Password
                    size="large"
                    disabled={isDisabled}
                    placeholder={placeholder}
                    className="rounded-md border-grey-400 focus:border-primary-400 focus:border-0"
                    style={style}
                    value={value}
                    onChange={onChange}
                    iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    {...inputProps}
                />
            ) : (
                <InputComponent
                    size="large"
                    disabled={isDisabled}
                    placeholder={placeholder}
                    className="rounded-md border-grey-400 focus:border-primary-400 focus:border-0"
                    style={style}
                    value={value}
                    onChange={onChange}
                    type={type}
                    {...inputProps}
                />
            )}
        </Form.Item>
    );
};

export default CustomInput;
