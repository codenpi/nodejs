const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const UserSchema = new Schema({
  username: {
		type: String,
		required: [true, '{PATH} alanı zorunludur.'],
    unique: [true, '{PATH} user defined in the system']
	},
	password: {
		type: String,
    required: [true, '{PATH} alanı zorunludur.'],
		maxlength: [60, '{PATH} alanı {VALUES}, {MINLENGTH} maksimum olmalıdır. '],
		minlength: [5, '{PATH} alanı {VALUES}, {MINLENGTH} en az olmalıdır. ']
	}
});

module.exports  = mongoose.model('user', UserSchema);
