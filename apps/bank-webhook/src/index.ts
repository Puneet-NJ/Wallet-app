import express from "express";
import { bodySchema } from "./zod";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

app.post("/hdfc", (req, res) => {
	// Input validation
	const validateInput = bodySchema.safeParse(req.body);
	if (!validateInput.success) {
		return res.status(411).json({ msg: "Invalid inputs" });
	}

	// Generate token
	const token = jwt.sign(req.body, process.env.JWT_PASSWORD || "secret");

	res.json({ token });
});

app.post("/axis", (req, res) => {
	// Input validation
	const validateInput = bodySchema.safeParse(req.body);
	if (!validateInput.success) {
		return res.status(411).json({ msg: "Invalid inputs" });
	}

	// Generate token
	const token = jwt.sign(req.body, process.env.JWT_PASSWORD || "secret");

	res.json({ token });
});

app.listen(3002);
