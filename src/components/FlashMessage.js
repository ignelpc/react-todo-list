import { useEffect, useState } from "react";

function FlashMessage({ type, message }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!message) {
            setVisible(false);
            return
        }

        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [message]);

    return (
        <>
            {visible && (
                <div className={`alert alert-${type} text-center`}>
                    {message}
                </div>
            )}
        </>
    )
}

export default FlashMessage;