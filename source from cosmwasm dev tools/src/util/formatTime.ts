export const formatDurationTime = (time: number) => {
  if (isNaN(time) || time < 0) return {};
  let duration: any = {};
  const seconds = Math.floor(time / 1000);
  duration.secs = seconds % 60;

  const minutes = Math.floor(time / (1000 * 60));
  duration.mins = minutes % 60;

  const hours = Math.floor(time / (1000 * 60 * 60));
  duration.hrs = hours % 24;

  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  duration.days = days;

  return {
    duration,
    inSecs: seconds,
    inMins: minutes,
    inHrs: hours,
    inDays: days,
  };
};

export const formatDurationDate = (date1: any, date2: any) => {
  const dateNumber1 = Number(new Date(date1));
  const dateNumber2 = Number(new Date(date2));
  return formatDurationTime(dateNumber2 - dateNumber1);
};
