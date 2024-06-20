import Container from "../../../Shared/Container/Container"
import logo from '../../../../public/logo.png'

const InvoicePage = () => {
    return (
        <Container>

            <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center mb-28">

                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                    <div className="flex justify-center">
                        <img className="w-[250px]" src={logo} />
                    </div>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-4">Invoice</h1>
                        <p>Date: 20/06/2024</p>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Bill To:</h2>
                        <p>John Doe</p>
                    </div>
                    <table className="w-full mb-8">
                        <thead>
                            <tr>
                                <th className="border-b-2 border-gray-300 p-2 text-left">Description</th>
                                <th className="border-b-2 border-gray-300 p-2 text-right">Quantity</th>
                                <th className="border-b-2 border-gray-300 p-2 text-right">Price</th>
                                <th className="border-b-2 border-gray-300 p-2 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border-b border-gray-200 p-2">Item 1</td>
                                <td className="border-b border-gray-200 p-2 text-right">2</td>
                                <td className="border-b border-gray-200 p-2 text-right">$10.00</td>
                                <td className="border-b border-gray-200 p-2 text-right">$20.00</td>
                            </tr>
                            <tr>
                                <td className="border-b border-gray-200 p-2">Item 2</td>
                                <td className="border-b border-gray-200 p-2 text-right">1</td>
                                <td className="border-b border-gray-200 p-2 text-right">$15.00</td>
                                <td className="border-b border-gray-200 p-2 text-right">$15.00</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-right">
                        <p className="text-xl font-bold">Total: $35.00</p>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default InvoicePage
