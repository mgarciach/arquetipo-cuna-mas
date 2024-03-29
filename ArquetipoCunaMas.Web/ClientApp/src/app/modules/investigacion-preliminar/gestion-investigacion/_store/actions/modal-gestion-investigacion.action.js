import { buildModalGestionInvestigacion } from "../_initial-state";
import update from "immutability-helper";
/**
 * Acciones que gestionarán el contexto del buscador dentro del estado
 */
export class ModalGestionInvestigacionActions {
  /**
   * @param {() => import('../_initial-state').modalGestionInvestigacion} getState
   * @param {(state:import('../_initial-state').modalGestionInvestigacion ) => void} setState
   */
  constructor(getState, setState) {
    this.getState = getState;
    this.setState = setState;
  }

  openModalNew = () => {
    this.setState({ ...this.getState(), open: true });
  };

  closeModal = () => {
    this.setState({
      ...this.getState(),
      open: false
    });
  };

  resetModal = () => {
    this.setState(buildModalGestionInvestigacion());
  };

  // addInvestigacionArchivos = files => {
  //   const newState = update(this.getState(), {
  //     expedienteInvestigacion: {
  //       archivos: {
  //         $push: files
  //       }
  //     }
  //   });
  //   this.setState(newState);
  // };
}
