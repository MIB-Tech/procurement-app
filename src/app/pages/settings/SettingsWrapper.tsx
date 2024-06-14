import React, { FC, useEffect } from "react";
import { usePageData } from "../../../_metronic/layout/core";
import { useTrans } from "../../../_core/components/Trans";
import { PasswordUpdate } from "./components/PasswordUpdate";

export const SettingsWrapper: FC = () => {
  const { setPageTitle } = usePageData();
  const { trans } = useTrans();
  useEffect(() => {
    setPageTitle(trans({ id: "SETTINGS" }));
  }, [setPageTitle, trans]);

  return (
    <>
      <PasswordUpdate />
    </>
  );
};
