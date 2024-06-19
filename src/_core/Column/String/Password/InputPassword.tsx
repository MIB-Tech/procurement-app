import React, { FC, useState } from "react";
import { Input, InputProps } from "../InputBase/Input";
import { Button } from "../../../components/Button";
import clsx from "clsx";
import zxcvbn, { ZXCVBNScore } from "zxcvbn";
import { SVG } from "../../../components/SVG/SVG";
import { Variant } from "react-bootstrap/types";
import { Help } from "../../../components/Help";
import { StringPasswordColumn } from "../StringColumn";
import { I18nMessageKey } from "../../../i18n/I18nMessages";
import { Trans } from "../../../components/Trans";

type ScoreValueT = {
  status: Variant;
  label: I18nMessageKey;
};

const SCORES: ScoreValueT[] = [
  {
    status: "danger",
    label: "TOO_GUESSABLE",
    // description: 'Risky password'
  },
  {
    status: "warning",
    label: "VERY_GUESSABLE",
    // description: 'Protection from throttled online attacks'
  },
  {
    status: "success",
    label: "SOMEWHAT_GUESSABLE",
    // description: 'Protection from unthrottled online attacks'
  },
  {
    status: "success",
    label: "SAFELY_UNGUESSABLE",
    // description: 'Moderate protection from offline slow-hash scenario'
  },
  {
    status: "primary",
    label: "VERY_UNGUESSABLE",
    // description: 'Strong protection from offline slow-hash scenario'
  },
];

export type InputPasswordProps = {
  value?: string;
} & Omit<InputProps, "value"> &
  Omit<StringPasswordColumn, "format">;

export const InputPassword = React.forwardRef<
  HTMLInputElement,
  InputPasswordProps
>(
  (
    {
      // size,
      // background,
      meter,
      className,
      ...props
    },
    ref
  ) => {
    const [show, setShow] = useState<boolean>(false);

    return (
      <div className={clsx(!meter && "mb-2")}>
        <div className='position-relative'>
          <Input
            className={clsx("pe-12", className)}
            {...props}
            ref={ref}
            type={show ? "text" : "password"}
          />
          <Button
            icon
            className='btn-active-color-gray-700 position-absolute translate-middle-y top-50 end-0'
            onClick={() => setShow(!show)}
          >
            <i className={clsx("bi fs-2", show ? "bi-eye-slash" : "bi-eye")} />
          </Button>
        </div>
        {meter && <PasswordMeters password={props.value} />}
      </div>
    );
  }
);

type PasswordMetersProps = {
  password?: string;
  className?: string;
};
const PasswordMeters: FC<PasswordMetersProps> = ({ password }) => {
  const strength = zxcvbn(password || "");
  const { score } = strength;
  const { status, label } = SCORES[score];
  const description = `${label}.DESCRIPTION` as I18nMessageKey;

  return (
    <div className={clsx("d-flex align-items-center")}>
      {([0, 1, 2, 3, 4] as Array<ZXCVBNScore>).map((key) => {
        const { status } = SCORES[key];

        return (
          <Help
            key={key}
            overlay={<Trans id={description} />}
            className={clsx(
              "flex-grow-1 h-5px rounded me-2 ",
              password && key <= score ? `bg-${status}` : "bg-secondary"
            )}
          />
        );
      })}
      <Help
        overlay={
          <>
            <div className={clsx(`fw-bolder text-${status}`)}>
              <Trans id={label} />
            </div>
            <div className='separator separator-dashed my-1' />
            <Trans id={description} />
            {/*<div>*/}
            {/*  {`${numeral(guesses).format('0a')} guesses needed to crack password`}*/}
            {/*</div>*/}
          </>
        }
      >
        <SVG
          path={"/general/gen044.svg"}
          variant={status}
        />
      </Help>
    </div>
  );
};
