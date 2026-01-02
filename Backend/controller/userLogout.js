const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      message: "user logout successful",
      success: true,
      error: false,
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

export default logoutController;
