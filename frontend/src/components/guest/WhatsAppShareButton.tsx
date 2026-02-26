import React from 'react';
import { SiWhatsapp } from 'react-icons/si';

interface WhatsAppShareButtonProps {
  invitationUrl: string;
  coupleName: string;
}

export default function WhatsAppShareButton({ invitationUrl, coupleName }: WhatsAppShareButtonProps) {
  const text = encodeURIComponent(
    `You're cordially invited to the wedding of ${coupleName}! 💍\n\nView the invitation: ${invitationUrl}`
  );

  return (
    <a
      href={`https://wa.me/?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      style={{ background: '#25D366' }}
      title="Share on WhatsApp"
    >
      <SiWhatsapp className="w-7 h-7 text-white" />
    </a>
  );
}
