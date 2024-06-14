import Role from "../models/roles.js";
import User from "../models/user.js";

 
export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();
        if (count > 0) return;

        const values = await Promise.all([
            new Role({ name: "SuperAdmin" }).save(),
            new Role({ name: "admin" }).save(),
            new Role({ name: "user" }).save(),
        ]);

        console.log("rols created");
    } catch (error) {
        console.log(error);
    }
};


export const createAdmin = async () => {
    try {
        const count = await User.estimatedDocumentCount();
        if (count > 0) return;
        const role = await Role.findOne({ name: "SuperAdmin" });
        const values = await Promise.all([
            new User({
                name: "admin",
                email: "admin@gmail.com",
                id_rol: [role._id],
                password: "admin123",
            }).save(),
        ]);

        console.log("admin created");
    } catch (error) {
        console.log(error);
    }
};
