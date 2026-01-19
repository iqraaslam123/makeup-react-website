import React, { useState, useEffect } from 'react';
import "./App.css";
import logo from "./assets/logo.png";
import s1 from "./assets/s1.jpg";
import s2 from "./assets/s2.jpg";
import s3 from "./assets/s3.jpg";
import s4 from "./assets/s4.jpg";
import b1 from "./assets/b1.png";
import b2 from "./assets/b2.png";
import b3 from "./assets/b3.png";
import b4 from "./assets/b4.png";
import b5 from "./assets/b5.png";
import b6 from "./assets/b6.png";
import ex2 from "./assets/ex2.jpg";
import ex3 from "./assets/ex3.jpg";
import m1 from "./assets/m1.jpg";
import m2 from "./assets/m2.jpg";
import m3 from "./assets/m3.jpg";
import m4 from "./assets/m4.jpg";
import m5 from "./assets/m5.jpg";
import m6 from "./assets/m6.jpg";
import m7 from "./assets/m7.jpg";
import m8 from "./assets/m8.jpg";
import Swal from 'sweetalert2';

function App() {
  // States for search and cart functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // All products data
  const productsData = [
    // Services
    { id: 1, name: "FACE MASSAGE", category: "services", price: 50, description: "Professional face massage service", image: s2 },
    { id: 2, name: "HEAD MASSAGE", category: "services", price: 60, description: "Relaxing head massage service", image: s1 },
    { id: 3, name: "BACK MASSAGE", category: "services", price: 80, description: "Therapeutic back massage service", image: s3 },
    { id: 4, name: "FULL BODY MASSAGE", category: "services", price: 100, description: "Complete body massage service", image: s4 },
    
    // Makeup Services
    { id: 5, name: "BRIDAL MAKEUP", category: "makeup", price: 200, description: "Professional bridal makeup for special day", image: b1 },
    { id: 6, name: "PARTY MAKEUP", category: "makeup", price: 150, description: "Glamorous party makeup", image: b2 },
    { id: 7, name: "PHOTOSHOOT MAKEUP", category: "makeup", price: 180, description: "Professional makeup for photoshoots", image: b3 },
    { id: 8, name: "EVENING MAKEUP", category: "makeup", price: 120, description: "Elegant evening makeup", image: b4 },
    { id: 9, name: "DAY MAKEUP", category: "makeup", price: 100, description: "Natural day makeup", image: b5 },
    { id: 10, name: "SPECIAL EFFECTS MAKEUP", category: "makeup", price: 250, description: "Special effects and creative makeup", image: b6 },
    
    // Cosmetic Products
    { id: 11, name: "FOUNDATION", category: "products", price: 24.99, description: "High-quality foundation for flawless skin", image: m1 },
    { id: 12, name: "HIGHLIGHTER", category: "products", price: 19.99, description: "Shimmering highlighter for glowing skin", image: m2 },
    { id: 13, name: "NAIL POLISH", category: "products", price: 9.99, description: "Long-lasting nail polish in various shades", image: m3 },
    { id: 14, name: "FRAGRANCE", category: "products", price: 49.99, description: "Luxury fragrance for lasting impression", image: m4 },
    { id: 15, name: "POWDER", category: "products", price: 22.99, description: "Setting powder for perfect finish", image: m5 },
    { id: 16, name: "LIPSTICK", category: "products", price: 16.99, description: "Matte lipstick in trending shades", image: m6 },
    { id: 17, name: "LIP GLOSS", category: "products", price: 12.99, description: "Glossy lip gloss with hydration", image: m7 },
    { id: 18, name: "CONCEALER", category: "products", price: 18.99, description: "Full coverage concealer", image: m8 },
    
    // Experts
    { id: 19, name: "MAKEUP ARTIST", category: "experts", price: 300, description: "Professional makeup artist for special events", image: ex2 },
    { id: 20, name: "HAIR STYLIST", category: "experts", price: 250, description: "Expert hair stylist for any occasion", image: ex3 },
    
    // Membership Plans
    { id: 21, name: "STARTER MEMBERSHIP", category: "membership", price: 0, description: "Free starter membership plan", image: null },
    { id: 22, name: "PROFESSIONAL MEMBERSHIP", category: "membership", price: 38, description: "Professional membership plan", image: null },
    { id: 23, name: "ENTERPRISE MEMBERSHIP", category: "membership", price: 72, description: "Enterprise membership plan", image: null }
  ];

  // Initialize filtered products
  useEffect(() => {
    setFilteredProducts(productsData);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredProducts(productsData);
    } else {
      const filtered = productsData.filter(product => 
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );
      setFilteredProducts(filtered);
    }
  };

  // Add to cart function
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Show success notification
    Swal.fire({
      title: 'Added to Cart!',
      text: `${product.name} has been added to your cart.`,
      icon: 'success',
      confirmButtonColor: '#ec4899',
      timer: 1500,
      showConfirmButton: false
    });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
    Swal.fire({
      title: 'Removed!',
      text: 'Item has been removed from cart.',
      icon: 'warning',
      confirmButtonColor: '#ec4899',
      timer: 1500,
      showConfirmButton: false
    });
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Download bill
  const downloadBill = () => {
    if (cart.length === 0) {
      Swal.fire({
        title: 'Cart is Empty!',
        text: 'Add items to cart before downloading bill.',
        icon: 'error',
        confirmButtonColor: '#ec4899'
      });
      return;
    }

    const billContent = `
Glamour Beauty Store - Invoice
================================
${cart.map(item => `
${item.name}
Price: $${item.price.toFixed(2)}
Quantity: ${item.quantity}
Subtotal: $${(item.price * item.quantity).toFixed(2)}
`).join('\n')}
================================
Total: $${calculateTotal().toFixed(2)}
================================
Thank you for shopping with us!
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
    `;

    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beauty-store-bill-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    Swal.fire({
      title: 'Bill Downloaded!',
      text: 'Your invoice has been downloaded successfully.',
      icon: 'success',
      confirmButtonColor: '#ec4899'
    });
  };

  // Clear cart
  const clearCart = () => {
    Swal.fire({
      title: 'Clear Cart?',
      text: 'This will remove all items from your cart.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ec4899',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, clear it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setCart([]);
        Swal.fire({
          title: 'Cleared!',
          text: 'Your cart has been cleared.',
          icon: 'success',
          confirmButtonColor: '#ec4899',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <>
      {/* Search and Cart Cart Sidebar */}
      <div className='nav-toggle'>
      <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 ${cartOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
            <div className="flex space-x-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-800 px-3 py-1"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setCartOpen(false)}
                className="text-2xl text-gray-600 hover:text-gray-800"
              >
                ×
              </button>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add some beautiful products!</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 mb-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                      <p className="text-pink-600 font-bold">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 ml-2 transition"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between text-lg font-bold mb-2">
                  <span>Subtotal:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-6">
                  <span>Shipping:</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={downloadBill}
                    className="w-full bg-linear-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition font-medium"
                  >
                    Download Bill
                  </button>
                  
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: 'Checkout',
                        text: 'Proceed to secure checkout?',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#ec4899',
                        cancelButtonColor: '#6b7280',
                        confirmButtonText: 'Yes, proceed!'
                      });
                    }}
                    className="w-full bg-white border-2 border-pink-600 text-pink-600 py-3 rounded-lg hover:bg-pink-50 transition font-medium"
                  >
                    Proceed to Checkout (${calculateTotal().toFixed(2)})
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay for cart */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Navbar */}{/* Navbar */}
<nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
  <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
    {/* Logo */}
    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={logo} className="h-8 md:h-9  md:ml-10" alt="Beauty Store Logo" />
    </a>
    
    {/* Desktop Search and Cart */}
    <div className="flex items-center md:order-2 space-x-2">
      {/* Mobile Search Toggle */}
      <button 
        type="button" 
        id="mobile-search-toggle"
        className="md:hidden flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-2 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm w-10 h-10 focus:outline-none"
        onClick={() => {
          const mobileSearch = document.getElementById('mobile-search');
          mobileSearch.classList.toggle('hidden');
        }}
      >
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search</span>
      </button>
      
      {/* Desktop Search Input */}
      <div className="relative hidden md:block">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input 
          type="text" 
          id="desktop-search"
          className="block w-64 ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" 
          placeholder="Search products, services..." 
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Cart Button */}
      <button
        onClick={() => setCartOpen(!cartOpen)}
        className="relative bg-white text-pink-600 p-2 rounded-full hover:bg-pink-50 transition"
      >
        <span className="text-xl">🛒</span>
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Mobile Menu Toggle */}
      <button 
        id="navbar-toggle"
        type="button" 
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" 
        aria-controls="navbar-menu" 
        aria-expanded="false"
        onClick={() => {
          const navbarMenu = document.getElementById('navbar-menu');
          navbarMenu.classList.toggle('hidden');
        }}
      >
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
        </svg>
      </button>
    </div>
    
    {/* Mobile Search Input - Hidden by default */}
    <div id="mobile-search" className="hidden w-full md:hidden mt-3">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input 
          type="text" 
          id="mobile-search-input"
          className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" 
          placeholder="Search products, services..." 
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>

    {/* Search Results Dropdown */}
    {searchTerm && (
      <div className="absolute top-16 left-0 right-0 bg-white shadow-lg rounded-lg p-4 z-30 mx-4 md:mx-auto md:left-4 md:right-4">
        {filteredProducts.length > 0 ? (
          <>
            <p className="text-gray-600 mb-2">
              Search results for: <span className="font-semibold text-pink-600">"{searchTerm}"</span>
              <span className="ml-2 text-gray-500">
                ({filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found)
              </span>
            </p>
            <div className="max-h-60 overflow-y-auto">
              {filteredProducts.slice(0, 5).map(product => (
                <div key={product.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                  {product.image && (
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded mr-3" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{product.name}</p>
                    <p className="text-sm text-gray-600 truncate">${product.price.toFixed(2)} • {product.category}</p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="text-sm bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 whitespace-nowrap"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600">
              No results found for: <span className="font-semibold text-pink-600">"{searchTerm}"</span>
            </p>
            <p className="text-gray-500 text-sm mt-1">Try different keywords or check spelling</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilteredProducts(productsData);
              }}
              className="mt-3 text-sm text-pink-600 hover:text-pink-700"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    )}

    {/* Navigation Menu */}
    <div className="hidden md:flex items-center justify-between w-full md:w-auto md:order-1" id="navbar-menu">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary ">
        <li>
          <a href="#hero" className="block py-2 px-3 text-pink-600 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0 font-bold hover:text-black" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#services" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 hover:text-pink-600">Services</a>
        </li>
        <li>
          <a href="#makeup" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 hover:text-pink-600">Makeup</a>
        </li>
        <li>
          <a href="#products" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 hover:text-pink-600">Products</a>
        </li>
        <li>
          <a href="#membership" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 hover:text-pink-600">Membership</a>
        </li>
        <li>
          <a href="#testinomial" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 hover:text-pink-600">Testinomial</a>
        </li>
        <li>
          <a href="#contact" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 hover:text-pink-600">Contact</a>
        </li>
      </ul>
    </div>

    {/* Mobile Navigation Menu - Hidden by default */}
    <div id="mobile-menu" className="hidden w-full md:hidden ">
      <ul className="font-medium flex flex-col p-4 mt-4 border border-default rounded-base bg-neutral-secondary-soft">
        <li>
          <a href="#hero" onClick={() => document.getElementById('mobile-menu').classList.add('hidden')} className="block py-3 px-3 text-pink-600 bg-brand rounded font-bold">Home</a>
        </li>
        <li>
          <a href="#services" onClick={() => document.getElementById('mobile-menu').classList.add('hidden')} className="block py-3 px-3 text-heading rounded hover:bg-neutral-tertiary hover:text-pink-600">Services</a>
        </li>
        <li>
          <a href="#makeup" onClick={() => document.getElementById('mobile-menu').classList.add('hidden')} className="block py-3 px-3 text-heading rounded hover:bg-neutral-tertiary hover:text-pink-600">Makeup</a>
        </li>
        <li>
          <a href="#products" onClick={() => document.getElementById('mobile-menu').classList.add('hidden')} className="block py-3 px-3 text-heading rounded hover:bg-neutral-tertiary hover:text-pink-600">Products</a>
        </li>
        <li>
          <a href="#membership" onClick={() => document.getElementById('mobile-menu').classList.add('hidden')} className="block py-3 px-3 text-heading rounded hover:bg-neutral-tertiary hover:text-pink-600">Membership</a>
        </li>
        <li>
          <a href="#testinomial" onClick={() => document.getElementById('mobile-menu').classList.add('hidden')} className="block py-3 px-3 text-heading rounded hover:bg-neutral-tertiary hover:text-pink-600">Testinomial</a>
        </li>
        <li>
          <a href="#contact" onClick={() => document.getElementById('mobile-menu').classList.add('hidden')} className="block py-3 px-3 text-heading rounded hover:bg-neutral-tertiary hover:text-pink-600">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
      </div>

      
     {/* Hero Section */}
<section className="bg-gray-900 body-font hero " id="hero">
  <div className="container mx-auto flex px-4 md:px-5 py-12 md:py-24 md:flex-row flex-col items-center lg:-mt-14 ">
    <div className="lg:grow md:w-1/2 lg:pr-24 md:pr-8 flex flex-col md:items-start md:text-left mb-12 md:mb-0 items-center text-center mt-12 md:mt-50 md:ml-10 mx-4">
      <h1 className="title-font text-3xl sm:text-4xl lg:text-6xl mb-4 font-medium text-black text-center md:text-left">
        BEST PLACE <span className='text-pink-600'>FOR YOU</span>
        <br className="hidden lg:inline-block font-bold"/>
        <span className='text-pink-600 font-bold'>HERBAL</span> <span className='font-bold'>TREATMENT</span>
      </h1>
      <p className="mb-8 leading-relaxed text-black text-center md:text-justify font-medium m-3">
        Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant  <br className="hidden md:inline" /> Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric.
      </p>
      <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 w-full max-w-md mx-auto md:mx-0">
        <button 
          onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })} 
          className="inline-flex text-white bg-pink-500 border-0 py-3 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg font-bold justify-center"
        >
          See All Services
        </button>
        <button 
          onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })} 
          className="inline-flex text-white font-bold bg-gray-800 border-0 py-3 px-8 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg justify-center"
        >
          More Details
        </button>
      </div>
    </div>
  </div>
</section>
      {/* Premium Services */}
      <section className="text-black bg-white body-font res " id="services">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-col text-center w-full mb-20 ">
            <h1 className="text-5xl font-bold title-font mb-4 text-black ">OUR  
              <span className="text-pink-600 border-b-4"> SPA </span>
               SERVICES</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam mollitia eaque praesentium accusamus aperiam velit veniam repudiandae, doloribus dolor deserunt! Cupiditate aperiam aliquam maiores ad non quae ipsum, sed necessitatibus, porro, debitis rem dolorem est reprehenderit a corrupti enim modi.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img alt="team" className="shrink-0 -lg w-full h-70 object-cover object-center mb-4 border-2 rounded-full border-b-12 border-r-12 border-pink-700 pink-border hover:border hover:border-t-12 hover:border-l-12" src={s2} />
                <div className="w-full">
                  <h2 className="title-font font-bold text-lg text-black">FACE MASSAGE</h2>
                  <h3 className="text-pink-800 mb-3">ONLY $50</h3>
                  <button onClick={() => addToCart(productsData[0])} className="bg-pink-500 text-white border-2 font-bold px-5 py-3 mb-2 rounded-[10px] hover:bg-pink-400 hover:text-black hover:border-0 cursor-pointer">Book Now</button><br />
                  <span className="inline-flex">
                    <a className="text-blue-700">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-blue-700">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-blue-700">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img alt="team" className="shrink-0 w-full h-70 object-cover object-center mb-4 border-2 rounded-full hover:border-b-12 hover:border-r-12 border-pink-700 pink-border hover:border border-t-12 border-l-12" src={s1} />
                <div className="w-full">
                  <h2 className="title-font font-bold text-lg text-black">HEAD MASSAGE</h2>
                  <h3 className="text-pink-800 mb-3">ONLY $60</h3>
                  <button onClick={() => addToCart(productsData[1])} className="bg-pink-500 text-white border-2 font-bold px-5 py-3 mb-2 rounded-[10px] hover:bg-pink-400 hover:text-black hover:border-0 cursor-pointer">Book Now</button><br />
                  <span className="inline-flex">
                    <a className="text-blue-700">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-blue-700">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-blue-700">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img alt="team" className="shrink-0 w-full h-70 object-cover object-center mb-4 border-2 rounded-full border-b-12 border-r-12 border-pink-700 pink-border hover:border hover:border-t-12 hover:border-l-12" src={s3} />
                <div className="w-full">
                  <h2 className="title-font font-bold text-lg text-black">BACK MASSAGE</h2>
                  <h3 className="text-pink-800 mb-3">ONLY $80</h3>
                  <button onClick={() => addToCart(productsData[2])} className="bg-pink-500 text-white border-2 font-bold px-5 py-3 mb-2 rounded-[10px] hover:bg-pink-400 hover:text-black hover:border-0 cursor-pointer">Book Now</button><br />
                  <span className="inline-flex">
                    <a className="text-blue-700">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-blue-700">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-blue-700">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/4 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img alt="team" className="shrink-0 w-full h-70 object-cover object-center mb-4 border-2 rounded-full hover:border-b-12 hover:border-r-12 border-pink-700 pink-border hover:border border-t-12 border-l-12" src={s4}/>
                <div className="w-full">
                  <h2 className="title-font font-bold text-lg text-black">FULL BODY MASSAGE</h2>
                  <h3 className="text-pink-800 mb-3">ONLY $100</h3>
                  <button onClick={() => addToCart(productsData[3])} className="bg-pink-500 text-white border-2 font-bold px-5 py-3 mb-2 rounded-[10px] hover:bg-pink-400 hover:text-black hover:border-0 cursor-pointer">Book Now</button><br />
                  <span className="inline-flex">
                    <a className="text-blue-700">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-blue-700">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-blue-700">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Makeup Section */}
      <section className="text-black body-font bag" id="makeup">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex w-full mb-20 flex-wrap">
            <h1 className="sm:text-4xl lg:text-6xl font-bold title-font text-black lg:w-1/3 lg:mb-0 mb-4"> OUR <span className="text-pink-600"> MAKEUP</span>  SERVICES </h1>
            <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base mt-4 sm:leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus veritatis asperiores aspernatur voluptatem voluptatibus quod cupiditate <br />
            <button onClick={() => addToCart(productsData[4])} className="bg-pink-500 text-white border-2 font-bold px-5 py-3 mb-2 rounded-[10px] hover:bg-pink-400 hover:text-black hover:border-0 cursor-pointer mt-5">Book FOR YOUR SPECIAL DAY </button>
            </p>
          </div>
          <div className="flex flex-wrap md:-m-2 -m-1">
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-1/2">
                <img alt="gallery" className="w-full object-cover h-full object-center border-4 border-pink-600 rounded block" src={b1} />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img alt="gallery" className="w-full object-cover h-full object-center block border-4 border-pink-600 rounded" src={b2} />
              </div>
              <div className="md:p-2 p-1 w-full">
                <img alt="gallery" className="w-full h-full object-cover object-center block border-4 border-pink-600 rounded" src={b3} />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="md:p-2 p-1 w-full">
                <img alt="gallery" className="w-full h-full object-cover object-center block border-4 border-pink-600 rounded" src={b5} />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img alt="gallery" className="w-full object-cover h-full object-center block border-4 border-pink-600 rounded" src={b4} />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img alt="gallery" className="w-full object-cover h-full object-center block border-4 border-pink-600 rounded" src={b6} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="text-black-400 bag body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="text-5xl font-bold title-font mb-4 text-black text-center">MEET OUR
            <span className="text-pink-600 border-b-4"> EXPERTS</span>
          </h1>
          <div className="flex flex-wrap -mx-4 -mb-10 text-center">
            <div className="sm:w-1/2 mb-10 px-4">
              <div className="rounded-full w-100 h-100 overflow-hidden border-b-12 border-r-12 border-pink-700 pink-border hover:border hover:border-t-12 hover:border-l-12 ml-25 exp-div">
                <img alt="content" className="object-cover object-center h-full w-full exp-img" src={ex2} />
              </div>
              <h2 className="title-font text-2xl font-medium text-pink-600 mt-6 mb-3">Best Makeup Artist</h2>
              <p className="leading-relaxed text-center font-bold">Available with 50% off..<br/> so What are you waiting for just click and enjoy</p>
              <button onClick={() => addToCart(productsData[18])} className="flex mx-auto mt-6 text-white bg-pink-500 border-0 py-2 px-5 focus:outline-none hover:bg-pink-600 rounded-[10px] cursor-pointer">SELECT NOW</button>
            </div>
            <div className="sm:w-1/2 mb-10 px-4">
              <div className="rounded-full w-100 h-100 overflow-hidden hover:border-b-12 hover:border-r-12 border-pink-700 pink-border hover:border border-t-12 border-l-12 ml-25">
                <img alt="content" className="object-cover object-center h-full w-full exp-img" src={ex3} />
              </div>
              <h2 className="title-font text-2xl font-medium text-pink-600 mt-6 mb-3">Best Hair Stylist</h2>
              <p className="leading-relaxed text-base font-bold">Available with 50% off..<br/> so What are you waiting for just click and enjoy</p>
              <button onClick={() => addToCart(productsData[19])} className="flex mx-auto mt-6 text-white bg-pink-500 border-0 py-2 px-5 focus:outline-none hover:bg-pink-600 rounded-[10px] cursor-pointer">SELECT NOW</button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Updated all Add to Cart buttons */}
      <section className="text-black bg-white body-font" id="products">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-5xl font-bold title-font mb-4 text-black tracking-widest">OUR <span className="text-pink-600 border-b-4">COSMETICS</span> BRAND </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base mt-4">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.</p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img alt="team" className="shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4 border-4 border-amber-700" src={m1} />
                <div className="grow sm:pl-8">
                  <h3 className="text-black font-bold mb-2">Foundation's</h3>
                  <p className="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. <br />
                    <button onClick={() => addToCart(productsData[10])} className="bg-pink-500 text-white border-2 font-bold px-5 py-3 mb-2 rounded-[10px] hover:bg-pink-400 hover:text-black hover:border-0 cursor-pointer mt-5">Add To Cart</button>
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img alt="team" className="shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4 border-4 border-amber-700" src={m2} />
                <div className="grow sm:pl-8">
                  <h3 className="text-black font-bold mb-2">Highliter's</h3>
                  <p className="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. <br />
                    <button onClick={() => addToCart(productsData[11])} className="bg-pink-500 text-white border-2 font-bold px-5 py-3 mb-2 rounded-[10px] hover:bg-pink-400 hover:text-black hover:border-0 cursor-pointer mt-5">Add To Cart</button>
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img alt="team" className="shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4 border-4 border-amber-700" src={m3} />
                <div className="grow sm:pl-8">
                  <h3 className="text-black font-bold mb-2">Nail paint's</h3>
                  <p className="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. <br />
                    <button onClick={() => addToCart(productsData[12])} className="bg-pink-500 text-white border-2 font-bold px-5 py-3 mb-2 rounded-[10px] hover:bg-pink-400 hover:text-black hover:border-0 cursor-pointer mt-5">Add To Cart</button>
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img alt="team" className="shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4 border-4 border-amber-700" src={m4} />
                <div className="grow sm:pl-8">
                  <h3 className="text-black font-bold mb-2">Fragnance's</h3>
                  <p className="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. <br />
                    <button onClick={() => addToCart(productsData[13])} className="bg-pink-500 text-white border-2 font-bold px-5 py-3 mb-2 rounded-[10px] hover:bg-pink-400 hover:text-black hover:border-0 cursor-pointer mt-5">Add To Cart</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products 2 Section */}
      <section className="text-black bg-white body-font -mt-17.5">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-5xl font-bold title-font mb-4 text-black tracking-widest">OUR MOST SELLING <span className='text-pink-600 border-b-5'>PRODUCTS</span> </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base mt-4">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.</p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img alt="team" className="shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4 border-5 border-pink-800" src={m5} />
                <div className="grow sm:pl-8">
                  <h3 className="text-black font-bold mb-2">Powders's</h3>
                  <p className="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. <br />
                    <button onClick={() => addToCart(productsData[14])} className="bg-pink-500 text-white border-2 font-bold px-5 py-3 mb-2 rounded-[10px] hover:bg-pink-400 hover:text-black hover:border-0 cursor-pointer mt-5">Add To Cart</button>
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img alt="team" className="shrink-0 rounded-lg w-48 h-60 object-cover object-center sm:mb-0 mb-4 border-5 border-pink-800" src={m6} />
                <div className="grow sm:pl-8">
                  <h3 className="text-black font-bold mb-2">Lipstick's</h3>
                  <p className="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. <br />
                    <button onClick={() => addToCart(productsData[15])} className="bg-pink-500 text-white border-2 font-bold px-5 py-3 mb-2 rounded-[10px] hover:bg-pink-400 hover:text-black hover:border-0 cursor-pointer mt-5">Add To Cart</button>
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img alt="team" className="shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4 border-5 border-pink-800" src={m7} />
                <div className="grow sm:pl-8">
                  <h3 className="text-black font-bold mb-2">lipstick's</h3>
                  <p className="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. <br />
                    <button onClick={() => addToCart(productsData[16])} className="bg-pink-500 text-white border-2 font-bold px-5 py-3 mb-2 rounded-[10px] hover:bg-pink-400 hover:text-black hover:border-0 cursor-pointer mt-5">Add To Cart</button>
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img alt="team" className="shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4 border-5 border-pink-800" src={m8} />
                <div className="grow sm:pl-8">
                  <h3 className="text-black font-bold mb-2">Foundation's</h3>
                  <p className="mb-4">DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. <br />
                    <button onClick={() => addToCart(productsData[17])} className="bg-pink-500 text-white border-2 font-bold px-5 py-3 mb-2 rounded-[10px] hover:bg-pink-400 hover:text-black hover:border-0 cursor-pointer mt-5">Add To Cart</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="text-gray-900 body-font overflow-hidden relative" id="membership">
        {/* ... Your existing membership code ... */}
        <div className="container px-5 py-24 mx-auto relative z-10">
          <div className="flex flex-col text-center w-full mb-20">
            <span className="text-pink-500 font-semibold tracking-widest text-sm mb-3">MEMBERSHIP PLANS</span>
            <h1 className="sm:text-5xl text-4xl font-bold mb-4 bg-linear-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
              Choose Your Perfect Plan
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-gray-600 text-lg">Flexible pricing designed to grow with you. Start free, upgrade anytime.</p>
          </div>
          
          <div className="flex flex-wrap -m-4 justify-center">
            {/* Free Plan */}
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full transform hover:-translate-y-2 transition-all duration-300">
              <div className="h-full p-8 rounded-2xl bg-white border-2 border-pink-100 flex flex-col relative overflow-hidden shadow-xl hover:shadow-2xl">
                <h2 className="text-sm tracking-widest text-pink-500 title-font mb-1 font-semibold uppercase">STARTER</h2>
                <h1 className="text-5xl text-gray-900 pb-4 mb-6 border-b border-pink-100 leading-none">
                  <span className="font-bold">Free</span>
                </h1>
                <div className="space-y-4 mb-8 grow">
                  {/* ... features ... */}
                </div>
                <button onClick={() => addToCart(productsData[20])} className="w-full py-4 px-6 bg-linear-to-r from-pink-100 to-rose-50 text-pink-600 font-semibold rounded-xl hover:from-pink-200 hover:to-rose-100 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                  Get Started Free
                </button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full transform hover:-translate-y-2 transition-all duration-300">
              <div className="relative">
                <div className="relative h-full p-8 rounded-2xl bg-white flex flex-col overflow-hidden shadow-2xl">
                  <h2 className="text-sm tracking-widest text-pink-500 title-font mb-1 font-semibold uppercase mt-2">PROFESSIONAL</h2>
                  <div className="flex items-baseline my-6">
                    <span className="text-5xl font-bold text-gray-900">$38</span>
                    <span className="ml-2 text-gray-500">/month</span>
                  </div>
                  <div className="space-y-4 mb-8 grow">
                    {/* ... features ... */}
                  </div>
                  <button onClick={() => addToCart(productsData[21])} className="w-full py-4 px-6 bg-linear-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl group">
                    Start Free Trial
                  </button>
                </div>
              </div>
            </div>

            {/* Business Plan */}
            <div className="p-4 xl:w-1/4 md:w-1/2 w-full transform hover:-translate-y-2 transition-all duration-300">
              <div className="h-full p-8 rounded-2xl bg-linear-to-b from-white to-pink-50 border-2 border-rose-100 flex flex-col relative overflow-hidden shadow-xl hover:shadow-2xl">
                <div className="flex items-center mb-2">
                  <h2 className="text-sm tracking-widest text-pink-500 title-font font-semibold uppercase">ENTERPRISE</h2>
                </div>
                <div className="flex items-baseline my-6">
                  <span className="text-5xl font-bold text-gray-900">$72</span>
                  <span className="ml-2 text-gray-500">/month</span>
                </div>
                <div className="space-y-4 mb-8 grow">
                  {/* ... features ... */}
                </div>
                <button onClick={() => addToCart(productsData[22])} className="w-full py-4 px-6 bg-linear-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl group">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your existing sections remain exactly the same */}
      {/* Enhanced Testimonials */}
<section class="text-gray-900 body-font relative overflow-hidden" id="testinomial">
  {/* Background Pattern */}
  <div class="absolute inset-0 bg-linear-to-br from-white via-pink-50 to-rose-50 -z-10"></div>
  <div class="absolute top-0 right-0 w-64 h-64 bg-pink-200 rounded-full -mr-32 -mt-32 opacity-30"></div>
  <div class="absolute bottom-0 left-0 w-64 h-64 bg-rose-200 rounded-full -ml-32 -mb-32 opacity-30"></div>
  
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-16">
      <span class="text-pink-500 font-semibold tracking-widest text-sm mb-3">TESTIMONIALS</span>
      <h1 class="sm:text-4xl text-3xl font-bold mb-4">What Our <span class="bg-linear-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">Customers Say</span></h1>
      <p class="lg:w-2/3 mx-auto leading-relaxed text-gray-600">Join 10,000+ satisfied customers who transformed their business</p>
    </div>
    
    <div class="flex flex-wrap -m-4">
      {/* Testimonial 1 */}
      <div class="p-4 lg:w-1/2 w-full">
        <div class="h-full bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
          <div class="absolute -top-10 -right-10 w-20 h-20 bg-pink-100 rounded-full opacity-50"></div>
          <div class="flex items-start mb-6">
            <div class="shrink-0">
              <div class="w-16 h-16 rounded-full bg-linear-to-br from-pink-400 to-rose-400 p-0.5">
                <img alt="testimonial" src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" class="w-full h-full rounded-full object-cover"/>
              </div>
            </div>
            <div class="ml-6">
              <h3 class="text-xl font-bold text-gray-900">Sarah Johnson</h3>
              <p class="text-pink-500 font-medium">CEO, TechSolutions Inc.</p>
              <div class="flex mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <p class="leading-relaxed text-gray-700 italic text-lg mb-6">
            "This platform transformed our workflow. We've seen a 40% increase in productivity since implementation. The support team is exceptional!"
          </p>
          <div class="flex items-center justify-between">
            <span class="inline-flex items-center text-pink-600">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
              </svg>
              Watch Video Testimonial
            </span>
            <span class="text-sm text-gray-500">Joined March 2023</span>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div class="p-4 lg:w-1/2 w-full">
        <div class="h-full bg-linear-to-br from-white to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-rose-100">
          <div class="absolute -bottom-10 -left-10 w-24 h-24 bg-rose-100 rounded-full opacity-30"></div>
          <div class="flex items-start mb-6">
            <div class="shrink-0">
              <div class="w-16 h-16 rounded-full bg-linear-to-br from-rose-400 to-pink-400 p-0.5">
                <img alt="testimonial" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80" class="w-full h-full rounded-full object-cover"/>
              </div>
            </div>
            <div class="ml-6">
              <h3 class="text-xl font-bold text-gray-900">Michael Chen</h3>
              <p class="text-pink-500 font-medium">CTO, InnovateLabs</p>
              <div class="flex mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <p class="leading-relaxed text-gray-700 italic text-lg mb-6">
            "The analytics features alone paid for the entire platform in the first quarter. Our team collaboration has never been smoother."
          </p>
          <div class="flex items-center">
            <span class="inline-flex items-center px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
              </svg>
              75% Revenue Growth
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Stats Section */}
    <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
      <div class="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100">
        <div class="text-4xl font-bold bg-linear-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">10K+</div>
        <p class="text-gray-600 mt-2">Happy Customers</p>
      </div>
      <div class="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100">
        <div class="text-4xl font-bold bg-linear-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">4.9</div>
        <p class="text-gray-600 mt-2">Average Rating</p>
      </div>
      <div class="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100">
        <div class="text-4xl font-bold bg-linear-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">24/7</div>
        <p class="text-gray-600 mt-2">Support Available</p>
      </div>
      <div class="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100">
        <div class="text-4xl font-bold bg-linear-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">98%</div>
        <p class="text-gray-600 mt-2">Satisfaction Rate</p>
      </div>
    </div>
  </div>
</section>

{/* Enhanced Contact Section */}
<section class="text-gray-900 body-font relative" id="contact">
  <div class="absolute inset-0 bg-linear-to-br from-white via-pink-50 to-white -z-10"></div>
  
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      {/* Left Content */}
      <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-10 lg:mb-0">
        <span class="text-pink-500 font-semibold tracking-widest text-sm">GET IN TOUCH</span>
        <h1 class="text-4xl font-bold text-gray-900 mb-6 mt-2">Let's Create <span class="bg-linear-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">Something Amazing</span> Together</h1>
        <p class="text-gray-600 text-lg mb-8 leading-relaxed">
          Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
        </p>
        
        {/* Contact Info Cards */}
        <div class="space-y-6">
          <div class="flex items-center p-4 bg-white rounded-xl shadow-lg border border-pink-100">
            <div class="shrink-0 w-12 h-12 bg-linear-to-r from-pink-100 to-rose-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="font-bold text-gray-900">Email Us</h3>
              <a href="mailto:hello@example.com" class="text-pink-600 hover:text-pink-700">hello@example.com</a>
            </div>
          </div>
          
          <div class="flex items-center p-4 bg-white rounded-xl shadow-lg border border-pink-100">
            <div class="shrink-0 w-12 h-12 bg-linear-to-r from-pink-100 to-rose-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="font-bold text-gray-900">Call Us</h3>
              <a href="tel:+1234567890" class="text-pink-600 hover:text-pink-700">+1 (234) 567-890</a>
            </div>
          </div>
          
          <div class="flex items-center p-4 bg-white rounded-xl shadow-lg border border-pink-100">
            <div class="shrink-0 w-12 h-12 bg-linear-to-r from-pink-100 to-rose-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="font-bold text-gray-900">Visit Us</h3>
              <p class="text-gray-600">123 Rose Avenue<br/>San Francisco, CA 94107</p>
            </div>
          </div>
        </div>
        
        {/* Social Links */}
        <div class="mt-8">
          <h4 class="font-bold text-gray-900 mb-4">Follow Us</h4>
          <div class="flex space-x-4">
            {['Twitter', 'LinkedIn', 'Instagram', 'Facebook'].map((platform, index) => (
              <a key={index} href="#" class="w-12 h-12 bg-linear-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center hover:from-pink-200 hover:to-rose-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <span class="text-pink-600 font-bold">{platform.charAt(0)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div class="lg:w-1/2 w-full">
        <div class="bg-white rounded-2xl shadow-2xl p-8 border border-pink-100">
          <div class="relative mb-8">
            <div class="absolute -inset-0.5 bg-linear-to-r from-pink-500 to-rose-500 rounded-2xl blur opacity-30"></div>
            <div class="relative bg-white p-6 rounded-2xl">
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
              <p class="text-gray-600">We typically respond within 24 hours</p>
            </div>
          </div>
          
          <form class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input type="text" class="w-full px-4 py-3 bg-pink-50 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300" placeholder="John"/>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input type="text" class="w-full px-4 py-3 bg-pink-50 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300" placeholder="Doe"/>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input type="email" class="w-full px-4 py-3 bg-pink-50 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300" placeholder="john@example.com"/>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input type="text" class="w-full px-4 py-3 bg-pink-50 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300" placeholder="Your Company"/>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
              <select class="w-full px-4 py-3 bg-pink-50 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300">
                <option>Select project type</option>
                <option>Web Development</option>
                <option>Mobile App</option>
                <option>UX/UI Design</option>
                <option>Consultation</option>
                <option>Other</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea rows="4" class="w-full px-4 py-3 bg-pink-50 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300 resize-none" placeholder="Tell us about your project..."></textarea>
            </div>
            
            <div class="flex items-center">
              <input type="checkbox" class="w-4 h-4 text-pink-500 bg-pink-50 border-pink-300 rounded focus:ring-pink-500"/>
              <label class="ml-2 text-sm text-gray-600">I agree to the privacy policy and terms of service</label>
            </div>
            
            <button type="submit" class="w-full py-4 px-6 bg-linear-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl group">
              <span class="flex items-center justify-center">
                Send Message
                <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Enhanced Footer */}
<footer class="text-gray-900 body-font bg-linear-to-b from-white to-pink-50 pt-20">
  {/* Newsletter Section */}
  <div class="container px-5 mx-auto mb-16">
    <div class="lg:w-2/3 mx-auto">
      <div class="bg-linear-to-r from-pink-500 to-rose-500 rounded-2xl p-8 shadow-2xl">
        <div class="flex flex-col lg:flex-row items-center justify-between">
          <div class="lg:w-2/3 mb-8 lg:mb-0 lg:pr-8">
            <h2 class="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p class="text-pink-100">Subscribe to our newsletter for the latest updates, tips, and exclusive offers.</p>
          </div>
          <div class="w-full lg:w-1/3">
            <div class="flex">
              <input type="email" placeholder="Your email" class="w-full px-4 py-3 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-pink-300"/>
              <button class="bg-white text-pink-600 font-bold px-6 py-3 rounded-r-xl hover:bg-pink-50 transition-colors">
                Subscribe
              </button>
            </div>
            <p class="text-pink-100 text-xs mt-2">No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Main Footer Content */}
  <div class="container px-5 mx-auto ">
    <div class="flex flex-wrap md:flex-nowrap">
      {/* Brand Section */}
      <div class="w-full md:w-1/3 mb-10 md:mb-0 md:pr-10">
        <a class="flex title-font font-bold items-center text-gray-900 mb-4">
         
         <img src={logo} />
       
        </a>
        <p class="text-gray-600 mt-4">Creating beautiful digital experiences with passion and innovation. Transforming ideas into reality.</p>
        {/* <div class="flex mt-6 space-x-3">
          {['Twitter', 'Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((platform, index) => (
            <a key={index} href="#" class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-pink-100">
              <span class="text-pink-500 text-sm font-bold">{platform.charAt(0)}</span>
            </a>
          ))}
        </div> */}
      </div>

      {/* Links Sections */}
      <div class="w-full md:w-2/3">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 class="font-bold text-gray-900 text-lg mb-4">Product</h3>
            <ul class="space-y-3">
              {['Features', 'Pricing', 'API', 'Documentation', 'Status'].map((item, index) => (
                <li key={index}>
                  <a href="#" class="text-gray-600 hover:text-pink-500 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold text-gray-900 text-lg mb-4">Company</h3>
            <ul class="space-y-3">
              {['About', 'Blog', 'Careers', 'Press', 'Partners'].map((item, index) => (
                <li key={index}>
                  <a href="#" class="text-gray-600 hover:text-pink-500 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold text-gray-900 text-lg mb-4">Resources</h3>
            <ul class="space-y-3">
              {['Help Center', 'Community', 'Contact', 'Privacy', 'Terms'].map((item, index) => (
                <li key={index}>
                  <a href="#" class="text-gray-600 hover:text-pink-500 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold text-gray-900 text-lg mb-4">Legal</h3>
            <ul class="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Compliance'].map((item, index) => (
                <li key={index}>
                  <a href="#" class="text-gray-600 hover:text-pink-500 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

   
    {/* Bottom Bar */}
    <div class="mt-12 pt-8 border-t border-pink-100">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-black text-xl ">
          © 2026 Iqra Aslam. All rights reserved.
        </p>
       
      </div>
    </div>
  </div>
</footer>


    

      {/* Testimonials, Contact, Footer sections remain unchanged */}

    </>
  );
}

export default App;