export interface Exhibition {
  id: string;
  title: string;
  artist?: string;
  venue: string;
  location?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  imageUrl?: string;
  price?: string;
  hours?: string;
  website?: string;
  isFree?: boolean;
}

export type CategoryType =
  | 'all'
  | 'contemporary'
  | 'photography'
  | 'sculpture'
  | 'digital'
  | 'traditional';
