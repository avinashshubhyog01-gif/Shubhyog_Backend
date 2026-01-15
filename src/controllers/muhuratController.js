import MarriageMuhurat from "../models/MarriageMuhurat.js";

export const getMarriageMuhurat = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ data: [] });
    }

    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const endDate = `${year}-${String(month).padStart(2, "0")}-31`;

    const muhurats = await MarriageMuhurat.find({
      date: { $gte: startDate, $lte: endDate },
      isActive: true,
    }).sort({ date: 1 });

    const data = muhurats.map((m) => ({
      date: m.date,
      name: "Marriage Muhurat",
      time: `${m.startTime} - ${m.endTime}`,
      category: m.religion,
    }));

    res.json({ data });
  } catch (err) {
    console.error("Muhurat DB error:", err);
    res.status(500).json({ data: [] });
  }
};
