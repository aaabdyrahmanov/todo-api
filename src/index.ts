import {createConnection} from 'typeorm';

import {config} from './config';
import dbConfig from './config/database';
import server from './server';
import logger from './utils/logger';

// create db connection and run the server
createConnection(dbConfig)
 .then(() => {
  server.listen(config.PORT, config.HOST, () => {
   logger.info(
    `REST API started on http://${config.HOST}:${config.PORT}/v1/docs`
   );
  });
 })
 .catch((err: Error) => logger.error(err.message));
