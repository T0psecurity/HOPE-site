export const getUnixTimeStamp = (time: any): string => {
  return Math.round(new Date(time).getTime() / 1000).toString();
};
