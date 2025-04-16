import { format } from "date-fns";

type params = {
  time: string;
};

export const formatTime = ({ time }: params) => {
  return format(new Date(time), "yyyy.MM.dd");
};
