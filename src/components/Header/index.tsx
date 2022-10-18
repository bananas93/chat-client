import { FC, memo } from 'react';

interface IHeader {
  visitTime: string;
}

const Header: FC<IHeader> = memo(({ visitTime }) => {
  const name = localStorage.getItem('userName');

  return (
    <header className="chat__header">
      <div className="chat__header--wrap">
        <div className="chat__header--name">{name}</div>
        <div className="chat__header--date">відвідини - {visitTime}</div>
      </div>
    </header>
  );
});

export default Header;
