import * as React from 'react';

interface EmailTemplateProps {
  receivingTeacherName: string;
  instrumentType: string;
  serialNumber: string
  senderName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  receivingTeacherName,
  instrumentType,
  serialNumber,
  senderName
}) => (
  <div>
    <h1>Hello, {receivingTeacherName},</h1>
    <br />
    <p>I hope this message finds you well. I am reaching out to inquire if it would be possible for you to transfer an instrument to support a student who is currently in need. Your assistance would be greatly appreciated and would make a significant difference.</p>
    <p>Below are the details of the instrument in question:</p>
    <ul>
      <li><strong>Instrument Type:</strong> {instrumentType}</li>
      <li><strong>Serial Number:</strong> {serialNumber}</li>
    </ul>
    <p>Please let me know if this transfer can be arranged, or if there are any other steps we should take to facilitate this process. Your cooperation and support are highly valued.</p>
    <p>Thank you very much for your time and consideration.</p>
    <p>Best regards,</p>
    <p>{senderName}</p>
  </div>
);
