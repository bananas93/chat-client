import {
  ChangeEvent, FC, useEffect, useState,
} from 'react';
import axios from 'axios';
import Message from './components/Message';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App: FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => (!!sessionStorage.getItem('logged')));
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/');
        if (res) {
          setMessages(res.data);
          setTimeout((): void => window.scrollTo(0, document.body.scrollHeight), 0);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getMessages();
  }, []);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!newMessage) return;
    const userName = localStorage.getItem('userName');
    try {
      const res = await axios.post('http://localhost:3000/api/', {
        userName,
        message: newMessage,
      });
      if (res) {
        setMessages([...messages, res.data]);
        setNewMessage('');
        setTimeout((): void => window.scrollTo(0, document.body.scrollHeight), 0);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }

  return (
    <div className="chat">
      <Header visitTime="17:32" />
      <main className="chat__body">
        {messages.length ? (
          <ul className="chat__messages">
            {messages.map(({
              id, message, userName, updatedAt,
            }: any) => (
              <Message key={id} userName={userName} text={message} date={updatedAt} />
            ))}
          </ul>
        ) : (
          <div className="chat__body--empty">Повідомлень ще немає...</div>
        )}
      </main>
      <Footer sendMessage={sendMessage} handleInput={handleInput} message={newMessage} />
    </div>
  );
};

export default App;
