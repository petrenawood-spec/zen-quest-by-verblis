
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import React, { useEffect, useRef, useState } from 'react';
import { SoundService } from '../services/SoundService';
import Logo from './Logo';

interface LiveMasterProps {
  onClose: () => void;
}

const LiveMaster: React.FC<LiveMasterProps> = ({ onClose }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  
  const soundService = SoundService.getInstance();
  const hasPlayedZephyrChimeRef = useRef(false);
  const hasPlayedListeningSoundRef = useRef(false);

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }

  function encode(bytes: Uint8Array) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  const startSession = async () => {
    try {
      setIsStarted(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputNode = audioContextRef.current.createGain();
      outputNode.connect(audioContextRef.current.destination);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            const source = inputAudioContext.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) { int16[i] = inputData[i] * 32768; }
              const pcmBlob = { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
              sessionPromise.then(s => {
                try { s.sendRealtimeInput({ media: pcmBlob }); } catch (err) {}
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContext.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
               setTranscription(prev => prev + " " + message.serverContent?.outputTranscription?.text);
            }
            if (message.serverContent?.inputTranscription) {
              if (!hasPlayedListeningSoundRef.current) {
                soundService.playListeningStart();
                hasPlayedListeningSoundRef.current = true;
              }
            }
            if (message.serverContent?.turnComplete) {
              hasPlayedListeningSoundRef.current = false;
              hasPlayedZephyrChimeRef.current = false;
            }
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
              if (!hasPlayedZephyrChimeRef.current) {
                soundService.playZephyrChime();
                hasPlayedZephyrChimeRef.current = true;
              }
              setIsSpeaking(true);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), audioContextRef.current, 24000, 1);
              const source = audioContextRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsSpeaking(false);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }
          },
          onclose: () => setIsConnected(false),
          onerror: (e) => console.error("Live API Error:", e),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: 'You are Zephyr, a coach from Verblis Health. Speak with warmth and encourage the user to breathe, flow, and thrive.',
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        },
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Failed to start session:", err);
      setIsStarted(false);
    }
  };

  useEffect(() => {
    return () => {
      if (sessionRef.current) sessionRef.current.close();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F3E8FF] p-6 animate-flutter">
      <button onClick={onClose} className="absolute top-8 right-8 h-12 w-12 flex items-center justify-center rounded-full bg-purple-200 text-[#7E22CE] hover:bg-purple-300 transition-colors">✕</button>
      
      {!isStarted ? (
        <div className="text-center space-y-8 max-w-md animate-flutter">
          <div className="mx-auto h-40 w-40 rounded-[3rem] bg-white shadow-2xl flex items-center justify-center animate-float">
            <Logo size={80} />
          </div>
          <h2 className="text-4xl font-bold text-indigo-950">Enter the Flow</h2>
          <p className="text-indigo-700/60 font-medium">Master Zephyr is ready to guide you. Tap below to begin your voice session.</p>
          <button 
            onClick={startSession}
            className="w-full py-6 rounded-3xl bg-indigo-700 text-white font-bold text-lg shadow-2xl hover:bg-indigo-800 transition-all transform active:scale-95"
          >
            START SESSION
          </button>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center max-w-2xl w-full text-center">
          <div className={`mb-12 h-64 w-64 rounded-full border-4 flex items-center justify-center transition-all duration-700 ${isSpeaking ? 'border-green-400 scale-110 shadow-[0_0_50px_rgba(74,222,128,0.2)]' : 'border-purple-200'}`}>
            <div className={`animate-float ${isSpeaking ? 'scale-125' : ''} transition-transform`}>
               <Logo size={120} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#7E22CE] mb-2">Master Zephyr</h2>
          <p className="text-[#65A30D] font-bold uppercase tracking-widest text-xs mb-8">
            {isConnected ? (isSpeaking ? 'Master is sharing wisdom...' : 'Breathe, I am listening...') : 'Connecting to the flow...'}
          </p>
          <div className="w-full bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 min-h-[150px] shadow-2xl border border-white/40">
            <p className="text-lg italic text-[#7E22CE]/70 leading-relaxed">
              {transcription || "Silence is the space between notes. Speak when you're ready..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveMaster;
