export const generateUID = (): string => {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomStr = Math.floor(1000 + Math.random() * 9000); 
  return `RM-${dateStr}-${randomStr}`;
};

export const generateRegNumber = (): string => {
  return `REG-${Date.now().toString().slice(-8)}`;
};
