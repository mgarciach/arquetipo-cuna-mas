import React, { useState, useReducer } from "react";
import ModalFormContainer from "app/core/components/modal-form-container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { buildExpedienteInvestigacion } from "../../_store/_initial-state";
import FormDatosGenerales from "./form-datos-generales";
import { makeStyles } from "@material-ui/core/styles";
import GridExpediente from "../grids/grid-expediente";
import GridInvestigado from "../grids/grid-investigado";
import GridArchivo from "../grids/grid-archivo";
import update from "immutability-helper";
import FormArchivo from "./form-archivo";
import FormAnexoExpediente from "./form-anexo-expediente";
import FormInvestigado from "./form-investigado";
import GridRequerimiento from "../grids/grid-requerimiento";
import { FORM_TYPE } from "app/core/enums/enums";
import confirm from "app/core/components/confirm";
import FormRequerimiento from "./form-requerimiento";

const handleClose = (formType, close) => () => {
  if (formType == FORM_TYPE.CONSULTAR) {
    close();
  } else {
    confirm("Va a cerrar el Formulario. ¿Continuar?").then(confirm => {
      if (confirm) close();
    });
  }
};

const useStyles = makeStyles(theme => ({
  tabContainer: {
    marginTop: theme.spacing(3)
  }
}));

/**
 * @param {import("../../_store/_initial-state").IFormGestionInvestigacion} form
 */
const FormGestionInvestigacionReducer = (form, action) => {
  switch (action.type) {
    case "RESET":
      return buildExpedienteInvestigacion();
    case "CHANGE-INPUT":
      return { ...form, [action.payload.prop]: action.payload.value };
    case "PUSH-FILES":
      return update(form, {
        archivos: {
          $push: action.payload.files
        }
      });
    case "PUSH-INVESTIGADO":
      return update(form, {
        investigados: {
          $push: [action.payload.investigado]
        }
      });
    case "PUSH-ANEXO-EXPEDIENTE":
      return update(form, {
        expedientes: {
          $push: [action.payload.expediente]
        }
      });
    case "PUSH-REQUERIMIENTO":
      return update(form, {
        requerimientos: {
          $push: [action.payload.requerimiento]
        }
      });
  }
};

/**
 *
 * @param {{
 *  modal: import('../../_store/_initial-state').modalGestionInvestigacion,
 *  store: import('../../_store/gestion-investigacion.store').GestionInvestigacionStore,
 *  modalFormArchivo: import('../../_store/_initial-state').modalFormArchivo,
 *  modalFormAnexoExpediente: import('../../_store/_initial-state').modalFormAnexoExpediente,
 *  modalFormInvestigado: import('../../_store/_initial-state').modalFormInvestigado,
 *  modalFormRequerimiento: import('../../_store/_initial-state').modalFormRequerimiento
 * }} param0
 */
const FormGestionInvestigacion = ({
  modal,
  store,
  modalFormArchivo,
  modalFormAnexoExpediente,
  modalFormInvestigado,
  modalFormRequerimiento
}) => {
  const [tab, setTab] = useState(0);

  const [form, dispatch] = useReducer(
    FormGestionInvestigacionReducer,
    buildExpedienteInvestigacion()
  );

  const classes = useStyles();

  const handleExited = () => {
    setTab(0);
    dispatch({ type: "RESET" });
    store.modalGestionInvestigacionActions.resetModal();
  };

  return (
    <>
      <ModalFormContainer
        open={modal.open}
        onClose={handleClose(
          modal.formType,
          store.modalGestionInvestigacionActions.closeModal
        )}
        title={modal.title}
        onExited={handleExited}
        onSubmit={form => {
          console.log(form);
        }}
        loading={modal.loading}
        maxWidth="lg"
        fullWidth
        showSubmitButton={modal.formType != FORM_TYPE.CONSULTAR}
      >
        <Tabs
          value={tab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, value) => setTab(value)}
        >
          <Tab label="Datos Generales" />
          <Tab label="Datos de la Hoja de Trámite" />
          <Tab label="Datos del investigado(a)" />
          <Tab label="Archivos Adjuntos" />
          <Tab label="Requerimientos" />
        </Tabs>
        <div className={classes.tabContainer}>
          {tab == 0 && (
            <FormDatosGenerales
              form={form}
              setInput={(prop, value) => {
                dispatch({
                  type: "CHANGE-INPUT",
                  payload: { prop, value }
                });
              }}
            />
          )}
          {tab == 1 && (
            <div>
              <GridExpediente
                expedientes={form.expedientes}
                onClickNew={store.modalFormAnexoExpedienteActions.openModal}
              />
            </div>
          )}
          {tab == 2 && (
            <GridInvestigado
              investigados={form.investigados}
              onClickNew={store.modalFormInvestigacionActions.openModal}
            />
          )}
          {tab == 3 && (
            <GridArchivo
              archivos={form.archivos}
              onClickUpload={store.modalFormArchivoActions.openModal}
            />
          )}
          {tab == 4 && (
            <GridRequerimiento
              requerimientos={form.requerimientos}
              onClickNew={store.modalFormRequerimientoActions.openModal}
            />
          )}
        </div>
      </ModalFormContainer>

      <FormAnexoExpediente
        store={store}
        modal={modalFormAnexoExpediente}
        OnSaveAnexoExpediente={expediente =>
          dispatch({
            type: "PUSH-ANEXO-EXPEDIENTE",
            payload: { expediente }
          })
        }
      />

      <FormInvestigado
        store={store}
        modal={modalFormInvestigado}
        OnSaveInvestigado={investigado =>
          dispatch({
            type: "PUSH-INVESTIGADO",
            payload: { investigado }
          })
        }
      />

      <FormArchivo
        store={store}
        modal={modalFormArchivo}
        onUploadFinish={files =>
          dispatch({ type: "PUSH-FILES", payload: { files } })
        }
      />

      <FormRequerimiento
        store={store}
        modal={modalFormRequerimiento}
        onUploadFinish={requerimiento =>
          dispatch({ type: "PUSH-REQUERIMIENTO", payload: { requerimiento } })
        }
      />
    </>
  );
};

export default FormGestionInvestigacion;
