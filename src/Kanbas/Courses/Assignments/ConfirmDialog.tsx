export default function ConfirmDialog({
                                         message,
                                         action,
                                     }: {
    message: string;
    action: () => void;
}) {
    return (
        <div
            id="wd-add-confirm-dialog"
            className="modal fade"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            {message}{" "}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancel{" "}
                        </button>
                        <button
                            onClick={action}
                            type="button"
                            data-bs-dismiss="modal"
                            className="btn btn-danger"
                        >
                            Confirm{" "}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
