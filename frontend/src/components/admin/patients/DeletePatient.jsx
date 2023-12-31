import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import APIService from "../../../services/APIService";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";

export default function DeletePatient({
  selectedPatient,
  setSelectedPatient,
  setIsShow,
}) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (selectedPatient !== "") {
      try {
        const res = await APIService.delete(`/users/${selectedPatient}`);
        if (res) {
          notifySuccess("Le patient a été supprimé");
          setSelectedPatient();
          setIsShow({ modalDelete: false });
          navigate("/admin/patients");
        }
        throw new Error();
      } catch (error) {
        if (error.request?.status === 500) {
          notifyError("La requête a échouée.");
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 lg:p-8">
      <div className="self-center text-center">
        <h1 className="text-lg font-semibold lg:text-xl">
          Supprimer ce patient ?
        </h1>
        <h5 className="text-xs font-normal italic lg:text-sm">
          (ainsi que les interventions qui lui sont associées.)
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

DeletePatient.propTypes = {
  selectedPatient: PropTypes.number.isRequired,
  setSelectedPatient: PropTypes.func.isRequired,
  setIsShow: PropTypes.func.isRequired,
};
