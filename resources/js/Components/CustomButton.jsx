import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import pallete from "../utils/pallete";

const CustomButton = ({
    children,
    variant = "primary", // Default variant
    loading = false,
    disabled = false,
    onClick,
    htmlType = "button",
    size = "large",
    className = "",
    block = false,
    props,
}) => {
    const [hover, setHover] = React.useState(false);

    const getButtonStyle = () => {
        let baseStyle = {
            transition: "all 0.3s ease-in-out",
            transform: hover ? "scale(1.05)" : "scale(1)",
        };

        switch (variant) {
            case "primary":
                return {
                    ...baseStyle,
                    background: hover
                        ? pallete.primary[400]
                        : pallete.primary[500],
                    color: pallete.background.white,
                    border: "none",
                };
            case "secondary":
                return {
                    ...baseStyle,
                    background: hover ? pallete.grey[300] : "transparent",
                    color: pallete.primary[500],
                    border: `1px solid ${pallete.primary[500]}`,
                };
            case "danger":
                return {
                    ...baseStyle,
                    background: pallete.danger.main || "#ff4d4f",
                    color: pallete.background.white,
                    border: "none",
                };
            case "success":
                return {
                    ...baseStyle,
                    background: pallete.success.dark || "#ff4d4f",
                    color: pallete.background.white,
                    border: "none",
                };
            case "white":
                return {
                    ...baseStyle,
                    background: pallete.background.white,
                    color: pallete.primary[500],
                    border: "none",
                };
            case "disabled":
                return {
                    ...baseStyle,
                    background: "#ccc",
                    color: "#00000040",
                    border: "none",
                };
            default:
                return {
                    ...baseStyle,
                    background: pallete.primary[500],
                    color: pallete.background.white,
                    border: "none",
                };
        }
    };

    return (
        <Button
            style={getButtonStyle()}
            loading={loading}
            disabled={disabled}
            htmlType={htmlType}
            size={size}
            className={`${className}`}
            block={block}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            {...props}
        >
            {children}
        </Button>
    );
};

CustomButton.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    htmlType: PropTypes.string,
    size: PropTypes.oneOf(["small", "middle", "large"]),
    className: PropTypes.string,
    block: PropTypes.bool,
};

export default CustomButton;
