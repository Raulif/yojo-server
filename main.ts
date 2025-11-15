import { Application } from 'jsr:@oak/oak/application';
import { Router } from 'jsr:@oak/oak/router';

import { handleContact } from './handle-contact.ts';

const app = new Application();
app.use((ctx, next) => {
  ctx.response.headers.set('Access-Control-Allow-Origin', '*');
  return next();
});
const router = new Router();
router.post('/contact', handleContact);
router.get('/contact', (ctx) => {
  console.log('contact');
      ctx.response.body = { ok: true };

});

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? 'https://' : 'http://'}${
      hostname ?? 'localhost'
    }:${port}`
  );
});

await app.listen({ port: 8080 });