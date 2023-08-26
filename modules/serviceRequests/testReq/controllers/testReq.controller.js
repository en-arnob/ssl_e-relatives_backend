exports.create = async (req, res) => {
  try {
    res.json({ msg: "Hello Test" });
  } catch (error) {
    console.log(error);
  }
};
