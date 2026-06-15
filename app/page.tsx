'use client';

import { useState, useEffect, useRef } from 'react';

// Challenge 1: Fix reconnecting on every keystroke
function ChatRoom({ roomId }: { roomId: string }) {
  useEffect(() => {
    console.log(`✅ Connecting to "${roomId}" room...`);
    return () => console.log(`❌ Disconnected from "${roomId}" room.`);
  }, [roomId]);

  return <h2>Welcome to the {roomId} room!</h2>;
}

// Challenge 2 & 3: Moving Dot (Fixed - stays inside box)
function MovingDot() {
  const [position, setPosition] = useState({ x: 180, y: 130 });
  const [canMove, setCanMove] = useState(true);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      if (!canMove) return;

      const box = document.querySelector('.moving-dot-box') as HTMLElement;
      if (!box) return;

      const rect = box.getBoundingClientRect();

      let newX = e.clientX - rect.left;
      let newY = e.clientY - rect.top;

      // Clamp inside the box with padding
      newX = Math.max(20, Math.min(newX, rect.width - 20));
      newY = Math.max(20, Math.min(newY, rect.height - 20));

      setPosition({ x: newX, y: newY });
    }

    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [canMove]);

  return (
    <div className="challenge">
      <h2>2 & 3. Moving Dot</h2>
      <label>
        <input 
          type="checkbox" 
          checked={canMove} 
          onChange={e => setCanMove(e.target.checked)} 
        />
        Allow dot to move
      </label>
      
      <div 
        className="moving-dot-box relative w-[400px] h-[300px] border-4 border-gray-400 bg-gray-100 mt-4 overflow-hidden rounded-xl"
      >
        <div
          className="absolute w-10 h-10 bg-pink-500 rounded-full shadow-lg flex items-center justify-center text-white text-xs font-bold"
          style={{
            left: position.x - 20,
            top: position.y - 20,
          }}
        >
          DOT
        </div>
      </div>
    </div>
  );
}

// Challenge 4: Fix Connection Switch
function ChatRoomWithEncryption({ roomId, isEncrypted }: { roomId: string; isEncrypted: boolean }) {
  useEffect(() => {
    console.log(`Connecting to ${roomId} (${isEncrypted ? '🔒 encrypted' : '📡 unencrypted'})`);
    return () => console.log(`Disconnected from ${roomId}`);
  }, [roomId, isEncrypted]);

  return <h2>Welcome to the {roomId} room! {isEncrypted ? '🔒' : '📡'}</h2>;
}

// Challenge 5: Populate Chain of Select Boxes
function SelectChain() {
  const [planetId, setPlanetId] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [planets, setPlanets] = useState<any[]>([]);
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    setPlanets([
      { id: 'earth', name: 'Earth' },
      { id: 'mars', name: 'Mars' },
    ]);
    setPlanetId('earth');
  }, []);

  useEffect(() => {
    if (planetId) {
      setPlaces([
        { id: '1', name: 'Capital City' },
        { id: '2', name: 'Mountains' },
        { id: '3', name: 'Beach' },
      ]);
      setPlaceId('1');
    }
  }, [planetId]);

  return (
    <div className="challenge">
      <h2>5. Chain of Select Boxes</h2>
      <label>
        Pick a planet:{' '}
        <select value={planetId} onChange={e => setPlanetId(e.target.value)}>
          {planets.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </label>
      <label>
        Pick a place:{' '}
        <select value={placeId} onChange={e => setPlaceId(e.target.value)}>
          {places.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </label>
      <p>You are going to: <b>{placeId || '???'}</b> on <b>{planetId || '???'}</b></p>
    </div>
  );
}

export default function EffectsLifecycle() {
  const [roomId, setRoomId] = useState('general');
  const [isEncrypted, setIsEncrypted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-16">Lifecycle of Reactive Effects</h1>

        <div className="space-y-16">
          <div className="challenge">
            <h2>1. Fix Reconnecting</h2>
            <label>
              Choose room:{' '}
              <select value={roomId} onChange={e => setRoomId(e.target.value)}>
                <option value="general">general</option>
                <option value="travel">travel</option>
                <option value="music">music</option>
              </select>
            </label>
            <ChatRoom roomId={roomId} />
          </div>

          <MovingDot />

          <div className="challenge">
            <h2>4. Fix Connection Switch</h2>
            <label>
              <input 
                type="checkbox" 
                checked={isEncrypted} 
                onChange={e => setIsEncrypted(e.target.checked)} 
              />
              Use encryption
            </label>
            <ChatRoomWithEncryption roomId={roomId} isEncrypted={isEncrypted} />
          </div>

          <SelectChain />
        </div>
      </div>
    </div>
  );
}