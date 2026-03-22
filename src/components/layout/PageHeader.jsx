export function PageHeader({ title, description, action }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-primary-100">
            <div>
                <h1 className="text-3xl font-bold text-primary-900 tracking-tight">{title}</h1>
                {description && <p className="text-primary-600 mt-2">{description}</p>}
            </div>
            {action && <div className="mt-4 md:mt-0">{action}</div>}
        </div>
    );
}
