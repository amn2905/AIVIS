import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Copy, 
  RefreshCw, 
  Pin, 
  Trash2, 
  Download, 
  Check, 
  ShieldCheck
} from 'lucide-react';
import { CopilotChatMessage } from '../../types/copilot';
import { mockCopilotChatHistory } from '../../services/copilotData';
import { CopilotApiClient } from '../../services/copilotApiClient';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface AskAIVISDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AskAIVISDrawer: React.FC<AskAIVISDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<CopilotChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'COPILOT_AI',
      message: 'I am **Ask AIVIS**, your AI vehicle investigation assistant. How can I help you analyze vehicle diagnostics, digital evidence, crash data, documents, telematics, or fraud indicators today?',
      timestamp: 'Just now',
      suggestedFollowups: [
        'Why was this claim marked as High Risk?',
        'Show all OBD fault codes.',
        'Explain the ECU integrity score.',
        'Was the odometer likely tampered with?',
        'Summarize the crash timeline.',
        'Generate an executive investigation summary.'
      ]
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);

  const promptChips = [
    'Analyze Vehicle',
    'Explain Fraud Score',
    'Review OBD Data',
    'Review CAN Bus',
    'Analyze ECU',
    'Analyze Crash',
    'Analyze Sensor Health',
    'Verify Documents',
    'Review Timeline',
    'Generate Report',
    'Detect Fraud Patterns',
    'Explain AI Findings'
  ];

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
    if (queryText.toLowerCase().includes('who are you')) {
      aiReply.message = 'I am **Ask AIVIS**, the AI investigation assistant for the AIVIS platform. I help investigators analyze vehicle diagnostics, digital evidence, crash data, documents, telematics, and fraud indicators to support insurance investigations.';
    }

    setMessages(prev => [...prev, aiReply]);
    setIsSending(false);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePin = (id: string) => {
    setPinnedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleClear = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'COPILOT_AI',
        message: 'Conversation cleared. I am **Ask AIVIS**. How may I assist your investigation?',
        timestamp: 'Just now'
      }
    ]);
  };

  const handleExportMarkdown = () => {
    const markdownContent = messages
      .map(m => `### ${m.sender === 'USER' ? 'Investigator' : 'Ask AIVIS'} (${m.timestamp})\n\n${m.message}\n`)
      .join('\n---\n\n');
    
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ask_AIVIS_Transcript_${Date.now()}.md`;
    a.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-xl bg-[#FAFAFB] border-l border-[#E8EAF0] shadow-clay-lg flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#E8EAF0] bg-white text-slate-900 flex items-center justify-between shadow-clay-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-700 flex items-center justify-center text-white shadow-clay-sm ring-2 ring-indigo-500/20">
                    <Sparkles className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-mono tracking-tight text-[#111827]">Ask AIVIS</h3>
                    <p className="text-[11px] text-slate-500 font-mono">Your AI Vehicle Investigation Assistant</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleExportMarkdown}
                    title="Export Transcript (Markdown)"
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleClear}
                    title="Clear Conversation"
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Prompt Chips Bar */}
              <div className="p-3 bg-[#F4F5F7]/80 border-b border-[#E8EAF0] overflow-x-auto flex items-center gap-1.5 shrink-0">
                {promptChips.map(chip => (
                  <button
                    key={chip}
                    onClick={() => handleSend(chip)}
                    className="px-3 py-1 text-[11px] font-mono font-semibold bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-[#E8EAF0] rounded-full transition-colors whitespace-nowrap shadow-clay-sm"
                  >
                    ✨ {chip}
                  </button>
                ))}
              </div>

              {/* Chat Message Feed */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#FAFAFB]">
                {messages.map(msg => {
                  const isPinned = pinnedIds.includes(msg.id);
                  const isCopilot = msg.sender === 'COPILOT_AI';

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-3 text-xs ${
                        !isCopilot ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-clay-sm ${
                        !isCopilot ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-indigo-400 border border-slate-700'
                      }`}>
                        {!isCopilot ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                      </div>

                      <div className={`max-w-[85%] space-y-2 ${!isCopilot ? 'text-right' : ''}`}>
                        <div className={`p-4 rounded-[20px] text-xs font-sans whitespace-pre-line leading-relaxed shadow-clay-md relative group ${
                          !isCopilot
                            ? 'bg-indigo-600 text-white font-medium rounded-tr-none'
                            : 'bg-white border border-[#E8EAF0] text-slate-900 rounded-tl-none'
                        }`}>
                          {/* Assistant Name Header */}
                          {isCopilot && (
                            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-[11px] font-mono font-bold text-indigo-700">
                              <span className="flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5" /> Ask AIVIS Assistant
                              </span>
                              {isPinned && <span className="text-amber-600 text-[10px] flex items-center gap-1"><Pin className="w-3 h-3 fill-current" /> Pinned</span>}
                            </div>
                          )}

                          {msg.message}

                          {/* Quick Toolbar for Copilot responses */}
                          {isCopilot && (
                            <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-end gap-2 text-slate-400 opacity-80 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleCopy(msg.id, msg.message)}
                                className="p-1 hover:text-slate-700 rounded transition-colors"
                                title="Copy response"
                              >
                                {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                              <button
                                onClick={() => togglePin(msg.id)}
                                className={`p-1 rounded transition-colors ${isPinned ? 'text-amber-600' : 'hover:text-slate-700'}`}
                                title="Pin message"
                              >
                                <Pin className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleSend(`Regenerate: ${msg.message.slice(0, 30)}`)}
                                className="p-1 hover:text-slate-700 rounded transition-colors"
                                title="Regenerate response"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Suggested Followups */}
                        {msg.suggestedFollowups && msg.suggestedFollowups.length > 0 && (
                          <div className="space-y-1.5 pt-1 text-left">
                            <span className="text-[10px] text-slate-400 font-mono block font-bold uppercase">Suggested Investigation Queries:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.suggestedFollowups.map((sug, i) => (
                                <button
                                  key={i}
                                  onClick={() => handleSend(sug)}
                                  className="px-3 py-1 text-[11px] font-mono font-medium bg-white hover:bg-indigo-50 text-indigo-700 border border-[#E8EAF0] rounded-full transition-colors text-left shadow-clay-sm"
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
                  );
                })}
              </div>

              {/* Input Form */}
              <div className="p-4 border-t border-[#E8EAF0] bg-white space-y-2 shadow-clay-md">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(inputQuery);
                  }}
                  className="flex items-center gap-2"
                >
                  <Input
                    placeholder="Ask AIVIS anything about your investigation..."
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
                    Ask
                  </Button>
                </form>
                <p className="text-[10px] text-slate-400 font-mono text-center">
                  Ask AIVIS — Conversational AI for Vehicle Forensics, Telematics, & Fraud Detection
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
