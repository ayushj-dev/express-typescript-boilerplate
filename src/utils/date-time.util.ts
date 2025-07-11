import dayjs from "dayjs";

export const getCurrentDateTime = () => dayjs().format(`YYYY-MM-DD HH:mm:ss`);

export const getCurrentDate = () => dayjs().format(`YYYY-MM-DD`);

export const getCurrentTime = () => dayjs().format(`HH:mm:ss`);

export const getFormattedDate = (dateString: string) => dayjs(dateString).format(`YYYY-MM-DD`);

export const getCurrentDateTimeISOString = () => dayjs().toISOString();

export const getCurrentDateTimeinJSDate = () => dayjs().toDate();
