import React from "react";
import { Select } from "antd";
import styled from "styled-components";

const { Option } = Select;

const StyledSelect = styled(Select)`
    width: 100%;

    .ant-select-selector {
        height: 40px !important;
        padding: 8px 11px !important;
        border-radius: 6px !important;
        font-size: 16px !important;
        display: flex;
        align-items: center;
        border: none !important;
        box-shadow: none !important;
        outline: none !important;
        transition: none !important;
        background-color: #f5f5f5; /* Default active background */
    }

    .ant-select:hover .ant-select-selector,
    .ant-select-focused .ant-select-selector,
    .ant-select-open .ant-select-selector,
    .ant-select-selector:focus,
    .ant-select-selector:active {
        border: none !important;
        box-shadow: none !important;
        outline: none !important;
    }

    .ant-select-selection-placeholder,
    .ant-select-selection-item {
        line-height: 22px !important;
        display: flex;
        align-items: center;
    }

    .ant-select-arrow {
        top: 80% !important;
        transform: translateY(-50%) !important;
        right: 11px !important;
    }

    .ant-select-selection-search {
        display: flex;
        align-items: center;
    }

    .ant-select-selection-search-input {
        height: 30px !important;
        display: flex !important;
        align-items: center !important;
        outline: none !important;
        box-shadow: none !important;
    }
`;

const CustomSelect = ({
    label,
    placeholder,
    value,
    onChange,
    options = [],
    optionLabelKey = "label",
    optionValueKey = "value",
    style = {},
    isDisabled = false,
}) => {
    return (
        <div style={{ marginBottom: 28 }}>
            {label && (
                <label
                    style={{
                        display: "block",
                        marginBottom: 8,
                        fontWeight: 500,
                    }}
                >
                    {label}
                </label>
            )}
            <StyledSelect
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={style}
                suffixIcon={
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                }
                disabled={isDisabled}
            >
                {options.map((opt) => (
                    <Option
                        key={opt[optionValueKey]}
                        value={opt[optionValueKey]}
                    >
                        {opt[optionLabelKey]}
                    </Option>
                ))}
            </StyledSelect>
        </div>
    );
};

export default CustomSelect;
