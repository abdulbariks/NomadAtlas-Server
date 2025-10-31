import { v4 as uuidv4 } from "uuid";
import City from "../models/City.js";

export async function listCities(req, res, next) {
  try {
    const cities = await City.find({}).sort({ createdAt: -1 }).lean();
    res.json(cities);
  } catch (err) {
    next(err);
  }
}

export async function getCity(req, res, next) {
  try {
    const city = await City.findOne({ id: req.params.id }).lean();
    if (!city) return res.status(404).json({ message: "City not found" });
    res.json(city);
  } catch (err) {
    next(err);
  }
}

export async function createCity(req, res, next) {
  try {
    const { id, name, cost, wifi, safety, climate, coworking, experience } = req.body;
    if (!name) return res.status(400).json({ message: "Please provide a city name" });

    let newId = id && String(id).trim().toLowerCase().replace(/\s+/g, "_");
    if (!newId) {
      newId = uuidv4().replace(/-/g, "").slice(0, 10);
    }

    const exists = await City.findOne({ id: newId });
    if (exists) {
      return res.status(409).json({ message: "ID already exists. Choose a different id or omit id to auto-generate." });
    }

    const city = await City.create({
      id: newId,
      name,
      cost: cost || "",
      wifi: wifi || "",
      safety: safety || "",
      climate: climate || "",
      coworking: coworking || "",
      experience: experience || ""
    });

    res.status(201).json(city);
  } catch (err) {
    next(err);
  }
}


export async function deleteCity(req, res, next) {
  try {
    const deleted = await City.deleteOne({ id: req.params.id });
    if (deleted.deletedCount === 0) return res.status(404).json({ message: "City not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
}
