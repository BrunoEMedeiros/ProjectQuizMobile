import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type SnackBarTypeProps = "info" | "success" | "error" | "warning";

type NotifyParams = {
  message: string | null;
  type: SnackBarTypeProps | null;
  open: boolean | null;
};

type SnackBarProps = NotifyParams & {
  notify: (params: NotifyParams) => void;
};

const SnackbarContext = createContext({} as SnackBarProps);

export const SnackBarContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<SnackBarTypeProps | null>(null);
  const [open, setOpen] = useState<boolean | null>(null);

  const notify = ({ message, type, open }: NotifyParams): void => {
    setMessage(message);
    setOpen(open);
  };

  return (
    <SnackbarContext.Provider value={{ message, type, open, notify }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackBarContext = () => {
  const context = useContext(SnackbarContext);
  return context;
};
