const Routine = require('../models/Routine');

const routineController = {

  // This gets all the self-care routines for the user (like meals and breaks)
  getRoutines: async (req, res) => {
    try {
      const routines = await Routine.getAllByUser(req.user.id);
      res.status(200).json({ success: true, data: routines });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // This lets users add a new daily routine to their planner
  createRoutine: async (req, res) => {
    try {
      const { title, scheduled_time } = req.body;

      if (!title || !scheduled_time) {
        return res.status(400).json({ 
          success: false, 
          error: 'Title and scheduled time are required' 
        });
      }

      const newId = await Routine.create(req.user.id, title, scheduled_time);

      res.status(201).json({
        success: true,
        message: 'Routine created successfully',
        data: { id: newId }
      });

    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // PUT /api/routines/:id
  updateRoutineStatus: async (req, res) => {
    try {
      const { status } = req.body;
      
      if (status === undefined) {
        return res.status(400).json({ success: false, error: 'Status is required' });
      }

      await Routine.updateStatus(req.params.id, req.user.id, status);
      
      res.status(200).json({
        success: true,
        message: 'Routine status updated'
      });

    } catch (err) {
      if (err.message.includes('not found')) {
        return res.status(404).json({ success: false, error: err.message });
      }
      res.status(500).json({ success: false, error: err.message });
    }
  },

  // DELETE /api/routines/:id
  deleteRoutine: async (req, res) => {
    try {
      await Routine.delete(req.params.id, req.user.id);
      res.status(200).json({
        success: true,
        message: 'Routine deleted successfully'
      });
    } catch (err) {
      if (err.message.includes('not found')) {
        return res.status(404).json({ success: false, error: err.message });
      }
      res.status(500).json({ success: false, error: err.message });
    }
  }
};

module.exports = routineController;
