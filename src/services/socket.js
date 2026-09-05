import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5001', {
  transports: ['websocket'],
  withCredentials: true
});

export const joinUserRoom = (userId) => {
  if (!userId) return;
  socket.emit('join:user', userId);
};

export const bindUploadNotifications = (callback) => {
  socket.on('upload:notification', callback);
  return () => socket.off('upload:notification', callback);
};
