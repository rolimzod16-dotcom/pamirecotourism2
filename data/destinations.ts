export type DestinationGroup = 'Lakes' | 'Mountains and Valleys' | 'Historic Cities';
export type Destination = { slug: string; name: string; group: DestinationGroup; description: string | null; image: string | null };
// Descriptions and photography are awaiting operator approval.
export const destinations: Destination[] = [
  ['iskandarkul','Iskandarkul','Lakes'], ['sarez','Sarez','Lakes'], ['seven-lakes','Seven Lakes','Lakes'], ['karakul','Karakul','Lakes'],
  ['fan-mountains','Fan Mountains','Mountains and Valleys'], ['bartang','Bartang','Mountains and Valleys'], ['wakhan-ishkashim','Wakhan/Ishkashim','Mountains and Valleys'], ['murgab','Murgab','Mountains and Valleys'],
  ['khorog','Khorog','Historic Cities'], ['panjakent','Panjakent','Historic Cities'], ['hissor','Hissor','Historic Cities'], ['khujand','Khujand','Historic Cities'],
].map(([slug, name, group]) => ({ slug, name, group: group as DestinationGroup, description: null, image: null }));
