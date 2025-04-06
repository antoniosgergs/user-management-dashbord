import React from "react";

const SearchUser = () =>{
    return (
<div className="bg-white p-4 md:p-6">
    <div className="mb-1    ">
      <input
          type="text"
          placeholder="Search users..."
          className="w-full md:w-1/3 px-4 py-2 border rounded shadow-sm"
      />
    </div>
</div>
    );
};
export default SearchUser;