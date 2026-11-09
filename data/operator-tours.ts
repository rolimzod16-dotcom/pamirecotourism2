// Tour programmes supplied by Pamir Eco-Tourism (2025 .docx itineraries).
// Generated content: edit the tour in /admin after deploy, or regenerate this file.
import type { StoredTour } from '@/lib/tour-record';

export type OperatorTour = Omit<StoredTour, 'sort' | 'showOnHome' | 'published' | 'rating' | 'image' | 'imageAlt'>;

/** Each release is written into the live catalog once; later admin edits are kept. */
export const OPERATOR_TOUR_RELEASES: { version: string; slugs: string[] }[] = [
  {
    "version": "operator-tours-2025-11",
    "slugs": [
      "pamir-classical-4x4",
      "mountain-lakes-trekking",
      "pamir-lakes-traverse",
      "pamir-walks-cultural",
      "snow-leopard-tour"
    ]
  },
  {
    "version": "operator-tours-2026-11-ride",
    "slugs": [
      "high-pamirs-motorcycle"
    ]
  }
];

export const operatorTours: OperatorTour[] = [
  {
    "slug": "pamir-classical-4x4",
    "title": "Pamir Overland: The Pamir Highway by 4x4",
    "category": "driving",
    "price": null,
    "days": 10,
    "distance": "2,215 km",
    "maxAltitude": "4,656 m (Ak-Baital Pass)",
    "difficulty": "Moderate · long driving days",
    "season": "May – September",
    "groupSize": "Up to 16 travellers",
    "hook": "A 10-day 4x4 loop from Dushanbe: the Panj gorge along the Afghan border, Khorog, the Wakhan Valley and its ancient forts, Bulunkul and Yashilkul lakes, Murghab, Karakul and the Bartang Valley.",
    "overview": "The classic Pamir Highway journey in ten days. Drive along the Panj River with Afghan villages just across the water, explore Khorog, the capital of the Pamirs, and continue into the Wakhan Valley under the Hindu Kush, with the Kah-Kaha (3rd–2nd century BC) and Yamchun (3rd–1st century BC) fortresses, Langar petroglyphs and Bibi Fotima hot spring. Cross the Khargush Pass (4,344 m) to Bulunkul and Yashilkul lakes, reach Murghab on the high plateau, cross Ak-Baital (4,656 m), the highest point of the Pamir Highway, to Karakul, and return through the remote Bartang Valley. Along the way: hot springs, Pamiri hospitality and a chance to see bar-headed geese and other Pamir wildlife.",
    "blurb": "A 10-day 4x4 loop from Dushanbe: the Panj gorge along the Afghan border, Khorog, the Wakhan Valley and its ancient forts, Bulunkul and Yashilkul lakes, Murghab, Karakul and the Bartang Valley.",
    "route": "Dushanbe · Wakhan · Murghab · Karakul · Bartang",
    "badge": "10 days · 4x4 overland",
    "level": "Moderate",
    "levelTone": "forest",
    "gallery": [
      {
        "src": "/photos/tours/pamir-highway-4x4/01.jpg",
        "alt": "Pamir Overland: The Pamir Highway by 4x4, photograph 1"
      },
      {
        "src": "/photos/tours/pamir-highway-4x4/02.jpg",
        "alt": "Pamir Overland: The Pamir Highway by 4x4, photograph 2"
      },
      {
        "src": "/photos/tours/pamir-highway-4x4/03.jpg",
        "alt": "Pamir Overland: The Pamir Highway by 4x4, photograph 3"
      },
      {
        "src": "/photos/places/wakhan-ishkashim/01.jpg",
        "alt": "Pamir Overland: The Pamir Highway by 4x4, photograph 4"
      },
      {
        "src": "/photos/places/karakul/01.jpg",
        "alt": "Pamir Overland: The Pamir Highway by 4x4, photograph 5"
      },
      {
        "src": "/photos/places/bartang/02.jpg",
        "alt": "Pamir Overland: The Pamir Highway by 4x4, photograph 6"
      }
    ],
    "regions": [
      "pamir-highway",
      "wakhan",
      "sarez"
    ],
    "activities": [
      "4x4",
      "lakes"
    ],
    "winter": false,
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Dushanbe · 65 km",
        "description": "Meeting at the airport and transfer to the hotel. After lunch, a drive to Hissar, 30 km west of Dushanbe, to see the Hissar Fortress, two madrasahs (18th and 19th centuries) and a 16th-century mausoleum. Return to Dushanbe.",
        "overnight": "Hotel in Dushanbe"
      },
      {
        "day": 2,
        "title": "Dushanbe – Kalai Khumb · 371 km, 7 h",
        "description": "Drive towards the Pamirs via Kulob with views of the Nurek Reservoir, the Hulbuk Fortress in Vose and the mausoleum of the 14th-century poet and scholar Mir Sayid Ali Hamadani in Kulob. Highest point: Shurobod Pass, 2,126 m.",
        "overnight": "Homestay in Kalai Khumb (1,295 m)"
      },
      {
        "day": 3,
        "title": "Kalai Khumb – Khorog · 270 km, 7–8 h",
        "description": "Along the Panj (Oxus) River, with Afghan villages sometimes only metres across the water. A stop at the Nosir Khusraw monument in Porshinev. In the afternoon, a Khorog city tour: the State Historical Museum, the Ismaili Centre, the city park and the Tourism Information Centre.",
        "overnight": "Hotel in Khorog (2,100 m)"
      },
      {
        "day": 4,
        "title": "Khorog – Langar · 246 km, 10–12 h",
        "description": "Towards Ishkashim with a stop at the Garm-Chashma hot spring and a distant view of the Kuhi La'l ruby mines. Into the Wakhan Valley: the Kah-Kaha and Yamchun fortresses (up to 3,200 m), Bibi Fotima hot spring, pre-Islamic shrines, the museum of the 19th-century Sufi scholar Muboraki Wakhoni with his solar calendar and, time permitting, a walk to the Langar petroglyphs.",
        "overnight": "Homestay in Langar area (2,800 m)"
      },
      {
        "day": 5,
        "title": "Langar – Bulunkul – Murghab · 275 km, 12–14 h",
        "description": "Over the Khargush Pass (4,344 m) to Bulunkul and Yashilkul lakes. Bulunkul is the coldest settlement in Central Asia, with winter lows near −60 °C. Lunch outdoors or in Alichur, where a two-hour yak ride can be arranged in advance. Via Bashgumbez and Ak-Balyk, with a distant view of the Chinese cemetery, to Murghab.",
        "overnight": "Homestay or guesthouse in Murghab (3,630 m)"
      },
      {
        "day": 6,
        "title": "Murghab – Karakul · 200 km, 8–9 h",
        "description": "To Rangkul and Shorkul lakes, then over Ak-Baital (4,656 m), the highest point of the Pamir Highway, to Karakul, the largest lake in Tajikistan. A short detour to the Karaart geoglyphs (8th–3rd century BC) and an evening walk along the lakeshore.",
        "overnight": "Homestay or yurt in Karakul (3,930 m)"
      },
      {
        "day": 7,
        "title": "Karakul – Savnob · 175 km, 8 h",
        "description": "Across the moon-like Ak-Tash plateau below the snowy Muzkol Range, with the Ak-Tash meteor craters and the Shurlu lunar calendar. Tea and yoghurt with a Pamiri shepherd, then down the Kochkar Pass into the Bartang Valley along the Tanimas River. In Savnob, a ruined 19th-century fortress and a cave once used as a refuge from nomad raids.",
        "overnight": "Homestay in Savnob (2,550 m)"
      },
      {
        "day": 8,
        "title": "Savnob – Rushan · 135 km, 6 h",
        "description": "Down the Bartang Valley past its villages, with a visit to the Khojai Nuriddin shrine in Basid and the Vomar Fortress in Rushan.",
        "overnight": "Guesthouse in Rushan (2,000 m)"
      },
      {
        "day": 9,
        "title": "Rushan – Kalai Khumb · 177 km, 6 h",
        "description": "Back along the Panj with Afghan villages across the river: a hundred metres of water that feels like a step back in time.",
        "overnight": "Guesthouse in Kalai Khumb (1,250 m)"
      },
      {
        "day": 10,
        "title": "Kalai Khumb – Saghirdasht – Dushanbe · 300 km, 8–10 h",
        "description": "The northern route via the Saghirdasht Pass (3,252 m) and Tavildara, if the road is open. A stop at Blue Lake (Goluboye Ozero) and a distant view of the Rogun hydropower plant, with the world's highest dam (335 m). Arrival in Dushanbe.",
        "overnight": "Hotel in Dushanbe"
      }
    ],
    "included": [
      "4x4 Toyota Land Cruiser with driver",
      "Full board: breakfast, lunch and dinner every day",
      "Hotels, guesthouses, homestays and a yurt",
      "Local English-speaking guide",
      "Hissar and Khorog sightseeing"
    ],
    "excluded": [
      "International flights",
      "Museum and site entrance fees",
      "Yak ride in Alichur (on request)",
      "Alcohol and personal expenses"
    ],
    "gear": [],
    "faq": [
      {
        "question": "How much does this tour cost?",
        "answer": "Personalised quotation for your dates and group size. Season May–September. The final quote depends on your dates and group size."
      },
      {
        "question": "Who is this trip for?",
        "answer": "No special experience needed. Expect long driving days and altitude above 4,000 m on days 5–7."
      },
      {
        "question": "Where do we stay?",
        "answer": "Hotels in Dushanbe and Khorog, homestays and guesthouses along the route, a yurt or homestay at Karakul."
      }
    ],
    "destinations": [
      "hissor",
      "khorog",
      "wakhan-ishkashim",
      "murgab",
      "karakul",
      "bartang"
    ]
  },
  {
    "slug": "mountain-lakes-trekking",
    "title": "Pamir Mountain Lakes Trek: Ghund to Sarez",
    "category": "trekking",
    "price": 1950,
    "days": 15,
    "distance": "",
    "maxAltitude": "4,530 m (Qarghizshabar)",
    "difficulty": "Medium to high",
    "season": "May – October",
    "groupSize": "1–15 travellers",
    "hook": "A 15-day trek from the Ghund Valley past Chapdarkul and the three Uchkul lakes, down the Langar Valley to Lake Sarez, a boat ride to the Usoy Dam and out through the Bartang Valley.",
    "overview": "A medium-to-hard trek through the high lakes of the western Pamirs. After a warm-up in the car-free village of Jizew, start from Bachor in the Ghund Valley and walk with donkeys carrying the luggage past Chapdarkul (4,530 m), the three Uchkul lakes and the summer pasture of the shepherd Ahmad. Descend the Langar Valley to the meteorological station on Lake Sarez, cross the lake by motorboat to the Usoy Dam and walk out along the Murgab and Bartang rivers to Barchidiv, one of the most remote villages of the Bartang Valley. The trip ends with a Dushanbe city tour.",
    "blurb": "A 15-day trek from the Ghund Valley past Chapdarkul and the three Uchkul lakes, down the Langar Valley to Lake Sarez, a boat ride to the Usoy Dam and out through the Bartang Valley.",
    "route": "Jizew · Bachor · Uchkul · Sarez · Bartang",
    "badge": "15 days · Lakes trek",
    "level": "Challenging",
    "levelTone": "alert",
    "gallery": [
      {
        "src": "/photos/tours/mountain-lakes-trekking/01.jpg",
        "alt": "Pamir Mountain Lakes Trek: Ghund to Sarez, photograph 1"
      },
      {
        "src": "/photos/tours/mountain-lakes-trekking/02.jpg",
        "alt": "Pamir Mountain Lakes Trek: Ghund to Sarez, photograph 2"
      },
      {
        "src": "/photos/tours/mountain-lakes-trekking/03.jpg",
        "alt": "Pamir Mountain Lakes Trek: Ghund to Sarez, photograph 3"
      },
      {
        "src": "/photos/places/sarez/01.jpg",
        "alt": "Pamir Mountain Lakes Trek: Ghund to Sarez, photograph 4"
      },
      {
        "src": "/photos/places/sarez/02.jpg",
        "alt": "Pamir Mountain Lakes Trek: Ghund to Sarez, photograph 5"
      },
      {
        "src": "/photos/tours/mountain-lakes-trekking/04.jpg",
        "alt": "Pamir Mountain Lakes Trek: Ghund to Sarez, photograph 6"
      }
    ],
    "regions": [
      "sarez"
    ],
    "activities": [
      "trekking",
      "lakes"
    ],
    "winter": false,
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Dushanbe – Kalai Khumb",
        "description": "Meeting at the airport and departure for the Pamirs via Kulob. The scenery and people change as you approach Kalai Khumb on the Panj, a major tributary of the Amu Darya (Oxus).",
        "overnight": "Guesthouse in Kalai Khumb"
      },
      {
        "day": 2,
        "title": "Kalai Khumb – Jizew · 270 km",
        "description": "Along the Panj to Rushan, then into the Bartang Valley to the Jizew bridge. Cross the river on a wooden bridge and walk 7 km to Jizew, an eco-village with no road or power lines, small lakes, birds and groves. Next morning, a hike further up the valley to another lake.",
        "overnight": "Homestay in Jizew"
      },
      {
        "day": 3,
        "title": "Jizew – Khorog – Bachor · 150 km",
        "description": "Drive to Khorog (2,110 m), the administrative centre of the Pamirs at the meeting of the Panj and Ghund rivers, for lunch, then up the Ghund Valley to Bachor village (3,332 m).",
        "overnight": "Homestay in Bachor"
      },
      {
        "day": 4,
        "title": "Bachor – Warmagin pasture · 12 km",
        "description": "The trek begins: 5–6 hours on foot with luggage carried by pack animals. Lunch on the trail.",
        "overnight": "Tent camp"
      },
      {
        "day": 5,
        "title": "Warmagin – Qarghizshabar (4,530 m)",
        "description": "About 6 hours to the majestic Chapdarkul lake, often with yaks grazing nearby.",
        "overnight": "Tent camp"
      },
      {
        "day": 6,
        "title": "Qarghizshabar – Uchkul lakes – Ahmad's shelter (4,314 m)",
        "description": "Seven hours past the three Uchkul ('three lakes'). At his summer pasture the shepherd Ahmad serves tea and home-made yoghurt.",
        "overnight": "Tent camp by the pasture"
      },
      {
        "day": 7,
        "title": "Ahmad's shelter – Rathonak (3,880 m)",
        "description": "Descend through the Langar Valley to a good campsite on the bank of the Langar River, about 5–6 hours.",
        "overnight": "Tent camp"
      },
      {
        "day": 8,
        "title": "Rathonak – Irkht meteo station · 14 km",
        "description": "About 5 hours towards Irkht Bay, partly on a trail broken by mudflows, crossing the Langar River twice. Camp on the shore of Lake Sarez by the meteorological station, with snowy peaks reflected in the water.",
        "overnight": "Tent camp on Lake Sarez"
      },
      {
        "day": 9,
        "title": "Irkht – Usoy Dam – Khurmochaz",
        "description": "Sunrise over Lake Sarez (3,200 m), then a 45–50 minute motorboat ride to the Usoy Dam, monitored by the Emergencies Committee. After lunch, about 2 hours across the rocky dam and down to the 'Choykhona' (teahouse) on the Murgab River.",
        "overnight": "Tent camp (2,800 m)"
      },
      {
        "day": 10,
        "title": "Khurmochaz – Barchidiv · 11 km",
        "description": "A rocky walk along the Bartang River to Barchidiv, one of the most remote villages of the valley.",
        "overnight": "Homestay in Barchidiv (2,600 m)"
      },
      {
        "day": 11,
        "title": "Barchidiv – Rushan · 145 km",
        "description": "Drive down the Bartang Valley to Rushan.",
        "overnight": "Homestay in Rushan (2,000 m)"
      },
      {
        "day": 12,
        "title": "Rushan – Kalai Khumb · 177 km",
        "description": "6–7 hours along the Panj River.",
        "overnight": "Guesthouse in Kalai Khumb (1,200 m)"
      },
      {
        "day": 13,
        "title": "Kalai Khumb – Dushanbe · 380 km",
        "description": "About 7 hours back to the capital.",
        "overnight": "Guesthouse in Dushanbe"
      },
      {
        "day": 14,
        "title": "Dushanbe city tour",
        "description": "Rudaki Central Park, the Somoni Monument and an evening walk through the city.",
        "overnight": "Guesthouse in Dushanbe"
      },
      {
        "day": 15,
        "title": "Departure",
        "description": "Transfer to the airport and flight home.",
        "overnight": ""
      }
    ],
    "included": [
      "4x4 Toyota Land Cruiser transfers with driver",
      "Full board with soft drinks and bottled water",
      "All accommodation",
      "Local English-speaking guide",
      "Food on the trek, donkeys with handlers, gas for cooking",
      "GBAO permit, Sarez permit and registration"
    ],
    "excluded": [
      "International flights",
      "National Park permit",
      "Museum and site entrance fees",
      "Alcohol and personal expenses"
    ],
    "gear": [],
    "faq": [
      {
        "question": "How much does this tour cost?",
        "answer": "From USD 1,950 per person (6 travellers + tour leader); USD 1,950–2,290 depending on group size. The final quote depends on your dates and group size."
      },
      {
        "question": "Who is this trip for?",
        "answer": "For fit hikers: 5–7 hours a day at 3,800–4,500 m, river crossings and rough trails."
      },
      {
        "question": "Where do we stay?",
        "answer": "Guesthouses and homestays in the valleys, 6 nights in tents on the trek."
      }
    ],
    "destinations": [
      "khorog",
      "bartang",
      "sarez"
    ]
  },
  {
    "slug": "pamir-lakes-traverse",
    "title": "Grand Pamir Lakes Traverse: Sarez to Zaroshkul",
    "category": "trekking",
    "price": 1905,
    "days": 23,
    "distance": "",
    "maxAltitude": "4,840 m (Shtik Lazar Pass)",
    "difficulty": "Hard expedition trek",
    "season": "",
    "groupSize": "Up to 14 + tour leader",
    "hook": "A 23-day traverse through the heart of the Pamirs: Lake Sarez by boat, the Langar and Uchkul lakes, the golden Zaroshkul and the 4,840 m Shtik Lazar Pass, higher than any summit in the Alps.",
    "overview": "The Pamirs hold the world's longest glacier outside the polar regions, the 77 km Fedchenko, and three peaks over 7,000 m, yet they remain among the least visited of Asia's great ranges. This hard expedition traverses the heart of the range: stay in Pamiri homes, camp beside shimmering alpine lakes and near centuries-old caravanserais, cross Lake Sarez by boat, visit the shepherd Zaurbek's high camp, rest in Bachor, then trek north past Tsakhinkul and Zaroshkul, the 'golden lake' with its hanging glacier, and cross the 4,840 m Shtik Lazar Pass with views of Peak Revolution (6,940 m) before descending the Bardara Valley.",
    "blurb": "A 23-day traverse through the heart of the Pamirs: Lake Sarez by boat, the Langar and Uchkul lakes, the golden Zaroshkul and the 4,840 m Shtik Lazar Pass, higher than any summit in the Alps.",
    "route": "Bartang · Sarez · Langar · Bachor · Zaroshkul · Bardara",
    "badge": "23 days · Expedition trek",
    "level": "Strenuous",
    "levelTone": "alert",
    "gallery": [
      {
        "src": "/photos/places/sarez/02.jpg",
        "alt": "Grand Pamir Lakes Traverse: Sarez to Zaroshkul, photograph 1"
      },
      {
        "src": "/photos/tours/mountain-lakes-trekking/05.jpg",
        "alt": "Grand Pamir Lakes Traverse: Sarez to Zaroshkul, photograph 2"
      },
      {
        "src": "/photos/places/sarez/03.jpg",
        "alt": "Grand Pamir Lakes Traverse: Sarez to Zaroshkul, photograph 3"
      },
      {
        "src": "/photos/tours/pamir-trail-section-8-9/01.jpg",
        "alt": "Grand Pamir Lakes Traverse: Sarez to Zaroshkul, photograph 4"
      },
      {
        "src": "/photos/tours/mountain-lakes-trekking/06.jpg",
        "alt": "Grand Pamir Lakes Traverse: Sarez to Zaroshkul, photograph 5"
      },
      {
        "src": "/photos/places/sarez/04.jpg",
        "alt": "Grand Pamir Lakes Traverse: Sarez to Zaroshkul, photograph 6"
      }
    ],
    "regions": [
      "sarez"
    ],
    "activities": [
      "trekking",
      "lakes"
    ],
    "winter": false,
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Dushanbe",
        "description": "Early-morning arrival and a few hours' rest at the hotel. In the afternoon, explore Dushanbe and do last shopping at the bazaar.",
        "overnight": "Hotel in Dushanbe"
      },
      {
        "day": 2,
        "title": "Dushanbe",
        "description": "A free day in Dushanbe to rest and prepare.",
        "overnight": "Hotel in Dushanbe"
      },
      {
        "day": 3,
        "title": "Dushanbe – Kalai Khumb (1,550 m) · 7–8 h",
        "description": "Onto the Pamir Highway. After the good first stretch, 'highway' mostly refers to the altitude: the road follows the roaring Panj along the Afghan border, past mountain walls and over steep slopes.",
        "overnight": "Guesthouse in Kalai Khumb"
      },
      {
        "day": 4,
        "title": "Kalai Khumb – Barchidiv (2,610 m) · 8 h",
        "description": "One of the most beautiful drives in Central Asia: along the Pamir Highway, then into the remote Bartang Valley, with friendly villages under glaciated peaks.",
        "overnight": "Homestay in Barchidiv"
      },
      {
        "day": 5,
        "title": "Trek 1 · Barchidiv – Khurmochaz (2,785 m) · 13 km",
        "description": "Meet the local crew and load the donkeys. Follow the Murgab River, born in the Afghan Wakhan, among six-thousand-metre peaks. An easy first day to adjust; camp past the 'Tea House', a shepherds' shelter under a huge boulder. About 5 hours, +550 m / −375 m.",
        "overnight": "Tent camp"
      },
      {
        "day": 6,
        "title": "Trek 2 · Khurmochaz – Lake Sarez (3,300 m) · 8 km",
        "description": "Climb to the top of the natural dam created by a giant landslide over a century ago, with sapphire-blue Lake Sarez behind it. Camp by the guard post that watches for earthquakes. 5–6 hours, +800 m / −225 m.",
        "overnight": "Tent camp"
      },
      {
        "day": 7,
        "title": "Trek 3 · Lake Sarez – Langar Valley (3,545 m) · 13 km",
        "description": "With a special permit, cross Lake Sarez by boat (0.5–1.5 h) to the weather station. Then up the wide, U-shaped Langar Valley through one of the last original forests of the Pamirs, a river ford and scree slopes to camp by the Safedxats glacier stream. 5–5.5 hours, +550 m.",
        "overnight": "Tent camp"
      },
      {
        "day": 8,
        "title": "Trek 4 · Langar Valley – Zaurbek camp – Uchkul (4,260 m)",
        "description": "An early start to ford the river at low water. Climb to the large high camp of the legendary shepherd Zaurbek for a rare look at shepherd life at altitude, then continue to camp north of the second Uchkul lake. About 9.5 km plus 5 km, +700 m.",
        "overnight": "Tent camp"
      },
      {
        "day": 9,
        "title": "Trek 5 · Uchkul – Chapdarkul – Qarghizshabar (4,250 m) · 18 km",
        "description": "Past the fork to the Langar Pass (4,630 m) to the dramatic Chapdarkul lake (4,530 m) for lunch on the shore, then down to a high meadow. 7–8 hours.",
        "overnight": "Tent camp"
      },
      {
        "day": 10,
        "title": "Trek 6 · Qarghizshabar – Bughromolbun · 15 km",
        "description": "Along a classic glacier-carved valley of summer pastures (aylaqs) where shepherds graze large herds of fat-tailed sheep and goats, down towards the Ghund River. 4–6 hours.",
        "overnight": "Tent camp"
      },
      {
        "day": 11,
        "title": "Trek 7 · Bughromolbun – Bachor · 20 km",
        "description": "An easy walk along the Ghund River, partly through what locals call a forest, back to Bachor village.",
        "overnight": "Homestay in Bachor (3,320 m)"
      },
      {
        "day": 12,
        "title": "Rest day in Bachor",
        "description": "Rest, walk around the village and get to know the daily life, traditions and culture of the Pamiri people.",
        "overnight": "Homestay in Bachor"
      },
      {
        "day": 13,
        "title": "Trek 8 · Bachor – Kavk · 17.5 km",
        "description": "Load the donkeys and head north into the deserted, rugged Pamirs to camp near Kavk, surrounded by 5,000 m peaks. 7–8 hours, +520 m.",
        "overnight": "Tent camp (about 3,700 m)"
      },
      {
        "day": 14,
        "title": "Trek 9 · Kavk – Tsakhinkul (4,310 m) · 11 km",
        "description": "As far from civilisation as it gets: a hearty breakfast, then six hours up to Lake Tsakhin with snow-capped views. +600 m.",
        "overnight": "Tent camp"
      },
      {
        "day": 15,
        "title": "Trek 10 · Tsakhinkul – Zaroshkul · 10 km",
        "description": "Over old moraines, either via the Tsakhin Pass (4,520 m) with pack animals or along the rocky stream, to Zaroshkul, the 'golden lake' with its hanging glacier and one of the most photogenic lakes in Central Asia. It gets very cold after sunset. 4–5 hours.",
        "overnight": "Tent camp"
      },
      {
        "day": 16,
        "title": "Trek 11 · Zaroshkul – Shtik Lazar Pass (4,840 m) – Shosh · 13 km",
        "description": "The highest point of the trek: a tough climb to the glaciated pass over rocky moraine, with views of Peak Revolution (6,940 m), then a 1,100 m descent to the junction with the Bardara Valley. About 7 hours.",
        "overnight": "Tent camp at Shosh (3,720 m)"
      },
      {
        "day": 17,
        "title": "Trek 12 · Shosh – Ilga pasture · 10 km",
        "description": "Down the warmer Bardara Valley to Gulzor for lunch, then on to the Ilga summer pasture. About 6 hours.",
        "overnight": "Tent camp (3,520 m)"
      },
      {
        "day": 18,
        "title": "Trek 13 · Ilga – Bardara · 18 km",
        "description": "A long but easy descent as trees return and the valley becomes cultivated, through a small gorge to Bardara, one of the most beautiful villages of the Pamirs. Carry plenty of water. 6–7 hours.",
        "overnight": "Homestay in Bardara (2,850 m)"
      },
      {
        "day": 19,
        "title": "Free day in Bardara",
        "description": "Eat, sleep and explore Pamiri village life at a very slow pace.",
        "overnight": "Homestay in Bardara"
      },
      {
        "day": 20,
        "title": "Bardara – Kalai Khumb · 6–8 h",
        "description": "The drivers pick you up for the drive down the Bartang Valley and along the Panj to Kalai Khumb.",
        "overnight": "Guesthouse in Kalai Khumb"
      },
      {
        "day": 21,
        "title": "Kalai Khumb – Dushanbe · 8 h",
        "description": "An early start to reach Dushanbe for the afternoon and a farewell dinner at a restaurant.",
        "overnight": "Hotel in Dushanbe"
      },
      {
        "day": 22,
        "title": "Spare day in Dushanbe",
        "description": "A buffer day to relax and recover, or to absorb weather delays on the trek.",
        "overnight": "Hotel in Dushanbe"
      },
      {
        "day": 23,
        "title": "Departure",
        "description": "Transfer to the airport and flight home.",
        "overnight": ""
      }
    ],
    "included": [
      "4x4 Toyota Land Cruiser transfers with driver",
      "All accommodation and all meals with soft drinks and water",
      "Local English-speaking guide",
      "Donkeys with handlers, gas for cooking, dining tent",
      "Boat across Lake Sarez with fuel",
      "GBAO permit, registration and hotel transfers"
    ],
    "excluded": [
      "International flights",
      "National Park permit",
      "Museum and site entrance fees",
      "Alcohol and personal expenses"
    ],
    "gear": [],
    "faq": [
      {
        "question": "How much does this tour cost?",
        "answer": "From USD 1,905 per person (7 travellers + tour leader); USD 1,905–2,120 depending on group size. The final quote depends on your dates and group size."
      },
      {
        "question": "Who is this trip for?",
        "answer": "For experienced trekkers: long days above 4,000 m, river fords, moraine and a glaciated 4,840 m pass."
      },
      {
        "question": "Where do we stay?",
        "answer": "Hotels in Dushanbe, homestays in the villages and about 12 nights in tents."
      }
    ],
    "destinations": [
      "bartang",
      "sarez",
      "khorog"
    ]
  },
  {
    "slug": "pamir-walks-cultural",
    "title": "Pamir Walks: Bartang Valley Cultural Tour",
    "category": "trekking",
    "price": 1480,
    "days": 14,
    "distance": "",
    "maxAltitude": "3,000 m (Roshorv)",
    "difficulty": "Easy to moderate",
    "season": "May – October",
    "groupSize": "1–15 travellers",
    "hook": "A 14-day cultural journey with easy village walks: Hissar Fortress, the Panj along the Afghan border, and the Bartang villages of Bardara, Roshorv, Savnob, Pasor, Barchidiv, Ravmed and Jizew.",
    "overview": "Get to know the history, archaeology and living culture of the Pamirs. The tour follows the Oxus along the Tajik-Afghan border, then spends a week walking and driving between the remote villages of the Bartang Valley: Bardara with its three sacred trees said to be planted by Nosir Khusraw, Roshorv under the Lapnazar Glacier, Savnob with its old castle, solar calendar and refuge caves, Pasor and the mausoleum of Khojai Alamdor, Barchidiv at the gateway to Lake Sarez, Ravmed and the car-free lake village of Jizew. Walks of 3–6 hours a day, with vehicles always on hand for anyone who prefers to ride.",
    "blurb": "A 14-day cultural journey with easy village walks: Hissar Fortress, the Panj along the Afghan border, and the Bartang villages of Bardara, Roshorv, Savnob, Pasor, Barchidiv, Ravmed and Jizew.",
    "route": "Dushanbe · Bartang Valley · Jizew · Khorog",
    "badge": "14 days · Culture & walks",
    "level": "Moderate",
    "levelTone": "leaf",
    "gallery": [
      {
        "src": "/photos/places/bartang/01.jpg",
        "alt": "Pamir Walks: Bartang Valley Cultural Tour, photograph 1"
      },
      {
        "src": "/photos/places/bartang/03.jpg",
        "alt": "Pamir Walks: Bartang Valley Cultural Tour, photograph 2"
      },
      {
        "src": "/photos/places/bartang/04.jpg",
        "alt": "Pamir Walks: Bartang Valley Cultural Tour, photograph 3"
      },
      {
        "src": "/photos/places/bartang/05.jpg",
        "alt": "Pamir Walks: Bartang Valley Cultural Tour, photograph 4"
      },
      {
        "src": "/photos/places/khorog/01.jpg",
        "alt": "Pamir Walks: Bartang Valley Cultural Tour, photograph 5"
      },
      {
        "src": "/photos/places/hissor/01.jpg",
        "alt": "Pamir Walks: Bartang Valley Cultural Tour, photograph 6"
      }
    ],
    "regions": [
      "sarez"
    ],
    "activities": [
      "trekking",
      "4x4"
    ],
    "winter": false,
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Dushanbe",
        "description": "Airport meeting and transfer to the hotel. Excursion to the Hissar Fortress, the Kohna Madrasah museum and the nearby seminary, then Rudaki Central Park, Independence Park and Mehrgon Bazaar. Dinner at a local restaurant and an evening walk.",
        "overnight": "Hotel in Dushanbe"
      },
      {
        "day": 2,
        "title": "Dushanbe – Kalai Khumb · 371 km, 6–7 h",
        "description": "Onto the Pamir Highway, which soon runs along the roaring Panj and the Afghan border, past mountain walls and over steep slopes.",
        "overnight": "Guesthouse in Kalai Khumb"
      },
      {
        "day": 3,
        "title": "Kalai Khumb – Rushan · 177 km, 5–6 h",
        "description": "One of the most beautiful drives in Central Asia, winding along the Pamir Highway through mountain landscapes.",
        "overnight": "Homestay in Rushan"
      },
      {
        "day": 4,
        "title": "Rushan – Bardara · 90 km",
        "description": "Up the Bartang River, famous for its hiking, hospitable villages and musicians, to Bardara, one of the oldest settlements of the valley. See its three sacred trees, 500 m apart, said to be planted by the missionary Nosir Khusraw, and the village shrine.",
        "overnight": "Homestay in Bardara"
      },
      {
        "day": 5,
        "title": "Upper Bardara walk · 5 h",
        "description": "Hike to Old (Upper) Bardara past the ice that never melts under large boulders, used by villagers as a natural fridge. A picnic by the Bardara River after 2.5 hours, then back down to the village.",
        "overnight": "Homestay in Bardara"
      },
      {
        "day": 6,
        "title": "Bardara – Roshorv · 51 km",
        "description": "Along the Bartang to Roshorv (3,000 m), one of the largest villages of the valley, facing Lapnazar (5,990 m) and Bartang (5,480 m) peaks. After lunch, a hike to the viewpoint over the Lapnazar Glacier and the whole village.",
        "overnight": "Homestay in Roshorv"
      },
      {
        "day": 7,
        "title": "Roshorv – Savnob · 25 km walk",
        "description": "About 5 hours on a scenic dirt road to Savnob, with vehicles alongside for anyone who prefers to ride. Savnob is known for its old castle, solar calendar, refuge caves, holy spring and petroglyphs, and a small lake mild enough for a swim.",
        "overnight": "Homestay in Savnob"
      },
      {
        "day": 8,
        "title": "Savnob – Pasor · 30 km",
        "description": "Walk and drive along the Bartang past the confluence of the Tanimas and Murgab rivers to Pasor, home of the revered mausoleum of Khojai Alamdor. The outline of the ancient landslide that once dammed a lake here is still visible.",
        "overnight": "Homestay in Pasor"
      },
      {
        "day": 9,
        "title": "Pasor – Rukhch – Barchidiv · 55 km",
        "description": "Back down to Rukhch, then on foot to Barchidiv, the first village below the legendary Lake Sarez (18 km away, special permit required) and a base for trekking, mountaineering and wildlife watching.",
        "overnight": "Homestay in Barchidiv"
      },
      {
        "day": 10,
        "title": "Barchidiv – Ravmed · 100 km",
        "description": "Drive down the Bartang Valley to Khijez, then a detour hike up to the village of Ravmed.",
        "overnight": "Homestay in Ravmed"
      },
      {
        "day": 11,
        "title": "Ravmed – Jizew – Khorog · 120 km",
        "description": "A spectacular 3-hour hike to the remote, car-free village of Jizew with its clear lakes, short walks to the higher lakes and lunch, then back to the road and on to Khorog with photo stops.",
        "overnight": "Hotel in Khorog"
      },
      {
        "day": 12,
        "title": "Khorog – Kalai Khumb · 240 km",
        "description": "Explore Khorog, the centre of the Pamirs at the meeting of the Panj and Ghund rivers: the Ethnographic Museum and the Botanical Garden. After lunch, along the Pamir Highway to Kalai Khumb.",
        "overnight": "Guesthouse in Kalai Khumb"
      },
      {
        "day": 13,
        "title": "Kalai Khumb – Dushanbe · 371 km, 7 h",
        "description": "Along the Panj, then through deep rocky valleys over the Shurobod Pass to Kulob, with lunch at a chaikhana, and on to Dushanbe.",
        "overnight": "Hotel in Dushanbe"
      },
      {
        "day": 14,
        "title": "Departure",
        "description": "Transfer to the airport and flight home.",
        "overnight": ""
      }
    ],
    "included": [
      "4x4 Toyota Land Cruiser with driver",
      "All accommodation and all meals with soft drinks and water",
      "Local English-speaking guide",
      "GBAO permit, registration and hotel transfers"
    ],
    "excluded": [
      "International flights",
      "National Park permit",
      "Museum and site entrance fees",
      "Alcohol and personal expenses"
    ],
    "gear": [],
    "faq": [
      {
        "question": "How much does this tour cost?",
        "answer": "From USD 1,480 per person (9 travellers + tour leader); USD 1,480–1,970 depending on group size, USD 1,725 for two. The final quote depends on your dates and group size."
      },
      {
        "question": "Who is this trip for?",
        "answer": "Suitable for most active travellers: easy to moderate walks of 3–6 hours, with a vehicle always nearby."
      },
      {
        "question": "Where do we stay?",
        "answer": "Hotels in Dushanbe and Khorog, family homestays in the Bartang villages."
      }
    ],
    "destinations": [
      "hissor",
      "bartang",
      "khorog"
    ]
  },
  {
    "slug": "snow-leopard-tour",
    "title": "Snow Leopard Expedition in the Pamirs",
    "category": "trekking",
    "price": null,
    "days": 11,
    "distance": "",
    "maxAltitude": "2,940 m (Ravmed)",
    "difficulty": "Moderate · winter conditions",
    "season": "15 January – 15 March",
    "groupSize": "Up to 10 travellers",
    "hook": "An 11-day winter expedition with a local tracker in search of the snow leopard, the 'ghost of the mountains', plus markhor in Zighar and ibex in the community conservancies of Jizew and Ravmed.",
    "overview": "Follow a knowledgeable local tracker through the winter Pamirs in search of the snow leopard, one of the world's most elusive cats, often seen by villagers in winter. Watch for markhor in the Zighar conservancy on the Afghan border, then spend several days in the snow leopard territory of Jizew and Ravmed in the Bartang Valley. Ravmed is home to the first community-based conservancy, founded in 2009 by local hunters, where ibex and snow leopard numbers have grown since. Wildlife is never guaranteed: snow leopards live at low densities across vast mountain ranges, which makes every sighting special.",
    "blurb": "An 11-day winter expedition with a local tracker in search of the snow leopard, the 'ghost of the mountains', plus markhor in Zighar and ibex in the community conservancies of Jizew and Ravmed.",
    "route": "Dushanbe · Zighar · Jizew · Ravmed · Bartang",
    "badge": "11 days · Winter wildlife",
    "level": "Specialist",
    "levelTone": "earth",
    "gallery": [
      {
        "src": "/photos/tours/snow-leopard-tour/01.jpg",
        "alt": "Snow Leopard Expedition in the Pamirs, photograph 1"
      },
      {
        "src": "/photos/tours/snow-leopard-tour/02.jpg",
        "alt": "Snow Leopard Expedition in the Pamirs, photograph 2"
      },
      {
        "src": "/photos/places/bartang/06.jpg",
        "alt": "Snow Leopard Expedition in the Pamirs, photograph 3"
      }
    ],
    "regions": [
      "sarez"
    ],
    "activities": [
      "wildlife",
      "trekking"
    ],
    "winter": true,
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Dushanbe (750 m)",
        "description": "Airport welcome and time to rest. After breakfast, the Museum of Antiquities; after lunch, Hissar, 30 km west, with the 18th-century fortress, two madrasahs and a 16th-century mausoleum.",
        "overnight": "Hotel in Dushanbe"
      },
      {
        "day": 2,
        "title": "Dushanbe – Zighar (1,200 m)",
        "description": "Lunch at a traditional restaurant in Kulob, then along the Panj towards the Pamirs with a close view of Afghan village life. Rest and acclimatise on arrival.",
        "overnight": "Guesthouse in Zighar"
      },
      {
        "day": 3,
        "title": "Zighar markhor conservancy",
        "description": "The conservancies between Kulob and Kalai Khumb are famous for markhor, and Zighar on the Afghan border is one of the most accessible places in the world to see them in the wild, though the hiking routes are demanding.",
        "overnight": "Guesthouse in Zighar"
      },
      {
        "day": 4,
        "title": "Zighar – Rushan (2,000 m)",
        "description": "A scenic drive along the Panj River and the Afghan border.",
        "overnight": "Homestay in Rushan"
      },
      {
        "day": 5,
        "title": "Rushan – Jizew (2,740 m)",
        "description": "5 km along the Pamir Highway, then into the Bartang Valley to the Jizew bridge. Cross the wooden bridge and walk to Jizew, an eco-village of about 12 houses with no road or power lines, small lakes, birds and groves.",
        "overnight": "Homestay in Jizew"
      },
      {
        "day": 6,
        "title": "Jizew valley tracking",
        "description": "An early walk deeper into the valley, snow leopard territory, also home to wolves, ibex, foxes, eagles and many birds.",
        "overnight": "Homestay in Jizew"
      },
      {
        "day": 7,
        "title": "Jizew – Ravmed Gorge",
        "description": "Back to the bridge and up the Bartang to Khijez, gateway to the Ravmeddara Gorge, and on to remote Ravmed, the most popular base for snow leopard trips.",
        "overnight": "Guesthouse in Ravmed"
      },
      {
        "day": 8,
        "title": "Ravmed community conservancy (2,940 m)",
        "description": "The first community-based conservancy was founded here in 2009 by traditional hunters; ibex and snow leopard numbers have grown since. Wildlife watching with the conservancy, traditional Pamiri houses, the village museum, petroglyphs and an ancient water mill.",
        "overnight": "Guesthouse in Ravmed"
      },
      {
        "day": 9,
        "title": "Ravmed – Darzhomch (2,457 m)",
        "description": "18 km back to the main Bartang road. In Darzhomch, see how the famous Pamiri socks are knitted and buy a pair as a souvenir.",
        "overnight": "Homestay in Darzhomch"
      },
      {
        "day": 10,
        "title": "Darzhomch – Kalai Khumb (1,200 m)",
        "description": "A scenic drive out of the Bartang Valley to Kalai Khumb.",
        "overnight": "Guesthouse in Kalai Khumb"
      },
      {
        "day": 11,
        "title": "Kalai Khumb – Dushanbe",
        "description": "Along the Panj and over the Shurobod Pass to Kulob for lunch at a chaikhana, a stop at the 11th-century Hulbuk Fortress and a distant view of the Nurek hydropower station. Flight home the next day.",
        "overnight": "Hotel in Dushanbe"
      }
    ],
    "included": [
      "4x4 Toyota Land Cruiser with driver",
      "Full board with soft drinks and bottled water",
      "All accommodation",
      "Local English-speaking guide and snow leopard tracker",
      "GBAO permit and registration"
    ],
    "excluded": [
      "International flights",
      "National Park permit",
      "Museum and site entrance fees",
      "Alcohol and personal expenses"
    ],
    "gear": [
      "Warm insulated clothing and base layers",
      "Insulated winter boots",
      "Mid and outer layers",
      "Binoculars or a spotting scope and a camera with a long lens"
    ],
    "faq": [
      {
        "question": "How much does this tour cost?",
        "answer": "From EUR 1,165 per person (3 travellers + tour leader); EUR 1,165–1,370 depending on group size. Season 15 January – 15 March. The final quote depends on your dates and group size."
      },
      {
        "question": "Who is this trip for?",
        "answer": "For wildlife lovers comfortable with cold, early starts and walks in snow. Sightings are never guaranteed."
      },
      {
        "question": "Where do we stay?",
        "answer": "Hotel in Dushanbe, village guesthouses and homestays."
      }
    ],
    "destinations": [
      "hissor",
      "bartang"
    ]
  },
  {
    "slug": "high-pamirs-motorcycle",
    "title": "Ride the Roof of the World: Pamir & Bartang Motorcycle Expedition",
    "category": "driving",
    "price": null,
    "days": 14,
    "distance": "about 2,000 km",
    "maxAltitude": "4,655 m (Ak-Baital Pass)",
    "difficulty": "Advanced / expedition · Grade 4/5",
    "season": "May – September (conditions permitting)",
    "groupSize": "Small group or private",
    "hook": "A 14-day motorcycle expedition with our partner Pamir Moto Adventure: Wakhi villages and Silk Road forts, the Eastern Pamir plateau, Karakul and the raw tracks of the Bartang Valley.",
    "overview": "The definitive Pamir adventure for riders who want more than a highway tour. From warm Wakhi villages and ancient Silk Road landmarks to the austere Eastern Pamir plateau and the raw tracks of the Bartang Valley, the journey builds steadily from Dushanbe into the high country, then leaves the familiar road for some of Tajikistan's most memorable remote riding. The motorcycles, ride leader and mechanic come from our partner Pamir Moto Adventure (pamirmoto.com), a Tajik motorcycle and 4x4 rental team with Honda CRF300L dual-sport bikes; Pamir Ecotourism looks after the homestays, permits and local logistics. Route: Dushanbe – Wakhan – Murghab – Karakul – Bartang – Dushanbe.",
    "blurb": "A 14-day motorcycle expedition with our partner Pamir Moto Adventure: Wakhi villages and Silk Road forts, the Eastern Pamir plateau, Karakul and the raw tracks of the Bartang Valley.",
    "route": "Dushanbe · Wakhan · Murghab · Karakul · Bartang",
    "badge": "14 days · Motorcycle expedition",
    "level": "Strenuous",
    "levelTone": "alert",
    "gallery": [
      {
        "src": "/photos/tours/high-pamirs-motorcycle/01.jpg",
        "alt": "Ride the Roof of the World: Pamir & Bartang Motorcycle Expedition, photograph 1"
      },
      {
        "src": "/photos/tours/high-pamirs-motorcycle/02.jpg",
        "alt": "Ride the Roof of the World: Pamir & Bartang Motorcycle Expedition, photograph 2"
      },
      {
        "src": "/photos/tours/high-pamirs-motorcycle/03.jpg",
        "alt": "Ride the Roof of the World: Pamir & Bartang Motorcycle Expedition, photograph 3"
      },
      {
        "src": "/photos/tours/high-pamirs-motorcycle/04.jpg",
        "alt": "Ride the Roof of the World: Pamir & Bartang Motorcycle Expedition, photograph 4"
      },
      {
        "src": "/photos/tours/high-pamirs-motorcycle/05.jpg",
        "alt": "Ride the Roof of the World: Pamir & Bartang Motorcycle Expedition, photograph 5"
      },
      {
        "src": "/photos/tours/high-pamirs-motorcycle/06.jpg",
        "alt": "Ride the Roof of the World: Pamir & Bartang Motorcycle Expedition, photograph 6"
      }
    ],
    "regions": [
      "pamir-highway",
      "wakhan",
      "sarez"
    ],
    "activities": [
      "4x4"
    ],
    "winter": false,
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Dushanbe",
        "description": "No riding. Meet the expedition crew, review documents, fit riding equipment, allocate motorcycles and brief on road conditions, altitude and safety.",
        "overnight": "Dushanbe hotel"
      },
      {
        "day": 2,
        "title": "Dushanbe – Qala-i Husayn · about 205 km",
        "description": "Collect the motorcycles and head for the eastern foothills. The road tightens into rugged valleys; a stop by a mountain lake may be possible.",
        "overnight": "Local guesthouse / homestay"
      },
      {
        "day": 3,
        "title": "Qala-i Husayn – Qalai-Khumb · 85–120 km",
        "description": "The Khaburabot crossing, when open: sweeping views and rough, exposed mountain tracks into Gorno-Badakhshan and down to the Panj. If the pass is closed, the team uses the longer southern road.",
        "overnight": "Qalai-Khumb guesthouse"
      },
      {
        "day": 4,
        "title": "Qalai-Khumb – Khorog · 240–250 km",
        "description": "The twisting Panj canyon with Afghanistan across the water, landslide-scarred slopes, small villages and changing road surfaces.",
        "overnight": "Khorog hotel / guesthouse"
      },
      {
        "day": 5,
        "title": "Khorog – Ishkashim – Yamchun · 200–220 km",
        "description": "Into the Wakhan Valley beneath the Hindu Kush. Yamchun Fortress and, time permitting, the warm waters of Bibi Fatima, then a Wakhi family homestay.",
        "overnight": "Yamchun homestay"
      },
      {
        "day": 6,
        "title": "Yamchun – Langar · 40–80 km",
        "description": "A short stage for Wakhan history: traditional villages, shrines, museums or petroglyphs where accessible.",
        "overnight": "Langar homestay"
      },
      {
        "day": 7,
        "title": "Langar – Khargush – Jartegumbaz · about 150 km",
        "description": "Wide valleys, exposed passes and high-altitude tracks towards the Zorkul area, subject to reserve permissions and a passable route. Remote hot springs.",
        "overnight": "Basic highland shelter / hunting camp"
      },
      {
        "day": 8,
        "title": "Jartegumbaz – Murghab · 100–165 km",
        "description": "Across the stark Aksu wilderness: sand, gravel, yak herds and Kyrgyz summer pastures, to the high-plateau town of Murghab.",
        "overnight": "Murghab guesthouse"
      },
      {
        "day": 9,
        "title": "Murghab – Ak-Baital Pass – Karakul · about 135 km",
        "description": "North on the M41 over Ak-Baital (about 4,655 m) and down to the deep-blue Lake Karakul at a calm, measured pace.",
        "overnight": "Karakul homestay"
      },
      {
        "day": 10,
        "title": "Karakul – Jalang · about 80 km",
        "description": "Off the main road into open wilderness: loose gravel, rugged tracks and possible stream crossings.",
        "overnight": "Basic yurt / local shelter"
      },
      {
        "day": 11,
        "title": "Jalang – Kök-Jar – Savnob · 70–90 km",
        "description": "The defining technical stage: the rocky Kök-Jar descent into the Bartang gorge, only if local reconnaissance confirms it is safe. Finish in the green oasis of Savnob.",
        "overnight": "Savnob homestay"
      },
      {
        "day": 12,
        "title": "Savnob – Rushan · 135–150 km",
        "description": "West along the Bartang past vertical rock walls, river crossings and small villages; slow and technical in places.",
        "overnight": "Rushan guesthouse / homestay"
      },
      {
        "day": 13,
        "title": "Rushan – Qalai-Khumb · 175–190 km",
        "description": "Back along the Panj: breathing space after the Bartang days, though roadworks, traffic and weather can slow progress.",
        "overnight": "Qalai-Khumb homestay"
      },
      {
        "day": 14,
        "title": "Qalai-Khumb – Dushanbe · 320–370 km",
        "description": "Normally via the southern Kulob road. Return the motorcycles, debrief and celebrate. Book departure flights after the tour.",
        "overnight": "Tour ends in Dushanbe"
      }
    ],
    "included": [
      "Honda CRF300L-class dual-sport motorcycle from Pamir Moto Adventure",
      "Qualified ride leader",
      "Mechanic and support 4x4",
      "Hotels, Pamiri homestays and one highland shelter",
      "GBAO permit assistance"
    ],
    "excluded": [
      "International flights",
      "Travel and medical insurance",
      "Fuel, meals and transfers unless stated in your quotation",
      "Zorkul reserve entry, arranged separately"
    ],
    "gear": [],
    "faq": [
      {
        "question": "How much does this tour cost?",
        "answer": "Personalised quotation after your dates and group size are known: motorcycles, leader, support, accommodation, permits, fuel, meals and deposits are listed in writing. The final quote depends on your dates and group size."
      },
      {
        "question": "Who is this trip for?",
        "answer": "For confident off-road riders who want both Silk Road culture and a serious high-altitude challenge. The upper Bartang / Kök-Jar passage is a genuine expedition segment, not a guaranteed all-weather road; the leader can reroute via Murghab, Ghund and Khorog if it is closed. Flexible dates, reliable communications and an emergency plan are essential."
      },
      {
        "question": "Where do we stay?",
        "answer": "Hotels, Pamiri homestays and one basic highland shelter."
      },
      {
        "question": "Who provides the motorcycles?",
        "answer": "Our partner Pamir Moto Adventure (pamirmoto.com) provides the Honda CRF300L motorcycles, the ride leader and the mechanic. You can see the bikes, rental terms and their other motorcycle tours on pamirmoto.com."
      }
    ],
    "destinations": [
      "khorog",
      "wakhan-ishkashim",
      "murgab",
      "karakul",
      "bartang"
    ]
  }
];
