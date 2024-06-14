import React, { FC, HTMLAttributes, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { Trans } from "./Trans";
import { SVG } from "./SVG/SVG";
import { Options } from "qr-code-styling/lib/types";
import { useZebraPrinter } from "../hooks/UseZebraPrinter";
import { useToastr } from "../Toastr/UseToastr";

type QRProps = {
  value: string;
  showValue?: boolean;
  size?: number;
} & HTMLAttributes<HTMLDivElement>;

export const getAssetZpl = (value: string) => {
  return `
            ^XA
            
            ^LT5
            ^LS-15
            ^BQN,,8
            ^FDQA,${value}^FS
            ^CF0,30
            ^FO180,70^FD${value}^FS
            ^FO225,110^FDAKDITAL^FS
           
            ^XZ
          `;
};
export const QrCodePreview: FC<QRProps> = ({
  value,
  showValue,
  className,
  size = 83,
  ...props
}) => {
  const { print } = useZebraPrinter();
  const toastr = useToastr();

  const ref = useRef<HTMLDivElement>(null);

  const options: Pick<Options, "width" | "height"> = {
    width: size,
    height: size,
  };
  const qrCode = new QRCodeStyling(options);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [value]);

  useEffect(() => {
    qrCode.update({ data: value });
  }, [value]);

  return (
    <div className='text-center'>
      {!!value ? (
        <>
          <div
            ref={ref}
            style={options}
          />
          {showValue && (
            <div className='text-black fw-boldest fs-8'>{value}</div>
          )}
        </>
      ) : (
        <span className='text-muted text-center'>
          <SVG
            path='/ecommerce/ecm010.svg'
            size='4hx'
          />
          <div className='mt-4 fw-bolder'>
            <Trans id='BARCODE' />
          </div>
        </span>
      )}
      <a
        href='#'
        onClick={(e) => {
          e.preventDefault();
          print(getAssetZpl(value), {
            onError: ({ response }) => {
              const split = response?.data.split(":");
              const title = split?.[0] ?? "COULD_NOT_PRINT";
              const children = split?.[1];
              toastr.error({ title, children });
            },
          });
        }}
      >
        <Trans id='PRINT' />
      </a>
    </div>
  );
};
