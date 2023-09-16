import { json } from 'react-router-dom'
import {create} from 'zustand'


export const categoryItemFetch = create((set) => ({
    categoryItems: [],

    FetchCategoryItems: (params) => set(async (state) => {

        const result = await fetch('http://127.0.0.1:8000/getCategories/?showcase=' + params)
        const json = await result.json()
        set({categoryItems:json})

    })

  }))

export const forShowCaseFetch = create((set) => ({
   
    page: 1,

    bestsellers: [],

    fetchBestsellersForShowcase: () => set(async(state) => {
        const result = await fetch('http://127.0.0.1:8000/getBestsellers/?page=' + state.page)
        if (result.status === 404) {
            if (state.page === 0){
                set({page: 1})
            }
            else {
                set({page: state.page -1})
            }
        }
        else {
            const json = await  result.json()
            set({bestsellers: json})
        }
    }),
    
    incrementPage: () => set(async(state) => {set ({page: state.page + 1})}),

    decrimentPage: () => set(async(state) => {set ({page: state.page - 1})})
}))

export const productItemFetch = create((set) => ({
    neededItems: [],

    fetchNeededItems: () => set(async (state) => {
        const result = fetch('')
    })
    
}))