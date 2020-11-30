const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('@koa/router');
const PouchDB = require('pouchdb');

const app = new Koa();

app.use(cors());

const db = new PouchDB('http://admin:password@localhost:5984/likes');

const router = new Router();

router.get('/', async (ctx) => {
  const post = await db.get(ctx.query.url).catch((err) => {
    if (err.status === 404) return [];
    throw err;
  });
  console.log(post.likes);

  ctx.body = {
    count: post.likes.length,
    liked: !!post.likes.find((like) => like.ip === ctx.request.ip),
  };
});

router.post('/', async (ctx) => {
  try {
    const post = await db.get(ctx.query.url);
    const liked = !!post.likes.find((like) => like.ip === ctx.request.ip);

    post.likes = liked
      ? post.likes.filter((like) => like.ip !== ctx.request.ip)
      : [...post.likes, { ip: ctx.request.ip }];

    db.put(post);
  } catch (err) {
    if (err.status === 404)
      db.put({
        _id: ctx.query.url,
        likes: [{ ip: ctx.request.ip }],
      });
  }
  ctx.response.status = 200;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('API listening on port 3000'));
