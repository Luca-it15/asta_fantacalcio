'use client';
import Lobby from '@/components/Lobby';

export default function Room({ params }: { params: { id: string } }) {
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : '';
  return <Lobby username={username || ''}/>;
}
