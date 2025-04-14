import React, {useState} from "react";
import { useSearchParams } from "react-router-dom";

const SearchUser = () => {
    const [search, setSearch] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (text) => {
        setSearch(text);

        if (text?.trim()) {
            searchParams.set("query", text);
        } else {
            searchParams.delete("query");
        }

        setSearchParams(searchParams, { replace: true });
    };

    return (
        <div className="bg-white p-4 md:p-6">
            <div className="mb-1">
              <input
                  type="text"
                  value={search}
                  placeholder="Search users..."
                  className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm"
                  onChange={(e) => handleChange(e.target.value)}
              />
            </div>
        </div>
    );
};
export default SearchUser;