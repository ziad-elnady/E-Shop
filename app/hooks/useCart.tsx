import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { CartProductType } from '../product/[productId]/partials/ProductDetails';
import { useLocalStorage as useLocalCartStorage } from './useLocalStorage';

type Cart = {
	cartTotalQty: number;
	cartTotalAmount: number;
	cartProducts: CartProductType[];
	handleAddProductToCart: (product: CartProductType) => void;
	handleRemoveProductFromCart: (product: CartProductType) => void;
	handleCartQtyIncrease: (product: CartProductType) => void;
	handleCartQtyDecrease: (product: CartProductType) => void;
	handleClearCart: () => void;
	paymentIntent: string | null;
	handleSetPaymentIntent: (value: string | null) => void;
};

const initialValues = {
	cartTotalQty: 0,
	cartTotalAmount: 0,
	cartProducts: [],
	handleAddProductToCart: () => { },
	handleRemoveProductFromCart: () => { },
	handleCartQtyIncrease: () => { },
	handleCartQtyDecrease: () => { },
	handleClearCart: () => { },
	paymentIntent: null,
	handleSetPaymentIntent: () => { }
};

export const CartContext = createContext<Cart>(initialValues);

type Props = {
	[propName: string]: any;
};

export const CartContextProvider = (props: Props) => {
	console.log('CartContextProvider loaded');
	const [cartTotalQty, setCartTotalQty] = useState(initialValues.cartTotalQty);
	const [cartTotalAmount, setCartTotalAmount] = useState(initialValues.cartTotalAmount);
	const [cartProducts, setCartProducts] = useState<CartProductType[]>(initialValues.cartProducts);

	const { setItem, getItem } = useLocalCartStorage();

	const [paymentIntent, setPaymentInent] = useState<string | null>(null)

	useEffect(() => {
		const savedCartProducts: CartProductType[] = JSON.parse(getItem('eShopCartItems'));
		setCartProducts(savedCartProducts);
		const paymentIntent = getItem('eShopPaymentIntent')

		setPaymentInent(paymentIntent)
	}, []);

	useEffect(() => {
		const calculateTotals = (cartProducts: CartProductType[]) => {
			const { total, qty } = cartProducts.reduce(
				(acc, item) => {
					const itemTotal = item.price * item.quantity;
					acc.total += itemTotal;
					acc.qty += item.quantity;

					return acc;
				},
				{ total: 0, qty: 0 }
			);

			setCartTotalQty(qty);
			setCartTotalAmount(total);
		};

		if (cartProducts && cartProducts.length > 0) calculateTotals(cartProducts);
	}, [cartProducts]);

	const handleAddProductToCart = (product: CartProductType) => {
		setCartProducts((prev) => {
			let updatedProducts;

			if (prev) {
				updatedProducts = [...prev, product];
			} else {
				updatedProducts = [product];
			}

			setItem('eShopCartItems', JSON.stringify(updatedProducts));
			return updatedProducts;
		});

		toast.success('Successfully added product to cart!');
	};

	const handleRemoveProductFromCart = (product: CartProductType) => {
		if (cartProducts && cartProducts.length > 1) {
			// filters the list by getting all the other products that doesn't contain the same id of the product
			const filteredProducts = cartProducts.filter((item) => item.id !== product.id);
			setCartProducts(filteredProducts);
			toast.success('Product removed');
			setItem('eShopCartItems', JSON.stringify(filteredProducts));
		}
	};

	const handleCartQtyIncrease = (product: CartProductType) => {

		if (product.quantity === 99) {
			return toast.error('Oops! maximum reached');
		}

		let updatedCart;

		if (cartProducts && cartProducts.length > 0) {
			updatedCart = [...cartProducts];

			const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

			if (existingIndex > -1) {
				updatedCart[existingIndex].quantity += 1;
			}

			setCartProducts(updatedCart);
			setItem('eShopCartItems', JSON.stringify(updatedCart));
		}
	};

	const handleCartQtyDecrease = (product: CartProductType) => {
		let updatedCart;

		if (product.quantity < 2) {
			return toast.error('This is the last one!');
		}

		if (cartProducts && cartProducts.length > 0) {
			updatedCart = [...cartProducts];

			const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

			if (existingIndex > -1) {
				updatedCart[existingIndex].quantity -= 1;
			}

			setCartProducts(updatedCart);
			setItem('eShopCartItems', JSON.stringify(updatedCart));
		}
	};

	const handleClearCart = () => {
		setCartProducts([]);
		setCartTotalQty(0);
		setCartTotalAmount(0);
		setItem('eShopCartItems', []);
	};

	const handleSetPaymentIntent = useCallback((value: string | null) => {
		setPaymentInent(value)
		setItem('eShopPaymentIntent', value)
	}, [paymentIntent])

	const value = {
		cartTotalQty,
		cartTotalAmount,
		cartProducts,
		handleAddProductToCart,
		handleRemoveProductFromCart,
		handleCartQtyIncrease,
		handleCartQtyDecrease,
		handleClearCart,
		paymentIntent,
		handleSetPaymentIntent
	};

	return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
	const context = useContext(CartContext);

	if (context === null) {
		throw new Error('useCart must be used within a CartContextProvider');
	}

	return context;
};
