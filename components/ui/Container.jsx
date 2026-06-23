import React from "react";
import cx from "../../lib/cx";

const Container = ({ children, className, ...props }) => {
  return (
    <div
      className={cx(
        "lg:container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;