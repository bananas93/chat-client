import {
  Dispatch, FC, SetStateAction, useState,
} from 'react';

interface ILogin {
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Login: FC<ILogin> = ({ setLoggedIn }) => {
  const [name, setName] = useState<string>(() => localStorage.getItem('userName') || '');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const login = (e: any) => {
    e.preventDefault();
    if (password === 'tomford' && name !== '') {
      sessionStorage.setItem('logged', '1');
      localStorage.setItem('userName', name);
      setLoggedIn(true);
    } else {
      setError('Невірний пароль');
    }
  };

  return (
    <div className="login">
      <form method="POST" className="login__form" onSubmit={login}>
        <input
          type="text"
          className="login__input"
          name="login"
          placeholder="Ім'я"
          value={name}
          onChange={handleNameChange}
          onFocus={() => setError('')}
          onBlur={() => setError('')}
        />
        <input
          type="password"
          className="login__input"
          name="password"
          value={password}
          placeholder="Пароль"
          onChange={handlePasswordChange}
          onFocus={() => setError('')}
          onBlur={() => setError('')}
        />
        {error && <div className="login__error">{error}</div>}
      </form>
      <button type="submit" className="login__button" onClick={login}>Вхід</button>
    </div>
  );
};

export default Login;
