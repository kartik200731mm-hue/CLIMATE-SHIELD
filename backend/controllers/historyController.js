import {
  getAllHistory,
  addHistoryItem,
  deleteHistoryItem,
  clearHistory
} from '../services/historyService.js';

/**
 * @desc    Get assessment history log
 * @route   GET /api/history
 * @access  Public
 */
export const getHistory = async (req, res, next) => {
  try {
    const history = getAllHistory();
    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Record assessment in history log
 * @route   POST /api/history
 * @access  Public
 */
export const createHistoryEntry = async (req, res, next) => {
  try {
    const entry = req.body;
    const created = addHistoryItem(entry);
    res.status(201).json({
      success: true,
      data: created
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete single history entry
 * @route   DELETE /api/history/:id
 * @access  Public
 */
export const removeHistoryEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = deleteHistoryItem(id);
    res.status(200).json({
      success,
      message: success ? `Entry ${id} deleted` : `Entry ${id} not found`
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Clear entire history log
 * @route   DELETE /api/history
 * @access  Public
 */
export const resetHistory = async (req, res, next) => {
  try {
    clearHistory();
    res.status(200).json({
      success: true,
      message: 'All assessment history records cleared.'
    });
  } catch (error) {
    next(error);
  }
};
