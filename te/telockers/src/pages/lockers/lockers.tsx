import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { mainListItems } from './listItems';
import * as XLSX from 'xlsx';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 240;

const defaultTheme = createTheme();
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Set your desired primary color for dark mode
    },
    secondary: {
      main: '#f48fb1', // Set your desired secondary color for dark mode
    },
    background: {
      paper: '#424242', // Set the background color for paper surfaces in dark mode
      default: '#121212', // Set the default background color for dark mode
    },
  },
});

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: '100%', // Set the navbar to take 100% width
  backgroundColor: 'grey', // Set navbar background color to grey
}));

const Drawer = styled(MuiDrawer)(
  ({ theme }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      boxSizing: 'border-box',
      backgroundColor: '#e98300', // Set sidebar background color to orange
      display: 'flex', // Add display flex to center the logo
      alignItems: 'center', // Center the logo vertically
      justifyContent: 'center', // Center the logo horizontally
    },
  }),
  { shouldForwardProp: (prop) => prop !== 'open' }
);

const StatusSelect = styled(Select)({
  color: 'black',
  fontWeight: 'bold',
});

const EmptyMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.primary.main, // Set the color to the primary color (blue)
}));

const BrokenMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.error.main, // Set the color to the error color (red)
}));

const UsedMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.success.main, // Set the color to the success color (green)
}));

// Interface for the row data
interface RowData {
  IDLocker: string;
  Name: string;
  'Men/Women': string;
  Status: string;
}

export default function Locker() {
  const [rows, setRows] = React.useState<RowData[]>([
    // Your initial rows data here...
  ]);

  const handleEdit = (id: string) => {
    console.log(`Edit button clicked for id ${id}`);
  };

  const handleDelete = (id: string) => {
    setRows((prevRows) => prevRows.filter((row) => row.IDLocker !== id));
    console.log(`Delete button clicked for id ${id}`);
  };

  const tableCellStyle = {
    color: 'black',
    fontWeight: 'bold',
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'export.xlsx');
  };

  const [newRowData, setNewRowData] = React.useState<RowData>({
    IDLocker: '',
    Name: '',
    'Men/Women': '',
    Status: '', // Add status property to newRowData
  });

  const handleAddRow = () => {
    if (newRowData.IDLocker && newRowData.Name && newRowData['Men/Women'] && newRowData.Status) {
      setRows((prevRows) => [...prevRows, newRowData]);
      setNewRowData({
        IDLocker: '',
        Name: '',
        'Men/Women': '',
        Status: '', // Clear status after adding the new row
      });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
          <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
                padding: '8px',
                borderRadius: '4px',
              }}
            >
              <TextField
                id="search-lockers"
                label="Search lockers"
                type="search"
                variant="outlined"
                InputProps={{
                  startAdornment: <SearchIcon color="inherit" />,
                }}
                sx={{
                  width: '170px',
                  '& .MuiOutlinedInput-input': {
                    padding: '10px 14px', // Adjust the input text padding
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#90caf9', // Add your desired border color
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#64b5f6', // Add your desired border color on hover
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2196f3', // Add your desired border color when focused
                  },
                }}
              />
            </Box>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleExport}
              sx={{
                backgroundColor: 'green',
              }}
            >
              Export Excel
            </Button>
            {/* Add a button to toggle dark mode */}
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent">
          <img src="./logo.png" alt="Logo" style={{ width: '80%', height: 'auto' }} />
          <Divider />
          <List component="nav" sx={{ backgroundColor: '#e98300', height: '100vh' }}>
            {mainListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800],
            flexGrow: 1,
            height: 'auto',
            overflow: 'auto',
            padding: '20px',
          }}
        >
          <Toolbar />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={tableCellStyle}>IDLocker</TableCell>
                  <TableCell style={tableCellStyle}>Name</TableCell>
                  <TableCell style={tableCellStyle}>Men/Women</TableCell>
                  <TableCell style={tableCellStyle}>Status</TableCell>
                  <TableCell style={tableCellStyle}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.IDLocker}>
                    <TableCell component="th" scope="row">
                      {row.IDLocker}
                    </TableCell>
                    <TableCell>{row.Name}</TableCell>
                    <TableCell>{row['Men/Women']}</TableCell>
                    <TableCell>
                      <StatusSelect
                        value={row.Status}
                        onChange={(e) =>
                          setRows((prevRows) =>
                            prevRows.map((prevRow) =>
                              prevRow.IDLocker === row.IDLocker ? { ...prevRow, Status: e.target.value } : prevRow
                            )
                          )
                        }
                        label="Status"
                        sx={{ minWidth: '90px' }}
                      >
                        <EmptyMenuItem value="empty">Empty</EmptyMenuItem>
                        <BrokenMenuItem value="broken">Broken</BrokenMenuItem>
                        <UsedMenuItem value="used">Used</UsedMenuItem>
                      </StatusSelect>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(row.IDLocker)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => handleDelete(row.IDLocker)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <TextField
              label="IDLocker"
              value={newRowData.IDLocker}
              onChange={(e) => setNewRowData({ ...newRowData, IDLocker: e.target.value })}
              sx={{ marginRight: '10px' }}
            />
            <TextField
              label="Name"
              value={newRowData.Name}
              onChange={(e) => setNewRowData({ ...newRowData, Name: e.target.value })}
              sx={{ marginRight: '10px' }}
            />
            <TextField
              label="Men/Women"
              value={newRowData['Men/Women']}
              onChange={(e) => setNewRowData({ ...newRowData, 'Men/Women': e.target.value })}
              sx={{ marginRight: '10px' }}
            />
            <StatusSelect
              value={newRowData.Status}
              onChange={(e) => setNewRowData({ ...newRowData, Status: e.target.value })}
              label="Status"
              sx={{ marginRight: '5px' }}
            >
              <EmptyMenuItem value="empty">Empty</EmptyMenuItem>
              <BrokenMenuItem value="broken">Broken</BrokenMenuItem>
              <UsedMenuItem value="used">Used</UsedMenuItem>
            </StatusSelect>
            <Button variant="contained" color="primary" onClick={handleAddRow}>
              Add New Locker
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}