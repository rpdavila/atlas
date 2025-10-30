import { EmailTemplate } from '@/app/components/email-template/emailTemplate';
import { NextRequest } from 'next/server';
import React from 'react';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const {
      sendingTeacherEmail,
      recievingTeacherName,
      instrumentType,
      instrumentSerialNumber,
      receivingTeacherEmail,
      sendingTeacherName
    } = await request.json()
    const { data, error } = await resend.emails.send({
      from: `Crescendo Cloud <admin@crescendocloud.app>`,
      to: [`${receivingTeacherEmail}`],
      subject: 'Available Instrument for transfer',
      react: React.createElement(EmailTemplate, {
        receivingTeacherName: recievingTeacherName,
        instrumentType: instrumentType,
        serialNumber: instrumentSerialNumber,
        senderName: sendingTeacherName,
        senderEmail: sendingTeacherEmail
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
