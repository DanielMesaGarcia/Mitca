const Race = require('../models/Race'); // Make sure to adjust the correct path to the model

// Controller to create a new race
exports.createRace = async (req, res) => {
  try {
    const newRace = new Race(req.body);
    await newRace.save();
    res.status(201).json({ success: true, data: newRace });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to get all races
exports.getRaces = async (req, res) => {
  try {
    const races = await Race.find().populate('route').populate('status').populate('runners').populate('sponsors');
    res.status(200).json({ success: true, data: races });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to get a race by its ID
exports.getRaceById = async (req, res) => {
  try {
    const race = await Race.findById(req.params.id).populate('route').populate('status').populate('runners').populate('sponsors');
    if (!race) {
      return res.status(404).json({ success: false, error: 'Race not found' });
    }
    res.status(200).json({ success: true, data: race });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to update a race by its ID
exports.updateRace = async (req, res) => {
  try {
    const race = await Race.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('route').populate('status').populate('runners').populate('sponsors');
    if (!race) {
      return res.status(404).json({ success: false, error: 'Race not found' });
    }
    res.status(200).json({ success: true, data: race });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to delete a race by its ID
exports.deleteRace = async (req, res) => {
  try {
    const race = await Race.findByIdAndDelete(req.params.id);
    if (!race) {
      return res.status(404).json({ success: false, error: 'Race not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
