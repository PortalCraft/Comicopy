"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";

type Props = {
  scroller?: HTMLElement | null;
  isVisible?: boolean;
  className?: string;
};

const BackTop = (props: Props) => {
  const {
    scroller = window,
    isVisible = true,
    className,
  } = props;

  const onClick = () => {
    scroller?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      variant="outline"
      className={cn("aspect-square p-2 rounded-full", !isVisible && "hidden", className)}
      onClick={onClick}
    >
      <ChevronUp />
    </Button>
  );
};

export default BackTop;