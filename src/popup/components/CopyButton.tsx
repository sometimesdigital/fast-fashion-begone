import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const CopyButton = ({ text }: { text: string }) => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const onClick = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Button type="button" variant="secondary" onClick={onClick}>
      {isCopied ? t("Copied") : t("Copy all")}
    </Button>
  );
};
