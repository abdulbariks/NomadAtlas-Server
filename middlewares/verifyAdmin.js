import User from "../models/userModel.js";

const verifyAdmin = async (req, res, next) => {
    try {
        const decodedEmail = req.decoded?.email; // comes from verifyFirebaseToken
        if (!decodedEmail) {
            return res.status(401).send({ message: "Unauthorized access" });
        }

        // find the user by decoded email
        const user = await User.findOne({ email: decodedEmail });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // check if the role is admin
        if (user.role !== "admin") {
            return res.status(403).send({ message: "Forbidden: Admins only" });
        }

        // user is verified admin
        next();
    } catch (error) {
        console.error("Admin verification failed:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};

export default verifyAdmin;
