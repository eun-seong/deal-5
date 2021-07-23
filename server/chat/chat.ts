import * as WebSocket from 'ws';
import ChatAction from '../action/chat';

const wsUserArray: any = new Map();

const rooms = new Map();

export default class WebSocketServer {
  wws: any;
  roomInfo: any;
  constructor(server: any) {
    this.roomInfo = {};
    this.wws = new WebSocket.Server({
      server,
      verifyClient: async (info: any, cb: any) => {
        const headers = await info.req.headers;
        const cookies = headers.cookie.split(';');

        const roomInfo: { [key: string]: string } = {};
        cookies.forEach((cookie: string) => {
          const [key, value] = cookie.trim().split('=');
          roomInfo[key] = value;
        });
        info.req.itemID = roomInfo.item_id;
        info.req.room = roomInfo.roomId;
        info.req.type = roomInfo.type;
        info.req.user = roomInfo.type === 'seller' ? roomInfo.seller_id : roomInfo.buyer_id;
        cb(true);
      },
    });

    this.wws.on('connection', (ws: any, req: any) => {
      const { room, type, user, itemID } = req;
      rooms.set(user, { user, room, ws });
      chatinit(type, room);
      ws.on('message', (data: any) => {
        sendMsg(rooms.get(user), type, data);
        saveMsg({ user, room, data });
      });
      ws.on('close', (res: any) => {
        rooms.delete(user);
      });
    });
  }
}
const saveMsg = async ({ user, room, data }: { user: number; room: number; data: string }) => {
  try {
    await ChatAction.SaveMsg({ user, room, data });
  } catch (error) {
    console.error(error);
  }
};

const sendMsg = (UserMapData: any, type: string, message: string) => {
  return new Promise((resolve, reject) => {
    let count = 0;

    for (let target of rooms.entries()) {
      if (UserMapData.room === target[1].room) {
        if (UserMapData.ws !== target[1].ws) {
          count += 1;
          target[1].ws.send('yu' + message);
        }
        UserMapData.ws.send('me' + message);
      }
    }
    if (count !== 0) return;

    if (type === 'seller') ChatAction.AddBuyerNoReadCnt(UserMapData.room);
    else ChatAction.AddSellerNoReadCnt(UserMapData.room);
    resolve('done!');
  });
};

const chatinit = async (type: string, room: number) => {
  await ChatAction.InitNoReadCnt({ type, chatId: room });
};

let socket: any;

function initSocket(server: any) {
  socket = new WebSocketServer(server);
}

function getSocketWS() {
  return socket.wws;
}

export { initSocket, getSocketWS };
