const { Thought, User } = require("../models")

module.exports = {
    // Get all user
    getUsers(req, res) {
      User.find()
      .populate("thoughts")
      .then((users) => {
          res.json({ success: true, count: users.length, data: users });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // Get a single user
    getSingleUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate("thoughts")
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // create a new user
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
          new: true,
          runValidators: true,
        })
          .then((user) => {
            if (!user) {
              res.status(404).json({ message: "No user with that ID" })
            }
          })
          .then(() => res.json({ message: "User and associated apps updated!" }))
          .catch((err) => res.status(500).json(err))
      },
    // Delete a user and remove them from the course
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>{
        if (!user) {
            res.status(404).json({ message: "No user with that ID" })
          }
        })
        .then(() => res.json({ message: "User and associated apps deleted"}))
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // Add a friend to a user
    addFriend(req, res) {
      console.log('You are adding a friend');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID' })
            : res.json(user)
        )
        .then(() => res.json({ message: "Friend added!" }))
        .catch((err) => res.status(500).json(err));
    },
    // Remove  friend from a user
    removeFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { friendId: req.params.friendId } } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No users found' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  };