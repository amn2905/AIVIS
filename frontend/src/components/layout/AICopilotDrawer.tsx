import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, Bot, User, ArrowRight } from 'lucide-react';
import { CopilotChatMessage } from '../../types/copilot';
import { mockCopilotChatHistory } from '../../services/copilotData';
import { CopilotApiClient } from '../../services/copilotApiClient';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<CopilotChatMessage[]>(mockCopilotChatHistory);
  const [inputQuery, setInputQuery] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (queryText: string) => {
    if (!queryText.trim() || isSending) return;
    const userMsg: CopilotChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      message: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsSending(true);

    const aiReply = await CopilotApiClient.sendCopilotQuery(queryText);
    setMessages(prev => [...prev, aiReply]);
    setIsSending(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-lg bg-white border-l border-slate-200 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-mono">AIVIS Copilot AI Assistant</h3>
                    <p className="text-[11px] text-slate-300 font-mono">LLM Natural Language Case Q&A</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Message Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 text-xs ${
                      msg.sender === 'USER' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === 'USER' ? 'bg-brand-600 text-white' : 'bg-slate-900 text-brand-400 border border-slate-700'
                    }`}>
                      {msg.sender === 'USER' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div className={`max-w-[80%] space-y-2 ${
                      msg.sender === 'USER' ? 'text-right' : ''
                    }`}>
                      <div className={`p-3.5 rounded-xl text-xs font-sans whitespace-pre-line leading-relaxed shadow-xs ${
                        msg.sender === 'USER'
                          ? 'bg-brand-600 text-white font-medium rounded-tr-none'
                          : 'bg-white border border-slate-200 text-slate-900 rounded-tl-none'
                      }`}>
                        {msg.message}
                      </div>

                      {/* Suggested Followups */}
                      {msg.suggestedFollowups && msg.suggestedFollowups.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase">Suggested Questions:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.suggestedFollowups.map((sug, i) => (
                              <button
                                key={i}
                                onClick={() => handleSend(sug)}
                                className="px-2.5 py-1 text-[11px] font-mono bg-white hover:bg-brand-50 text-brand-700 border border-brand-200 rounded-md transition-colors text-left"
                              >
                                • {sug}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <span className="text-[10px] text-slate-400 font-mono block">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <div className="p-4 border-t border-slate-200 bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(inputQuery);
                  }}
                  className="flex items-center gap-2"
                >
                  <Input
                    placeholder="Ask Copilot about case evidence, PIDs, EXIF tags..."
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    className="text-xs"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    isLoading={isSending}
                    icon={<Send className="w-3.5 h-3.5" />}
                  >
                    Send
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
