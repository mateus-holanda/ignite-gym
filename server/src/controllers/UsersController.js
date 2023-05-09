const knex = require("../database");
const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError("Inform all required fields (name, e-mail and password).");
    }

    const checkUserExists = await knex("users").where({ email }).first();

    if (checkUserExists) {
      throw new AppError("This e-mail is already registered.");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, password, old_password } = request.body;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("User not found", 404);
    }

    user.name = name ?? user.name;

    if (password && !old_password) {
      throw new AppError(
        "You need to inform the old password to update it.",
      );
    }


    if (!password && old_password) {
      throw new AppError(
        "Inform the new password.",
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password doesn't match.");
      }

      user.password = await hash(password, 8);
    }

    await knex("users").where({ id: user_id }).update(user);

    return response.json();
  }
}

module.exports = UsersController;