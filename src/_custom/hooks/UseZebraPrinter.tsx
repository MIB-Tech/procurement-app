import { useMutation, useQuery } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useToastr } from '../Toastr/UseToastr';
import { useMemo } from 'react';


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
  const arr = str.split(':');

  return arr[1].trim();
};


export const PRINTER_API_URL = process.env.REACT_APP_ZEBRA_BROWSER_API_URL || 'http://localhost:9100';

export const useZebraPrinter = () => {
  const toastr = useToastr();
  const defaultPrinterQuery = useQuery(
    'DEFAULT_DEVICE',
    () => axios.get<string>(`${PRINTER_API_URL}/default`),
    {}
  );
  const data = defaultPrinterQuery.data?.data;
  const device = useMemo<Device | null>(() => {
    const deviceRaw = data?.split('\n\t');
    if (deviceRaw?.length === 7) {
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
        version: 0
      };
    }

    return null;
  }, [data]);

  const { mutate: print } = useMutation<AxiosResponse<any>, AxiosError<string>, string>(
    data => axios.post(`${PRINTER_API_URL}/write`, { data, device }),
    {
      onError: ({ response }) => {
        const split = response?.data.split(':');
        const title = split?.[0] ?? 'COULD_NOT_PRINT';
        const children = split?.[1];
        toastr.error({ title, children });
      }
    }
  );

  return {
    print
  };
};