export const Loader = ({ loading, full }: { loading: boolean, full?: boolean }) => {

    if (!loading) {
        return null;
    }

    if (!full) {
        return (
            <div className="loading">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="loading-full">
            <div className="loading-full__content">
                <div className="loading-full__content__wrapper">
                    <div className="loader"></div>
                </div>
            </div>
        </div>
    );
}