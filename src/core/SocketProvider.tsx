import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';

type SocketContextType = {
  socket: Socket | undefined;
};

const SocketContext = createContext<SocketContextType>({ socket: undefined });

export const useSocket = () => useContext(SocketContext);

interface ISocketProvider {
  children: ReactNode;
}

export const SocketProvider: FC<ISocketProvider> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const url = process.env.REACT_APP_SOCKET_URL || '';

    // Инициализация соединения с вашим сервером Socket.IO
    const newSocket = io(url, {
      // Ваши настройки, например, авторизационный токен:
      auth: { token },
      path: '/ws',
    });

    // console.log(newSocket)

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
