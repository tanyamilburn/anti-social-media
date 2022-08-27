const { Schema, Types } = require("mongoose")
//schema only
const reactionSchema = new Schema(
{
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  //formats dates to more readable with getter
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => timestamp.toLocaleString(),
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => timestamp.toLocaleString(),
  },
},
{
  toJSON: {
    getters: true,
  },
  id: false,
  timestamps: true,
}
)

module.exports = reactionSchema