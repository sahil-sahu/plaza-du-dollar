"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/Header/header"
import { CheckCircle, Package, Truck } from "lucide-react"
import Link from "next/link"

const OrderSuccessPage = () => {
    const searchParams = useSearchParams()
    const orderId = searchParams.get("oid")
    const [orderDetails, setOrderDetails] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (orderId) {
            fetchOrderDetails()
        }
    }, [orderId])

    const fetchOrderDetails = async () => {
        try {
            const response = await fetch(`/api/orders/${orderId}`)
            if (response.ok) {
                const order = await response.json()
                setOrderDetails(order)
            }
        } catch (error) {
            console.error("Failed to fetch order details:", error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
                        <p className="mt-4 text-lg">Loading order details...</p>
                    </div>
                </div>
            </>
        )
    }

    const isCashOnDelivery = orderDetails?.paymentMethod === "cod"

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="mb-6">
                            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Order Placed Successfully!
                            </h1>
                            <p className="text-lg text-gray-600">
                                {isCashOnDelivery 
                                    ? "Your order has been confirmed. Please have the payment ready upon delivery."
                                    : "Thank you for your order. We're processing it now."
                                }
                            </p>
                        </div>

                        {orderDetails && (
                            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                                <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-600">Order ID:</span>
                                        <p className="text-gray-900">{orderDetails.$id}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Total Amount:</span>
                                        <p className="text-gray-900">${orderDetails.total?.toFixed(2)} CAD</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Payment Method:</span>
                                        <p className="text-gray-900 capitalize">{orderDetails.paymentMethod}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Status:</span>
                                        <p className="text-green-600 font-medium capitalize">{orderDetails.orderStatus}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isCashOnDelivery ? (
                            <div className="flex items-center justify-center mb-6 text-blue-600">
                                <Truck className="h-5 w-5 mr-2" />
                                <span className="text-sm">Cash on Delivery - Payment upon delivery</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center mb-6 text-blue-600">
                                <Package className="h-5 w-5 mr-2" />
                                <span className="text-sm">Your order is being processed</span>
                            </div>
                        )}

                        <div className="space-y-4">
                            {isCashOnDelivery ? (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                    <h3 className="font-semibold text-blue-800 mb-2">Important Information:</h3>
                                    <ul className="text-blue-700 text-sm text-left space-y-1">
                                        <li>• Please have the exact amount ready when the delivery arrives</li>
                                        <li>• Our delivery team will contact you to confirm delivery time</li>
                                        <li>• You can track your order status in your account</li>
                                    </ul>
                                </div>
                            ) : (
                                <p className="text-gray-600">
                                    You will receive an email confirmation shortly with your order details and tracking information.
                                </p>
                            )}
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link 
                                    href="/"
                                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                                <Link 
                                    href="/profile/orders"
                                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    View My Orders
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderSuccessPage
