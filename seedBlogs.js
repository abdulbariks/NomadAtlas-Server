import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "./models/blogs.js"; // ✅ make sure this path is correct

dotenv.config();

const blogs = [
  {
    title: "Exploring Bali: A Nomad's Paradise",
    content: `Introduction
Bali, the crown jewel of Indonesia, has long been a dream destination for travelers, but in recent years it has evolved into a global hub for digital nomads. With its golden beaches, lush rice terraces, vibrant culture, and surprisingly affordable cost of living, Bali offers an irresistible combination of work and leisure. Whether you’re a freelancer, remote employee, or entrepreneur, this tropical island provides everything you need to stay productive while living a life of adventure.

Why Bali is Perfect for Digital Nomads
One of the biggest draws of Bali is its balance between modern infrastructure and natural beauty. Cities like Canggu, Ubud, and Seminyak offer a variety of coworking spaces equipped with high-speed internet, private meeting rooms, and on-site cafés. These spaces are not only practical but also social hotspots where nomads network, share ideas, and build lifelong friendships. The cost of living is another major advantage—accommodation, food, and transportation are far more affordable compared to Western countries, making it possible to live comfortably on a modest budget.

Lifestyle & Culture
Beyond work, Bali is a playground for adventure and self-discovery. Spend your mornings surfing the waves of Uluwatu, exploring sacred temples like Tanah Lot, or meditating in a jungle retreat. Evenings are perfect for enjoying sunset beach parties, sampling world-class cuisine, or taking part in traditional Balinese ceremonies. The locals are warm and welcoming, creating an environment where travelers feel safe and inspired.

Practical Tips for Nomads
Accommodation: Monthly villa rentals are common and often include cleaning services and pools. Websites like Airbnb and local Facebook groups list excellent long-term deals.

Transportation: Renting a scooter is the most convenient way to get around, but always wear a helmet and carry an international driving permit.

Internet & Workspaces: Cafés like Dojo Bali or Outpost Ubud provide reliable Wi-Fi and a community-driven environment, ideal for productive work sessions.

Health & Safety: Affordable healthcare is available, but travel insurance is recommended for peace of mind.

Conclusion
Bali is more than a vacation spot; it’s a lifestyle choice. Whether you plan to stay for a few weeks or several months, the island’s combination of breathtaking scenery, vibrant culture, and supportive community makes it a paradise for anyone embracing the digital nomad lifestyle.`,
    category: "Destinations",
    tags: ["Bali", "Travel", "Nomad", "Beach"],
    image: "https://i.ibb.co.com/1jvgnjL/bali.webp",
    authorName: "Alice",
    authorEmail: "alice@example.com",
    authorImage: "https://i.ibb.co.com/qFD6Gtpw/emotions-people-concept-headshot-serious-looking-handsome-man-with-beard-looking-confident-determine.jpg",
    type: "blog",
    createdAt: "2025-09-20T10:00:00Z",
  },
  {
    title: "How to Travel Cheap as a Remote Worker",
    content:
      "Traveling on a budget as a digital nomad is not only possible but can also enhance your experience. By being flexible with your travel dates, booking flights in advance, and using budget airlines, you can save a lot. Choosing destinations with a lower cost of living, such as Southeast Asia or parts of South America, will stretch your budget further. Additionally, learning how to cook your own meals, using public transportation, and sharing accommodations like hostels or co-living spaces are great ways to save money while still enjoying your journey.",
    category: "Tips & Tricks",
    tags: ["Budget", "Travel Hacks", "Remote Work"],
    image: "https://i.ibb.co.com/cS7VGC3Q/standsome-worklifestyle-Ukx-A41-Zv-Apo-unsplash.jpg",
    authorName: "Bob",
    authorEmail: "bob@example.com",
    authorImage: "https://i.ibb.co.com/0V1XkD22/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair.jpg",
    type: "blog",
    createdAt: "2025-08-15T09:30:00Z",
  },
  {
    title: "Joining Nomad Groups Around the World",
    content:
      "Joining nomad groups around the world provides a strong sense of belonging and helps combat loneliness. Platforms like Facebook, Meetup, and Nomad List make it easy to find groups in different cities. These communities often organize coworking days, hiking trips, language exchange events, and networking meetups. Being part of such groups not only helps in building friendships but also provides valuable local knowledge and professional opportunities. Many nomads find their business partners, clients, or even lifelong friends through these communities.",
    category: "Community",
    tags: ["Networking", "Community", "Nomads"],
    image: "https://i.ibb.co.com/JRf1YkvP/global-network-connection-internet-worldwide.jpg",
    authorName: "Charlie",
    authorEmail: "charlie@example.com",
    authorImage: "https://i.ibb.co.com/twMtPX1M/surprised-smiling-curly-girl-white-wall.jpg",
    type: "blog",
    createdAt: "2025-07-10T08:15:00Z",
  },
  {
    title: "Top 10 Cities for Digital Nomads in 2025",
    content:
      "In 2025, cities like Lisbon, Mexico City, Tbilisi, Bangkok, and Medellín remain at the top of the list for digital nomads. These cities offer affordable housing, great internet speed, and active nomad communities. Additionally, they have vibrant cultures, delicious food, and plenty of coworking spaces. Many governments are now introducing digital nomad visas, making it easier than ever to stay long-term. The top 10 list is based on factors like safety, cost of living, internet infrastructure, and overall quality of life.",
    category: "Travel Guides",
    tags: ["Cities", "Nomad Guide", "Remote Work"],
    image: "https://i.ibb.co.com/RkmHDwPn/bhumibol-bridge-chao-phraya-river.jpg",
    authorName: "Diana",
    authorEmail: "diana@example.com",
    authorImage: "https://i.ibb.co.com/qFD6Gtpw/emotions-people-concept-headshot-serious-looking-handsome-man-with-beard-looking-confident-determine.jpg",
    type: "blog",
    createdAt: "2025-06-30T11:20:00Z",
  },
  {
    title: "Remote Work in Chiang Mai: Tips & Insights",
    content:
      "Chiang Mai, Thailand is considered the birthplace of the digital nomad lifestyle. With its low cost of living, friendly locals, and strong nomad community, it is a hub for remote workers worldwide. The city offers plenty of coworking spaces, from trendy coffee shops to professional hubs like Punspace. The surrounding nature, with mountains, waterfalls, and temples, makes it easy to balance work with exploration. Food in Chiang Mai is both delicious and affordable, and the city's safety and convenience add to its appeal.",
    category: "Destinations",
    tags: ["Chiang Mai", "Thailand", "Nomads"],
    image: "https://i.ibb.co.com/HTQNS4X3/woman-taking-photo-morning-mist-phu-lang-ka-phayao-thailand.jpg",
    authorName: "Ethan",
    authorEmail: "ethan@example.com",
    authorImage: "https://i.ibb.co.com/0V1XkD22/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair.jpg",
    type: "blog",
    createdAt: "2025-05-22T07:50:00Z",
  },
  {
    title: "Managing Time Zones as a Global Worker",
    content:
      "Working with teams spread across multiple time zones can be challenging. To stay productive, use tools like Google Calendar, World Time Buddy, and Slack integrations that adjust to your team's time zones. Setting clear boundaries, using asynchronous communication, and scheduling overlapping hours for critical meetings helps minimize confusion. Many remote workers also recommend planning a personal routine that accommodates both professional commitments and personal well-being.",
    category: "Tips & Tricks",
    tags: ["Time Management", "Productivity", "Remote Work"],
    image: "https://i.ibb.co.com/1Gj4CkdD/shutterstock-2021639273-696x353.jpg",
    authorName: "Fiona",
    authorEmail: "fiona@example.com",
    authorImage: "https://i.ibb.co.com/twMtPX1M/surprised-smiling-curly-girl-white-wall.jpg",
    type: "blog",
    createdAt: "2025-04-18T10:40:00Z",
  },
  {
    title: "Building Friendships While Traveling",
    content:
      "Building friendships while traveling requires intentional effort. Digital nomads often find connections at coworking spaces, language schools, fitness classes, and local events. Social apps like Couchsurfing and Bumble BFF are also useful for meeting like-minded people. While it may be challenging to form long-term bonds due to constant movement, the friendships made on the road often turn into a global network of support, with people you can reconnect with in different countries.",
    category: "Community",
    tags: ["Friendship", "Travel Community", "Nomads"],
    image: "https://i.ibb.co.com/MxWg2FxM/medium-shot-friends-with-backpacks.jpg",
    authorName: "George",
    authorEmail: "george@example.com",
    authorImage: "https://i.ibb.co.com/0V1XkD22/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair.jpg",
    type: "blog",
    createdAt: "2025-03-12T09:25:00Z",
  },
  {
    title: "Visa Tips for Remote Workers",
    content:
      "Visa regulations are one of the biggest concerns for digital nomads. Many countries now offer digital nomad visas, allowing remote workers to stay for 6-24 months legally. Research each country’s specific requirements, such as proof of income, health insurance, or background checks. Popular destinations with nomad visas include Portugal, Croatia, Estonia, and Costa Rica. Always check government websites for the most updated information before traveling to avoid legal issues.",
    category: "Travel Guides",
    tags: ["Visa", "Travel", "Remote Work"],
    image: "https://i.ibb.co.com/Dg6hdVHK/i-am-here-help-you-with-your-booking-travel-questions-female-sales-agent-holding-plane-tickets-while.jpg",
    authorName: "Hannah",
    authorEmail: "hannah@example.com",
    authorImage: "https://i.ibb.co.com/qFD6Gtpw/emotions-people-concept-headshot-serious-looking-handsome-man-with-beard-looking-confident-determine.jpg",
    type: "blog",
    createdAt: "2025-02-05T08:15:00Z",
  },
  {
    title: "Digital Nomad Hotspots in Europe",
    content:
      "Europe is filled with hotspots for digital nomads. Cities like Lisbon, Berlin, Prague, and Budapest are favorites thanks to their cultural richness and infrastructure. The Schengen visa allows easy travel between multiple European countries, making it ideal for nomads who want variety. While Western Europe can be expensive, Eastern European cities offer affordability with the same level of culture and connectivity. Co-living spaces and meetups in Europe also make it easy to connect with other nomads.",
    category: "Destinations",
    tags: ["Europe", "Nomads", "Destinations"],
    image: "https://i.ibb.co.com/8DbYyG7W/cityscape-paris-sunlight-blue-sky-fra.jpg",
    authorName: "Ian",
    authorEmail: "ian@example.com",
    authorImage: "https://i.ibb.co.com/twMtPX1M/surprised-smiling-curly-girl-white-wall.jpg",
    type: "blog",
    createdAt: "2025-01-20T10:05:00Z",
  },
  {
    title: "How to Stay Productive on the Road",
    content:
      "Staying productive while traveling requires structure and discipline. Creating a daily routine, having a dedicated workspace, and using productivity apps like Notion, Trello, or Todoist can help. Minimizing distractions by turning off unnecessary notifications and practicing time-blocking ensures you can finish tasks efficiently. Balancing work with travel experiences is crucial, so plan your sightseeing during breaks or after work hours instead of mixing both.",
    category: "Tips & Tricks",
    tags: ["Productivity", "Remote Work", "Tips"],
    image: "https://i.ibb.co.com/NdL0pQ84/portrait-adult-male-working-night.jpg",
    authorName: "Julia",
    authorEmail: "julia@example.com",
    authorImage: "https://i.ibb.co.com/qFD6Gtpw/emotions-people-concept-headshot-serious-looking-handsome-man-with-beard-looking-confident-determine.jpg",
    type: "blog",
    createdAt: "2024-12-15T11:50:00Z",
  },
  {
    title: "Finding Co-Working Spaces Abroad",
    content:
      "Coworking spaces abroad provide structure, community, and professional resources for remote workers. They are ideal for networking and often organize events, workshops, and social activities. Many offer fast internet, private meeting rooms, and even wellness services like yoga classes. Popular coworking hubs are found in cities like Lisbon, Bali, and Mexico City. Choosing a coworking space can also help separate work from leisure, boosting productivity and creating a healthier work-life balance.",
    category: "Community",
    tags: ["Coworking", "Remote Work", "Networking"],
    image: "https://i.ibb.co.com/hx7G7vy2/employee-discussing-project-strategy-with-executive-virtual-conference.jpg",
    authorName: "Kevin",
    authorEmail: "kevin@example.com",
    authorImage: "https://i.ibb.co.com/0V1XkD22/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair.jpg",
    type: "blog",
    createdAt: "2024-11-10T09:00:00Z",
  },
  {
    title: "Essential Apps for Remote Workers",
    content:
      "Remote workers rely heavily on apps for communication, organization, and productivity. Apps like Slack, Zoom, and Microsoft Teams help with communication, while Trello, Asana, and Notion keep tasks organized. Time-tracking tools like Toggl and Clockify ensure efficiency, while VPNs and cloud storage tools like Google Drive and Dropbox provide security and accessibility. Having the right set of apps can make your nomad journey smoother and more manageable.",
    category: "Travel Guides",
    tags: ["Apps", "Remote Work", "Productivity"],
    image: "https://i.ibb.co.com/CNs6BHF/company-analyst-studying-business-activity-progress-achieving-strategic-goals.jpg",
    authorName: "Laura",
    authorEmail: "laura@example.com",
    authorImage: "https://i.ibb.co.com/twMtPX1M/surprised-smiling-curly-girl-white-wall.jpg",
    type: "blog",
    createdAt: "2024-10-05T10:20:00Z",
  },
];

const seedBlogs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");

    await Blog.deleteMany();
    console.log("🗑️ Existing blogs removed");

    const inserted = await Blog.insertMany(blogs);
    console.log(`🎉 Inserted ${inserted.length} blogs successfully!`);

    process.exit();
  } catch (error) {
    console.error("❌ Error inserting blogs:", error);
    process.exit(1);
  }
};

seedBlogs();
