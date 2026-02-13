import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border border-white/20 bg-white/60 backdrop-blur-md shadow-sm dark:bg-black/40 dark:border-white/10 transition-all duration-300",
                hoverEffect && "hover:shadow-lg hover:scale-[1.01] hover:bg-white/70 dark:hover:bg-black/50",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
