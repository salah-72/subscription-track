import express from 'express';
import * as subscriptionController from './../controllers/subscriptionController.js';
import { protect } from '../controllers/authController.js';

const router = express.Router();

router
  .route('/')
  .get(subscriptionController.getSubscriptions)
  .post(protect, subscriptionController.createSubscription);

router.get('/mySubs', protect, subscriptionController.getUserSubs);
router
  .route('/:id')
  .get(subscriptionController.getSubscription)
  .patch(subscriptionController.updateSubscription)
  .delete(subscriptionController.deletesubscription);
export default router;
