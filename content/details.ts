// Per-destination guide content: attractions, best time, how to reach, nearby places.

export type Attraction = { name: string; description: string };
export type Nearby = { name: string; distance: string; coordinates: [number, number] };
export type Details = {
  attractions: Attraction[];
  /** 1–12 */
  bestMonths: number[];
  bestTimeNotes: string;
  monthNotes: Partial<Record<number, string>>;
  howToReach: { air: string; rail: string; road: string };
  nearby: Nearby[];
};

const IN_WINTER = { 1: "Cool, clear days", 2: "Pleasant and dry", 3: "Warming up", 10: "Post-monsoon, fresh", 11: "Mild and sunny", 12: "Cool mornings, foggy at times" };
const IN_HOT = { 4: "Hot", 5: "Very hot", 6: "Hot, monsoon arrives", 7: "Monsoon rains", 8: "Monsoon rains", 9: "Humid, rains easing" };
const DE_YEAR = {
  1: "Cold, short days", 2: "Cold, often grey", 3: "Early spring, chilly", 4: "Spring blossom", 5: "Mild and green",
  6: "Warm, long evenings", 7: "Peak summer", 8: "Warm, busy", 9: "Golden early autumn", 10: "Autumn colours",
  11: "Damp and grey", 12: "Christmas markets",
};

export const details: Record<string, Details> = {
  agra: {
    attractions: [
      { name: "Taj Mahal", description: "The white-marble mausoleum is best seen at sunrise, when crowds are thin and the stone turns pink." },
      { name: "Agra Fort", description: "A red sandstone fortress-palace where Shah Jahan spent his last years looking out at the Taj." },
      { name: "Mehtab Bagh", description: "Riverside Mughal garden directly across the Yamuna with an unobstructed sunset view of the Taj." },
      { name: "Itimad-ud-Daulah", description: "Nicknamed the 'Baby Taj', a jewel-box tomb of inlaid marble that predates its famous neighbour." },
    ],
    bestMonths: [10, 11, 12, 1, 2, 3],
    bestTimeNotes: "October to March brings mild days for walking between monuments. Summer regularly passes 40°C. The Taj is closed on Fridays.",
    monthNotes: { ...IN_WINTER, ...IN_HOT },
    howToReach: {
      air: "Agra's small airport has limited flights; most travellers fly into Delhi (IGI), about 3–4 hours away by road or rail.",
      rail: "The Gatimaan and Shatabdi Express run from Delhi to Agra Cantt in under 2 hours, the easiest way to arrive.",
      road: "The Yamuna Expressway links Delhi and Agra in about 3.5 hours; taxis and tour cars are easy to hire.",
    },
    nearby: [
      { name: "Fatehpur Sikri", distance: "40 km", coordinates: [77.6615, 27.0945] },
      { name: "Mathura", distance: "58 km", coordinates: [77.6737, 27.4924] },
      { name: "Keoladeo National Park", distance: "55 km", coordinates: [77.5222, 27.1592] },
    ],
  },
  jaipur: {
    attractions: [
      { name: "Amber Fort", description: "A hilltop palace of courtyards and mirrored halls above Maota Lake, reached by a steep ramp." },
      { name: "Hawa Mahal", description: "The five-storey 'Palace of Winds', with 953 small windows built for royal women to watch the street." },
      { name: "City Palace", description: "Still partly home to Jaipur's royal family, with museums of textiles, arms and painted gateways." },
      { name: "Jantar Mantar", description: "An 18th-century open-air observatory whose giant stone instruments still tell the time." },
    ],
    bestMonths: [10, 11, 12, 1, 2, 3],
    bestTimeNotes: "Winter is ideal for fort-hopping. January brings the Jaipur Literature Festival; spring brings colourful festivals like Holi.",
    monthNotes: { ...IN_WINTER, ...IN_HOT },
    howToReach: {
      air: "Jaipur International Airport has direct flights from most Indian cities and a few Gulf hubs.",
      rail: "Jaipur Junction is well connected; the Shatabdi from Delhi takes about 4.5 hours.",
      road: "Around 5 hours from Delhi and 4 hours from Agra via good highways, making it the third point of the Golden Triangle.",
    },
    nearby: [
      { name: "Nahargarh Fort", distance: "15 km", coordinates: [75.8155, 26.9373] },
      { name: "Sambhar Salt Lake", distance: "80 km", coordinates: [75.0821, 26.9581] },
      { name: "Pushkar", distance: "145 km", coordinates: [74.5511, 26.4897] },
    ],
  },
  delhi: {
    attractions: [
      { name: "Humayun's Tomb", description: "A 16th-century garden tomb that set the template for the Taj Mahal." },
      { name: "Red Fort", description: "The Mughal emperors' sandstone citadel, where India's Prime Minister speaks every Independence Day." },
      { name: "Qutub Minar", description: "A 73-metre victory tower begun in 1199, surrounded by the ruins of Delhi's first mosques." },
      { name: "Chandni Chowk", description: "Old Delhi's main bazaar, best explored on foot or by cycle-rickshaw with a street-food stop or two." },
    ],
    bestMonths: [10, 11, 2, 3],
    bestTimeNotes: "October–November and February–March are pleasant. December and January are cold with smog; May and June are scorching.",
    monthNotes: { ...IN_WINTER, ...IN_HOT, 12: "Cold, smog and fog possible", 1: "Coldest month, hazy" },
    howToReach: {
      air: "Indira Gandhi International Airport is India's busiest, with direct flights from Europe, including Frankfurt and Munich.",
      rail: "New Delhi, Old Delhi and Hazrat Nizamuddin stations connect to almost every part of India.",
      road: "The city's Metro is the easiest way around; app cabs and auto-rickshaws fill the gaps.",
    },
    nearby: [
      { name: "Agra", distance: "230 km", coordinates: [78.0421, 27.1751] },
      { name: "Sultanpur Bird Sanctuary", distance: "50 km", coordinates: [76.8913, 28.4632] },
      { name: "Neemrana Fort", distance: "120 km", coordinates: [76.3864, 27.9856] },
    ],
  },
  varanasi: {
    attractions: [
      { name: "Dashashwamedh Ghat", description: "The city's busiest ghat and stage for the nightly Ganga Aarti fire ceremony." },
      { name: "Sunrise boat ride", description: "Rowing past the ghats at dawn shows bathers, prayers and the burning ghats in soft light." },
      { name: "Kashi Vishwanath Temple", description: "Varanasi's holiest Shiva temple, now reached through a broad new corridor from the river." },
      { name: "Sarnath", description: "The deer park where the Buddha gave his first sermon, with a museum and the great Dhamek Stupa." },
    ],
    bestMonths: [10, 11, 12, 1, 2, 3],
    bestTimeNotes: "Cool winter mornings suit boat rides. Dev Deepawali in November lights every ghat with oil lamps.",
    monthNotes: { ...IN_WINTER, ...IN_HOT, 11: "Dev Deepawali festival" },
    howToReach: {
      air: "Lal Bahadur Shastri Airport has direct flights from Delhi, Mumbai and other major cities.",
      rail: "Varanasi Junction and the Vande Bharat express link the city to Delhi in about 8 hours.",
      road: "Road access is fine but traffic is heavy; inside the old city, walking is fastest.",
    },
    nearby: [
      { name: "Sarnath", distance: "10 km", coordinates: [83.0245, 25.3811] },
      { name: "Ramnagar Fort", distance: "14 km", coordinates: [83.0256, 25.2827] },
      { name: "Chunar Fort", distance: "40 km", coordinates: [82.8781, 25.1236] },
    ],
  },
  kerala: {
    attractions: [
      { name: "Alleppey backwaters", description: "An overnight houseboat cruise through canals, paddy fields and village jetties." },
      { name: "Munnar", description: "Rolling tea estates in the Western Ghats, cool enough for long walks." },
      { name: "Fort Kochi", description: "Chinese fishing nets, Dutch and Portuguese buildings, and a thriving art scene." },
      { name: "Periyar", description: "A wildlife reserve around a lake where elephants come down to drink." },
    ],
    bestMonths: [9, 10, 11, 12, 1, 2, 3],
    bestTimeNotes: "September to March is dry and comfortable. The monsoon (June–August) is lush and quiet, a popular time for Ayurveda.",
    monthNotes: { 1: "Dry and warm", 2: "Dry and warm", 3: "Getting humid", 4: "Hot and humid", 5: "Pre-monsoon showers", 6: "Monsoon", 7: "Monsoon", 8: "Monsoon, Onam festival", 9: "Rains easing", 10: "Green and fresh", 11: "Pleasant", 12: "Peak season" },
    howToReach: {
      air: "Kochi (COK) is the main gateway, with Thiruvananthapuram and Kozhikode as alternatives.",
      rail: "Trains run down the coast from Mumbai, Goa and Bengaluru to Ernakulam and Alappuzha.",
      road: "Hire a car with a driver for the hill roads to Munnar; buses link the main towns.",
    },
    nearby: [
      { name: "Kumarakom", distance: "35 km", coordinates: [76.4291, 9.6175] },
      { name: "Varkala", distance: "140 km", coordinates: [76.7163, 8.7379] },
      { name: "Thekkady", distance: "140 km", coordinates: [77.1603, 9.6031] },
    ],
  },
  goa: {
    attractions: [
      { name: "Palolem Beach", description: "A calm crescent bay in South Goa, good for swimming and kayaking." },
      { name: "Basilica of Bom Jesus", description: "A UNESCO-listed Baroque church in Old Goa holding the relics of St Francis Xavier." },
      { name: "Fontainhas", description: "Panaji's Latin Quarter of narrow lanes and pastel Portuguese-era houses." },
      { name: "Dudhsagar Falls", description: "A four-tiered waterfall on the Karnataka border, at its fullest just after the monsoon." },
    ],
    bestMonths: [11, 12, 1, 2, 3],
    bestTimeNotes: "November to March is sunny and dry. The monsoon brings rough seas, but green countryside and lower prices.",
    monthNotes: { 11: "Season opens", 12: "Busiest, festive", 1: "Sunny and dry", 2: "Sunny and dry", 3: "Warmer", 4: "Hot", 5: "Very hot", 6: "Monsoon", 7: "Monsoon", 8: "Monsoon", 9: "Rains easing", 10: "Quiet, green" },
    howToReach: {
      air: "Dabolim (GOI) and the newer Mopa (GOX) airports serve North and South Goa.",
      rail: "The Konkan Railway's Madgaon and Thivim stations connect to Mumbai and Kerala.",
      road: "Scooter rental is the local way to get around; taxis cover longer trips.",
    },
    nearby: [
      { name: "Gokarna", distance: "65 km", coordinates: [74.3188, 14.5479] },
      { name: "Dudhsagar Falls", distance: "60 km", coordinates: [74.3144, 15.3144] },
      { name: "Hampi", distance: "310 km", coordinates: [76.46, 15.335] },
    ],
  },
  "himachal-pradesh": {
    attractions: [
      { name: "Spiti Valley", description: "A high, cold desert of monasteries and mud-brick villages near the Tibetan border." },
      { name: "Manali", description: "A mountain town at the head of the Kullu Valley and the base for treks and the Atal Tunnel." },
      { name: "Shimla", description: "The old British summer capital, with a ridge-top promenade and a UNESCO toy train." },
      { name: "Dharamshala & McLeod Ganj", description: "Home of the Dalai Lama and the Tibetan government in exile." },
    ],
    bestMonths: [4, 5, 6, 9, 10],
    bestTimeNotes: "Spring and autumn are clear and mild. Spiti's roads usually open from June to October; winter brings snow to most passes.",
    monthNotes: { 1: "Snow, passes closed", 2: "Snow", 3: "Thawing", 4: "Spring", 5: "Pleasant", 6: "Spiti roads open", 7: "Monsoon landslide risk", 8: "Monsoon", 9: "Clear skies", 10: "Crisp autumn", 11: "Cold", 12: "Snowfall" },
    howToReach: {
      air: "Small airports at Bhuntar (Kullu), Kangra and Shimla; most visitors fly to Chandigarh.",
      rail: "The Kalka–Shimla narrow-gauge railway is a slow, scenic way in.",
      road: "Overnight Volvo buses run from Delhi to Manali and Dharamshala; mountain driving needs care.",
    },
    nearby: [
      { name: "Rohtang Pass", distance: "51 km from Manali", coordinates: [77.2497, 32.3717] },
      { name: "Key Monastery", distance: "12 km from Kaza", coordinates: [78.0115, 32.2978] },
      { name: "Kasol", distance: "75 km from Manali", coordinates: [77.315, 32.0099] },
    ],
  },
  berlin: {
    attractions: [
      { name: "Brandenburg Gate", description: "The neoclassical gate that once stood in the death strip and now symbolises reunification." },
      { name: "Reichstag dome", description: "A glass dome over the parliament with free (pre-booked) visits and wide city views." },
      { name: "Museum Island", description: "Five world-class museums on the Spree, including the Pergamon and the Neues Museum." },
      { name: "East Side Gallery", description: "A 1.3 km stretch of the Berlin Wall covered in murals." },
    ],
    bestMonths: [5, 6, 7, 8, 9],
    bestTimeNotes: "Late spring to early autumn is best for parks, lakes and open-air bars. Winter is cold but has excellent Christmas markets.",
    monthNotes: DE_YEAR,
    howToReach: {
      air: "Berlin Brandenburg (BER) has direct flights across Europe and to Delhi via connecting hubs.",
      rail: "Berlin Hauptbahnhof is a major ICE hub: Hamburg in under 2 hours, Munich in about 4.",
      road: "No need for a car; the U-Bahn, S-Bahn and trams cover the whole city.",
    },
    nearby: [
      { name: "Potsdam", distance: "35 km", coordinates: [13.0645, 52.3906] },
      { name: "Spreewald", distance: "100 km", coordinates: [13.9, 51.87] },
      { name: "Sachsenhausen Memorial", distance: "35 km", coordinates: [13.2633, 52.7656] },
    ],
  },
  munich: {
    attractions: [
      { name: "Marienplatz", description: "The central square, where the Neues Rathaus glockenspiel plays at 11am and noon." },
      { name: "English Garden", description: "One of the world's largest city parks, with river surfers and a Chinese Tower beer garden." },
      { name: "Nymphenburg Palace", description: "The Wittelsbach family's Baroque summer palace and its formal gardens." },
      { name: "Deutsches Museum", description: "A huge museum of science and technology on an island in the Isar." },
    ],
    bestMonths: [5, 6, 7, 8, 9, 12],
    bestTimeNotes: "Summer is beer-garden season; Oktoberfest runs late September to early October. December brings Christmas markets.",
    monthNotes: { ...DE_YEAR, 9: "Oktoberfest begins" },
    howToReach: {
      air: "Munich Airport (MUC) is Lufthansa's second hub with direct flights to Delhi and Mumbai.",
      rail: "München Hbf has fast ICE trains to Berlin, Frankfurt, Vienna and Zurich.",
      road: "Use the U-Bahn and S-Bahn in town; hire a car for Alpine day trips.",
    },
    nearby: [
      { name: "Neuschwanstein", distance: "120 km", coordinates: [10.7498, 47.5576] },
      { name: "Salzburg", distance: "145 km", coordinates: [13.055, 47.8095] },
      { name: "Dachau Memorial", distance: "20 km", coordinates: [11.4686, 48.2699] },
    ],
  },
  neuschwanstein: {
    attractions: [
      { name: "Neuschwanstein Castle", description: "Ludwig II's romantic castle; interiors are by timed guided tour only, so book ahead." },
      { name: "Marienbrücke", description: "A footbridge over the Pöllat Gorge with the classic view of the castle." },
      { name: "Hohenschwangau Castle", description: "The yellow castle where Ludwig grew up, smaller and more lived-in." },
      { name: "Alpsee", description: "A clear mountain lake with a lakeside walking trail and rowing boats." },
    ],
    bestMonths: [5, 6, 9, 10],
    bestTimeNotes: "Late spring and autumn have fewer crowds and clear mountain views. Winter snow is beautiful, but the bridge sometimes closes.",
    monthNotes: { ...DE_YEAR, 12: "Snowy, bridge may close", 7: "Busiest month", 8: "Busiest month" },
    howToReach: {
      air: "Munich Airport is about 2 hours away; Memmingen is closer for budget airlines.",
      rail: "Regional trains go from Munich to Füssen in about 2 hours, then bus 73 or 78 to Hohenschwangau.",
      road: "About 1h45 from Munich via the A96; parking is in Hohenschwangau village.",
    },
    nearby: [
      { name: "Füssen", distance: "4 km", coordinates: [10.7016, 47.5701] },
      { name: "Linderhof Palace", distance: "45 km", coordinates: [10.9605, 47.5713] },
      { name: "Zugspitze", distance: "60 km", coordinates: [10.9863, 47.4211] },
    ],
  },
  "black-forest": {
    attractions: [
      { name: "Triberg Waterfalls", description: "Germany's highest falls, with forest trails and red squirrels." },
      { name: "Titisee", description: "A glacial lake for swimming, pedal boats and lakeside walks." },
      { name: "Baden-Baden", description: "An elegant spa town with Roman baths and a famous casino." },
      { name: "Freiburg", description: "A sunny university city with a Gothic minster and little streams in the streets." },
    ],
    bestMonths: [5, 6, 7, 8, 9, 10],
    bestTimeNotes: "Summer and early autumn are perfect for hiking. Winter brings cross-country skiing on the higher ridges.",
    monthNotes: { ...DE_YEAR, 1: "Snow on high ridges", 2: "Cross-country skiing" },
    howToReach: {
      air: "Basel-Mulhouse-Freiburg (EuroAirport), Stuttgart and Karlsruhe/Baden-Baden airports all serve the region.",
      rail: "Freiburg and Offenburg are on the main ICE line; the scenic Black Forest Railway climbs to Triberg.",
      road: "A car is easiest for village-hopping along the Schwarzwaldhochstraße (B500).",
    },
    nearby: [
      { name: "Strasbourg", distance: "85 km from Freiburg", coordinates: [7.7521, 48.5734] },
      { name: "Feldberg", distance: "35 km from Freiburg", coordinates: [8.0042, 47.8738] },
      { name: "Gengenbach", distance: "65 km", coordinates: [8.0153, 48.4038] },
    ],
  },
  cologne: {
    attractions: [
      { name: "Cologne Cathedral", description: "A UNESCO-listed Gothic cathedral; climb 533 steps to the south tower for the view." },
      { name: "Hohenzollern Bridge", description: "A railway bridge covered in thousands of 'love locks', best at dusk." },
      { name: "Old Town (Altstadt)", description: "Colourful riverside houses and brewhouses serving Kölsch in small glasses." },
      { name: "Museum Ludwig", description: "One of Europe's leading modern art collections, with a large Picasso holding." },
    ],
    bestMonths: [5, 6, 7, 8, 9, 12],
    bestTimeNotes: "Summer is lively along the Rhine. Carnival (around February) and the Christmas markets are the city's busiest times.",
    monthNotes: { ...DE_YEAR, 2: "Carnival season" },
    howToReach: {
      air: "Cologne Bonn Airport is 20 minutes away; Düsseldorf and Frankfurt are good long-haul gateways.",
      rail: "Köln Hbf sits right beside the cathedral, with ICE trains across Germany and to Brussels and Paris.",
      road: "The centre is compact and walkable; trams cover the rest.",
    },
    nearby: [
      { name: "Bonn", distance: "30 km", coordinates: [7.0982, 50.7374] },
      { name: "Brühl Palaces", distance: "15 km", coordinates: [6.9113, 50.8262] },
      { name: "Aachen", distance: "70 km", coordinates: [6.0839, 50.7753] },
    ],
  },
  hamburg: {
    attractions: [
      { name: "Speicherstadt", description: "The world's largest warehouse district, built on oak piles along canals." },
      { name: "Elbphilharmonie", description: "A glass concert hall on an old warehouse with a free public viewing plaza." },
      { name: "Fischmarkt", description: "A Sunday-morning fish market in an old auction hall, open from very early." },
      { name: "Alster lakes", description: "Twin lakes in the city centre, ringed by walking paths and sailing clubs." },
    ],
    bestMonths: [5, 6, 7, 8, 9],
    bestTimeNotes: "Summer is mild and long-lit; May brings the harbour birthday festival. Expect rain any time of year.",
    monthNotes: { ...DE_YEAR, 5: "Harbour birthday festival" },
    howToReach: {
      air: "Hamburg Airport is 25 minutes from the centre by S-Bahn.",
      rail: "Hamburg Hbf is under 2 hours from Berlin by ICE.",
      road: "Public transport includes harbour ferries, which double as cheap boat tours.",
    },
    nearby: [
      { name: "Lübeck", distance: "65 km", coordinates: [10.6866, 53.8655] },
      { name: "Lüneburg", distance: "55 km", coordinates: [10.4115, 53.2464] },
      { name: "Sylt", distance: "200 km", coordinates: [8.3058, 54.9079] },
    ],
  },
  dresden: {
    attractions: [
      { name: "Frauenkirche", description: "The rebuilt Baroque church whose dome was restored from rubble in 2005." },
      { name: "Zwinger", description: "A Baroque palace complex housing the Old Masters Picture Gallery." },
      { name: "Semperoper", description: "One of Europe's great opera houses, with guided tours during the day." },
      { name: "Brühl's Terrace", description: "The 'Balcony of Europe', a raised promenade above the Elbe." },
    ],
    bestMonths: [5, 6, 7, 8, 9, 12],
    bestTimeNotes: "Summer suits Elbe river walks and paddle steamers. The Striezelmarkt, one of Germany's oldest Christmas markets, opens in late November.",
    monthNotes: { ...DE_YEAR, 12: "Striezelmarkt Christmas market" },
    howToReach: {
      air: "Dresden Airport has European flights; Berlin and Prague airports are 2 hours away.",
      rail: "Dresden Hbf links to Berlin (about 2 hours) and Prague (about 2.5 hours).",
      road: "The old town is walkable; trams reach the newer Neustadt across the river.",
    },
    nearby: [
      { name: "Saxon Switzerland", distance: "40 km", coordinates: [14.0717, 50.9617] },
      { name: "Meissen", distance: "25 km", coordinates: [13.4703, 51.1636] },
      { name: "Moritzburg Castle", distance: "15 km", coordinates: [13.6797, 51.1675] },
    ],
  },
};
