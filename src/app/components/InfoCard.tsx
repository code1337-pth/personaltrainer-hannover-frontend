import { ReactNode, ComponentType } from "react";

interface InfoCardProps {
    icon: ComponentType<{ className?: string }>;
    children: ReactNode;
}

export default function InfoCard({ icon: Icon, children }: InfoCardProps) {
    return (
        <div className="h-48 p-6 shadow-md rounded-lg text-center border-solid border-1 border-[--border-thin-color] rounded-xl w-full max-w-xs sm:w-70 xl:w-80 duration-300 hover:-translate-y-2 flex flex-col items-center justify-center text-center space-y-2 shadow-xl bg-[var(--alternative-bg-color)]">
            <Icon className="w-14 h-14 text-[var(--color-gold)]" />
            <p className="text-[var(--foreground)] text-sm font-medium">
                {children}
            </p>
        </div>
    );
}