import { EmailTemplate } from '@/app/components/email-template/emailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {
      sendingTeacherEmail,
      receivingTeacherName,
      instrumentType,
      instrumentSerialNumber,
      receivingTeacherEmail,
      sendingTeacherName
    } = await request.json()

    const { data, error } = await resend.emails.send({
      from: `Crescendo Cloud <admin@crescendocloud.app>`,
      to: [receivingTeacherEmail],
      subject: 'Available Instrument for transfer',
      react: EmailTemplate({
        receivingTeacherName: receivingTeacherName,
        instrumentType: instrumentType,
        serialNumber: instrumentSerialNumber,
        senderName: sendingTeacherName,
        senderEmail: sendingTeacherEmail
      }),
    });

    if (error) {
      console.error('Resend error:', error)
      return Response.json({ error }, { status: 500 });
    }
    console.error('Resend data:', data)
    return Response.json(data);
  } catch (error) {
    console.error('Resend error:', error)
    return Response.json({ error }, { status: 500 });
  }
}
