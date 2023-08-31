
export const convertDate = (date: string): string => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
};
