"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Pagination = () => {
  return (
    <Select>
      <SelectTrigger className="sticky top-4 w-24 focus:ring-0">
        <SelectValue placeholder="1 / 3" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">1</SelectItem>
        <SelectItem value="2">2</SelectItem>
        <SelectItem value="3">3</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Pagination;