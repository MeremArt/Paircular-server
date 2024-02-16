const { StatusCodes } = require(`http-status-codes`);
const path = require(`path`);
const cloudinary = require("cloudinary").v2;
const fs = require("fs"); // Add this line
const CustomError = require("../error");

const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No File Uploaded");
  }
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith(`image`)) {
    throw new CustomError.BadRequestError(`Please Upload Image`);
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(`Please upload image`);
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: "File-Upload",
      }
    );
    fs.unlinkSync(req.files.image.tempFilePath);
    return res
      .status(StatusCodes.OK)
      .json({ image: { src: result.secure_url } });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
module.exports = {
  uploadProductImage,
};
