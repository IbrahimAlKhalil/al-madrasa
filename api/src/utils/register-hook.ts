import {HookRegistrar, HookRegistrarCtx} from "../types/custom-hook";

export function registerHook<T>(registrar: (hook: HookRegistrar, ctx: HookRegistrarCtx) => void): T {
	return registrar as unknown as T;
}
