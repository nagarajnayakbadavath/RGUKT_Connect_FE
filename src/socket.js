import io from 'socket.io-client';
import { API_URL } from './config';

export const createSocketConnection=()=>{
    return io(API_URL);
}