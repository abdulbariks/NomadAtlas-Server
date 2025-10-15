import { z } from "zod";
import { SpeedReport } from "../models/SpeedReport.js";

const ReportBodySchema = z.object({
  city: z.string().trim().min(1),
  speedMbps: z.number().nonnegative(),
  lat: z.number().optional(),
  lng: z.number().optional()
});

export async function postSpeedReport(req, res, next) {
  try {
    const parsed = ReportBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid payload", details: parsed.error.flatten() });
    }
    const { city, speedMbps, lat, lng } = parsed.data;
    const doc = await SpeedReport.create({ city, speedMbps, lat, lng });
    return res.status(201).json({ ok: true, data: { id: doc._id } });
  } catch (err) {
    next(err);
  }
}


export async function getAverageSpeeds(req, res, next) {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$city",
          avgSpeed: { $avg: "$speedMbps" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ];
    const rows = await SpeedReport.aggregate(pipeline).allowDiskUse(true);
    return res.json(rows);
  } catch (err) {
    next(err);
  }
}


export async function getReportsByCity(req, res, next) {
  try {
    const { city } = req.params;
    if (!city) return res.status(400).json({ error: "City is required" });
    const rows = await SpeedReport.find({ city }).sort({ createdAt: -1 }).lean();
    return res.json({ city, reports: rows });
  } catch (err) {
    next(err);
  }
}