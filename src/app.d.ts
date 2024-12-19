// See https://svelte.dev/docs/kit/types#app.d.ts

import type { ObjectId } from "mongodb";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals { userId?: ObjectId }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
