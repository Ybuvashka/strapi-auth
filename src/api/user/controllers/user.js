const bcrypt = require("bcryptjs");

module.exports = {
  async login(ctx) {
    const { username, password } = ctx.request.body;

    if (!username || !password) {
      return ctx.badRequest("Username and password are required");
    }

    const user = await strapi.query("plugin::users-permissions.user").findOne({
      where: { username },
      populate: ['role'],
    });

    if (!user) {
      return ctx.send({ message: "User not found", valid: false });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return ctx.send({ message: "Invalid password", valid: false });
    }


    ctx.state.user = { id: user.id, role: user.role }; 

    return ctx.send({
      message: "Login successful",
      valid: true,
      user: {
        username: user.username,
        role: user.role ? user.role.name : "No role assigned",
      },
    });
  },

  // async getUserIdentity(ctx) {
  //   const user = ctx.state.user;

  //   // if (!user) {
  //   //   return ctx.unauthorized('You must be logged in to access this.');
  //   // }

  //   const sanitizedUser = await strapi.entityService.findOne('plugin::users-permissions.user', user.id, {
  //     fields: ['username', 'email'],
  //   });

  //   return sanitizedUser; 
  // },

  // async getUserRole(ctx) {
  //   const user = ctx.state.user; 

  //   // Add debug log
  //   console.log("Current user in getUserRole:", user); // Debug log

  //   // if (!user) {
  //   //   return ctx.unauthorized('You must be logged in to access this.');
  //   // }
  //   if (!user) {
  //     return ctx.unauthorized({ message: 'You must be logged in to access this.' });
  //   }

  //   // Use optional chaining to safely access role
  //   const role = user.role?.name || "No role assigned"; 
  //   console.log(role,'role');
    
  //   return { role };
  // },
};