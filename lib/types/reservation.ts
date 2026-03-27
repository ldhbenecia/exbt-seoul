export interface Reservation {
  id: string;
  name: string;
  category?: string;
  subCategory?: string;
  status?: string;
  payType?: string;
  place?: string;
  target?: string;
  url?: string;
  area?: string;
  imageUrl?: string;
  description?: string;
  phone?: string;
  registerStart?: string;
  registerEnd?: string;
  useStart?: string;
  useEnd?: string;
  minPrice?: number;
  maxPrice?: number;
  lat?: number;
  lng?: number;
}
