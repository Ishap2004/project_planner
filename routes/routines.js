const express = require('express');
const router = express.Router();
const routineController = require('../controllers/routineController');
const auth = require('../middleware/auth');

// All routine routes are protected
router.use(auth);

router.get('/', routineController.getRoutines);
router.post('/', routineController.createRoutine);
router.put('/:id', routineController.updateRoutineStatus);
router.delete('/:id', routineController.deleteRoutine);

module.exports = router;
