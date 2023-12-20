const asyncWrapper = require(`../middleware/Async`);

const waitList = asyncWrapper(async (res, req) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res
      .status(400)
      .json({ error: "Name and email are required fields." });
  }

  const newData = new Data({ name, email });

  try {
    await newData.save();
    res.json({
      success: true,
      message: "Data received and stored successfully.",
    });
  } catch (error) {
    console.error("Error saving data to MongoDB:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = {
  waitList,
};
