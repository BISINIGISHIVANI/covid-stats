import React, { useState, useEffect,useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { useCovidCases } from "../hooks/context/covidContext";
export const ListOfTableCovidDb = () => {
  const [products, setProducts] = useState([]);
  const toast = useRef(null);
  const [filters,setFilters]=useState(null)
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const navigate = useNavigate();
  const {covidCases}=useCovidCases()
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  const onRowSelect = (event) => {
    toast.current.show({ severity: 'info', summary: 'Product Selected', detail: `Name: ${event.data.name}`, life: 3000 });
    navigate(`/details/${event.data.name}`)
};

  const clearFilter = () => {
    initFilters();
  };
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
};
const initFilters = () => {
  setFilters({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'Country_text': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    // "Last Update": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    // "Total Cases_text": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    // "Total Recovered_text": { value: null, matchMode: FilterMatchMode.BETWEEN }
});
  setGlobalFilterValue('');
};

const renderHeader = () => {
  return (
      <div className="flex justify-content-between">
          <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
          <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
          </span>
      </div>
  );
};
const header=renderHeader()
  useEffect(() => {
    setProducts(covidCases);
  }, [covidCases]);

  const columns=[
    {field:"Country_text",tableheader:"Country"},
    {field:"Last Update",tableheader:"Date"},
    {field:"Active Cases_text",tableheader:"Active Cases"},
    {field:"Total Deaths_text",tableheader:"Total Deaths"},
  ]
  return (
    <div className="card">
      <Toast ref={toast} />
      <DataTable
        dataKey="Country_text"
        globalFilterFields={['Country_text', 'Last Update']} 
        filters={filters}
        header={header}
        emptyMessage="No customers found."
        value={products}
        removableSort
        showGridlines
        tableStyle={{ minWidth: "50rem" }}
        onRowSelect={onRowSelect}
        metaKeySelection={false}
        paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
      >
        {/* {columns.map(({field,tableheader})=>{
          return <Column
          key={field}
          field={field}
          header={tableheader}
          // filterField="Country_text" 
          sortable
          style={{ width: "25%" }}
        ></Column>
        })} */}
          <Column
          field="Country_text"
          header="Country"
          sortable
          filter
          filterField="Country_text"
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="Last Update"
          header="Date"
          sortable
          // filter
          // filterField="Last Update"
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="Active Cases_text"
          header="Total Recovered"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="Total Deaths_text"
          header="Total Deaths"
          sortable
          style={{ width: "25%" }}
        ></Column>
      </DataTable>
    </div>
  );
};
