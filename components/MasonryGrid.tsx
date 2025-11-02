import { ReactNode } from 'react';
import Masonry from 'react-responsive-masonry';

interface MasonryGridProps {
  children: ReactNode;
}

export function MasonryGrid({ children }: MasonryGridProps) {
  return (
    <Masonry columnsCount={4} gutter="1rem">
      {children}
    </Masonry>
  );
}
