import { useFormContext, UseFormReturn } from "react-hook-form";

type ConnectFormProps = {
    children: (methods: UseFormReturn) => JSX.Element;
};

export const ConnectForm = ({ children }: ConnectFormProps) => {
    const methods = useFormContext();
    return children({ ...methods });
};

