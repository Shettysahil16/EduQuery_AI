import jwt from "jsonwebtoken";

export const authToken = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Please login to continue",
        error: true,
        success: false,
      });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
        req.userId = decoded._id;
        next();
    } catch (error) {
      console.error("JWT verification error:", verifyError.message);
      return res.status(401).json({
        message: error.message,
        error: true,
        success: false,
      });
    }

  } catch (error) {
    console.error("Auth middleware error:", err.message);
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
};
