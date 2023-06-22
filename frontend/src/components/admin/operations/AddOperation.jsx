import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { operationSchema } from "../../../services/validators";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";
import APIService from "../../../services/APIService";
import FormError from "../../FormError";

export default function AddOperation() {
  const [operations, setOperations] = useState(null);
  const [operationInfos, setOperationInfos] = useState({
    protocol_name: "",
    operation_id: "",
  });
  const [errors, setErrors] = useState(null);

  // Fetch Operations data
  useEffect(() => {
    APIService.get(`/operations`)
      .then((res) => {
        setOperations(res.data);
      })
      .catch((err) => {
        if (err.request.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      });
  }, []);

  // Submit Add Operation Request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (operationSchema.isValid)
      try {
        const res = await APIService.post(`/operations`, operationInfos);
        if (res) {
          notifySuccess("L'opération a été ajouté.");
        } else throw new Error();
      } catch (err) {
        if (err.request.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée.`);
        }
      }
  };

  const handleChange = async (e) => {
    setOperationInfos({
      ...operationInfos,
      [e.target.name]: e.target.value,
    });
    try {
      const isValid = await operationSchema.validate(operationInfos, {
        abortEarly: false,
      });
      if (isValid) {
        setErrors(null);
      }
      throw new Error();
    } catch (err) {
      setErrors(err.errors);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="self-start pl-4 text-lg font-semibold lg:pl-8 lg:text-xl">
        Une nouvelle operation ?
      </h1>
      <form
        action="addOperation"
        className="gap-4 space-y-4 p-4 lg:p-8"
        onSubmit={handleSubmit}
      >
        {errors && <FormError errors={errors} />}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-base">
            Nom de l'opération
          </label>
          <input
            type="text"
            name="operation_name"
            id="operation_name"
            placeholder="Nom de l'opération"
            required=""
            className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="mb-4 h-fit w-fit rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300"
          >
            Ajouter
          </button>
        </div>
      </form>
      <ToastContainer limit={1} />
    </div>
  );
}
