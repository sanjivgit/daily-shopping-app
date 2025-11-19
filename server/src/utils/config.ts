export const baseUrl = '/api/v1/shopping-list'
export const PORT = process.env.PORT || 8002;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const SECRET_KEY: string = process.env.SECRET_KEY || 'your-default-secret-key';
export const EXPIRE_IN: string = process.env.EXPIRE_IN || "1d";
export const KM_RANGE = process.env.KM_RANGE || 4000
export const SUBSTITUTE_KM_RANGE = process.env.SUBSTITUTE_KM_RANGE || 4000