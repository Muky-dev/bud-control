import { cn, Radio, RadioGroup } from "@heroui/react";

export const CustomRadio = (props: React.ComponentProps<typeof Radio>) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2",
          "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent",
          "data-[selected=true]:border-primary",
        ),
      }}
    >
      {children}
    </Radio>
  );
};

export const BudModesRadioGroup = () => {
  return (
    <RadioGroup orientation="horizontal">
      <CustomRadio value="default">Default</CustomRadio>
      <CustomRadio value="anc">ANC</CustomRadio>
      <CustomRadio value="transparency">Transparency</CustomRadio>
    </RadioGroup>
  );
};
