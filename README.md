# WalletPe

A website wherein a user could come and add money to their wallet through netbanking and then could use that money in the wallet to transfer it to their friends.

## Architecture

<img width="817" alt="Screenshot 2024-09-17 at 12 17 08 PM" src="https://github.com/user-attachments/assets/54b7277d-fcee-42c4-8ac0-e14a6a1b602b">

## How does Adding Money to your wallet work

1. We have our main website of WalletPe through which the user can interact. Hence, when user chooses to add money to his wallet, a request with data is first sent to a bank-api which will generate a token out of it and gives to back as response.
2. The WalletPe website then updates the database saying an on ramp transaction is initiated and hence an entry is made in onRampTxn table with status set to "Processing" and then the token is further sent to netbanking website.
3. The netbanking website decodes the token to get the data and processes the transaction, and then another token is generated and sent to the <b>WalletPe webhook</b>.
4. The WalletPe webhook will verify the token(as it will have the secret through which the token was generated) and get all the data and then update the balance and the onRampTransactions table in the database.

### Why WalletPe webhook?

We could have used our main WalletPe's backend to handle the request coming from netbanking website but we out-sourced it to a webhook, why? Our Backend already handles alot of requests from the user and if we start handling even the transactions/updations the load might increase.

<img width="1040" alt="Screenshot 2024-09-17 at 12 13 38 PM" src="https://github.com/user-attachments/assets/0b8e9de6-052d-4894-9408-e4b59c139c71">

## How does Sending Money to your friends work?

WalletPe backend can make this request. Hence, send a request from WalletPe backend to:

1. Deduct x amount from sender.
2. Add x amount to receiver.
3. Update transfers table in the database.

<img width="793" alt="Screenshot 2024-09-17 at 12 22 42 PM" src="https://github.com/user-attachments/assets/2b3962aa-9d4a-45a5-a07f-6f1bad33d51a">

## Stack

- [Next.js](https://nextjs.org/) – Full-stack framework
- [TypeScript](https://www.typescriptlang.org/) – language
- [Express.js](https://expressjs.com/) – Backend framework
- [Tailwind](https://tailwindcss.com/) – CSS
- [Postgres](https://www.postgresql.org/) – database
- [NextAuth.js](https://next-auth.js.org/) – auth
- [Turborepo](https://turbo.build/repo) – monorepo
- [Zod](https://zod.dev/) – Input validation
