import { useRouter } from "next/router";
import React from "react";

const ClientProjectsPage = () => {
  const router = useRouter();
  const loadProjectHandler = () => {
    //loading data....
    router.push("/clients/max/projecta");
  };
  return (
    <div>
      <h1>The Projects of a Given Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
};

export default ClientProjectsPage;
