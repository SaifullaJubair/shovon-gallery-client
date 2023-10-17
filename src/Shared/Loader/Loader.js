import { Button, Spinner } from "flowbite-react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-row gap-3 items-center justify-center min-h-[85vh]">
      <>
        <Button color="warning">
          <Spinner aria-label="Alternate spinner button example" size="sm" />
          <span className="pl-3">Loading...</span>
        </Button>
      </>
    </div>
  );
};

export default Loader;
