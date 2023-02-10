import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { mikroOrmConfig } from "./mikro-orm.config";

const main = async () => {

  console.log(__dirname);

  const orm = await MikroORM.init(mikroOrmConfig);

  await orm.getMigrator().up();
  const emFork = orm.em.fork();
  const post = emFork.create(Post, { title: "title" });
  console.log(post.createdAt);
  await emFork.persistAndFlush(post);
}

main().catch((err) => {
  console.error(err);

})

