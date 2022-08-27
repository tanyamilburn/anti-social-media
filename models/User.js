
const { Schema, model } = require("mongoose")
const Thought = require('./Thought')


const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "please add a username"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
    
      virtuals: true,
    },
    id: false,
  }
);

//BONUS: this was trying to delete associated thoughts to a deleted user
userSchema.pre('deleteOne', { document: false, query: true }, async function() {
 
    const doc = await User.findOne(this.getFilter());
    console.log(doc)
    await Thought.deleteMany({ username: doc.username });
})

//add # friend count
userSchema.virtual("friendCount").get(function () {
  return this.friends.length
})
const User = model("user", userSchema)

module.exports = User