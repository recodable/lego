import { PrismaClient } from '@prisma/client';
import { VercelRequest, VercelResponse } from '@vercel/node';

const prisma = new PrismaClient();

const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = async (req: VercelRequest, res: VercelResponse) => {
  const key = req.query.key as string;
  const author = req.headers['x-real-ip'] as string;

  // handle better error
  if (!key) {
    return res.send('error');
  }

  let source = await prisma.source.findFirst({
    where: { key },
  });

  if (!source) {
    source = await prisma.source.create({
      data: { key },
    });
  }

  const like = await prisma.like.findFirst({
    where: { author, sourceId: source.id },
  });

  if (req.method === 'GET') {
    const count = await prisma.like.count({
      where: { sourceId: source.id },
    });

    return res.send({ count, alreadyLiked: !!like });
  }

  if (req.method === 'POST') {
    if (like) {
      return res.send(like);
    }

    const newLike = await prisma.like.create({
      select: { id: true },
      data: { author, sourceId: source.id },
    });

    return res.send(newLike);
  }

  if (req.method === 'DELETE') {
    if (!like) {
      return res.send(false);
    }

    const result = await prisma.like.delete({
      select: { id: true },
      where: { id: like.id },
    });

    return res.send(result);
    // const result = await client.query(
    //   Let(
    //     {
    //       like: Match(Index('like_by_author_on_source'), [
    //         author,
    //         Select('ref', Call(Fn('findOrCreateSource'), sourceRef)),
    //       ]),
    //     },
    //     If(
    //       Exists(Select('ref', Get(Var('like')))),
    //       Delete(Select('ref', Get(Var('like')))),
    //       true,
    //     ),
    //   ),
    // );
    // return res.send(result);
  }
};

export default allowCors(handler);
