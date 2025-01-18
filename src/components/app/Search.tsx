import { SearchProps } from "@/utils/types";
import { Input } from "../ui/input";
import { SearchIcon } from "lucide-react";

const Search = ({ searchTerm, setSearchTerm }: SearchProps) => {
  return (
    <div className="flex items-center relative">
      <div className="absolute inset-y-0 left-2 flex items-center">
        <SearchIcon size={20} />
      </div>
      <Input
        className="my-4 rounded pl-8"
        type="text"
        placeholder="Search job title, username, etc..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </div>
  );
};

export default Search;
