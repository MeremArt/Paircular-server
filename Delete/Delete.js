const fs = require("fs");
const path = require("path");

const filePath = "path/to/your/file.js";

const deleteIfOlderThan30Days = () => {
  try {
    // Get file stats
    const stats = fs.statSync(filePath);

    // Calculate the time difference in milliseconds
    const currentTime = new Date().getTime();
    const fileModificationTime = stats.mtime.getTime();
    const timeDifference = currentTime - fileModificationTime;

    // Define the threshold for 30 days (in milliseconds)
    const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;

    if (timeDifference >= thirtyDaysInMilliseconds) {
      // Overwrite the file with an empty content
      fs.writeFileSync(filePath, "");
      console.log("Code deleted successfully.");
    } else {
      console.log("Code is not older than 30 days. No deletion needed.");
    }
  } catch (error) {
    console.error("Error deleting code:", error.message);
  }
};

// Execute the function
deleteIfOlderThan30Days();
