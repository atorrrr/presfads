import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { MessageCircle, Send, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { apiRequest } from '@/lib/queryClient';

interface ChatMessage {
  id: string;
  message: string;
  response: string;
}

interface ChatResponse {
  response: string;
  sessionId: string;
  stats: {
    messagesRemaining: number;
    isBlocked: boolean;
  };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [sessionId, setSessionId] = useState<string>('');
  const [messagesRemaining, setMessagesRemaining] = useState(10);
  const [isBlocked, setIsBlocked] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: async (message: string): Promise<ChatResponse> => {
      const response = await apiRequest('POST', '/api/chat', {
        message,
        sessionId: sessionId || undefined,
      });
      return await response.json();
    },
    onSuccess: (data) => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        message: currentMessage,
        response: data.response,
      };
      
      setMessages(prev => [...prev, newMessage]);
      setCurrentMessage('');
      setSessionId(data.sessionId);
      setMessagesRemaining(data.stats.messagesRemaining);
      setIsBlocked(data.stats.isBlocked);
    },
    onError: (error) => {
      console.error('Chat error:', error);
      alert('Sorry, there was an error processing your message. Please try again.');
    },
  });

  const handleSend = () => {
    if (!currentMessage.trim()) return;
    
    if (isBlocked) {
      alert('Your session has been blocked due to policy violations.');
      return;
    }
    if (messagesRemaining <= 0) {
      alert('Maximum 10 messages per session reached. Start a new chat to continue.');
      return;
    }

    chatMutation.mutate(currentMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setSessionId('');
    setMessagesRemaining(10);
    setIsBlocked(false);
    setCurrentMessage('');
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full gradient-bg text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[500px] flex flex-col shadow-2xl bg-brand-card border border-purple-500/30">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-purple-500/10 to-green-500/10 rounded-t-lg border-b border-purple-500/20">
        <CardTitle className="text-lg font-semibold gradient-text">
          PRESFADES Assistant
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs border-purple-500/50 text-brand-primary bg-purple-500/5">
            {messagesRemaining} left
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 hover:bg-purple-500/10 text-brand-primary"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {isBlocked && (
          <Alert className="m-3 border-red-500/30 bg-red-500/10">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">
              Session blocked - only barbershop questions allowed.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-brand-secondary text-sm">
              <div className="mb-2 text-brand-primary">Hi! I'm here to help with questions about:</div>
              <div className="space-y-1 text-left">
                <div>• Services & Pricing</div>
                <div>• Booking Appointments</div>
                <div>• Location & Hours</div>
                <div>• Fade Haircut Styles</div>
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className="space-y-3">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="gradient-bg text-white rounded-lg px-3 py-2 max-w-[80%] text-sm shadow-sm">
                  {msg.message}
                </div>
              </div>
              
              {/* Bot Response */}
              <div className="flex justify-start">
                <div className="bg-brand-card border border-purple-500/20 text-brand-primary rounded-lg px-3 py-2 max-w-[80%] text-sm">
                  {msg.response}
                </div>
              </div>
            </div>
          ))}

          {chatMutation.isPending && (
            <div className="flex justify-start">
              <div className="bg-brand-card border border-purple-500/20 text-brand-secondary rounded-lg px-3 py-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="animate-pulse text-purple-400">●</div>
                  <div className="animate-pulse animation-delay-100 text-purple-400">●</div>
                  <div className="animate-pulse animation-delay-200 text-purple-400">●</div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-purple-500/20 bg-brand-card">
          <div className="flex space-x-2">
            <Input
              placeholder={isBlocked ? "Session blocked" : messagesRemaining <= 0 ? "10 message limit reached" : "Ask about services, pricing, booking..."}
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={chatMutation.isPending || isBlocked || messagesRemaining <= 0}
              className="flex-1 bg-brand-bg border-purple-500/30 text-brand-primary placeholder:text-brand-secondary focus:border-purple-500 focus:ring-purple-500/20"
              maxLength={200}
            />
            <Button
              onClick={handleSend}
              disabled={!currentMessage.trim() || chatMutation.isPending || isBlocked || messagesRemaining <= 0}
              size="icon"
              className="gradient-bg text-white hover:scale-105 transition-transform"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {messages.length > 0 && (
            <div className="mt-2 flex justify-between items-center text-xs text-brand-secondary">
              <span>{currentMessage.length}/200 chars</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetChat}
                className="text-xs h-6 px-2 text-brand-primary hover:bg-purple-500/10"
              >
                New Chat
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}