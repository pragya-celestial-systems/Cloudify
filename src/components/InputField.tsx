import React, { useState } from 'react';
import { Button, FormControl, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { toast, ToastContainer } from 'react-toastify';
import { useAppContext } from '../context/App';
import axios from 'axios';

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
    fetchData(city);
    setQuery('');
  }

  async function fetchData(query: string) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}?access_key=${process.env.REACT_APP_API_KEY}&query=${query}`,
      );

      if (!response.data.sucess) {
        throw new Error();
      }

      setData(response.data);
    } catch (error) {
      console.log(error);
      toast.error('Invalid city');
    }
  }

  return (
    <>
      <FormControl>
        <TextField
          variant="outlined"
          value={query}
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
