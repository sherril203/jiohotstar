const { popularModel } = require("../models/popular.model");

// Add Content
const postpopular = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.image = req.file.filename;
    }

    const popular = new popularModel(data);
    await popular.save();

    res.status(201).json({
      success: true,
      message: "Data added successfully",
      data: popular,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error adding data",
    });
  }
};

// Get by Category
const getPopularByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const data = await popularModel.find({
      category: {
        $elemMatch: {
          $regex: category,
          $options: "i",
        },
      },
    });

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error retrieving category",
    });
  }
};

// Get by Section
const getPopularBySection = async (req, res) => {
  try {
    const { section } = req.params;

    const data = await popularModel.find({
      section: {
        $elemMatch: {
          $regex: section,
          $options: "i",
        },
      },
    });

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error retrieving section",
    });
  }
};
// Get by ID
const getpopularById = async (req, res) => {
  try {
    const { id } = req.params;

    const popular = await popularModel.findById(id);

    if (!popular) {
      return res.status(404).json({
        message: "Content not found",
      });
    }

    res.status(200).json(popular);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getAllPopular = async (req, res) => {
  try {
    const data = await popularModel.find();

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error retrieving data",
    });
  }
};
module.exports = {
  postpopular,
  getPopularByCategory,
  getPopularBySection,
  getpopularById,
  getAllPopular
};