export const Overlay = ({ open, zIndex=20000, children }: {open: boolean, zIndex?: number, children: React.ReactNode}) => {

    if (!open) return null;

    return <div className="overlay" style={{ zIndex }}>
        { children }
    </div>
};