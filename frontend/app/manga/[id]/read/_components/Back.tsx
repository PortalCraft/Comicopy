"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Back = () => {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  return (
    <Button
      variant="ghost"
      className="sticky top-2 mt-2 p-2 text-zinc-400 rounded-full hover:text-black"
      onClick={onClick}
    >
      <ChevronLeft className="!size-7" />
    </Button>
  );
};

export default Back;