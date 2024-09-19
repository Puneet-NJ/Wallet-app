import express from "express";
import { sendMoneySchema } from "@repo/zod/client";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
	res.json({ msg: "Hi" });
});

app.post("/hdfc", (req, res) => {
	// Input validation

	const validateInput = sendMoneySchema.safeParse(req.body);
	if (!validateInput.success) {
		return res.status(411).json({ msg: "Invalid inputs" });
	}

	// Generate token
	const token = jwt.sign(req.body, process.env.JWT_PASSWORD || "secret");

	res.json({ token });
});

app.post("/axis", (req, res) => {
	// Input validation
	const validateInput = sendMoneySchema.safeParse(req.body);
	if (!validateInput.success) {
		return res.status(411).json({ msg: "Invalid inputs" });
	}

	// Generate token
	const token = jwt.sign(req.body, process.env.JWT_PASSWORD || "secret");

	res.json({ token });
});

export default app;
