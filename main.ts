import { Resend } from "npm:resend";

const getTemplate = ({ name, email, phone, message }: { name: string, email: string, phone: string, message: string }) => `
<div>
  <p>${name ?? 'A user'} sent a message.</p>
  <p>Message:</p>
  <p>${message ?? ''}</p>
  <p>Contact Info:</p>
  ${email ? `<p>Email Address: <a href="mailto:${email}">${email}</a></p>` : '<p>Email Address: No email provided</p>'}
  ${phone ? `<p>Phone: <a href="tel:${email}">${email}</a></p>` : '<p>Phone: No phone provided</p>'}
</div>
`

Deno.serve(async (_req) => {
  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY') as string;
    const resend = new Resend(resendApiKey);
    const body = await _req.json()

    if (body.occupation) return new Response(null, { status: 200 })
    if (body.email) {

      const response = await resend.emails.send({
        from: 'Yo-Jo Contact Form <contact@yojo-cologne.de>',
        to: ['raul4cade@gmail.com'],
        subject: 'Yo-Jo Contact Form',
        html: getTemplate(body)
      });
      console.log({ response })
      return new Response(JSON.stringify(response), {
        status: response.error ? 500 : 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return new Response(null, { status: 200 })
  } catch (error) {
    console.error(error);
    return new Response(null, {
      status: 500,
    });
  }
});