const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

// Static signup method
userSchema.statics.signup = async function (email, password) {
	// Validation
	if (!email || !password) {
		throw Error("All fields must be filled");
	}
	if (!validator.isEmail(email)) {
		throw Error("The email address is invalid");
	}
	if (!validator.isStrongPassword(password)) {
		throw Error(
			"Your password is not strong enough. It must contain at least 1 uppercase character, 1 lowercase character, 1 number, 1 symbol and 8 or more characters"
		);
	}

	// Check if email address is unique
	const exists = await this.findOne({ email });

	if (exists) {
		throw Error("An account with this email address already exists");
	}

	// Password Hashing
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = await this.create({ email, password: hash });

	return user;
};

// Static Login Method
userSchema.statics.login = async function (email, password) {
	if (!email || !password) {
		throw Error("All fields must be filled");
	}

	// Find user with specific email address
	const user = await this.findOne({ email });

	if (!user) {
		throw Error("Incorrect email: this email doesn't exist");
	}

	// Comparing both passwords
	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw Error("Incorrect password");
	}

	return user;
};

module.exports = mongoose.model("User", userSchema);
