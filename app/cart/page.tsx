'use client';

import React, { useState, useEffect } from 'react';
import MovieCardCart from '@/components/ui/MovieCardCart';
import Navbar from '@/components/ui/Navbar';
import { getAccountDetails } from '../api/accountApi';
import { Movie } from '@/type/Movie';


const CartPage: React.FC = () => {
    const [cart, setCart] = useState<Movie[]>([]);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [showConfirm, setShowConfirm] = useState<{ show: boolean; movieId: number | null }>({
        show: false,
        movieId: null,
    });

    // เมื่อกด remove จะเปิด popup
    const handleRemoveClick = (movieId: number) => {
        setShowConfirm({ show: true, movieId });
    };

    const confirmRemove = () => {
        if (showConfirm.movieId !== null) {
            const movieId = showConfirm.movieId;

            // ลบจาก cart + uncheck
            const updatedCart = cart.filter(movie => movie.id !== movieId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);
            setSelectedItems(prev => prev.filter(id => id !== movieId));

            // อัปเดต Navbar
            window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cartItems: updatedCart } }));
        }

        // ปิด popup
        setShowConfirm({ show: false, movieId: null });
    };

    useEffect(() => {
        const fetchAccount = async () => {
            const res = await getAccountDetails(21890670);
            const path = res.data.avatar?.tmdb?.avatar_path;
            if (path) {
                setAvatar(`https://image.tmdb.org/t/p/w200${path}`);
            }
        };
        fetchAccount();
    }, []);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const handleSelect = (movieId: number) => {
        if (selectedItems.includes(movieId)) {
            setSelectedItems(selectedItems.filter(id => id !== movieId));
        } else {
            setSelectedItems([...selectedItems, movieId]);
        }
    };

    const handleOrder = () => {
        setShowPopup(true);
        setCountdown(60); // เริ่มนับ 60 วินาที
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showPopup && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        if (countdown === 0) {
            setShowPopup(false);
        }
        return () => clearTimeout(timer);
    }, [showPopup, countdown]);


    const handleClearAll = () => {
        localStorage.removeItem('cart');
        setCart([]);
        setSelectedItems([]);
        // ส่ง event ไปให้ Navbar อัปเดตด้วย
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cartItems: [] } }));
    };


    return (
        <>
            <Navbar avatarUrl={avatar} />
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>


                {cart.length > 0 && (
                    <div className="flex justify-end mb-4">
                        <button
                            className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700"
                            onClick={handleClearAll}
                        >
                            ❌ เคลียร์สินค้าทั้งหมด
                        </button>
                    </div>
                )}

                {selectedItems.length > 0 && (
                    <div className="m-6 border border-gray-300 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">📝 สรุปรายการ</span>
                            <button
                                className="text-sm text-red-600 hover:underline"
                                onClick={() => setSelectedItems([])}
                            >
                                ❌ เคลียร์ Order ทั้งหมด
                            </button>
                        </div>

                        {/* ส่วนรวมราคาตามเดิม */}
                        {(() => {
                            const selectedMovies = cart.filter(movie => selectedItems.includes(movie.id));
                            const totalPrice = selectedMovies.reduce((total, movie) => total + movie.price, 0);
                            let discount = 0;
                            if (selectedItems.length > 5) {
                                discount = 0.2;
                            } else if (selectedItems.length > 3) {
                                discount = 0.1;
                            }
                            const discountedPrice = totalPrice - (totalPrice * discount);

                            return (
                                <>
                                    <div className="flex justify-between items-center mb-2">
                                        <span>รวมก่อนลด:</span>
                                        <span>฿ {totalPrice} THB</span>
                                    </div>

                                    {discount > 0 && (
                                        <div className="flex justify-between items-center mb-2 text-red-600">
                                            <span>ส่วนลด {discount * 100}%</span>
                                            <span>- ฿ {(totalPrice * discount).toFixed(2)} THB</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center mb-4 font-bold">
                                        <span>รวมสุทธิ:</span>
                                        <span className="text-xl text-green-700">฿ {discountedPrice.toFixed(2)} THB</span>
                                    </div>

                                    <button
                                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
                                        onClick={handleOrder}
                                    >
                                        🛒 Order Now ({selectedItems.length})
                                    </button>
                                </>
                            );
                        })()}
                    </div>
                )}

                <div className="border border-gray-300 rounded-lg p-4 my-6 shadow"> {/* Updated line */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {cart.length > 0 ? (
                            cart.map((movie) => (
                                <MovieCardCart
                                    key={movie.id}
                                    {...movie}
                                    selected={selectedItems.includes(movie.id)}
                                    onSelect={() => handleSelect(movie.id)}
                                    onCardAction={() => handleRemoveClick(movie.id)}
                                />
                            ))
                        ) : (
                            <p className="text-center">Your cart is empty.</p>
                        )}
                    </div>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
                        <h2 className="text-xl font-bold mb-4 text-center">📢 กรุณาโอนเงิน</h2>
                        <p className="mb-2 text-center">ยอดเงินที่ต้องโอน: ฿ {calculateTotal()} THB</p>
                        <p className="mb-2 text-center">บัญชี: ธนาคาร ABC สาขา DEF</p>
                        <p className="mb-4 text-center">เลขบัญชี: 123-456-7890</p>
                        <div className="text-center text-red-600 font-semibold mb-4">
                            เวลาที่เหลือ: {countdown} วินาที
                        </div>
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded w-full hover:bg-gray-600"
                            onClick={() => setShowPopup(false)}
                        >
                            ปิด
                        </button>
                    </div>
                </div>
            )}

            {showConfirm.show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
                        <h3 className="text-lg font-semibold mb-4 text-center">คุณต้องการลบสินค้านี้หรือไม่?</h3>
                        <div className="flex justify-between space-x-4">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 w-full"
                                onClick={() => setShowConfirm({ show: false, movieId: null })}
                            >
                                ไม่
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
                                onClick={confirmRemove}
                            >
                                ใช่, ลบเลย
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );


    // function removeFromCart(movieId: number) {
    //     const updatedCart = cart.filter(movie => movie.id !== movieId);
    //     localStorage.setItem('cart', JSON.stringify(updatedCart));
    //     setCart(updatedCart);
    //         setSelectedItems(prev => prev.filter(id => id !== movieId));
    //         window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cartItems: updatedCart } }));
    // }

    function calculateTotal() {
        const selectedMovies = cart.filter(movie => selectedItems.includes(movie.id));
        const totalPrice = selectedMovies.reduce((total, movie) => total + movie.price, 0);
        let discount = 0;
        if (selectedItems.length > 5) {
            discount = 0.2;
        } else if (selectedItems.length > 3) {
            discount = 0.1;
        }
        return (totalPrice - (totalPrice * discount)).toFixed(2);
    }
};

export default CartPage;
