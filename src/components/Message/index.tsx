/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FC, memo } from 'react';
import { Read } from '../../images';

export interface IMessage {
  userName: string;
  text: string;
  date: string;
}

const Message: FC<IMessage> = memo(({ userName, text, date }) => {
  const handleClick = (e: any) => {
    if (e.type === 'contextmenu') {
      console.log('Right click');
    }
  };
  const user = localStorage.getItem('userName');
  const time = new Date(date);
  const timeFormatted = `${time.getHours()}:${time.getMinutes()}`;
  return (
    <li className={`chat__message ${user === userName ? 'chat__message--my' : ''}`} onClick={handleClick}>
      <span>{text}</span>
      <span className="chat__message--date">
        {timeFormatted}
        <Read width="12" height="12" />
      </span>
    </li>
  );
});

export default Message;
