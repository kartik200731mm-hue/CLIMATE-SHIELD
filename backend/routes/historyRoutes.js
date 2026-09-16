import express from 'express';
import {
  getHistory,
  createHistoryEntry,
  removeHistoryEntry,
  resetHistory
} from '../controllers/historyController.js';

const router = express.Router();

router.route('/')
  .get(getHistory)
  .post(createHistoryEntry)
  .delete(resetHistory);

router.route('/:id')
  .delete(removeHistoryEntry);

export default router;
