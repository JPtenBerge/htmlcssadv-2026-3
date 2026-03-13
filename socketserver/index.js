import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', ws => {
	ws.on('error', console.error);

	ws.on('message', (data, isBinary) => {
		[...wss.clients]
			.filter(x => x.readyState === WebSocket.OPEN)
			.forEach(client => {
				client.send(data, { binary: isBinary });
			});
	});
});

