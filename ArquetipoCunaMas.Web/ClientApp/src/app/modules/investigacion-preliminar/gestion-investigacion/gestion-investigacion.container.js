import React from "react";
import FormBuscarInvestigacion from "./components/forms/form-buscar-investigacion";
import { intialState } from "./_store/_initial-state";
import { GestionInvestigacionStore } from "./_store/gestion-investigacion.store";
import Card from "@material-ui/core/Card";
import DataTable from "app/core/components/datatable";
import FormGestionInvestigacion from "./components/forms/form-gestion-investigacion";
import FormAnexoExpediente from "./components/forms/form-anexo-expediente";
import FormInvestigado from "./components/forms/form-investigado";

class GestionInvestigacionContainer extends React.Component {
  state = { ...intialState };
  store = new GestionInvestigacionStore(
    () => this.state,
    this.setState.bind(this)
  );

  componentDidMount() {
    this.AddColumns().then(() => {
      this.store.buscadorInvestigacionActions.asyncFetchInvestigaciones();
      this.store.buscadorInvestigacionActions.asyncFetchFilters();
    });
  }

  AddColumns = () => {
    const columns = [
      { label: "Alerta", render: (item, loading) => <div>alerta</div> },
      {
        label: "Acciones",
        render: (item, loading) => <div>asdasd</div>
      }
    ];

    return this.store.buscadorInvestigacionActions.addColumns(columns);
  };

  handleLoadData = e => {
    this.store.buscadorInvestigacionActions.asyncFetchInvestigaciones(
      e.page,
      e.pageSize
    );
  };

  handleSearch = form => {
    const { pagination } = this.state.buscadorInvestigacion;
    this.store.buscadorInvestigacionActions.asyncFetchInvestigaciones(
      1,
      pagination.pageSize,
      form
    );
  };

  render() {
    const {
      filterLists,
      loading,
      tableDef,
      pagination
    } = this.state.buscadorInvestigacion;
    const {
      modalGestionInvestigacion,
      modalFormAnexoExpediente,
      modalFormInvestigado
    } = this.state;
    return (
      <>
        <FormBuscarInvestigacion
          filterLists={filterLists}
          onSearch={this.handleSearch}
          onClear={this.handleSearch}
          onClickNew={this.store.modalGestionInvestigacionActions.openModalNew}
        />
        <Card elevation={8}>
          <DataTable
            loading={loading}
            tableDef={tableDef}
            pagination={pagination}
            onLoadData={this.handleLoadData}
          />
        </Card>
        <FormGestionInvestigacion
          modal={modalGestionInvestigacion}
          store={this.store}
        />

        <FormAnexoExpediente
          store={this.store}
          modal={modalFormAnexoExpediente}
        />

        <FormInvestigado store={this.store} modal={modalFormInvestigado} />
      </>
    );
  }
}

export default GestionInvestigacionContainer;
