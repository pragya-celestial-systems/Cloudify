import React, { useState } from 'react';
import { Button, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { toast, ToastContainer } from 'react-toastify';
import { useAppContext } from '../context/App';
import fetchData from './services';
import './css/input.field.css';

function InputField() {
  const [query, setQuery] = useState<string>('');
  const { setData } = useAppContext();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  function handleSearchCity(e: React.FormEvent) {
    e.preventDefault();
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
      <form
        id="form"
        onSubmit={handleSearchCity}>
        <TextField
          variant="outlined"
          value={query}
          id="textField"
          sx={{
            background: '#ffffff50',
            color: 'white',
            borderRadius: '5px',
            width: '50%',
            padding: '0',
          }}
          onChange={handleChange}
          placeholder="Search city..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ color: 'black' }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={handleSearchCity} id="searchBtn">
          Search
        </Button>
      </form>
      <ToastContainer closeOnClick={true} />
    </>
  );
}

export default InputField;