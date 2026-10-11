import type { Metadata } from 'next';
import BuilderLayout from '@/modules/builder/BuilderLayout';

export const metadata: Metadata = { title: 'E-Resume: Builder' };

export default function BuilderPage() {
  return (
    <div>
      <BuilderLayout />
    </div>
  );
}
