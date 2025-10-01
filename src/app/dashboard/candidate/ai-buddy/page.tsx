'use client';
import { useState } from 'react';
import FeedbackButtons from '@/components/FeedbackButtons';

export const dynamic = 'force-dynamic';

export default function AIBuddyPage() {
  const [messages, setMessages] = useState<{role: string; content: string}[]>([
    { role: 'assistant', content: 'Hoi! Ik ben je AI Job Hunter. Ik help je bij het vinden van de perfecte baan. Waar kan ik je mee helpen?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || isLoading) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages([...messages, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mode: 'ai-chat', 
          text: input,
          context: 'job-hunting-assistant'
        })
      });
      
      const data = await response.json();
      if (data.ok) {
        const aiMsg = { role: 'assistant', content: data.output };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error(data.error || 'AI request failed');
      }
    } catch (error) {
      console.error('AI Error:', error);
      const aiMsg = { 
        role: 'assistant', 
        content: 'Sorry, er is een fout opgetreden. Probeer het later opnieuw of neem contact op met support.' 
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F7F7', padding: '40px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#89CFF0' }}>AI Job Hunter 🤖</h1>
        <p style={{ color: '#6B7280', marginBottom: '32px' }}>Chat met je persoonlijke AI-assistent voor jobhunting</p>

        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: '16px', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '70%' }}>
                  <div style={{ padding: '12px 16px', borderRadius: '12px', background: msg.role === 'user' ? '#89CFF0' : '#F3F4F6', color: msg.role === 'user' ? 'white' : '#1F2937' }}>
                    {msg.content}
                  </div>
                  {msg.role === 'assistant' && idx > 0 && (
                    <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-start' }}>
                      <FeedbackButtons feature="ai_chat" itemId={`message-${idx}`} />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ maxWidth: '70%' }}>
                  <div style={{ padding: '12px 16px', borderRadius: '12px', background: '#F3F4F6', color: '#1F2937' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <div style={{ width: '8px', height: '8px', background: '#89CFF0', borderRadius: '50%', animation: 'pulse 1.4s infinite' }}></div>
                        <div style={{ width: '8px', height: '8px', background: '#89CFF0', borderRadius: '50%', animation: 'pulse 1.4s infinite 0.2s' }}></div>
                        <div style={{ width: '8px', height: '8px', background: '#89CFF0', borderRadius: '50%', animation: 'pulse 1.4s infinite 0.4s' }}></div>
                      </div>
                      <span>AI denkt na...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Typ je vraag..."
              style={{ flex: 1, padding: '12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '14px' }}
            />
            <button onClick={handleSend} style={{ padding: '12px 24px', background: '#89CFF0', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
              Verzend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
