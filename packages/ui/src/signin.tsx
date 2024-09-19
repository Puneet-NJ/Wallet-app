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
		<div className="bg-[rgba(150,150,150,1)] w-[80%] md:w-1/5 py-10 px-7 flex flex-col gap-3 shadow-xl rounded-lg">
			<div className="w-full mb-3">
				<Logo />
			</div>

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
					type="password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>

				<div className="mt-3 w-full">
					<Button onClick={(e) => onClick(e)}>Access</Button>
				</div>
			</form>
		</div>
	);
}
