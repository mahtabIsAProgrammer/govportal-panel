import { isArray } from "lodash";

import { arrayToStringHnadler } from "./array";

export const optionCreator = <T extends Record<string, TAny>>({
  data,
  hasNotEmpty,
  empty,
  id,
  name,
  separator,
}: {
  data: T[];
  name: keyof T | (keyof T)[];
  id: keyof T | "id";
  hasNotEmpty?: boolean;
  empty?: string;
  separator?: string;
}): IOption[] => {
  if (isArray(data) && data.length > 0)
    return [
      ...(!hasNotEmpty
        ? [
            {
              value: "",
              label: empty || "Select",
            },
          ]
        : []),
      ...(data?.map((item: TAny) => ({
        label: isArray(name)
          ? arrayToStringHnadler(
              name.map((name) => item[name]),
              separator ?? " "
            )
          : item[name],
        value: item[id],
      })) ?? []),
    ];

  if (!hasNotEmpty) return [{ value: "", label: empty || "Select" }];
  else return [];
};
