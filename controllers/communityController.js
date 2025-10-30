// try {
//     const messages = await CommunityMessage.find().sort({ createdAt: 1 });
//     res.json(messages);
// } catch (err) {
//     res.status(500).json({ message: err.message });
// }
// try {
//     const { senderId, senderName, text } = req.body;

//     if (!senderId || !text) {
//         return res.status(400).json({ message: "Missing required fields" });
//     }

//     const newMessage = new CommunityMessage({ senderId, senderName, text });
//     await newMessage.save();

//     res.status(201).json(newMessage);
// } catch (err) {
//     res.status(500).json({ message: err.message });
// }
import CommunityMessage from "../models/communityModal.js";
import CommunityPost from "../models/CommunityPost.js";

export const getMessages = async (req, res) => {
    try {
        const { room } = req.query;
        const filter = room ? { room } : {};
        const messages = await CommunityMessage.find(filter).sort({ createdAt: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const postMessage = async (req, res) => {
    try {
        const { senderId, senderName, text, room } = req.body;
        if (!senderId || !text) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newMessage = new CommunityMessage({ senderId, senderName, text, room });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


function humanizeNumber(n) {
    if (n === null || n === undefined || isNaN(n)) return "-";
    const num = Number(n);
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
    return String(num);
}

export const statsHandler = async (req, res) => {
    try {

        const posts = await CommunityPost.find({}, { author: 1, category: 1, comments: 1, likes: 1 }).lean();


        const totalPosts = Array.isArray(posts) ? posts.length : 0;
        let totalComments = 0;
        let totalLikes = 0;
        const authorsSet = new Set();
        const categoriesSet = new Set();

        if (Array.isArray(posts)) {
            for (const p of posts) {
                if (p.author) authorsSet.add(String(p.author));
                if (p.category) categoriesSet.add(String(p.category));
                if (Array.isArray(p.comments)) totalComments += p.comments.length;
                totalLikes += Number(p.likes || 0);
            }
        }

        const uniqueAuthors = authorsSet.size;
        const distinctCategories = categoriesSet.size;

        const tiles = [
            { iconKey: "Users", label: "Active Nomads", value: humanizeNumber(uniqueAuthors) },
            { iconKey: "MapPin", label: "Destinations", value: "143" },
            { iconKey: "MessageCircle", label: "Discussions", value: humanizeNumber(totalComments) },
            { iconKey: "Globe", label: "Countries", value: "95" },
        ];

        return res.json(tiles);
    } catch (err) {
        console.error("statsHandler:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const meetupsHandler = async (req, res) => {
    try {

        const meetups = [
            { city: "Barcelona", date: "Oct 28", attendees: 24, type: "Coworking Day" },
            { city: "Mexico City", date: "Nov 2", attendees: 18, type: "Networking Event" },
            { city: "Tokyo", date: "Nov 5", attendees: 31, type: "Cultural Meetup" },
        ];

        return res.json(meetups);
    } catch (err) {
        console.error("meetupsHandler:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
