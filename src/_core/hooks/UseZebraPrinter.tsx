import { useMutation, useQuery } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useMemo } from "react";
import { QueryObserverOptions } from "react-query/types/core/types";

export interface Device {
  name: string;
  deviceType: string;
  connection: string;
  uid: string;
  provider: string;
  manufacturer: string;
  version: number;
}

const cleanUpString = (str: string): string => {
  const arr = str.split(":");

  return arr[1].trim();
};

export const PRINTER_API_URL =
  process.env.REACT_APP_ZEBRA_BROWSER_API_URL || "http://localhost:9100";

export const getZebraDevice = (data: string) => {
  const deviceRaw = data.split("\n\t");
  const name = cleanUpString(deviceRaw[1]);
  const deviceType = cleanUpString(deviceRaw[2]);
  const connection = cleanUpString(deviceRaw[3]);
  const uid = cleanUpString(deviceRaw[4]);
  const provider = cleanUpString(deviceRaw[5]);
  const manufacturer = cleanUpString(deviceRaw[6]);

  return {
    connection,
    deviceType,
    manufacturer,
    name,
    provider,
    uid,
    version: 0,
  } as Device;
};

export const useDefaultPrinter = (
  options?: Pick<QueryObserverOptions, "enabled">
) => {
  const defaultPrinterQuery = useQuery(
    "DEFAULT_DEVICE",
    () => axios.get<string>(`${PRINTER_API_URL}/default`),
    options
  );
  const data = defaultPrinterQuery.data?.data;
  const device = useMemo<Device | null>(() => {
    return data ? getZebraDevice(data) : null;
  }, [data]);

  return {
    ...defaultPrinterQuery,
    device,
  };
};
export const useZebraPrinter = () => {
  const { device } = useDefaultPrinter();
  const mutation = useMutation<AxiosResponse<any>, AxiosError<string>, string>(
    (data) => axios.post(`${PRINTER_API_URL}/write`, { data, device })
  );

  return {
    print: mutation.mutate,
    ...mutation,
  };
};
