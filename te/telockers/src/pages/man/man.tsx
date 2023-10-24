import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
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
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import * as XLSX from 'xlsx';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon
import InputAdornment from '@mui/material/InputAdornment';
import { mainListItems } from './listItems';

const drawerWidth = 240;

const defaultTheme = createTheme();
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      paper: '#424242',
      default: '#121212',
    },
  },
});

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: '100%',
  backgroundColor: 'grey',
}));

const Drawer = styled(MuiDrawer)(
  ({ theme }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      boxSizing: 'border-box',
      backgroundColor: '#e98300',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
  { shouldForwardProp: (prop) => prop !== 'open' }
);

export default function Dashboard() {
  const [rows, setRows] = useState<Man[]>([]);

  useEffect(() => {
    // Fetch data from the /api/man route
    fetch('/api/man')
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Add this line
        setRows(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEdit = (id: string) => {
    console.log(`Edit button clicked for id ${id}`);
  };

  const handleDelete = (id: string) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
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

  const [newRowData, setNewRowData] = useState<Man>({
    id: '',
    name: '',
    teamleader: '',
    idlocker: '',
  });

  const handleAddRow = () => {
    if (newRowData.id && newRowData.name && newRowData.teamleader && newRowData.idlocker) {
      setRows((prevRows) => [...prevRows, newRowData]);
      setNewRowData({
        id: '',
        name: '',
        teamleader: '',
        idlocker: '',
      });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const [darkMode, setDarkMode] = useState(false);
  console.log("Rows state:", rows); // Add this line

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
                    padding: '10px 14px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#90caf9',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#64b5f6',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2196f3',
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
                  <TableCell style={tableCellStyle}>ID</TableCell>
                  <TableCell style={tableCellStyle}>Name</TableCell>
                  <TableCell style={tableCellStyle}>Team Leader</TableCell>
                  <TableCell style={tableCellStyle}>ID Locker</TableCell>
                  <TableCell style={tableCellStyle}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: Man) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.teamleader}</TableCell>
                    <TableCell>{row.idlocker}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(row.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => handleDelete(row.id)}
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
              label="ID"
              value={newRowData.id}
              onChange={(e) => setNewRowData({ ...newRowData, id: e.target.value })}
              sx={{ marginRight: '10px' }}
            />
            <TextField
              label="Name"
              value={newRowData.name}
              onChange={(e) => setNewRowData({ ...newRowData, name: e.target.value })}
              sx={{ marginRight: '10px' }}
            />
            <TextField
              label="Team Leader"
              value={newRowData.teamleader}
              onChange={(e) => setNewRowData({ ...newRowData, teamleader: e.target.value })}
              sx={{ marginRight: '10px' }}
            />
            <TextField
              label="ID Locker"
              value={newRowData.idlocker}
              onChange={(e) => setNewRowData({ ...newRowData, idlocker: e.target.value })}
              sx={{ marginRight: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={handleAddRow}>
              Add New User
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
