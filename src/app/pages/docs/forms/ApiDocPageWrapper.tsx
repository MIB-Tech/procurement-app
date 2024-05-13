import React, { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { ApiDocPage } from "./ApiDocPage";

const ApiDocPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[{ title: "Formik", path: "#", isActive: true }]}>
        Docs
      </PageTitle>
      <ApiDocPage />
    </>
  );
};

export default ApiDocPageWrapper;
