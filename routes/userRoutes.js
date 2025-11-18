import express from 'express';
import * as userController from './../controllers/userController.js';
import * as authController from './../controllers/authController.js';

const router = express.Router();

router.use(authController.protect);
router.get('/', userController.getUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
