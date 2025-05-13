// components/InfoCard.jsx

export default function InfoCard({ icon: Icon, children }) {
    return (
        <div
            className="info-card-box bg-[var(--alternative-bg-color)]"
        >
            <Icon className="w-14 h-14 text-[var(--color-gold)]" />
            <p className="text-[var(--foreground)] text-sm font-medium">
                {children}
            </p>
        </div>
    );
}
