import { Icon } from "@iconify/react";
import { Input } from "antd";

const SearchInput = ({
    keyword,
    setKeyword,
    placeholder = "Cari",
    inputProps,
}) => {
    return (
        <Input
            onChange={setKeyword}
            value={keyword}
            style={{ width: 320 }}
            placeholder={placeholder}
            prefix={
                <Icon icon="material-symbols:search" width={16} height={16} />
            }
            {...inputProps}
        />
    );
};

export default SearchInput;
