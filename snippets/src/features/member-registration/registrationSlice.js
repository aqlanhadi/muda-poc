import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk(
    'member-registration/register',
    async (data) => {
        // await 1s
        //await new Promise((resolve) => setTimeout(resolve, 1000));

        let result = await axios.post('http://localhost:5000/v1/membership', data);

        return result;
    }
)