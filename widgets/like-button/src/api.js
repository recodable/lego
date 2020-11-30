require('dotenv').config();

const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('@koa/router');
const PouchDB = require('pouchdb');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(cors());
app.use(bodyParser());

const db = new PouchDB(process.env.DATABASE_URL);

const router = new Router();

router.get('/', async (ctx) => {
  const post = await db.get(ctx.query.url).catch((err) => {
    if (err.status === 404) return [];
    throw err;
  });

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

app.listen(process.env.API_PORT, () => {
  console.log(`API listening on port ${process.env.API_PORT}`);
});
