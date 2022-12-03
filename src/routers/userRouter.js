const express = require('express');
const User = require('../models/User');

const userRouter = new express.Router();

/**
 * Users CRUD endpoints
 */

userRouter.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users)
  } catch (e) {
    console.log('e', e)
    res.status(500).send(e)
  }
})

userRouter.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e)
  }
})

userRouter.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

userRouter.put('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'gender', 'status']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  // if not a valid update, then provide an err to the user
  if (!isValidOperation) {
    res.status(400).send({error: 'Invalid update object key!'});
  }

  try {
    console.log(req.params.id)
    const user = await User.findById({_id: req.params.id})
    // assign each update field to the new user obj
    updates.forEach((update) => {
      user[update] = req.body[update]
    })
    await user.save()

    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (e) {
    return res.status(404).send(e)
  }
})

userRouter.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).send()
    }
    res.send(user);
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = userRouter;
