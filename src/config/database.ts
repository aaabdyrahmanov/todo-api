import {ConnectionOptions} from 'typeorm';

import {Task} from '../resources/task/task.entity';
import {User} from '../resources/user/user.entity';

const config: ConnectionOptions = {
 type: 'postgres',
 host: process.env.POSTGRES_HOST,
 port: Number(process.env.POSTGRES_PORT),
 username: process.env.POSTGRES_USER,
 password: process.env.POSTGRES_PASSWORD,
 database: process.env.POSTGRES_DB,
 synchronize: true,
 entities: [Task, User],
};

export default config;
