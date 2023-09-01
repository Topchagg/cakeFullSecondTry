import { json } from 'react-router-dom'
import {create} from 'zustand'


export const categoryItemsSlice = create((set) => ({
    categoryItems: [],

    FetchCategoryItems: (params) => set(async (state) => {

        const result = await fetch('http://127.0.0.1:8000/getCategories/?showcase=' + params)
        const json = await result.json()
        set({categoryItems:json})

    })

  }))