import PropTypes from "prop-types";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";
import APIService from "../../../services/APIService";

export default function DeleteProtocol({
  selectedProtocol,
  setSelectedProtocol,
  setIsShow,
  protocols,
  currentPage,
  setCurrentPage,
}) {
  // Submit Delete Protocol Request
  const handleDelete = async () => {
    try {
      const res = await APIService.delete(`/protocols/${selectedProtocol}`);
      if (res) {
        if (protocols.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
        notifySuccess("Le protocole a bien été supprimé.");
        setSelectedProtocol();
        setIsShow({ modalDelete: false });
      }
      throw new Error();
    } catch (err) {
      if (err.request?.status === 500) {
        notifyError("La requête a échouée.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 lg:p-8">
      <div className="self-center text-center">
        <h1 className="text-lg font-semibold lg:text-xl">
          Supprimer ce protocole ?
        </h1>
        <h5 className="text-xs font-normal italic lg:text-sm">
          (ainsi que le contenu qui lui est associé.)
        </h5>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-red-500 bg-red-500 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-rose-light-0 hover:bg-rose-light-0 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-8"
          onClick={handleDelete}
        >
          Oui
        </button>
        <button
          type="button"
          className="my-4 h-fit w-fit self-center rounded-lg border-2 border-gray-300 bg-gray-300 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-slate-300 hover:bg-slate-300 disabled:border-slate-300 disabled:bg-slate-300 lg:mt-8"
          onClick={() => setIsShow({ modalDelete: false })}
        >
          Non
        </button>
      </div>
    </div>
  );
}

DeleteProtocol.propTypes = {
  selectedProtocol: PropTypes.number.isRequired,
  setSelectedProtocol: PropTypes.func.isRequired,
  setIsShow: PropTypes.func.isRequired,
  protocols: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
