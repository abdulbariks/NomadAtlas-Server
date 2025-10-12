import User from "../models/userModel.js";

const verifyProvider = async (req, res, next) => {
    try {
        const decodedEmail = req.decoded?.email;
        if (!decodedEmail) {
            return res.status(401).send({ message: "Unauthorized access" });
        }

        const user = await User.findOne({ email: decodedEmail });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        if (user.role !== "provider") {
            return res.status(403).send({ message: "Forbidden: Providers only" });
        }

        next();
    } catch (error) {
        console.error("Provider verification failed:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};

export default verifyProvider;
