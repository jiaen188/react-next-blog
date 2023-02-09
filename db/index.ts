import "reflect-metadata";
import { Connection, getConnection, createConnection } from 'typeorm';
import {User, UserAuth} from 'db/entity/index';

let connectionReadyPromise: Promise<Connection>|null = null

export const prepareConnection = () => {

  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        console.log(error);
      }

      const connection = await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'ACHAYUSHIBA1026_mysql',
        database: 'tomas',
        entities: [User, UserAuth],
        synchronize: false,
        logging: true
      })

      return connection;
    })()

  }
 
  return connectionReadyPromise;
}