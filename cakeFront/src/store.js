import { json } from 'react-router-dom'
import {create} from 'zustand'


export const categoryItemFetch = create((set) => ({
    categoryItems: [],
    loading: true,
    page: 1,

    fetchCategoryItems: (params) => set(async (state) => {

        const result = await fetch('http://127.0.0.1:8000/getCategories/?showcase=' + params + '&&page=' + state.page)
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
            set((state) => ({categoryItems: json}))
            set((state) => ({loading: false}))
        }
       
    }),

    incrementPage: () => set(async(state) => {set ({page: state.page + 1})}),

    decrimentPage: () => set(async(state) => {set ({page: state.page - 1})})

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
    
    incrementPage: () => set(async(state) => {set ({page: state.page + 1})}),

    decrimentPage: () => set(async(state) => {set ({page: state.page - 1})})
}))

export const productItemFetch = create((set) => ({
    neededItems: [],
    page: 1,
    loaded: false,
    biggestPrice: 0,

    incrementPage: () => set(async(state) => {set ({page: state.page + 1})}),

    decrimentPage: () => set(async(state) => {set ({page: state.page - 1})}),

   findBiggestPrice: () => set(async(state) => {
    const result = await fetch('http://127.0.0.1:8000/getItems/')
    const json = await result.json()
    set((state) => ({biggestPrice: json[1]}))
   }),

   fetchNeededItems: (bestsellerFilter, minPrice, maxPrice) => set(async(state) => {
    const result = await fetch('http://127.0.0.1:8000/getItems/?page=' + 1 + '&&bestsellerFilter=' + bestsellerFilter + '&&maxPrice=' + maxPrice + '&&minPrice=' + minPrice )
    if(result === 404){
        if(state.page === 0){
            set((state) => ({page: 1}))
        }
        else{
            set((state) => ({page: state.page - 1}))
        }
    }
    else {
        const json = await result.json()
        set((state) => ({neededItems: json[0]}))
        set((state) => ({loaded: true}))
        console.log(json[0])
    }
   })

    
}))

