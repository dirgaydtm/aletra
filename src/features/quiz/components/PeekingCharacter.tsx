import { useEffect, useRef } from "react";
import { cn } from "#/shared/lib/utils";

export function PeekingCharacter({ classname }: { classname?: string }) {
	const eyeRef = useRef<HTMLDivElement>(null);
	const leftPupilRef = useRef<HTMLDivElement>(null);
	const rightPupilRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let animationFrameId: number;
		const target = { x: 0, y: 0 };
		const current = { x: 0, y: 0 };

		const handleMouseMove = (e: MouseEvent) => {
			if (!eyeRef.current) return;
			const rect = eyeRef.current.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const dx = e.clientX - centerX;
			const dy = e.clientY - centerY;
			const distance = Math.sqrt(dx * dx + dy * dy);
			const angle = Math.atan2(dy, dx);

			const maxDistance = 14;
			const targetDistance = Math.min(distance / 200, 1) * maxDistance;

			target.x = Math.cos(angle) * targetDistance;
			target.y = Math.sin(angle) * targetDistance;
		};

		const animate = () => {
			current.x += (target.x - current.x) * 0.08;
			current.y += (target.y - current.y) * 0.08;

			const transform = `translate(${current.x}px, ${current.y}px)`;
			if (leftPupilRef.current)
				leftPupilRef.current.style.transform = transform;
			if (rightPupilRef.current)
				rightPupilRef.current.style.transform = transform;

			animationFrameId = requestAnimationFrame(animate);
		};

		window.addEventListener("mousemove", handleMouseMove);
		animationFrameId = requestAnimationFrame(animate);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return (
		<div
			className={cn(
				"absolute -bottom-210 translate-y-1/2 z-0 group not-md:hidden dark:hidden",
				classname,
			)}
		>
			<div className="w-screen aspect-square bg-foreground rounded-full flex items-start justify-center gap-6 group-hover:translate-y-[8%] sm:gap-10 transition-transform duration-300 ease-in-out">
				<div
					ref={eyeRef}
					className="w-16 h-16 sm:w-20 sm:h-20 bg-background dark:bg-foreground rounded-full flex items-center justify-center relative overflow-hidden border-2 border-foreground"
				>
					<div
						ref={leftPupilRef}
						className="w-7 h-7 sm:w-8 sm:h-8 bg-foreground dark:bg-background rounded-full relative"
					>
						<div className="w-2.5 h-2.5 bg-background rounded-full absolute top-1.5 left-1.5" />
					</div>
				</div>

				<div className="w-16 h-16 sm:w-20 sm:h-20 bg-background dark:bg-foreground rounded-full flex items-center justify-center relative overflow-hidden border-2 border-foreground">
					<div
						ref={rightPupilRef}
						className="w-7 h-7 sm:w-8 sm:h-8 bg-foreground dark:bg-background rounded-full relative"
					>
						<div className="w-2.5 h-2.5 bg-background rounded-full absolute top-1.5 left-1.5" />
					</div>
				</div>
			</div>
		</div>
	);
}
