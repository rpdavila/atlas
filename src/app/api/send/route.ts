import { EmailTemplate } from '@/app/components/email-template/emailTemplate';
import { NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const {
      sendingteacherEmail,
      recievingTeacherName,
      instrumentType,
      instrumentSerialNumber,
      receivingTeacherEmail
    } = await request.json()
    const { data, error } = await resend.emails.send({
      from: `rafael.pietri@gmail.com`,
      to: [`rpietridavila@gmail.com`],
      subject: 'Available Instrument for transfer',
      react: EmailTemplate(
        {
          receivingTeacherName: recievingTeacherName,
          instrumentType: instrumentType,
          serialNumber: instrumentSerialNumber,
          senderName: sendingteacherEmail
        }
      ),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
