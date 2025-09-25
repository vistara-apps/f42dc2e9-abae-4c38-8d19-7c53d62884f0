'use client';

import { Message } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  message: Message;
  variant?: 'user' | 'agent';
  showTimestamp?: boolean;
}

export function ChatBubble({ message, variant = 'agent', showTimestamp = true }: ChatBubbleProps) {
  const isUser = variant === 'user';

  return (
    <div className={cn('flex flex-col gap-1', isUser ? 'items-end' : 'items-start')}>
      <div className={cn(
        'chat-bubble',
        isUser ? 'chat-bubble-user' : 'chat-bubble-plant'
      )}>
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>
      
      {showTimestamp && (
        <span className="text-xs text-muted px-2">
          {formatRelativeTime(message.sentAt)}
        </span>
      )}
    </div>
  );
}

interface ChatConversationProps {
  messages: Message[];
  className?: string;
}

export function ChatConversation({ messages, className }: ChatConversationProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {messages.map((message) => (
        <ChatBubble
          key={message.messageId}
          message={message}
          variant="agent"
          showTimestamp={true}
        />
      ))}
    </div>
  );
}
