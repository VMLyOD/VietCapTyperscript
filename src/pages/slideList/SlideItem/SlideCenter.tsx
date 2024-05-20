import { DataItem } from "../SlideListTrade";
import { useTranslation } from "react-i18next";
import { IconPointFilled } from "@tabler/icons-react";
import { formatNumber } from "~/shares/utils/formatterData";

interface Props {
  item: DataItem | any;
}

export const SlideCenterItem: React.FC<Props> = ({ item }) => {
  const formattedTotalShares = formatNumber(item.totalShares);
  const formattedTotalValue = formatNumber(item.totalValue);

  const { t } = useTranslation();
  return (
    <div
      className="slide-top-2 flex items-center h-5 w-full"
      style={{ color: "var(--mantine-color-gray_90-filled)" }}
    >
      <span className="data-time-custom color-index-custom">
        {t("Vol")}: {formattedTotalShares}
      </span>
      <span className="dot">
        <IconPointFilled style={{ width: "15px", height: "15px" }} />
      </span>
      <span className="data-time-custom data-time-custom--right">
        {t("Val")}: {formattedTotalValue} {t("Bn")}
      </span>
    </div>
  );
};
