import React, { useState } from 'react';
import { Button, FormControl, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { toast, ToastContainer } from 'react-toastify';
import { useAppContext } from '../context/App';
import fetchData from './services';

function InputField() {
  const [query, setQuery] = useState<string>('');
  const { setData } = useAppContext();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function handleSearchCity() {
    if (!query) {
      toast.error("Input can't be empty");
      return;
    }

    const city = query.toLowerCase().trim();
    getData(city);
    setQuery('');
  }

  async function getData(city:string) {
    const response = await fetchData(city);

    if(response?.status !== 200){
      toast.error(response?.message);
      return;
    }

    const { data = {} } = response;
    setData(data);
  }

  return (
    <>
      <FormControl 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TextField
          variant="outlined"
          value={query}
          sx={{
            background: 'white',
            borderRadius: '5px',
          }}
          onChange={handleChange}
          placeholder="Search city..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={handleSearchCity}>
          Search
        </Button>
      </FormControl>
      <ToastContainer closeOnClick={true} />
    </>
  );
}

export default InputField;