const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        //updates a User
     return  User.findOneAndUpdate(
          {_id: req.body.userId},
          {$addToSet: {thoughts: thought._id}},
          { runValidators: true, new: true }
        )
      })
      .then((user) =>
        !user
        ? res
        .status(404)
        .json({message: 'Thought created, but found no user with that ID'})
        : res.json('Created the thought!')
        )
  
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : Student.deleteMany({ _id: { $in: thought.students } })
      )
      .then(() => res.json({ message: 'thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


createReaction(req, res) {
    Thought.findOneAndUpdate(
          {_id: req.body.thoughtId},
          {$addToSet: {thoughts: thought._id}},
          { runValidators: true, new: true }
        )
      
      .then((thought) =>
        !thought
        ? res
        .status(404)
        .json({message: 'No thought with that ID'})
        : res.json('Created reaction')
        )
  
      .catch((err) => res.status(500).json(err));
  },

deleteReaction (req, res) {
    Thought.findOneAndUpdate(
        {_id: req.body.thoughtId},
        {$pull: { reactions: { reactionId: req.params.reactionId }}},
        { runValidators: true, new: true }
      )
    
    .then((thought) =>
      !thought
      ? res
      .status(404)
      .json({message: 'No thought with that ID'})
      : res.json('Created reaction')
      )

    .catch((err) => res.status(500).json(err));
},
};

