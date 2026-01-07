'use client';

import { useState } from 'react';
import { X, Camera, CheckCircle, Loader2 } from 'lucide-react';

interface VerificationModalProps {
    onClose: () => void;
    onVerify: () => Promise<void>;
    missionTitle: string;
}

export default function VerificationModal({ onClose, onVerify, missionTitle }: VerificationModalProps) {
    const [step, setStep] = useState<'camera' | 'verifying' | 'success'>('camera');

    const handleCapture = async () => {
        setStep('verifying');
        // Simulate AI verification delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        await onVerify(); // Call actual verify logic
        setStep('success');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <div className="bg-black border border-white/10 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl relative">

                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white/50 hover:text-white bg-black/50 rounded-full p-2">
                    <X size={20} />
                </button>

                {step === 'camera' && (
                    <div className="h-[500px] flex flex-col">
                        <div className="flex-1 bg-gray-800 relative group overflow-hidden">
                            {/* Camera Viewfinder Simulation */}
                            <img
                                src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=600&auto=format&fit=crop"
                                className="w-full h-full object-cover opacity-50"
                                alt="Camera Preview"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-white/70 text-sm font-medium bg-black/50 px-3 py-1 rounded-lg">Align "After" photo here</p>
                            </div>

                            {/* Grid Overlay */}
                            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="border border-white/10"></div>
                                ))}
                            </div>
                        </div>

                        <div className="h-32 bg-black flex flex-col items-center justify-center p-4">
                            <p className="text-white/70 text-xs mb-3 text-center">Verify: <span className="text-white font-bold">{missionTitle}</span></p>
                            <button
                                onClick={handleCapture}
                                className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center group active:scale-90 transition-all"
                            >
                                <div className="w-14 h-14 bg-white rounded-full group-hover:bg-brand-green transition-colors" />
                            </button>
                        </div>
                    </div>
                )}

                {step === 'verifying' && (
                    <div className="h-[400px] flex flex-col items-center justify-center p-8 text-center space-y-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-green/20 blur-xl rounded-full" />
                            <Loader2 className="text-brand-green animate-spin relative z-10" size={48} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Analyzig Proof...</h3>
                            <p className="text-text-muted text-sm mt-2">AI is checking for cleanliness matches.</p>
                        </div>
                    </div>
                )}

                {step === 'success' && (
                    <div className="h-[400px] flex flex-col items-center justify-center p-8 text-center space-y-6 bg-brand-green/5">
                        <div className="w-20 h-20 bg-brand-green rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,240,144,0.4)] animate-in zoom-in duration-300">
                            <CheckCircle className="text-black" size={40} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">Mission Verified!</h3>
                            <p className="text-text-muted text-sm mt-2">Funds have been released to your wallet.</p>
                        </div>
                        <button onClick={onClose} className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">
                            Back to Dashboard
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
