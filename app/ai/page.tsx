'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, MessageSquare, Trash2, Send, Mic, MicOff, Search, Copy, RefreshCw, Square, Check, Sparkles 
} from 'lucide-react';

// Firebase Импорттары (storage толық алып тасталды)
import { db, auth } from '@/lib/firebase'; 
import { collection, addDoc, query, where, orderBy, onSnapshot, doc, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';

interface Chat { id: string; title: string; createdAt: any; }
interface Message { id: string; role: 'user' | 'assistant'; content: string; }

export default function AITeacherModule() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userId = auth.currentUser?.uid || "mock_user_123";

  // Чаттар тізімін нақты уақытта алу
  useEffect(() => {
    const q = query(
      collection(db, 'chats'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      const chatList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chat));
      setChats(chatList);
    });
  }, [userId]);

  // Таңдалған чаттың хабарламаларын жүктеу
  useEffect(() => {
    if (!currentChatId) {
      setMessages([]);
      return;
    }
    const q = query(
      collection(db, 'messages'),
      where('chatId', '==', currentChatId),
      orderBy('createdAt', 'asc')
    );
    return onSnapshot(q, (snapshot) => {
      const dbMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
      setMessages(dbMessages);
      setTimeout(() => autoScroll(), 50);
    });
  }, [currentChatId]);

  const autoScroll = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCreateNewChat = async () => {
    const newChatRef = await addDoc(collection(db, 'chats'), {
      userId,
      title: '✨ Жаңа чат...',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    setCurrentChatId(newChatRef.id);
  };

  const handleDeleteChat = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteDoc(doc(db, 'chats', id));
    if (currentChatId === id) setCurrentChatId(null);
  };

  const handleSendMessage = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim()) return;

    let chatId = currentChatId;
    if (!chatId) {
      const newChatRef = await addDoc(collection(db, 'chats'), {
        userId,
        title: textToSend.slice(0, 25) + '...',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      chatId = newChatRef.id;
      setCurrentChatId(chatId);
    }

    setInput('');
    setIsLoading(true);

    // Пайдаланушы хабарламасын Firestore-ға сақтау
    await addDoc(collection(db, 'messages'), {
      chatId,
      role: 'user',
      content: textToSend,
      createdAt: new Date()
    });

    // XP жүйесі
    let xpGain = 5;
    if (textToSend.toLowerCase().includes('грамматика') || textToSend.toLowerCase().includes('қате')) xpGain = 10;
    if (textToSend.toLowerCase().includes('тест')) xpGain = 20;
    
    await updateDoc(doc(db, 'users', userId), {
      totalXP: increment(xpGain)
    }).catch(() => {});

    if (messages.length === 0) {
      await updateDoc(doc(db, 'chats', chatId), {
        title: textToSend.slice(0, 20) + '...',
        updatedAt: new Date()
      });
    }

    const controller = new AbortController();
    setAbortController(controller);

    const validHistory = messages
      .filter(m => m.content && m.content.trim() !== '')
      .map(m => ({ role: m.role, content: m.content }));
    
    validHistory.push({ role: 'user', content: textToSend });

    // Экранға уақытша хабарлама шығару (Stream эффектісі үшін)
    const temporaryAssistantId = 'temp_ai_msg_' + Date.now();
    setMessages(prev => [...prev, { id: temporaryAssistantId, role: 'assistant', content: '...' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: validHistory }),
        signal: controller.signal
      });

      if (!response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '');
            if (dataStr === '[DONE]') break;
            try {
              const parsed = JSON.parse(dataStr);
              const content = parsed.choices[0].delta.content || '';
              accumulatedContent += content;
              
              setMessages(prev => prev.map(msg => 
                msg.id === temporaryAssistantId ? { ...msg, content: accumulatedContent } : msg
              ));
            } catch (e) {}
          }
        }
      }

      // Ағын толық біткенде Firestore-ға біржола жазу
      await addDoc(collection(db, 'messages'), {
        chatId,
        role: 'assistant',
        content: accumulatedContent,
        createdAt: new Date()
      });

    } catch (err) {
      console.error('Ағын тоқтатылды немесе қате шықты', err);
    } finally {
      // Бұл жердегі қателік ТҮЗЕТІЛДІ (finally)
      setIsLoading(false);
      setAbortController(null);
    }
  };

  const handleStopGeneration = () => {
    if (abortController) {
      abortController.abort();
      setIsLoading(false);
    }
  };

  const handleSpeechInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Браузеріңіз дауысты тануды қолдамайды.');
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'kk-KZ';

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognition.start();
      recognition.onresult = (event: any) => {
        setInput(event.results[0][0].transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredChats = chats.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="h-screen flex bg-[#202123] text-slate-200 antialiased font-sans overflow-hidden">
      
      {/* СОЛ ЖАҚ ПАНЕЛЬ */}
      <aside className="w-[260px] bg-[#202123] p-2 flex flex-col justify-between border-r border-white/10 hidden md:flex h-full select-none">
        <div className="space-y-2 flex-1 flex flex-col overflow-hidden">
          <button 
            onClick={handleCreateNewChat}
            className="w-full flex items-center gap-3 px-3 py-3 border border-white/20 rounded-lg hover:bg-slate-700/50 transition-all text-sm font-semibold text-white mb-2"
          >
            <Plus size={16} />
            <span>Жаңа чат</span>
          </button>

          <div className="relative flex items-center bg-[#2A2B32] rounded-lg border border-white/5 px-2.5 py-1.5">
            <Search size={14} className="text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Тарихтан іздеу..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs w-full focus:outline-none text-white"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar pt-2">
            {filteredChats.map(chat => (
              <div 
                key={chat.id}
                onClick={() => setCurrentChatId(chat.id)}
                className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer text-sm transition-all ${
                  currentChatId === chat.id ? 'bg-[#343541] text-white' : 'hover:bg-[#2A2B32] text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <MessageSquare size={16} className="opacity-60 flex-shrink-0" />
                  <span className="truncate text-xs font-medium">{chat.title}</span>
                </div>
                <button 
                  onClick={(e) => handleDeleteChat(chat.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-400 rounded transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between p-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#111111] flex items-center justify-center font-bold text-xs">
              QM
            </div>
            <div>
              <p className="text-xs font-bold text-white">Шәкірт</p>
              <p className="text-[10px] text-green-400 font-medium">✨ AI Мұғалім белсенді</p>
            </div>
          </div>
          <Sparkles size={16} className="text-[#D4AF37]" />
        </div>
      </aside>

      {/* ОҢ ЖАҚ ПАНЕЛЬ */}
      <main className="flex-1 bg-[#343541] flex flex-col justify-between h-full relative overflow-hidden">
        <header className="p-4 bg-[#343541] border-b border-white/10 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-2">
            <span className="text-lg">🤖</span>
            <h2 className="text-sm font-bold text-white tracking-wide">QAZMURA AI Ұстаз</h2>
          </div>
          {isLoading && (
            <button 
              onClick={handleStopGeneration}
              className="flex items-center gap-2 px-3 py-1.5 border border-white/20 rounded-lg text-xs hover:bg-white/5 transition-all text-slate-300"
            >
              <Square size={12} fill="currentColor" />
              <span>Тоқтату</span>
            </button>
          )}
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto space-y-6 select-none">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-5xl">🇰🇿</motion.div>
              <h1 className="text-2xl font-black text-white">Армысың! Мен QAZMURA интерактивті AI мұғалімімін.</h1>
              <p className="text-sm text-slate-400">
                Маған кез келген қазақша мәтінді жіберіп, грамматикасын тексерте аласыз немесе тест сұрай аласыз.
              </p>
              <div className="grid grid-cols-2 gap-3 w-full text-xs text-left font-medium">
                <button onClick={() => handleSendMessage('«Men mektep bardym» сөйлемінің грамматикасын тексеріп берші')} className="p-3 bg-[#2A2B32] border border-white/5 rounded-xl hover:bg-[#202123] transition-all text-slate-300">
                  📝 Грамматика тексеру
                </button>
                <button onClick={() => handleSendMessage('Зат есім бойынша 10 сұрақтық тест дайында')} className="p-3 bg-[#2A2B32] border border-white/5 rounded-xl hover:bg-[#202123] transition-all text-slate-300">
                  🏆 Тест тапсыру
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {messages.map((msg) => (
                <div key={msg.id} className={`py-6 px-4 md:px-12 flex gap-4 md:gap-6 ${msg.role === 'assistant' ? 'bg-[#444654]' : 'bg-[#343541]'}`}>
                  <div className={`w-8 h-8 rounded-md flex-shrink-0 flex items-center justify-center font-bold text-xs ${msg.role === 'assistant' ? 'bg-teal-600 text-white' : 'bg-[#D4AF37] text-black'}`}>
                    {msg.role === 'assistant' ? 'AI' : 'U'}
                  </div>
                  <div className="flex-1 space-y-4 max-w-3xl overflow-hidden">
                    <div className="prose prose-invert text-slate-200 text-sm leading-relaxed max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                    {msg.role === 'assistant' && msg.content && !msg.id.startsWith('temp_') && (
                      <div className="flex items-center gap-3 pt-2 text-slate-400">
                        <button onClick={() => copyToClipboard(msg.content, msg.id)} className="hover:text-white transition-all p-1 rounded">
                          {copiedId === msg.id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                        </button>
                        <button onClick={() => handleSendMessage('Алдыңғы жауапты қайта өңдеп, тереңірек жаз')} className="hover:text-white transition-all p-1 rounded">
                          <RefreshCw size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <footer className="p-4 bg-[#343541] border-t border-white/10">
          <div className="max-w-3xl mx-auto relative flex flex-col gap-2">
            <div className="relative flex items-center bg-[#40414F] rounded-xl border border-black/10 shadow-lg px-4 py-3">
              
              <button onClick={handleSpeechInput} className={`p-1.5 rounded transition-all mr-2 ${isListening ? 'text-rose-500 bg-rose-500/10' : 'text-slate-400 hover:text-white'}`}>
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                placeholder="Сауал жолдаңыз..."
                className="bg-transparent text-sm w-full focus:outline-none resize-none text-white max-h-24 custom-scrollbar"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                className="ml-2 p-2 bg-teal-600 hover:bg-teal-700 disabled:bg-transparent disabled:text-slate-600 text-white rounded-lg transition-all flex items-center justify-center"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}