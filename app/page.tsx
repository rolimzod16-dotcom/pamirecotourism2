import { Hero } from '@/components/Hero';
import { SignatureJourneys } from '@/components/SignatureJourneys';
import { DestinationMap } from '@/components/DestinationMap';
import { WhyUs } from '@/components/WhyUs';
import { StickyCTA } from '@/components/StickyCTA';
export default function Home() {
  return <main id="main-content"><Hero /><SignatureJourneys /><DestinationMap /><WhyUs /><StickyCTA /></main>;
}
