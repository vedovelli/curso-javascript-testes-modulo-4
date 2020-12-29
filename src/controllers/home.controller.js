export const index = async (req, res) => {
  return res.status(200).json({ welcome: 'Welcome Stranger!' });
};
