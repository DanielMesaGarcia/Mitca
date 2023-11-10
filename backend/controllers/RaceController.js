const Race = require('../models/Race'); // Make sure to adjust the correct path to the model
const Route = require('../models/Route');
const Status = require('../models/Status');

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
    const race = await Race.findById(req.params._id).populate('route').populate('status').populate('runners').populate('sponsors');
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
    const race = await Race.findByIdAndUpdate(req.params._id, req.body, {
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

exports.patchRace = async (req, res) => {
  const { _id } = req.params;
  const updates = req.body;

  try {
    const race = await Race.findOne({ _id: _id });

    if (!race) {
      return res.status(404).json({ success: false, error: 'Race not found' });
    }

    // Si la actualización incluye el operador $push
    if ('$push' in updates) {
      await Race.updateOne({ _id: _id }, updates);
    } else {
      // Actualizar otros campos usando el enfoque anterior
      Object.keys(updates).forEach((key) => {
        race[key] = updates[key];
      });

      await race.save();
    }

    console.log("ok");
    console.log(req.params);
    console.log(updates);
    
    res.status(200).json({ success: true, data: race });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



exports.deleteRace = async (req, res) => {
  try {
    const race = await Race.findByIdAndDelete(req.params._id);
    if (!race) {
      return res.status(404).json({ success: false, error: 'Race not found' });
    }

    // Delete associated Route and Status
    await Route.findOneAndDelete({ _id: race.route });
    await Status.findOneAndDelete({ _id: race.status });

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};