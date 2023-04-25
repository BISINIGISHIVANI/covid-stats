import React, { useState, useRef, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useCovidCases } from '../hooks/context/covidContext';
import { useNavigate } from 'react-router-dom';
import { FilterMatchMode} from 'primereact/api';
import { InputText } from 'primereact/inputtext';

export const ListOfTableCovidDb=()=> {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'Country_text': { value: null, matchMode: FilterMatchMode.STARTS_WITH }
    })
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const toast = useRef(null);
    const {covidCases}=useCovidCases()
    const navigate=useNavigate()
    const onRowSelect = (event) => {
        toast.current.show({ severity: 'info', summary: 'Product Selected',
         detail: `Name: ${event.data["Country_text"]}`, life: 3000 });
      navigate(`/details/${event.data["Country_text"]}`)
    };
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const headerForFilter=renderHeader()
    useEffect(() => {
        setProducts(covidCases)
    },[covidCases]);

    return (
        <div className="card">
            <Toast ref={toast} />
            <DataTable value={products} selectionMode="single" 
                    selection={selectedProduct} 
                    onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="Country_text"
                    sortMode="multiple"
                    onRowSelect={onRowSelect} metaKeySelection={false} 
                    paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                    filters={filters} 
                    globalFilterFields={['Country_text']}
                    header={headerForFilter} emptyMessage="No customers found."
                    >
                <Column field="Country_text" header="Country"sortable></Column>
                <Column field="Last Update" header="Date"></Column>
                <Column field="Total Cases_text" header="Total Cases"></Column>
                <Column field="Total Deaths_text" header="Deaths"></Column>
                 <Column field="Total Recovered_text" header="Recovered"></Column>
            </DataTable>
        </div>
    );
}