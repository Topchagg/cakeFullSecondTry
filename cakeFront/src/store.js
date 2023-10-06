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


export const fetchOrders = create((set) => ({

    items: [],
    orders: [],
    user: [],
    totalPrice: 0,
    amountOfItems: 0,
    workStatus: ' ',

    fetchNeededOrders: async (id, many) => {
        try {
            let url = 'http://127.0.0.1:8000/getOrders/';
            if (!many) {
                url = `http://127.0.0.1:8000/getOrders/?id=` + id;
            }
    
            const result = await fetch(url);
            const json = await result.json();
    
            set((state) => ({
                items: json[0][0]['items'],
                user: json[0][0]['user'],
                workStatus: json[0][0]['status'],
                orders: json[0],
                totalPrice: json[1],
                amountOfItems: json[2],
            }));
            console.log(json)
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    },
    createNewOrder: (items, name, phoneNumber, email, userPk) =>  set(async state  => {
        const formData = {
           user: {
            pk: userPk,
            userEmail: email,
            userName: name,
            userPhoneNumber: phoneNumber
           },
           items,
        status: "Workin` at order"
        }
  
          const response = await fetch('http://127.0.0.1:8000/postNewOrder', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
              },
          body: JSON.stringify(formData)  
        });
  
        if (response.status === 201) {
            console.log('Category created successfully');
        } else {
            console.log('Error creating category');
        }
      }),
      

}))


export const cart = create((set) => ({
    items: [],
    showCart: false,
    Amount: 0,
    totalPrice: 0,

    setShowCart: () => set((state) => ({showCart: !state.showCart})),

    addItemIntoCart: (item) => set(async(state) => {
        const foundSame = false
        if(state.items.length === 0){
            item.Amount = 1
            let newItemsArray;
            state.items.push(item)
            newItemsArray = state.items
            set((state) => ({items: newItemsArray}))
            state.incrementAmount()
            state.updateTotalPrice(item.priceOfItem)
            console.log(state.items)
        }
        else{
            state.foundSame = false
            const newItemsArray = state.items
            for (let i = 0; i != state.items.length; i++){
                if(state.items[i]['nameOfItem'] === item['nameOfItem']){
                    state.foundSame = true
                    console.log(newItemsArray[i]['Amount'])
                    newItemsArray[i]['Amount'] += 1
                    set((state) => ({items: newItemsArray}))
                    console.log(state.items)
                    state.incrementAmount()
                    state.updateTotalPrice(item.priceOfItem)
                }
            }
        if(state.foundSame === false){
            item.Amount = 1
            let newItemsArray;
            state.items.push(item)
            newItemsArray = state.items
            set((state) => ({items: newItemsArray}))
            state.incrementAmount()
            state.updateTotalPrice(item.priceOfItem)
            }}

}),
incrementAmount: () =>  set((state) => ({Amount: state.Amount + 1})),
updateTotalPrice: (itemPrice) => set((state) => ({totalPrice: state.totalPrice + itemPrice })) 
   
      
       
    
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
    }),
   
    
    

}))