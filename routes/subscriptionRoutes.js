import express from 'express';
import * as subscriptionController from './../controllers/subscriptionController.js';

const router = express.Router();

router
  .route('/')
  .get(subscriptionController.getSubscriptions)
  .post(subscriptionController.createSubscription);

router
  .route('/:id')
  .get(subscriptionController.getSubscription)
  .patch(subscriptionController.updateSubscription)
  .delete(subscriptionController.deletesubscription);
export default router;
