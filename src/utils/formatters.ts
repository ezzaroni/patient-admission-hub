export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  
  return new Date(date).toLocaleDateString('id-ID', options || defaultOptions);
};

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('id-ID');
};
