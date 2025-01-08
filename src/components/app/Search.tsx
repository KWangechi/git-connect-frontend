import { SearchProps } from "@/utils/types";
import { Input } from "../ui/input";

const Search = ({ searchTerm, setSearchTerm }: SearchProps) => {
  return (
    <Input
      className="my-4 rounded"
      type="text"
      placeholder="Search title, username..."
      onChange={(e) => setSearchTerm(e.target.value)}
      value={searchTerm}
    />
  );
};

export default Search;
