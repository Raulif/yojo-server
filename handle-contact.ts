export const handleContact = async (
  ctx: RouterContext<
    '/contact',
    Record<string | number, string | undefined>,
    Record<string, any>
  >
) => {
  try {
    console.log('[ROUTE] HANDLE CONTACT');
    const body = await ctx.request.body.json();
  } catch (e) {
    console.error('ERROR',e)
  }
}