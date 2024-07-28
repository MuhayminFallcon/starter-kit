import React, { useState, useEffect } from 'react';
import { CircularProgress, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { CompanyService, Company } from '@/services/companyService';
import EditComponent from '@components/companies/EditCompany';
import DeleteCompany from '@components/companies/DeleteCompany';

const CompanyCard = () => {
  const [data, setData] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState({});
  const [filter, setFilter] = useState({
    PageNumber: 0,
    PageSize: 10,
    TotalCount: 0,
  });

  const columns = [
    {
      field: 'number',
      headerName: '#',
      width: 70,
      renderCell: (params) => {
        const index = params.api.getAllRowIds().indexOf(params.id);
        return filter.PageNumber * filter.PageSize + index + 1;
      },
    },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'subDomain', headerName: 'SubDomain', width: 150 },
    { field: 'subscriptionEndDate', headerName: 'Subscription End Date', width: 150 },
    { field: 'emailContact', headerName: 'Email Contact', width: 200 },
    { field: 'phoneContact', headerName: 'Phone Contact', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-2 items-center">
          <EditComponent id={params.row.id} />
          <DeleteCompany companyId={params.row.id} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await CompanyService.fetchCompanies();
        setData(response.data);
        setFilter((prev) => ({
          ...prev,
          TotalCount: response.totalCount,
        }));
      } catch (error) {
        setError("Something went wrong! Can't fetch the data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sort, filter.PageNumber, filter.PageSize]);

  return (
    <Paper style={{ height: 'auto', width: '100%' }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <CircularProgress />
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
          {error}
        </div>
      ) : (
        <DataGrid
          autoHeight
          rowHeight={62}
          rows={data}
          loading={loading}
          columns={columns}
          paginationMode="server"
          pagination
          sortingMode="server"
          onSortModelChange={(model) => setSort(model.length ? model[0] : {})}
          disableRowSelectionOnClick
          disableColumnMenu
          pageSizeOptions={[10, 25, 50]}
          page={filter.PageNumber}
          pageSize={filter.PageSize}
          rowCount={filter.TotalCount}
          paginationModel={{ page: filter.PageNumber, pageSize: filter.PageSize }}
          onPaginationModelChange={(model) => {
            setFilter((prev) => ({
              ...prev,
              PageNumber: model.page,
              PageSize: model.pageSize,
            }));
          }}
          getRowId={(row) => row.id} // Ensure each row has a unique identifier
        />
      )}
    </Paper>
  );
};

export default CompanyCard;
