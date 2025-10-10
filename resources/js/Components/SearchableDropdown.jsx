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
    }
`;

const SearchableDropdown = ({
    label,
    options = [],
    value,
    onChange,
    placeholder = "Pilih...",
    showSearch = true,
    allowClear = false,
    ...restProps
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
                showSearch={showSearch}
                allowClear={allowClear}
                placeholder={placeholder}
                optionFilterProp="children"
                value={value}
                onChange={onChange}
                filterOption={(input, option) =>
                    option?.children
                        ?.toLowerCase()
                        .includes(input.toLowerCase())
                }
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
                {...restProps}
            >
                {options.map((opt) => (
                    <Option key={opt.value} value={opt.value}>
                        {opt.label}
                    </Option>
                ))}
            </StyledSelect>
        </div>
    );
};

export default SearchableDropdown;
