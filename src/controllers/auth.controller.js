const register = async (req, res) => {
  const user = req.user;
  res.json201(user);
};

/*
const login = async (req, res) => {
  const { token, user } = req;
  const opts = { maxAge: 60 * 60 * 24 * 7 * 1000 };
  res.cookie("token", token, opts).json200("Logged in");
};
*/

const login = async (req, res, next) => {
  try {
    const { user } = req;
    const token = req.token;
    res
      .cookie("token", token, { httpOnly: true }) //
      .status(200)
      .json({
        method: "post",
        url: "/api/auth/login",
        response: "Logged in",
        token, // <-- aquí devuelve en el body
        user: {
          email: user.email,
          role: user.role,
        }
      });
  } catch (error) {
    next(error);
  }
};

const signout = (req, res) =>
  res.clearCookie("token").json200("Signed out");

const online = (req, res) => {
  try {
    res.json200("It's online");
  } catch (error) {
    next(error);
  }
}

const failure = (req, res) => {
  return res.json401();
};

export { register, login, signout, online, failure };
