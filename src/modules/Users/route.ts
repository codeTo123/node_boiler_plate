import { Router } from "express";
import { UsersController } from "./controller";
import mediaRefector from "../../helpers/validateRequest";
import authToken from "../../middleware/bearerToken";
import multer from "multer";
import path from "path";
import validateRequest from "../../helpers/validateRequest";
import { addUserSchema, updateUserSchema } from "./validation";

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/user");
  },
  filename: async function (req, file, cb) {
    // Extract file extension
    const ext = path.extname(file.originalname);

    // remove white spaces and add '-' between the words
    const name = await mediaRefector(req.body.full_name);

    const fileName = name + "-" + Date.now() + ext;
    cb(null, fileName);
  },
});
const upload = multer({ storage: multerStorage });

export class UsersRoute {
  router: Router;
  controller: UsersController;
  constructor(router: Router) {
    this.router = router;
    this.controller = new UsersController();
    this.route();
  }
  private route() {
    // Route for listing users
    this.router.get(
      "/users/get-users",
      authToken,
      this.controller.listUser
    );

    this.router.post(
      "/users/add-user",
      authToken,
      upload.single("avatar"),
      // validateRequest(addUserSchema),
      this.controller.addUser
    );

    // Route for editing an existing user
    this.router.put(
      "/users/edit-user",
      authToken,
      // validateRequest(updateUserSchema),
      upload.single("avatar"),
      this.controller.updateUser
    );

    // // Route for deleting a user
    // this.router.delete(
    //   "/users/delete-user/:userId",
    //   authToken,
    //   this.controller.deleteUser
    // );
  }
}

// export class UsersRoute {
//   router: Router;
//   controller: UsersController;
//   constructor(router: Router) {
//     this.router = router;
//     this.controller = new UsersController();
//     this.route();
//   }
//   private route() {
//     // Route for adding a new user
//     this.router.post(
//       "/users/add-user",
//       authToken,
//       upload.single("avatar"),
//       // validateRequest(addUserSchema),
//       this.controller.addUser
//     );

//     // Route for editing an existing user
//     this.router.put(
//       "/users/edit-user",
//       authToken,
//       upload.single("avatar"),
//       validateRequest(updateUserSchema),
//       this.controller.updateUser
//     );

//     // Route for deleting a user
//     this.router.delete(
//       "/users/delete-user/:userId",
//       authToken,
//       this.controller.deleteUser
//     );
//   }
// }
