import { motion } from "framer-motion";

export default function AletraLogo() {
	return (
		<motion.div
			layout
			initial={{ opacity: 0, filter: "blur(4px)" }}
			animate={{ opacity: 1, filter: "blur(0px)" }}
			className="space-y-4 flex flex-col items-center w-full"
		>
			<pre className="text-left text-[10px] sm:text-xs md:text-sm text-foreground font-bold leading-tight select-none drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] dark:drop-shadow-[0_0_8px_rgba(96,215,207,0.4)]">
				{`   ▄████████  ▄█          ▄████████     ███        ▄████████    ▄████████ 
  ███    ███ ███         ███    ███ ▀█████████▄   ███    ███   ███    ███ 
  ███    ███ ███         ███    █▀     ▀███▀▀██   ███    ███   ███    ███ 
  ███    ███ ███        ▄███▄▄▄         ███   ▀  ▄███▄▄▄▄██▀   ███    ███ 
▀███████████ ███       ▀▀███▀▀▀         ███     ▀▀███▀▀▀▀▀   ▀███████████ 
  ███    ███ ███         ███    █▄      ███     ▀███████████   ███    ███ 
  ███    ███ ███▌    ▄   ███    ███     ███       ███    ███   ███    ███ 
  ███    █▀  █████▄▄██   ██████████    ▄████▀     ███    ███   ███    █▀  
             ▀                                    ███    ███              `}
			</pre>
		</motion.div>
	);
}
