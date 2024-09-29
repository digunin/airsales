import React, { FC } from 'react';
import iconFilter from '../assets/icon-filter-white.png';

type AppHeaderProps = { onclick: () => void };
export const AppHeader: FC<AppHeaderProps> = ({ onclick }) => {
  return (
    <nav>
      <div>
        <img src={iconFilter} alt="" onClick={onclick} />
      </div>
    </nav>
  );
};
