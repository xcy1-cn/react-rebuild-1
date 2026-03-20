import { forwardRef, useImperativeHandle, useState } from "react";

type Props = {};

export type ImageCodeRef = {
  validate: (value: string) => boolean;
  refresh: () => void;
};

const VantImageCode = forwardRef<ImageCodeRef, Props>((props, ref) => {
  const [code, setCode] = useState(generateCode());

  useImperativeHandle(
    ref,
    () => ({
      validate(value: string) {
        return value.toLowerCase() === code.toLowerCase();
      },
      refresh() {
        setCode(generateCode());
      },
    }),
    [code],
  );

  return <div onClick={() => setCode(generateCode())}>{code}</div>;
});

VantImageCode.displayName = "VantImageCode";

export default VantImageCode;

function generateCode() {
  return Math.random().toString(36).slice(2, 6);
}
