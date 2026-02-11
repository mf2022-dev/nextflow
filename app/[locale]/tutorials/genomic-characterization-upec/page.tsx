import React from 'react';
import TutorialViewer from '@/components/tutorials/TutorialViewer';
import { getTutorialBySlug } from '@/lib/tutorials';
import { notFound } from 'next/navigation';

export default function GenomicUPECTutorialPage() {
  const tutorial = getTutorialBySlug('genomic-characterization-upec');

  if (!tutorial) {
    notFound();
  }

  return <TutorialViewer tutorial={tutorial} />;
}
