import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}',
  ],
  migrations: [
    "src/migration/*.ts"
  ],
  cli: {
    migrationsDir: 'src/migration'
  },
  // synchronize: true, // 初回起動だけ実行する
  logging: true
}

export default config;