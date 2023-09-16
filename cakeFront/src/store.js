import { json } from 'react-router-dom'
import {create} from 'zustand'


export const categoryItemFetch = create((set) => ({
    categoryItems: [],

    FetchCategoryItems: (params) => set(async (state) => {

        const result = await fetch('http://127.0.0.1:8000/getCategories/?showcase=' + params)
        const json = await result.json()
        set((state) => ({categoryItems:json}))

    })

  }))

export const forShowCaseFetch = create((set) => ({
   
    page: 1,

    bestsellers: [],

    fetchBestsellersForShowcase: () => set(async(state) => {
        const result = await fetch('http://127.0.0.1:8000/getBestsellers/?page=' + state.page)
        if (result.status === 404) {
            if (state.page === 0){
                set((state) => ({page: 1}))
            }
            else {
                set((state) => ({page: state.page -1}))
            }
        }
        else {
            const json = await  result.json()
            set((state) => ({bestsellers: json}))
        }
    }),
    
    incrementPage: (page) => set(async(state) => {set ({page: page + 1})}),

    decrimentPage: (page) => set(async(state) => {set ({page: page - 1})})
}))

export const productItemFetch = create((set) => ({
    neededItems: [],
    page: 1,

    incrementPage: (page) => set(async(state) => {set ({page: page + 1})}),

    decrimentPage: (page) => set(async(state) => {set ({page: page - 1})}),

    fetchNeededItems: (minPrice, maxPrice, bestsellers, page) => set(async (state) => {
        const result = await fetch('http://127.0.0.1:8000/getItems/?bestsellerFilter=' + bestsellers + '&&maxPrice=' + maxPrice + '&&minPrice=' + minPrice + '&&page=' + page)
        if (result.status === 404) {
            if (state.page === 0){
                set((state) => ({page: 1}))
            }
            else {
                set((state) => ({page: state.page -1}))
            }
        }
        else {
            const json = await result.json()
            set((state) => ({neededItems: json}))
        }
    })
    
}))