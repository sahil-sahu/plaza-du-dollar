"use client"
import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/Header/header"
import { XCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface Order {
  $id: string
  total: number
  paymentMethod: string
  orderStatus: string
}

const OrderCancelPage = () => {
    const searchParams = useSearchParams()
    const orderId = searchParams.get("orderId")
    const [orderDetails, setOrderDetails] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!orderId) return
            
            try {
                const response = await fetch(`/api/orders/${orderId}`)
                if (response.ok) {
                    const order = await response.json()
                    setOrderDetails(order)
                }
            } catch (error: unknown) {
                console.error("Failed to fetch order details:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchOrderDetails()
    }, [orderId])


    if (loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
                        <p className="mt-4 text-lg">Loading order details...</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="mb-6">
                            <XCircle className="h-20 w-20 text-red-500 mx-auto mb-4" />
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Payment Cancelled
                            </h1>
                            <p className="text-lg text-gray-600">
                                Your payment was cancelled or failed. No charges have been made to your account.
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
                                        <p className="text-red-600 font-medium capitalize">{orderDetails.orderStatus}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-center mb-6 text-orange-600">
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            <span className="text-sm">Your order is still pending payment</span>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-600">
                                Don&apos;t worry! You can complete your order anytime. Your cart items are still saved.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link 
                                    href="/checkout"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Try Again
                                </Link>
                                <Link 
                                    href="/cart"
                                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    View Cart
                                </Link>
                                <Link 
                                    href="/"
                                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const SuspenseOrderCancelPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OrderCancelPage />
        </Suspense>
    )
}

export default SuspenseOrderCancelPage
