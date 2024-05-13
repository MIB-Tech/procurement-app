import React, { FC, useEffect } from "react";
import { usePageData } from "../../../_metronic/layout/core";
import { useTrans } from "../../../_custom/components/Trans";
import { PasswordUpdate } from "./components/PasswordUpdate";

export const SettingsWrapper: FC = () => {
  const { setPageTitle } = usePageData();
  const { trans } = useTrans();

  // handle form error and validation errors

  useEffect(() => {
    setPageTitle(trans({ id: "SETTINGS" }));
  }, [setPageTitle, trans]);
  return (
    <>
      <PasswordUpdate />
    </>
  );
};
