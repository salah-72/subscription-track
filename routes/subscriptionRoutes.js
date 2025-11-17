const express = require('express');
const subscriptionController = require('./../controllers/subscriptionController');

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
module.exports = router;
