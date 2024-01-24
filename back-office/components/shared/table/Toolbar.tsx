import React from 'react';

type TableTableToolbarPops = {
  children: React.ReactNode;
};

export default function EnhancedTableToolbar({
  children,
}: TableTableToolbarPops) {
  return (
    <div className="p-2.5 row flex lg:flex-row md:flex-row sm:flex-col w-full justify-between items-center lg:gap-10 md:gap-2 sm:gap-2">
      {children}
    </div>
  );
}
