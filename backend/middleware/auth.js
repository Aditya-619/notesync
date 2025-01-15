
import { User } from "../model/user.js";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  try {
    const authorizationHeader = req.header("Authorization");
    console.log(req.header("Authorization"));
    if (!authorizationHeader) {
      console.log("Authorization header not found");
      throw new Error();
    }
    const token = authorizationHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, "adckjwef2342343b34gdbwd2347234");
    const user = await User.findOne({
      _id: decoded._id,
    });
    if (!user) {
      console.log("User not found");
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "Authentication failed" });
  }
};
