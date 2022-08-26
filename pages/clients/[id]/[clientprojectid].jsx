import { useRouter } from "next/router";
import React from "react";

const SelectedClientProjectPage = () => {
  const router = useRouter();
  return (
    <div>
      <h1>
        The Project Page for a Specific Project on{" "}
        {router.query.clientprojectid} for a Selected Client is{" "}
        {router.query.id}
      </h1>
    </div>
  );
};

export default SelectedClientProjectPage;
