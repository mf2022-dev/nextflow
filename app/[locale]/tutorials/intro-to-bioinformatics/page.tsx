import React from 'react';
import TutorialViewer from '@/components/tutorials/TutorialViewer';
import { getTutorialBySlug } from '@/lib/tutorials';
import { notFound } from 'next/navigation';

export default function TutorialPage() {
  const tutorial = getTutorialBySlug('intro-to-bioinformatics');

  if (!tutorial) {
    notFound();
  }

  return <TutorialViewer tutorial={tutorial} />;
}
