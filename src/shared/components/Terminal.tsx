import type { ReactNode } from "react";

import { cn } from "#/shared/lib/utils";

function Terminal({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="terminal"
			className={cn(
				"w-full border border-border bg-background font-mono",
				className,
			)}
			{...props}
		/>
	);
}

function TerminalHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="terminal-header"
			className={cn(
				"flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2",
				className,
			)}
			{...props}
		/>
	);
}

function TerminalWindowControls({ className }: { className?: string }) {
	return (
		<div
			data-slot="terminal-window-controls"
			className={cn("flex gap-1.5", className)}
		>
			<span className="size-3 rounded-full bg-destructive/70" />
			<span className="size-3 rounded-full bg-yellow-400/70" />
			<span className="size-3 rounded-full bg-green-400/70" />
		</div>
	);
}

function TerminalTitle({ children, className }: { children: ReactNode; className?: string }) {
	return (
		<span
			data-slot="terminal-title"
			className={cn("select-none text-xs text-muted-foreground", className)}
		>
			{children}
		</span>
	);
}

function TerminalProgress({ value, className }: React.ComponentProps<"div"> & { value: number }) {
	const clampedValue = Math.min(Math.max(value, 0), 100);

	return (
		<div
			data-slot="terminal-progress"
			className={cn("h-px w-full bg-border", className)}
		>
			<div
				className="h-full bg-foreground"
				style={{ width: `${clampedValue}%` }}
			/>
		</div>
	);
}

function TerminalBody({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="terminal-body"
			className={cn("px-4 py-4", className)}
			{...props}
		/>
	);
}

function TerminalFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="terminal-footer"
			className={cn("border-t border-border px-4 py-1.5", className)}
			{...props}
		/>
	);
}

export {
	Terminal,
	TerminalHeader,
	TerminalWindowControls,
	TerminalTitle,
	TerminalProgress,
	TerminalBody,
	TerminalFooter,
};
