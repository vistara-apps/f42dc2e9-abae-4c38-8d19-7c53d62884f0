'use client';

import { useState, useRef } from 'react';
import { QrCode, Camera, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QRScannerProps {
  onScan: (qrCode: string) => void;
  variant?: 'inline' | 'modal';
  className?: string;
}

export function QRScanner({ onScan, variant = 'inline', className }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      onScan(manualCode.trim());
      setManualCode('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd use a QR code reading library here
      // For demo purposes, we'll simulate a successful scan
      const simulatedQRCode = `plant_${Date.now()}`;
      onScan(simulatedQRCode);
    }
  };

  const startCamera = () => {
    setIsScanning(true);
    // In a real app, you'd start the camera and QR scanning here
    // For demo purposes, we'll simulate after a delay
    setTimeout(() => {
      const simulatedQRCode = `plant_${Date.now()}`;
      onScan(simulatedQRCode);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Camera Scanner */}
      <div className="glass-card p-6 text-center">
        {isScanning ? (
          <div className="space-y-4">
            <div className="w-48 h-48 mx-auto bg-surface rounded-lg flex items-center justify-center border-2 border-dashed border-accent">
              <div className="animate-pulse">
                <Camera className="w-12 h-12 text-accent" />
              </div>
            </div>
            <p className="text-muted">Scanning for QR code...</p>
            <button
              onClick={() => setIsScanning(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-48 h-48 mx-auto bg-surface rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <QrCode className="w-12 h-12 text-muted" />
            </div>
            <div className="space-y-3">
              <button
                onClick={startCamera}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Scan QR Code
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Upload Image
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        )}
      </div>

      {/* Manual Entry */}
      <div className="glass-card p-4">
        <h3 className="font-medium text-fg mb-3">Or enter code manually:</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="Enter plant code"
            className="input-field flex-1"
          />
          <button
            onClick={handleManualSubmit}
            disabled={!manualCode.trim()}
            className="btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
