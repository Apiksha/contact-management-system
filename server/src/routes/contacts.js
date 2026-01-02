const express = require('express');
const mongoose = require('mongoose');
const Contact = require('../models/Contact');

const router = express.Router();

// Phone validation rules by country code
const PHONE_RULES = {
	'+1': { minLength: 10, maxLength: 10, name: 'USA/Canada' },
	'+44': { minLength: 10, maxLength: 10, name: 'UK' },
	'+91': { minLength: 10, maxLength: 10, name: 'India' },
	'+61': { minLength: 9, maxLength: 9, name: 'Australia' },
	'+81': { minLength: 10, maxLength: 10, name: 'Japan' },
	'+86': { minLength: 11, maxLength: 11, name: 'China' },
	'+49': { minLength: 10, maxLength: 11, name: 'Germany' },
	'+33': { minLength: 9, maxLength: 9, name: 'France' },
	'+39': { minLength: 9, maxLength: 10, name: 'Italy' },
	'+34': { minLength: 9, maxLength: 9, name: 'Spain' },
	'+7': { minLength: 10, maxLength: 10, name: 'Russia' },
	'+55': { minLength: 10, maxLength: 11, name: 'Brazil' },
	'+52': { minLength: 10, maxLength: 10, name: 'Mexico' },
	'+82': { minLength: 9, maxLength: 10, name: 'South Korea' },
	'+27': { minLength: 9, maxLength: 9, name: 'South Africa' },
	'+971': { minLength: 9, maxLength: 9, name: 'UAE' },
	'+65': { minLength: 8, maxLength: 8, name: 'Singapore' },
	'+64': { minLength: 8, maxLength: 10, name: 'New Zealand' },
	'+31': { minLength: 9, maxLength: 9, name: 'Netherlands' },
	'+46': { minLength: 9, maxLength: 10, name: 'Sweden' },
};

function validatePhoneNumber(countryCode, phone) {
	const cleanPhone = phone.replace(/[\s\-()]/g, '');
	
	if (!/^\d+$/.test(cleanPhone)) {
		return { valid: false, message: 'Phone number must contain only digits' };
	}

	const rules = PHONE_RULES[countryCode];
	if (!rules) {
		// Default validation for unknown country codes
		if (cleanPhone.length < 7 || cleanPhone.length > 15) {
			return { valid: false, message: 'Phone number must be between 7 and 15 digits' };
		}
		return { valid: true };
	}

	if (cleanPhone.length < rules.minLength || cleanPhone.length > rules.maxLength) {
		if (rules.minLength === rules.maxLength) {
			return {
				valid: false,
				message: `${rules.name} phone number must be exactly ${rules.minLength} digits`
			};
		} else {
			return {
				valid: false,
				message: `${rules.name} phone number must be ${rules.minLength}-${rules.maxLength} digits`
			};
		}
	}

	return { valid: true };
}

router.get('/', async (req, res, next) => {
	try {
		const contacts = await Contact.find({}).sort({ createdAt: -1 });
		res.json(contacts);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!mongoose.isValidObjectId(id)) {
			res.status(400);
			throw new Error('Invalid contact id');
		}

		const contact = await Contact.findById(id);
		if (!contact) {
			res.status(404);
			throw new Error('Contact not found');
		}

		res.json(contact);
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { name, email, countryCode, phone, message } = req.body;
		if (!name || !name.trim()) {
			res.status(400);
			throw new Error('Name is required');
		}
		if (!email || !email.trim()) {
			res.status(400);
			throw new Error('Email is required');
		}
		if (!phone || !phone.trim()) {
			res.status(400);
			throw new Error('Phone is required');
		}

		// Validate phone number format
		const code = countryCode?.trim() || '+1';
		const phoneValidation = validatePhoneNumber(code, phone.trim());
		if (!phoneValidation.valid) {
			res.status(400);
			throw new Error(phoneValidation.message);
		}

		const contact = await Contact.create({
			name: name.trim(),
			email: email.trim(),
			countryCode: code,
			phone: phone.trim(),
			message: message?.trim() || undefined,
		});

		res.status(201).json(contact);
	} catch (err) {
		next(err);
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!mongoose.isValidObjectId(id)) {
			res.status(400);
			throw new Error('Invalid contact id');
		}

		const { name, email, countryCode, phone, message } = req.body;
		if (name !== undefined && !String(name).trim()) {
			res.status(400);
			throw new Error('Name cannot be empty');
		}
		if (email !== undefined && !String(email).trim()) {
			res.status(400);
			throw new Error('Email cannot be empty');
		}
		if (phone !== undefined && !String(phone).trim()) {
			res.status(400);
			throw new Error('Phone cannot be empty');
		}

		// Validate phone number if being updated
		if (phone !== undefined) {
			const code = countryCode?.trim() || '+1';
			const phoneValidation = validatePhoneNumber(code, String(phone).trim());
			if (!phoneValidation.valid) {
				res.status(400);
				throw new Error(phoneValidation.message);
			}
		}

		const updated = await Contact.findByIdAndUpdate(
			id,
			{
				...(name !== undefined ? { name: String(name).trim() } : {}),
				...(email !== undefined ? { email: String(email).trim() } : {}),
				...(countryCode !== undefined ? { countryCode: String(countryCode).trim() || '+1' } : {}),
				...(phone !== undefined ? { phone: String(phone).trim() } : {}),
				...(message !== undefined ? { message: String(message).trim() || undefined } : {}),
			},
			{ new: true }
		);

		if (!updated) {
			res.status(404);
			throw new Error('Contact not found');
		}

		res.json(updated);
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!mongoose.isValidObjectId(id)) {
			res.status(400);
			throw new Error('Invalid contact id');
		}

		const deleted = await Contact.findByIdAndDelete(id);
		if (!deleted) {
			res.status(404);
			throw new Error('Contact not found');
		}

		res.json({ message: 'Deleted' });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
