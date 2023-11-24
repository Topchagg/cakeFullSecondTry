import {create} from 'zustand'
import {storage} from './firebase'
import { v4 as uuidv4 } from 'uuid';
import {ref,uploadBytes,getDownloadURL, deleteObject, getMetadata} from 'firebase/storage'


export const categoryItemFetch = create((set) => ({
    categoryItems: [],
    loading: true,
    status: false,

    fetchCategoryItems: (page,params) => set(async (state) => {

        const result = await fetch(`http://127.0.0.1:8000/getCategories/?showcase=${params}&page=${page=page}`)
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
        const result = await fetch(`http://127.0.0.1:8000/getBestsellers/?page=${page}`)
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
    const result = await fetch(`http://127.0.0.1:8000/getItems/?category=${category}` )
    const json = await result.json()
    set((state) => ({biggestPrice: json[1]}))
   }),

   fetchNeededItems: (bestsellerFilter, minPrice, maxPrice, page, lowHighFilter, category) => set(async(state) => {
    const result = await fetch(`http://127.0.0.1:8000/getItems/?page=${page}&&bestsellerFilter=${bestsellerFilter}&&maxPrice=${maxPrice}&&minPrice=${minPrice}&&lowHighFilter=${lowHighFilter}&&category=${category}` )
    if(result.status === 404){
       set((state) => ({status: !state.status}))  
    }

    else {
        const json = await result.json()
        set((state) => ({neededItems: json[0]}))
        set((state) => ({loaded: true}))
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
    isCreate: false,
    raiseError: false,

    fetchNeededOrders: async (id, many,) => {
        const acsessToken = "Bearer " + localStorage.getItem('acsessToken')
        try {
            let url = 'http://127.0.0.1:8000/getOrders/';
            if (many === false) {
                url = `http://127.0.0.1:8000/getOrders/?id=${id}` ;
            }
            const result = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': acsessToken, 
                }
            });
            const json = await result.json();
            set((state) => ({
                items: json[0][0]['items'],
                workStatus: json[0][0]['status'],
                orders: json[0],
                totalPrice: json[1],
                amountOfItems: json[2],
                user: json[3]
            }));
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    },
    createNewOrder: (items) =>  set(async state  => {
        const acsessToken = "Bearer " + localStorage.getItem('acsessToken')
        const formData = {
           user: '',
           items: items,
        status: "Workin` at order"
        }
  
          const response = await fetch('http://127.0.0.1:8000/postNewOrder/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': acsessToken,

              },
          body: JSON.stringify(formData)  
        })
        if (response.status === 201) {
            set((state) => ({isCreate: true}))
            localStorage.setItem('bigItems', '[]')
            window.location.reload();
        } else {
            set((state) => ({raiseError: true}))
        }
      }),
      
      updateOrderStatus: (id, status) => set(async state => {
        const acsessToken = "Bearer " + localStorage.getItem('acsessToken')
        const result = await fetch(`http://127.0.0.1:8000/patch-order/`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': acsessToken,
            },
            body: JSON.stringify({
                idOfOrder: id,
                status: status,
            })
        })
        if (result.ok){
            console.log("Everything fine!")
            window.location.reload()
        }
        else {
            console.log("Something went wrong")
        }
      })


      

}))


export const cart = create((set) => ({
    items: [],
    showCart: false,
    Amount: 0,
    totalPrice: 0,
    restrictions: false,

    toggleShowCart: () => set((state) => ({showCart: !state.showCart})),

    addItemIntoCart: (item) => set(async(state) => {
        if(state.items.length === 0){
            item.Amount = 1
            let newItemsArray;
            state.items.push(item)
            newItemsArray = state.items
            set((state) => ({items: newItemsArray}))
            state.incrementAmount()
            state.updateTotalPrice(item.priceOfItem)
        }
        else{
            state.foundSame = false
            const newItemsArray = state.items
            for (let i = 0; i != state.items.length; i++){
                if(state.items[i]['nameOfItem'] === item['nameOfItem']){
                    state.foundSame = true
                    if(newItemsArray[i].Amount < 49) {
                        newItemsArray[i]['Amount'] += 1
                        set((state) => ({items: newItemsArray}))
                        state.incrementAmount()
                        state.updateTotalPrice(item.priceOfItem)
                        set((state) => ({restrictions: false}))
                    }
                    else {
                        set((state) => ({restrictions: true}))
                    }
                        
                    
                    
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
            localStorage.setItem("bigItems", JSON.stringify(state.items))
}),

incrementAmount: () =>  set((state) => ({Amount: state.Amount + 1})),

changeAmountOfItem: (nameOfItem, newAmount, typeOfChange) => set(async(state) => {
  const newItemsArray = state.items
  for(let i=0; i !== state.items.length; i++){
    if(nameOfItem === state.items[i].nameOfItem){
        if(typeOfChange === "change"){
            if(newAmount <= 50 && newAmount >= 1){
                newItemsArray[i].Amount = newAmount
                set((state) => ({
                    items: newItemsArray,
                    restrictions: false,
                }))
                localStorage.setItem("bigItems", JSON.stringify(state.items))
            }
            else {
                set((state) => ({restrictions: true}))
            }
        }
        else{
            if(newItemsArray[i].Amount > 1 && newItemsArray[i].Amount < 50){
                newItemsArray[i].Amount -= 1;
                set((state) => ({
                    items: newItemsArray,
                    Amount: --state.Amount,
                    restrictions: false
                }))
                localStorage.setItem("bigItems", JSON.stringify(newItemsArray))
            }
        }       
    }
  }
}),


updateTotalPrice: (itemPrice) => set((state) => ({totalPrice: state.totalPrice + itemPrice })),

setLocalItemsData: (localItems) => {
    set((state) => ({items: localItems}))
    
    let m = 0;
    for(let i=0; i != localItems.length; i++){
        m += localItems[i].Amount;
    }
    set((state) => ({Amount: m}))
    
   
    let p = 0;
    for(let i=0; i != localItems.length; i++){
        p += localItems[i].priceOfItem * localItems[i].Amount;
    }
    set((state) => ({totalPrice: p}))
    
},

deleteItemInCart: (nameOfItem) => set(async(state) => {
    let newItemsArray = []
    for(let i=0; i !== state.items.length; i++ ){
        if(state.items[i].nameOfItem !== nameOfItem) {
            newItemsArray.push(state.items[i])
        }
    }
    localStorage.setItem("bigItems", JSON.stringify(newItemsArray))
    set((state) => ({items: newItemsArray}))
    state.setLocalItemsData(newItemsArray)
})
   
}))



export const userAction = create((set) => ({
    isLogged: false,
    isCreated: undefined,
    isAdmin: false,
    isLoading: false,
    isCreated: undefined,
    userName: '',
    userEmail: '',
    imgURL: '',

    sign: (firstName, userPassword, last_name, phoneNumber,  userEmail, sign) =>  set(async(state) =>{
            if(sign === 'up') {
            set((state) => ({isLoading: true}))
            const result = await fetch('http://127.0.0.1:8000/auth/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(
                {
                    "email": userEmail,
                    "first_name": firstName,
                    "last_name":  last_name,
                    "password": userPassword,
                    "phoneNumber": phoneNumber,
                    "username": firstName,
                }
            )})
                if(result.ok) {
                    console.log('something')
                    set((state) => ({isCreated: true}))
                }
                else {  
                    set((state) => ({isCreated: false}))
                }
            }
            else {
                set((state) => ({isLoading: true}))
                const result = await fetch('http://127.0.0.1:8000/auth/jwt/create/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "username": firstName,
                        "password": userPassword
                    })
                });
                
                if (result.ok) {
                    const data = await result.json();
                    const accessToken = data.access;
                    const refreshToken = data.refresh; 
                    localStorage.setItem('acsessToken', accessToken)
                    localStorage.setItem('refreshToken', refreshToken)
                    console.log('something')
                    set((state) => ({
                        isLogged: true,
                        isLoading: false
                    }))
                    window.location.reload();
                } else {
                    console.error("Something went wrong");
                    set((state) => ({isLogged: false}))
                    set((state) => ({isLoading: false}))
                }
        }
    }),
    userAuth: () => set(async(state) => {
        const acsessToken = "Bearer " + localStorage.getItem('acsessToken')

        const result = await fetch('http://127.0.0.1:8000/get-info/' ,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': acsessToken,
            }
        })
        if(result.ok){
            const data = await result.json();
            set((state) => ({
                isAdmin: data.is_admin,
                userName: data.username,
                userEmail: data.email,
                isLogged: true,
            }))
        }
        else {
            console.log('Something went wrong')
            set((state) => ({isLogged: false}))
        }
    }),
    logOut: () => set(async(state) => {
        localStorage.setItem('acsessToken', '')
        localStorage.setItem('refreshToken', '')
        set((state) => ({isLogged: false}))
        window.location.reload();
    }),
    deleteObject: (id,typeOfObject,img) => set(async(state) => {
        const acsessToken = "Bearer " + localStorage.getItem('acsessToken')
        const result = await fetch(`http://127.0.0.1:8000/delete-object/?id=${id}&&typeOfObject=${typeOfObject}`,{
            method: "Delete",
            headers: {  
                'Content-Type': 'application/json',
                'Authorization': acsessToken,
            } 
        })
        if(result.ok){
            console.log(img)
            getMetadata(ref(storage,img)).then((metadata) => {
                const filePath = metadata.fullPath
                const fileRef = ref(storage, filePath)
                deleteObject(fileRef).then(() => {
                    console.log('Deleted');
                    window.location.reload();
                })  
            })
        }
        else {
            console.log('Something went wrong!')
        }   
    }),
    updateObject: (id, typeOfObject,price,name,bestseller,img, defaultImg,description, category) => set(async(state) => {
        set((state) => ({isLoading: true}))
        const accessToken = "Bearer " + localStorage.getItem('acsessToken'); 
        let data
        if(img){
            const imgRef = ref(storage, uuidv4());
            await uploadBytes(imgRef, img);
            const imgURL = await getDownloadURL(imgRef);
            data = {
                nameOfItem: name,
                priceOfItem: price,
                imgOfItem: imgURL,
                categoryOfItem: category,
                bestsellerItem: bestseller,
                descriptionOfItem: description
            };
            console.log('here')
        }
        else{
            data = {
                nameOfItem: name,
                priceOfItem: price,
                imgOfItem: defaultImg,
                categoryOfItem: category,
                BestsellerItem: bestseller,
                descriptionOfItem: description  
            };
        }
        const result = await fetch(`http://127.0.0.1:8000/put-object/?id=${id}&typeOfObject=${typeOfObject}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            body: JSON.stringify(data)
        });
        if(result.ok){
            console.log('everything fine')   
            window.location.reload(); 
        }
        else {
            console.log('something went wrong')
            set((state) => ({isLoading:false}))
        }
    }), 
    createObject: (typeOfObject, name, img, price,  bestseller, description,category ) => set(async(state) => {
        const accessToken = "Bearer " + localStorage.getItem('acsessToken'); 
        set((state) => ({isLoading: true}))
        if(typeOfObject === "category"){
            const imgRef = ref(storage, uuidv4());
            await uploadBytes(imgRef, img);
            const imgURL = await getDownloadURL(imgRef);
            const data = {
                name: name,
                img: imgURL,
                typeOfObject: typeOfObject
            }
            const result = await fetch('http://127.0.0.1:8000/create-object/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                },
                body: JSON.stringify(data)  
            })
            if(result.ok){
                console.log('Created')
                set((state) => ({isLoading: false}))
                window.location.reload()
            }
            else {
                console.log("Something went wrong")
            }
        }
        else {
            const imgRef = ref(storage, uuidv4());
            await uploadBytes(imgRef, img);
            const imgURL = await getDownloadURL(imgRef);
            const data = {
                name: name,
                price: price,
                typeOfObject: typeOfObject,
                img: imgURL,
                descriptionOfItem: 'da',
                category: category,
                bestseller: bestseller
            }
            const result = await fetch("http://127.0.0.1:8000/create-object/",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken
                },
                body: JSON.stringify(data),
            })
            if(result.ok){
                console.log('Everything is fine!')
                window.location.reload();
            }
            else{
                console.log('something went wrong')
            }
        }
    }),
    searchProducts: (text) => set(async(state) => {
        
    })
    
}))

export const tools = create((set) =>({

    incrementPage: (page, setPageFunc) => {
        setPageFunc(page + 1)
    } ,
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