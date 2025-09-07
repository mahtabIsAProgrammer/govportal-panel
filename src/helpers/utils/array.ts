import { map, split } from "lodash";

export const stringSepratorToArry = (
  string: string,
  seperator: string,
  isNumber?: boolean
): (string | number)[] =>
  isNumber
    ? map(split(string, seperator), (i) => (isNaN(+i) ? 0 : +i))
    : split(string, seperator);

export const guidGenerator = () => {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-4" +
    S4().substr(0, 3) +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  ).toLowerCase();
};

export const arrayToStringHnadler = (
  array: (string | number)[] | undefined,
  seperator: string
): string => (array ? array.join(seperator) : "");
