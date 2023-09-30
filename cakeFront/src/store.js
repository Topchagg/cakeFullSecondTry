import { json } from 'react-router-dom'
import {create} from 'zustand'


export const categoryItemFetch = create((set) => ({
    categoryItems: [],
    loading: true,
    status: false,

    fetchCategoryItems: (page,params) => set(async (state) => {

        const result = await fetch('http://127.0.0.1:8000/getCategories/?showcase=' + params + '&&page=' + page)
        if(result.status === 404){
            set((state) => ({status: !state.status}))  
         }
        else {
            const json = await result.json()
            set((state) => ({categoryItems: json}))
            set((state) => ({loading: false}))
        }
       
    })

  }))

export const forShowCaseFetch = create((set) => ({

    status: false,
    bestsellers: [],

    fetchBestsellersForShowcase: (page) => set(async(state) => {
        const result = await fetch('http://127.0.0.1:8000/getBestsellers/?page=' + page)
        if(result.status === 404){
            set((state) => ({status: !state.status}))  
         }
        else {
            const json = await  result.json()
            set((state) => ({bestsellers: json}))
        }
    })
}))

export const productItemFetch = create((set) => ({
    
    neededItems: [],
    status: false,
    loaded: false,
    biggestPrice: 0,
    

   findBiggestPrice: (category) => set(async(state) => {
    const result = await fetch('http://127.0.0.1:8000/getItems/?category=' + category )
    const json = await result.json()
    set((state) => ({biggestPrice: json[1]}))
   }),

   fetchNeededItems: (bestsellerFilter, minPrice, maxPrice, page, lowHighFilter, category) => set(async(state) => {
    const result = await fetch('http://127.0.0.1:8000/getItems/?page=' + page + '&&bestsellerFilter=' + bestsellerFilter + '&&maxPrice=' + maxPrice + '&&minPrice=' + minPrice + '&&lowHighFilter=' + lowHighFilter + '&&category=' + category )
    if(result.status === 404){
       set((state) => ({status: !state.status}))  
    }

    else {
        const json = await result.json()
        set((state) => ({neededItems: json[0]}))
        set((state) => ({loaded: true}))
        console.log(json[0])
    }
   })

    
}))

export const tools = create((set) =>({

    incrementPage: (page, setPageFunc) => {
        setPageFunc(page + 1)
    }   ,
    decrimentPage: (page, setPageFunc) => {
        setPageFunc(page - 1)
    },

    fixWrongPage: (page, setPageFunc) => set(async(state) => {
        if(page > 1) {

            setPageFunc(page - 1)
            
        }
        else {
            setPageFunc(1)
        }
    })
    
    

}))