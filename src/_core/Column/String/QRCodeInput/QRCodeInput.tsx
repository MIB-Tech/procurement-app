import React, { FC, useState } from "react";
import { Props } from "./QRCodeInput.types";
import { useField } from "formik";
import { QrCodePreview } from "../../../components/QrCodePreview";
import clsx from "clsx";
import { InputIcon } from "../../../components/InputIcon";
import { Overlay, Popover, PopoverBody } from "react-bootstrap";
import { InputField } from "../InputField";
import { STRING_FORMAT_CONFIG } from "../StringColumn";

export const QRCodeInput: FC<Props> = ({
  name = "barcode",
  feedbackLabel,
  className,
  ...props
}) => {
  const [{ value }] = useField({ name });
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState<any>(null);

  return (
    <>
      <div className='position-relative'>
        <InputField
          name={name}
          className={clsx("pe-10", className)}
          {...props}
        />
        <InputIcon
          path={STRING_FORMAT_CONFIG.QRCODE.icon}
          onClick={(event) => {
            setTarget(event.target);
            setShow(!show);
          }}
        />
      </div>
      <Overlay
        show={show}
        target={target}
        placement='bottom-end'
        containerPadding={20}
      >
        <Popover id='popover-contained'>
          <PopoverBody className='p-1'>
            <QrCodePreview value={value} />
          </PopoverBody>
        </Popover>
      </Overlay>
    </>
  );
};
