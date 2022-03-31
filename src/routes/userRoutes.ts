import { Router } from "express";
import createUserFactory from "src/modules/Users/CreateUser/CreateUserFactory";
import findAllUsersFactory from "src/modules/Users/FindAllUsers/FindAllUsersFactory";

const users = Router();

// GET
users.get("/", findAllUsersFactory);

// POST
users.post("/", createUserFactory);

export default users;
