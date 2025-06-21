import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Trash2, Volume2 } from 'lucide-react';

interface VoiceRecorderProps {
  onVoiceRecorded: (audioBlob: Blob | null) => void;
  recordedAudio: Blob | null;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onVoiceRecorded, recordedAudio }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        onVoiceRecorded(audioBlob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    onVoiceRecorded(null);
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  React.useEffect(() => {
    if (recordedAudio && !audioUrl) {
      const url = URL.createObjectURL(recordedAudio);
      setAudioUrl(url);
    }
  }, [recordedAudio, audioUrl]);

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <Volume2 className="h-5 w-5 text-green-600" />
        <span className="font-medium text-gray-900">Voice Description</span>
      </div>

      {!isRecording && !audioUrl && (
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Mic className="h-8 w-8 text-green-600" />
          </div>
          
          <div>
            <p className="text-gray-900 font-medium">Describe Your Symptoms</p>
            <p className="text-sm text-gray-600 mt-1">
              Record a voice description of how you're feeling, your symptoms, and their duration
            </p>
          </div>
          
          <button
            onClick={startRecording}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2 transition-colors"
          >
            <Mic className="h-4 w-4" />
            <span>Start Recording</span>
          </button>
        </div>
      )}

      {isRecording && (
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
            <Mic className="h-8 w-8 text-red-600" />
          </div>
          
          <div>
            <p className="text-red-600 font-medium">Recording...</p>
            <p className="text-2xl font-mono text-gray-900 mt-2">{formatTime(recordingTime)}</p>
          </div>
          
          <button
            onClick={stopRecording}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2 transition-colors"
          >
            <Square className="h-4 w-4" />
            <span>Stop Recording</span>
          </button>
        </div>
      )}

      {audioUrl && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Play className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-900">Voice Recording</p>
                <p className="text-sm text-green-700">Duration: {formatTime(recordingTime)}</p>
              </div>
            </div>
            
            <button
              onClick={deleteRecording}
              className="p-2 hover:bg-green-100 rounded-full transition-colors"
            >
              <Trash2 className="h-4 w-4 text-green-600" />
            </button>
          </div>
          
          <audio ref={audioRef} controls className="w-full">
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support audio playback.
          </audio>
          
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> In a real implementation, your voice would be converted to text using speech recognition technology for analysis.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};