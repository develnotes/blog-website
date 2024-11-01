import "./label.scss";

export const Label = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="label">
            <div className="label__text">
                {children}
            </div>
        </div>
    );
};