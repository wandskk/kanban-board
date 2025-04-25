import React from "react";
import { CommonComponent } from "@/types/commonComponentProps";

const Div = (props: CommonComponent) => {
  const { children, className } = props;
  return <div className={className}>{children}</div>;
};

export default Div;
