import type { Metadata } from 'next';
import HomeLayout from '@/modules/home/HomeLayout';

export const metadata: Metadata = { title: 'E-Resume: Home' };

export default function HomePage() {
  return (
    <div>
      <HomeLayout />
    </div>
  );
}
