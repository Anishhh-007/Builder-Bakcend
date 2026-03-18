const logoutController = (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(Date.now()),
    })

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    })
  }
}

module.exports  = logoutController