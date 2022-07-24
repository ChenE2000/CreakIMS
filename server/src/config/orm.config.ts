import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

export default registerAs(
  'ormConfig',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // 实体类，会自动创建表
    entities: [User],
    // synchronize字段代表是否自动将实体类同步到数据库
    // 假设你把 user 表中的 name 字段改为了 nickname，
    // 他可能会误解你删除了 name，并新增了 nickname，此时表中 name 数据就会被删除
    synchronize: false,
  }),
);
