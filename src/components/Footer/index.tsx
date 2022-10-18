/* eslint-disable no-unused-vars */
import { FC, ChangeEvent } from 'react';
import { Send } from '../../images';

export interface IFooter {
  sendMessage: (e: any) => Promise<void>;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  message: string;
}

const Footer: FC<IFooter> = ({ sendMessage, handleInput, message }) => (
  <footer className="chat__footer">
    <form className="chat__form" method="POST" onSubmit={sendMessage}>
      <input className="chat__input" type="text" value={message} name="message" id="message" onChange={handleInput} placeholder="Повідомлення" />
      {message && (
        <button type="submit" className="chat__send">
          <Send width="20" height="20" />
        </button>
      )}
    </form>
  </footer>
);

export default Footer;
