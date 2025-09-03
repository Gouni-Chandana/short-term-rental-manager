exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addProperty = async (req, res) => {
  try {
    const { title, location, price, owner } = req.body;
    const property = new Property({ title, location, price, owner });
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
