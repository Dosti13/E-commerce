import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword 
  } from 'firebase/auth';
  import { 
    doc, 
    setDoc,
    getDoc, 
    collection,
    getDocs,
    deleteDoc
  } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addToCart, setCart } from '../Store/slice';
// Authentication Functions
// const cartProduct = useSelector((state)=>state.cart.item)

// 1. Register new user
export  const registerUser = async (email, password, additionalData) => {
  try {
    // Create auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Create user profile in Firestore using auth UID
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        ...additionalData,
        createdAt: new Date(),
      });
  
      return user;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };
  
  // 2. Sign in and check/create profile
 export  const signInUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Check if user profile exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
    
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          createdAt: new Date(),
        });
      }
  
      return user;
    } catch (error) {
      console.error('Error signing in:', error);
      alert("incorrect username or password ")
    }
  };
  
  // 3. Add item to user's cart
  export const addCart = async (userId, productData) => {
    
    try {
      // Create a reference to the user's cart collection
      const cartRef = collection(db, 'users', userId, 'cart');
      
      const addPromises = productData.map(item => 
        setDoc(doc(cartRef, item.id.toString()), {
          ...item,
          updatedAt: new Date()
        })
      );
      await Promise.all(addPromises);
    
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };
    
  export const getcart = (async(userId,dispatch)=>{
    const cartref = collection(db,"users",userId,"cart")
    
    const snap = await getDocs(cartref)
    const cart = snap.docs.map((doc)=>{
      const data = doc.data()
    return{  
      id:doc.id,
      ...data,
      updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null, 

    }
    })
    if (Array.isArray(cart)) {
      dispatch(setCart(cart)); 
    } else {
      dispatch(setCart([])); 
    }

    
  })
 export  const removeCartItem = async (userId, productId) => {
  // Debugging: Log values to check if they are correct

  const productIdStr = String(productId);
 
    try {
      const itemRef = doc(db, "users", userId, "cart", productIdStr); // Reference to the specific product
      await deleteDoc(itemRef); // Delete the product
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
  export const deleteSubcollection = async (userId) => {
    try {
      const cartRef = collection(db, "users", userId, "cart"); // Reference to the cart subcollection
      const snapshot = await getDocs(cartRef); // Get all documents
  
      const deletePromises = snapshot.docs.map((docItem) =>
        deleteDoc(doc(db, "users", userId, "cart", docItem.id))
      );
  
      await Promise.all(deletePromises); // Delete all documents in parallel
      console.log("Subcollection deleted successfully!");
    } catch (error) {
      console.error("Error deleting subcollection:", error);
    }
  };
  // Usage Example Component
  function AuthExample() {
    const handleRegister = async () => {
      try {
        const user = await registerUser('test@example.com', 'password123', {
          name: 'Test User',
          phone: '1234567890'
        });
        
        // Now you can add items to their cart
        await addToCart(user.uid, {
          id: 'product123',
          name: 'Test Product',
          price: 99.99,
          quantity: 1
        });
      } catch (error) {
        console.error('Registration error:', error);
      }
    };}
  
