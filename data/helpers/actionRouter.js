const express = require('express');
const Actions = require('./actionModel');
const router = express.Router();

//GET
router.get('/', async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'We were unable to retrieve the requested actions.'
    });
  }
});

//GET ACTION by ID

router.get('/', validateActionId, async (req, res) => {
  try {
    const action = await Actions.get();
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'We were unable to retrieve your Action.'
    });
  }
});

//POST
router.post('/', validateAction, async (req, res) => {
  try {
    const newAction = await Actions.insert(req.body);
    res.status(200).json(newAction);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'We were unable to create a new Action.'
    });
  }
});

//PUT (update)
router.put('/:id', validateActionId, async (req, res) => {
  try {
    const { id } = req.params;
    const edit = await Actions.update(id, req.body);
    res.status(200).json(edit);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'We were unable to update your Action'
    });
  }
});

//Delete
router.delete('/:id', validateActionId, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAction = await Actions.remove(id);
    res.status(200).json(deleteAction);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'We were unable to remove the selected Action.'
    });
  }
});

//Middleware
function validateAction(req, res, next) {
  if (!req.body.project_id) {
    res
      .status(400)
      .json({ success: false, message: 'Please enter a valid Project id.' });
  } else if (!req.body.description) {
    res.status(400).json({
      success: false,
      message: 'You are missing the required description for the action.'
    });
  } else if (!req.body.notes) {
    res.status(400).json({
      success: false,
      message: 'You are missing the required notes for the action.'
    });
  }
  next();
}

async function validateActionId(req, res, next) {
  const { id } = req.params.id;
  const validID = await Actions.get(id);
  if (validID) {
    req.validID = validID;
    next();
  } else {
    res.status(400).json({ success: false, message: 'Invalid Action id.' });
  }
}
module.exports = router;
