import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Truck, ShieldCheck, LifeBuoy } from 'lucide-react';
import { useCart } from './CartContext';
import products from './data/product'; // ✅ Import product data
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const { id } = useParams();


    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);


    const product = products.find((item) => item.id === parseInt(id));
    const [quantity, setQuantity] = React.useState(1);
    const [pincode, setPincode] = React.useState('');
    const [deliveryMsg, setDeliveryMsg] = React.useState('');

    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addToCart(product.id, quantity);
        toast('Item added to cart', {
            icon: '🛒',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });


    };

    const handleBuyNow = () => {
        addToCart(product.id, quantity);
        navigate('/cart');
    };

    const checkDelivery = () => {
        if (pincode.length === 6) {
            setDeliveryMsg('✅ Delivery available at your location!');
        } else {
            setDeliveryMsg('❌ Please enter a valid 6-digit pincode.');
        }
    };

    if (!product) {
        return (
            <div className="text-center py-10 text-red-500">
                Product not found
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 px-6 bg-gray-100">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="flex items-center justify-center h-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="rounded-2xl object-contain max-h-[500px]"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-start space-y-6 px-2">
                    <div>
                        <h2 className="text-3xl font-bold text-green-700 mb-2">{product.name}</h2>
                        <p className="text-yellow-500 mb-4">⭐⭐⭐⭐☆ (48 reviews)</p>
                        <p className="text-xl text-gray-800 mb-4">Price: ₹{product.price}</p>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-gray-700 font-medium">Quantity:</span>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="bg-gray-200 px-3 py-1 rounded-lg text-lg">-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="bg-gray-200 px-3 py-1 rounded-lg text-lg">+</button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="bg-green-600 hover:bg-green-700 text-white py-3 w-full rounded-xl text-lg shadow hover:shadow-lg transition cursor-pointer"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 w-full rounded-xl text-lg shadow hover:shadow-lg transition cursor-pointer"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>

                    {/* Delivery Check */}
                    <div className="pt-2">
                        <p className="text-md font-semibold text-gray-700 mb-2">Check Delivery:</p>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                placeholder="Enter Pincode"
                                className="border border-gray-300 rounded-lg px-4 py-2 w-2/3"
                            />
                            <button
                                onClick={checkDelivery}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                            >
                                Check
                            </button>
                        </div>
                        {deliveryMsg && <p className="text-sm text-green-700">{deliveryMsg}</p>}
                    </div>

                    {/* Product Features */}
                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center border-t border-gray-200 mt-6 pt-6">
                        <div className="flex flex-col items-center">
                            <Truck className="w-8 h-8 text-green-600 mb-2" />
                            <p className="text-sm font-semibold text-gray-700">Free Shipping</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <ShieldCheck className="w-8 h-8 text-green-600 mb-2" />
                            <p className="text-sm font-semibold text-gray-700">Guaranteed Replacement</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <LifeBuoy className="w-8 h-8 text-green-600 mb-2" />
                            <p className="text-sm font-semibold text-gray-700">Expert Guidance</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Product */}
            <div className="max-w-5xl mx-auto mt-12 p-8 bg-white shadow-md rounded-2xl">
                <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">About the Product</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                    {product.description}
                </p>
            </div>

            {/* Suggested Products */}
            {/* Suggested Products */}
            <div className="max-w-6xl mx-auto mt-16">
                <h3 className="text-3xl font-semibold text-gray-800 text-center mb-8">You May Also Like</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products
                        .filter((item) => item.id !== product.id)
                        .slice(0, 4)
                        .map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col bg-white p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer"
                            >
                                {/* Product Image */}
                                <img
                                    onClick={() => navigate(`/product/${item.id}`)}
                                    src={item.image}
                                    alt={item.name}
                                    className="h-40 w-full object-contain mb-4 rounded-lg transition-transform duration-300"
                                />

                                {/* Name and Description */}
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-green-700 mb-1">{item.name}</h4>
                                    <p className="text-gray-600 text-sm h-20 overflow-hidden">
                                        {item.description.split(' ').slice(0, 14).join(' ')}...
                                        <button
                                            onClick={() => navigate(`/product/${item.id}`)}
                                            className="text-green-600 font-medium hover:underline ml-1 cursor-pointer"
                                        >
                                            View More
                                        </button>
                                    </p>
                                </div>

                                {/* Price */}
                                <p className="text-md font-semibold text-gray-800 mt-2 mb-2">₹{item.price}</p>

                                {/* View Product Button */}
                                <button
                                    className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition cursor-pointer"
                                    onClick={() => navigate(`/product/${item.id}`)}
                                >
                                    View Product
                                </button>
                            </div>
                        ))}
                </div>
            </div>

        </div>
    );
};

export default ProductDetails;
