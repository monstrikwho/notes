import 'dotenv/config';
import Server from '#core/express';
import Socket from '#core/socket';

(async () => {
  Server.setup();
  Socket.setup();
})();
