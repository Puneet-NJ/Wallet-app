"use client";

import { signIn } from "next-auth/react";
import { Button } from "./button";
import { Logo } from "./logo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputBox } from "./input-box";

export default function () {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const onClick = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		const res = await signIn("credentials", {
			phone,
			password,
			redirect: false,
		});

		if (res?.error) {
			alert(res.error);
		} else {
			router.push("/");
		}
	};

	return (
		<div className="w-1/4 border border-gray-400 p-10 flex flex-col gap-3 shadow-xl rounded-lg">
			<Logo />

			<form className="flex flex-col gap-4">
				<InputBox
					placeholder="1234567890"
					id="phone"
					type="number"
					onChange={(e) => {
						setPhone(e.target.value);
					}}
					min={"10000000000"}
				/>

				<InputBox
					id="password"
					type="text"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>

				<Button onClick={(e) => onClick(e)}>Access</Button>
			</form>
		</div>
	);
}
