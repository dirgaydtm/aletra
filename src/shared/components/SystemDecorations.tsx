import { Terminal } from "lucide-react";

export function SystemDecorations() {
	return (
		<>
			<div className="fixed top-4 left-4 text-[10px] text-muted-foreground/40 hidden md:block select-none pointer-events-none z-50">
				SYS_ID: 0x8A2
				<br />
				MEM_ALLOC: 640K OK
				<br />
				CONNECTION: SECURE
			</div>
			<div className="fixed bottom-4 right-4 text-[10px] text-muted-foreground/40 hidden md:block text-right select-none pointer-events-none z-50">
				<Terminal className="inline-block size-3 mb-1 opacity-50" />{" "}
				_ALETRA_CORE
				<br />
				BUILD 2026.1
			</div>
		</>
	);
}
