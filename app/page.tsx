import { Hero } from '@/components/Hero';
import { SignatureJourneys } from '@/components/SignatureJourneys';
import { DestinationMap } from '@/components/DestinationMap';
import { WhyUs } from '@/components/WhyUs';
import { Reviews } from '@/components/Reviews';
import { TeamGrid } from '@/components/TeamGrid';
import { ProcessSteps } from '@/components/ProcessSteps';
import { GalleryGrid } from '@/components/GalleryGrid';
import { InquiryForm } from '@/components/InquiryForm';
import { StickyCTA } from '@/components/StickyCTA';
export default function Home() {
  return <main id="main-content"><Hero /><SignatureJourneys /><DestinationMap /><WhyUs /><Reviews /><TeamGrid /><ProcessSteps /><GalleryGrid /><InquiryForm /><StickyCTA /></main>;
}
