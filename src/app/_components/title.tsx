"use client";
import React, { useEffect, useState } from "react";

const Title = ({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) => {
  const [combinedClass, setCombinedClass] = useState("");

  useEffect(() => {
    setCombinedClass(`${className} font-[family-name:var(--font-jost-medium)]`);
  }, [className]);

  return <h1 className={combinedClass}>{title}</h1>;
};

export default Title;
