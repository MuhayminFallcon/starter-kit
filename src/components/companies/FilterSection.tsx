import { Box, Typography, TextField, Button, Collapse } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface FilterSectionProps {
  openCollapse: boolean;
  filterValues: {
    name: string;
    subDomain: string;
    heroTitle: string;
    heroDescription: string;
    location: string;
    emailContact: string;
    phoneContact: string;
  };
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetFilter: () => void;
}

  export default function FilterSection({
                                        openCollapse,
                                        filterValues,
                                        handleFilterChange,
                                        handleResetFilter,
                                      }: FilterSectionProps) {
  return (
    <Box>
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        <Box mt={2} p={6} borderRadius={1} sx={{ bgcolor: 'background.paper' }}>
          <Typography variant="h5" gutterBottom className="flex gap-4 items-center">
            Filter
            <Button variant="text" startIcon={<RestartAltIcon />} onClick={handleResetFilter} className="h-10">
              Reset filter
            </Button>
          </Typography>
          <div className="flex gap-3">
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              value={filterValues.name}
              onChange={handleFilterChange}
            />
            <TextField
              name="subDomain"
              label="Sub domain"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              value={filterValues.subDomain}
              onChange={handleFilterChange}
            />
          </div>
          <div className="flex gap-3">
            <TextField
              name="heroTitle"
              label="Hero Title"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              value={filterValues.heroTitle}
              onChange={handleFilterChange}
            />
            <TextField
              name="heroDescription"
              label="Hero Description"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              value={filterValues.heroDescription}
              onChange={handleFilterChange}
            />
          </div>
          <div className="flex gap-3">
            <TextField
              name="location"
              label="Location"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              value={filterValues.location}
              onChange={handleFilterChange}
            />
            <TextField
              name="emailContact"
              label="Email Contact"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              value={filterValues.emailContact}
              onChange={handleFilterChange}
            />
            <TextField
              name="phoneContact"
              label="Phone Contact"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              value={filterValues.phoneContact}
              onChange={handleFilterChange}
            />
          </div>
        </Box>
      </Collapse>
    </Box>
  );
}
