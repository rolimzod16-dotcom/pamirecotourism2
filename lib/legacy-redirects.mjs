// Addresses from the older pamirecotourism.com sites (2016–2025: PHP /en/ site, Joomla /index.php/, CMS /blog/).
// They still have links and search history, so each one points to the closest page on the current site.
// First match wins: specific places and tours first, broad sections last.
const rules = [
  // Places
  ['(?:en|index\\.php|blog)/.*(?:sarez).*', '/destinations/sarez'],
  ['(?:en|index\\.php|blog)/.*(?:bartang|bardara|grumm|girijimailo|girjimailo|bachor).*', '/destinations/bartang'],
  ['(?:en|index\\.php|blog)/.*(?:wakhan|ishkashim).*', '/destinations/wakhan-ishkashim'],
  ['(?:en|index\\.php|blog)/.*khorog.*', '/destinations/khorog'],
  ['(?:en|index\\.php|blog)/.*(?:murghab|murgab).*', '/destinations/murgab'],
  ['(?:en|index\\.php|blog)/.*karakul.*', '/destinations/karakul'],
  ['(?:en|index\\.php|blog)/.*iskanderkul.*', '/destinations/iskandarkul'],
  ['(?:en|index\\.php|blog)/.*(?:7-lakes|seven-lakes).*', '/tours/fan-mountain-lakes'],
  ['(?:en|index\\.php|blog)/.*(?:fann|fan-mountains).*', '/destinations/fan-mountains'],
  ['(?:en|index\\.php|blog)/.*(?:hissor|hisor).*', '/destinations/hissor'],
  ['(?:en|index\\.php|blog)/.*(?:ancient-traditions|khujand).*', '/destinations/khujand'],
  ['(?:en|index\\.php|blog)/.*panjakent.*', '/destinations/panjakent'],
  // Tours and services
  ['(?:en|index\\.php)/.*(?:fedchenko|yashilkul).*', '/tours/pamir-lakes-traverse'],
  ['en/ready-tours/cross-boarder-tours.*', '/tours/cross-border-trekking'],
  ['en/ready-tours/jeep-tours.*', '/tours/pamir-classical-4x4'],
  ['(?:en/ready-tours|en/our-services/tours|index\\.php/tour-packages|index\\.php/portfolio-details).*', '/tours'],
  ['en/our-services/GBAO-permit.*', '/tours'],
  ['(?:en/our-services|index\\.php/component/content).*', '/contact'],
  ['en/what-to-see-in-pamir/pamir-mountains.*', '/destinations'],
  ['en/(?:what-to-see-in-pamir|what-to-see-in-tajikistan|pamir|tajikistan).*', '/destinations'],
  ['en/(?:about|home).*', '/about'],
  ['en/contact.*', '/contact'],
  ['en/gallery.*', '/gallery'],
  // Older CMS sections
  ['about-us', '/about'],
  ['(?:index\\.php/)?(?:contact-us|contacts|faq)', '/contact'],
  ['(?:activities|services)(?:/.*)?', '/tours'],
  ['destination-detail(?:/.*)?', '/destinations'],
  ['blog(?:/.*)?', '/destinations'],
  // Anything else from the old language folders and Joomla
  ['(?:en|de|fr)(?:/.*)?', '/'],
  ['index\\.php(?:/.*)?', '/'],
];

export const legacyRedirects = rules.map(([pattern, destination]) => ({
  source: `/:legacy(${pattern})`,
  destination,
  permanent: true,
}));
